import {
  emptyLocalizedText,
  HasPlaceholder,
  LocalizedText,
  TKey,
} from "./locale/LocalizedText";

export class StringProvider {
  private static localizedText: LocalizedText = { ...emptyLocalizedText };

  static init(localizedText: LocalizedText) {
    StringProvider.localizedText = localizedText;
  }

  private static format<T extends TKey>(
    key: T,
    ...args: HasPlaceholder<T> extends never ? [] : [HasPlaceholder<T>]
  ): string {
    const text = StringProvider.localizedText[key];
    const arg = args[0];
    if (!arg) return text;
    if (typeof arg === "string") return text.replace("%s", arg);
    if (typeof arg === "number") return text.replace("%d", arg.toString());
    return text;
  }

  static getT() {
    return this.format;
  }

  static getRaw(key: TKey) {
    return this.localizedText[key];
  }
}
