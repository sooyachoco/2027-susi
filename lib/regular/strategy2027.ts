import type { RegularAdmission } from "./types";
import { calculateRegularAdmission, type RegularStudentScore } from "./engine2027";

export type RegularTier = "상향" | "소신" | "적정" | "안정";

export function classifyRegularGap(gap: number): RegularTier {
  if (gap < -6) return "상향";
  if (gap < -2) return "소신";
  if (gap <= 3) return "적정";
  return "안정";
}

export function recommendByGroup(admissions: RegularAdmission[], score: RegularStudentScore) {
  const calculated = admissions.map((admission) => {
    const result = calculateRegularAdmission(admission, score);
    const reference = admission.expectedCutline ?? admission.expectedCutline95 ?? admission.expectedCutline70;
    const gap = reference == null ? 0 : result.totalScore - reference;
    return { admission, ...result, gap, tier: reference == null ? "적정" as const : classifyRegularGap(gap) };
  });

  const groups = ["가", "나", "다"] as const;
  return Object.fromEntries(groups.map((group) => [group, calculated.filter((x) => x.admission.group === group).sort((a, b) => b.gap - a.gap)]));
}

export function buildRegularPortfolio(admissions: RegularAdmission[], score: RegularStudentScore) {
  const grouped = recommendByGroup(admissions, score);
  return {
    가: grouped["가"]?.slice(0, 5) ?? [],
    나: grouped["나"]?.slice(0, 5) ?? [],
    다: grouped["다"]?.slice(0, 5) ?? [],
  };
}
