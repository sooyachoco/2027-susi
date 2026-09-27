import type { RegularAdmission, RegularRecommendation, RegularStudentProfile } from "./types";
import { calculateRegularAdmission, type RegularStudentScore } from "./engine2027";
import { classifyRegularGap } from "./strategy2027";

function majorFit(query: string, majorGroup: string): number {
  const q = query.replace(/\s+/g, "");
  if (!q || majorGroup === "전체") return 0;
  if ((q.includes("경영") || q.includes("경제") || q.includes("회계") || q.includes("금융")) && majorGroup === "경영·경제") return 7;
  if ((q.includes("컴퓨터") || q.includes("소프트웨어") || q.includes("인공지능") || q.includes("공학")) && (majorGroup === "자연·공학" || majorGroup === "컴퓨터·소프트웨어")) return 7;
  if ((q.includes("국어") || q.includes("영어") || q.includes("사학") || q.includes("철학") || q.includes("어문") || q.includes("교육")) && majorGroup === "인문·어문") return 7;
  return -2;
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
  return admission.expectedCutline ?? admission.expectedCutline95 ?? admission.expectedCutline70;
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

export function recommendRegular(profile: RegularStudentProfile, admissions: RegularAdmission[]): RegularRecommendation[] {
  if (!isRegularProfileComplete(profile)) return [];

  const scored = admissions.map((admission) => {
    const result = calculateRegularAdmission(admission, toEngineScore(profile, admission));
    const fit = majorFit(profile.desiredMajor, admission.majorGroup);
    const reference = getCutline(admission);
    const gap = reference == null ? null : result.totalScore - reference;

    // 기준점이 확보된 대학은 실제 환산점수와 기준점의 차이로 안정/적정/소신/상향을 판단한다.
    // 기준점이 없는 대학은 기존 환산점수 순위를 유지하되, 임의의 합격선은 만들지 않는다.
    const score = Math.round(result.totalScore + fit);
    const tier = gap == null
      ? ("적정" as const)
      : classifyRegularGap(gap);

    return { admission, result, score, fit, reference, gap, tier };
  });

  // 서로 다른 환산체계는 대학별 환산점수 자체가 직접 비교 가능한 값이 아니다.
  // 현재 데이터처럼 동일 지표 내에서는 환산점수 + 전공 적합도로 정렬하고,
  // 기준점이 있는 데이터가 추가되면 gap을 우선적으로 활용한다.
  const ranked = [...scored].sort((a, b) => {
    if (a.gap != null && b.gap != null && a.admission.scoreMetric === b.admission.scoreMetric) {
      return b.gap - a.gap || b.score - a.score || a.admission.id.localeCompare(b.admission.id);
    }
    return b.score - a.score || a.admission.id.localeCompare(b.admission.id);
  });

  const selected: typeof ranked = [];
  const groups = new Set<string>();
  for (const item of ranked) {
    if (selected.length >= 3) break;
    if (!groups.has(item.admission.group)) {
      selected.push(item);
      groups.add(item.admission.group);
    }
  }
  for (const item of ranked) {
    if (selected.length >= 3) break;
    if (!selected.some((x) => x.admission.id === item.admission.id)) selected.push(item);
  }

  return selected.map(({ admission, result, score, fit, reference, tier }) => ({
    admissionId: admission.id,
    universityName: admission.universityName,
    department: admission.department,
    group: admission.group,
    score,
    tier,
    reason: `${admission.group}군 · ${admission.department} · ${admission.scoreMetric} 환산 ${result.totalScore.toFixed(1)}점 · 전공 적합도 ${fit >= 0 ? "높음" : "낮음"}${reference != null ? ` · 기준점 대비 ${((result.totalScore - reference) >= 0 ? "+" : "")}${(result.totalScore - reference).toFixed(1)}` : " · 참고 기준점 미확보"}`,
  }));
}
