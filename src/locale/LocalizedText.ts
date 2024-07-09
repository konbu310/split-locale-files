import ja from "./ja";

export type Locale = "ja" | "en" | "cn" | "tw";

export type LocalizedText = typeof ja;

export type TKey = keyof LocalizedText;

export type HasPlaceholder<T extends string> =
  T extends `${infer _Prefix}%s${infer _Suffix}`
    ? string
    : T extends `${infer _Prefix}%d${infer _Suffix}`
      ? number
      : never;

export const emptyLocalizedText = new Proxy({} as LocalizedText, {
  get: () => "",
});
