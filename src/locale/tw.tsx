import { LocalizedText } from "./LocalizedText";

export default {
  hello: "你好",
  world: "世界",
  helloName: ({ name }) => `你好，${name}`,
} satisfies LocalizedText;
