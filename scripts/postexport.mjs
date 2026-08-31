import { readdir, readFile, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const basePath = process.env.GITHUB_ACTIONS === "true" && repository && !repository.endsWith(".github.io")
  ? `/${repository}`
  : "";

if (basePath) {
  const extensions = new Set([".html", ".css", ".js", ".json", ".xml", ".txt"]);
  const assetRoots = ["catalog", "arte", "importados", "demader-mark.png", "demader-logo.jpg", "og.png", "favicon.svg"];

  async function visit(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) {
        await visit(path);
      } else if (extensions.has(extname(entry.name))) {
        let contents = await readFile(path, "utf8");
        for (const root of assetRoots) {
          contents = contents.replaceAll(`/${root}`, `${basePath}/${root}`);
        }
        contents = contents
          .replaceAll('href="/arte-y-madera', `href="${basePath}/arte-y-madera`)
          .replaceAll('href="/importados', `href="${basePath}/importados`);
        await writeFile(path, contents);
      }
    }
  }

  await visit("out");
}
