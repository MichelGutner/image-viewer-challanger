import React from 'react';
import { View, StyleSheet, Linking, Image } from 'react-native';
import { Text } from '@/components';
import Icon from 'react-native-vector-icons/Feather';
import { mockImageInformation } from './mock';

interface ImageInfoProps {
  info: Partial<typeof mockImageInformation>;
}

export const ImageDescriptions = ({ info }: ImageInfoProps) => {
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  return (
    <View style={styles.wrapper}>
      {/* Autor + Perfil */}
      <View style={styles.authorRow}>
        <Image
          source={{ uri: info?.user?.profile_image.small }}
          style={styles.avatar}
        />
        <View>
          <Text type='subtitle' style={styles.author}>{info?.user?.name}</Text>
          <Text
            style={styles.username}
            onPress={() =>
              Linking.openURL(`https://unsplash.com/@${info?.user?.username}`)
            }
          >
            @{info?.user?.username}
          </Text>
        </View>
      </View>

      {/* Descrição */}
      <Text style={styles.description}>{info.description || info.alt_description}</Text>

      {/* Metadados */}
      <View style={styles.metaRow}>
        <Icon name="calendar" size={16} color="#777" />
        <Text style={styles.metaText}>{formatDate(info?.created_at ?? '')}</Text>
      </View>

      <View style={styles.metaRow}>
        <Icon name="heart" size={16} color="#777" />
        <Text style={styles.metaText}>{info?.likes?.toLocaleString()} curtidas</Text>
      </View>

      <View style={styles.metaRow}>
        <Icon name="eye" size={16} color="#777" />
        <Text style={styles.metaText}>{info?.views?.toLocaleString()} visualizações</Text>
      </View>

      {/* Tags */}
      <View style={styles.tagsContainer}>
        {info?.tags?.slice(0, 6).map(tag => (
          <View key={tag.title} style={styles.tag}>
            <Text style={styles.tagText}>#{tag.title}</Text>
          </View>
        ))}
      </View>

      {/* Cor dominante */}
      <View style={styles.metaRow}>
        <Icon name="droplet" size={16} color="#777" />
        <View
          style={[styles.colorBox, { backgroundColor: info.color || '#ccc' }]}
        />
      </View>

      {/* Link Unsplash */}
      <Text
        style={styles.link}
        onPress={() => Linking.openURL(info?.links?.html ?? '')}
      >
        Ver no Unsplash →
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  author: {
    fontWeight: '600',
  },
  username: {
    fontSize: 13,
    color: '#888',
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  metaText: {
    fontSize: 14,
    color: '#666',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#eee',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 13,
    color: '#444',
  },
  colorBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  link: {
    marginTop: 20,
    fontSize: 14,
    color: '#2a6ef7',
    fontWeight: '600',
    textAlign: 'left',
  },
});
