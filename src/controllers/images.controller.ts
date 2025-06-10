import { Response } from 'express';
import { getImagesByBreedId } from '../services/image.service';
import { TypedRequestQuery } from '../types/request.type';
import { successResponse } from '../utils/response';

export const getImages = async (req: TypedRequestQuery<{ breed_id: string }, {}>, res: Response) => {
  const breed_id = req.query.breed_id;
  const images = await getImagesByBreedId(breed_id as string);
  successResponse(res, images);
};
