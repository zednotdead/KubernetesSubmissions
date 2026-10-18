import { env } from "bun";

const port = parseInt(env.PORT ?? "3000");

console.log(`Server started in port ${port}`)

Bun.serve({
  port,
  routes: {
    "/": new Response("Todo server."),
  },
});

