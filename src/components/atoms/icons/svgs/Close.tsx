import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { TSvgProps } from '../types';

export const Close = ({ size, color }: TSvgProps) => (
  <Svg width={size} height={size} fill={color} viewBox="0 0 24 24">
    <G fill="none" fillRule="evenodd">
      <Path d="M0 0h24v24H0z" />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeWidth={2}
        d="M17 7 7 17M7 7l10 10"
      />
    </G>
  </Svg>
);
