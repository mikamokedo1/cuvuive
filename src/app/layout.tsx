import type { Metadata } from "next";
import { Baloo_2, Nunito_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
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
import { InstallPrompt } from "@/components/common/InstallPrompt";

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
  },
  title: "Cú Thông Minh - Vừa học vừa chơi | Ứng dụng học tập cho bé",
  description:
    "Cú Thông Minh là ứng dụng giáo dục tương tác giúp bé vừa học vừa chơi, phát triển tư duy toán học và ngôn ngữ một cách tự nhiên.",
  keywords: ["bé học toán", "học đếm", "giáo dục sớm", "trò chơi trí tuệ cho bé", "cú thông minh"],
  openGraph: {
    title: "Cú Thông Minh - Vừa học vừa chơi | Ứng dụng học tập cho bé",
    description:
      "Cú Thông Minh là nền tảng học mà chơi số 1 cho bé từ 3-8 tuổi, giúp bé phát triển tư duy toán học và ngôn ngữ.",
    url: "https://cuthongminh.com",
    siteName: "Cú Thông Minh",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Cú Thông Minh - Ứng dụng học tập cho bé",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cú Thông Minh - Vừa học vừa chơi",
    description: "Ứng dụng giáo dục tương tác giúp bé phát triển tư duy toàn diện qua hàng trăm trò chơi lý thú.",
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
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Cú Thông Minh",
    url: "https://cuthongminh.com",
    logo: {
      "@type": "ImageObject",
      url: "https://cuthongminh.com/icons/favicon-32x32.png",
      width: "32",
      height: "32",
    },
    description: "Nền tảng học tập tương tác cho bé từ 3-8 tuổi.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+84-888-222-293",
      contactType: "customer service",
      areaServed: "VN",
      availableLanguage: "Vietnamese",
    },
    sameAs: ["https://www.facebook.com/cuthongminh", "https://www.youtube.com/@cuthongminh"],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Cú Thông Minh",
    url: "https://cuthongminh.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://assets.cuthongminh.com/games?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="vi">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
          key="org-jsonld"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
          key="website-jsonld"
        />
      </head>
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
                  <InstallPrompt />
                </OwlProvider>
              </PlayTimerProvider>
            </ProgressProvider>
          </AccessProvider>
        </UserProvider>
      </body>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      )}
    </html>
  );
}
