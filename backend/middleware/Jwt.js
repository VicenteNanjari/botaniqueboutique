import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import e from 'express';
dotenv.config();

const verificarAutenticacion = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ mensaje: 'Acceso denegado. No se proporcionó token.' });
    }

    const token = authHeader.split(' ')[1]; // Separar el prefijo 'Bearer' del token

    try {
        const verificado = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = verificado;
        next(); // Continuar a la ruta protegida
    } catch (error) {
        res.status(400).json({ mensaje: 'Token inválido.' });
    }
};
export default verificarAutenticacion;