import Header from "@/components/layout/Header";

export default function EarnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-50 font-[family-name:var(--font-nunito-sans)] py-6 px-4">
      <Header />
      {children}
    </div>
  );
}
