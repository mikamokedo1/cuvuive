import { GameLayout } from "@/components/layout/GameLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-sky-50">{children}</div>;
}
