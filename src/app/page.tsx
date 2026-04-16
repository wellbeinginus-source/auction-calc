import type { Metadata } from "next";
import Link from "next/link";
import { CoupangBanner, BookRecommendations } from "@/components/CoupangBanner";

export const metadata: Metadata = {
  title: "경매 계산기 | 부동산 경매 수익률·취득세·대출이자 무료 계산",
  description:
    "부동산 경매 투자에 필요한 모든 계산을 한 곳에서. 경매 수익률, 취득세, 대출이자, 임대수익률 계산기를 무료로 이용하세요.",
};

const CALCULATORS = [
  {
    href: "/auction-return",
    icon: "📊",
    title: "경매 수익률 계산기",
    desc: "낙찰가, 제비용, 매도가를 입력하면 순수익과 수익률을 바로 확인할 수 있어요.",
  },
  {
    href: "/acquisition-tax",
    icon: "🏛️",
    title: "취득세 계산기",
    desc: "낙찰가 기준으로 취득세, 지방교육세, 농어촌특별세까지 한번에 계산해요.",
  },
  {
    href: "/loan-interest",
    icon: "💰",
    title: "대출이자 계산기",
    desc: "원리금균등, 원금균등, 만기일시 상환 방식별 월 납입금과 총 이자를 비교해요.",
  },
  {
    href: "/rental-yield",
    icon: "🏠",
    title: "임대수익률 계산기",
    desc: "낙찰가 대비 월세·전세 수익률과 연간 순수익을 계산해요.",
  },
];

export default function Home() {
  return (
    <>
      <section className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-3">
          부동산 경매 투자,
          <br className="sm:hidden" /> 계산부터 시작하세요
        </h1>
        <p className="text-muted text-lg max-w-xl mx-auto">
          경매 수익률, 취득세, 대출이자, 임대수익률까지.
          <br />
          복잡한 계산을 쉽고 빠르게 해결하세요.
        </p>
      </section>

      <div className="grid sm:grid-cols-2 gap-4">
        {CALCULATORS.map((calc) => (
          <Link
            key={calc.href}
            href={calc.href}
            className="group block p-6 rounded-xl border border-card-border bg-card-bg hover:border-primary hover:shadow-md transition-all"
          >
            <div className="text-3xl mb-3">{calc.icon}</div>
            <h2 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
              {calc.title}
            </h2>
            <p className="text-sm text-muted">{calc.desc}</p>
          </Link>
        ))}
      </div>

      <CoupangBanner />

      <BookRecommendations />

      {/* AdSense 광고 영역 */}
      <div className="mt-8 text-center">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXXXXX"
          data-ad-slot="XXXXXXXXXX"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>

      {/* FAQ - SEO용 */}
      <section className="mt-16">
        <h2 className="text-xl font-bold mb-6">자주 묻는 질문</h2>
        <div className="space-y-4">
          {[
            {
              q: "경매 수익률은 어떻게 계산하나요?",
              a: "순수익(매도가 - 낙찰가 - 총 제비용)을 총 투자금(낙찰가 + 총 제비용)으로 나눈 뒤 100을 곱합니다. 예: 1억에 낙찰받아 제비용 500만원, 1.3억에 매도하면 수익률 약 23.8%입니다.",
            },
            {
              q: "경매 취득세는 일반 매매와 다른가요?",
              a: "세율은 동일합니다. 다만 경매는 낙찰가(매각가)가 과세표준이 되며, 법원 관련 비용(인지대, 송달료 등)이 추가로 발생합니다.",
            },
            {
              q: "경매 대출은 얼마까지 가능한가요?",
              a: "일반적으로 감정가의 60~80% 범위에서 대출이 가능하지만, 물건 유형·지역·개인 신용에 따라 달라집니다. 대출이자 계산기로 예상 이자를 미리 확인하세요.",
            },
            {
              q: "임대수익률 몇 % 이상이면 괜찮은가요?",
              a: "일반적으로 연 5% 이상이면 양호, 8% 이상이면 우수로 봅니다. 다만 공실률, 수선비, 세금 등을 고려해야 실질 수익률을 알 수 있습니다.",
            },
          ].map((faq, i) => (
            <details
              key={i}
              className="border border-card-border rounded-lg p-4 bg-card-bg"
            >
              <summary className="font-medium cursor-pointer">{faq.q}</summary>
              <p className="mt-2 text-sm text-muted">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* JSON-LD 구조화 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "경매 계산기",
            description:
              "부동산 경매 투자자를 위한 무료 수익률·취득세·대출이자·임대수익률 계산기",
            applicationCategory: "FinanceApplication",
            operatingSystem: "All",
            offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "경매 수익률은 어떻게 계산하나요?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "순수익(매도가 - 낙찰가 - 총 제비용)을 총 투자금(낙찰가 + 총 제비용)으로 나눈 뒤 100을 곱합니다.",
                },
              },
              {
                "@type": "Question",
                name: "경매 취득세는 일반 매매와 다른가요?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "세율은 동일합니다. 다만 경매는 낙찰가가 과세표준이 되며, 법원 관련 비용이 추가됩니다.",
                },
              },
              {
                "@type": "Question",
                name: "경매 대출은 얼마까지 가능한가요?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "일반적으로 감정가의 60~80% 범위에서 대출이 가능하지만, 물건 유형·지역·개인 신용에 따라 달라집니다.",
                },
              },
              {
                "@type": "Question",
                name: "임대수익률 몇 % 이상이면 괜찮은가요?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "일반적으로 연 5% 이상이면 양호, 8% 이상이면 우수로 봅니다.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
