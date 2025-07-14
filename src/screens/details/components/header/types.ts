import { SharedValue } from 'react-native-reanimated';


export type THeaderProps = {
  show: boolean;
  onPressBack?: () => void;
  opacity?: SharedValue<number>;
};
