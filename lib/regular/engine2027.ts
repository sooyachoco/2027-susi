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
  inquiry1Type?: "사탐" | "과탐" | "직탐";
  inquiry2Type?: "사탐" | "과탐" | "직탐";
  inquiry1ScienceLevel?: "I" | "II";
  inquiry2ScienceLevel?: "I" | "II";
  unexcusedAbsenceDays?: number;
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
 * Supports both normalized weighted-average rules and official weighted-sum
 * formulas with additive grade bonuses. Missing official conversion data is
 * never replaced with an invented common table.
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
  let math = metricValue(score.math, score.mathPercentile, mathMetric, 200);
  if (admission.mathChoiceBonusRequired) {
    const rate = score.mathType ? admission.mathChoiceBonusRate?.[score.mathType] : undefined;
    if (typeof rate !== "number") missingRules.push("수학 선택과목 가산율 규칙 미입력");
    else { math *= 1 + rate; appliedComponents.push("수학 선택과목 표준점수 가산율"); }
  } else if (score.mathType && admission.mathChoiceBonusRate) {
    const rate = admission.mathChoiceBonusRate[score.mathType];
    if (typeof rate === "number") { math *= 1 + rate; appliedComponents.push("수학 선택과목 표준점수 가산율"); }
  }

  let inquiry1 = inquiryValue(admission, score.inquiry1, score.inquiry1Percentile);
  let inquiry2 = admission.inquirySubjects === 2
    ? inquiryValue(admission, score.inquiry2, score.inquiry2Percentile)
    : undefined;

  if (admission.inquiryTypeBonusRequired) {
    const fallbackType = score.inquiryType && score.inquiryType !== "혼합"
      ? score.inquiryType
      : undefined;
    const type1 = score.inquiry1Type ?? fallbackType;
    const type2 = score.inquiry2Type ?? fallbackType;
    const rate1 = type1 ? admission.inquiryTypeBonusRate?.[type1] : undefined;
    const rate2 = admission.inquirySubjects === 2 && type2
      ? admission.inquiryTypeBonusRate?.[type2]
      : undefined;
    const flat1 = type1 ? admission.inquiryTypeBonusPerSubject?.[type1] ?? 0 : undefined;
    const flat2 = type2 ? admission.inquiryTypeBonusPerSubject?.[type2] ?? 0 : undefined;
    const sameTypeRequired = admission.inquiryBonusRequiresSameType;
    const sameTypeKnown = !sameTypeRequired || Boolean(type1 && type2);
    const sameTypeMatched = !sameTypeRequired || (sameTypeKnown && type1 === sameTypeRequired && type2 === sameTypeRequired);
    const effectiveRate1 = !sameTypeKnown ? undefined : sameTypeMatched ? rate1 : 0;
    const effectiveRate2 = !sameTypeKnown ? undefined : sameTypeMatched ? rate2 : 0;
    const valid1 = typeof effectiveRate1 === "number";
    const valid2 = admission.inquirySubjects === 1 || typeof effectiveRate2 === "number";

    if (!valid1 || !valid2) {
      missingRules.push("탐구 과목별 선택유형 또는 가산율 규칙 미입력");
      inquiry1 = undefined;
      inquiry2 = admission.inquirySubjects === 2 ? undefined : inquiry2;
    } else {
      if (inquiry1 != null) inquiry1 = inquiry1 * (1 + effectiveRate1!) + (flat1 ?? 0);
      if (inquiry2 != null && effectiveRate2 != null) inquiry2 = inquiry2 * (1 + effectiveRate2) + (flat2 ?? 0);
      appliedComponents.push("탐구 과목별 선택유형 가산율·과목별 고정 가산점");
    }
  }

  const inquiryComplete = inquiry1 != null && (admission.inquirySubjects === 1 || inquiry2 != null);
  let inquiry: number | undefined;
  if (inquiryComplete) {
    if (admission.inquirySubjects === 1) inquiry = inquiry1;
    else if (admission.inquiryAggregation === "sum") inquiry = inquiry1! + inquiry2!;
    else if (admission.inquiryAggregation === "best") inquiry = Math.max(inquiry1!, inquiry2!);
    else inquiry = (inquiry1! + inquiry2!) / 2;
    appliedComponents.push(admission.inquiryConversionTable ? "탐구 변환표준점수표" : "탐구 점수");
  } else if (admission.inquiryWeight > 0 && !missingRules.some((rule) => rule.includes("탐구 선택유형"))) {
    missingRules.push(
      admission.inquiryConversionRequired
        ? "탐구 변환표준점수표 미등록 또는 백분위 매칭 실패"
        : "탐구 점수 입력·환산값 확인 필요",
    );
  }

  const languageMathScore = admission.languageMathMode === "고득점 우선"
    ? Math.max(
        korean * admission.koreanWeight + math * admission.mathWeight,
        korean * admission.mathWeight + math * admission.koreanWeight,
      )
    : korean * admission.koreanWeight + math * admission.mathWeight;

  const calculationMode = admission.calculationMode ?? "weighted-average";
  const multiplier = admission.subjectScoreMultiplier ?? 1;
  const finalMultiplier = admission.finalScoreMultiplier ?? 1;

  let baseScore = 0;
  let bonusScore = 0;
  let postMultiplierBonus = 0;

  if (calculationMode === "normalized-standard-sum") {
    const maxima = admission.subjectMaximumScores;
    const koreanMax = maxima?.korean;
    const mathMax = maxima?.math;
    const inquiryMax = maxima?.inquiry;
    if (!(typeof koreanMax === "number" && koreanMax > 0)) missingRules.push("당해 연도 국어 표준점수 최고점 미확보");
    if (!(typeof mathMax === "number" && mathMax > 0)) missingRules.push("당해 연도 수학 표준점수 최고점 미확보");
    if (admission.inquiryWeight > 0 && !(typeof inquiryMax === "number" && inquiryMax > 0)) {
      missingRules.push("당해 연도 탐구 변환표준점수 최고점 미확보");
    }
    let normalized = 0;
    if (typeof koreanMax === "number" && koreanMax > 0 && typeof mathMax === "number" && mathMax > 0) {
      if (admission.languageMathMode === "고득점 우선") {
        const a = korean / koreanMax * admission.koreanWeight + math / mathMax * admission.mathWeight;
        const b = korean / koreanMax * admission.mathWeight + math / mathMax * admission.koreanWeight;
        normalized += Math.max(a, b) / 100;
        appliedComponents.push("국어·수학 A/B 고득점 조합 선택");
      } else {
        normalized += korean / koreanMax * admission.koreanWeight / 100;
        normalized += math / mathMax * admission.mathWeight / 100;
      }
    }
    const inquiryNormalized = inquiry != null && typeof inquiryMax === "number" && inquiryMax > 0
      ? inquiry / inquiryMax
      : undefined;
    if (admission.inquiryWeight > 0 && inquiryNormalized == null && !missingRules.some((rule) => rule.includes("탐구"))) {
      missingRules.push("탐구 영역 기준점수 미확보");
    }
    let englishNormalized: number | undefined;
    if (admission.englishWeight > 0) {
      const english = gradePoints(admission.englishGradeTable, score.englishGrade);
      if (english == null) missingRules.push("대학별 영어 등급 환산표 미등록");
      else {
        englishNormalized = english / 100;
        appliedComponents.push("영어 등급 환산");
      }
    }
    if (admission.englishInquiryMode === "고득점 우선" && englishNormalized != null && inquiryNormalized != null) {
      const a = englishNormalized * admission.englishWeight + inquiryNormalized * admission.inquiryWeight;
      const b = englishNormalized * admission.inquiryWeight + inquiryNormalized * admission.englishWeight;
      normalized += Math.max(a, b) / 100;
      appliedComponents.push("영어·탐구 고득점 영역 가중치 선택");
    } else {
      if (inquiryNormalized != null) normalized += inquiryNormalized * admission.inquiryWeight / 100;
      if (englishNormalized != null) normalized += englishNormalized * admission.englishWeight / 100;
    }
    baseScore = normalized;
    if (admission.koreanHistoryRequired) {
      const history = gradePoints(admission.koreanHistoryGradePoints, score.koreanHistoryGrade);
      if (history == null) missingRules.push("대학별 한국사 등급 가산·감점표 미등록");
      else {
        bonusScore += history;
        appliedComponents.push("한국사 등급 반영");
      }
    }
    if (admission.curriculumEvaluationRequired) missingRules.push("대학별 교과평가 점수 미입력");
    if ((admission.studentRecordWeight ?? 0) > 0 && !admission.curriculumEvaluationRequired) missingRules.push("학생부 반영 점수 미입력");
  } else if (calculationMode === "weighted-sum-with-additive-bonuses") {
    const languageMathContribution = admission.languageMathMode === "고득점 우선"
      ? languageMathScore / 100
      : (korean * admission.koreanWeight / 100) + (math * admission.mathWeight / 100);
    const weightedSubjects =
      languageMathContribution +
      (inquiry != null ? inquiry * admission.inquiryWeight / 100 : 0);
    baseScore = weightedSubjects * multiplier;

    if (admission.englishWeight > 0) {
      missingRules.push("가산점형 산식에서 영어 반영비율 설정 확인 필요");
    }
    if (admission.cohortNormalizationRequired) {
      missingRules.push("모집단위별 수능 최고·최저점 기반 상대 환산 자료 미확보");
    }
    if (admission.curriculumEvaluationRequired) {
      missingRules.push("대학별 교과평가 점수 미입력");
    } else if ((admission.studentRecordWeight ?? 0) > 0) {
      const days = score.unexcusedAbsenceDays;
      const attendanceTable = admission.attendanceScoreByAbsenceDays;
      const attendance = days == null || !attendanceTable
        ? undefined
        : [...attendanceTable]
            .sort((a, b) => a.maxDays - b.maxDays)
            .find((row) => days <= row.maxDays)?.score;
      if (attendance == null) {
        missingRules.push("출결 반영 점수 미입력 또는 환산표 미등록");
      } else {
        postMultiplierBonus += attendance;
        appliedComponents.push("미인정 결석 일수 출결 환산");
      }
    }
    if (admission.scienceCombinationAdjustmentRequired) {
      const fallbackType = score.inquiryType && score.inquiryType !== "혼합"
        ? score.inquiryType
        : undefined;
      const type1 = score.inquiry1Type ?? fallbackType;
      const type2 = score.inquiry2Type ?? fallbackType;
      if (!type1 || !type2) {
        missingRules.push("탐구 과목별 유형 입력 필요");
      } else if (type1 === "과탐" && type2 === "과탐") {
        const level1 = score.inquiry1ScienceLevel;
        const level2 = score.inquiry2ScienceLevel;
        if (!level1 || !level2) {
          missingRules.push("과학탐구 과목별 I/II 선택 입력 필요");
        } else {
          const combination = [level1, level2].sort().join("+") as "I+I" | "I+II" | "II+II";
          const adjustment = admission.scienceCombinationBonusPoints?.[combination];
          if (typeof adjustment !== "number") {
            missingRules.push("과학탐구 과목 조합별 조정점수표 미등록");
          } else {
            bonusScore += adjustment;
            appliedComponents.push("과학탐구 조합별 조정점수");
          }
        }
      }
    }
    const english = gradePoints(admission.englishGradeTable, score.englishGrade);
    if (english == null) {
      missingRules.push("대학별 영어 등급 가산점표 미등록");
    } else {
      bonusScore += english;
      appliedComponents.push("영어 등급 가산점");
    }

    if (admission.koreanHistoryRequired) {
      const history = gradePoints(admission.koreanHistoryGradePoints, score.koreanHistoryGrade);
      if (history == null) {
        missingRules.push("대학별 한국사 등급 가산점표 미등록");
      } else {
        bonusScore += history;
        appliedComponents.push("한국사 등급 가산점");
      }
    }
  } else {
    const studentRecordWeight = clamp(admission.studentRecordWeight ?? 0, 0, 100);
    const testWeight = 100 - studentRecordWeight;
    const englishWeight = clamp(admission.englishWeight, 0, testWeight);
    const academicContributionWeight = Math.max(0, testWeight - englishWeight);
    const academicWeight = admission.koreanWeight + admission.mathWeight + (inquiry != null ? admission.inquiryWeight : 0);
    const academicWeightedTotal = languageMathScore + (inquiry != null ? inquiry * admission.inquiryWeight : 0);
    const academicAverage = academicWeight > 0 ? academicWeightedTotal / academicWeight : 0;

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
    baseScore = includedWeight > 0 ? (weightedTotal / includedWeight) * 10 : academicAverage * 10;

    if (studentRecordWeight > 0) missingRules.push("학생부 성적 미입력");

    if (admission.koreanHistoryRequired) {
      const history = gradePoints(admission.koreanHistoryGradePoints, score.koreanHistoryGrade);
      if (history == null) {
        missingRules.push("대학별 한국사 등급 가산·감점표 미등록");
      } else {
        bonusScore += history * 10;
        appliedComponents.push("한국사 등급 반영");
      }
    } else if (admission.koreanHistoryGradePoints) {
      const history = gradePoints(admission.koreanHistoryGradePoints, score.koreanHistoryGrade);
      if (history != null) {
        bonusScore += history * 10;
        appliedComponents.push("한국사 등급 반영");
      }
    }
  }

  if (admission.mathChoiceBonusRequired && !admission.mathChoiceBonusRate) {
    const points = score.mathType ? admission.mathChoiceBonusPoints?.[score.mathType] : undefined;
    if (typeof points !== "number") missingRules.push("수학 선택과목 가산점 규칙 미등록");
    else {
      bonusScore += points * 10;
      appliedComponents.push("수학 선택과목 가산점");
    }
  } else if (!admission.mathChoiceBonusRate && score.mathType && admission.mathChoiceBonusPoints) {
    const points = admission.mathChoiceBonusPoints[score.mathType];
    if (typeof points === "number") {
      bonusScore += points * 10;
      appliedComponents.push("수학 선택과목 가산점");
    }
  }

  if (admission.inquiryTypeBonusPoints) {
    const points = score.inquiryType ? admission.inquiryTypeBonusPoints[score.inquiryType] : undefined;
    if (typeof points === "number") {
      bonusScore += points * 10;
      appliedComponents.push("탐구 선택유형 가산점");
    }
  }

  baseScore *= finalMultiplier;
  if (!admission.gradeAdjustmentsAfterFinalMultiplier) bonusScore *= finalMultiplier;
  const totalScore = baseScore + bonusScore + postMultiplierBonus;
  const calculationVerified =
    admission.calculationVerified === true &&
    missingRules.length === 0 &&
    Number.isFinite(totalScore);

  return {
    admissionId: admission.id,
    baseScore,
    bonus: bonusScore + postMultiplierBonus,
    totalScore,
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
