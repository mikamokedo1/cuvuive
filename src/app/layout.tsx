import type { Metadata } from "next";
import { Baloo_2, Nunito_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AppStructuredData } from "@/app/AppStructuredData";
import { OwlProvider } from "@/context/OwlContext";
import { UserProvider } from "@/context/UserContext";
import { AccessProvider } from "@/context/AccessContext";
import { ProgressProvider } from "@/context/ProgressContext";
import { PlayTimerProvider } from "@/context/PlayTimerContext";
import { AutoRecoveryBoundary } from "@/components/common/AutoRecoveryBoundary";
import { AppProviders } from "@/app/AppProviders";

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
  metadataBase: new URL("https://cuthongminh.com"),
  alternates: {
    canonical: "/",
    languages: {
      "vi": "https://cuthongminh.com",
    },
  },
  title: "Trò Chơi Giáo Dục Cho Bé 3-8 Tuổi | Cú Thông Minh - Vừa Học Vừa Chơi",
  description:
    "Ứng dụng giáo dục tương tác #1 cho trẻ mầm non. 20+ trò chơi học toán, chữ cái tiếng Việt, tư duy logic giúp bé 3-8 tuổi phát triển toàn diện. Miễn phí, an toàn, không quảng cáo.",
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
    title: "Trò Chơi Giáo Dục Cho Bé 3-8 Tuổi | Cú Thông Minh",
    description:
      "20+ trò chơi giáo dục tương tác giúp bé mầm non học toán, chữ cái, tư duy logic. Nền tảng học mà chơi #1 cho trẻ 3-8 tuổi tại Việt Nam.",
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
    title: "Trò Chơi Giáo Dục Cho Bé 3-8 Tuổi | Cú Thông Minh",
    description: "20+ trò chơi giáo dục tương tác giúp bé mầm non phát triển tư duy toàn diện. Miễn phí, an toàn, không quảng cáo.",
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
        {/* Preconnect to external domains for faster resource loading */}
        <link rel="preconnect" href="https://assets.cuthongminh.com" />
        <link rel="dns-prefetch" href="https://assets.cuthongminh.com" />
        <AppStructuredData />
      </head>
      <body className={`${baloo2.variable} ${nunitoSans.variable} antialiased`} suppressHydrationWarning>
        <AutoRecoveryBoundary>
          <UserProvider>
            <AccessProvider>
              <ProgressProvider>
                <PlayTimerProvider>
                  <OwlProvider>
                    {children}
                    <AppProviders />
                  </OwlProvider>
                </PlayTimerProvider>
              </ProgressProvider>
            </AccessProvider>
          </UserProvider>
        </AutoRecoveryBoundary>
      </body>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            strategy="lazyOnload"
          />
          <Script id="gtag-init" strategy="lazyOnload">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');`}
          </Script>
        </>
      )}
    </html>
  );
}
