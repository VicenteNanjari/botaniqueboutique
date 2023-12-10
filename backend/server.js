import express, { json } from 'express';
import cors from 'cors';
import pool from './config/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import verificarAutenticacion from './middleware/Jwt.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
dotenv.config();

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Mi API de Botanique Boutique',
            version: '1.0.0',
            description: 'Una API para gestionar productos y usuarios de Botanique Boutique',
        },
    },
    apis: ['./server.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '/uploads'));
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

app.use(cors());
app.use(json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// GET /productos: Obtiene todas las publicaciones
/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtiene todas las publicaciones de productos
 *     description: Devuelve un listado completo de todos los productos disponibles.
 *     responses:
 *       200:
 *         description: Una lista de productos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: El ID único del producto.
 *                   nombre:
 *                     type: string
 *                     description: El nombre del producto.
 *                   descripcion:
 *                     type: string
 *                     description: Una descripción del producto.
 *                   precio:
 *                     type: number
 *                     format: float
 *                     description: El precio del producto.
 *                   imagen:
 *                     type: string
 *                     description: URL de la imagen del producto.
 *                   stock:
 *                     type: integer
 *                     description: Cantidad disponible del producto.
 *       500:
 *         description: Error interno del servidor.
 */
app.get('/productos', async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM productos');
        res.json(response.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los productos');
    }
});

// POST /cargar-productos: Carga un array de productos en la base de datos
/**
 * @swagger
 * /cargar-productos:
 *   post:
 *     summary: Carga un array de productos en la base de datos
 *     description: Acepta un array de productos y los inserta en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required:
 *                 - nombre
 *                 - descripcion
 *                 - precio
 *                 - imagen
 *                 - stock
 *               properties:
 *                 nombre:
 *                   type: string
 *                   description: El nombre del producto.
 *                 descripcion:
 *                   type: string
 *                   description: La descripción del producto.
 *                 precio:
 *                   type: number
 *                   description: El precio del producto.
 *                 imagen:
 *                   type: string
 *                   description: URL de la imagen del producto.
 *                 stock:
 *                   type: integer
 *                   description: Cantidad de stock disponible para el producto.
 *     responses:
 *       200:
 *         description: Productos cargados con éxito.
 *       500:
 *         description: Error al cargar los productos.
 */
app.post('/cargar-productos', async (req, res) => {
    try {
        const productos = req.body; // Asegúrate de que el body contenga tu array de productos

        for (const producto of productos) {
            const { nombre, descripcion, precio, imagen, stock } = producto;
            await pool.query('INSERT INTO productos (nombre, descripcion, precio, imagen, stock) VALUES ($1, $2, $3, $4, $5)', [nombre, descripcion, precio, imagen, stock]);
        }

        res.send('Productos cargados con éxito');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar los productos');
    }
});

// GET /productos/{id}: Obtiene una publicación específica
/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     summary: Obtiene una publicación específica
 *     description: Retorna los detalles de un producto específico basado en su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único del producto.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles del producto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: El ID del producto.
 *                 nombre:
 *                   type: string
 *                   description: El nombre del producto.
 *                 descripcion:
 *                   type: string
 *                   description: La descripción del producto.
 *                 precio:
 *                   type: number
 *                   format: float
 *                   description: El precio del producto.
 *                 imagen:
 *                   type: string
 *                   description: URL de la imagen del producto.
 *                 stock:
 *                   type: integer
 *                   description: La cantidad disponible del producto.
 *       404:
 *         description: Publicación no encontrada.
 *       500:
 *         description: Error del servidor.
 */
app.get('/productos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const { rows } = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ mensaje: 'Publicación no encontrada' });
        }

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// POST /usuarios/registro: Registra un nuevo usuario
/**
 * @swagger
 * /usuarios/registro:
 *   post:
 *     summary: Registra un nuevo usuario
 *     description: Crea una nueva cuenta de usuario con un nombre de usuario, correo electrónico y contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *                 description: El nombre de usuario para la nueva cuenta.
 *               password:
 *                 type: string
 *                 description: La contraseña para la nueva cuenta.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: El correo electrónico para la nueva cuenta.
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Usuario registrado
 *                 id:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Solicitud inválida debido a datos faltantes o inválidos.
 *       409:
 *         description: Conflicto, el nombre de usuario o correo electrónico ya existe.
 *       500:
 *         description: Error interno del servidor.
 */
app.post('/usuarios/registro', async (req, res) => {
    const { username, password, email } = req.body;

    // Validaciones básicas (ajustar según tus necesidades)
    if (!username || !password || !email) {
        return res.status(400).json({ mensaje: 'Faltan datos (nombre, email, contraseña).' });
    }

    try {
        // Hashing de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar usuario en la base de datos
        const result = await pool.query('INSERT INTO usuarios (nombre, email, contraseña) VALUES ($1, $2, $3) RETURNING id', [username, email, hashedPassword]);

        // Enviar respuesta (evita enviar la contraseña, incluso hashed)
        res.status(201).json({ mensaje: 'Usuario registrado', id: result.rows[0].id });
    } catch (error) {
        if (error.code === '23505') { // Error de duplicado en PostgreSQL
            return res.status(409).json({ mensaje: 'El usuario ya existe.' });
        }
        res.status(500).json({ mensaje: 'Error al registrar el usuario' });
    }
});

// POST /usuarios/login: Inicia sesión con un usuario existente
/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Inicia sesión con un usuario existente
 *     description: Autentica a un usuario basado en su nombre de usuario y contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: El nombre de usuario del usuario.
 *               password:
 *                 type: string
 *                 description: La contraseña del usuario.
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso. Retorna un token JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Inicio de sesión exitoso
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticación.
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: El ID del usuario.
 *       400:
 *         description: Falta nombre de usuario o contraseña.
 *       401:
 *         description: Contraseña incorrecta.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error en el servidor.
 */
app.post('/usuarios/login', async (req, res) => {
    const { username, password } = req.body;

    // Validar que el usuario y la contraseña sean proporcionados
    if (!username || !password) {
        return res.status(400).json({ mensaje: 'Se requieren el nombre de usuario y la contraseña.' });
    }

    try {
        // Consultar la base de datos para encontrar al usuario

        const { rows } = await pool.query('SELECT * FROM usuarios WHERE nombre = $1', [username]);
        if (rows.length === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        }

        const usuario = rows[0];

        // Comparar la contraseña proporcionada con la almacenada en la base de datos
        const esValida = await bcrypt.compare(password, usuario.contraseña);
        if (!esValida) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta.' });
        }

        // Generar un JWT si la contraseña es correcta
        const token = jwt.sign(
            { id: usuario.id, username: usuario.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );


        res.json({ mensaje: 'Inicio de sesión exitoso', token, usuario: { id: usuario.id } });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al iniciar sesión' });
    }
});

// GET /usuarios/{id}: Obtiene un perfil de usuario específico(requiere autenticación)
/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obtiene un perfil de usuario específico
 *     description: Retorna el perfil de un usuario basado en su ID. Requiere autenticación.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numérico del usuario a obtener.
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: El ID del usuario.
 *                 nombre:
 *                   type: string
 *                   description: El nombre del usuario.
 *                 email:
 *                   type: string
 *                   description: El email del usuario.
 *       404:
 *         description: Usuario no encontrado.
 *       403:
 *         description: No tienes permiso para ver este perfil.
 *       500:
 *         description: Error al obtener el perfil del usuario.
 */
app.get('/usuarios/:id', verificarAutenticacion, async (req, res) => {
    const { id } = req.params;
    const idUsuarioAutenticado = req.usuario.id; // Suponiendo que el ID del usuario está en el JWT
    try {
        // Opcional: Verificar si el usuario tiene permiso para ver este perfil
        if (idUsuarioAutenticado !== parseInt(id)) {
            return res.status(403).json({ mensaje: 'No tienes permiso para ver este perfil.' });
        }

        // Obtener el perfil del usuario desde la base de datos
        const { rows } = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
        // Si no se encontró ningún usuario, probablemente el ID es incorrecto
        if (rows.length === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        }

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el perfil del usuario' });
    }
});

// POST /productos: Crea una nueva publicación
/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Crea una nueva publicación de producto
 *     description: Añade un nuevo producto a la base de datos.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: nombre
 *         type: string
 *         required: true
 *         description: El nombre del producto.
 *       - in: formData
 *         name: descripcion
 *         type: string
 *         required: true
 *         description: La descripción del producto.
 *       - in: formData
 *         name: precio
 *         type: number
 *         required: true
 *         description: El precio del producto.
 *       - in: formData
 *         name: imagen
 *         type: file
 *         required: true
 *         description: La imagen del producto.
 *       - in: formData
 *         name: stock
 *         type: integer
 *         required: true
 *         description: La cantidad de stock disponible.
 *     responses:
 *       201:
 *         description: Producto creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: El ID del producto creado.
 *                 nombre:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *                 precio:
 *                   type: number
 *                 imagen:
 *                   type: string
 *                 stock:
 *                   type: integer
 *       500:
 *         description: Error al crear el producto.
 */
app.post('/productos', verificarAutenticacion, upload.single('imagen'), async (req, res) => {
    const { nombre, descripcion, precio, stock } = req.body;
    const imagen = req.file.path; // La ruta del archivo cargado
    const IMAGE_SERVER_URL = 'http://localhost:3000/uploads/';
    const imagenUrl = IMAGE_SERVER_URL + imagen.split('uploads')[1];

    try {
        // Insertar la nueva publicación en la base de datos
        const nuevaPublicacion = await pool.query(
            'INSERT INTO productos (nombre, descripcion, precio, imagen, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nombre, descripcion, precio, imagenUrl, stock]
        );
        
        res.json(nuevaPublicacion.rows[0]);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la publicación' });
    }
});

// PUT /usuarios/{id}: Actualiza un perfil de usuario(requiere autenticación)
/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obtiene un perfil de usuario específico
 *     description: Retorna el perfil de un usuario basado en su ID. Requiere autenticación.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numérico del usuario a obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles del perfil del usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: El ID del usuario.
 *                 nombre:
 *                   type: string
 *                   description: El nombre del usuario.
 *                 email:
 *                   type: string
 *                   description: El email del usuario.
 *       403:
 *         description: Acceso denegado, sin permisos para ver este perfil.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error al obtener el perfil del usuario.
 *     security:
 *       - bearerAuth: []
 */
app.put('/usuarios/:id', verificarAutenticacion, async (req, res) => {
    const { id } = req.params;
    const idUsuarioAutenticado = req.usuario.id; // Suponiendo que el ID del usuario está en el JWT
    const { nombre, email, /* otros campos a actualizar */ } = req.body;

    // Validar los datos aquí...

    try {
        // Opcional: Verificar si el usuario tiene permiso para actualizar este perfil
        if (idUsuarioAutenticado !== parseInt(id)) {
            return res.status(403).json({ mensaje: 'No tienes permiso para actualizar este perfil.' });
        }

        // Actualizar el perfil del usuario en la base de datos
        const result = await pool.query(
            'UPDATE usuarios SET nombre = $1, email = $2 WHERE id = $3 RETURNING *',
            [nombre, email, id]
        );

        // Si no se actualizó ningún registro, probablemente el usuario no existe
        if (result.rows.length === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        }

        res.json({ mensaje: 'Perfil actualizado con éxito', usuario: result.rows[0] });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el perfil del usuario' });
    }
});

// POST /productos/actualizar-stock: Actualiza el stock de varios productos
/**
 * @swagger
 * /productos/actualizar-stock:
 *   post:
 *     summary: Actualiza el stock de varios productos
 *     description: Recibe una lista de productos con sus IDs y las cantidades compradas, y actualiza el stock correspondiente en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required:
 *                 - id
 *                 - cantidadComprada
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: El ID del producto.
 *                 cantidadComprada:
 *                   type: integer
 *                   description: La cantidad del producto que ha sido comprada.
 *     responses:
 *       200:
 *         description: Stock de productos actualizado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Stock de productos actualizado con éxito.
 *       500:
 *         description: Error al actualizar el stock de los productos.
 */
app.post('/productos/actualizar-stock', async (req, res) => {
    const productos = req.body; // [{ id, cantidadComprada }, ...]
    try {
        for (const producto of productos) {
            // Obtener el stock actual del producto
            const { rows } = await pool.query('SELECT stock FROM productos WHERE id = $1', [producto.id]);
            const stockActual = rows[0].stock;

            // Calcular el nuevo stock
            const nuevoStock = stockActual - producto.cantidadComprada;

            // Actualizar el stock en la base de datos
            await pool.query('UPDATE productos SET stock = $1 WHERE id = $2', [nuevoStock, producto.id]);
        }

        res.json({ mensaje: 'Stock de productos actualizado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al actualizar el stock de los productos' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;