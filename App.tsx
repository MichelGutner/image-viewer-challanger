/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { DarkTheme, LightTheme } from '@/global';
import { AppStack } from '@/navigation';
import { realmModels } from '@/storage';
import { NavigationContainer } from '@react-navigation/native';
import { RealmProvider } from '@realm/react';
import React from 'react';
import { useColorScheme } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Realm from 'realm';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const queryClient = new QueryClient();

console.log('Realm path:', Realm.defaultPath);

function App(): React.JSX.Element {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const theme = isDarkMode ? LightTheme : DarkTheme;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={theme}>
        <RealmProvider schema={realmModels} deleteRealmIfMigrationNeeded>
          <QueryClientProvider client={queryClient}>
            <AppStack />
          </QueryClientProvider>
        </RealmProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
