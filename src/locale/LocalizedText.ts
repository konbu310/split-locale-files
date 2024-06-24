export type Locale = "ja" | "en" | "cn" | "tw";

export type LocalizedText = {
  hello: string;
  world: string;
  helloName: ({ name }: { name: string }) => string;
};
