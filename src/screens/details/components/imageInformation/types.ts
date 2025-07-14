import { IUnsplashPhoto } from "@/types/unsplash";

export type TImageInfoProps = {
  info: IUnsplashPhoto | undefined;
  isLoading?: boolean;
};
