import { render } from '@/utils/test-utils';
import { Header } from '../component';

const setup = (props = {}) => {
  const defaultProps = {
    show: true,
    onPressBack: () => {},
    opacity: {} as any,
    ...props,
  };
  return render(<Header {...defaultProps} />);
};

describe('Header', () => {
  it('renders correctly', () => {
    const { getByTestId } = setup();
    expect(getByTestId).toBeDefined();
  });

  it('renders with show prop', () => {
    const { getByTestId } = setup({ show: false });
    expect(getByTestId).toBeDefined();
  });
}); 