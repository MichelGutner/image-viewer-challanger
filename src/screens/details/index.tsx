import React, { Fragment, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import {
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolation,
  FadeIn,
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import { useQuery } from '@realm/react';
import { Image } from '@/storage/realm';
import { TRouteParams } from '@/navigation';
import { Button, Text } from '@/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AnimatedImage = Animated.createAnimatedComponent(FastImage);

export const DetailsScreen = () => {
  const { height } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();
  const { params } = useRoute<TRouteParams>();
  const image = params?.image;

  if (!image) return null;

  const currentImage = useQuery(Image).filtered('id == $0', image.id)[0];

  const translateY = useSharedValue(-height * 0.3);
  const scale = useSharedValue(1.5);
  const [fullscreen, setFullscreen] = React.useState(false);
  const [showControls, setShowControls] = React.useState(true);

  const controlsOpacity = useSharedValue(1);

  useEffect(() => {
    StatusBar.setHidden(!fullscreen, 'fade');
  }, [fullscreen]);

  const maxDragUp = -height * 0.3;
  const maxDragDown = 0;

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx: any) => {
      const newTranslateY = ctx.startY + event.translationY;

      translateY.value = Math.max(
        maxDragUp,
        Math.min(maxDragDown, newTranslateY),
      );

      scale.value = interpolate(
        translateY.value,
        [maxDragUp, maxDragDown],
        [1.5, 1],
        Extrapolation.CLAMP,
      );
    },
    onEnd: event => {
      const direction = event.translationY;

      if (direction < -1) {
        controlsOpacity.value = withTiming(1);
        translateY.value = withTiming(maxDragUp);
        scale.value = withTiming(1.5);
        runOnJS(setFullscreen)(false);
      } else if (direction > 1) {
        translateY.value = withTiming(0);
        scale.value = withTiming(1);
        runOnJS(setFullscreen)(true);
      }
    },
  });

  const onPressBackground = () => {
    if (!fullscreen) return;
    if (controlsOpacity.value === 1) {
      controlsOpacity.value = withTiming(0);
      setShowControls(false);
    } else {
      controlsOpacity.value = withTiming(1);
      setShowControls(true);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  const AnimatedInformationStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateY.value,
      [maxDragUp, maxDragDown],
      [1, 0],
      Extrapolation.CLAMP,
    ),
    transform: [
      {
        translateY: interpolate(
          translateY.value,
          [maxDragUp, maxDragDown],
          [-height * 0.22, 0],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  const animatedBottomStyle = useAnimatedStyle(() => ({
    opacity: controlsOpacity.value,
  }));

  return (
    <TouchableWithoutFeedback onPress={onPressBackground}>
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
        <Animated.View
          style={[styles.informationContainer, AnimatedInformationStyle]}>
          <Text type="title">Testing</Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(400)}
          exiting={FadeInUp.delay(400)}
          style={[
            styles.bottomButtons,
            { bottom: bottom + 20 },
            animatedBottomStyle,
          ]}>
          <Button iconName="CategoryShuffle" onPress={() => null} />
          <Button iconName="ChevronRight" onPress={() => null} />
          <Button iconName="Trash" onPress={() => null} />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
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
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  informationContainer: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    textAlign: 'center',
  },
  bottomButtons: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
