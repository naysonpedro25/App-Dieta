import Fastify from "fastify";
import { routes } from "./routes/routes.js";

import cors from "@fastify/cors";

const app = Fastify({ logger: true });

app.setErrorHandler((error, reques, reply) => {
  app.log.error(error);
  reply.status(400).send({ ok: false });
});

app.register(cors,{origin: true  ,credentials: true});
(async () => {
  app.register(routes);

  try {
    app.listen({ port: 3000, host: "0.0.0.0" });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
})();
