import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "임대수익률 계산기 | 월세·전세 수익률, 갭투자 분석",
  description:
    "경매 낙찰가 대비 월세·전세 임대수익률을 계산합니다. 공실률과 유지비를 반영한 순수익률, 갭투자 분석까지.",
  keywords: [
    "임대수익률 계산기",
    "월세 수익률",
    "전세 수익률",
    "갭투자 계산",
    "경매 임대",
    "부동산 수익률",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
