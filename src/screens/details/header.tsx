import { Button, Text } from '@/components';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type THeaderProps = {
  show: boolean;
  onPressBack?: () => void;
};

export const Header = ({ show, onPressBack }: THeaderProps) => {
  const { top } = useSafeAreaInsets();
  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
    top: top + 24,
  }));

  useEffect(() => {
    if (show) {
      translateY.value = 0;
      opacity.value = withTiming(1);
    } else {
      translateY.value = withTiming(-100);
      opacity.value = withTiming(0);
    }
  }, [show]);

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Button iconName="chevron-left" onPress={onPressBack} />
      <Text style={{ flex: 1, textAlign: 'center' }} type="defaultSemiBold">
        Voltar
      </Text>
      {/* <Button iconName="ChevronRight" onPress={() => null} /> */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
});
