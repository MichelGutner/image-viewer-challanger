import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GalleryScreen, HomeScreen } from '@/screens';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tabs = createBottomTabNavigator();
const TAB_HEIGHT = 35;
const TAB_WIDTH = 120;

export const TabNavigator = () => {
  const { colors } = useTheme();
  const { bottom } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const middle = width / 2;

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: false,
        // [
        //   styles.tabBar,
        //   {
        //     left: middle - TAB_WIDTH / 2,
        //     backgroundColor: 'rgba(255, 255, 255, 0.1)',
        //     bottom: bottom + 30,
        //   },
        // ],
        tabBarActiveTintColor: colors.notification,
        tabBarInactiveTintColor: colors.background,
        tabBarActiveBackgroundColor: colors.card,
        tabBarItemStyle: {
          width: 35,
          height: 35,
          borderRadius: 16,
          overflow: 'hidden',
        },
      }}>
      <Tabs.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Gallery"
        component={GalleryScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="grid" size={20} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    width: TAB_WIDTH,
    height: TAB_HEIGHT,
    borderTopWidth: 0,
    borderRadius: TAB_HEIGHT / 2,
    alignSelf: 'center',
    borderTopColor: 'transparent',
  },
});
