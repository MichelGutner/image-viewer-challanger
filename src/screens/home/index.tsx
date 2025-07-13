import React, { useState } from 'react';
import { Button, FooterFloatingView, Text } from '@/components';
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
import { BackDropImage } from './backDropImage';
import { ImageItem, imageWidth } from './imageItem';
import { useDownloader } from '@/hooks';
import { DOWNLOAD_FOLDER } from '@/constants';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { UpdateMode } from 'realm';

export const HomeScreen = () => {
  const { startDownload } = useDownloader();
  const { width } = useWindowDimensions();
  const navigation = useNavigation<any>();
  const realm = useRealm();
  const [isLoading, setIsLoading] = useState(false);
  const imagesData = useQueryRealm(Image);
  const controlsOpacity = useSharedValue(1);

  const { data: imageData, isLoading: queryLoading } = useQuery({
    queryKey: [`-image`],
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

  const progress = useSelector(
    (state: RootState) => state.download.progress[image?.id || ''],
  );

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
    animatedImageScale.value = withTiming(1.5, { duration: 300 });
    navigation.navigate('Details', {
      image,
      isDownloaded: image.downloadStatus === 'completed',
    });
  };

  const fetchAndAddImage = async () => {
    try {
      setIsLoading(true);
      const newImage = await fetchRandomImage();
      realm.write(() => {
        realm.create(Image, Image.createBlank(newImage));
      });
    } catch (error) {
      console.error('Erro ao buscar nova imagem:', error);
    } finally {
      setIsLoading(false);
      realm.deleteAll();
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

  return (
    <View style={styles.container}>
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
          <Button iconName="plus" onPress={fetchAndAddImage} />
        </Animated.View>
        <Button iconName="download" onPress={handleDownloadImage} />
      </FooterFloatingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
  },
  leftButton: {
    flex: 1,
    gap: 16,
    flexDirection: 'row',
  },
});
