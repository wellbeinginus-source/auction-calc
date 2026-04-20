"use client";

import { useState, useMemo } from "react";
import CalcInput from "@/components/CalcInput";
import ResultRow from "@/components/ResultRow";
import AdBanner from "@/components/AdBanner";
import KakaoAdFit from "@/components/KakaoAdFit";
import { CoupangBanner, BookRecommendations } from "@/components/CoupangBanner";

function fmt(n: number): string {
  if (!isFinite(n) || n === 0) return "-";
  return n.toLocaleString("ko-KR");
}

export default function OverdueFee() {
  const [monthlyFee, setMonthlyFee] = useState("");
  const [months, setMonths] = useState("");
  const [reserve, setReserve] = useState("");
  const [reserveMonths, setReserveMonths] = useState("");

  const result = useMemo(() => {
    const fee = Number(monthlyFee) || 0;
    const m = Number(months) || 0;
    const res = Number(reserve) || 0;
    const rm = Number(reserveMonths) || 0;

    const overdueFee = fee * m;
    const interest = overdueFee * 0.05 * (m / 12);
    const overdueReserve = res * rm;
    const total = overdueFee + Math.round(interest) + overdueReserve;

    return { overdueFee, interest: Math.round(interest), overdueReserve, total };
  }, [monthlyFee, months, reserve, reserveMonths]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-2">체납관리비 계산기</h1>
      <p className="text-muted mb-8">
        경매 낙찰 전 체납된 관리비와 연체 이자를 미리 계산해보세요.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="font-semibold text-lg border-b border-card-border pb-2">
            체납 정보 입력
          </h2>
          <CalcInput
            label="월 관리비"
            value={monthlyFee}
            onChange={setMonthlyFee}
            helpText="관리비 고지서 기준 월 납부액"
          />
          <CalcInput
            label="체납 개월 수"
            value={months}
            onChange={setMonths}
            unit="개월"
            helpText="관리비가 밀린 기간"
          />
          <CalcInput
            label="월 특별수선충당금"
            value={reserve}
            onChange={setReserve}
            helpText="관리비 항목 중 특별수선충당금 (없으면 0)"
          />
          <CalcInput
            label="특별수선충당금 체납 개월"
            value={reserveMonths}
            onChange={setReserveMonths}
            unit="개월"
            helpText="특별수선충당금 미납 기간 (관리비와 다를 수 있음)"
          />

          <div className="p-3 bg-accent rounded-lg text-sm text-muted">
            <p className="font-medium mb-1">연체이자 계산 기준</p>
            <p>연 5% 단리 적용 (공동주택관리법 기준)</p>
          </div>
        </div>

        <div>
          <div className="bg-card-bg border border-card-border rounded-xl p-6 sticky top-20">
            <h2 className="font-semibold text-lg mb-4">계산 결과</h2>
            <div className="space-y-1">
              <ResultRow label="체납 관리비 원금" value={`${fmt(result.overdueFee)} 만원`} sub />
              <ResultRow label="연체 이자 (연5%)" value={`${fmt(result.interest)} 만원`} sub />
              <ResultRow label="체납 특별수선충당금" value={`${fmt(result.overdueReserve)} 만원`} sub />
              <ResultRow label="총 체납관리비" value={`${fmt(result.total)} 만원`} highlight />
            </div>

            <div className="mt-6 p-3 bg-accent rounded-lg text-sm text-muted">
              <p className="font-medium mb-1">알아두세요</p>
              <p>일반 관리비는 낙찰자가 승계 의무 없음. 단, 특별수선충당금은 낙찰자가 승계해야 합니다.</p>
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
      <KakaoAdFit width={320} height={100} />
      <CoupangBanner variant="overdue-fee" />
      <BookRecommendations variant="overdue-fee" />

      <section className="mt-12">
        <h2 className="text-xl font-bold mb-4">체납관리비 FAQ</h2>
        <div className="space-y-3">
          {[
            {
              q: "체납관리비, 낙찰자가 다 내야 하나요?",
              a: "일반 관리비(청소비·경비비 등)는 낙찰자가 승계 의무가 없습니다. 하지만 특별수선충당금은 공동주택관리법상 낙찰자가 승계해야 합니다. 경매 입찰 전 반드시 확인하세요.",
            },
            {
              q: "체납관리비는 어떻게 확인하나요?",
              a: "입찰 전 해당 아파트·단지 관리사무소에 직접 문의하거나, 법원 경매 기록의 '현황조사서'를 확인하면 체납 여부를 알 수 있습니다.",
            },
            {
              q: "연체이자도 낙찰자가 부담해야 하나요?",
              a: "승계 대상인 특별수선충당금의 연체이자는 관리규약에 따라 다를 수 있습니다. 일반적으로 원금만 승계하는 경우가 많으나, 관리규약을 반드시 확인하세요.",
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
            name: "체납관리비 계산기",
            description: "부동산 경매 물건의 체납관리비와 연체이자를 계산합니다.",
            applicationCategory: "FinanceApplication",
            operatingSystem: "All",
            offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
          }),
        }}
      />
    </>
  );
}
