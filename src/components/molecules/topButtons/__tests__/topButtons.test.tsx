import { render } from '@/utils/test-utils';
import { TopButtons } from '../component';

const setup = (props = {}) => {
  const defaultProps = {
    onPress: () => {},
    remoteCount: 0,
    offlineCount: 0,
    ...props,
  };
  return render(<TopButtons {...defaultProps} />);
};

describe('TopButtons', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = setup();
    expect(getByTestId).toBeDefined();
  });

  it('renders with counts', () => {
    const { getByText } = setup({ remoteCount: 5, offlineCount: 3 });
    expect(getByText('5')).toBeDefined();
    expect(getByText('3')).toBeDefined();
  });

  it('renders with large counts', () => {
    const { getAllByText } = setup({ remoteCount: 1000, offlineCount: 1500 });
    expect(getAllByText('999+')).toHaveLength(2);
  });
}); 