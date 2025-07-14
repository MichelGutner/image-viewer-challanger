import { Image } from '../image';

describe('Image model', () => {
  const baseData = { id: '1', author: 'author', url: 'url' };

  it('createBlank retorna objeto correto', () => {
    const result = Image.createBlank(baseData);
    expect(result.downloadStatus).toBe('blank');
    expect(result.createdAt).toBeInstanceOf(Date);
  });

  it('createPlaceholder retorna objeto correto', () => {
    const result = Image.createPlaceholder(baseData);
    expect(result.downloadStatus).toBe('downloading');
    expect(result.createdAt).toBeInstanceOf(Date);
  });

  it('markAsDownloaded retorna objeto correto', () => {
    const result = Image.markAsDownloaded(baseData);
    expect(result.downloadStatus).toBe('completed');
    expect(result.filename).toBe('1.jpg');
  });

  it('markAsDeleted retorna objeto correto', () => {
    const result = Image.markAsDeleted(baseData);
    expect(result.downloadStatus).toBe('deleted');
  });
}); 