import type { Metadata } from "next";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";
import KakaoAdFit from "@/components/KakaoAdFit";
import { CoupangBanner } from "@/components/CoupangBanner";

export const metadata: Metadata = {
  title: "경매 취득세 계산 | 일반 매매와 차이점, 세율표",
  description: "경매 낙찰 시 취득세 계산법, 일반 매매와의 차이, 물건 유형별 세율을 정리합니다.",
  keywords: ["경매 취득세", "경매 세금", "낙찰 취득세", "부동산 경매 취득세"],
};

export default function AcquisitionTaxGuidePage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-2">경매 취득세 계산 가이드</h1>
      <p className="text-muted mb-8">경매로 낙찰받으면 취득세를 얼마나 내야 할까요? 일반 매매와의 차이도 함께 정리합니다.</p>

      <article className="prose prose-zinc dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-bold">경매 취득세의 과세표준</h2>
          <p>경매로 부동산을 취득하면 <strong>낙찰가(매각가)</strong>가 과세표준이 됩니다. 감정가가 아니라 실제 낙찰받은 금액 기준입니다.</p>
          <p>일반 매매는 실거래가, 경매는 낙찰가. 경매가 보통 시세보다 싸게 낙찰되므로 취득세도 적게 나옵니다.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold">경매 취득세 세율</h2>
          <p>세율 자체는 일반 매매와 동일합니다.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-card-border">
                  <th className="py-2 text-left">유형</th>
                  <th className="py-2 text-left">취득세</th>
                  <th className="py-2 text-left">합계 (부가세 포함)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-card-border">
                <tr><td className="py-2">주택 6억 이하 (1주택)</td><td>1%</td><td>1.1%</td></tr>
                <tr><td className="py-2">주택 9억 초과 (1주택)</td><td>3%</td><td>3.5%</td></tr>
                <tr><td className="py-2">다주택 (조정지역)</td><td>8%</td><td>9%</td></tr>
                <tr><td className="py-2">상가·토지</td><td>4%</td><td>4.6%</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold">경매만의 추가 비용</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>인지대: 매각 허가 결정 시 납부</li>
            <li>송달료: 법원 비용</li>
            <li>법무사 비용: 소유권 이전 등기 대행</li>
            <li>명도비용: 점유자 퇴거 협의금</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold">납부 기한</h2>
          <p>잔금 납부일(대금 완납일)로부터 <strong>60일 이내</strong>에 취득세를 신고·납부해야 합니다.</p>
        </section>

        <div className="not-prose">
          <div className="my-8 p-5 bg-primary/5 border border-primary/20 rounded-xl text-center">
            <p className="font-bold text-lg mb-2">경매 취득세 직접 계산해보세요</p>
            <Link href="/acquisition-tax" className="inline-block px-6 py-3 bg-primary text-white font-bold rounded-lg hover:opacity-90 transition-opacity">
              취득세 계산기 바로가기
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
