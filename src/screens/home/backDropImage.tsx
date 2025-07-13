import { IImage } from '@/types';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(FastImage);

export const BackDropImage = ({
  image,
  index,
  scrollX,
}: {
  image: IImage;
  index: number;
  scrollX: SharedValue<number>;
}) => {
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
      blurRadius={50}
    />
  );
};
