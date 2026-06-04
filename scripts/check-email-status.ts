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

    // Check Resend Configuration
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    const cronSecret = process.env.CRON_SECRET;

    console.log("\nChecking configuration:");
    console.log(`- RESEND_API_KEY: ${resendApiKey ? "Configured (Starts with " + resendApiKey.substring(0, 7) + "...)" : "❌ NOT Configured"}`);
    console.log(`- RESEND_FROM_EMAIL: ${fromEmail || "❌ NOT Configured"}`);
    console.log(`- CRON_SECRET: ${cronSecret ? "Configured" : "❌ NOT Configured"}`);

  } catch (error) {
    console.error("❌ Error running checks:", error);
  } finally {
    await client.end();
  }
}

main();
