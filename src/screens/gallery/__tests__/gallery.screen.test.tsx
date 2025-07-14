import { render } from '@/utils/test-utils';
import { GalleryScreen } from '..';

const setup = () => render(<GalleryScreen />);

describe('GalleryScreen', () => {
  it('renders correctly', () => {
    const { getByTestId } = setup();
    expect(getByTestId('gallery-screen')).toBeDefined();
  });
}); 