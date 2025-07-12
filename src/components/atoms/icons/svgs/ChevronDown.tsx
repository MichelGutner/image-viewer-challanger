import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { TSvgProps } from '../types';

export const ChevronDown = ({ size, color }: TSvgProps) => (
  <Svg width={size} height={size} fill="none" viewBox="0 0 15 15">
    <Path
      fill={color}
      fillRule="evenodd"
      d="M3.135 6.158a.5.5 0 0 1 .707-.023L7.5 9.565l3.658-3.43a.5.5 0 0 1 .684.73l-4 3.75a.5.5 0 0 1-.684 0l-4-3.75a.5.5 0 0 1-.023-.707Z"
      clipRule="evenodd"
    />
  </Svg>
);
