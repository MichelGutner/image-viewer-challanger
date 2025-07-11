/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { AppStack } from '@/navigation';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}

export default App;
