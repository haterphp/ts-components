export type Nullable<T> = T | null

export type DefaultFunction = () => void

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? T[P] extends Function
      ? T[P]
      : DeepPartial<T[P]>
    : T[P];
};


export type DeepRequired<T> = T extends Function
  ? T
  : T extends Array<infer U>
    ? DeepRequiredArray<U>
    : T extends object
      ? { [K in keyof T]-?: DeepRequired<T[K]> }
      : T;

type DeepRequiredArray<T> = Array<DeepRequired<T>>;