import { HasPlaceholder, TKey } from "./locale/LocalizedText";
import {
  ElementType,
  Fragment,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from "react";
import { StringProvider } from "./StringProvider";

type TransProps<T extends TKey> =
  HasPlaceholder<T> extends never
    ? { tKey: T }
    : { tKey: T; arg: HasPlaceholder<T> };

type BaseProps = PropsWithChildren<{
  as?: ElementType;
}> &
  HTMLAttributes<HTMLElement>;

export const Trans = <T extends TKey>(props: BaseProps & TransProps<T>) => {
  const { tKey, children, as: Component = Fragment, ...rest } = props;
  let text = StringProvider.getRaw(tKey);

  if ("arg" in props && props.arg) {
    const { arg } = props;
    if (typeof arg === "string") {
      text = text.replace("%s", arg);
    }
    if (typeof arg === "number") {
      text = text.replace("%d", arg.toString());
    }
  }

  const [prefix, suffix] = text.split("%r");

  return (
    <Component {...rest}>
      {prefix}
      {children}
      {suffix}
    </Component>
  );
};
