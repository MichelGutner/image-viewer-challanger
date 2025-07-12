import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { TSvgProps } from '../types';

export const Search = ({ size, color }: TSvgProps) => (
  <Svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.954 14.946 21 21m-4-11a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
    />
  </Svg>
);
