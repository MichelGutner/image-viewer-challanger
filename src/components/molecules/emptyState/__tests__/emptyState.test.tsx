import { render } from '@/utils/test-utils';
import { EmptyState } from '../component';

const setup = (props = {}) => {
  const defaultProps = {
    message: 'Nenhum conteúdo encontrado',
    ...props,
  };
  return render(<EmptyState {...defaultProps} />);
};

describe('EmptyState', () => {
  it('renders correctly with default message', () => {
    const { getByText } = setup();
    expect(getByText('Nenhum conteúdo encontrado')).toBeDefined();
  });

  it('renders with custom message', () => {
    const { getByText } = setup({ message: 'Custom message' });
    expect(getByText('Custom message')).toBeDefined();
  });
}); 