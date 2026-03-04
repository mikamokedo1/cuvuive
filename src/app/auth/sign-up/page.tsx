import { SignupForm } from "@/features/auth/SignupForm";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-sky-100 flex items-center justify-center p-4 bg-[url('/bg-pattern.png')]">
      <SignupForm />
    </main>
  );
}
