import { env } from "bun";
import { writeFile, exists, readFile } from "fs/promises";
import path from "path";

const port = parseInt(env.PORT ?? "3000");
const outDir = env.OUT_DIR ?? "/usr/src/app/files";
const outFile = env.OUT_FILE ?? "pingpong.txt";
const outPath = path.join(outDir, outFile);

if (!(await exists(outPath))) {
  console.log("File doesn't exist. Writing a 0 to start things off.")
  await writeFile(outPath, "0");
}

console.log(`Server started in port ${port}`);

async function readCounter(): Promise<number> {
  try {
    const counterBuf = await readFile(outPath);
    const counter = parseInt(counterBuf.toString(), 10);
    return counter;
  } catch {
    return 0;
  }
}

async function writeCounter(count: number): Promise<number> {
  try {
    await writeFile(outPath, count.toString(10));
    return count;
  } catch {
    console.error("Could not write to output file.");
    return 0;
  }
}

const incrementCounter = () =>
  readCounter().then((curr) => writeCounter(curr + 1));

Bun.serve({
  port,
  routes: {
    "/pingpong": async () => {
      const newCount = await incrementCounter();
      const resp = new Response(`pong ${newCount}`);
      return resp;
    },
  },
});
