import Fastify, { type FastifyInstance } from "npm:fastify@5.0.0";
import workflowService from "../../src/app.ts";
import type { AddressInfo } from "node:net";

const TEST_PORT = 4000;

export async function buildFastify(
  signal: AbortSignal,
): Promise<FastifyInstance> {
  const fastify = Fastify();
  await fastify.register(workflowService);
  await fastify.listen({ port: TEST_PORT, signal: signal });
  return fastify;
}

export function getFastifyUrl(
  fastify: FastifyInstance,
  path: string = "",
): string {
  const { port, address } = fastify.server?.address() as AddressInfo;
  return `http://${address}:${port}/${path}`;
}
