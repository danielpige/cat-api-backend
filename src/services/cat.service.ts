import axios from 'axios';
import { Breed } from '../interfaces/brees.interface';

const API = 'https://api.thecatapi.com/v1';
const KEY = process.env.CAT_API_KEY;

export const api = axios.create({
  baseURL: API,
  headers: { 'x-api-key': KEY || '' }
});

export const getAllBreeds = async (): Promise<Breed[]> => (await api.get<Breed[]>('/breeds')).data;
export const getBreedById = async (id: string): Promise<Breed | undefined> => {
  const breeds = (await api.get<Breed[]>('/breeds')).data;
  return breeds.find((b: any) => b.id === id);
};
export const searchBreeds = async (q: string): Promise<Breed[]> => (await api.get<Breed[]>('/breeds/search', { params: { q } })).data;
