import { FC } from "react";
import { createRoot } from "react-dom/client";
import type { Locale } from "./locale/LocalizedText";
import { StringProvider } from "./StringProvider";

const App: FC<{}> = ({}) => {
  const t = StringProvider.get();

  return (
    <div>
      <div>
        {t("hello")} {t("world")} !!
      </div>
      <div>{t("helloName", { name: "yuya" })} !!</div>
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
