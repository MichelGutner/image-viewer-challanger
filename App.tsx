/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { DarkTheme, LightTheme } from '@/global';
import { AppStack, TabNavigator } from '@/navigation';
import { realmModels } from '@/storage';
import { NavigationContainer } from '@react-navigation/native';
import { RealmProvider } from '@realm/react';
import React, { useEffect } from 'react';
import { Platform, StatusBar, useColorScheme } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Realm from 'realm';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from '@/store';

const queryClient = new QueryClient();

console.log('Realm path:', Realm.defaultPath);

function App(): React.JSX.Element {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const theme = isDarkMode ? LightTheme : DarkTheme;

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={theme}>
        <Provider store={store}>
          <RealmProvider schema={realmModels} deleteRealmIfMigrationNeeded>
            <QueryClientProvider client={queryClient}>
              <AppStack />
            </QueryClientProvider>
          </RealmProvider>
        </Provider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
