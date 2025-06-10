// tests/services/cats.service.test.ts
import * as catService from '../../src/services/cat.service';
import { Breed } from '../../src/interfaces/brees.interface';

describe('cat.service', () => {
  const mockGet = jest.fn(); // o jest.fn() si estás usando Jest
  const mockBreeds: Breed[] = [
    { id: 'abys', name: 'Abyssinian', description: 'desc', origin: 'Egypt', weight: { metric: '', imperial: '' }, life_span: '14 - 15', adaptability: 5, affection_level: 5, child_friendly: 4, dog_friendly: 4, energy_level: 5, grooming: 1, health_issues: 2, intelligence: 5, shedding_level: 2, social_needs: 5, stranger_friendly: 5, vocalisation: 3, experimental: 0, hairless: 0, natural: 1, rare: 0, rex: 0, suppressed_tail: 0, short_legs: 0, hypoallergenic: 0, indoor: 0, lap: 0, temperament: '', country_code: '', country_codes: '', alt_names: '', wikipedia_url: '', reference_image_id: '', cfa_url: '', vetstreet_url: '', vcahospitals_url: '' }
  ];

  beforeAll(() => {
    (catService.api.get as jest.Mock) = mockGet;
  });

  afterEach(() => {
    mockGet.mockReset();
  });

  it('getAllBreeds debería retornar todas las razas', async () => {
    mockGet.mockResolvedValueOnce({ data: mockBreeds });
    const result = await catService.getAllBreeds();
    expect(result).toEqual(mockBreeds);
    expect(mockGet).toHaveBeenCalledWith('/breeds');
  });

  it('getBreedById debería retornar una raza si existe', async () => {
    mockGet.mockResolvedValueOnce({ data: mockBreeds });
    const result = await catService.getBreedById('abys');
    expect(result).toEqual(mockBreeds[0]);
  });

  it('getBreedById debería retornar undefined si no existe', async () => {
    mockGet.mockResolvedValueOnce({ data: mockBreeds });
    const result = await catService.getBreedById('xyz');
    expect(result).toBeUndefined();
  });

  it('searchBreeds debería retornar resultados', async () => {
    mockGet.mockResolvedValueOnce({ data: mockBreeds });
    const result = await catService.searchBreeds('aby');
    expect(result).toEqual(mockBreeds);
    expect(mockGet).toHaveBeenCalledWith('/breeds/search', { params: { q: 'aby' } });
  });
});
