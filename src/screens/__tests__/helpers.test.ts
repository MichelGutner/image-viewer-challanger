import { groupInRows } from '../helpers';

describe('groupInRows', () => {
  it('groups images in rows of 4 by default', () => {
    const mockImages = Array.from({ length: 10 }, (_, i) => ({ id: i.toString() } as any));
    const result = groupInRows(mockImages);
    
    expect(result).toHaveLength(3);
    expect(result[0]).toHaveLength(4);
    expect(result[1]).toHaveLength(4);
    expect(result[2]).toHaveLength(2);
  });

  it('groups images in custom row size', () => {
    const mockImages = Array.from({ length: 6 }, (_, i) => ({ id: i.toString() } as any));
    const result = groupInRows(mockImages, 3);
    
    expect(result).toHaveLength(2);
    expect(result[0]).toHaveLength(3);
    expect(result[1]).toHaveLength(3);
  });

  it('handles empty array', () => {
    const result = groupInRows([]);
    expect(result).toEqual([]);
  });

  it('handles array smaller than row size', () => {
    const mockImages = Array.from({ length: 2 }, (_, i) => ({ id: i.toString() } as any));
    const result = groupInRows(mockImages);
    
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveLength(2);
  });
}); 