export default function LeadCTA() {
  return (
    <div className="mt-8 p-5 rounded-xl border border-primary/30 bg-primary/5">
      <p className="font-semibold text-base mb-1">경매 잔금 대출, 한도 먼저 확인하세요</p>
      <p className="text-sm text-muted mb-4">신용점수 조회 없이 무료로 대출 한도를 확인할 수 있어요.</p>
      <a
        href="https://newtip.net/click.php?m=allcredit&a=A100704118&l=9999&l_cd1=3&l_cd2=0&tu=https%3A%2F%2Fwww.allcredit.co.kr%2Fp%2Fhtml%2Finstall.html%3FreturnUrl%3D"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center py-2.5 px-4 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-hover transition-colors"
      >
        대출 한도 무료 조회하기 →
      </a>
      <p className="mt-2 text-xs text-muted">이 포스팅은 제휴마케팅 활동의 일환으로 수수료를 제공받습니다.</p>
    </div>
  );
}
