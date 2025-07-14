import { render } from '@/utils/test-utils';
import { BackDropImage } from '../component';

const setup = (props = {}) => {
  const defaultProps = {
    image: {} as any,
    index: 0,
    scrollX: {} as any,
    ...props,
  };
  return render(<BackDropImage {...defaultProps} />);
};

describe('BackDropImage', () => {
  it('renders correctly', () => {
    const { getByTestId } = setup();
    expect(getByTestId).toBeDefined();
  });
}); 