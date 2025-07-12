import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { TSvgProps } from '../types';

export const ChevronRight = ({ size, color }: TSvgProps) => (
  <Svg width={size} height={size} fill="none" viewBox="0 0 20 20">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m7 16 6-6-6-6"
    />
  </Svg>
);
