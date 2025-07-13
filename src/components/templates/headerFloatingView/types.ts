import { SharedValue } from 'react-native-reanimated';
import { PropsWithChildren } from 'react';

export type THeaderFloatingViewProps = PropsWithChildren<{
  opacity?: SharedValue<number>;
}>;
