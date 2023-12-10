import request from 'supertest';
import app from './server';

describe('GET /productos', () => {
    it('debe devolver el estado 200 y los productos existentes', async () => {
        const response = await request(app)
            .get('/productos');

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
});

describe('GET /productos/:id', () => {
    it('debe devolver el producto con el ID especificado', async () => {
        const id = 3;

        const response = await request(app)
            .get(`/productos/${id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id', id);
    });
});

describe('POST /usuarios/login', () => {
    it('debe devolver un token de acceso válido', async () => {
        const usuario = {
            nombre: 'Vicente',
            contraseña: '123'
        };

        const response = await request(app)
            .post('/usuarios/login')
            .send(usuario);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    });
});

describe('POST /usuarios', () => {
    it('debe crear un nuevo usuario y devolver el estado 201', async () => {
        const usuario = {
            nombre: 'Juan',
            email: 'vicente@example.com',
            contraseña: '123'
        };

        const response = await request(app)
            .post('/usuarios')
            .send(usuario);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
    });
});