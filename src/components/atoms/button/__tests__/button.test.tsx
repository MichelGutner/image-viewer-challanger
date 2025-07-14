import { render } from '@/utils/test-utils';
import { Button } from '../component';

const setup = (props = {}) => {
  const defaultProps = {
    iconName: 'chevron-left' as const,
    onPress: () => {},
    testID: 'test-button',
    ...props,
  };
  return render(<Button {...defaultProps} />);
};

describe('Button', () => {
  it('renders correctly', () => {
    const { getByTestId } = setup();
    expect(getByTestId('test-button')).toBeDefined();
  });
}); 