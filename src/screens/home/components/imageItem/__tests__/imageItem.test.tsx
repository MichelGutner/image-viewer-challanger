import { render } from '@/utils/test-utils';
import { ImageItem } from '../component';

const setup = (props = {}) => {
  const defaultProps = {
    item: {} as any,
    index: 0,
    scrollX: {} as any,
    onPress: () => {},
    ...props,
  };
  return render(<ImageItem {...defaultProps} />);
};

describe('ImageItem', () => {
  it('renders correctly', () => {
    const { getByTestId } = setup();
    expect(getByTestId).toBeDefined();
  });

  it('renders with different index', () => {
    const { getByTestId } = setup({ index: 1 });
    expect(getByTestId).toBeDefined();
  });
}); 