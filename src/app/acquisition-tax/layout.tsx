import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "취득세 계산기 | 경매 낙찰가 기준 취득세·지방교육세·농어촌특별세",
  description:
    "부동산 경매 낙찰가를 입력하면 취득세, 지방교육세, 농어촌특별세를 자동 계산합니다. 주택·상가·토지·다주택 세율 지원.",
  keywords: [
    "취득세 계산기",
    "경매 취득세",
    "부동산 취득세",
    "지방교육세",
    "농어촌특별세",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
