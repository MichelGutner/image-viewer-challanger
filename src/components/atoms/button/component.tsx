import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Icon  from 'react-native-vector-icons/Feather';


type Props = {
  onPress?: () => void;
  iconName: 'chevron-left' | 'calendar' | 'heartbeat' | 'eye' | 'trash' | 'share' | 'download';
};

export const Button = ({ onPress, iconName }: Props) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <TouchableOpacity hitSlop={20} style={styles.button} onPress={onPress}>
        <Icon name={iconName}  color={colors.notification} size={18} />
      </TouchableOpacity>
    </View>
  );
};

const SIZE = 35;

const styles = StyleSheet.create({
  container: {
    borderRadius: SIZE / 2,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    width: SIZE,
    height: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurContainer: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  label: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
});
