import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "명도비용 계산기 | 경매 명도 이사비·인도명령 비용 계산",
  description:
    "경매 낙찰 후 명도 비용을 계산하세요. 점유자 유형(임차인·소유자·무단점유)별 이사비 협의 기준, 인도명령 신청비용, 강제집행 비용을 한눈에 확인.",
  keywords: [
    "명도비용 계산기",
    "경매 명도",
    "이사비 협의",
    "인도명령",
    "강제집행 비용",
    "경매 명도 절차",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
