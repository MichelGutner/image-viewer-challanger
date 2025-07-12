type ExtractKeys<T> = {
  [K in keyof T]: K;
}

export type TSvgProps = {
  size?: number;
  color?: string;
};

export type TIconProps<T> = TSvgProps & { name: keyof ExtractKeys<T> };
