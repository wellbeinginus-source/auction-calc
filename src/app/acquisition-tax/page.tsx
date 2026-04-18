"use client";

import { useState, useMemo } from "react";
import CalcInput from "@/components/CalcInput";
import ResultRow from "@/components/ResultRow";
import AdBanner from "@/components/AdBanner";
import KakaoAdFit from "@/components/KakaoAdFit";
import { CoupangBanner } from "@/components/CoupangBanner";

type PropertyType = "house_under6" | "house_6to9" | "house_over9" | "house_multi" | "commercial" | "land";

const PROPERTY_OPTIONS: { value: PropertyType; label: string; desc: string }[] = [
  { value: "house_under6", label: "주택 (6억 이하)", desc: "1주택 기준, 취득세 1%" },
  { value: "house_6to9", label: "주택 (6억~9억)", desc: "1주택 기준, 취득세 1~3%" },
  { value: "house_over9", label: "주택 (9억 초과)", desc: "1주택 기준, 취득세 3%" },
  { value: "house_multi", label: "다주택 (2주택 이상)", desc: "조정지역 여부에 따라 8~12%" },
  { value: "commercial", label: "상가·오피스텔", desc: "취득세 4%" },
  { value: "land", label: "토지", desc: "취득세 4%" },
];

function getRate(type: PropertyType, price: number): { acqRate: number; localEduRate: number; ruralRate: number } {
  const localEduRate = 0.1; // 지방교육세: 취득세의 10%
  let acqRate: number;
  let ruralRate: number;

  switch (type) {
    case "house_under6":
      acqRate = 1;
      ruralRate = 0;
      break;
    case "house_6to9": {
      // 6억~9억 구간: 1% ~ 3% 점진 적용
      const priceInOk = price; // 만원 단위
      const ratio = Math.min(Math.max((priceInOk - 60000) / 30000, 0), 1);
      acqRate = 1 + ratio * 2;
      ruralRate = 0;
      break;
    }
    case "house_over9":
      acqRate = 3;
      ruralRate = 0.2;
      break;
    case "house_multi":
      acqRate = 8;
      ruralRate = 0.6;
      break;
    case "commercial":
    case "land":
      acqRate = 4;
      ruralRate = 0.2;
      break;
    default:
      acqRate = 1;
      ruralRate = 0;
  }

  return { acqRate, localEduRate, ruralRate };
}

function fmt(n: number): string {
  if (!isFinite(n)) return "-";
  return n.toLocaleString("ko-KR");
}

export default function AcquisitionTaxPage() {
  const [bidPrice, setBidPrice] = useState("");
  const [propertyType, setPropertyType] = useState<PropertyType>("house_under6");

  const result = useMemo(() => {
    const price = Number(bidPrice) || 0;
    const { acqRate, localEduRate, ruralRate } = getRate(propertyType, price);

    const acqTax = Math.round(price * (acqRate / 100));
    const localEdu = Math.round(acqTax * localEduRate);
    const rural = Math.round(price * (ruralRate / 100));
    const total = acqTax + localEdu + rural;

    return {
      acqRate: acqRate.toFixed(2),
      acqTax,
      localEdu,
      rural,
      total,
      effectiveRate: price > 0 ? ((total / price) * 100).toFixed(2) : "0.00",
    };
  }, [bidPrice, propertyType]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-2">취득세 계산기</h1>
      <p className="text-muted mb-8">
        낙찰가(매각가)와 물건 유형을 선택하면 취득세, 지방교육세, 농어촌특별세를 계산합니다.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="font-semibold text-lg border-b border-card-border pb-2">
            물건 정보
          </h2>

          <CalcInput
            label="낙찰가 (매각가)"
            value={bidPrice}
            onChange={setBidPrice}
          />

          <div>
            <label className="block text-sm font-medium mb-2">물건 유형</label>
            <div className="space-y-2">
              {PROPERTY_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    propertyType === opt.value
                      ? "border-primary bg-primary/5"
                      : "border-card-border bg-card-bg hover:border-muted"
                  }`}
                >
                  <input
                    type="radio"
                    name="propertyType"
                    value={opt.value}
                    checked={propertyType === opt.value}
                    onChange={(e) => setPropertyType(e.target.value as PropertyType)}
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
            <div className="space-y-1">
              <ResultRow
                label={`취득세 (${result.acqRate}%)`}
                value={`${fmt(result.acqTax)} 만원`}
              />
              <ResultRow
                label="지방교육세 (취득세의 10%)"
                value={`${fmt(result.localEdu)} 만원`}
                sub
              />
              <ResultRow
                label="농어촌특별세"
                value={`${fmt(result.rural)} 만원`}
                sub
              />
              <ResultRow
                label="총 세금"
                value={`${fmt(result.total)} 만원`}
                highlight
              />
              <ResultRow
                label="실효세율"
                value={`${result.effectiveRate}%`}
              />
            </div>

            <div className="mt-6 p-3 bg-accent rounded-lg text-sm text-muted">
              <p className="font-medium mb-1">참고</p>
              <p>
                경매의 경우 낙찰가(매각가)가 과세표준입니다. 다주택 세율은
                조정대상지역 기준이며, 비조정지역은 다를 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      <AdBanner />
      <KakaoAdFit width={320} height={100} />
      <CoupangBanner />

      <section className="mt-12">
        <h2 className="text-xl font-bold mb-4">취득세 FAQ</h2>
        <div className="space-y-3">
          <details className="border border-card-border rounded-lg p-4 bg-card-bg">
            <summary className="font-medium cursor-pointer">
              경매로 낙찰받으면 취득세 과세표준은?
            </summary>
            <p className="mt-2 text-sm text-muted">
              법원 경매로 취득하는 경우 매각가격(낙찰가)이 과세표준이 됩니다.
              감정가가 아닌 실제 낙찰받은 금액 기준입니다.
            </p>
          </details>
          <details className="border border-card-border rounded-lg p-4 bg-card-bg">
            <summary className="font-medium cursor-pointer">
              취득세는 언제까지 내야 하나요?
            </summary>
            <p className="mt-2 text-sm text-muted">
              잔금 납부일(대금 완납일)로부터 60일 이내에 취득세를 신고·납부해야
              합니다. 기한을 넘기면 가산세가 부과됩니다.
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
            name: "경매 취득세 계산기",
            description: "부동산 경매 낙찰가 기준 취득세·지방교육세·농어촌특별세를 계산합니다.",
            applicationCategory: "FinanceApplication",
            operatingSystem: "All",
            offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
          }),
        }}
      />
    </>
  );
}
