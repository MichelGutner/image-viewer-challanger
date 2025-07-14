import { renderHook } from '@testing-library/react-native';
import { useDownloader } from '../useDownload';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(() => jest.fn()),
}));

jest.mock('@kesha-antonov/react-native-background-downloader', () => ({
  download: jest.fn(() => ({
    begin: jest.fn(() => ({
      progress: jest.fn(() => ({
        done: jest.fn(() => ({
          error: jest.fn().mockResolvedValueOnce('Download failed'),
        })),
      })),
    })),
    done: jest.fn(),
    error: jest.fn(),
  })),
  checkForExistingDownloads: jest.fn(),
  directories: {
    documents: 'documents',
    downloads: 'downloads',
  },
}));

// Mock react-native-fs
jest.mock('react-native-fs', () => ({
  exists: jest.fn(() => Promise.resolve(true)),
  unlink: jest.fn(() => Promise.resolve()),
}));

describe('useDownloader', () => {
  it('returns startDownload and deleteDownload functions', () => {
    const { result } = renderHook(() => useDownloader());

    expect(result.current.startDownload).toBeDefined();
    expect(result.current.deleteDownload).toBeDefined();
  });

  it('startDownload returns a task', () => {
    const { result } = renderHook(() => useDownloader());
    const task = result.current.startDownload(
      'test-id',
      'test-url',
      'test-destination',
    );
    console.log('🚀 ~ it ~ task:', task);

    expect(task).toBeDefined();
  });
});
