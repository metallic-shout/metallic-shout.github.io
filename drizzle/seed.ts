import * as Schema from "./schema";
import { dbConnection } from "./db";
import { string2DoubleStrucks } from "./seed-parts/string2double-struck";
import { metalMap } from "./seed-parts/metal-atom-map";
import { NewStyledMetalAtoms, NewMetalAtoms } from "./schema";

(async () => {
  await dbConnection.useMigrate();
  const db = dbConnection.db;

  const values: NewMetalAtoms[] = Array.from(metalMap.values()).map(
    ([elementCode, name]) => ({
      elementCode,
      name,
    })
  );

  await db.insert(Schema.metalAtoms).values(values).onConflictDoNothing();

  const metals = await db
    .select({ id: Schema.metalAtoms.id, name: Schema.metalAtoms.name })
    .from(Schema.metalAtoms);
  const styled: NewStyledMetalAtoms[] = metals.map(({ id, name }) => ({
    base: id,
    type: "double-struck",
    body: string2DoubleStrucks(name),
  }));

  await db.insert(Schema.styledMetalAtoms).values(styled).onConflictDoNothing();

  dbConnection.close();
})();
