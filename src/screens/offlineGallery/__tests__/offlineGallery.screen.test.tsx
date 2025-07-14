import { render } from '@/utils/test-utils';
import { OfflineGallery } from '..';

const setup = () => render(<OfflineGallery />);

describe('OfflineGallery', () => {
  it('renders correctly', () => {
    const { getByTestId } = setup();
    expect(getByTestId('offline-gallery-screen')).toBeDefined();
  });
}); 