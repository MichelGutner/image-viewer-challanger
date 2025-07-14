import { Image } from "@/storage/realm";
import { SharedValue } from "react-native-reanimated";

export type TImageItemProps = {
  item: Image;
  index: number;
  scrollX: SharedValue<number>;
  onPress?: (image: Image) => void;
  testId?: string;
};
