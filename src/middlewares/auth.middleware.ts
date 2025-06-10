import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/response';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    errorResponse(res, 'Token requerido', 401);
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;
    next();
  } catch (error) {
    errorResponse(res, 'Token inválido', 401);
    return;
  }
};
