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
  const raw = admission.benchmarkCutline70
    ?? admission.benchmarkCutline95
    ?? admission.expectedCutline
    ?? admission.expectedCutline95
    ?? admission.expectedCutline70;
  if (raw == null) return undefined;
  if (admission.benchmarkTotalScore && admission.benchmarkTotalScore > 0) {
    return (raw / admission.benchmarkTotalScore) * 1000;
  }
  return raw;
}

function tierPriority(tier: RegularTier): number {
  switch (tier) {
    case "적정": return 40;
    case "안정": return 32;
    case "소신": return 24;
    case "상향": return 8;
    case "판정 보류": return 0;
  }
}

/**
 * 모집군별 포트폴리오에서는 단순 환산점수 순위가 아니라
 * 합격 가능성 구간을 먼저 보고, 같은 구간에서는 기준점과의 거리를 본다.
 * 기준점이 없는 대학은 점수가 높더라도 앞쪽으로 끌어올리지 않는다.
 */
function portfolioPriority(item: {
  gap: number | null;
  tier: RegularTier;
  totalScore: number;
}): number {
  if (item.gap == null) return tierPriority("판정 보류") - 0.001;

  const distance = Math.min(Math.abs(item.gap), 20);
  const proximity = Math.max(0, 8 - distance * 0.25);
  return tierPriority(item.tier) + proximity;
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
          const priorityDiff = portfolioPriority(b) - portfolioPriority(a);
          if (priorityDiff !== 0) return priorityDiff;
          return b.totalScore - a.totalScore || a.admission.id.localeCompare(b.admission.id);
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
