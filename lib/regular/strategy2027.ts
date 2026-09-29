import type { RegularAdmission, RegularTier } from "./types";
import { calculateRegularAdmission, type RegularStudentScore } from "./engine2027";

export type { RegularTier };

export function classifyRegularGap(gap: number): RegularTier {
  if (gap < -6) return "상향";
  if (gap < -2) return "소신";
  if (gap <= 3) return "적정";
  return "안정";
}

function getCutline(admission: RegularAdmission): number | undefined {
  return admission.benchmarkCutline70 ?? admission.benchmarkCutline95 ?? admission.expectedCutline ?? admission.expectedCutline95 ?? admission.expectedCutline70;
}

export function recommendByGroup(admissions: RegularAdmission[], score: RegularStudentScore) {
  const calculated = admissions.map((admission) => {
    const result = calculateRegularAdmission(admission, score);
    const reference = getCutline(admission);
    const gap = reference == null ? null : result.totalScore - reference;
    return {
      admission,
      ...result,
      gap,
      tier: gap == null ? ("판정 보류" as const) : classifyRegularGap(gap),
      hasReferenceCutline: reference != null,
    };
  });

  const groups = ["가", "나", "다"] as const;
  return Object.fromEntries(
    groups.map((group) => [
      group,
      calculated
        .filter((x) => x.admission.group === group)
        .sort((a, b) => {
          if (a.gap == null && b.gap == null) return b.totalScore - a.totalScore;
          if (a.gap == null) return 1;
          if (b.gap == null) return -1;
          return b.gap - a.gap;
        }),
    ]),
  ) as Record<typeof groups[number], typeof calculated>;
}

export function buildRegularPortfolio(admissions: RegularAdmission[], score: RegularStudentScore) {
  const grouped = recommendByGroup(admissions, score);
  return {
    가: grouped["가"].slice(0, 5),
    나: grouped["나"].slice(0, 5),
    다: grouped["다"].slice(0, 5),
  };
}
