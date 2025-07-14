import { render, RenderAPI } from '@testing-library/react-native';
import React, { ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

export const MockThemeProvider = ({ children }: { children: ReactElement }) => {
  return <NavigationContainer>{children}</NavigationContainer>;
};

const mockStore = configureStore([]);
const store = mockStore({});

const MockProviders = ({ children }: { children?: React.ReactNode }) => (
  <Provider store={store}>
    <MockThemeProvider>{React.isValidElement(children) ? children : <>{children}</>}</MockThemeProvider>
  </Provider>
);

export const customRender = <T extends {} = {}>(
  ui: React.ReactElement,
  options?: T,
): RenderAPI => {
  return render(ui, { wrapper: MockProviders as any, ...options });
};

export * from '@testing-library/react-native';

export { customRender as render };
