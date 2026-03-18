import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = async () => {
  const cookieStore = await cookies();

  // On VPS behind a reverse proxy (nginx handles HTTPS), Next.js sees HTTP
  // internally, so Supabase SSR sets `secure: undefined` on cookies.
  // Browsers refuse to send non-secure cookies over HTTPS, breaking auth.
  // Force secure=true in production so cookies are always forwarded.
  const isProduction = process.env.NODE_ENV === "production";

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, {
              ...options,
              // Force secure flag in production (VPS + nginx SSL termination)
              secure: isProduction ? true : options?.secure,
            });
          });
        } catch {
          // Called from Server Component — cookie writes will be ignored.
          // This is expected and safe.
        }
      },
    },
  });
};
