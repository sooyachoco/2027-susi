import type { RegularAdmission, RegularRecommendation, RegularStudentProfile } from "./types";
import { calculateRegularAdmission, type RegularStudentScore } from "./engine2027";
import { classifyRegularGap } from "./strategy2027";

function majorFit(query: string, majorGroup: string): number {
  const q = query.replace(/\s+/g, "");
  if (!q || majorGroup === "전체") return 0;
  if ((q.includes("경영") || q.includes("경제") || q.includes("회계") || q.includes("금융")) && majorGroup === "경영·경제") return 7;
  if ((q.includes("컴퓨터") || q.includes("소프트웨어") || q.includes("인공지능") || q.includes("AI") || q.includes("공학")) && (majorGroup === "자연·공학" || majorGroup === "컴퓨터·소프트웨어")) return 7;
  if ((q.includes("국어") || q.includes("영어") || q.includes("사학") || q.includes("역사") || q.includes("철학") || q.includes("어문") || q.includes("교육")) && majorGroup === "인문·어문") return 7;
  if ((q.includes("간호") || q.includes("의료") || q.includes("보건")) && (majorGroup === "의약·보건" || majorGroup === "자연·공학")) return 7;
  if ((q.includes("심리") || q.includes("사회복지") || q.includes("사회학") || q.includes("행정") || q.includes("정치")) && majorGroup === "사회·법") return 7;
  if ((q.includes("디자인") || q.includes("미술") || q.includes("시각") || q.includes("산업디자인")) && majorGroup === "예체능·디자인") return 7;
  return 0;
}

function normalizeMathType(value: RegularStudentProfile["mathChoice"]): RegularStudentScore["mathType"] {
  if (value === "미적분" || value === "기하") return value;
  if (value === "확통") return "확률과통계";
  return undefined;
}

function toEngineScore(profile: RegularStudentProfile, admission: RegularAdmission): RegularStudentScore {
  const useStandard = admission.scoreMetric === "표준점수";
  return {
    korean: (useStandard ? profile.koreanStandard : profile.koreanPercentile) ?? 0,
    math: (useStandard ? profile.mathStandard : profile.mathPercentile) ?? 0,
    inquiry1: (useStandard ? profile.inquiry1Standard : profile.inquiry1Percentile) ?? 0,
    inquiry2: (useStandard ? profile.inquiry2Standard : profile.inquiry2Percentile) ?? 0,
    englishGrade: profile.englishGrade ?? 9,
    koreanHistoryGrade: profile.koreanHistoryGrade ?? 9,
    mathType: normalizeMathType(profile.mathChoice),
    inquiryType: profile.inquiryType === "사탐" || profile.inquiryType === "과탐" ? profile.inquiryType : undefined,
  };
}

function getCutline(admission: RegularAdmission): number | undefined {
  const raw = admission.benchmarkCutline70 ?? admission.benchmarkCutline95 ?? admission.expectedCutline ?? admission.expectedCutline95 ?? admission.expectedCutline70;
  if (raw == null) return undefined;
  if (admission.benchmarkTotalScore && admission.benchmarkTotalScore > 0) {
    return (raw / admission.benchmarkTotalScore) * 1000;
  }
  return raw;
}

function isTargetRegion(admission: RegularAdmission): boolean {
  return /서울|경기|인천/.test(admission.region);
}

function isExcludedMajor(admission: RegularAdmission): boolean {
  const text = `${admission.universityName} ${admission.department} ${admission.majorGroup}`.replace(/\s+/g, "");
  return /신학|신학대|목회|기독교학/.test(text);
}

export function isRegularProfileComplete(profile: RegularStudentProfile): boolean {
  return Boolean(
    profile.desiredMajor.trim() &&
    profile.koreanStandard !== null && profile.koreanPercentile !== null &&
    profile.mathStandard !== null && profile.mathPercentile !== null &&
    profile.inquiry1Standard !== null && profile.inquiry2Standard !== null &&
    profile.inquiry1Percentile !== null && profile.inquiry2Percentile !== null &&
    profile.englishGrade !== null && profile.koreanHistoryGrade !== null &&
    profile.mathChoice !== "미선택" && profile.inquiryType !== "미선택",
  );
}

type ScoredAdmission = {
  admission: RegularAdmission;
  result: ReturnType<typeof calculateRegularAdmission>;
  score: number;
  fit: number;
  reference: number | undefined;
  gap: number | null;
  tier: ReturnType<typeof classifyRegularGap> | "판정 보류";
};

/**
 * 추천 품질은 전공 적합도보다 먼저 실제 환산점수와 기준점의 관계를 본다.
 * 기준점이 없는 대학은 합격 가능성을 추정할 근거가 부족하므로 순위에서 불리하게 처리한다.
 */
function candidateQuality(item: ScoredAdmission): number {
  const fitBonus = item.fit * 2;
  if (item.gap == null) return fitBonus - 10;

  // 기준점과 가까울수록 대표적인 모의지원 후보로 본다.
  // 점수 단위는 엔진에서 1,000점 기준으로 정규화된다.
  const distance = Math.min(Math.abs(item.gap), 20);
  const proximity = 30 - distance * 1.2;
  return proximity + fitBonus;
}

function rankWithinGroup(items: ScoredAdmission[]): ScoredAdmission[] {
  return [...items].sort((a, b) => {
    const qualityDiff = candidateQuality(b) - candidateQuality(a);
    if (qualityDiff !== 0) return qualityDiff;
    return b.score - a.score || a.admission.id.localeCompare(b.admission.id);
  });
}

export function recommendRegular(profile: RegularStudentProfile, admissions: RegularAdmission[]): RegularRecommendation[] {
  if (!isRegularProfileComplete(profile)) return [];

  const eligibleAdmissions = admissions.filter((admission) => isTargetRegion(admission) && !isExcludedMajor(admission));

  const scored: ScoredAdmission[] = eligibleAdmissions.map((admission) => {
    const result = calculateRegularAdmission(admission, toEngineScore(profile, admission));
    const fit = majorFit(profile.desiredMajor, admission.majorGroup);
    const reference = getCutline(admission);
    const gap = reference == null ? null : result.totalScore - reference;
    const score = Math.round(result.totalScore * 10) / 10;
    const tier = gap == null ? ("판정 보류" as const) : classifyRegularGap(gap);
    return { admission, result, score, fit, reference, gap, tier };
  });

  const rankedByGroup = new Map<string, ScoredAdmission[]>();
  for (const item of scored) {
    const current = rankedByGroup.get(item.admission.group) ?? [];
    current.push(item);
    rankedByGroup.set(item.admission.group, current);
  }
  for (const [group, items] of rankedByGroup) {
    rankedByGroup.set(group, rankWithinGroup(items));
  }

  // 정시는 모집군별 1개 선택 구조를 전제로 한다.
  // 데이터가 부족한 모집군을 다른 군의 대학으로 억지로 채우지 않는다.
  const selected: ScoredAdmission[] = [];
  for (const group of ["가", "나", "다"] as const) {
    const candidate = rankedByGroup.get(group)?.[0];
    if (candidate) selected.push(candidate);
  }

  return selected.map(({ admission, result, score, fit, reference, tier }) => ({
    admissionId: admission.id,
    universityName: admission.universityName,
    department: admission.department,
    group: admission.group,
    score,
    tier,
    reason: `${admission.group}군 · ${admission.department} · ${admission.scoreMetric} 환산 ${result.totalScore.toFixed(1)}점 · 전공 적합도 ${fit > 0 ? "높음" : "보통"}${reference != null ? ` · 기준점 대비 ${((result.totalScore - reference) >= 0 ? "+" : "")}${(result.totalScore - reference).toFixed(1)}` : " · 전년도/예상 기준점 데이터 미확보 → 판정 보류"}`,
  }));
}
