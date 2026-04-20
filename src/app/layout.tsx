import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://auction-calc.vercel.app"),
  title: {
    default: "경매 계산기 | 부동산 경매 수익률·취득세·대출이자 계산",
    template: "%s | 경매 계산기",
  },
  description:
    "부동산 경매 투자자를 위한 무료 계산기. 경매 수익률, 취득세, 대출이자, 임대수익률을 한 곳에서 빠르게 계산하세요.",
  keywords: [
    "경매 계산기",
    "경매 수익률",
    "취득세 계산기",
    "부동산 경매",
    "대출이자 계산기",
    "임대수익률",
    "경매 투자",
    "부동산 경매 계산기",
    "낙찰가 계산",
  ],
  openGraph: {
    title: "경매 계산기 | 부동산 경매 수익률·취득세·대출이자 계산",
    description:
      "부동산 경매 투자자를 위한 무료 계산기. 수익률, 취득세, 대출이자, 임대수익률을 한 곳에서.",
    type: "website",
    locale: "ko_KR",
    url: "https://auction-calc.vercel.app",
    siteName: "경매 계산기",
  },
  robots: { index: true, follow: true },
};

const NAV_ITEMS = [
  { href: "/auction-return", label: "경매 수익률" },
  { href: "/acquisition-tax", label: "취득세" },
  { href: "/loan-interest", label: "대출이자" },
  { href: "/rental-yield", label: "임대수익률" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="naver-site-verification" content="a538c6f23145ccab416159935e931e183d3e1cb1" />
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-6L251D0CYV"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-6L251D0CYV');
            `,
          }}
        />
        {/* AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3913442122539155"
          crossOrigin="anonymous"
        />
        {/* 카카오 애드핏 */}
        <script
          async
          src="//t1.daumcdn.net/kas/static/ba.min.js"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <header className="border-b border-card-border bg-card-bg sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 py-2 flex flex-col sm:flex-row sm:h-14 sm:items-center sm:justify-between gap-1">
            <Link href="/" className="text-lg font-bold text-primary whitespace-nowrap">
              경매 계산기
            </Link>
            <nav className="flex gap-0.5 overflow-x-auto">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-2.5 py-1 text-sm rounded-md hover:bg-accent transition-colors text-foreground whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
          {children}
        </main>

        <footer className="border-t border-card-border py-6 text-center text-sm text-muted">
          <div className="max-w-5xl mx-auto px-4">
            <p>
              본 계산기는 참고용이며, 실제 투자 결정 시 전문가 상담을
              권장합니다.
            </p>
            <div className="mt-3 flex justify-center gap-4">
              <a href="https://tax-calc-five.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">부동산 세금 계산기</a>
            </div>
            <p className="mt-2">
              운영: 온기획(ON) | 이메일: js4yj@naver.com
            </p>
            <p className="mt-1">
              &copy; {new Date().getFullYear()} 경매 계산기. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
