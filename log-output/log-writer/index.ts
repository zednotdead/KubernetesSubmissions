import { randomUUIDv7 } from "bun"
import { env } from "bun";
import { appendFile } from "fs/promises";
import path from "path";

const outDir = env.OUT_DIR ?? "/usr/share/app/files";
const outFile = env.OUT_FILE ?? "hash.txt";
const outPath = path.join(outDir, outFile)

const randomHash = randomUUIDv7()

console.log(`writing to ${outPath}`)

const getHashNow = () => {
  const hashline = `${new Date()}: ${randomHash}\n`

  appendFile(outPath, hashline);

  setTimeout(getHashNow, 5000)
}

getHashNow()
