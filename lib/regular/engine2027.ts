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

function englishScore(grade: number, weight: number) {
  const table: Record<number, number> = { 1: 100, 2: 96, 3: 92, 4: 86, 5: 80, 6: 70, 7: 60, 8: 50, 9: 40 };
  return ((table[grade] ?? 0) / 100) * weight;
}

function historyBonus(grade: number | undefined) {
  if (!grade) return 0;
  return grade === 1 ? 0 : grade === 2 ? -0.5 : grade === 3 ? -1 : grade === 4 ? -2 : -3;
}

function metricValue(value: number, metric: ScoreMetric) {
  // Student input and verified admissions must use the same metric before weighting.
  // Percentile is treated as a 100-point scale; standard score is expected on its native scale.
  return metric === "백분위" ? Math.max(0, Math.min(100, value)) : Math.max(0, value);
}

export function calculateRegularAdmission(admission: RegularAdmission, score: RegularStudentScore): RegularCalculation {
  const inquiry = (metricValue(score.inquiry1, admission.scoreMetric) + metricValue(score.inquiry2, admission.scoreMetric)) / 2;
  const korean = metricValue(score.korean, admission.scoreMetric);
  const math = metricValue(score.math, admission.scoreMetric);
  const academicWeight = admission.koreanWeight + admission.mathWeight + admission.inquiryWeight;
  const academic = academicWeight > 0
    ? (korean * admission.koreanWeight + math * admission.mathWeight + inquiry * admission.inquiryWeight) / academicWeight
    : 0;
  const base = academic * (100 - admission.englishWeight) / 100 + englishScore(score.englishGrade, admission.englishWeight);
  const bonus = historyBonus(score.koreanHistoryGrade);
  return { admissionId: admission.id, baseScore: base, bonus, totalScore: base + bonus, metric: admission.scoreMetric };
}

export function normalizeScoreForComparison(score: number, metric: ScoreMetric) {
  if (metric === "백분위") return Math.max(0, Math.min(100, score));
  return score;
}
