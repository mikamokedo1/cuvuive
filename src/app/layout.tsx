import type { Metadata } from "next";
import { Baloo_2, Nunito_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { AppStructuredData } from "@/app/AppStructuredData";
import { ClientProviders } from "@/context/ClientProviders";
import { AutoRecoveryBoundary } from "@/components/common/AutoRecoveryBoundary";
import { FacebookMessenger } from "@/components/common/FacebookMessenger";
import { AppProviders } from "@/app/AppProviders";
import { Suspense } from "react";

// Configure fonts
const baloo2 = Baloo_2({
  subsets: ["vietnamese", "latin"],
  weight: ["700"],
  variable: "--font-baloo-2",
  display: "swap",
  preload: true,
});

const nunitoSans = Nunito_Sans({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "700"],
  variable: "--font-nunito-sans",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cuthongminh.com"),
  alternates: {
    canonical: "/",
    languages: {
      vi: "https://cuthongminh.com",
      "x-default": "https://cuthongminh.com",
    },
  },
  title: {
    default: "Cú Thông Minh — Trò Chơi Giáo Dục Miễn Phí Cho Bé 3-8 Tuổi | Vừa Học Vừa Chơi",
    template: "%s | Cú Thông Minh",
  },
  description:
    "Cho bé vừa học vừa chơi với 20+ trò chơi tương tác: học toán, chữ cái, tư duy logic, mê cung, pha màu. An toàn 100%, không quảng cáo. 1,000+ phụ huynh tin dùng. Trải nghiệm miễn phí ngay!",
  keywords: [
    "trò chơi giáo dục cho bé",
    "app học tập cho trẻ mầm non",
    "bé học toán online",
    "học chữ cái tiếng việt cho bé",
    "trò chơi trí tuệ cho bé 3 tuổi",
    "giáo dục sớm cho trẻ",
    "game giáo dục miễn phí",
    "bé học đếm số",
    "trò chơi tư duy logic cho bé",
    "ứng dụng học tập cho bé mầm non",
    "dạy bé học toán tại nhà",
    "trò chơi nhận biết màu sắc hình dạng",
    "cú thông minh",
    "học mà chơi cho trẻ em",
    "phát triển trí tuệ trẻ em",
  ],
  openGraph: {
    title: "Cú Thông Minh — Trò Chơi Giáo Dục Miễn Phí Cho Bé 3-8 Tuổi",
    description:
      "Cho bé vừa học vừa chơi với 20+ trò chơi tương tác: toán, chữ cái, mê cung, pha màu. An toàn, không quảng cáo. 1,000+ phụ huynh tin dùng!",
    url: "https://cuthongminh.com",
    siteName: "Cú Thông Minh",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Cú Thông Minh - Trò chơi giáo dục cho bé 3-8 tuổi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@cuthongminh",
    creator: "@cuthongminh",
    title: "Cú Thông Minh — Trò Chơi Giáo Dục Miễn Phí Cho Bé 3-8 Tuổi",
    description:
      "Cho bé vừa học vừa chơi với 20+ trò chơi tương tác: toán, chữ cái, mê cung, pha màu. An toàn, không quảng cáo. Trải nghiệm ngay!",
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
      <head>
        {/* Explicit hreflang tags for global SEO */}
        <link rel="alternate" hrefLang="vi" href="https://cuthongminh.com/" />
        <link rel="alternate" hrefLang="x-default" href="https://cuthongminh.com/" />
        {/* Preconnect to external domains for faster resource loading */}
        <link rel="preconnect" href="https://assets.cuthongminh.com" />
        <link rel="dns-prefetch" href="https://assets.cuthongminh.com" />
      </head>
      <body className={`${baloo2.variable} ${nunitoSans.variable} antialiased`} suppressHydrationWarning>
        <AppStructuredData />
        <AutoRecoveryBoundary>
          <ClientProviders>
            {children}
            <Suspense>
              <AppProviders />
              <FacebookMessenger />
            </Suspense>
          </ClientProviders>
        </AutoRecoveryBoundary>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
