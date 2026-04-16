import Link from "next/link";

const COUPANG_LINKS = {
  goldbox: "https://link.coupang.com/a/ep0BMn",
};

const BOOKS = [
  {
    title: "나는 경매로 꼬마빌딩 샀다",
    desc: "경매 초보도 따라할 수 있는 실전 투자 가이드",
    link: COUPANG_LINKS.goldbox,
  },
  {
    title: "부동산 경매 바이블",
    desc: "권리분석부터 명도까지, 경매의 모든 것",
    link: COUPANG_LINKS.goldbox,
  },
  {
    title: "경매 수익률의 비밀",
    desc: "수익률 높은 물건 고르는 실전 노하우",
    link: COUPANG_LINKS.goldbox,
  },
];

export function CoupangBanner() {
  return (
    <div className="my-8 p-4 bg-card-bg border border-card-border rounded-xl text-center">
      <a
        href={COUPANG_LINKS.goldbox}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-6 py-3 bg-[#e52528] text-white font-bold rounded-lg hover:bg-[#c91f22] transition-colors"
      >
        쿠팡 오늘의 특가 보러가기
      </a>
      <p className="mt-2 text-xs text-muted">
        이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를
        제공받습니다.
      </p>
    </div>
  );
}

export function BookRecommendations() {
  return (
    <section className="my-10">
      <h2 className="text-xl font-bold mb-4">경매 투자 추천 도서</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {BOOKS.map((book) => (
          <a
            key={book.title}
            href={book.link}
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
      <p className="mt-3 text-xs text-muted">
        이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를
        제공받습니다.
      </p>
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
      <div className="flex flex-wrap gap-2">
        <a
          href={COUPANG_LINKS.goldbox}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors"
        >
          금융 상품 비교하기
        </a>
      </div>
      <p className="mt-2 text-xs text-muted">
        이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를
        제공받습니다.
      </p>
    </div>
  );
}
