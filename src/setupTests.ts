// Setup for tests

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock react-native-vector-icons
jest.mock('react-native-vector-icons/Feather', () => 'Icon');

// Mock react-native-fast-image
jest.mock('react-native-fast-image', () => {
  const FastImage = () => null;
  FastImage.resizeMode = {
    cover: 'cover',
    contain: 'contain',
    stretch: 'stretch',
    center: 'center',
  };
  return FastImage;
});

// Mock react-native-linear-gradient
jest.mock('react-native-linear-gradient', () => 'LinearGradient');

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => ({
  PanGestureHandler: 'PanGestureHandler',
  GestureHandlerRootView: 'GestureHandlerRootView',
}));

// Mock realm
jest.mock('realm', () => ({
  Object: class MockObject {},
  index: jest.fn(),
  ObjectSchema: jest.fn(),
}));

// Mock @realm/react
jest.mock('@realm/react', () => {
  // @ts-ignore
  const mockArray: any = [];
  // @ts-ignore
  mockArray.filtered = function () { return this; };
  return {
    useRealm: () => ({
      write: jest.fn(),
      create: jest.fn(),
    }),
    useQuery: jest.fn(() => mockArray),
    useQueryRealm: jest.fn(() => mockArray),
    useObject: jest.fn(() => ({ downloadStatus: 'completed' })),
  };
});

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
  QueryClient: jest.fn().mockImplementation(() => ({
    setQueryData: jest.fn(),
    getQueryData: jest.fn(),
    invalidateQueries: jest.fn(),
  })),
}));

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

// Mock @react-navigation/native
jest.mock('@react-navigation/native', () => ({
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
  useRoute: () => ({ params: {} }),
  NavigationContainer: ({ children }: { children: any }) => children,
  DefaultTheme: {
    colors: {
      text: '#000',
      background: '#fff',
      card: '#f0f0f0',
      notification: '#fff',
    },
  },
  DarkTheme: {
    colors: {
      text: '#fff',
      background: '#000',
      card: '#222',
      notification: '#fff',
    },
  },
}));

// Mock react-native-fs
jest.mock('react-native-fs', () => ({
  DocumentDirectoryPath: '/test',
  exists: jest.fn(),
  mkdir: jest.fn(),
  unlink: jest.fn(),
}));

jest.mock("@kesha-antonov/react-native-background-downloader", () => ({
  download: jest.fn(),
  checkForExistingDownloads: jest.fn(),
  directories: {
    documents: "documents",
    downloads: "downloads",
  },
}));

jest.mock('@shopify/flash-list', () => ({
  FlashList: () => null,
})); 

jest.mock('@react-navigation/native-stack', () => {
  const React = require('react');
  return {
    createNativeStackNavigator: () => ({
      Navigator: ({ children }: any) => React.createElement(React.Fragment, null, children),
      Screen: ({ children }: any) => React.createElement(React.Fragment, null, children),
    }),
  };
}); 