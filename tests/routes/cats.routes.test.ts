import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../../src/app';
import * as CatsController from '../../src/controllers/cats.controller';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

jest.mock('../../src/controllers/cats.controller', () => ({
  getBreeds: jest.fn((req, res) => res.status(200).json({ breeds: ['siamese', 'persian'] })),
  searchBreeds: jest.fn((req, res) => res.status(200).json({ results: ['bengal'] })),
  getBreedById: jest.fn((req, res) => res.status(200).json({ breed: { id: 'beng', name: 'Bengal' } })),
}));

describe('cats.routes - Autenticación y respuesta', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const validToken = jwt.sign({ userId: 'test-user' }, JWT_SECRET);
  const invalidToken = 'invalid.token.value';

  describe('GET /breeds', () => {
    it('debería responder 401 si no está autenticado', async () => {
      const res = await request(app).get('/api/cats/breeds');

      expect(res.status).toBe(401);
      expect(res.body).toEqual({ message: 'Token requerido' });
      expect(CatsController.getBreeds).not.toHaveBeenCalled();
    });

    it('debería responder 401 si el token es inválido', async () => {
      const res = await request(app)
        .get('/api/cats/breeds')
        .set('Authorization', `Bearer ${invalidToken}`);

      expect(res.status).toBe(401);
      expect(res.body).toEqual({ message: 'Token inválido' });
      expect(CatsController.getBreeds).not.toHaveBeenCalled();
    });

    it('debería responder 200 y retornar razas si el token es válido', async () => {
      const res = await request(app)
        .get('/api/cats/breeds')
        .set('Authorization', `Bearer ${validToken}`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ breeds: ['siamese', 'persian'] });
      expect(CatsController.getBreeds).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET api/cats/breeds/search', () => {
    it('401 si no autenticado', async () => {
      const res = await request(app).get('/api/cats/breeds/search');
      expect(res.status).toBe(401);
      expect(CatsController.searchBreeds).not.toHaveBeenCalled();
    });

    it('401 si token inválido', async () => {
      const res = await request(app)
        .get('/api/cats/breeds/search')
        .set('Authorization', `Bearer ${invalidToken}`);
      expect(res.status).toBe(401);
      expect(CatsController.searchBreeds).not.toHaveBeenCalled();
    });

    it('200 si token válido', async () => {
      const res = await request(app)
        .get('/api/cats/breeds/search')
        .set('Authorization', `Bearer ${validToken}`);
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ results: ['bengal'] });
    });
  });

  describe('GET api/cats/breeds/:breed_id', () => {
    it('401 sin token', async () => {
      const res = await request(app).get('/api/cats/breeds/beng');
      expect(res.status).toBe(401);
      expect(CatsController.getBreedById).not.toHaveBeenCalled();
    });

    it('401 con token inválido', async () => {
      const res = await request(app)
        .get('/api/cats/breeds/beng')
        .set('Authorization', `Bearer ${invalidToken}`);
      expect(res.status).toBe(401);
      expect(CatsController.getBreedById).not.toHaveBeenCalled();
    });

    it('200 si token válido y breed_id correcto', async () => {
      const res = await request(app)
        .get('/api/cats/breeds/beng')
        .set('Authorization', `Bearer ${validToken}`);
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ breed: { id: 'beng', name: 'Bengal' } });
      expect(CatsController.getBreedById).toHaveBeenCalledTimes(1);
    });
  });
});
