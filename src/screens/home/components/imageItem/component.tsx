import { imageHeight, imageWidth } from '@/constants/dimensions';
import { Image } from '@/storage/realm';
import React from 'react';
import { Pressable } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(FastImage);

export const ImageItem = ({
  item,
  index,
  scrollX,
  onPress,
}: {
  item: Image;
  index: number;
  scrollX: SharedValue<number>;
  onPress?: (image: Image) => void;
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
