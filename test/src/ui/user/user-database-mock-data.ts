import { postgresClient } from "../../../../src/infrastucture/database/postgres/connection.ts";

export const CREATE_USER = {
  id: "0f5f166f-227e-46da-a04e-aff0077371b4",
  name: "bob",
};

export const FIND_ONE_USER = {
  id: "0f5f166f-227e-46da-a04e-aff0077371b5",
  name: "stephen",
};

export const FIND_ALL_USERS = [
  {
    id: "0f5f166f-227e-46da-a04e-aff0077371b1",
    name: "dan",
  },
  {
    id: "0f5f166f-227e-46da-a04e-aff0077371b2",
    name: "alice",
  },
  {
    id: "0f5f166f-227e-46da-a04e-aff0077371b3",
    name: "eve",
  },
];

//---------------------------------------------------------
// Find All Users Test
//---------------------------------------------------------

export async function findAllUsersInDatabaseForTesting() {
  // Drop Mock Data if it exists
  await dropFindAllUsersInDatabaseForTesting();

  // Insert Mock Data
  await postgresClient().query(`
    INSERT INTO "public"."users"
    ("id", "name")
    VALUES
    ('${FIND_ALL_USERS[0].id}', '${FIND_ALL_USERS[0].name}'),
    ('${FIND_ALL_USERS[1].id}', '${FIND_ALL_USERS[1].name}'),
    ('${FIND_ALL_USERS[2].id}', '${FIND_ALL_USERS[2].name}')
  `);
}

export async function dropFindAllUsersInDatabaseForTesting() {
  await postgresClient().query(`
    DELETE FROM "public"."users";
  `);
}

//---------------------------------------------------------
// Create One User Test
//---------------------------------------------------------

export async function createOneUserInDatabaseForTesting() {
  // Drop Mock Data if it exists
  await dropCreateOneUserInDatabaseForTesting();

  // Insert Mock Data
  await postgresClient().query(`
    INSERT INTO "public"."users"
    ("id", "name")
    VALUES
    ('${CREATE_USER.id}', '${CREATE_USER.name}');
  `);
}

export async function dropCreateOneUserInDatabaseForTesting() {
  await postgresClient().query(`
    DELETE FROM "public"."users"
    WHERE id = '${CREATE_USER.id}';
  `);
}

//---------------------------------------------------------
// Find One User Test
//---------------------------------------------------------

export async function findOneUserInDatabaseForTesting() {
  // Drop Mock Data if it exists
  await dropFindOneUserInDatabaseForTesting();

  // Insert Mock Data
  await postgresClient().query(`
    INSERT INTO "public"."users"
    ("id", "name")
    VALUES
    ('${FIND_ONE_USER.id}', '${FIND_ONE_USER.name}');
  `);
}

export async function dropFindOneUserInDatabaseForTesting() {
  await postgresClient().query(`
    DELETE FROM "public"."users"
    WHERE id = '${FIND_ONE_USER.id}';
  `);
}
