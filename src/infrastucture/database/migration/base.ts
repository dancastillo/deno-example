// import { getPgClient } from "../postgres/connection.ts";
//
// const client = await getPgClient();
//
// await client.queryObject(`
// CREATE TABLE "public"."users" (
//     "id" uuid NOT NULL,
//     "name" text NOT NULL,
//     PRIMARY KEY ("id")
// );
// `);
//
// await client.queryObject(`
// INSERT INTO "public"."users"
// ("id", "name")
// VALUES
// ('0f5f166f-227e-46da-a04e-aff0077371b1', 'dan');
// `);
//
// const users = await client.queryObject("SELECT * FROM users");
//
// console.log(users.rows);
