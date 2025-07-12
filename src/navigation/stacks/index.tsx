import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as screens from '@/screens';
import { NavigationProp } from '@react-navigation/native';

export type NavigationProps<T> = NavigationProp<ScreenPropsRecord<T>>;

type ScreenPropsRecord<T> = {
  [K in keyof typeof screens]: T;
};

const Stack = createNativeStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator  screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={screens.HomeScreen} />
      <Stack.Screen name="Details" component={screens.DetailsScreen} />
    </Stack.Navigator>
  );
};
