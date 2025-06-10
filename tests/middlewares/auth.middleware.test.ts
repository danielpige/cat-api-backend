// tests/middlewares/auth.middleware.test.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authenticateJWT } from '../../src/middlewares/auth.middleware';

jest.mock('jsonwebtoken');

describe('Middleware - authenticateJWT', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      headers: {} as Record<string, string | string[] | undefined>
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it('debería responder 401 si no hay token', () => {
    authenticateJWT(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token requerido' });
    expect(next).not.toHaveBeenCalled();
  });

  it('debería responder 401 si el token es inválido', () => {
    (req.headers as Record<string, string>).authorization = 'Bearer token_invalido';
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error('Token inválido');
    });

    authenticateJWT(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token inválido' });
    expect(next).not.toHaveBeenCalled();
  });

  it('debería llamar a next si el token es válido', () => {
    (req.headers as Record<string, string>).authorization = 'Bearer token_valido';
    const decodedUser = { id: '123', email: 'test@example.com' };
    (jwt.verify as jest.Mock).mockReturnValue(decodedUser);

    authenticateJWT(req as Request, res as Response, next);

    expect((req as any).user).toEqual(decodedUser);
    expect(next).toHaveBeenCalled();
  });
});
