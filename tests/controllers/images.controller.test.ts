import { getImages } from '../../src/controllers/images.controller';
import * as imageService from '../../src/services/image.service';
import { Request, Response } from 'express';
import { TypedRequestQuery } from '../../src/types/request.type';
import { CatImage } from '../../src/interfaces/images.interface';

jest.mock('../../src/services/image.service');

describe('image.controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  const json = jest.fn();

  beforeEach(() => {
    req = {
      query: {
        breed_id: 'abys'
      }
    };
    res = { json: jest.fn() } as unknown as Response;
    jest.clearAllMocks();
  });

  it('debería retornar las imágenes por breed_id', async () => {
    const mockImages: CatImage[] = [
      { id: 'img1', url: 'https://example.com/img1.jpg', width: 100, height: 200 },
      { id: 'img2', url: 'https://example.com/img2.jpg', width: 100, height: 200 }
    ];

    (imageService.getImagesByBreedId as jest.Mock).mockResolvedValueOnce(mockImages);

    await getImages(req as TypedRequestQuery<{ breed_id: string; }, {}>, res as Response);

    expect(imageService.getImagesByBreedId).toHaveBeenCalledWith('abys');
    expect(res.json).toHaveBeenCalledWith(mockImages);
  });
});
