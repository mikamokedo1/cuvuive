import type { MetadataRoute } from "next";

const DISALLOWED_PATHS = ["/auth/", "/settings/", "/learn-progress/", "/api/", "/share/"];

// AI crawler bot user agents that should be explicitly managed
const AI_BOTS = [
  "GPTBot",            // OpenAI - GPT model training
  "ChatGPT-User",      // OpenAI - ChatGPT browsing
  "OAI-SearchBot",     // OpenAI - SearchGPT
  "ClaudeBot",         // Anthropic - Claude AI
  "Claude-SearchBot",  // Anthropic - Claude search
  "Claude-User",       // Anthropic - Claude user queries
  "PerplexityBot",     // Perplexity AI search
  "Applebot-Extended", // Apple Intelligence
  "Google-Extended",   // Google Gemini AI
  "cohere-ai",         // Cohere AI
  "Bytespider",        // ByteDance - TikTok AI training
  "CCBot",             // Common Crawl - AI dataset builder
  "anthropic-ai",      // Anthropic - AI model training
  "Amazonbot",         // Amazon - Alexa/AI training
];

// Social media bots for link previews (OG images, cards)
const SOCIAL_BOTS = [
  "FacebookBot",
  "facebookexternalhit",
  "LinkedInBot",
  "Twitterbot",
  "Slackbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default rule for all bots
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOWED_PATHS,
      },
      // Explicit allow for AI crawler bots
      ...AI_BOTS.map((bot) => ({
        userAgent: bot,
        allow: "/",
        disallow: DISALLOWED_PATHS,
      })),
      // Social media bots for link previews
      ...SOCIAL_BOTS.map((bot) => ({
        userAgent: bot,
        allow: "/",
      })),
    ],
    sitemap: "https://cuthongminh.com/sitemap.xml",
  };
}
