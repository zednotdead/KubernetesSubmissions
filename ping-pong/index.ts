import { env } from "bun";

const port = parseInt(env.PORT ?? "3000");

let counter = 0;

console.log(`Server started in port ${port}`)

Bun.serve({
  port,
  routes: {
    "/pingpong": () => {
      const resp = new Response(`pong ${counter}`);
      counter++;
      return resp;
    },
  },
});
