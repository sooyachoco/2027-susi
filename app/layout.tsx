import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "정시합격 — 2027 정시 전략 플래너",
  description: "수능 성적을 바탕으로 2027 정시 가·나·다군 지원전략을 설계하는 입시 플래너.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ko"><body>{children}</body></html>;
}
