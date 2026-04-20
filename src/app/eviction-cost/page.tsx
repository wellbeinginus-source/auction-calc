"use client";

import type { Metadata } from "next";
import { useState, useMemo } from "react";
import CalcInput from "@/components/CalcInput";
import ResultRow from "@/components/ResultRow";
import AdBanner from "@/components/AdBanner";
import KakaoAdFit from "@/components/KakaoAdFit";
import { CoupangBanner, BookRecommendations } from "@/components/CoupangBanner";
import LeadCTA from "@/components/LeadCTA";

function fmt(n: number): string {
  if (!isFinite(n) || n === 0) return "-";
  return n.toLocaleString("ko-KR");
}

export default function EvictionCostPage() {
  const [movingFee, setMovingFee] = useState("");
  const [settlementFee, setSettlementFee] = useState("");
  const [storageFee, setStorageFee] = useState("");
  const [legalFee, setLegalFee] = useState("");
  const [courtFee, setCourtFee] = useState("");
  const [etcFee, setEtcFee] = useState("");
  const [bidPrice, setBidPrice] = useState("");

  const result = useMemo(() => {
    const moving = Number(movingFee) || 0;
    const settlement = Number(settlementFee) || 0;
    const storage = Number(storageFee) || 0;
    const legal = Number(legalFee) || 0;
    const court = Number(courtFee) || 0;
    const etc = Number(etcFee) || 0;
    const bid = Number(bidPrice) || 0;

    const total = moving + settlement + storage + legal + court + etc;
    const ratio = bid > 0 ? (total / bid) * 100 : 0;

    return { total, ratio };
  }, [movingFee, settlementFee, storageFee, legalFee, courtFee, etcFee, bidPrice]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-2">명도비용 계산기</h1>
      <p className="text-muted mb-8">
        경매 낙찰 후 점유자 명도에 드는 비용을 미리 계산해보세요.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="font-semibold text-lg border-b border-card-border pb-2">
            명도 비용 입력
          </h2>
          <CalcInput
            label="이사비 지원"
            value={movingFee}
            onChange={setMovingFee}
            helpText="점유자 자진 이사 유도 시 지급하는 이사비"
          />
          <CalcInput
            label="합의금"
            value={settlementFee}
            onChange={setSettlementFee}
            helpText="원만한 합의를 위한 위로금·합의금"
          />
          <CalcInput
            label="짐 보관비"
            value={storageFee}
            onChange={setStorageFee}
            helpText="점유자 잔여 짐 보관·처리 비용"
          />
          <CalcInput
            label="법무사 비용"
            value={legalFee}
            onChange={setLegalFee}
            helpText="명도소송·인도명령 신청 법무사 보수"
          />
          <CalcInput
            label="법원 집행 비용"
            value={courtFee}
            onChange={setCourtFee}
            helpText="강제집행 신청 시 집행관 비용 등"
          />
          <CalcInput
            label="기타 비용"
            value={etcFee}
            onChange={setEtcFee}
            helpText="예상치 못한 추가 비용"
          />

          <div className="border-t border-card-border pt-4">
            <CalcInput
              label="낙찰가"
              value={bidPrice}
              onChange={setBidPrice}
              helpText="낙찰가 대비 명도비용 비율 계산용"
            />
          </div>
        </div>

        <div>
          <div className="bg-card-bg border border-card-border rounded-xl p-6 sticky top-20">
            <h2 className="font-semibold text-lg mb-4">계산 결과</h2>
            <div className="space-y-1">
              <ResultRow label="이사비 지원" value={`${fmt(Number(movingFee))} 만원`} sub />
              <ResultRow label="합의금" value={`${fmt(Number(settlementFee))} 만원`} sub />
              <ResultRow label="짐 보관비" value={`${fmt(Number(storageFee))} 만원`} sub />
              <ResultRow label="법무사 비용" value={`${fmt(Number(legalFee))} 만원`} sub />
              <ResultRow label="법원 집행 비용" value={`${fmt(Number(courtFee))} 만원`} sub />
              <ResultRow label="기타" value={`${fmt(Number(etcFee))} 만원`} sub />
              <ResultRow label="총 명도비용" value={`${fmt(result.total)} 만원`} highlight />
              {result.ratio > 0 && (
                <ResultRow label="낙찰가 대비" value={`${result.ratio.toFixed(1)}%`} />
              )}
            </div>

            <div className="mt-6 p-3 bg-accent rounded-lg text-sm text-muted">
              <p className="font-medium mb-1">실전 팁</p>
              <p>명도비는 낙찰가의 1~3% 수준으로 예산을 잡는 것이 일반적입니다. 점유자와 원만한 협의가 강제집행보다 비용·시간 모두 절약됩니다.</p>
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

      <LeadCTA />

      <AdBanner />
      <KakaoAdFit width={320} height={100} />
      <CoupangBanner variant="eviction-cost" />
      <BookRecommendations variant="eviction-cost" />

      <section className="mt-12">
        <h2 className="text-xl font-bold mb-4">명도비용 FAQ</h2>
        <div className="space-y-3">
          {[
            {
              q: "명도와 인도명령의 차이는 무엇인가요?",
              a: "인도명령은 낙찰 후 6개월 이내에 법원에 신청할 수 있는 간이 절차로, 명도소송보다 빠르고 저렴합니다. 점유자가 전 소유자나 대항력 없는 임차인인 경우에 활용됩니다.",
            },
            {
              q: "명도 합의금은 얼마가 적당한가요?",
              a: "물건의 위치·점유자 상황에 따라 다르지만, 일반적으로 이사비 50~200만원 선에서 협의하는 경우가 많습니다. 강제집행 비용(300만원+)과 시간을 고려하면 협의가 유리할 때가 많습니다.",
            },
            {
              q: "명도를 거부하면 어떻게 되나요?",
              a: "법원에 강제집행을 신청할 수 있습니다. 집행관이 현장에서 점유자의 짐을 이전하는 절차로 진행됩니다. 다만 비용(집행관 수수료·이삿짐센터 등)이 추가로 발생합니다.",
            },
          ].map((faq, i) => (
            <details key={i} className="border border-card-border rounded-lg p-4 bg-card-bg">
              <summary className="font-medium cursor-pointer">{faq.q}</summary>
              <p className="mt-2 text-sm text-muted">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "명도비용 계산기",
            description: "부동산 경매 낙찰 후 점유자 명도에 드는 이사비·합의금·법원 집행비용을 계산합니다.",
            applicationCategory: "FinanceApplication",
            operatingSystem: "All",
            offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
          }),
        }}
      />
    </>
  );
}
