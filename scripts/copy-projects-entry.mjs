import { mkdir, readFile, writeFile } from "node:fs/promises";

// A real static entry supports direct links/refreshes without an SPA rewrite.
const html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
await mkdir(new URL("../dist/projects/", import.meta.url), { recursive: true });
await writeFile(new URL("../dist/projects/index.html", import.meta.url), html
  .replace(/<title>.*?<\/title>/, "<title>Projects — Quant Finance AGH</title>")
  .replace(/(<meta\s+name="description"\s+content=")[^"]*("\s*\/?>)/, "$1Explore Quant Finance AGH's initial research and engineering initiatives.$2"));
