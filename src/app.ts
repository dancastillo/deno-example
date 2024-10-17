import type {
  FastifyError,
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from "npm:fastify@5.0.0";
import helloWorld from "./routes/hello-word.ts";

export default async function workflowService(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
) {
  await fastify.register(helloWorld);

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
