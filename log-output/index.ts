import { env } from "bun";
import path from "path";
import { readFile } from "fs/promises";

const port = parseInt(env.PORT ?? "3000");
const outDir = env.OUT_DIR ?? "/usr/src/app/files";
const outFile = env.OUT_FILE ?? "hash.txt";
const outFilePong = env.OUT_FILE_PONG ?? "pingpong.txt";
const outPath = path.join(outDir, outFile);
const outPathPong = path.join(outDir, outFilePong);

console.log(`Server started in port ${port}`);

Bun.serve({
  port,
  routes: {
    "/": async () => {
      try {
        const content = await readFile(outPath).then((f) => f.toString());
        const pingpongCount = await readFile(outPathPong)
          .then((f) => f.toString());
	const pingpongContent = `Ping / Pongs: ${pingpongCount}`
        const out = [content, pingpongContent].join("\n");
        return new Response(out);
      } catch {
        return new Response("Could not find file.");
      }
    },
  },
});
