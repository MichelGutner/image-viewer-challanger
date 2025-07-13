import { IImage } from '@/types';
import React from 'react';
import { Dimensions, Pressable } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

const { width } = Dimensions.get('screen');
export const imageWidth = width * 0.8;
export const imageHeight = width * 1.2;

const AnimatedImage = Animated.createAnimatedComponent(FastImage);

export const ImageItem = ({
  item,
  index,
  scrollX,
  onPress,
}: {
  item: IImage;
  index: number;
  scrollX: SharedValue<number>;
  onPress?: (image: IImage) => void;
}) => {
  const handlePress = () => {
    onPress?.(item);
  };
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [1.6, 1, 1.6],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });
  return (
    <Pressable
      onPress={handlePress}
      style={{
        width: imageWidth,
        height: imageHeight,
        overflow: 'hidden',
        borderRadius: 16,
      }}>
      <AnimatedImage
        style={[{ flex: 1 }, animatedStyle]}
        source={{ uri: item.download_url }}
        resizeMode={FastImage.resizeMode.cover}
        sharedTransitionTag={item.id}
      />
    </Pressable>
  );
};
