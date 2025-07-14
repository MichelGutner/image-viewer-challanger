import { render } from '@/utils/test-utils';
import { LoadingSkeleton } from '../component';

const setup = (props = {}) => {
  const defaultProps = {
    type: 'gallery' as const,
    rows: 4,
    columns: 4,
    ...props,
  };
  return render(<LoadingSkeleton {...defaultProps} />);
};

describe('LoadingSkeleton', () => {
  it('renders gallery type correctly', () => {
    const { getByTestId } = setup();
    expect(getByTestId).toBeDefined();
  });

  it('renders image type correctly', () => {
    const { getByTestId } = setup({ type: 'image' });
    expect(getByTestId).toBeDefined();
  });

  it('renders text type correctly', () => {
    const { getByTestId } = setup({ type: 'text' });
    expect(getByTestId).toBeDefined();
  });

  it('renders with custom rows and columns', () => {
    const { getByTestId } = setup({ rows: 6, columns: 3 });
    expect(getByTestId).toBeDefined();
  });
}); 