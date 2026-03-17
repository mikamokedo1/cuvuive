import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import { ForgotPasswordForm } from "@/features/auth/ForgotPasswordForm";

export default async function ForgotPasswordPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/games");
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
      <ForgotPasswordForm />
    </div>
  );
}
