"use client";

import { useState, useMemo } from "react";
import CalcInput from "@/components/CalcInput";
import ResultRow from "@/components/ResultRow";
import AdBanner from "@/components/AdBanner";
import KakaoAdFit from "@/components/KakaoAdFit";
import { CoupangBanner } from "@/components/CoupangBanner";

function fmt(n: number): string {
  if (!isFinite(n)) return "-";
  return n.toLocaleString("ko-KR");
}

type RentalType = "monthly" | "jeonse";

export default function RentalYieldPage() {
  const [bidPrice, setBidPrice] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [rentalType, setRentalType] = useState<RentalType>("monthly");
  const [deposit, setDeposit] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [vacancyRate, setVacancyRate] = useState("5");
  const [maintenanceCost, setMaintenanceCost] = useState("");

  const result = useMemo(() => {
    const bid = Number(bidPrice) || 0;
    const cost = Number(totalCost) || 0;
    const dep = Number(deposit) || 0;
    const rent = Number(monthlyRent) || 0;
    const vacancy = Number(vacancyRate) || 0;
    const maintenance = Number(maintenanceCost) || 0;
    const totalInvest = bid + cost;

    if (rentalType === "jeonse") {
      // 전세: 갭투자 수익률 개념 - 실투자금 대비
      const gap = totalInvest - dep;
      const leverageRatio = gap > 0 ? (dep / gap * 100) : 0;
      return {
        type: "jeonse" as const,
        totalInvest,
        deposit: dep,
        gap,
        leverageRatio,
      };
    }

    // 월세
    const annualRent = rent * 12;
    const effectiveRent = annualRent * (1 - vacancy / 100);
    const annualMaintenance = maintenance * 12;
    const netIncome = effectiveRent - annualMaintenance;
    const actualInvest = totalInvest - dep; // 실투자금 (보증금 차감)

    const grossYield = totalInvest > 0 ? (annualRent / totalInvest) * 100 : 0;
    const netYield = actualInvest > 0 ? (netIncome / actualInvest) * 100 : 0;

    return {
      type: "monthly" as const,
      totalInvest,
      actualInvest,
      annualRent,
      effectiveRent: Math.round(effectiveRent),
      annualMaintenance,
      netIncome: Math.round(netIncome),
      grossYield,
      netYield,
    };
  }, [bidPrice, totalCost, rentalType, deposit, monthlyRent, vacancyRate, maintenanceCost]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-2">임대수익률 계산기</h1>
      <p className="text-muted mb-8">
        낙찰가 대비 월세·전세 수익률을 계산합니다.
        공실률과 유지비를 반영한 순수익률까지 확인하세요.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="font-semibold text-lg border-b border-card-border pb-2">
            투자 정보
          </h2>
          <CalcInput
            label="낙찰가"
            value={bidPrice}
            onChange={setBidPrice}
          />
          <CalcInput
            label="총 제비용"
            value={totalCost}
            onChange={setTotalCost}
            helpText="취득세, 법원비용, 수리비 등 합계"
          />

          <div>
            <label className="block text-sm font-medium mb-2">임대 유형</label>
            <div className="flex gap-2">
              {[
                { value: "monthly", label: "월세" },
                { value: "jeonse", label: "전세 (갭투자)" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setRentalType(opt.value as RentalType)}
                  className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                    rentalType === opt.value
                      ? "border-primary bg-primary text-white"
                      : "border-card-border bg-card-bg hover:border-muted"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <CalcInput
            label="보증금"
            value={deposit}
            onChange={setDeposit}
          />

          {rentalType === "monthly" && (
            <>
              <CalcInput
                label="월세"
                value={monthlyRent}
                onChange={setMonthlyRent}
              />
              <CalcInput
                label="공실률"
                value={vacancyRate}
                onChange={setVacancyRate}
                unit="%"
                helpText="연간 공실 예상 비율 (보통 5~10%)"
              />
              <CalcInput
                label="월 유지비"
                value={maintenanceCost}
                onChange={setMaintenanceCost}
                helpText="관리비, 수선충당금 등 월 평균"
              />
            </>
          )}
        </div>

        <div>
          <div className="bg-card-bg border border-card-border rounded-xl p-6 sticky top-20">
            <h2 className="font-semibold text-lg mb-4">계산 결과</h2>

            {result.type === "monthly" ? (
              <div className="space-y-1">
                <ResultRow label="총 투자금" value={`${fmt(result.totalInvest)} 만원`} />
                <ResultRow label="실투자금 (보증금 차감)" value={`${fmt(result.actualInvest)} 만원`} sub />
                <ResultRow label="연간 임대료" value={`${fmt(result.annualRent)} 만원`} />
                <ResultRow label="공실 반영 임대료" value={`${fmt(result.effectiveRent)} 만원`} sub />
                <ResultRow label="연간 유지비" value={`-${fmt(result.annualMaintenance)} 만원`} sub />
                <ResultRow label="연간 순수익" value={`${fmt(result.netIncome)} 만원`} highlight />
                <ResultRow label="표면 수익률 (총투자금 기준)" value={`${result.grossYield.toFixed(2)}%`} />
                <ResultRow label="순수익률 (실투자금 기준)" value={`${result.netYield.toFixed(2)}%`} highlight />
              </div>
            ) : (
              <div className="space-y-1">
                <ResultRow label="총 투자금" value={`${fmt(result.totalInvest)} 만원`} />
                <ResultRow label="전세 보증금" value={`${fmt(result.deposit)} 만원`} />
                <ResultRow label="갭 (실투자금)" value={`${fmt(result.gap)} 만원`} highlight />
                <ResultRow label="레버리지 비율" value={`${result.leverageRatio.toFixed(1)}%`} />

                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm">
                  <p className="font-medium text-amber-800 mb-1">갭투자 유의사항</p>
                  <p className="text-amber-700">
                    전세가 하락 시 역전세 리스크가 있습니다. 전세가율이
                    너무 높은 물건은 주의가 필요합니다.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6 p-3 bg-accent rounded-lg text-sm text-muted">
              <p className="font-medium mb-1">수익률 기준</p>
              <p>
                표면 수익률 = 연 임대료 ÷ 총 투자금 × 100
                <br />
                순수익률 = (임대료 - 공실 - 유지비) ÷ 실투자금 × 100
              </p>
            </div>
          </div>
        </div>
      </div>

      <LeadCTA />

      <AdBanner />
      <KakaoAdFit width={320} height={100} />
      <CoupangBanner />

      <section className="mt-12">
        <h2 className="text-xl font-bold mb-4">임대수익률 FAQ</h2>
        <div className="space-y-3">
          <details className="border border-card-border rounded-lg p-4 bg-card-bg">
            <summary className="font-medium cursor-pointer">
              표면 수익률과 순수익률의 차이는?
            </summary>
            <p className="mt-2 text-sm text-muted">
              표면 수익률은 단순히 연 임대료를 총 투자금으로 나눈 값이고,
              순수익률은 공실률·유지비·세금 등 비용을 차감한 실제 수익률입니다.
              투자 판단에는 순수익률이 더 정확합니다.
            </p>
          </details>
          <details className="border border-card-border rounded-lg p-4 bg-card-bg">
            <summary className="font-medium cursor-pointer">
              경매 물건의 적정 임대수익률은?
            </summary>
            <p className="mt-2 text-sm text-muted">
              일반적으로 순수익률 기준 연 5% 이상이면 양호, 8% 이상이면 우수한
              투자로 평가됩니다. 경매는 시세보다 저렴하게 취득하므로 일반 매매보다
              높은 수익률을 기대할 수 있습니다.
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
            name: "임대수익률 계산기",
            description: "경매 낙찰가 대비 월세·전세 임대수익률을 공실률과 유지비를 반영해 계산합니다.",
            applicationCategory: "FinanceApplication",
            operatingSystem: "All",
            offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
          }),
        }}
      />
    </>
  );
}
