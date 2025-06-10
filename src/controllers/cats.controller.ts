import { Request, Response } from 'express';
import * as catService from '../services/cat.service';
import { TypedRequestParams, TypedRequestQuery } from '../types/request.type';
import { errorResponse, successResponse } from '../utils/response';

export const getBreeds = async (_req: Request, res: Response) => {
  successResponse(res, await catService.getAllBreeds());
};

export const getBreedById = async (req: TypedRequestParams<{ breed_id: string }, {}>, res: Response) => {
  const breed = await catService.getBreedById(req.params.breed_id);
  breed ? successResponse(res, breed) : errorResponse(res, 'Raza no encontrada', 404);
};

export const searchBreeds = async (req: TypedRequestQuery<{ q: string }, {}>, res: Response) => {
  const q = req.query.q;
  const breeds = await catService.searchBreeds(q)
  successResponse(res, breeds);
};
