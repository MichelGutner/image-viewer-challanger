import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

export const ImageInfoSkeleton = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.wrapper} testID="image-info-skeleton">
      <View style={styles.header}>
        <View style={styles.authorSection}>
          <View style={[styles.avatar, { backgroundColor: colors.card }]} />
          <View style={styles.authorInfo}>
            <View style={[styles.loadingText, { backgroundColor: colors.card }]} />
            <View style={[styles.loadingText, { backgroundColor: colors.card, width: '60%' }]} />
          </View>
        </View>
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <View style={[styles.loadingText, { backgroundColor: colors.card, width: 30 }]} />
          </View>
          <View style={styles.statItem}>
            <View style={[styles.loadingText, { backgroundColor: colors.card, width: 30 }]} />
          </View>
        </View>
      </View>
      <View style={[styles.loadingText, { backgroundColor: colors.card, height: 40 }]} />
      <View style={styles.tagsContainer}>
        {[1, 2, 3, 4].map(i => (
          <View key={i} style={[styles.loadingTag, { backgroundColor: colors.card }]} />
        ))}
      </View>
      <View style={[styles.footer, { borderTopColor: colors.border || 'rgba(0,0,0,0.1)' }]}> 
        <View style={[styles.loadingText, { backgroundColor: colors.card, width: 80 }]} />
        <View style={[styles.loadingText, { backgroundColor: colors.card, width: 100 }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  authorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  authorInfo: {
    marginLeft: 12,
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  loadingText: {
    height: 12,
    borderRadius: 6,
    opacity: 0.6,
    marginBottom: 6,
  },
  stats: {
    alignItems: 'flex-end',
    gap: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  },
  loadingTag: {
    width: 60,
    height: 24,
    borderRadius: 12,
    opacity: 0.6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
  },
}); 