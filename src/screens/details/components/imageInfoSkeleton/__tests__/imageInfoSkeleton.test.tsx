import { render } from '@/utils/test-utils';
import { ImageInfoSkeleton } from '../component';

const setup = () => render(<ImageInfoSkeleton />);

describe('ImageInfoSkeleton', () => {
  it('renders correctly', () => {
    const { getByTestId } = setup();
    expect(getByTestId('image-info-skeleton')).toBeDefined();
  });
}); 