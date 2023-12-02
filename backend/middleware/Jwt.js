import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const verificarAutenticacion = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso denegado. No se proporcionó token.' });
    }

    try {
        const verificado = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = verificado;
        next(); // Continuar a la ruta protegida
    } catch (error) {
        res.status(400).json({ mensaje: 'Token inválido.' });
    }
};

export default verificarAutenticacion;