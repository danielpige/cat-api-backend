import { getBreeds, getBreedById, searchBreeds } from '../../src/controllers/cats.controller';
import * as catService from '../../src/services/cat.service';
import { Request, Response } from 'express';
import { TypedRequestParams, TypedRequestQuery } from '../../src/types/request.type';

jest.mock('../../src/services/cat.service.ts');

describe('cats.controller', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getBreeds', () => {
    it('debería devolver todas las razas', async () => {
      const mockBreeds = [{ id: 'abys', name: 'Abyssinian' }];
      (catService.getAllBreeds as jest.Mock).mockResolvedValue(mockBreeds);

      await getBreeds(mockReq as Request, mockRes as Response);

      expect(catService.getAllBreeds).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith(mockBreeds);
    });
  });

  describe('getBreedById', () => {
    it('debería devolver una raza si existe', async () => {
      const mockBreed = { id: 'abys', name: 'Abyssinian' };
      mockReq = { params: { breed_id: 'abys' } };
      (catService.getBreedById as jest.Mock).mockResolvedValue(mockBreed);

      await getBreedById(mockReq as TypedRequestParams<{
    breed_id: string;
}, {}>, mockRes as Response);

      expect(catService.getBreedById).toHaveBeenCalledWith('abys');
      expect(mockRes.json).toHaveBeenCalledWith(mockBreed);
    });

    it('debería devolver 404 si la raza no existe', async () => {
      mockReq = { params: { breed_id: 'nonexistent' } };
      (catService.getBreedById as jest.Mock).mockResolvedValue(null);

      await getBreedById(mockReq as TypedRequestParams<{breed_id: string;}, {}>, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Raza no encontrada' });
    });
  });

  describe('searchBreeds', () => {
    it('debería devolver razas que coincidan con el término de búsqueda', async () => {
      const mockResults = [{ id: 'abys', name: 'Abyssinian' }];
      mockReq = { query: { q: 'abys' } };
      (catService.searchBreeds as jest.Mock).mockResolvedValue(mockResults);

      await searchBreeds(mockReq as TypedRequestQuery<{
    q: string;
}, {}>, mockRes as Response);

      expect(catService.searchBreeds).toHaveBeenCalledWith('abys');
      expect(mockRes.json).toHaveBeenCalledWith(mockResults);
    });
  });
});
