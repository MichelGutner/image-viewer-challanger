import { render, fireEvent, waitFor } from '@/utils/test-utils';
import { GalleryScreen } from '..';
import { useNavigation } from '@react-navigation/native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchImageList } from '@/services';

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

const mockImage = {
  id: 'test-id',
  download_url: 'https://example.com/image.jpg',
  downloadStatus: 'pending',
  filename: 'test-image.jpg',
};

const mockImagesData = [mockImage];

const mockInfiniteQueryResult = {
  data: {
    pages: [
      { data: mockImagesData, nextPage: 2 },
      { data: mockImagesData, nextPage: 3 },
    ],
  },
  fetchNextPage: jest.fn(),
  hasNextPage: true,
  isLoading: false,
  isFetchingNextPage: false,
  refetch: jest.fn(),
};

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(() => mockNavigation),
}));

jest.mock('@tanstack/react-query', () => ({
  useInfiniteQuery: jest.fn(() => mockInfiniteQueryResult),
}));

jest.mock('@/services', () => ({
  fetchImageList: jest.fn(() => Promise.resolve(mockImagesData)),
}));

const setup = () => {
  return render(<GalleryScreen />);
};

describe('GalleryScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders correctly', () => {
      const { getByTestId } = setup();
      expect(getByTestId('gallery-screen')).toBeDefined();
    });
  });

  describe('Image Fetching Methods', () => {
    it('calls fetchImageList with correct parameters', async () => {
      setup();
      
      const queryFn = (useInfiniteQuery as jest.Mock).mock.calls[0][0].queryFn;
      await queryFn({ pageParam: 1 });
      
      expect(fetchImageList).toHaveBeenCalledWith(1, 100);
    });

    it('handles fetchImageList error', async () => {
      (fetchImageList as jest.Mock).mockRejectedValue(new Error('API Error'));
      
      setup();
      
      const queryFn = (useInfiniteQuery as jest.Mock).mock.calls[0][0].queryFn;
      
      await expect(queryFn({ pageParam: 1 })).rejects.toThrow('API Error');
    });
  });
}); 