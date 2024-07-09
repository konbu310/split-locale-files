import { FC } from "react";
import { createRoot } from "react-dom/client";
import type { Locale } from "./locale/LocalizedText";
import { StringProvider } from "./StringProvider";
import { Trans } from "./Trans";

const App: FC<{}> = ({}) => {
  const t = StringProvider.getT();

  return (
    <div>
      <div>{t("こんにちは")}</div>
      <div>{t("こんにちは%s", "yuya")} !!</div>
      <div>{t("今日の気温は%d度です", 30)} !!</div>

      <Trans as="div" tKey="こんにちは" />
      <Trans as="div" tKey="こんにちは%s" arg="yuya" />
      <Trans as="div" tKey="今日の気温は%d度です" arg={35} />

      <Trans
        as="div"
        tKey="ラッキーナンバーは%r"
        style={{ display: "flex", alignItems: "center" }}
      >
        <h1>7</h1>
      </Trans>
    </div>
  );
};

document.addEventListener("DOMContentLoaded", async () => {
  const stateDom = document.getElementById("initial-state");
  const initialStateJson = stateDom?.getAttribute("data-initial-state") ?? "{}";
  const initialState = JSON.parse(initialStateJson) as { language: Locale };

  const { default: localizedText } = await import(
    `./locale/${initialState.language}.tsx`
  );

  StringProvider.init(localizedText);

  const container = document.getElementById("root")!;
  const root = createRoot(container);
  root.render(<App />);
});
