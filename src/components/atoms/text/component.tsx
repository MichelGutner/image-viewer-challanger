import { useTheme } from '@react-navigation/native';
import { StyleSheet, Text as RNText } from 'react-native';
import { TTextProps } from './types';

export const Text = ({ style, type = 'default', testID, ...rest }: TTextProps) => {
  const { colors } = useTheme();

  return (
    <RNText
      testID={testID}
      style={[
        { color: colors.text },
        type === 'default' ? styles.default : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'button' ? styles.button : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'caption' ? styles.caption : undefined,
        type === 'captionBold' ? styles.captionBold : undefined,
        style,
      ]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
  },
  captionBold: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
  },
});
