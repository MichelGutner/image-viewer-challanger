import React from 'react';
import { View, StyleSheet, Linking, Image, Pressable, ActivityIndicator } from 'react-native';
import { Text } from '@/components';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '@react-navigation/native';
import { formatNumber } from './helpers';
import { TImageInfoProps } from './types';

export const ImageDescriptions = ({ info }: TImageInfoProps) => {
  const { colors } = useTheme();

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
                  <View style={styles.authorSection}>
            <Image source={{ uri: info?.user?.profile_image?.small }} style={styles.avatar} />
          <View style={styles.authorInfo}>
            <Text
              type="subtitle"
              style={[styles.author, { color: colors.text }]}>
              {info?.user?.name}
            </Text>
            <Pressable
              onPress={() =>
                Linking.openURL(`https://unsplash.com/@${info?.user?.username}`)
              }>
              <Text style={[styles.username, { color: colors.text }]}>
                @{info?.user?.username}
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Icon name="heart" size={14} color={colors.text} />
            <Text style={[styles.statText, { color: colors.text }]}>
              {formatNumber(info?.likes || 0)}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="eye" size={14} color={colors.text} />
            <Text style={[styles.statText, { color: colors.text }]}>
              {formatNumber(info?.views || 0)}
            </Text>
          </View>
        </View>
      </View>

      {(info?.description || info?.alt_description) && (
        <Text style={[styles.description, { color: colors.text }]}>
          {info.description || info.alt_description}
        </Text>
      )}

      {info?.tags && info.tags.length > 0 && (
        <View style={styles.tagsContainer}>
                  {info.tags.slice(0, 4).map((tag: any) => (
          <View
            key={tag.title}
            style={[
              styles.tag,
              { backgroundColor: 'rgba(255,255,255,0.3)' },
            ]}>
            <Text style={[styles.tagText, { color: colors.text }]}>
              #{tag.title}
            </Text>
          </View>
        ))}
          {info.tags.length > 4 && (
            <View
              style={[
                styles.tag,
                { backgroundColor: 'rgba(255,255,255,0.3)' },
              ]}>
              <Text style={[styles.tagText, { color: colors.text }]}>
                +{info.tags.length - 4}
              </Text>
            </View>
          )}
        </View>
      )}
      <View
        style={[
          styles.footer,
          { borderTopColor: colors.border || 'rgba(0,0,0,0.1)' },
        ]}>
        <Pressable
          style={styles.unsplashLink}
          onPress={() => Linking.openURL(info?.links?.html ?? '')}>
          <Text style={[styles.linkText, { color: colors.text }]}>
            Ver no Unsplash
          </Text>
          <Icon name="external-link" size={14} color={colors.text} />
        </Pressable>
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
  author: {
    fontWeight: '600',
    marginBottom: 2,
  },
  username: {
    fontSize: 13,
    opacity: 0.7,
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
  statText: {
    fontSize: 12,
    fontWeight: '500',
  },
  description: {
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 16,
    fontStyle: 'italic',
    opacity: 0.8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  },
  tag: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
  },
  unsplashLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  linkText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
