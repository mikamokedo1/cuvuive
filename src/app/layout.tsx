import type { Metadata } from "next";
import { Baloo_2, Nunito_Sans } from "next/font/google";
import "./globals.css";

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
  title: "Cú Thông Minh - Vừa học vừa chơi",
  description: "Ứng dụng học tập vui nhộn cho bé",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${baloo2.variable} ${nunitoSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
