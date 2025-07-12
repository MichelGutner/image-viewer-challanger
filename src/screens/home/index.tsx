import { Text, ThemedView } from '@/components';
import { fetchRandomImage } from '@/services/picturesService';
import { Image } from '@/storage/realm';
import { useRealm } from '@realm/react';
import React, { useEffect, useState } from 'react';
import {
  Pressable,
  Image as RNImage,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import FastImage from 'react-native-fast-image';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { useQuery as useQueryRealm } from '@realm/react';

const AnimatedImage = Animated.createAnimatedComponent(FastImage);

export const HomeScreen = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<any>();
  const realm = useRealm();
  const [isLoading, setIsLoading] = useState(false);
  const imagesData = useQueryRealm(Image);

  const { data: imageData, isLoading: queryLoading } = useQuery({
    queryKey: [`-image`],
    queryFn: fetchRandomImage,
    refetchOnWindowFocus: false,
  });

  const animatedImageScale = useSharedValue(1);

  // Salvar imagem no Realm
  const saveImageToRealm = () => {
    if (!imageData) return;
    try {
      realm.write(() => {
        realm.create(Image, Image.createPlaceholder(imageData));
      });
    } catch (error) {
      console.error('Erro ao salvar no Realm:', error);
    }
  };

  const handleNavigateToDetails = (image: Image) => {
    animatedImageScale.value = withTiming(1.5, { duration: 300 });
    navigation.navigate('Details', { image });
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

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: animatedImageScale.value }],
    };
  });

  useEffect(() => {
    return () => {
      console.log('Cleaning up HomeScreen');
    };
  }, []);

  const currentImage = imagesData[0];

  return (
    <ThemedView>
      <View style={styles.container}>
        {currentImage ? (
          <Pressable
            style={{ width: '100%', height: width }}
            onPress={() => handleNavigateToDetails(currentImage)}>
            <AnimatedImage
              style={[styles.image, animatedStyle]}
              source={{ uri: currentImage.download_url }}
              resizeMode={FastImage.resizeMode.contain}
              sharedTransitionTag={currentImage.id}
            />
          </Pressable>
        ) : (
          <Text>Nenhuma imagem disponível</Text>
        )}

        <Text type="button" onPress={saveImageToRealm}>
          Download Image
        </Text>

        <Text type="button" onPress={() => {}}>
          Voltar Imagem
        </Text>

        <Text type="button" onPress={fetchAndAddImage} disabled={isLoading}>
          Próxima imagem
        </Text>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
  },
});
