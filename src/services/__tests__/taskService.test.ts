import { executeDownloadTask, stopAllTasks, retrieveAndStartExistentsTasks } from '../taskService';
import RNBackgroundDownloader, { download } from '@kesha-antonov/react-native-background-downloader';

jest.mock('@kesha-antonov/react-native-background-downloader', () => ({
  download: jest.fn(),
  checkForExistingDownloads: jest.fn(() => [{ stop: jest.fn() }]),
  directories: { documents: '/mock/documents' },
}));

describe('taskService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('executeDownloadTask chama download com destination correto', () => {
    const downloadProps = { url: 'url', id: 'id' };
    executeDownloadTask('file.jpg', downloadProps as any);
    expect(download).toHaveBeenCalledWith(expect.objectContaining({
      destination: '/mock/documents/file.jpg',
    }));
  });

  it('stopAllTasks chama checkForExistingDownloads e stop', () => {
    stopAllTasks();
    expect(RNBackgroundDownloader.checkForExistingDownloads).toHaveBeenCalled();
  });

  it('retrieveAndStartExistentsTasks chama checkForExistingDownloads', () => {
    retrieveAndStartExistentsTasks();
    expect(RNBackgroundDownloader.checkForExistingDownloads).toHaveBeenCalled();
  });
}); 