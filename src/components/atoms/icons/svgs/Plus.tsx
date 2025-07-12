import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { TSvgProps } from '../types';

export const Plus = ({ size, color }: TSvgProps) => (
  <Svg width={size} height={size} fill={color} viewBox="0 0 20 20">
    <Path
      fill={color}
      fillRule="evenodd"
      d="M9 17a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2h-6V3a1 1 0 1 0-2 0v6H3a1 1 0 0 0 0 2h6v6z"
    />
  </Svg>
);
