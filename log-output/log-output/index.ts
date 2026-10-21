import { env } from "bun";
import path from "path";
import { readFile } from "fs/promises";

const port = parseInt(env.PORT ?? "3000");
const outDir = env.OUT_DIR ?? "/usr/share/app/files";
const outFile = env.OUT_FILE ?? "hash.txt";
const outPath = path.join(outDir, outFile);

console.log(`Server started in port ${port}`);

Bun.serve({
  port,
  routes: {
    "/": async () => {
      try {
        const content = await readFile(outPath);
        return new Response(content.toString());
      } catch {
        return new Response("Could not find file.");
      }
    },
  },
});
