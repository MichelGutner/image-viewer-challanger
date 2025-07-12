import React, { useEffect } from 'react';
import { Button, FooterFloatingView } from '@/components';
import { TRouteParams } from '@/navigation';
import { Image } from '@/storage/realm';
import { IUnsplashPhoto } from '@/types/unsplash';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@realm/react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  FadeIn,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from './header';
import { ImageDescriptions } from './imageInformation';
import { mockImageInformation } from './mock';

const AnimatedImage = Animated.createAnimatedComponent(FastImage);

export const DetailsScreen = () => {
  const navigation = useNavigation<any>();
  const { height, width } = useWindowDimensions();
  const maxDragUp = -height * 0.3;
  const maxDragDown = 0;

  const { bottom } = useSafeAreaInsets();
  const { params } = useRoute<TRouteParams>();
  const image = params?.image;

  if (!image) return null;

  const currentImage = useQuery(Image).filtered('id == $0', image.id)[0];

  const translateY = useSharedValue(maxDragUp);
  const scale = useSharedValue(1.5);

  const [fullscreen, setFullscreen] = React.useState(false);
  const [fullImageInformation, setFullImageInformation] =
    React.useState<IUnsplashPhoto>(mockImageInformation);

  const controlsOpacity = useSharedValue(1);
  const absoluteYInformation = useSharedValue(height * 0.73);
  const informationOpacity = useSharedValue(1);

  const fetchImageDetails = async () => {
    // const fullInfo = await getUnsplashPhotoInfo(image.url);
    // console.log('Metadados completos:', fullInfo);
  };

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx: any) => {
      const newTranslateY = ctx.startY + event.translationY;
      const startY = ctx.startY;
      console.log('newTranslateY:', newTranslateY);
      if (startY === 0) {
        runOnJS(setFullscreen)(false);
      } else if (startY < 0 && newTranslateY > 0) {
        runOnJS(setFullscreen)(true);
      }

      absoluteYInformation.value = interpolate(
        newTranslateY,
        [maxDragDown, maxDragUp],
        [height, height * 0.73],
        Extrapolation.CLAMP,
      );
      informationOpacity.value = interpolate(
        absoluteYInformation.value,
        [height, height * 0.73],
        [0, 1],
        Extrapolation.IDENTITY,
      );

      translateY.value = newTranslateY;

      scale.value = interpolate(
        translateY.value,
        [maxDragDown, maxDragUp],
        [1, 1.5],
        Extrapolation.CLAMP,
      );
    },
    onEnd: event => {
      const direction = event.translationY;
      if (direction < -1) {
        controlsOpacity.value = withTiming(1);
        translateY.value = withTiming(maxDragUp);
        scale.value = withTiming(1.5);
        informationOpacity.value = withTiming(1);
        absoluteYInformation.value = withTiming(height * 0.73);
        runOnJS(setFullscreen)(false);
      } else if (direction > 1) {
        translateY.value = withTiming(0);
        scale.value = withTiming(1);
        informationOpacity.value = withTiming(0);
        absoluteYInformation.value = withTiming(height);
        runOnJS(setFullscreen)(true);
      }
      //TODO: implement goback when dragging down
      // if (direction > 100) {
      //   runOnJS(navigation.goBack)();
      // }
    },
  });

  const onPressBackground = () => {
    if (!fullscreen) return;
    if (controlsOpacity.value === 1) {
      controlsOpacity.value = withTiming(0);
    } else {
      controlsOpacity.value = withTiming(1);
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }, { scale: scale.value }],
    };
  });

  const AnimatedInformationStyle = useAnimatedStyle(() => ({
    opacity: informationOpacity.value,
    transform: [
      {
        translateY: absoluteYInformation.value + translateY.value,
      },
    ],
  }));

  useEffect(() => {
    StatusBar.setHidden(!fullscreen, 'fade');

    fetchImageDetails();
  }, [fullscreen]);

  return (
    <TouchableWithoutFeedback onPress={onPressBackground}>
      <ScrollView contentContainerStyle={styles.container}>
        <Header show={fullscreen} onPressBack={navigation.goBack} />
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={[styles.imageContainer, animatedStyle]}>
            <AnimatedImage
              style={{ height: width, width }}
              source={{ uri: currentImage?.download_url }}
              resizeMode={FastImage.resizeMode.contain}
              sharedTransitionTag={currentImage?.id}
            />
          </Animated.View>
        </PanGestureHandler>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View
            entering={FadeIn.delay(300)}
            style={[styles.informationContainer, AnimatedInformationStyle]}>
            <ImageDescriptions info={fullImageInformation as any} />
          </Animated.View>
        </PanGestureHandler>

        <FooterFloatingView opacity={controlsOpacity}>
          <View style={styles.leftButton}>
            <Button iconName="share" onPress={() => null} />
          </View>
          <Button iconName="download" onPress={() => null} />
          <Button iconName="trash" onPress={() => null} />
        </FooterFloatingView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  informationContainer: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    width: '100%',
    margin: 0,
  },
  leftButton: {
    flex: 1,
  },
});
