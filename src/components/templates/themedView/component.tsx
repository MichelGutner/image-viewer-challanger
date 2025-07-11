import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { TThemedViewProps } from './types';

export const ThemedView = ({ children }: TThemedViewProps) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
});
