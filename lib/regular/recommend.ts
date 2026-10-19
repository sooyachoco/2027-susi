import type { RegularAdmission, RegularRecommendation, RegularStudentProfile, RegularTier, AdmissionGroup } from "./types";
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
  if (admission.benchmarkTotalScore && admission.benchmarkTotalScore > 0) return (raw / admission.benchmarkTotalScore) * 1000;
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
  tier: RegularTier | "판정 보류";
};

function candidateQuality(item: ScoredAdmission): number {
  const fitBonus = item.fit * 2;
  if (item.gap == null) return fitBonus - 20;
  const gap = item.gap;
  let tierBase: number;
  if (gap < -6) tierBase = 0;
  else if (gap < -2) tierBase = 14;
  else if (gap <= 3) tierBase = 30;
  else tierBase = 22;
  const distance = Math.min(Math.abs(gap), 20);
  const proximity = Math.max(0, 8 - distance * 0.25);
  return tierBase + proximity + fitBonus;
}

function rankWithinGroup(items: ScoredAdmission[]): ScoredAdmission[] {
  return [...items].sort((a, b) => {
    const qualityDiff = candidateQuality(b) - candidateQuality(a);
    if (qualityDiff !== 0) return qualityDiff;
    return b.score - a.score || a.admission.id.localeCompare(b.admission.id);
  });
}

function scoreAdmissionSet(items: ScoredAdmission[]): number {
  if (items.length !== 3) return -Infinity;
  const tiers = items.map((item) => item.tier);
  if (tiers.includes("판정 보류")) return -1000;

  const base = items.reduce((sum, item) => sum + candidateQuality(item), 0);
  const tierSet = new Set(tiers);
  const hasStable = tierSet.has("안정");
  const hasTarget = tierSet.has("적정");
  const hasBold = tierSet.has("소신") || tierSet.has("상향");

  // 3장 전체의 균형을 평가한다. 적정+안정 기반에 소신/상향 한 장을 허용한다.
  let balance = 0;
  if (hasStable) balance += 12;
  if (hasTarget) balance += 16;
  if (hasBold) balance += 5;
  if (tiers.every((tier) => tier === "상향")) balance -= 35;
  if (!hasStable) balance -= 10;
  if (!hasTarget) balance -= 8;

  const fit = items.reduce((sum, item) => sum + item.fit, 0) * 1.5;
  return base + balance + fit;
}

export type RegularPortfolioRecommendation = {
  admissions: [RegularRecommendation, RegularRecommendation, RegularRecommendation];
  portfolioScore: number;
  stabilityScore: number;
  fitScore: number;
  strategy: "안정형" | "균형형" | "도전형";
  summary: string;
};

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

  const rankedByGroup = new Map<AdmissionGroup, ScoredAdmission[]>();
  for (const item of scored) {
    const current = rankedByGroup.get(item.admission.group) ?? [];
    current.push(item);
    rankedByGroup.set(item.admission.group, current);
  }
  for (const [group, items] of rankedByGroup) rankedByGroup.set(group, rankWithinGroup(items));

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

export function recommendRegularPortfolio(profile: RegularStudentProfile, admissions: RegularAdmission[]): RegularPortfolioRecommendation | null {
  if (!isRegularProfileComplete(profile)) return null;

  const eligible = admissions.filter((admission) => isTargetRegion(admission) && !isExcludedMajor(admission));
  const scored: ScoredAdmission[] = eligible.map((admission) => {
    const result = calculateRegularAdmission(admission, toEngineScore(profile, admission));
    const fit = majorFit(profile.desiredMajor, admission.majorGroup);
    const reference = getCutline(admission);
    const gap = reference == null ? null : result.totalScore - reference;
    const score = Math.round(result.totalScore * 10) / 10;
    const tier = gap == null ? ("판정 보류" as const) : classifyRegularGap(gap);
    return { admission, result, score, fit, reference, gap, tier };
  });

  const byGroup = new Map<AdmissionGroup, ScoredAdmission[]>();
  for (const item of scored) {
    const list = byGroup.get(item.admission.group) ?? [];
    list.push(item);
    byGroup.set(item.admission.group, list);
  }

  const candidates = (["가", "나", "다"] as const).map((group) => {
    const ranked = rankWithinGroup(byGroup.get(group) ?? []);
    return ranked.slice(0, 8);
  });
  if (candidates.some((list) => list.length === 0)) return null;

  let best: { items: [ScoredAdmission, ScoredAdmission, ScoredAdmission]; score: number } | null = null;
  for (const a of candidates[0]) {
    for (const n of candidates[1]) {
      for (const d of candidates[2]) {
        const items: [ScoredAdmission, ScoredAdmission, ScoredAdmission] = [a, n, d];
        const score = scoreAdmissionSet(items);
        if (!best || score > best.score) best = { items, score };
      }
    }
  }
  if (!best) return null;

  const recommendations = best.items.map(({ admission, result, score, fit, reference, tier }) => ({
    admissionId: admission.id,
    universityName: admission.universityName,
    department: admission.department,
    group: admission.group,
    score,
    tier,
    reason: `${admission.group}군 · ${admission.department} · ${admission.scoreMetric} 환산 ${result.totalScore.toFixed(1)}점 · 전공 적합도 ${fit > 0 ? "높음" : "보통"}${reference != null ? ` · 기준점 대비 ${((result.totalScore - reference) >= 0 ? "+" : "")}${(result.totalScore - reference).toFixed(1)}` : " · 기준점 데이터 미확보 → 판정 보류"}`,
  })) as [RegularRecommendation, RegularRecommendation, RegularRecommendation];

  const stabilityValues = best.items.map((item) => item.tier === "안정" ? 100 : item.tier === "적정" ? 75 : item.tier === "소신" ? 45 : 20);
  const stabilityScore = Math.round(stabilityValues.reduce((a, b) => a + b, 0) / 3);
  const fitScore = Math.round(best.items.reduce((sum, item) => sum + item.fit, 0) / 21 * 100);
  const hasStable = best.items.some((item) => item.tier === "안정");
  const hasBold = best.items.some((item) => item.tier === "소신" || item.tier === "상향");
  const strategy = hasStable && hasBold ? "균형형" : hasStable ? "안정형" : "도전형";

  return {
    admissions: recommendations,
    portfolioScore: Math.round(best.score * 10) / 10,
    stabilityScore,
    fitScore,
    strategy,
    summary: `가·나·다군을 개별 순위가 아니라 하나의 지원 포트폴리오로 평가했습니다. ${strategy} 조합이며 합격 안정성 ${stabilityScore}점, 전공 적합도 ${fitScore}점입니다.`,
  };
}
