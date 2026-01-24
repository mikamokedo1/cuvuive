import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = async () => {
  const cookieStore = await cookies();

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          console.log(
            "Supabase Server: setAll called with",
            cookiesToSet.map((c) => `${c.name} (secure: ${c.options?.secure}, path: ${c.options?.path})`),
          );
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch (error) {
          console.error("Supabase Server: Error setting cookies", error);
        }
      },
    },
  });
};
