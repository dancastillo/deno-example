import Fastify, { type FastifyInstance } from "npm:fastify@5.0.0";
import workflowService from "./app.ts";

const fastify: FastifyInstance = Fastify({
  logger: true,
});

try {
  await fastify.register(workflowService);
  await fastify.listen({ port: 8000 });
} catch (error: unknown) {
  fastify.log.error(error);
  Deno.exit(1);
}
