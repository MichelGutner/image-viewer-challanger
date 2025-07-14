import React, { useEffect, useState } from 'react';
import { Button, FooterFloatingView } from '@/components';
import { TRouteParams } from '@/navigation';
import { IUnsplashPhoto } from '@/types/unsplash';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import {
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
import { Header, ImageDescriptions, ImageInfoSkeleton } from './components/';
import { useDownloader } from '@/hooks';
import { DOWNLOAD_FOLDER } from '@/constants';
import { useObject, useQuery, useRealm } from '@realm/react';
import { Image } from '@/storage/realm';
import { UpdateMode } from 'realm';
import { getUnsplashPhotoInfo } from '@/services';
import { mockImageInformation } from './mock';

const AnimatedImage = Animated.createAnimatedComponent(FastImage);

export const DetailsScreen = () => {
  const navigation = useNavigation<any>();
  const { height, width } = useWindowDimensions();
  const { colors } = useTheme();
  const { params } = useRoute<TRouteParams>();
  const { startDownload, deleteDownload } = useDownloader();
  const realm = useRealm();

  const image = params?.image;
  const isDownloaded =
    useObject(Image, image?.id)?.downloadStatus === 'completed';

  const maxDragUp = -height * 0.3;
  const maxDragDown = 0;
  const maxInformationHeight = height * 0.73;
  const maxScale = 1.5;
  if (!image) return null;

  const translateY = useSharedValue(maxDragUp);
  const scale = useSharedValue(maxScale);

  const [fullscreen, setFullscreen] = useState(false);
  const [imageInfo, setImageInfo] =
    useState<IUnsplashPhoto>();
  const [isLoadingInfo, setIsLoadingInfo] = useState(true);

  const controlsOpacity = useSharedValue(1);
  const absoluteYInformation = useSharedValue(maxInformationHeight);
  const informationOpacity = useSharedValue(1);

  const fetchImageDetails = async () => {
    setIsLoadingInfo(true);
    if (!image.url) {
      setIsLoadingInfo(false);
      return;
    }
    
    try {
      const fullInfo = await getUnsplashPhotoInfo(image.url);
      if (!fullInfo) {
        setImageInfo(mockImageInformation);
      } else {
        setImageInfo(fullInfo);
      }
    } catch (error) {
      setImageInfo(mockImageInformation);
    } finally {
      setIsLoadingInfo(false);
    }
  };

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx: any) => {
      const newTranslateY = ctx.startY + event.translationY;
      const startY = ctx.startY;
      if (startY === 0) {
        runOnJS(setFullscreen)(false);
      } else if (startY < 0 && newTranslateY > 0) {
        runOnJS(setFullscreen)(true);
      }

      absoluteYInformation.value = interpolate(
        newTranslateY,
        [maxDragDown, maxDragUp],
        [height, maxInformationHeight],
        Extrapolation.CLAMP,
      );
      informationOpacity.value = interpolate(
        absoluteYInformation.value,
        [height, maxInformationHeight],
        [0, 1],
        Extrapolation.IDENTITY,
      );

      translateY.value = newTranslateY;

      scale.value = interpolate(
        translateY.value,
        [maxDragDown, maxDragUp],
        [1, maxScale],
        Extrapolation.CLAMP,
      );
    },
    onEnd: event => {
      const direction = event.translationY;
      if (direction < -1) {
        controlsOpacity.value = withTiming(1);
        translateY.value = withTiming(maxDragUp);
        scale.value = withTiming(maxScale);
        informationOpacity.value = withTiming(1);
        absoluteYInformation.value = withTiming(maxInformationHeight);
        runOnJS(setFullscreen)(false);
      } else if (direction > 1) {
        translateY.value = withTiming(0);
        scale.value = withTiming(1);
        informationOpacity.value = withTiming(0);
        absoluteYInformation.value = withTiming(height);
        runOnJS(setFullscreen)(true);
      }
    },
  });

  const onGoBack = () => {
    navigation.goBack();
  };

  const onPressBackground = () => {
    if (!fullscreen) return;
    if (controlsOpacity.value === 1) {
      controlsOpacity.value = withTiming(0);
    } else {
      controlsOpacity.value = withTiming(1);
    }
  };

  const handleDownloadImage = () => {
    if (!image.id || !image.download_url) return;

    startDownload(
      image.id,
      image.download_url,
      `${DOWNLOAD_FOLDER}/${image.id}.jpg`,
    )
      .progress(() => {
        realm.write(() => {
          realm.create(
            Image,
            Image.createPlaceholder(image),
            UpdateMode.Modified,
          );
        });
      })
      .done(() => {
        realm.write(() => {
          realm.create(
            Image,
            Image.markAsDownloaded(image),
            UpdateMode.Modified,
          );
        });
      })
      .error(() => {
        realm.write(() => {
          realm.create(Image, Image.markAsFailed(image), UpdateMode.Modified);
        });
      });
  };

  const handleDeleteImage = () => {
    if (!image.id || !image?.filename) return;

    deleteDownload(image.filename, () => {
      realm.write(() => {
        realm.create(Image, Image.markAsDeleted(image), UpdateMode.Modified);
      });
    });
    navigation.goBack();
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }, { scale: scale.value }],
    };
  });

  const AnimatedInformationStyle = useAnimatedStyle(() => ({
    backgroundColor: colors.background,
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
    return () => {
      StatusBar.setHidden(false, 'fade');
    };
  }, [fullscreen]);

  return (
    <TouchableWithoutFeedback onPress={onPressBackground}>
      <View style={styles.container}>
        <Header
          show={fullscreen}
          onPressBack={onGoBack}
          opacity={controlsOpacity}
        />
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={[styles.imageContainer, animatedStyle]}>
            <AnimatedImage
              style={{ height: width, width }}
              source={{ uri: image.download_url }}
              resizeMode={FastImage.resizeMode.contain}
              sharedTransitionTag={image?.id}
            />
          </Animated.View>
        </PanGestureHandler>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View
            entering={FadeIn.delay(500)}
            style={styles.informationContainer}>
            <Animated.View style={AnimatedInformationStyle}>
              {isLoadingInfo ? <ImageInfoSkeleton /> : <ImageDescriptions info={imageInfo} />}
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>

        <FooterFloatingView opacity={controlsOpacity}>
          {!fullscreen && (
            <Button iconName="chevron-left" onPress={navigation.goBack} />
          )}
          <View style={styles.leftButton}>
            <Button iconName="share" onPress={() => null} />
          </View>
          {!isDownloaded && (
            <Button iconName="download" onPress={handleDownloadImage} />
          )}
          {isDownloaded && (
            <Button iconName="trash-2" onPress={handleDeleteImage} />
          )}
        </FooterFloatingView>
      </View>
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
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    margin: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  leftButton: {
    flex: 1,
  },
});
