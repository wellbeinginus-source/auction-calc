import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "대출이자 계산기 | 원리금균등·원금균등·만기일시 상환 비교",
  description:
    "대출금과 금리, 기간을 입력하면 원리금균등, 원금균등, 만기일시 상환 방식별 월 납입금과 총 이자를 계산합니다.",
  keywords: [
    "대출이자 계산기",
    "원리금균등 상환",
    "원금균등 상환",
    "만기일시 상환",
    "경매 대출",
    "주택담보대출 계산기",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
