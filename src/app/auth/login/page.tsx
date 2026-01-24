import { LoginForm } from "@/features/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-sky-100 flex items-center justify-center p-4 bg-[url('/bg-pattern.png')]">
      <LoginForm />
    </div>
  );
}
