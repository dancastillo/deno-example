import { assertEquals } from "jsr:@std/assert";
import { buildFastify, getFastifyUrl } from "../../../common/index.ts";
import {
  dropFindOneUserInDatabaseForTesting,
  FIND_ONE_USER,
  findOneUserInDatabaseForTesting,
} from "./user-database-mock-data.ts";

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

Deno.test("WorkspaceService :: Routes :: GET one user", async (t) => {
  // Load initial mock data for testing Find One User
  await findOneUserInDatabaseForTesting();

  await t.step("Find One User", async () => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const fastify = await buildFastify(signal);
    const url = getFastifyUrl(
      fastify,
      `user/${FIND_ONE_USER.id}`,
    );

    const response = await fetch(url);

    const result = await response.json();
    const status = response.status;

    assertEquals(status, 200);
    assertEquals(result, { user: FIND_ONE_USER });

    abortController.abort();
    await fastify.close();
  });

  await dropFindOneUserInDatabaseForTesting();
});
