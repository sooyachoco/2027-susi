import type { RegularAdmission, RegularRecommendation, RegularStudentProfile } from "./types";
import { recommendRegular } from "./recommend";

export type RegularPortfolioStyle = "균형형" | "안정형" | "도전형";

export type RegularPortfolioRecommendation = {
  style: RegularPortfolioStyle;
  score: number;
  recommendations: RegularRecommendation[];
  summary: string;
};

function styleScore(recs: RegularRecommendation[], style: RegularPortfolioStyle): number {
  const counts = {
    상향: recs.filter((r) => r.tier === "상향").length,
    소신: recs.filter((r) => r.tier === "소신").length,
    적정: recs.filter((r) => r.tier === "적정").length,
    안정: recs.filter((r) => r.tier === "안정").length,
    보류: recs.filter((r) => r.tier === "판정 보류").length,
  };
  if (counts.보류 > 0) return -100;

  if (style === "안정형") return counts.안정 * 18 + counts.적정 * 10 - counts.상향 * 12;
  if (style === "도전형") return counts.상향 * 18 + counts.소신 * 10 - counts.안정 * 5;
  return counts.적정 * 18 + counts.소신 * 8 + counts.안정 * 5 - counts.상향 * 8;
}

export function recommendRegularPortfolio(
  profile: RegularStudentProfile,
  admissions: RegularAdmission[],
): RegularPortfolioRecommendation[] {
  const base = recommendRegular(profile, admissions);
  if (base.length < 3) return base.length ? [{ style: "균형형", score: 0, recommendations: base, summary: "가·나·다군 후보가 모두 확보되지 않아 현재 확보된 후보만 표시합니다." }] : [];

  const styles: RegularPortfolioStyle[] = ["균형형", "안정형", "도전형"];
  return styles.map((style) => {
    const ranked = [...base].sort((a, b) => styleScore([b], style) - styleScore([a], style));
    const score = Math.max(0, Math.min(100, Math.round(55 + styleScore(ranked, style))));
    const summary = style === "균형형"
      ? "적정·소신을 중심으로 한 현실적인 가·나·다군 조합입니다."
      : style === "안정형"
        ? "합격 가능성의 하방 위험을 줄이는 방향으로 구성한 조합입니다."
        : "상향 지원을 포함해 합격 가능성과 도전 가능성을 함께 노리는 조합입니다.";
    return { style, score, recommendations: ranked, summary };
  });
}
