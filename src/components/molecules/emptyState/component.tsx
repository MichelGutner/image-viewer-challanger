import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from '@/components/atoms';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { EmptyStateProps } from './types';

export const EmptyState = ({
  message = 'Nenhum conteúdo encontrado',
  testID,
}: EmptyStateProps) => {
  const { colors } = useTheme();

  return (
    <View style={styles.wrapper} testID={testID}>
      <View style={styles.content}>
        <Icon
          name="alert-circle"
          size={64}
          color={colors.text}
          style={styles.icon}
        />
        <Text style={[styles.message, { color: colors.text }]} type="default">
          {message}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 500,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  icon: {
    opacity: 0.8,
    marginBottom: 24,
  },
  message: {
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 22,
  },
});
