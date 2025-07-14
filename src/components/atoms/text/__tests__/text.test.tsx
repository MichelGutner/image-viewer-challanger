import { render } from '@/utils/test-utils';
import { Text } from '../component';

const setup = (props = {}) => {
  const defaultProps = {
    children: 'Test text',
    ...props,
  };
  return render(<Text {...defaultProps} />);
};

describe('Text', () => {
  it('renders correctly with default type', () => {
    const { getByText } = setup();
    expect(getByText('Test text')).toBeDefined();
  });

  it('renders with different types', () => {
    const { getByText } = setup({ type: 'title' });
    expect(getByText('Test text')).toBeDefined();
  });

  it('renders with custom style', () => {
    const { getByText } = setup({ style: { color: 'red' } });
    expect(getByText('Test text')).toBeDefined();
  });
}); 