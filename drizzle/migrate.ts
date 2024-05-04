import { migrate as pgMigrate } from "drizzle-orm/postgres-js/migrator";
import { migrate as vercelMigrate } from "drizzle-orm/vercel-postgres/migrator";
import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { dbConnection } from "./db";
import type * as schema from "./schema";

type Schema = typeof schema;

(async () => {
  await dbConnection.useMigrate();
  if (process.env.NODE_ENV === "production") {
    await vercelMigrate(dbConnection.db as VercelPgDatabase<Schema>, {
      migrationsFolder: "./drizzle/dist",
    });
    return;
  }
  await pgMigrate(dbConnection.db as unknown as PostgresJsDatabase<Schema>, {
    migrationsFolder: "./drizzle/dist",
  });
  dbConnection.close();
})();
