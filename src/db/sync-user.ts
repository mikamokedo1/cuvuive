import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres"; // Import directly
import { users } from "./schema";

dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local" });

// We need to define db here to ensure env vars are loaded first
// or we could use dynamic import, but this is cleaner for a script.

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  // Same config as src/db/index.ts
  const client = postgres(connectionString, { prepare: false });
  const db = drizzle(client, { schema: { users } });

  const userId = "dc270c47-bb39-4f52-998e-c775adbddf44";

  console.log(`Syncing user ${userId}...`);

  try {
    const result = await db
      .insert(users)
      .values({
        id: userId,
        email: "synced_via_script@example.com", // Temporary email
        isPro: false,
      })
      .onConflictDoNothing()
      .returning();

    console.log("User synced successfully!", result);
  } catch (error) {
    console.error("Error syncing user:", error);
  }

  // Close connection to exit script
  await client.end();
  process.exit(0);
}

main();
