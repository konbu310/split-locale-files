import express from "express";
import { Locale } from "./locale/LocalizedText";

const app = express();
const port = process.env.PORT || 3000;

async function server() {
  app.get("/health_check", (req, res) => {
    return res.send("ok");
  });

  app.use(express.static("dist"));

  app.get("/", (req, res) => {
    const query = req.query as { lang: Locale };
    const locale = query.lang || "ja";
    const state = { language: locale };
    const str = JSON.stringify(state);

    const html = `
      <html lang="ja">
        <head>
          <title>esbuild code splitting</title>
          <link rel="preload" crossorigin="anonymous" href="client.js" as="script">
          <link rel="preload" crossorigin="anonymous" href="chunk.js" as="script">
          <link rel="preload" crossorigin="anonymous" href="${locale}.js" as="script">
        </head>
        <body>
          <div id="initial-state" data-initial-state=${str}></div>
          <div id="root"></div>
          <script type="module" src="client.js"></script>
        </body>
      </html>`;
    res.send(html);
  });

  app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });
}

server().catch(console.error);
