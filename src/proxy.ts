import { updateSession } from "@/libs/supabase/proxy";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  // Markdown content negotiation (Cloudflare Markdown for Agents standard).
  // When an AI agent sends `Accept: text/markdown`, serve markdown instead of HTML.
  const accept = request.headers.get("accept") || "";
  if (accept.includes("text/markdown")) {
    const pathname = request.nextUrl.pathname;
    const isContentPage =
      !pathname.startsWith("/api/") &&
      !pathname.startsWith("/auth/") &&
      !pathname.startsWith("/settings/") &&
      !pathname.startsWith("/_next/") &&
      !pathname.startsWith("/share/") &&
      !pathname.includes(".");

    if (isContentPage) {
      const url = request.nextUrl.clone();
      url.pathname = "/llms-full.txt";
      return NextResponse.rewrite(url, {
        headers: { "Content-Type": "text/markdown; charset=utf-8" },
      });
    }
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|xml|txt|ico|json|webmanifest|mp3|mp4)$).*)",
  ],
};
