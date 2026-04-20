"use client";

const LINK = "https://link.coupang.com/a/ep0BMn";

const DISCLAIMER = (
  <p className="mt-2 text-xs text-muted">
    이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
  </p>
);

const VARIANTS = {
  "auction-return": {
    banner: "경매 수익률 높이는 필독서 보기 →",
    ctaHeadline: "수익률 분석 끝났다면, 다음 단계는?",
    ctaDesc: "낙찰 후 수익을 극대화하는 실전 투자 전략서",
    books: [
      { title: "나는 경매로 꼬마빌딩 샀다", desc: "수익률 좋은 물건 고르는 실전 가이드" },
      { title: "경매 수익률의 비밀", desc: "연 20% 수익 내는 고수들의 공식" },
      { title: "부동산 경매 바이블", desc: "권리분석부터 수익 실현까지 완전 정복" },
    ],
  },
  "acquisition-tax": {
    banner: "취득세 아끼는 절세 전략 보기 →",
    ctaHeadline: "취득세 계산했다면, 절세 방법도 확인하세요",
    ctaDesc: "합법적으로 취득세를 줄이는 실전 방법",
    books: [
      { title: "부동산 절세 완전정복", desc: "취득·보유·양도 단계별 절세 전략" },
      { title: "부동산 세금 바이블", desc: "2026년 최신 세율·공제 기준 반영" },
      { title: "나는 부동산 세금이 두렵지 않다", desc: "1주택부터 다주택까지 세금 완전 정복" },
    ],
  },
  "loan-interest": {
    banner: "경매 대출 금리 최저로 받는 법 →",
    ctaHeadline: "이자 부담, 이렇게 줄일 수 있습니다",
    ctaDesc: "경매 잔금 대출, 가장 낮은 금리를 받는 실전 전략",
    books: [
      { title: "부동산 대출 전략의 기술", desc: "경매·일반 주택 대출 금리 낮추는 법" },
      { title: "레버리지 투자 완전정복", desc: "적은 돈으로 수익률 극대화하는 전략" },
      { title: "금리 상승기 부동산 투자", desc: "이자 부담 최소화 실전 가이드" },
    ],
  },
  "rental-yield": {
    banner: "임대 수익률 극대화 전략 보기 →",
    ctaHeadline: "임대 수익률 계산 다음 단계는?",
    ctaDesc: "공실 없이 월세 수익을 극대화하는 실전 노하우",
    books: [
      { title: "월세 받는 부동산 투자법", desc: "공실 없이 안정적 임대 수익 만들기" },
      { title: "소액 임대 투자의 기술", desc: "적은 자본으로 월세 받는 법" },
      { title: "부동산 경매로 임대 수익 내기", desc: "경매로 매입해 임대 수익 올리는 전략" },
    ],
  },
  "eviction-cost": {
    banner: "명도 비용 줄이는 실전 가이드 →",
    ctaHeadline: "명도 비용, 미리 알면 절반으로 줄일 수 있습니다",
    ctaDesc: "협의 명도부터 강제집행까지 단계별 전략",
    books: [
      { title: "경매 명도 완전정복", desc: "점유자 유형별 명도 전략 총정리" },
      { title: "부동산 경매 바이블", desc: "명도 분쟁 없이 낙찰 수익 내는 법" },
      { title: "나는 경매로 꼬마빌딩 샀다", desc: "명도 협상 실전 성공 사례 수록" },
    ],
  },
  "overdue-fee": {
    banner: "경매 리스크 완벽 관리 가이드 →",
    ctaHeadline: "연체료까지 계산했다면 리스크도 점검하세요",
    ctaDesc: "경매 투자 전 반드시 알아야 할 리스크 관리법",
    books: [
      { title: "부동산 경매 바이블", desc: "권리분석부터 명도까지 경매의 모든 것" },
      { title: "나는 경매로 꼬마빌딩 샀다", desc: "초보도 따라할 수 있는 실전 투자 가이드" },
      { title: "경매 수익률의 비밀", desc: "수익률 높은 물건 고르는 실전 노하우" },
    ],
  },
} as const;

type Variant = keyof typeof VARIANTS;

export function CoupangBanner({ variant = "auction-return" }: { variant?: Variant }) {
  const cfg = VARIANTS[variant];
  return (
    <div className="my-8 p-4 bg-card-bg border border-card-border rounded-xl text-center">
      <a
        href={LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-6 py-3 bg-[#e52528] text-white font-bold rounded-lg hover:bg-[#c91f22] transition-colors"
      >
        {cfg.banner}
      </a>
      {DISCLAIMER}
    </div>
  );
}

export function BookRecommendations({ variant = "auction-return" }: { variant?: Variant }) {
  const cfg = VARIANTS[variant];
  return (
    <section className="my-10">
      <h2 className="text-xl font-bold mb-1">{cfg.ctaHeadline}</h2>
      <p className="text-sm text-muted mb-4">{cfg.ctaDesc}</p>
      <div className="grid sm:grid-cols-3 gap-4">
        {cfg.books.map((book) => (
          <a
            key={book.title}
            href={LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 border border-card-border rounded-xl bg-card-bg hover:border-primary hover:shadow-md transition-all"
          >
            <div className="text-2xl mb-2">📘</div>
            <h3 className="font-semibold text-sm mb-1">{book.title}</h3>
            <p className="text-xs text-muted">{book.desc}</p>
            <span className="inline-block mt-2 text-xs text-[#e52528] font-medium">
              쿠팡에서 보기 →
            </span>
          </a>
        ))}
      </div>
      {DISCLAIMER}
    </section>
  );
}

export function LoanCompareCTA() {
  return (
    <div className="my-8 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
      <h3 className="font-bold text-lg mb-1">대출 금리 비교하고 계세요?</h3>
      <p className="text-sm text-muted mb-3">
        경매 잔금 대출, 가장 낮은 금리를 한번에 비교해 보세요.
      </p>
      <a
        href={LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors"
      >
        금리 낮추는 대출 전략 서적 보기
      </a>
      {DISCLAIMER}
    </div>
  );
}
