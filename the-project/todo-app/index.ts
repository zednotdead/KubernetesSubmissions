import { env } from "bun";

const port = parseInt(env.PORT ?? "3000");

console.log(`Server started in port ${port}`)

Bun.serve({
  port,
  routes: {
    "/": (req) => new Response(`Todo server! Serving user agent: ${req.headers.get("User-Agent")}`),
  },
});

