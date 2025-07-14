import { render, fireEvent, waitFor } from '@/utils/test-utils';
import { DetailsScreen } from '..';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import { useObject, useRealm } from '@realm/react';
import { useDownloader } from '@/hooks';
import { getUnsplashPhotoInfo } from '@/services';

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

const mockRoute = {
  params: {
    image: {
      id: 'test-id',
      download_url: 'https://example.com/image.jpg',
      downloadStatus: 'pending',
      filename: 'test-image.jpg',
      url: 'https://unsplash.com/photos/test',
    },
    isDownloaded: false,
  },
};

const mockTheme = {
  colors: {
    background: '#ffffff',
  },
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
  deleteDownload: jest.fn(),
};

const mockImageObject = {
  downloadStatus: 'pending',
};

const mockImageInfo = {
  id: 'test-id',
  description: 'Test image description',
  alt_description: 'Test alt description',
  user: {
    name: 'Test User',
    username: 'testuser',
  },
  urls: {
    regular: 'https://example.com/image.jpg',
  },
};

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(() => mockNavigation),
  useRoute: jest.fn(() => mockRoute),
  useTheme: jest.fn(() => mockTheme),
}));

jest.mock('@realm/react', () => ({
  useRealm: jest.fn(() => mockRealm),
  useObject: jest.fn(() => mockImageObject),
}));

jest.mock('@/hooks', () => ({
  useDownloader: jest.fn(() => mockDownloader),
}));

jest.mock('@/services', () => ({
  getUnsplashPhotoInfo: jest.fn(() => Promise.resolve(mockImageInfo)),
}));

const setup = () => {
  return render(<DetailsScreen />);
};

describe('DetailsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders correctly', () => {
      const { getByTestId } = setup();
      expect(getByTestId('details-screen')).toBeDefined();
    });

    it('renders with image info skeleton when loading', () => {
      (getUnsplashPhotoInfo as jest.Mock).mockImplementation(() => new Promise(() => {}));
      const { getByTestId } = setup();
      expect(getByTestId('image-info-skeleton')).toBeDefined();
    });
  });

  describe('Image Information Methods', () => {
    it('fetches image details on mount', async () => {
      setup();
      
      await waitFor(() => {
        expect(getUnsplashPhotoInfo).toHaveBeenCalledWith(mockRoute.params.image.url);
      });
    });

    it('handles API error gracefully', async () => {
      (getUnsplashPhotoInfo as jest.Mock).mockRejectedValue(new Error('API Error'));
      
      setup();
      
      await waitFor(() => {
        expect(getUnsplashPhotoInfo).toHaveBeenCalledWith(mockRoute.params.image.url);
      });
    });
  });
});
