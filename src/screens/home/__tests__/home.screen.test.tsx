import { render } from '@/utils/test-utils';

import { HomeScreen } from '..';

const setup = () => render(<HomeScreen />);

describe('HomeScreen', () => {
  it('renders correctly', () => {
    const { getByTestId } = setup();
    expect(getByTestId('home-screen')).toBeDefined();
  });
});
