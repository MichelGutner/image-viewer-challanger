import {
  BackDropImage,
  Button,
  FooterFloatingView,
  HeaderFloatingView,
  Text,
  GalleryLoading,
} from '@/components';
import { fetchImageList } from '@/services';
import { Image } from '@/storage/realm';
import { useNavigation } from '@react-navigation/native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { groupInRows } from '../helpers';
import { GALLERY_KEY } from '@/constants/queryKeys';

const AnimatedImage = Animated.createAnimatedComponent(FastImage);

export const GalleryScreen = () => {
  const navigation = useNavigation<any>();
  const { bottom, top } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const size = width / 4 - 3;
  const itemsPerPage = 100;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: [GALLERY_KEY],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await fetchImageList(pageParam, itemsPerPage);
      return { data: response, nextPage: pageParam + 1 };
    },
    getNextPageParam: lastPage =>
      lastPage?.data?.length ? lastPage.nextPage : undefined,
    initialPageParam: 1,
    refetchOnWindowFocus: false,
  });

  const goToDetails = (image: Image) => {
    navigation.navigate('Details', { image });
  };

  const all = data?.pages.flatMap(p => p.data) ?? [];
  const remoteRows = groupInRows(all as Image[]);

  const renderRow = (row: Image[]) => (
    <View style={styles.row}>
      {row.map(image => (
        <Pressable
          key={image.id}
          onPress={() => goToDetails(image)}
          style={styles.imageWrapper}>
          <AnimatedImage
            source={{ uri: image.download_url }}
            style={styles.image}
            resizeMode={FastImage.resizeMode.cover}
          />
        </Pressable>
      ))}
      {[...Array(4 - row.length)].map((_, i) => (
        <View key={`placeholder-${i}`} style={styles.imageWrapper} />
      ))}
    </View>
  );
  const rowCount = remoteRows.length;
  const randomRowIndex = Math.floor(Math.random() * rowCount);
  const randomRow = remoteRows[randomRowIndex] ?? [];

  const itemCount = randomRow.length;
  const randomItemIndex = Math.floor(Math.random() * itemCount);

  const scrollX = useSharedValue(randomItemIndex);

  return (
    <View style={{ flex: 1, gap: 16, paddingHorizontal: 4 }}>
      <View style={StyleSheet.absoluteFillObject}>
        {randomRow?.map((image, index) => {
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
      <HeaderFloatingView>
        <Button iconName="chevron-left" onPress={navigation.goBack} />
        <Text style={{ color: 'white' }} type="title">
          Galeria
        </Text>
      </HeaderFloatingView>
      <FlashList
        style={{ flex: 1 }}
        data={remoteRows}
        estimatedItemSize={size}
        renderItem={({ item }) => renderRow(item)}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.2}
        refreshing={isLoading}
        onRefresh={refetch}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: bottom + 20,
          paddingTop: top + 60,
        }}
        ListEmptyComponent={() => (
          isLoading ? (
            <GalleryLoading rows={6} columns={4} />
          ) : (
            <Text style={{ textAlign: 'center' }}>
              Nenhuma imagem encontrada
            </Text>
          )
        )}
      />

      <FooterFloatingView />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  imageWrapper: {
    flex: 1,
    aspectRatio: 1,
    marginHorizontal: 1,
  },
  image: {
    flex: 1,
    borderRadius: 6,
  },
});
