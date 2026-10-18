import { randomUUIDv7 } from "bun"
import { env } from "bun";

const port = parseInt(env.PORT ?? "3000");
const randomHash = randomUUIDv7()

const getHashNow = () => {
  console.log(`${new Date()}: ${randomHash}`)

  setTimeout(getHashNow, 5000)
}

console.log(`Server started in port ${port}`)

Bun.serve({
  port,
  routes: {
    "/": () => new Response(`${new Date()}: ${randomHash}`),
  },
});

getHashNow()
