import type { RegularAdmission, ScoreMetric } from "./types";

export type RegularStudentScore = {
  korean: number;
  math: number;
  englishGrade: number;
  inquiry1: number;
  inquiry2: number;
  koreanHistoryGrade?: number;
  mathType?: "미적분" | "기하" | "확률과통계";
  inquiryType?: "사탐" | "과탐";
};

export type RegularCalculation = {
  admissionId: string;
  baseScore: number;
  bonus: number;
  totalScore: number;
  metric: ScoreMetric;
};

function englishScore(grade: number) {
  // 임시 참고 환산표. 대학별 공식 등급환산표가 등록되기 전에는 합격판정에 사용하지 않는다.
  const table: Record<number, number> = { 1: 100, 2: 96, 3: 92, 4: 86, 5: 80, 6: 70, 7: 60, 8: 50, 9: 40 };
  return table[grade] ?? 0;
}

function historyBonus(grade: number | undefined) {
  if (!grade) return 0;
  return grade === 1 ? 0 : grade === 2 ? -0.5 : grade === 3 ? -1 : grade === 4 ? -2 : -3;
}

function metricValue(value: number, metric: ScoreMetric) {
  return metric === "백분위" ? Math.max(0, Math.min(100, value)) : Math.max(0, value);
}

export function calculateRegularAdmission(admission: RegularAdmission, score: RegularStudentScore): RegularCalculation {
  const inquiry1 = metricValue(score.inquiry1, admission.scoreMetric);
  const inquiry2 = metricValue(score.inquiry2, admission.scoreMetric);
  const inquiry = admission.inquirySubjects === 1 ? inquiry1 : (inquiry1 + inquiry2) / 2;
  const korean = metricValue(score.korean, admission.scoreMetric);
  const math = metricValue(score.math, admission.scoreMetric);

  const languageMathScore = admission.languageMathMode === "고득점 우선"
    ? Math.max(
        korean * admission.koreanWeight + math * admission.mathWeight,
        korean * admission.mathWeight + math * admission.koreanWeight,
      )
    : korean * admission.koreanWeight + math * admission.mathWeight;
  const academicWeight = admission.koreanWeight + admission.mathWeight + admission.inquiryWeight;
  const academic = academicWeight > 0
    ? (languageMathScore + inquiry * admission.inquiryWeight) / academicWeight
    : 0;

  // 영역별 가중치를 먼저 전체 수능 반영비율에 맞춰 재배분한다.
  // 학생부 점수는 입력되지 않으므로 학생부 반영분은 계산하지 않는다.
  // 이 결과는 임시 참고지수이며, 대학별 공식 환산식 검증 전에는 합격등급에 쓰지 않는다.
  const studentRecordWeight = Math.max(0, Math.min(100, admission.studentRecordWeight ?? 0));
  const testWeight = 100 - studentRecordWeight;
  const englishWeight = Math.min(Math.max(0, admission.englishWeight), testWeight);
  const academicContributionWeight = Math.max(0, testWeight - englishWeight);
  const normalizedAcademicWeight = academicWeight > 0 ? academicContributionWeight / academicWeight : 0;
  const academicContribution = (
    korean * admission.koreanWeight +
    math * admission.mathWeight +
    inquiry * admission.inquiryWeight
  ) / 100 * normalizedAcademicWeight;
  const englishContribution = englishScore(score.englishGrade) * englishWeight / 100;
  const base = academicContribution + englishContribution;

  // 대학별 한국사 환산표가 없으므로 공통 감점을 임의 적용하지 않는다.
  const bonus = 0;
  const scale = 10;
  return {
    admissionId: admission.id,
    baseScore: base * scale,
    bonus: bonus * scale,
    totalScore: (base + bonus) * scale,
    metric: admission.scoreMetric,
  };
}

export function normalizeScoreForComparison(score: number, metric: ScoreMetric) {
  if (metric === "백분위") return Math.max(0, Math.min(100, score));
  return score;
}
