import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import { SignupForm } from "@/features/auth/SignupForm";

export default async function SignupPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/games");
  }

  return (
    <main className="min-h-screen bg-sky-100 flex items-center justify-center p-4 bg-[url('/bg-pattern.png')]">
      <SignupForm />
    </main>
  );
}
