import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { TSvgProps } from '../types';

export const Check = ({ size, color }: TSvgProps) => (
  <Svg width={size} height={size} fill={color} viewBox="0 0 24 24">
    <Path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </Svg>
);
