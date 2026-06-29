import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../src/db/schema";
import { eq } from "drizzle-orm";

dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local" });

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("❌ DATABASE_URL is not set in env");
    process.exit(1);
  }

  const client = postgres(connectionString, { prepare: false });
  const db = drizzle(client, { schema });

  try {
    console.log("Checking DB connection and User status...");
    const allUsers = await db.select({
      id: schema.users.id,
      email: schema.users.email,
      weeklyReportEnabled: schema.users.weeklyReportEnabled,
    }).from(schema.users);

    console.log(`Total users in DB: ${allUsers.length}`);
    const eligibleUsers = allUsers.filter(u => u.weeklyReportEnabled);
    console.log(`Users with weekly report enabled: ${eligibleUsers.length}`);

    eligibleUsers.forEach((u, i) => {
      console.log(`  ${i + 1}. ID: ${u.id} - Email: ${u.email}`);
    });

    // Check Brevo Configuration
    const brevoApiKey = process.env.BREVO_API_KEY;
    const fromEmail = process.env.BREVO_FROM_EMAIL;
    const cronSecret = process.env.CRON_SECRET;

    console.log("\nChecking configuration:");
    console.log(`- BREVO_API_KEY: ${brevoApiKey ? "Configured (Starts with " + brevoApiKey.substring(0, 10) + "...)" : "❌ NOT Configured"}`);
    console.log(`- BREVO_FROM_EMAIL: ${fromEmail || "❌ NOT Configured"}`);
    console.log(`- CRON_SECRET: ${cronSecret ? "Configured" : "❌ NOT Configured"}`);

  } catch (error) {
    console.error("❌ Error running checks:", error);
  } finally {
    await client.end();
  }
}

main();
