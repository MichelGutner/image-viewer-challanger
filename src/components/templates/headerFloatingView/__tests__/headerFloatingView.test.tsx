import { render } from '@/utils/test-utils';
import { HeaderFloatingView } from '../component';
import { View } from 'react-native';

const MockView = View;

const setup = (props = {}) => {
  const defaultProps = {
    children: <MockView testID="test-content">Test content</MockView>,
    opacity: {} as any,
    ...props,
  };
  return render(<HeaderFloatingView {...defaultProps} />);
};

describe('HeaderFloatingView', () => {
  it('renders correctly', () => {
    const { getByTestId } = setup();
    expect(getByTestId).toBeDefined();
  });

  it('renders with children', () => {
    const { getByTestId } = setup();
    expect(getByTestId('test-content')).toBeDefined();
  });
}); 