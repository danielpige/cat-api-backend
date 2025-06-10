// src/utils/response.ts
import { Response } from 'express';

export const successResponse = (
  res: Response,
  data: any,
  message = 'Operación exitosa',
  statusCode = 200
): void => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (
  res: Response,
  message = 'Ocurrió un error',
  statusCode = 500
): void => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};
