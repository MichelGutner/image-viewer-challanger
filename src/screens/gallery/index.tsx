import { FooterFloatingView, HeaderFloatingView, Text } from '@/components';
import { fetchImageList } from '@/services';
import { Image } from '@/storage/realm';
import { useNavigation } from '@react-navigation/native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery as useQueryRealm } from '@realm/react';
import { FlashList } from '@shopify/flash-list';
import { useMemo, useState } from 'react';
import { TopButtons } from './components';

const AnimatedImage = Animated.createAnimatedComponent(FastImage);

const groupInRows = (data: Image[], perRow = 4): Image[][] => {
  const rows: Image[][] = [];
  for (let i = 0; i < data?.length; i += perRow) {
    rows.push(data.slice(i, i + perRow));
  }
  return rows;
};

export const GalleryScreen = () => {
  const navigation = useNavigation<any>();
  const { bottom, top } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [selectedTab, setSelectedTab] = useState<'remote' | 'offline'>(
    'remote',
  );

  const imageQuery = useQueryRealm(Image);

  const downloadedImages = imageQuery.filtered(
    'downloadStatus == $0',
    'completed',
  );

  const downloadedRows = useMemo(
    () => groupInRows(Array.from(downloadedImages)),
    [downloadedImages],
  );

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
    queryKey: ['gallery'],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await fetchImageList(pageParam, itemsPerPage);
      return { data: response, nextPage: pageParam + 1 };
    },
    getNextPageParam: lastPage =>
      lastPage?.data?.length ? lastPage.nextPage : undefined,
    initialPageParam: 1,
    refetchOnWindowFocus: false,
  });

  const all = data?.pages.flatMap(p => p.data) ?? [];
  const remoteImages = all.filter(
    img => !downloadedImages.some(d => d.id === img.id),
  );

  const remoteRows = groupInRows(remoteImages as Image[]);
  const rowsBySelectedTab =
    selectedTab === 'remote' ? remoteRows : downloadedRows;

  const renderRow = (row: Image[]) => (
    <View style={styles.row}>
      {row.map(image => (
        <Pressable
          key={image.id}
          onPress={() => navigation.navigate('Details', { image })}
          style={styles.imageWrapper}>
          <AnimatedImage
            source={{ uri: image.download_url }}
            style={styles.image}
            resizeMode={FastImage.resizeMode.cover}
            sharedTransitionTag={image.id}
          />
        </Pressable>
      ))}
      {[...Array(4 - row.length)].map((_, i) => (
        <View key={`placeholder-${i}`} style={styles.imageWrapper} />
      ))}
    </View>
  );

  return (
    <View
      style={{ flex: 1, paddingTop: top + 40, gap: 16, paddingHorizontal: 4 }}>
      <HeaderFloatingView>
        <Text type="title">Galeria</Text>
        <TopButtons
          onPress={setSelectedTab}
          offlineCount={downloadedImages.length}
          remoteCount={remoteImages.length}
        />
      </HeaderFloatingView>

      <Text type="subtitle">
        {selectedTab === 'remote' ? 'Imagens Remotas' : 'Imagens Baixadas'}
      </Text>

      <FlashList
        style={{ flex: 1 }}
        data={rowsBySelectedTab}
        estimatedItemSize={size}
        renderItem={({ item }) => renderRow(item)}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage && selectedTab === 'remote') {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.2}
        refreshing={isLoading}
        onRefresh={refetch}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: bottom + 20,
          paddingTop: 10,
        }}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: 'center' }}>
            {isLoading ? 'Carregando imagens...' : 'Nenhuma imagem encontrada'}
          </Text>
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
