import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TFooterFloatingViewProps } from './types';
import { FOOTER_GRADIENT_COLORS } from './constants';

export const FooterFloatingView = ({
  children,
  opacity,
}: TFooterFloatingViewProps) => {
  const { bottom } = useSafeAreaInsets();

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity?.value ?? 1,
  }));

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={[styles.bottomButtons, animatedStyle]}>
      <LinearGradient
        style={[styles.linearGradient, { paddingBottom: bottom + 30 }]}
        colors={FOOTER_GRADIENT_COLORS}>
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
    bottom: 0,
    zIndex: 2,
  },
  linearGradient: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    gap: 16,
    padding: 12,
  },
});
