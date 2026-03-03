import type { Metadata } from "next";
import { Baloo_2, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { OwlProvider } from "@/context/OwlContext";
import { OwlCompanion } from "@/components/common/OwlCompanion";
import { UserProvider } from "@/context/UserContext";
import { AccessProvider } from "@/context/AccessContext";
import { MissingInfoListener } from "@/features/auth/MissingInfoListener";
import { PaywallListener } from "@/features/paywall/PaywallListener";
import { ProgressProvider } from "@/context/ProgressContext";
import { PlayTimerProvider } from "@/context/PlayTimerContext";
import { PlayTimerListener } from "@/features/parental/PlayTimerListener";

import { createClient } from "@/libs/supabase/server";
import { checkUserSubscription } from "@/libs/subscription";

// Configure fonts
const baloo2 = Baloo_2({
  subsets: ["vietnamese", "latin"],
  weight: ["600", "700", "800"],
  variable: "--font-baloo-2",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "600", "700"],
  variable: "--font-nunito-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cú Thông Minh - Vừa học vừa chơi | Ứng dụng học tập cho bé",
  description:
    "Cú Thông Minh là ứng dụng giáo dục tương tác giúp bé vừa học vừa chơi, phát triển tư duy toán học và ngôn ngữ một cách tự nhiên.",
  keywords: ["bé học toán", "học đếm", "giáo dục sớm", "trò chơi trí tuệ cho bé", "cú thông minh"],
  openGraph: {
    title: "Cú Thông Minh - Vừa học vừa chơi",
    description: "Ứng dụng giáo dục tương tác giúp bé phát triển tư duy.",
    url: "https://cuthongminh.vn",
    siteName: "Cú Thông Minh",
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cú Thông Minh - Vừa học vừa chơi",
    description: "Ứng dụng giáo dục tương tác giúp bé phát triển tư duy.",
  },
  icons: {
    icon: [
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Cú Thông Minh",
  },
};

export const viewport = {
  themeColor: "#FF9C01",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${baloo2.variable} ${nunitoSans.variable} antialiased`} suppressHydrationWarning>
        <UserProvider>
          <AccessProvider>
            <ProgressProvider>
              <PlayTimerProvider>
                <OwlProvider>
                  {children}
                  <OwlCompanion />
                  <MissingInfoListener />
                  <PaywallListener />
                  <PlayTimerListener />
                </OwlProvider>
              </PlayTimerProvider>
            </ProgressProvider>
          </AccessProvider>
        </UserProvider>
      </body>
    </html>
  );
}
