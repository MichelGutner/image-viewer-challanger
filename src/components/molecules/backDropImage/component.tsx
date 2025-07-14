import { Image } from '@/storage/realm';
import { StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

export const BackDropImage = ({
  image,
  index,
  scrollX,
}: {
  image: Image;
  index: number;
  scrollX: SharedValue<number>;
}) => {
  const blueRadiusValue = 50;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollX.value,
        [index - 1, index, index + 1],
        [0, 1, 0],
        Extrapolation.CLAMP,
      ),
    };
  });

  return (
    <Animated.Image
      style={[StyleSheet.absoluteFillObject, animatedStyle]}
      source={{ uri: image.download_url }}
      blurRadius={blueRadiusValue}
    />
  );
};
