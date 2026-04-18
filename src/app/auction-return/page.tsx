"use client";

import { useState, useMemo } from "react";
import CalcInput from "@/components/CalcInput";
import ResultRow from "@/components/ResultRow";
import AdBanner from "@/components/AdBanner";
import { CoupangBanner, BookRecommendations } from "@/components/CoupangBanner";

function fmt(n: number): string {
  if (!isFinite(n)) return "-";
  return n.toLocaleString("ko-KR");
}

export default function AuctionReturnPage() {
  const [bidPrice, setBidPrice] = useState("");
  const [acquisitionTax, setAcquisitionTax] = useState("");
  const [courtCost, setCourtCost] = useState("");
  const [repairCost, setRepairCost] = useState("");
  const [movingCost, setMovingCost] = useState("");
  const [agentFee, setAgentFee] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [holdingMonths, setHoldingMonths] = useState("");

  const result = useMemo(() => {
    const bid = Number(bidPrice) || 0;
    const tax = Number(acquisitionTax) || 0;
    const court = Number(courtCost) || 0;
    const repair = Number(repairCost) || 0;
    const moving = Number(movingCost) || 0;
    const agent = Number(agentFee) || 0;
    const sell = Number(sellPrice) || 0;
    const months = Number(holdingMonths) || 0;

    const totalCost = tax + court + repair + moving + agent;
    const totalInvest = bid + totalCost;
    const profit = sell - totalInvest;
    const returnRate = totalInvest > 0 ? (profit / totalInvest) * 100 : 0;
    const annualReturn =
      months > 0 ? (returnRate / months) * 12 : returnRate;

    return { totalCost, totalInvest, profit, returnRate, annualReturn, months };
  }, [
    bidPrice,
    acquisitionTax,
    courtCost,
    repairCost,
    movingCost,
    agentFee,
    sellPrice,
    holdingMonths,
  ]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-2">경매 수익률 계산기</h1>
      <p className="text-muted mb-8">
        낙찰가와 제비용, 예상 매도가를 입력하면 순수익과 수익률을 계산합니다.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* 입력 영역 */}
        <div className="space-y-4">
          <h2 className="font-semibold text-lg border-b border-card-border pb-2">
            투자 정보 입력
          </h2>
          <CalcInput
            label="낙찰가"
            value={bidPrice}
            onChange={setBidPrice}
            helpText="법원에서 낙찰받은 금액"
          />
          <CalcInput
            label="취득세 등"
            value={acquisitionTax}
            onChange={setAcquisitionTax}
            helpText="취득세 + 지방교육세 + 농어촌특별세"
          />
          <CalcInput
            label="법원 비용"
            value={courtCost}
            onChange={setCourtCost}
            helpText="인지대, 송달료, 등기비용 등"
          />
          <CalcInput
            label="수리비"
            value={repairCost}
            onChange={setRepairCost}
            helpText="인테리어, 수선 비용"
          />
          <CalcInput
            label="명도 비용"
            value={movingCost}
            onChange={setMovingCost}
            helpText="이사비, 합의금 등"
          />
          <CalcInput
            label="중개 수수료"
            value={agentFee}
            onChange={setAgentFee}
            helpText="매도 시 부동산 중개보수"
          />

          <div className="border-t border-card-border pt-4 space-y-4">
            <CalcInput
              label="예상 매도가"
              value={sellPrice}
              onChange={setSellPrice}
            />
            <CalcInput
              label="보유 기간"
              value={holdingMonths}
              onChange={setHoldingMonths}
              unit="개월"
              helpText="연환산 수익률 계산에 사용"
            />
          </div>
        </div>

        {/* 결과 영역 */}
        <div>
          <div className="bg-card-bg border border-card-border rounded-xl p-6 sticky top-20">
            <h2 className="font-semibold text-lg mb-4">계산 결과</h2>
            <div className="space-y-1">
              <ResultRow label="낙찰가" value={`${fmt(Number(bidPrice) || 0)} 만원`} />
              <ResultRow label="총 제비용" value={`${fmt(result.totalCost)} 만원`} sub />
              <ResultRow label="총 투자금" value={`${fmt(result.totalInvest)} 만원`} />
              <ResultRow label="예상 매도가" value={`${fmt(Number(sellPrice) || 0)} 만원`} />
              <ResultRow
                label="순수익"
                value={`${fmt(result.profit)} 만원`}
                highlight
              />
              <ResultRow
                label="수익률"
                value={`${result.returnRate.toFixed(2)}%`}
                highlight
              />
              {result.months > 0 && (
                <ResultRow
                  label="연환산 수익률"
                  value={`${result.annualReturn.toFixed(2)}%`}
                />
              )}
            </div>

            {/* 수익률 공식 */}
            <div className="mt-6 p-3 bg-accent rounded-lg text-sm text-muted">
              <p className="font-medium mb-1">계산 공식</p>
              <p>수익률 = (매도가 - 낙찰가 - 제비용) ÷ (낙찰가 + 제비용) × 100</p>
            </div>

            <button
              onClick={() => window.print()}
              className="mt-4 w-full py-2.5 px-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors print:hidden"
            >
              결과 저장 (PDF)
            </button>
          </div>
        </div>
      </div>

      <AdBanner />
      <CoupangBanner />
      <BookRecommendations />

      {/* SEO FAQ */}
      <section className="mt-12">
        <h2 className="text-xl font-bold mb-4">경매 수익률 FAQ</h2>
        <div className="space-y-3">
          <details className="border border-card-border rounded-lg p-4 bg-card-bg">
            <summary className="font-medium cursor-pointer">
              제비용에는 어떤 항목이 포함되나요?
            </summary>
            <p className="mt-2 text-sm text-muted">
              취득세(지방교육세·농어촌특별세 포함), 법원 비용(인지대·송달료), 등기비용,
              수리비, 명도비용(이사비·합의금), 매도 시 중개수수료가 대표적입니다.
              물건에 따라 체납관리비, 유치권 해결 비용 등이 추가될 수 있습니다.
            </p>
          </details>
          <details className="border border-card-border rounded-lg p-4 bg-card-bg">
            <summary className="font-medium cursor-pointer">
              연환산 수익률은 왜 중요한가요?
            </summary>
            <p className="mt-2 text-sm text-muted">
              같은 30% 수익이라도 6개월 만에 달성한 것과 2년 걸린 것은 투자 효율이
              다릅니다. 연환산 수익률로 비교하면 보유 기간이 다른 투자 간
              객관적인 비교가 가능합니다.
            </p>
          </details>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "경매 수익률 계산기",
            description: "부동산 경매 낙찰가 대비 순수익과 투자 수익률을 계산합니다.",
            applicationCategory: "FinanceApplication",
            operatingSystem: "All",
            offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
          }),
        }}
      />
    </>
  );
}
