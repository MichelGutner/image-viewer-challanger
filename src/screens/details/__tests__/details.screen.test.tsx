import { render } from '@/utils/test-utils';
import { DetailsScreen } from '..';

const setup = () => render(<DetailsScreen />);

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useRoute: jest.fn(() => ({
    params: {
      image: {
        id: 'test-image-id',
        url: 'https://example.com/image.jpg',
        downloadStatus: 'completed',
      },
    },
  })),
}));

describe('DetailsScreen', () => {
  it('renders correctly', () => {
    const { getByTestId } = setup();
    expect(getByTestId('details-screen')).toBeDefined();
  });
});
