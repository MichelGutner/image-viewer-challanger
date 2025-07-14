import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LoadingSkeleton, Text } from '@/components/atoms';
import { useTheme } from '@react-navigation/native';
import { GalleryLoadingProps } from './types';

export const GalleryLoading = ({
  message = 'Carregando imagens...',
  rows = 6,
  columns = 4,
}: GalleryLoadingProps) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <LoadingSkeleton rows={rows} columns={columns} />
      <View style={styles.messageContainer}>
        <Text style={[styles.message, { color: colors.text }]} type="caption">
          {message}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  messageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  message: {
    textAlign: 'center',
  },
});
