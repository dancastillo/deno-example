import type { FastifyInstance } from "npm:fastify@5.0.0";

export default function (fastify: FastifyInstance) {
  fastify.get("/", () => {
    return {
      message: "Hello World!",
    };
  });
}
