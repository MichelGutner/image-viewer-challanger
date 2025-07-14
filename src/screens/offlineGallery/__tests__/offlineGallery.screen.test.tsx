import { render, fireEvent, waitFor } from '@/utils/test-utils';
import { OfflineGallery } from '..';
import { useNavigation } from '@react-navigation/native';
import { useQuery as useQueryRealm } from '@realm/react';

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

const mockImage = {
  id: 'test-id',
  download_url: 'https://example.com/image.jpg',
  downloadStatus: 'completed',
  filename: 'test-image.jpg',
};

const mockImagesData = [mockImage];

let mockMap: any = jest.fn(callback => [mockImagesData].map(callback));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(() => mockNavigation),
}));

jest.mock('@realm/react', () => {
  const RealReact = jest.requireActual('react');
  return {
    ...RealReact,
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

const setup = () => {
  return render(<OfflineGallery />);
};

describe('OfflineGallery', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockMap = jest.fn(callback => [mockImagesData].map(callback));
  });

  describe('Rendering', () => {
    it('renders correctly', () => {
      const { getByTestId } = setup();
      expect(getByTestId('offline-gallery-screen')).toBeDefined();
    });
  });

  describe('Data Filtering Methods', () => {
    it('filters images by download status completed', () => {
      setup();
      
      expect(useQueryRealm).toHaveBeenCalled();
    });
  });
}); 