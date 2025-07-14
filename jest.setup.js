// import '@testing-library/jest-native/extend-expect';

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock react-native-vector-icons
jest.mock('react-native-vector-icons/Feather', () => 'Icon');

// Mock react-native-fast-image
jest.mock('react-native-fast-image', () => 'FastImage');

// Mock react-native-linear-gradient
jest.mock('react-native-linear-gradient', () => 'LinearGradient');

// Mock @realm/react
jest.mock('@realm/react', () => ({
  useRealm: () => ({
    write: jest.fn(),
    create: jest.fn(),
  }),
  useQuery: jest.fn(() => []),
  useQueryRealm: jest.fn(() => []),
}));

// Mock @tanstack/react-query
jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(() => ({ data: null, isLoading: false })),
  useInfiniteQuery: jest.fn(() => ({ 
    data: { pages: [] }, 
    fetchNextPage: jest.fn(),
    hasNextPage: false,
    isLoading: false,
    isFetchingNextPage: false,
    refetch: jest.fn(),
  })),
}));

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

// Mock @react-navigation/native
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useTheme: () => ({
    colors: {
      text: '#000',
      background: '#fff',
      card: '#f0f0f0',
      notification: '#fff',
    },
  }),
}));

// Mock react-native-fs
jest.mock('react-native-fs', () => ({
  ...jest.requireActual('react-native-fs'),
  DocumentDirectoryPath: '/test',
  exists: jest.fn(),
  mkdir: jest.fn(),
  unlink: jest.fn(),
}));

// Mock @kesha-antonov/react-native-background-downloader
jest.mock('@kesha-antonov/react-native-background-downloader', () => ({
  ...jest.requireActual('@kesha-antonov/react-native-background-downloader'),
  download: jest.fn(() => ({
    progress: jest.fn(() => ({
      done: jest.fn(() => ({
        error: jest.fn(),
      })),
    })),
  })),
})); 