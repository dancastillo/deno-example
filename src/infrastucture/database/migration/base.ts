import { postgresClient } from "../postgres/connection.ts";

await postgresClient().query(`
CREATE TABLE "public"."users" (
    "id" uuid NOT NULL,
    "name" text NOT NULL,
    PRIMARY KEY ("id")
);
`);
