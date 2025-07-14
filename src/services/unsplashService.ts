import { IUnsplashPhoto } from '@/types/unsplash';
import axios from 'axios';

const UNSPLASH_ACCESS_KEY = '0ofWemcuXjVEU7wc5x4E3sLUFVmpew84vFOGog-hyao';

const unsplashApi = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
  },
});

export const getUnsplashPhotoInfo = async (picsumUrl: string) => {
  try {
    const photoId = extractPhotoIdFromUrl(picsumUrl);
    if (!photoId) return null;

    const { data } = await unsplashApi.get<IUnsplashPhoto>(
      `/photos/${photoId}`,
    );
    return data;
  } catch (error: any) {
    console.error('Failed to fetch Unsplash photo info:', error.message);
    return null;
  }
};

const extractPhotoIdFromUrl = (url: string): string | null => {
  const parts = url.split('/');
  return parts[parts.length - 1] || null;
};
