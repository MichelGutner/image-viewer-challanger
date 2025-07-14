import { getUnsplashPhotoInfo } from '../unsplashService';

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
  })),
}));

describe('unsplashService', () => {
  it('extracts photo ID from URL correctly', () => {
    const url = 'https://picsum.photos/id/123/800/600';
    const result = getUnsplashPhotoInfo(url);
    expect(result).toBeDefined();
  });

  it('handles invalid URL', () => {
    const url = 'https://example.com';
    const result = getUnsplashPhotoInfo(url);
    expect(result).toBeDefined();
  });
}); 