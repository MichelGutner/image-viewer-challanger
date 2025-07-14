import { Image } from '@/storage/realm';

export const groupInRows = (data: Image[], perRow = 4): Image[][] => {
  const rows: Image[][] = [];
  for (let i = 0; i < data?.length; i += perRow) {
    rows.push(data.slice(i, i + perRow));
  }
  return rows;
};
