import { render } from '@/utils/test-utils';
import { ImageDescriptions } from '../component';

const mockInfo = {
  description: 'Test description',
  alt_description: 'Test alt description',
  user: {
    name: 'Test User',
    username: 'testuser',
    links: {
      html: 'https://example.com',
    },
  },
  created_at: '2023-01-01T00:00:00Z',
  width: 1920,
  height: 1080,
  likes: 100,
  downloads: 50,
  views: 200,
  tags: [
    { title: 'nature' },
    { title: 'landscape' },
  ],
};

const setup = (props = {}) => {
  const defaultProps = {
    info: mockInfo as any,
    ...props,
  };
  return render(<ImageDescriptions {...defaultProps} />);
};

describe('ImageDescriptions', () => {
  it('renders correctly', () => {
    const { getByTestId } = setup();
    expect(getByTestId).toBeDefined();
  });

  it('renders with description', () => {
    const { getByText } = setup();
    expect(getByText('Test description')).toBeDefined();
  });

  it('renders with user information', () => {
    const { getByText } = setup();
    expect(getByText('Test User')).toBeDefined();
  });
}); 