import type { LocalizedText } from "./locale/LocalizedText";

export class StringProvider {
  private static localizedText: Partial<LocalizedText> = {};

  static init(localizedText: LocalizedText) {
    StringProvider.localizedText = localizedText;
  }

  private static format<T extends keyof LocalizedText>(
    key: T,
    ...args: LocalizedText[T] extends (arg: infer P) => string ? [P] : []
  ): string {
    const value = StringProvider.localizedText[key];
    if (typeof value === "function") {
      return value(
        // @ts-ignore
        ...args,
      );
    }
    if (value === undefined) {
      throw new Error(`key ${key} is not found`);
    } else {
      return value;
    }
  }

  static get() {
    return this.format;
  }
}
