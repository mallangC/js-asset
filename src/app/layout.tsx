import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "에스제이에셋대부(주)",
  description: "에스제이에셋대부 공식 홈페이지입니다.",
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: {
      "naver-site-verification": process.env.NAVER_SITE_VERIFICATION ?? "",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
