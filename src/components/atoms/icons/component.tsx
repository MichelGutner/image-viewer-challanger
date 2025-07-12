import React from 'react';
import * as Svgs from './svgs';
import { TIconProps } from './types';
import { useTheme } from '@react-navigation/native';

const defaultIconSize = 24;

export type TIconNames = TIconProps<typeof Svgs>['name'];

export const Icon = ({ name, size, ...rest }: TIconProps<typeof Svgs>) => {
  const IconComponent = Svgs[name as keyof typeof Svgs];
  const iconSize = size ?? defaultIconSize;
  return <IconComponent color={rest?.color} {...rest} size={iconSize} />;
};
