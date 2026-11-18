import type { RegularAdmission, ScoreMetric } from "./types";

export type RegularStudentScore = {
  korean: number;
  koreanPercentile?: number;
  math: number;
  mathPercentile?: number;
  englishGrade: number;
  inquiry1: number;
  inquiry1Percentile?: number;
  inquiry2: number;
  inquiry2Percentile?: number;
  koreanHistoryGrade?: number;
  mathType?: "미적분" | "기하" | "확률과통계";
  inquiryType?: "사탐" | "과탐" | "혼합";
};

export type RegularCalculation = {
  admissionId: string;
  baseScore: number;
  bonus: number;
  totalScore: number;
  metric: ScoreMetric;
  calculationVerified: boolean;
  missingRules: string[];
  appliedComponents: string[];
};

const MAX_GRADE = 9;

function validGrade(value: number | undefined): value is number {
  return Number.isInteger(value) && value! >= 1 && value! <= MAX_GRADE;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function metricValue(
  standard: number,
  percentile: number | undefined,
  metric: ScoreMetric,
  maxStandard: number,
): number {
  const value = metric === "백분위" ? percentile : standard;
  if (value == null || !Number.isFinite(value)) return 0;
  return metric === "백분위" ? clamp(value, 0, 100) : clamp(value, 0, maxStandard);
}

function inquiryValue(
  admission: RegularAdmission,
  standard: number,
  percentile: number | undefined,
): number | undefined {
  if (admission.inquiryConversionRequired && !admission.inquiryConversionTable) {
    return undefined;
  }

  if (admission.inquiryConversionTable) {
    if (percentile == null) return undefined;
    const key = String(percentile);
    if (!Object.prototype.hasOwnProperty.call(admission.inquiryConversionTable, key)) {
      return undefined;
    }
    const converted = admission.inquiryConversionTable[key];
    return typeof converted === "number" && Number.isFinite(converted)
      ? converted
      : undefined;
  }

  const metric = admission.subjectMetrics?.inquiry ?? admission.scoreMetric;
  return metricValue(standard, percentile, metric, 100);
}

function gradePoints(
  table: RegularAdmission["englishGradeTable"] | RegularAdmission["koreanHistoryGradePoints"],
  grade: number | undefined,
): number | undefined {
  if (!validGrade(grade) || !table) return undefined;
  const value = table[grade as keyof typeof table];
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

/**
 * 대학별 공식 산식 설정이 존재하는 항목만 반영한다.
 * 설정이 없는 환산표/가산점은 임의의 공통값으로 대체하지 않는다.
 * 반환 점수는 참고지수이며, 합격선 비교에는 calculationVerified와
 * benchmarkComparable이 모두 true인 데이터만 사용한다.
 */
export function calculateRegularAdmission(
  admission: RegularAdmission,
  score: RegularStudentScore,
): RegularCalculation {
  const missingRules: string[] = [];
  const appliedComponents: string[] = [];

  const koreanMetric = admission.subjectMetrics?.korean ?? admission.scoreMetric;
  const mathMetric = admission.subjectMetrics?.math ?? admission.scoreMetric;
  const korean = metricValue(score.korean, score.koreanPercentile, koreanMetric, 200);
  const math = metricValue(score.math, score.mathPercentile, mathMetric, 200);
  const inquiry1 = inquiryValue(admission, score.inquiry1, score.inquiry1Percentile);
  const inquiry2 = inquiryValue(admission, score.inquiry2, score.inquiry2Percentile);
  const inquiryComplete = inquiry1 != null && (admission.inquirySubjects === 1 || inquiry2 != null);
  const inquiry = inquiryComplete
    ? admission.inquirySubjects === 1 ? inquiry1! : (inquiry1! + inquiry2!) / 2
    : undefined;

  const languageMathScore = admission.languageMathMode === "고득점 우선"
    ? Math.max(
        korean * admission.koreanWeight + math * admission.mathWeight,
        korean * admission.mathWeight + math * admission.koreanWeight,
      )
    : korean * admission.koreanWeight + math * admission.mathWeight;

  // 변환표가 필요한 탐구 점수는 표가 없거나 입력 백분위가 매칭되지 않으면
  // 평균 계산에서 제외하고, 미반영 사유를 명시한다.
  let academicWeightedTotal = languageMathScore;
  let academicWeight = admission.koreanWeight + admission.mathWeight;
  if (inquiry != null) {
    academicWeightedTotal += inquiry * admission.inquiryWeight;
    academicWeight += admission.inquiryWeight;
    appliedComponents.push(admission.inquiryConversionTable ? "탐구 변환표준점수표" : "탐구 점수");
  } else if (admission.inquiryWeight > 0) {
    missingRules.push(
      admission.inquiryConversionRequired
        ? "탐구 변환표준점수표 미등록 또는 백분위 매칭 실패"
        : "탐구 점수 입력·환산값 확인 필요",
    );
  }

  const academicAverage = academicWeight > 0 ? academicWeightedTotal / academicWeight : 0;
  if (academicWeight <= 0) missingRules.push("국어·수학·탐구 반영비율 미설정");
  else appliedComponents.push("국어·수학");

  const studentRecordWeight = clamp(admission.studentRecordWeight ?? 0, 0, 100);
  const testWeight = 100 - studentRecordWeight;
  const englishWeight = clamp(admission.englishWeight, 0, testWeight);
  const academicContributionWeight = Math.max(0, testWeight - englishWeight);

  let weightedTotal = academicAverage * academicContributionWeight;
  let includedWeight = academicContributionWeight;

  if (englishWeight > 0) {
    const english = gradePoints(admission.englishGradeTable, score.englishGrade);
    if (english == null) {
      missingRules.push("대학별 영어 등급 환산표 미등록");
    } else {
      weightedTotal += english * englishWeight;
      includedWeight += englishWeight;
      appliedComponents.push("영어 등급 환산");
    }
  }

  if (studentRecordWeight > 0) {
    missingRules.push("학생부 성적 미입력");
  }

  let bonus = 0;
  if (admission.koreanHistoryRequired) {
    const history = gradePoints(admission.koreanHistoryGradePoints, score.koreanHistoryGrade);
    if (history == null) {
      missingRules.push("대학별 한국사 등급 가산·감점표 미등록");
    } else {
      bonus += history;
      appliedComponents.push("한국사 등급 반영");
    }
  } else if (admission.koreanHistoryGradePoints) {
    const history = gradePoints(admission.koreanHistoryGradePoints, score.koreanHistoryGrade);
    if (history != null) {
      bonus += history;
      appliedComponents.push("한국사 등급 반영");
    }
  }

  if (admission.mathChoiceBonusRequired) {
    const points = score.mathType ? admission.mathChoiceBonusPoints?.[score.mathType] : undefined;
    if (typeof points !== "number") missingRules.push("수학 선택과목 가산점 규칙 미등록");
    else {
      bonus += points;
      appliedComponents.push("수학 선택과목 가산점");
    }
  } else if (score.mathType && admission.mathChoiceBonusPoints) {
    const points = admission.mathChoiceBonusPoints[score.mathType];
    if (typeof points === "number") {
      bonus += points;
      appliedComponents.push("수학 선택과목 가산점");
    }
  }

  if (admission.inquiryTypeBonusRequired) {
    const points = score.inquiryType ? admission.inquiryTypeBonusPoints?.[score.inquiryType] : undefined;
    if (typeof points !== "number") missingRules.push("탐구 선택유형 가산점 규칙 미등록");
    else {
      bonus += points;
      appliedComponents.push("탐구 선택유형 가산점");
    }
  } else if (score.inquiryType && admission.inquiryTypeBonusPoints) {
    const points = admission.inquiryTypeBonusPoints[score.inquiryType];
    if (typeof points === "number") {
      bonus += points;
      appliedComponents.push("탐구 선택유형 가산점");
    }
  }

  // 계산 가능한 영역만으로 1,000점 기준 참고지수를 만든다.
  // 미등록 영역을 0점으로 처리하지 않으며, 미적용 항목은 missingRules에 명시한다.
  const base = includedWeight > 0 ? weightedTotal / includedWeight : academicAverage;
  const scale = 10;
  const baseScore = base * scale;
  const bonusScore = bonus * scale;

  const calculationVerified =
    admission.calculationVerified === true &&
    missingRules.length === 0 &&
    includedWeight > 0;

  return {
    admissionId: admission.id,
    baseScore,
    bonus: bonusScore,
    totalScore: baseScore + bonusScore,
    metric: admission.scoreMetric,
    calculationVerified,
    missingRules,
    appliedComponents,
  };
}

export function normalizeScoreForComparison(score: number, metric: ScoreMetric) {
  if (metric === "백분위") return clamp(score, 0, 100);
  return Math.max(0, score);
}
