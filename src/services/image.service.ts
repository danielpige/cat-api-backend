import axios from 'axios';
import { CatImage } from '../interfaces/images.interface';

export const api = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
  headers: { 'x-api-key': process.env.CAT_API_KEY || '' }
});

export const getImagesByBreedId = async (breed_id: string): Promise<CatImage[]> => {
  const { data } = await api.get<CatImage[]>('/images/search', { params: { breed_id, limit: 5 } });
  return data;
};
