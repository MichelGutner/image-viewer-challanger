import { serializeImageForNavigation } from '../serialization';

describe('serialization', () => {
  it('serializes image for navigation correctly', () => {
    const mockImage = {
      id: 'test-id',
      author: 'Test Author',
      filename: 'test.jpg',
      url: 'https://example.com/test.jpg',
      download_url: 'https://example.com/download/test.jpg',
      downloadStatus: 'completed' as const,
      createdAt: new Date('2023-01-01T00:00:00Z'),
      deletedAt: null,
    } as any;

    const result = serializeImageForNavigation(mockImage);

    expect(result).toEqual({
      id: 'test-id',
      author: 'Test Author',
      filename: 'test.jpg',
      url: 'https://example.com/test.jpg',
      download_url: 'https://example.com/download/test.jpg',
      downloadStatus: 'completed',
      createdAt: '2023-01-01T00:00:00.000Z',
      deletedAt: undefined,
    });
  });

  it('handles null dates', () => {
    const mockImage = {
      id: 'test-id',
      author: 'Test Author',
      filename: 'test.jpg',
      url: 'https://example.com/test.jpg',
      download_url: 'https://example.com/download/test.jpg',
      downloadStatus: 'completed' as const,
      createdAt: null,
      deletedAt: null,
    } as any;

    const result = serializeImageForNavigation(mockImage);

    expect(result.createdAt).toBeUndefined();
    expect(result.deletedAt).toBeUndefined();
  });
}); 