import { config } from "dotenv";
import * as schema from "./schema";
import type { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import type { Sql } from "postgres";

interface Connect {
  db: VercelPgDatabase<typeof schema>;
  connection: Sql;
}

/**
 * ### call use[Normal|Migrate] before using db
 *
 * this is abstract, so the detail of logic is in child class.
 */
abstract class AbsDBConnection {
  public db!: VercelPgDatabase<typeof schema>;
  private connection!: Sql;

  protected abstract connectNormal(): Promise<Connect>;
  protected abstract connectMigrate(): Promise<Connect>;

  /**
   * ### Normal connection
   */
  async useNormal() {
    const { connection, db } = await this.connectNormal();
    this.connection = connection;
    this.db = db;
  }

  /**
   * ### Connection for migrate
   *
   * use migrate or insert with seed value.
   */
  async useMigrate() {
    const { connection, db } = await this.connectMigrate();
    this.connection = connection;
    this.db = db;
  }

  close() {
    this.connection.end();
  }
}

/**
 * ### for vercel postgres in production
 *
 * the connection is auto on exiting at vercel postgres.\
 * So, you can without calling close in production.
 */
class ProdDBConnection extends AbsDBConnection {
  protected async connectMigrate() {
    return await this.connectNormal();
  }
  protected async connectNormal() {
    const loader = Promise.all([
      import("drizzle-orm/vercel-postgres"),
      import("@vercel/postgres"),
    ]);
    const [{ drizzle }, { sql }] = await loader;
    const db = drizzle<typeof schema>(sql);
    const connection = { end: () => {} } as Sql;
    return { db, connection };
  }
}

/**
 * ### for postgres in devlop.
 *
 * the connection needs close to exit.\
 * Add, a number of the migrate connection is 1.
 */
class DevDbConnection extends AbsDBConnection {
  protected async connectMigrate() {
    config({ path: "./.env.dev" });
    const loader = Promise.all([
      import("drizzle-orm/postgres-js"),
      import("postgres"),
    ]);
    const [{ drizzle }, { default: postgres }] = await loader;
    const client = postgres(
      "postgres://metallic_user:pass@0.0.0.0:5432/metallic_db",
      { max: 1 }
    );
    const db = drizzle(client, { schema }) as unknown as VercelPgDatabase<
      typeof schema
    >;
    const connection = client;
    return { db, connection };
  }
  protected async connectNormal() {
    config({ path: "./.env.dev" });
    const loader = Promise.all([
      import("drizzle-orm/postgres-js"),
      import("postgres"),
    ]);
    const [{ drizzle }, { default: postgres }] = await loader;
    const client = postgres(
      "postgres://metallic_user:pass@0.0.0.0:5432/metallic_db"
    );
    const db = drizzle(client, { schema }) as unknown as VercelPgDatabase<
      typeof schema
    >;
    const connection = client;
    return { db, connection };
  }
}

export const dbConnection =
  process.env.NODE_ENV === "production"
    ? new ProdDBConnection()
    : new DevDbConnection();
