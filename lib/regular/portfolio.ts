import type { RegularAdmission, RegularRecommendation, RegularStudentProfile } from "./types";
import { recommendRegular } from "./recommend";

export type RegularPortfolioStyle = "균형형";

export type RegularPortfolioRecommendation = {
  style: RegularPortfolioStyle;
  score: number;
  recommendations: RegularRecommendation[];
  summary: string;
};

/**
 * 현재 데이터 계층에서는 가·나·다군별 최우선 후보를 먼저 확정한다.
 * 다중 후보 조합 탐색은 전년도 컷·충원·모집인원 데이터가 충분히 쌓인 뒤
 * 별도 단계에서 연결한다. 후보가 부족한데 안정형/도전형을 꾸며내지 않는다.
 */
export function recommendRegularPortfolio(
  profile: RegularStudentProfile,
  admissions: RegularAdmission[],
): RegularPortfolioRecommendation[] {
  const recommendations = recommendRegular(profile, admissions);
  if (!recommendations.length) return [];

  const hasAllGroups = recommendations.length === 3;
  const score = hasAllGroups ? 78 : 52;
  const summary = hasAllGroups
    ? "현재 데이터에서 가·나·다군 후보를 하나씩 확보했습니다. 다음 단계에서는 여러 후보를 비교해 안정·균형·도전 조합까지 확장합니다."
    : "가·나·다군 중 일부 후보만 확보됐습니다. 데이터가 없는 모집군을 억지로 추천하지 않았습니다.";

  return [{ style: "균형형", score, recommendations, summary }];
}
