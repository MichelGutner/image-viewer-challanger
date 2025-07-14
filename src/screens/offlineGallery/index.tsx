import {
  BackDropImage,
  Button,
  FooterFloatingView,
  HeaderFloatingView,
  Text,
  EmptyState,
} from '@/components';
import { Image } from '@/storage/realm';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery as useQueryRealm } from '@realm/react';
import { FlashList } from '@shopify/flash-list';
import { useMemo } from 'react';
import { groupInRows } from '../helpers';
import { serializeImageForNavigation } from '@/utils/serialization';

const AnimatedImage = Animated.createAnimatedComponent(FastImage);

export const OfflineGallery = () => {
  const navigation = useNavigation<any>();
  const { bottom, top } = useSafeAreaInsets();
  const imageQuery = useQueryRealm(Image);

  const downloadedImages = imageQuery.filtered(
    'downloadStatus == $0',
    'completed',
  );

  const downloadedRows = useMemo(
    () => groupInRows(Array.from(downloadedImages)),
    [downloadedImages],
  );

  const renderRow = (row: Image[]) => (
    <View style={styles.row}>
              {row.map(image => (
          <Pressable
            key={image.id}
            onPress={() => navigation.navigate('Details', { image: serializeImageForNavigation(image) })}
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
  const rowCount = downloadedRows.length;
  const randomRowIndex = Math.floor(Math.random() * rowCount);
  const randomRow = downloadedRows[randomRowIndex] ?? [];

  const itemCount = randomRow.length;
  const randomItemIndex = Math.floor(Math.random() * itemCount);

  const scrollX = useSharedValue(randomItemIndex);

  return (
    <View style={{ flex: 1, gap: 16, paddingHorizontal: 4 }} testID="offline-gallery-screen">
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
        data={downloadedRows}
        estimatedItemSize={100}
        renderItem={({ item }) => renderRow(item)}
        onEndReachedThreshold={0.2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: bottom + 20,
          paddingTop: top + 60,
        }}
        ListEmptyComponent={() => (
          <EmptyState message="Nenhuma imagem foi encontrada" />
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
