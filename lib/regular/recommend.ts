import type { RegularAdmission, RegularRecommendation, RegularStudentProfile, RegularTier, AdmissionGroup } from "./types";
import { calculateRegularAdmission, type RegularStudentScore } from "./engine2027";
import { classifyRegularGap } from "./strategy2027";

export function majorFit(
  query: string,
  admission: Pick<RegularAdmission, "department" | "majorGroup">,
): number {
  const q = query.toLocaleLowerCase("ko-KR").replace(/[\\s·・_-]+/g, "");
  const department = admission.department.toLocaleLowerCase("ko-KR").replace(/[\\s·・_-]+/g, "");
  const group = admission.majorGroup;

  if (!q) return 0;
  // 학과명이 직접 일치하거나 사용자가 학과명의 일부를 입력한 경우 가장 높은 적합도를 부여한다.
  if (department.includes(q) || (q.length >= 3 && q.includes(department))) return 10;

  const rules: Array<{ keywords: string[]; groups: string[] }> = [
    { keywords: ["경영", "경제", "회계", "금융", "무역", "세무"], groups: ["경영·경제"] },
    { keywords: ["컴퓨터", "소프트웨어", "인공지능", "ai", "정보통신", "반도체"], groups: ["자연·공학", "컴퓨터·소프트웨어"] },
    { keywords: ["국어", "영어", "어문", "문학", "사학", "역사", "철학", "외국어"], groups: ["인문·어문", "인문·사회"] },
    { keywords: ["간호", "의료", "보건", "약학", "의예", "치의", "한의"], groups: ["의약·보건", "보건", "의약학", "자연·공학"] },
    { keywords: ["심리", "사회복지", "사회학", "행정", "정치", "법학", "경찰"], groups: ["사회·법", "인문·사회", "사회과학"] },
    { keywords: ["디자인", "미술", "시각", "산업디자인", "패션"], groups: ["예체능·디자인"] },
    { keywords: ["교육", "교직", "사범"], groups: ["교육", "인문·어문", "교육·자연"] },
    { keywords: ["수학", "물리", "화학", "생명", "생물", "천문", "통계"], groups: ["자연·공학", "자연과학", "교육·자연"] },
  ];

  for (const rule of rules) {
    if (!rule.keywords.some((keyword) => q.includes(keyword))) continue;
    const departmentAliasMatch = rule.keywords.some((keyword) => department.includes(keyword)) ||
      (q.includes("ai") && department.includes("인공지능"));
    if (departmentAliasMatch) return 9;
    if (rule.groups.includes(group)) return 6;
  }
  return 0;
}

function normalizeMathType(value: RegularStudentProfile["mathChoice"]): RegularStudentScore["mathType"] {
  if (value === "미적분" || value === "기하") return value;
  if (value === "확통") return "확률과통계";
  return undefined;
}

function toEngineScore(profile: RegularStudentProfile): RegularStudentScore {
  return {
    korean: profile.koreanStandard ?? 0,
    koreanPercentile: profile.koreanPercentile ?? 0,
    math: profile.mathStandard ?? 0,
    mathPercentile: profile.mathPercentile ?? 0,
    inquiry1: profile.inquiry1Standard ?? 0,
    inquiry1Percentile: profile.inquiry1Percentile ?? 0,
    inquiry2: profile.inquiry2Standard ?? 0,
    inquiry2Percentile: profile.inquiry2Percentile ?? 0,
    englishGrade: profile.englishGrade ?? 9,
    koreanHistoryGrade: profile.koreanHistoryGrade ?? 9,
    mathType: normalizeMathType(profile.mathChoice),
    inquiryType: profile.inquiryType === "미선택" ? undefined : profile.inquiryType,
    inquiry1Type: profile.inquiry1Type === "미선택" ? undefined : profile.inquiry1Type,
    inquiry2Type: profile.inquiry2Type === "미선택" ? undefined : profile.inquiry2Type,
    inquiry1ScienceLevel: profile.inquiry1ScienceLevel === "미선택" ? undefined : profile.inquiry1ScienceLevel,
    inquiry2ScienceLevel: profile.inquiry2ScienceLevel === "미선택" ? undefined : profile.inquiry2ScienceLevel,
    unexcusedAbsenceDays: profile.unexcusedAbsenceDays ?? undefined,
  };
}

function getCutline(admission: RegularAdmission): number | undefined {
  if (admission.benchmarkComparable !== true || admission.calculationVerified !== true) return undefined;
  // A 95% cutoff is not interchangeable with a 70% cutoff; never feed it into the same tier thresholds.
  const raw = admission.benchmarkCutline70 ?? admission.expectedCutline70 ?? admission.expectedCutline;
  if (raw == null) return undefined;
  if (admission.benchmarkTotalScore && admission.benchmarkTotalScore > 0) return (raw / admission.benchmarkTotalScore) * 1000;
  return raw;
}

function getBenchmarkHoldLabel(admission: RegularAdmission, result: ReturnType<typeof calculateRegularAdmission>): string {
  if (!result.calculationVerified) {
    return result.missingRules.length ? `판정 보류 (미반영: ${result.missingRules.join(", ")})` : "판정 보류 (공식 환산식 검증 전)";
  }
  if (admission.note?.includes("전년도 환산점수는 비교 기준으로 사용하지 않음")) {
    return "판정 보류 (전년도 환산식 변경으로 기준점 비교 불가)";
  }
  return "판정 보류 (비교 가능한 전년도 기준점 없음)";
}
function getBenchmarkGapLabel(admission: RegularAdmission, gap: number): string {
  const label = admission.benchmarkYear && admission.benchmarkCutline70 != null
    ? `${admission.benchmarkYear}학년도 최종등록자 70%컷`
    : "기준점";
  return `${label} 대비 ${gap >= 0 ? "+" : ""}${gap.toFixed(1)}`;
}
function isExcludedMajor(admission: RegularAdmission): boolean {
  const text = `${admission.universityName} ${admission.department} ${admission.majorGroup}`.replace(/\s+/g, "");
  return /신학|신학대|목회|기독교학/.test(text);
}

// '계열 대표'는 공식 모집단위명이 아닌 임시 데이터이므로 실제 추천에서는 제외한다.
function isPlaceholderDepartment(admission: RegularAdmission): boolean {
  return /대표/.test(admission.department);
}

export function isRegularProfileComplete(profile: RegularStudentProfile): boolean {
  return Boolean(
    profile.desiredMajor.trim() &&
    profile.koreanStandard !== null && profile.koreanStandard >= 0 && profile.koreanStandard <= 200 &&
    profile.koreanPercentile !== null && profile.koreanPercentile >= 0 && profile.koreanPercentile <= 100 &&
    profile.mathStandard !== null && profile.mathStandard >= 0 && profile.mathStandard <= 200 &&
    profile.mathPercentile !== null && profile.mathPercentile >= 0 && profile.mathPercentile <= 100 &&
    profile.inquiry1Standard !== null && profile.inquiry1Standard >= 0 && profile.inquiry1Standard <= 100 &&
    profile.inquiry2Standard !== null && profile.inquiry2Standard >= 0 && profile.inquiry2Standard <= 100 &&
    profile.inquiry1Percentile !== null && profile.inquiry1Percentile >= 0 && profile.inquiry1Percentile <= 100 &&
    profile.inquiry2Percentile !== null && profile.inquiry2Percentile >= 0 && profile.inquiry2Percentile <= 100 &&
    profile.englishGrade !== null && profile.englishGrade >= 1 && profile.englishGrade <= 9 &&
    profile.koreanHistoryGrade !== null && profile.koreanHistoryGrade >= 1 && profile.koreanHistoryGrade <= 9 &&
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
    if (a.admission.scoreMetric === b.admission.scoreMetric) return b.score - a.score || a.admission.id.localeCompare(b.admission.id);
    return a.admission.id.localeCompare(b.admission.id);
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

  let balance = 0;
  if (hasStable) balance += 12;
  if (hasTarget) balance += 16;
  if (hasBold) balance += 5;
  if (tiers.every((tier) => tier === "상향")) balance -= 35;
  if (!hasStable) balance -= 10;
  if (!hasTarget) balance -= 8;

  return base + balance;
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

  const eligibleAdmissions = admissions.filter((admission) => ["서울", "경기", "인천"].includes(admission.region) && admission.recruitmentCount !== 0 && !isExcludedMajor(admission) && !isPlaceholderDepartment(admission));
  const scored: ScoredAdmission[] = eligibleAdmissions.map((admission) => {
    const result = calculateRegularAdmission(admission, toEngineScore(profile));
    const fit = majorFit(profile.desiredMajor, admission);
    const reference = result.calculationVerified ? getCutline(admission) : undefined;
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

  // 같은 대학이 가·나·다군에 중복 노출되어 추천 슬롯을 독점하지 않도록 전체 군에서 한 번만 선택한다.
  // 군별 최대 5개 대학을 유지하되, 기준점이 없는 대학은 '판정 보류'로 구분해 후보에 남긴다.
  const selected: ScoredAdmission[] = [];
  const seenUniversitiesAcrossGroups = new Set<string>();
  for (const group of ["가", "나", "다"] as const) {
    let groupCount = 0;
    for (const candidate of rankedByGroup.get(group) ?? []) {
      if (seenUniversitiesAcrossGroups.has(candidate.admission.universityId)) continue;
      seenUniversitiesAcrossGroups.add(candidate.admission.universityId);
      selected.push(candidate);
      groupCount += 1;
      if (groupCount >= 5) break;
    }
  }

  return selected.map(({ admission, result, score, fit, reference, gap, tier }) => ({
    admissionId: admission.id,
    universityName: admission.universityName,
    department: admission.department,
    group: admission.group,
    score,
    recruitmentCount: admission.recruitmentCount,
    tier,
    reason: `${admission.group}군 · ${admission.department} · 대학별 반영식 참고지수 ${result.totalScore.toFixed(1)}점 · 전공 적합도 ${fit > 0 ? "높음" : "보통"}${reference != null ? ` · ${getBenchmarkGapLabel(admission, result.totalScore - reference)}` : ` · ${getBenchmarkHoldLabel(admission, result)}`}`,
    calculationVerified: result.calculationVerified,
    hasComparableBenchmark: reference != null,
    benchmarkGap: gap,
    benchmarkYear: admission.benchmarkYear,
    benchmarkCutline70: admission.benchmarkCutline70,
    benchmarkSourceUrl: admission.benchmarkSourceUrl,
    benchmarkDepartment: admission.benchmarkDepartment,
    missingRules: result.missingRules,
    appliedComponents: result.appliedComponents,
  }));
}

export function recommendRegularPortfolio(profile: RegularStudentProfile, admissions: RegularAdmission[]): RegularPortfolioRecommendation | null {
  if (!isRegularProfileComplete(profile)) return null;

  const eligible = admissions.filter((admission) => ["서울", "경기", "인천"].includes(admission.region) && admission.recruitmentCount !== 0 && !isExcludedMajor(admission) && !isPlaceholderDepartment(admission));
  const scored: ScoredAdmission[] = eligible.map((admission) => {
    const result = calculateRegularAdmission(admission, toEngineScore(profile));
    const fit = majorFit(profile.desiredMajor, admission);
    const reference = result.calculationVerified ? getCutline(admission) : undefined;
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

  // 최적 조합 탐색에서도 한 모집군의 상위 8칸을 한 대학이 독점하지 않도록 대학별 대표 학과만 남긴다.
  const candidates = (["가", "나", "다"] as const).map((group) => {
    const seenPortfolioUniversities = new Set<string>();
    return rankWithinGroup(byGroup.get(group) ?? []).filter((item) => {
      if (seenPortfolioUniversities.has(item.admission.universityId)) return false;
      seenPortfolioUniversities.add(item.admission.universityId);
      return true;
    }).slice(0, 8);
  });
  if (candidates.some((list) => list.length === 0)) return null;

  let best: { items: [ScoredAdmission, ScoredAdmission, ScoredAdmission]; score: number } | null = null;
  for (const a of candidates[0]) {
    for (const n of candidates[1]) {
      for (const d of candidates[2]) {
        const items: [ScoredAdmission, ScoredAdmission, ScoredAdmission] = [a, n, d];
        // One university must not occupy multiple application-group slots in the same portfolio.
        if (new Set(items.map((item) => item.admission.universityId)).size !== 3) continue;
        const score = scoreAdmissionSet(items);
        if (!best || score > best.score) best = { items, score };
      }
    }
  }
  if (!best || best.items.some((item) => item.tier === "판정 보류")) return null;

  const recommendations = best.items.map(({ admission, result, score, fit, reference, gap, tier }) => ({
    admissionId: admission.id,
    universityName: admission.universityName,
    department: admission.department,
    group: admission.group,
    score,
    recruitmentCount: admission.recruitmentCount,
    tier,
    reason: `${admission.group}군 · ${admission.department} · ${admission.scoreMetric} 환산 ${result.totalScore.toFixed(1)}점 · 전공 적합도 ${fit > 0 ? "높음" : "보통"}${reference != null ? ` · ${getBenchmarkGapLabel(admission, result.totalScore - reference)}` : ` · ${getBenchmarkHoldLabel(admission, result)}`}`,
    calculationVerified: result.calculationVerified,
    hasComparableBenchmark: reference != null,
    benchmarkGap: gap,
    benchmarkYear: admission.benchmarkYear,
    benchmarkCutline70: admission.benchmarkCutline70,
    benchmarkSourceUrl: admission.benchmarkSourceUrl,
    benchmarkDepartment: admission.benchmarkDepartment,
    missingRules: result.missingRules,
    appliedComponents: result.appliedComponents,
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
    summary: `가·나·다군 상위 후보 조합을 함께 비교했습니다. ${strategy} 조합이며 합격 안정성 지수 ${stabilityScore}점, 전공 적합도 지수 ${fitScore}점입니다. 이는 과거 기준점에 기반한 참고 지수이며 합격 확률은 아닙니다.`,
  };
}
