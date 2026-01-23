"use client";

import { ProgressProvider } from "@/context/ProgressContext";

export default function NumberGameLayout({ children }: { children: React.ReactNode }) {
  return <ProgressProvider>{children}</ProgressProvider>;
}
