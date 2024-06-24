import type { LocalizedText } from "./LocalizedText";

export default {
  hello: "こんにちは",
  world: "世界",
  helloName: ({ name }) => `こんにちは、${name}さん`,
} satisfies LocalizedText;
