import { Image } from '@/storage/realm';

export const serializeImageForNavigation = (image: Image) => {
  return {
    id: image.id,
    author: image.author,
    filename: image.filename,
    url: image.url,
    download_url: image.download_url,
    downloadStatus: image.downloadStatus,
    createdAt: image.createdAt,
    deletedAt: image.deletedAt,
  };
}; 