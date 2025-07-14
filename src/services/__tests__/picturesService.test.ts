jest.mock('axios');
const axios = require('axios');

describe('picturesService', () => {
  let fetchRandomImage: any;
  let fetchImageList: any;
  let mockGet: jest.Mock;

  beforeEach(() => {
    jest.resetModules();
    mockGet = jest.fn();
    jest.doMock('axios', () => ({
      create: jest.fn(() => ({
        get: mockGet,
      })),
    }));
    ({ fetchRandomImage, fetchImageList } = require('../picturesService'));
  });

  it('fetchRandomImage retorna uma imagem', async () => {
    const mockImage = { id: '1', download_url: 'url', author: 'author' };
    mockGet.mockResolvedValue({ data: [mockImage] });
    const result = await fetchRandomImage();
    expect(result).toEqual(mockImage);
  });

  it('fetchImageList retorna lista de imagens', async () => {
    const mockImage = { id: '1', download_url: 'url', author: 'author' };
    mockGet.mockResolvedValue({ data: [mockImage, mockImage] });
    const result = await fetchImageList(1, 2);
    expect(result).toEqual([mockImage, mockImage]);
  });
}); 