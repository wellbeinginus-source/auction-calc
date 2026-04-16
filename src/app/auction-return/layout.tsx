import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "경매 수익률 계산기 | 낙찰가 대비 순수익·투자수익률 계산",
  description:
    "부동산 경매 낙찰가, 취득세, 법원비용, 수리비, 명도비, 중개수수료를 입력하면 순수익과 수익률을 자동 계산합니다. 연환산 수익률까지 한번에.",
  keywords: [
    "경매 수익률 계산기",
    "경매 수익률",
    "낙찰가 수익률",
    "부동산 경매 계산",
    "경매 제비용",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
