import React, { useEffect, useState } from 'react';
import {
  Button,
  FooterFloatingView,
  HeaderFloatingView,
  Text,
  TopButtons,
} from '@/components';
import { fetchRandomImage } from '@/services/picturesService';
import { Image } from '@/storage/realm';
import { useNavigation } from '@react-navigation/native';
import { useQuery as useQueryRealm, useRealm } from '@realm/react';
import { useQuery } from '@tanstack/react-query';
import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { BackDropImage } from '@/components';
import { useDownloader } from '@/hooks';
import { DOWNLOAD_FOLDER } from '@/constants';
import { UpdateMode } from 'realm';
import { imageWidth } from '@/constants/dimensions';
import { ImageItem } from './components';
import { RANDOM_IMAGE_KEY } from '@/constants/queryKeys';
import { serializeImageForNavigation } from '@/utils/serialization';

export const HomeScreen = () => {
  const { startDownload } = useDownloader();
  const { width } = useWindowDimensions();
  const navigation = useNavigation<any>();
  const realm = useRealm();
  const imagesData = useQueryRealm(Image).map(image => image);
  const controlsOpacity = useSharedValue(1);
  const downloadImages = useQueryRealm(Image).filtered(
    'downloadStatus == $0',
    'completed',
  );

  const { data: imageData, isLoading: queryLoading } = useQuery({
    queryKey: [RANDOM_IMAGE_KEY],
    queryFn: fetchRandomImage,
    refetchOnWindowFocus: false,
  });

  const animatedImageScale = useSharedValue(1);

  const flatListRef = React.useRef<FlatList<any> | null>(null);

  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(event => {
    scrollX.value = event.contentOffset.x / (imageWidth + 12);
  });

  const currentIndex = Math.round(scrollX.value);
  const image = imagesData[currentIndex];

  const gotToPreviousImage = () => {
    if (flatListRef.current) {
      const currentIndex = Math.round(scrollX.value);
      const previousIndex = currentIndex > 0 ? currentIndex - 1 : 0;
      flatListRef.current.scrollToIndex({
        index: previousIndex,
        animated: true,
      });
    }
  };

  const handleNavigateToDetails = (image: Image) => {
    animatedImageScale.value = withTiming(1.5);
    navigation.navigate('Details', {
      image: serializeImageForNavigation(image),
      isDownloaded: image.downloadStatus === 'completed',
    });
  };

  const fetchAndAddImage = async () => {
    try {
      const newImage = await fetchRandomImage();
      realm.write(() => {
        realm.create(Image, Image.createBlank(newImage));
      });
    } catch (error) {
      console.error('Erro ao buscar nova imagem:', error);
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
          Image.createPlaceholder(image);
        });
      })
      .done(() => {
        realm.write(() => {
          const updatedImage = Image.markAsDownloaded(image);
          realm.create(Image, updatedImage, UpdateMode.Modified);
        });
      })
      .error(() => {
        realm.write(() => {
          Image.markAsFailed(image);
        });
      });
  };

  useEffect(() => {
    if (!imagesData.length) {
      fetchAndAddImage();
    }
  }, [imagesData]);

  return (
    <View style={styles.container} testID="home-screen">
      <HeaderFloatingView>
        <View style={{ flex: 1 }} />
        <TopButtons
          testID="top-buttons"
          onPress={tab => {
            if (tab === 'remote') {
              navigation.navigate('Gallery');
            } else {
              navigation.navigate('OfflineGallery');
            }
          }}
          offlineCount={downloadImages?.length}
        />
      </HeaderFloatingView>
      <View style={StyleSheet.absoluteFillObject}>
        {imagesData.map((image, index) => {
          return (
            <BackDropImage
              key={index}
              image={image}
              index={index}
              scrollX={scrollX}
            />
          );
        })}
      </View>
      <Animated.FlatList
        ref={flatListRef}
        data={imagesData}
        horizontal
        style={{ flexGrow: 0 }}
        contentContainerStyle={{
          gap: 12,
          paddingHorizontal: (width - imageWidth) / 2,
        }}
        snapToInterval={imageWidth + 12}
        decelerationRate={'fast'}
        onScroll={onScroll}
        scrollEventThrottle={1000 / 60}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        getItemLayout={(_, index) => ({
          length: imageWidth + 12,
          offset: (imageWidth + 12) * index,
          index,
        })}
        onEndReachedThreshold={0.5}
        windowSize={5}
        renderItem={({ item, index }) => (
          <ImageItem
            testId={`image-item-${index}`}
            onPress={handleNavigateToDetails}
            item={item}
            index={index}
            scrollX={scrollX}
          />
        )}
        ListEmptyComponent={
          queryLoading ? (
            <Text>Carregando...</Text>
          ) : (
            <Text>Nenhuma imagem disponível</Text>
          )
        }
      />
      <FooterFloatingView opacity={controlsOpacity}>
        <Animated.View style={styles.leftButton}>
          <Button iconName="chevron-left" onPress={gotToPreviousImage} />
          <Button
            testID="plus-button-test-id"
            iconName="plus"
            onPress={fetchAndAddImage}
          />
        </Animated.View>
        <Button
          testID="download-button-test-id"
          iconName="download"
          onPress={handleDownloadImage}
        />
      </FooterFloatingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  leftButton: {
    flex: 1,
    gap: 16,
    flexDirection: 'row',
  },
});
