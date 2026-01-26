import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio | 简约优雅的个人空间",
  description: "一个简洁、优雅、独特的个人网站，展示作品与思考。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* 全局背景层 */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {/* 纯净白底 */}
          <div className="absolute inset-0 bg-[#fcfcfc]" />

          {/* 微妙的网格纹理 */}
          <div className="absolute inset-0 bg-grid-small opacity-40" />

          {/* 主色调光晕 - 右上角 */}
          <div className="absolute -top-40 -right-40 w-[400px] h-[400px] rounded-full bg-primary/8 blur-[80px]" />

          {/* 银色光晕 - 左下角 */}
          <div className="absolute -bottom-40 -left-40 w-[350px] h-[350px] rounded-full bg-gray-300/20 blur-[70px]" />

          {/* 中央微弱光晕 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/3 blur-[100px]" />
        </div>

        <Navbar />
        <main className="min-h-screen pt-20">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
