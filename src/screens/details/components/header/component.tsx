import { Button, Text } from '@/components';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { THeaderProps } from './types';

export const Header = ({ show, onPressBack, opacity }: THeaderProps) => {
  const { top } = useSafeAreaInsets();
  const translateY = useSharedValue(-100);
  const internalOpacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    if (opacity?.value) {
      internalOpacity.value = opacity.value;
    }
    return {
      transform: [{ translateY: translateY.value }],
      opacity: internalOpacity.value,
      top: top + 4,
    };
  });

  useEffect(() => {
    if (show) {
      translateY.value = 0;
      internalOpacity.value = withTiming(1);
    } else {
      translateY.value = withTiming(-100);
      internalOpacity.value = withTiming(0);
    }
  }, [show, opacity?.value]);

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Button iconName="chevron-left" onPress={onPressBack} />
      <Text style={{ flex: 1, textAlign: 'center' }} type="defaultSemiBold">
        Voltar
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
});
