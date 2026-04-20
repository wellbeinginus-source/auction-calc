import type { Metadata } from "next";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";
import KakaoAdFit from "@/components/KakaoAdFit";
import { CoupangBanner } from "@/components/CoupangBanner";

export const metadata: Metadata = {
  title: "경매 임대수익률 계산 | 월세·갭투자 수익률 공식",
  description: "경매 낙찰 후 임대 시 수익률 계산법, 표면수익률과 순수익률 차이, 갭투자 분석을 정리합니다.",
  keywords: ["임대수익률", "경매 임대", "갭투자", "월세 수익률", "부동산 수익률"],
};

export default function RentalYieldGuidePage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-2">경매 임대수익률 계산 가이드</h1>
      <p className="text-muted mb-8">낙찰받은 물건을 임대하면 수익률이 얼마나 나올까? 계산법을 정리합니다.</p>

      <article className="prose prose-zinc dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-bold">표면수익률 vs 순수익률</h2>
          <p className="bg-accent p-3 rounded-lg text-sm mb-2">
            <strong>표면수익률 = 연간 임대료 ÷ 총 투자금 × 100</strong>
          </p>
          <p className="bg-accent p-3 rounded-lg text-sm">
            <strong>순수익률 = (임대료 - 공실·유지비) ÷ 실투자금 × 100</strong>
          </p>
          <p>표면수익률만 보면 실제보다 높아 보입니다. 순수익률로 판단하세요.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold">실전 예시</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>낙찰가 8,000만원 + 제비용 400만원 = 총 투자 8,400만원</li>
            <li>전세 5,000만원 끼고 매수 → 실투자금 3,400만원</li>
            <li>월세 전환: 보증금 1,000만원 + 월 40만원</li>
            <li>연 임대료 = 40만 × 12 = 480만원</li>
          </ul>
          <p>표면수익률 = 480 ÷ 8,400 × 100 = <strong>5.7%</strong></p>
          <p>갭투자 수익률 = 480 ÷ 3,400 × 100 = <strong>14.1%</strong></p>
        </section>

        <section>
          <h2 className="text-xl font-bold">수익률에 영향을 미치는 요소</h2>
          <ol className="list-decimal pl-5 space-y-1">
            <li><strong>공실률</strong>: 연 1~2개월 공실 감안 필요</li>
            <li><strong>관리비·수선비</strong>: 노후 건물은 비용 높음</li>
            <li><strong>대출이자</strong>: 이자 비용은 순수익에서 차감</li>
            <li><strong>재산세</strong>: 매년 부과되는 고정 비용</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-bold">적정 임대수익률은?</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>연 5% 미만: 매력 낮음</li>
            <li>연 5~8%: 양호</li>
            <li>연 8% 이상: 우수</li>
          </ul>
        </section>

        <div className="not-prose">
          <div className="my-8 p-5 bg-primary/5 border border-primary/20 rounded-xl text-center">
            <p className="font-bold text-lg mb-2">임대수익률 직접 계산해보세요</p>
            <Link href="/rental-yield" className="inline-block px-6 py-3 bg-primary text-white font-bold rounded-lg hover:opacity-90 transition-opacity">
              임대수익률 계산기 바로가기
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
