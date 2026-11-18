import type { RegularAdmission, RegularRecommendation, RegularStudentProfile } from "./types";
import { recommendRegular, recommendRegularPortfolio as optimizeRegularPortfolio } from "./recommend";

export type RegularPortfolioStyle = "안정형" | "균형형" | "도전형" | "기초 후보형";

export type RegularPortfolioRecommendation = {
  style: RegularPortfolioStyle;
  score: number;
  recommendations: RegularRecommendation[];
  summary: string;
};

/**
 * 검증된 기준점이 충분하면 가·나·다군 상위 후보 조합을 함께 평가한다.
 * 아직 기준점이 부족하면 기존 모집군별 후보를 보여주되,
 * 이를 최적 포트폴리오나 합격 가능성 점수로 오인하지 않도록 구분한다.
 */
export function recommendRegularPortfolio(
  profile: RegularStudentProfile,
  admissions: RegularAdmission[],
): RegularPortfolioRecommendation[] {
  const optimized = optimizeRegularPortfolio(profile, admissions);

  if (optimized) {
    return [{
      style: optimized.strategy,
      score: Math.round((optimized.stabilityScore + optimized.fitScore) / 2),
      recommendations: optimized.admissions,
      summary: optimized.summary,
    }];
  }

  const recommendations = recommendRegular(profile, admissions);
  if (!recommendations.length) return [];

  return [{
    style: "기초 후보형",
    score: 0,
    recommendations,
    summary: "현재 데이터에는 가·나·다군 전체를 비교할 만큼 검증된 전년도 기준점이 충분하지 않습니다. 아래는 모집군별 참고 후보이며, 최적 조합이나 합격 가능성 판정으로 해석하면 안 됩니다.",
  }];
}
