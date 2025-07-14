import { render } from '@/utils/test-utils';
import { GalleryLoading } from '../component';

const setup = (props = {}) => {
  const defaultProps = {
    message: 'Carregando imagens...',
    rows: 6,
    columns: 4,
    ...props,
  };
  return render(<GalleryLoading {...defaultProps} />);
};

describe('GalleryLoading', () => {
  it('renders correctly with default props', () => {
    const { getByText } = setup();
    expect(getByText('Carregando imagens...')).toBeDefined();
  });

  it('renders with custom message', () => {
    const { getByText } = setup({ message: 'Custom loading message' });
    expect(getByText('Custom loading message')).toBeDefined();
  });

  it('renders with custom rows and columns', () => {
    const { getByText } = setup({ rows: 4, columns: 3 });
    expect(getByText('Carregando imagens...')).toBeDefined();
  });
}); 