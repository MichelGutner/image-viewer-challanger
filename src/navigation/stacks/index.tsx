import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as screens from '@/screens';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { Image } from '@/storage/realm';

export type NavigationProps<T> = NavigationProp<ScreenPropsRecord<T>>;

type ScreenPropsRecord<T> = {
  [K in keyof typeof screens]: T;
};

export type TRouteParams = RouteProp<{
  DetailsScreen: { image: Image; isDownloaded?: boolean };
  HomeScreen: undefined;
}>;

const Stack = createNativeStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={screens.HomeScreen} />
      <Stack.Screen name="Details" component={screens.DetailsScreen} />
      <Stack.Screen name="OfflineGallery" component={screens.OfflineGallery} />
      <Stack.Screen name="Gallery" component={screens.GalleryScreen} />
    </Stack.Navigator>
  );
};
