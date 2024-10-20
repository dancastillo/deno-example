import type {
  FastifyError,
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from "npm:fastify@5.0.0";
import helloWorld from "./ui/hello/rest/index.ts";
import user from "./ui/user/rest/index.ts";
import { postgresClient } from "./infrastucture/database/postgres/connection.ts";

export default async function workflowService(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
) {
  await fastify.register(helloWorld);
  await fastify.register(user);

  fastify.addHook("onClose", async () => {
    fastify.log.info("Closing database connections");
    await postgresClient().closeDatabaseConnections();
  });

  fastify.setErrorHandler(
    (err: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
      request.log.error(
        {
          err,
          request: {
            method: request.method,
            url: request.url,
            query: request.query,
            params: request.params,
          },
        },
        "Unhandled error occurred",
      );

      reply.code(err.statusCode ?? 500);

      let message = "Internal Server Error";
      if (err.statusCode === 401) {
        message = err.message;
      }

      return { message };
    },
  );

  fastify.setNotFoundHandler(
    (request: FastifyRequest, reply: FastifyReply) => {
      request.log.warn(
        {
          request: {
            method: request.method,
            url: request.url,
            query: request.query,
            params: request.params,
          },
        },
        "Resource not found",
      );

      reply.code(404);

      return { message: "Not Found" };
    },
  );
}
