import express, { json } from 'express';
import cors from 'cors';
import pool from './config/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import verificarAutenticacion  from './middleware/Jwt.js';
dotenv.config();

const app = express();

app.use(cors());
app.use(json());

// GET /productos: Obtiene todas las publicaciones
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
app.get('/productos/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const { rows } = await pool.query('SELECT * FROM publicaciones WHERE id = $1', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ mensaje: 'Publicación no encontrada' });
        }

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// POST /usuarios/registro: Registra un nuevo usuario
app.post('/usuarios/registro', async (req, res) => {
    const { username, password, email } = req.body;

    // Validaciones básicas (ajustar según tus necesidades)
    if (!username || !password || !email) {
        return res.status(400).json({ mensaje: 'Faltan datos (username, password, email).' });
    }

    try {
        // Hashing de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar usuario en la base de datos
        const result = await pool.query('INSERT INTO usuarios (username, password, email) VALUES ($1, $2, $3) RETURNING id', [username, hashedPassword, email]);

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
app.post('/usuarios/login', async (req, res) => {
    const { username, password } = req.body;

    // Validar que el usuario y la contraseña sean proporcionados
    if (!username || !password) {
        return res.status(400).json({ mensaje: 'Se requieren el nombre de usuario y la contraseña.' });
    }

    try {
        // Consultar la base de datos para encontrar al usuario
        const { rows } = await pool.query('SELECT * FROM usuarios WHERE username = $1', [username]);

        if (rows.length === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        }

        const usuario = rows[0];

        // Comparar la contraseña proporcionada con la almacenada en la base de datos
        const esValida = await bcrypt.compare(password, usuario.password);
        if (!esValida) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta.' });
        }

        // Generar un JWT si la contraseña es correcta
        const token = jwt.sign(
            { id: usuario.id, username: usuario.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ mensaje: 'Inicio de sesión exitoso', token });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al iniciar sesión' });
    }
});

// POST /productos: Crea una nueva publicación
app.post('/productos', verificarAutenticacion, async (req, res) => {
    const { titulo, contenido } = req.body;
    const idUsuario = req.usuario.id; // Suponiendo que el ID del usuario está incluido en el JWT

    // Validar los datos de la publicación aquí...

    try {
        // Insertar la nueva publicación en la base de datos
        const nuevaPublicacion = await pool.query(
            'INSERT INTO productos (titulo, contenido, id_usuario) VALUES ($1, $2, $3) RETURNING *',
            [titulo, contenido, idUsuario]
        );

        res.json(nuevaPublicacion.rows[0]);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la publicación' });
    }
});

// DELETE /productos/{id}: Borra una publicación específica
app.delete('/productos/:id', verificarAutenticacion, async (req, res) => {
    const { id } = req.params;
    const idUsuario = req.usuario.id; // Obtenido del JWT

    try {
        // Opcional: Verificar si la publicación existe y si el usuario tiene permiso para borrarla
        const { rows } = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ mensaje: 'Publicación no encontrada.' });
        }

        // Si deseas agregar lógica adicional para verificar si el usuario puede borrar esta publicación, hazlo aquí

        // Borrar la publicación
        await pool.query('DELETE FROM productos WHERE id = $1 AND id_usuario = $2', [id, idUsuario]);

        res.json({ mensaje: 'Publicación eliminada con éxito.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la publicación' });
    }
});

// PUT /usuarios/{id}: Actualiza un perfil de usuario(requiere autenticación)
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Servidor corriendo en el puerto ${PORT}`);
});