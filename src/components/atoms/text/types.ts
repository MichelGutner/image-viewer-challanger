import type { TextProps } from 'react-native';

export type TTextProps = TextProps & {
  type?:
    | 'default'
    | 'title'
    | 'defaultSemiBold'
    | 'subtitle'
    | 'link'
    | 'button'
    | 'caption'
    | 'captionBold';
};
