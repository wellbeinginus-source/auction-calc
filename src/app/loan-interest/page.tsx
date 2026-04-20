"use client";

import { useState, useMemo } from "react";
import CalcInput from "@/components/CalcInput";
import ResultRow from "@/components/ResultRow";
import AdBanner from "@/components/AdBanner";
import KakaoAdFit from "@/components/KakaoAdFit";
import { CoupangBanner, LoanCompareCTA } from "@/components/CoupangBanner";
import LeadCTA from "@/components/LeadCTA";

type RepayType = "equal_payment" | "equal_principal" | "bullet";

function fmt(n: number): string {
  if (!isFinite(n)) return "-";
  return n.toLocaleString("ko-KR");
}

function calcEqualPayment(principal: number, monthlyRate: number, months: number) {
  if (monthlyRate === 0) return { monthly: principal / months, totalInterest: 0 };
  const monthly =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);
  const totalInterest = monthly * months - principal;
  return { monthly: Math.round(monthly), totalInterest: Math.round(totalInterest) };
}

function calcEqualPrincipal(principal: number, monthlyRate: number, months: number) {
  const monthlyPrincipal = principal / months;
  let totalInterest = 0;
  const firstMonthInterest = principal * monthlyRate;
  for (let i = 0; i < months; i++) {
    totalInterest += (principal - monthlyPrincipal * i) * monthlyRate;
  }
  const firstMonthly = monthlyPrincipal + firstMonthInterest;
  return {
    firstMonthly: Math.round(firstMonthly),
    lastMonthly: Math.round(monthlyPrincipal + (principal - monthlyPrincipal * (months - 1)) * monthlyRate),
    totalInterest: Math.round(totalInterest),
  };
}

function calcBullet(principal: number, monthlyRate: number, months: number) {
  const monthlyInterest = Math.round(principal * monthlyRate);
  const totalInterest = monthlyInterest * months;
  return { monthlyInterest, totalInterest };
}

export default function LoanInterestPage() {
  const [loanAmount, setLoanAmount] = useState("");
  const [annualRate, setAnnualRate] = useState("");
  const [loanYears, setLoanYears] = useState("");
  const [repayType, setRepayType] = useState<RepayType>("equal_payment");

  const result = useMemo(() => {
    const principal = Number(loanAmount) || 0;
    const rate = Number(annualRate) || 0;
    const years = Number(loanYears) || 0;
    const months = years * 12;
    const monthlyRate = rate / 100 / 12;

    if (principal <= 0 || months <= 0) {
      return null;
    }

    const totalRepay = { totalInterest: 0 };

    if (repayType === "equal_payment") {
      const r = calcEqualPayment(principal, monthlyRate, months);
      return {
        type: "equal_payment" as const,
        monthly: r.monthly,
        totalInterest: r.totalInterest,
        totalRepay: principal + r.totalInterest,
        principal,
        months,
      };
    } else if (repayType === "equal_principal") {
      const r = calcEqualPrincipal(principal, monthlyRate, months);
      return {
        type: "equal_principal" as const,
        firstMonthly: r.firstMonthly,
        lastMonthly: r.lastMonthly,
        totalInterest: r.totalInterest,
        totalRepay: principal + r.totalInterest,
        principal,
        months,
      };
    } else {
      const r = calcBullet(principal, monthlyRate, months);
      return {
        type: "bullet" as const,
        monthlyInterest: r.monthlyInterest,
        totalInterest: r.totalInterest,
        totalRepay: principal + r.totalInterest,
        principal,
        months,
      };
    }
  }, [loanAmount, annualRate, loanYears, repayType]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-2">대출이자 계산기</h1>
      <p className="text-muted mb-8">
        대출금, 금리, 기간을 입력하면 상환 방식별 월 납입금과 총 이자를 계산합니다.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="font-semibold text-lg border-b border-card-border pb-2">
            대출 정보
          </h2>
          <CalcInput
            label="대출금"
            value={loanAmount}
            onChange={setLoanAmount}
            helpText="경매 잔금 대출 등"
          />
          <CalcInput
            label="연 이자율"
            value={annualRate}
            onChange={setAnnualRate}
            unit="%"
            placeholder="4.5"
          />
          <CalcInput
            label="대출 기간"
            value={loanYears}
            onChange={setLoanYears}
            unit="년"
            placeholder="30"
          />

          <div>
            <label className="block text-sm font-medium mb-2">상환 방식</label>
            <div className="space-y-2">
              {[
                { value: "equal_payment", label: "원리금균등 상환", desc: "매월 같은 금액 납입 (원금+이자)" },
                { value: "equal_principal", label: "원금균등 상환", desc: "원금은 동일, 이자는 점점 감소" },
                { value: "bullet", label: "만기일시 상환", desc: "매월 이자만 납입, 만기에 원금 일시 상환" },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    repayType === opt.value
                      ? "border-primary bg-primary/5"
                      : "border-card-border bg-card-bg hover:border-muted"
                  }`}
                >
                  <input
                    type="radio"
                    name="repayType"
                    value={opt.value}
                    checked={repayType === opt.value}
                    onChange={(e) => setRepayType(e.target.value as RepayType)}
                    className="mt-0.5"
                  />
                  <div>
                    <p className="font-medium text-sm">{opt.label}</p>
                    <p className="text-xs text-muted">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-card-bg border border-card-border rounded-xl p-6 sticky top-20">
            <h2 className="font-semibold text-lg mb-4">계산 결과</h2>
            {result ? (
              <div className="space-y-1">
                <ResultRow label="대출 원금" value={`${fmt(result.principal)} 만원`} />
                <ResultRow label="대출 기간" value={`${result.months}개월 (${result.months / 12}년)`} />

                {result.type === "equal_payment" && (
                  <ResultRow label="월 납입금" value={`${fmt(result.monthly)} 만원`} highlight />
                )}
                {result.type === "equal_principal" && (
                  <>
                    <ResultRow label="첫 달 납입금" value={`${fmt(result.firstMonthly)} 만원`} highlight />
                    <ResultRow label="마지막 달 납입금" value={`${fmt(result.lastMonthly)} 만원`} />
                  </>
                )}
                {result.type === "bullet" && (
                  <ResultRow label="월 이자" value={`${fmt(result.monthlyInterest)} 만원`} highlight />
                )}

                <ResultRow label="총 이자" value={`${fmt(result.totalInterest)} 만원`} />
                <ResultRow label="총 상환금" value={`${fmt(result.totalRepay)} 만원`} highlight />
              </div>
            ) : (
              <p className="text-muted text-sm">대출 정보를 입력하면 결과가 표시됩니다.</p>
            )}

            <div className="mt-6 p-3 bg-accent rounded-lg text-sm text-muted">
              <p className="font-medium mb-1">상환 방식 비교 TIP</p>
              <p>
                총 이자 부담: 원금균등 &lt; 원리금균등 &lt; 만기일시.
                단기 투자(경매 후 매도)라면 만기일시가 월 부담이 적고,
                장기 보유라면 원금균등이 총 이자를 줄여줍니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      <LeadCTA />
      <KakaoAdFit />
      <AdBanner />
      <KakaoAdFit width={320} height={100} />
      <LoanCompareCTA />
      <CoupangBanner variant="loan-interest" />

      <section className="mt-12">
        <h2 className="text-xl font-bold mb-4">대출이자 FAQ</h2>
        <div className="space-y-3">
          <details className="border border-card-border rounded-lg p-4 bg-card-bg">
            <summary className="font-medium cursor-pointer">
              경매 대출은 언제 실행되나요?
            </summary>
            <p className="mt-2 text-sm text-muted">
              낙찰 후 잔금 납부일에 대출이 실행됩니다. 보통 낙찰일로부터 30일 이내에
              잔금을 납부하며, 이때 대출금이 법원으로 직접 송금됩니다.
            </p>
          </details>
          <details className="border border-card-border rounded-lg p-4 bg-card-bg">
            <summary className="font-medium cursor-pointer">
              경매 물건도 주담대(주택담보대출)가 가능한가요?
            </summary>
            <p className="mt-2 text-sm text-muted">
              가능합니다. 다만 LTV(담보인정비율)는 감정가 기준이 아닌 낙찰가 기준으로
              적용되는 경우가 많고, 금융기관마다 조건이 다르므로 사전 상담이 필요합니다.
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
            name: "경매 대출이자 계산기",
            description: "원리금균등, 원금균등, 만기일시 상환 방식별 월 납입금과 총 이자를 계산합니다.",
            applicationCategory: "FinanceApplication",
            operatingSystem: "All",
            offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
          }),
        }}
      />
    </>
  );
}
