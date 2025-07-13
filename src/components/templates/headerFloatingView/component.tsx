import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { THeaderFloatingViewProps } from './types';

export const HeaderFloatingView = ({
  children,
  opacity,
}: THeaderFloatingViewProps) => {
  const { top } = useSafeAreaInsets();

  const animatedBottomStyle = useAnimatedStyle(() => ({
    opacity: opacity?.value ?? 1,
  }));

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={[styles.bottomButtons, animatedBottomStyle]}>
      <LinearGradient
        style={[styles.linearGradient, { paddingTop: top, padding: 12 }]}
        colors={['rgba(0, 0, 0, 1)', 'transparent']}>
        {children}
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bottomButtons: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 2,
  },
  linearGradient: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'space-between',
  },
});
