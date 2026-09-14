import type { RegularAdmission, RegularRecommendation, RegularStudentProfile } from "./types";

const ENGLISH = [100, 96, 92, 86, 78, 68, 55, 40, 20];

export function isRegularProfileComplete(profile: RegularStudentProfile): boolean {
  return Boolean(
    profile.desiredMajor.trim() &&
    profile.koreanStandard !== null && profile.koreanPercentile !== null &&
    profile.mathStandard !== null && profile.mathPercentile !== null &&
    profile.inquiry1Percentile !== null && profile.inquiry2Percentile !== null &&
    profile.englishGrade !== null && profile.koreanHistoryGrade !== null &&
    profile.mathChoice !== "미선택" && profile.inquiryType !== "미선택"
  );
}

function englishScore(grade: number | null): number {
  if (!grade || grade < 1 || grade > 9) return 0;
  return ENGLISH[grade - 1];
}

function majorFit(query: string, majorGroup: string): number {
  const q = query.replace(/\s+/g, "");
  if (!q || majorGroup === "전체") return 0;
  if ((q.includes("경영") || q.includes("경제") || q.includes("회계") || q.includes("금융")) && majorGroup === "경영·경제") return 7;
  if ((q.includes("컴퓨터") || q.includes("소프트웨어") || q.includes("인공지능") || q.includes("공학")) && majorGroup === "자연·공학") return 7;
  if ((q.includes("국어") || q.includes("영어") || q.includes("사학") || q.includes("철학") || q.includes("어문") || q.includes("교육")) && majorGroup === "인문·어문") return 7;
  return -2;
}

function percentileScore(profile: RegularStudentProfile, admission: RegularAdmission): number {
  const korean = profile.koreanPercentile ?? 0;
  const math = profile.mathPercentile ?? 0;
  const inquiry = ((profile.inquiry1Percentile ?? 0) + (profile.inquiry2Percentile ?? 0)) / 2;
  const english = englishScore(profile.englishGrade);
  const weighted = korean * admission.koreanWeight + math * admission.mathWeight + english * admission.englishWeight + inquiry * admission.inquiryWeight;
  return weighted / 100;
}

export function recommendRegular(
  profile: RegularStudentProfile,
  admissions: RegularAdmission[],
): RegularRecommendation[] {
  if (!isRegularProfileComplete(profile)) return [];

  const scored = admissions.map((admission) => {
    const base = percentileScore(profile, admission);
    const fit = majorFit(profile.desiredMajor, admission.majorGroup);
    const mathBonus = profile.mathChoice === "미적분" || profile.mathChoice === "기하" ? 1 : 0;
    const score = Math.round(Math.max(45, Math.min(99, base + fit + mathBonus)));
    return { admission, score };
  });

  const ranked = [...scored].sort((a, b) => b.score - a.score || a.admission.id.localeCompare(b.admission.id));
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

  return selected.map(({ admission, score }) => ({
    admissionId: admission.id,
    universityName: admission.universityName,
    department: admission.department,
    group: admission.group,
    score,
    tier: score >= 90 ? "안정" : score >= 78 ? "적정" : score >= 65 ? "소신" : "상향",
    reason: `${admission.group}군 · ${admission.department} · 대학 반영식 기준 모의환산 ${score}점`,
  }));
}
