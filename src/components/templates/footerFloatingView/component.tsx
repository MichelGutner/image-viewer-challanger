import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TFooterFloatingViewProps } from './types';

export const FooterFloatingView = ({
  children,
  opacity,
}: TFooterFloatingViewProps) => {
  const { bottom } = useSafeAreaInsets();

  const animatedBottomStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      entering={FadeInDown.delay(400)}
      exiting={FadeInUp.delay(400)}
      style={[
        styles.bottomButtons,
        { bottom: bottom + 20 },
        animatedBottomStyle,
      ]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bottomButtons: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 16,
    zIndex: 2,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
  },
});
