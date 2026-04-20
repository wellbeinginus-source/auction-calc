import type { Metadata } from "next";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";
import KakaoAdFit from "@/components/KakaoAdFit";
import { CoupangBanner } from "@/components/CoupangBanner";

export const metadata: Metadata = {
  title: "경매 대출이자 계산 | 상환 방식별 비교",
  description: "경매 잔금 대출 이자 계산법, 원리금균등·원금균등·만기일시 상환 방식 비교를 정리합니다.",
  keywords: ["경매 대출", "경매 대출이자", "원리금균등", "원금균등", "만기일시상환"],
};

export default function LoanInterestGuidePage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-2">경매 대출이자 계산 가이드</h1>
      <p className="text-muted mb-8">경매 잔금 대출, 어떤 상환 방식이 유리할까요? 3가지 방식을 비교합니다.</p>

      <article className="prose prose-zinc dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-bold">경매 대출 가능 금액</h2>
          <p>일반적으로 <strong>감정가의 60~80%</strong> 범위에서 대출이 가능합니다. 물건 유형, 지역, 개인 신용에 따라 달라집니다.</p>
          <p>경매는 낙찰가가 감정가보다 낮은 경우가 많아서, 실질적으로 자기 자본이 적게 들 수 있습니다.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold">3가지 상환 방식 비교</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-card-border">
                  <th className="py-2 text-left">방식</th>
                  <th className="py-2 text-left">특징</th>
                  <th className="py-2 text-left">총 이자</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-card-border">
                <tr><td className="py-2">원리금균등</td><td>매월 같은 금액</td><td>중간</td></tr>
                <tr><td className="py-2">원금균등</td><td>초기 부담 크고 점점 감소</td><td>가장 적음</td></tr>
                <tr><td className="py-2">만기일시</td><td>매월 이자만, 만기에 원금</td><td>가장 많음</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold">경매 투자자에게 유리한 방식</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>단기 매도 예정</strong>: 만기일시 → 월 부담 최소화, 매도 후 원금 상환</li>
            <li><strong>장기 보유 예정</strong>: 원금균등 → 총 이자 절약</li>
            <li><strong>안정적 현금흐름</strong>: 원리금균등 → 예측 가능한 월 납입</li>
          </ul>
        </section>

        <div className="not-prose">
          <div className="my-8 p-5 bg-primary/5 border border-primary/20 rounded-xl text-center">
            <p className="font-bold text-lg mb-2">대출이자 직접 비교해보세요</p>
            <Link href="/loan-interest" className="inline-block px-6 py-3 bg-primary text-white font-bold rounded-lg hover:opacity-90 transition-opacity">
              대출이자 계산기 바로가기
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
