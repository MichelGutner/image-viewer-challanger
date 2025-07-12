import { SharedValue } from 'react-native-reanimated';
import { PropsWithChildren } from 'react';

export type TFooterFloatingViewProps = PropsWithChildren<{
  opacity: SharedValue<number>;
}>;
