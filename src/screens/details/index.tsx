import React, { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { StatusBar, StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import { useQuery } from '@realm/react';
import { Image } from '@/storage/realm';

const AnimatedImage = Animated.createAnimatedComponent(FastImage);

export const DetailsScreen = () => {
  const { height } = useWindowDimensions();
  const { params } = useRoute();
  const { image } = params as { image: { id: string; url: string } };

  const currentImage = useQuery(Image).filtered('id == $0', image.id)[0];

  const translateY = useSharedValue(0);
  const [fullscreen, setFullscreen] = React.useState(true);

  useEffect(() => {
    StatusBar.setHidden(!fullscreen, 'fade');
  }, [fullscreen]);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx: any) => {
      translateY.value = ctx.startY + event.translationY;
    },
    onEnd: event => {
      const direction = event.translationY;
      
      if (direction < -1) {
        translateY.value = withTiming(-height / 3, { duration: 300 });
        runOnJS(setFullscreen)(false);
      }
      else if (direction > 1) {
        translateY.value = withTiming(0, { duration: 300 });
        runOnJS(setFullscreen)(true);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[styles.imageContainer, animatedStyle]}>
          <AnimatedImage
            style={styles.image}
            source={{ uri: currentImage?.download_url }}
            resizeMode={FastImage.resizeMode.cover}
            sharedTransitionTag={currentImage?.id}
          />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
