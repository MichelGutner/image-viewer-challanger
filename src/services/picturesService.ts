import axios from 'axios';
import { IImage } from '@/types';

const api = axios.create({
  baseURL: 'https://picsum.photos/v2',
});

export const fetchRandomImage = async (): Promise<IImage> => {
  const page = Math.floor(Math.random() * 1000) + 1;
  const response = await api.get<IImage[]>(`/list?page=${page}&limit=1`);
  return response.data[0];
};

/**
 * @param page Número da página
 * @param limit Quantidade de imagens por página
 * @description Busca uma lista de imagens paginada da API do Picsum.
 * @docs https://picsum.photos
 */
export const fetchImageList = async (
  page: number = 1,
  limit: number = 20,
): Promise<IImage[]> => {
  const response = await api.get<IImage[]>(
    `/list?page=${page}&limit=${limit}`,
  );
  return response.data;
};
