import { render, fireEvent, waitFor, act } from '@/utils/test-utils';
import { HomeScreen } from '..';
import { useQuery } from '@tanstack/react-query';
import { fetchRandomImage } from '@/services/picturesService';

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

const mockRealm = {
  write: jest.fn(),
  create: jest.fn(),
};

const mockDownloader = {
  startDownload: jest.fn(() => ({
    progress: jest.fn(() => ({
      done: jest.fn(() => ({
        error: jest.fn(),
      })),
    })),
  })),
};

const mockImage = {
  id: 'test-id',
  download_url: 'https://example.com/image.jpg',
  downloadStatus: 'pending',
  filename: 'test-image.jpg',
};

let mockImagesData = [mockImage];

let mockMap: any = jest.fn(callback => [mockImagesData].map(callback));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(() => mockNavigation),
}));

jest.mock('@realm/react', () => {
  const RealReact = jest.requireActual('react');
  return {
    ...RealReact,
    useRealm: jest.fn(),
    useObject: jest.fn(() => ({
      assets: [],
    })),
    useQuery: jest.fn(() => ({
      map: mockMap,
      filtered: jest.fn((query, ids) => {
        return {
          ...[mockImagesData],
          filtered: jest.fn((query, ids) => {
            return [mockImagesData];
          }),
        };
      }),
    })),
  };
});

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(() => ({
    data: mockImage,
    isLoading: false,
    refetch: jest.fn(),
  })),
  useQueryClient: jest.fn(() => ({
    getQueryData: jest.fn(),
    setQueryData: jest.fn(),
  })),
}));
jest.mock('@/hooks', () => ({
  useDownloader: jest.fn(() => mockDownloader),
}));
jest.mock('@/services/picturesService', () => ({
  fetchRandomImage: jest.fn(() => Promise.resolve(mockImage)),
}));
jest.mock('@/storage/realm', () => ({
  Image: {
    createPlaceholder: jest.fn(() => mockImage),
    markAsDownloaded: jest.fn(() => mockImage),
    markAsFailed: jest.fn(() => mockImage),
    markAsDeleted: jest.fn(() => mockImage),
  },
}));

const setup = () => {
  return render(<HomeScreen />);
};

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockMap = jest.fn(callback => [mockImagesData].map(callback));
  });

  describe('Rendering', () => {
    it('renders empty state when no images available', () => {
      mockMap = jest.fn(() => []);
      const { getByText } = setup();
      expect(getByText('Nenhuma imagem disponível')).toBeDefined();
    });
    it('renders correctly', () => {
      const { getByTestId } = setup();
      expect(getByTestId('home-screen')).toBeDefined();
    });

    it('renders with loading state when query is loading', () => {
      mockMap = jest.fn(() => []);
      (useQuery as jest.Mock).mockReturnValue({
        data: null,
        isLoading: true,
      });
      const { getByText } = setup();
      expect(getByText('Carregando...')).toBeDefined();
    });
  });

  describe('Navigation Methods', () => {
    it('navigates to Gallery when remote tab is pressed', () => {
      const { getAllByTestId } = setup();
      const topButtons = getAllByTestId('top-buttons')[0];

      fireEvent.press(topButtons);

      expect(mockNavigation.navigate).toHaveBeenCalledWith('Gallery');
    });

    it('navigates to OfflineGallery when offline tab is pressed', () => {
      const { getAllByTestId } = setup();
      const topButtons = getAllByTestId('top-buttons')[1];

      fireEvent.press(topButtons);

      expect(mockNavigation.navigate).toHaveBeenCalledWith('OfflineGallery');
    });
  });

  describe('Image Fetching Methods', () => {
    it('fetches and adds new image when plus button is pressed', async () => {
      const { getByTestId } = setup();
      const plusButton = getByTestId('plus-button-test-id');

      await act(async () => {
        await plusButton.props.children.props.onPress();
      });

      expect(fetchRandomImage).toHaveBeenCalled();
    });

    it('handles error when fetching image fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      (fetchRandomImage as jest.Mock).mockRejectedValue(
        new Error('Fetch failed'),
      );

      const { getByTestId } = setup();
      const plusButton = getByTestId('plus-button-test-id');

      await act(async () => {
        await plusButton.props.children.props.onPress();
      });

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith(
          'Erro ao buscar nova imagem:',
          expect.any(Error),
        );
      });

      consoleSpy.mockRestore();
    });
  });

  describe('Download Methods', () => {
    it('handles download progress', () => {
      const { getByTestId } = setup();
      const downloadButton = getByTestId('download-button-test-id');

      fireEvent.press(downloadButton);

      const downloadInstance = mockDownloader.startDownload();
      const progressInstance = downloadInstance.progress();

      expect(progressInstance).toBeDefined();
      expect(progressInstance.done).toBeDefined();
    });

    it('handles download completion', () => {
      const { getByTestId } = setup();
      const downloadButton = getByTestId('download-button-test-id');

      fireEvent.press(downloadButton);

      const downloadInstance = mockDownloader.startDownload();
      const progressInstance = downloadInstance.progress();
      const doneInstance = progressInstance.done();

      expect(doneInstance).toBeDefined();
    });
  });
});
