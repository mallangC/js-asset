import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "에스제이에셋대부(주) - 에스제이에셋대부 공식 홈페이지",
    template: "%s | 에스제이에셋대부",
  },
  description: "에스제이에셋대부(주) 공식 홈페이지입니다. 에스제이에셋대부는 채권추심 전문 금융회사로 채무조정, 신용회복, 개인회생, 파산 등을 지원합니다.",
  keywords: ["에스제이에셋대부", "에스제이에셋대부(주)", "SJ에셋대부", "채권추심", "채무조정", "신용회복", "대부업"],
  openGraph: {
    title: "에스제이에셋대부(주) - 에스제이에셋대부 공식 홈페이지",
    description: "에스제이에셋대부(주) 공식 홈페이지입니다. 에스제이에셋대부는 채권추심 전문 금융회사로 채무조정, 신용회복, 개인회생, 파산 등을 지원합니다.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "에스제이에셋대부",
    locale: "ko_KR",
    type: "website",
  },
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
