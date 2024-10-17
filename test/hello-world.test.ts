import Fastify, { type FastifyInstance } from "npm:fastify@5.0.0";
import workflowService from "../src/app.ts";
import { assertEquals } from "jsr:@std/assert";
import type { AddressInfo } from "node:net";

const TEST_PORT = 4000;

async function buildFastify(signal: AbortSignal): Promise<FastifyInstance> {
  const fastify = Fastify();
  await fastify.register(workflowService);
  await fastify.listen({ port: TEST_PORT, signal: signal });
  return fastify;
}

function getFastifyUrl(fastify: FastifyInstance, path: string = ""): string {
  const { port, address } = fastify.server?.address() as AddressInfo;
  return `http://${address}:${port}/${path}`;
}

/**
 * Cannot use fastify.inject() with Deno
 *
 * https://fastify.dev/docs/v1.14.x/Documentation/Testing/#testing-with-http-injection
 *
 * workflowService ... workflowService => https://jsr.io/@std/testing/1.0.3/_test_suite.ts:349:15
 * error: TypeError: Class constructor ServerResponse cannot be invoked without 'new'
 *     at new Response (file:///Users/dancastillo/Library/Caches/deno/npm/registry.npmjs.org/light-my-request/6.1.0/lib/response.js:10:23)
 *     at file:///Users/dancastillo/Library/Caches/deno/npm/registry.npmjs.org/light-my-request/6.1.0/index.js:62:19
 *     at new Promise (<anonymous>)
 *     at doInject (file:///Users/dancastillo/Library/Caches/deno/npm/registry.npmjs.org/light-my-request/6.1.0/index.js:60:12)
 *     at Chain.<computed> [as then] (file:///Users/dancastillo/Library/Caches/deno/npm/registry.npmjs.org/light-my-request/6.1.0/index.js:150:23)
 *
 * @github {https://github.com/denoland/deno/issues/19901}
 */

Deno.test("WorkspaceService :: Routes :: Hello World Endpoint", async () => {
  const abortController = new AbortController();
  const { signal } = abortController;
  const fastify = await buildFastify(signal);
  const url = getFastifyUrl(fastify);

  const response = await fetch(url);
  const result = await response.json();
  const status = response.status;

  assertEquals(status, 200);
  assertEquals(result, { message: "Hello World!" });

  abortController.abort();
});
