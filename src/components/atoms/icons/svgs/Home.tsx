import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { TSvgProps } from '../types';

export const Home = ({ size, color }: TSvgProps) => (
  <Svg width={size} height={size} fill={color} viewBox="0 0 32 32">
    <Path d="m16 2.672-5.331 5.331V5.87H6.404v6.398l-3.755 3.755.754.754L16 4.18l12.597 12.597.754-.754L16 2.672zM7.47 6.937h2.132v2.132l-2.133 2.133V6.937z" />
    <Path d="M6.404 16.533v12.795h7.464v-7.464h4.265v7.464h7.464V16.533l-9.596-9.596-9.596 9.596zM24.53 28.262h-5.331v-7.464h-6.398v7.464H7.47V16.975L16 8.445l8.53 8.53v11.287z" />
  </Svg>
);
