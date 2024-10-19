import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import "jsr:@std/dotenv/load";

export function postgresClient() {
  let client: Client;

  async function closeDatabaseConnections() {
    if (!client) {
      return;
    }
    await client.end();
  }

  async function getClient(): Promise<Client> {
    if (client) {
      return client;
    }

    const databaseUrl = Deno.env.get("DATABASE_URL");
    client = new Client(databaseUrl);

    try {
      await client.connect();
      return client;
    } catch (error: unknown) {
      await client.end();
      throw error;
    }
  }

  function getClientSession() {
    if (!client) {
      return null;
    }
    return client.session;
  }

  function checkConnection() {
    if (!client) {
      return false;
    }
    return client.connected;
  }

  async function query(queryString: string, params: string[] = []) {
    try {
      if (!client) {
        client = await getClient();
      }
      return await client.queryObject(
        queryString,
        [...params],
      );
    } catch (error: unknown) {
      console.error("Error executing query", error);
      throw error;
    } finally {
      await client.end();
    }
  }

  return {
    closeDatabaseConnections: closeDatabaseConnections,
    getClient: getClient,
    checkConnection: checkConnection,
    getClientSession: getClientSession,
    query: query,
  };
}
