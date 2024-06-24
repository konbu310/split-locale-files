import { LocalizedText } from "./LocalizedText";

export default {
  hello: "Hello",
  world: "World",
  helloName: ({ name }) => `Hello, ${name}`,
} satisfies LocalizedText;
