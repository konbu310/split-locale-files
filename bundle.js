import { build, context } from "esbuild";
import { parseArgs } from "node:util";

async function buildClient({ prd, watch }) {
  const options = {
    entryPoints: ["src/client.tsx"],
    chunkNames: "[name]",
    bundle: true,
    sourcemap: prd ? "external" : "inline",
    minify: prd,
    treeShaking: true,
    format: "esm",
    splitting: true,
    outdir: "dist",
    target: "es2018",
    logLevel: "info",
    color: true,
    jsx: "automatic",
    jsxDev: !prd,
  };

  if (watch) {
    const ctx = await context(options);
    await ctx.watch();
  } else {
    await build(options);
  }
}

async function buildServer({ prd, watch }) {
  const options = {
    entryPoints: ["src/server.ts"],
    bundle: true,
    sourcemap: prd ? "external" : "inline",
    minify: prd,
    treeShaking: true,
    outdir: "dist",
    packages: "external",
    format: "esm",
    platform: "node",
    target: "es2022",
    logLevel: "info",
  };

  if (watch) {
    const ctx = await context(options);
    await ctx.watch();
  } else {
    await build(options);
  }
}

const options = {
  prd: {
    type: "boolean",
    multiple: false,
    default: false,
  },
  watch: {
    type: "boolean",
    short: "w",
    multiple: false,
    default: false,
  },
};

async function main() {
  const args = process.argv.slice(2);
  const {
    values: { prd, watch },
  } = parseArgs({ args, options });
  await Promise.all([buildClient({ prd, watch }), buildServer({ prd, watch })]);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
