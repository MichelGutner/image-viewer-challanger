import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Icon, TIconNames } from '../icons';

type Props = {
  onPress: () => void;
  iconName: TIconNames;
};

export const Button = ({ onPress, iconName }: Props) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Icon name={iconName}  color={colors.notification}/>
      </TouchableOpacity>
    </View>
  );
};

const SIZE = 40;

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
