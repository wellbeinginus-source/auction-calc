import type { Metadata } from "next";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";
import KakaoAdFit from "@/components/KakaoAdFit";
import { CoupangBanner } from "@/components/CoupangBanner";

export const metadata: Metadata = {
  title: "경매 수익률 계산하는 법 | 공식·예시·주의사항",
  description: "부동산 경매 수익률 계산 공식, 실전 예시, 초보자가 놓치기 쉬운 비용 항목까지 정리합니다.",
  keywords: ["경매 수익률", "경매 수익률 계산", "경매 투자 수익률", "부동산 경매"],
};

export default function AuctionReturnGuidePage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-2">경매 수익률 계산하는 법</h1>
      <p className="text-muted mb-8">낙찰받기 전에 수익률을 먼저 따져봐야 합니다. 공식과 실전 예시를 정리합니다.</p>

      <article className="prose prose-zinc dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-bold">경매 수익률 공식</h2>
          <p className="bg-accent p-3 rounded-lg text-sm">
            <strong>수익률 = (매도가 - 낙찰가 - 총 제비용) ÷ (낙찰가 + 총 제비용) × 100</strong>
          </p>
          <p>총 제비용에는 취득세, 중개수수료, 명도비용, 수리비, 법무사 비용 등이 포함됩니다.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold">실전 예시</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>감정가 1.5억, 낙찰가 1억 (낙찰가율 67%)</li>
            <li>취득세 + 기타 비용: 500만원</li>
            <li>수리비: 300만원</li>
            <li>6개월 후 1.3억에 매도</li>
          </ul>
          <p>
            수익률 = (1.3억 - 1억 - 800만) ÷ (1억 + 800만) × 100 = <strong>약 20.4%</strong>
          </p>
          <p>연환산 수익률 = 20.4% ÷ 6개월 × 12 = <strong>약 40.7%</strong></p>
        </section>

        <section>
          <h2 className="text-xl font-bold">초보자가 놓치는 비용</h2>
          <ol className="list-decimal pl-5 space-y-1">
            <li><strong>명도비용</strong>: 점유자가 있으면 이사비 협의 필요 (100~500만원)</li>
            <li><strong>미납 관리비</strong>: 경매 물건은 관리비 체납이 많음</li>
            <li><strong>대출이자</strong>: 보유 기간 동안의 이자도 비용</li>
            <li><strong>양도소득세</strong>: 매도 시 양도세도 고려해야 진짜 수익률</li>
            <li><strong>공실 기간</strong>: 임대 목적이면 세입자 구하는 기간의 손실</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-bold">수익률 몇 %가 적정한가?</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>연 10% 미만: 은행 이자 대비 매력 낮음</li>
            <li>연 10~20%: 안정적인 수익 구간</li>
            <li>연 20% 이상: 우수 (리스크도 점검 필요)</li>
          </ul>
          <p>다만 보유 기간이 길어질수록 연환산 수익률이 낮아지므로, 매도 시점도 중요합니다.</p>
        </section>

        <div className="not-prose">
          <div className="my-8 p-5 bg-primary/5 border border-primary/20 rounded-xl text-center">
            <p className="font-bold text-lg mb-2">경매 수익률 직접 계산해보세요</p>
            <p className="text-sm text-muted mb-4">낙찰가, 제비용, 매도가만 입력하면 바로 결과가 나옵니다.</p>
            <Link href="/auction-return" className="inline-block px-6 py-3 bg-primary text-white font-bold rounded-lg hover:opacity-90 transition-opacity">
              경매 수익률 계산기 바로가기
            </Link>
          </div>
          <CoupangBanner />
          <KakaoAdFit />
          <AdBanner />
        </div>
      </article>
    </>
  );
}
