import { render } from '@/utils/test-utils';
import { FooterFloatingView } from '../component';
import { View } from 'react-native';

const setup = (props = {}) => {
  const defaultProps = {
    children: <View testID="test-content">Test content</View>,
    opacity: {} as any,
    ...props,
  };
  return render(<FooterFloatingView {...defaultProps} />);
};

describe('FooterFloatingView', () => {
  it('renders correctly', () => {
    const { getByTestId } = setup();
    expect(getByTestId).toBeDefined();
  });

  it('renders with children', () => {
    const { getByTestId } = setup();
    expect(getByTestId('test-content')).toBeDefined();
  });
});
