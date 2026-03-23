/**
 * Script to update all game page.tsx files with metadata and SEO section.
 * Run with: node scripts/update-game-pages.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const gamesDir = path.join(__dirname, "..", "src", "app", "games");

// Map of gameId -> page info extracted from existing files
const gamePages = {};

// Read all game directories
const gameDirs = fs
  .readdirSync(gamesDir)
  .filter((d) => {
    const fullPath = path.join(gamesDir, d);
    return fs.statSync(fullPath).isDirectory() && !d.startsWith("[") && !d.startsWith(".");
  });

console.log(`Found ${gameDirs.length} game directories`);

for (const gameDir of gameDirs) {
  const pagePath = path.join(gamesDir, gameDir, "page.tsx");
  if (!fs.existsSync(pagePath)) {
    console.log(`  SKIP ${gameDir} - no page.tsx`);
    continue;
  }

  const content = fs.readFileSync(pagePath, "utf8");

  // Check if already has metadata
  if (content.includes("generateMetadata") || content.includes("export const metadata")) {
    console.log(`  SKIP ${gameDir} - already has metadata`);
    continue;
  }

  // Check if uses "use client"
  const hasUseClient = content.includes('"use client"');

  // Extract the existing page content to understand pattern
  console.log(`  UPDATE ${gameDir} (use client: ${hasUseClient})`);

  // Read the existing content to preserve the logic
  const existingContent = content;

  // Build the new content by prepending metadata imports and adding SEO section
  let newContent = "";

  // Remove "use client" if present (we'll wrap client parts differently)
  let bodyContent = existingContent.replace(/^"use client";\s*\n?/, "");

  // Add metadata import at the top
  const metadataImport = `import type { Metadata } from "next";\nimport { GAME_SEO } from "@/libs/constants/game-seo";\nimport { GameSeoSection } from "@/components/seo/GameSeoSection";\n`;

  // Check if file imports from COURSES (special pattern like mini-piano, learn-notes)
  const usesCourses = bodyContent.includes("COURSES");

  // Find the existing return statement and wrap it
  // We need to add metadata export before the default function

  // Find the function declaration
  const funcMatch = bodyContent.match(/export default (async )?function (\w+)\(/);
  if (!funcMatch) {
    console.log(`    WARN: could not find function declaration in ${gameDir}`);
    continue;
  }

  const funcName = funcMatch[2];

  // Build new file:
  // 1. Metadata import + existing imports
  // 2. Metadata export
  // 3. Modified function with SEO section

  // Extract imports section (everything before export default function)
  const funcIdx = bodyContent.indexOf("export default");
  const importSection = bodyContent.substring(0, funcIdx).trim();
  const funcSection = bodyContent.substring(funcIdx);

  // Build metadata export
  const metadataExport = `\nconst seo = GAME_SEO["${gameDir}"];\n\nexport const metadata: Metadata = {\n  title: seo.title,\n  description: seo.description,\n  keywords: seo.keywords,\n  alternates: { canonical: \`/games/${gameDir}\` },\n  openGraph: {\n    title: seo.title,\n    description: seo.description,\n    url: \`https://cuthongminh.com/games/${gameDir}\`,\n    type: "website",\n  },\n};\n\n`;

  // Modify the function to wrap return with fragment + SEO section
  let modifiedFunc = funcSection;

  // For pages that use COURSES and "use client", we need to restructure
  if (usesCourses && hasUseClient) {
    // These pages (mini-piano, learn-notes) need special handling
    // They look up course data at runtime - we need to move that to module scope
    // and keep the page as a server component

    // Extract the course lookup
    const courseMatch = bodyContent.match(/const course = COURSES\.find\([^)]+\);\s*\n\s*if \(!course\) return null;/);
    if (courseMatch) {
      // Move course lookup to module scope
      const courseLookup = `const course = COURSES.find((c) => c.id === "${gameDir}")!;\n`;

      // Remove the course lookup from function body
      modifiedFunc = modifiedFunc.replace(courseMatch[0], "");

      // Add course lookup before metadata export
      newContent = metadataImport + importSection + "\n\n" + courseLookup + metadataExport;
    } else {
      newContent = metadataImport + importSection + "\n\n" + metadataExport;
    }
  } else {
    newContent = metadataImport + importSection + "\n\n" + metadataExport;
  }

  // Now modify the return statement to include GameSeoSection
  // Find the return(<GameWrapGroups ... />) pattern
  // Replace single-line return
  modifiedFunc = modifiedFunc.replace(
    /return\s*<GameWrapGroups([^/]*?)\/>/,
    `return (\n    <>\n      <GameWrapGroups$1/>\n      <GameSeoSection gameId="${gameDir}" />\n    </>\n  )`
  );

  // Replace multi-line return that already has parens
  modifiedFunc = modifiedFunc.replace(
    /return\s*\(\s*\n\s*<GameWrapGroups([\s\S]*?)\/>\s*\n\s*\)/,
    `return (\n    <>\n      <GameWrapGroups$1/>\n      <GameSeoSection gameId="${gameDir}" />\n    </>\n  )`
  );

  newContent += modifiedFunc;

  // Write the new content
  fs.writeFileSync(pagePath, newContent, "utf8");
  console.log(`    DONE: ${pagePath}`);
}

console.log("\nAll game pages updated!");
