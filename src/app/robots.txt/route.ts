const DISALLOWED_PATHS = ["/auth/", "/settings/", "/api/", "/share/"];

const AI_BOTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Applebot-Extended",
  "Google-Extended",
  "cohere-ai",
  "Bytespider",
  "CCBot",
  "anthropic-ai",
  "Amazonbot",
];

const SOCIAL_BOTS = [
  "FacebookBot",
  "facebookexternalhit",
  "LinkedInBot",
  "Twitterbot",
  "Slackbot",
];

export const dynamic = "force-static";

function buildRobotsTxt(): string {
  const lines: string[] = [];

  // Default user-agent rule
  lines.push("User-agent: *");
  lines.push("Allow: /");
  for (const path of DISALLOWED_PATHS) {
    lines.push(`Disallow: ${path}`);
  }
  lines.push("");

  // AI bot rules
  for (const bot of AI_BOTS) {
    lines.push(`User-agent: ${bot}`);
    lines.push("Allow: /");
    for (const path of DISALLOWED_PATHS) {
      lines.push(`Disallow: ${path}`);
    }
    lines.push("");
  }

  // Social bot rules
  for (const bot of SOCIAL_BOTS) {
    lines.push(`User-agent: ${bot}`);
    lines.push("Allow: /");
    lines.push("");
  }

  // Sitemap
  lines.push("Sitemap: https://cuthongminh.com/sitemap.xml");
  lines.push("");

  // Content Signals
  lines.push("Content-Signal: ai-train=no, search=yes, ai-input=yes");
  lines.push("");

  return lines.join("\n");
}

export function GET() {
  return new Response(buildRobotsTxt(), {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
