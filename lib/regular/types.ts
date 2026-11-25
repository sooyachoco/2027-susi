export type AdmissionGroup = "가" | "나" | "다";
export type ScoreMetric = "백분위" | "표준점수" | "등급";
export type GradeConversionTable = Partial<Record<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9, number>>;
export type RegularTier = "상향" | "소신" | "적정" | "안정" | "판정 보류";

export type RegularStudentProfile = {
  desiredMajor: string;
  koreanStandard: number | null;
  koreanPercentile: number | null;
  koreanGrade?: number | null;
  mathStandard: number | null;
  mathPercentile: number | null;
  mathGrade?: number | null;
  inquiry1Standard: number | null;
  inquiry2Standard: number | null;
  inquiry1Percentile: number | null;
  inquiry2Percentile: number | null;
  inquiry1Grade?: number | null;
  inquiry2Grade?: number | null;
  englishGrade: number | null;
  koreanHistoryGrade: number | null;
  mathChoice: "확통" | "미적분" | "기하" | "미선택";
  inquiryType: "사탐" | "과탐" | "혼합" | "미선택";
  inquiry1Type: "사탐" | "과탐" | "직탐" | "미선택";
  inquiry2Type: "사탐" | "과탐" | "직탐" | "미선택";
  inquiry1ScienceLevel: "I" | "II" | "미선택";
  inquiry2ScienceLevel: "I" | "II" | "미선택";
  unexcusedAbsenceDays: number | null;
};

export type RegularSubjectMetrics = {
  korean?: ScoreMetric;
  math?: ScoreMetric;
  inquiry?: ScoreMetric;
};

export type RegularAdmission = {
  id: string;
  universityId: string;
  universityName: string;
  region: string;
  department: string;
  majorGroup: string;
  group: AdmissionGroup;
  recruitmentCount?: number;
  /** Legacy fallback only. Prefer subjectMetrics for independently selected subject scales. */
  scoreMetric: ScoreMetric;
  subjectMetrics?: RegularSubjectMetrics;
  /** Official grade-to-score tables for grade-based subject metrics. */
  subjectGradeTables?: { korean?: GradeConversionTable; math?: GradeConversionTable; inquiry?: GradeConversionTable };
  /** Published maximum standard/conversion score for each domain; never substitute prior-year maxima. */
  subjectMaximumScores?: { korean?: number; math?: number; inquiry?: number };
  koreanWeight: number;
  mathWeight: number;
  englishWeight: number;
  inquiryWeight: number;
  inquirySubjects: 1 | 2;
  inquiryAggregation?: "mean" | "sum" | "best";
  calculationMode?: "weighted-average" | "weighted-sum-with-additive-bonuses" | "normalized-standard-sum";
  subjectScoreMultiplier?: number;
  finalScoreMultiplier?: number;
  /** Fixed base points added after the normalized weighted component. */
  fixedBaseScore?: number;
  /** Some universities subtract English/history deductions after scaling the raw CSAT subtotal. */
  gradeAdjustmentsAfterFinalMultiplier?: boolean;
  cohortNormalizationRequired?: boolean;
  curriculumEvaluationRequired?: boolean;
  scienceCombinationAdjustmentRequired?: boolean;
  scienceCombinationBonusPoints?: Partial<Record<"I+I" | "I+II" | "II+II", number>>;
  /** Exact official conversion table: percentile (0-100) -> converted inquiry score. */
  inquiryConversionTable?: Record<string, number>;
  inquiryConversionRequired?: boolean;
  /** Official table is scheduled for release after CSAT results; not an input-data defect yet. */
  inquiryConversionPending?: boolean;
  /** Official English grade conversion is announced separately after CSAT results. */
  englishConversionPending?: boolean;
  koreanHistoryRequired?: boolean;
  mathChoiceBonusRequired?: boolean;
  inquiryTypeBonusRequired?: boolean;
  mathChoiceBonusPoints?: Partial<Record<"미적분" | "기하" | "확률과통계", number>>;
  /** Multiplicative bonus applied to the math standard score before weighting. */
  mathChoiceBonusRate?: Partial<Record<"미적분" | "기하" | "확률과통계", number>>;
  inquiryTypeBonusPoints?: Partial<Record<"사탐" | "과탐" | "혼합", number>>;
  /** Multiplicative bonus rate applied to each converted inquiry subject, e.g. 0.05 for 5%. */
  inquiryTypeBonusRate?: Partial<Record<"사탐" | "과탐" | "직탐", number>>;
  /** Apply inquiry type bonus only when both subjects match this type. */
  inquiryBonusRequiresSameType?: "사탐" | "과탐";
  /** Flat additive points applied to each inquiry subject before aggregation. */
  inquiryTypeBonusPerSubject?: Partial<Record<"사탐" | "과탐" | "직탐", number>>;
  /** Attendance score added after the weighted CSAT score; sorted by maxDays ascending. */
  attendanceScoreByAbsenceDays?: Array<{ maxDays: number; score: number }>;
  /** Maximum value of the official English conversion table; defaults to 100. */
  englishMaximumScore?: number;
  /** Official grade-to-score table, on the same 0-100 subject-score scale as the weighted calculation. */
  englishGradeTable?: Partial<Record<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9, number>>;
  /** Official Korean-history additive points on the final 100-point pre-scale. */
  koreanHistoryGradePoints?: Partial<Record<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9, number>>;
  languageMathMode?: "고득점 우선";
  englishInquiryMode?: "고득점 우선";
  mathInquiryMode?: "고득점 우선";
  alternateWeighting?: { koreanWeight: number; mathWeight: number; englishWeight: number; inquiryWeight: number };
  rankedAreaWeights?: number[];
  /** Areas that must remain in the ranked subset, e.g. math when the top 3 include mandatory math. */
  rankedAreaRequired?: Array<"korean" | "math" | "english" | "inquiry">;
  topAreaWeights?: { areas: Array<"korean" | "math" | "english" | "inquiry">; count: number; weight: number };
  /** Requires an applicant-specific school-violence penalty/disqualification input. */
  schoolViolencePenaltyRequired?: boolean;
  /** University-specific school-violence penalty/disqualification rule shown when applicant input is unavailable. */
  schoolViolencePenaltyNote?: string;
  /** Requires the practical-exam score; CSAT-only subtotal is not the final admission score. */
  practicalEvaluationRequired?: boolean;
  /** Requires a separately scored interview; a CSAT-only subtotal is not a final admission score. */
  interviewEvaluationRequired?: boolean;
  /** Exact missing interview-score message. */
  interviewEvaluationNote?: string;
  /** Accurate missing-score message for practical components with university-specific weights. */
  practicalEvaluationNote?: string;
  /** Requires a separate pass/fail eligibility check that is not a CSAT score component. */
  additionalEligibilityRequired?: boolean;
  /** Exact university-specific eligibility requirement shown when the check is not recorded. */
  additionalEligibilityNote?: string;
  inquiryTopSubjectBonusRate?: number;
  inquiryTopSubjectBonusType?: "사탐" | "과탐" | "직탐";
  studentRecordWeight?: number;
  expectedCutline?: number;
  expectedCutline95?: number;
  expectedCutline70?: number;
  benchmarkYear?: number;
  benchmarkCutline70?: number;
  benchmarkCutline95?: number;
  benchmarkTotalScore?: number;
  /** Official source page for the prior-year result table used as a comparable benchmark. */
  benchmarkSourceUrl?: string;
  /** True only when benchmark and current calculation use the same official scoring scale. */
  benchmarkComparable?: boolean;
  /** True only after every subject conversion and bonus has been checked against the 2027 guide. */
  calculationVerified?: boolean;
  benchmarkDepartment?: string;
  note?: string;
  sourceUrl: string;
  verifiedAt: string;
};

export type RegularRecommendation = {
  admissionId: string;
  universityName: string;
  department: string;
  group: AdmissionGroup;
  score: number;
  recruitmentCount?: number;
  tier: RegularTier;
  reason: string;
  calculationVerified: boolean;
  hasComparableBenchmark: boolean;
  benchmarkGap: number | null;
  benchmarkYear?: number;
  benchmarkCutline70?: number;
  benchmarkSourceUrl?: string;
  benchmarkDepartment?: string;
  missingRules: string[];
  appliedComponents: string[];
};

export const DEFAULT_REGULAR_PROFILE: RegularStudentProfile = {
  desiredMajor: "",
  koreanStandard: null,
  koreanPercentile: null,
  koreanGrade: null,
  mathStandard: null,
  mathPercentile: null,
  mathGrade: null,
  inquiry1Standard: null,
  inquiry2Standard: null,
  inquiry1Percentile: null,
  inquiry2Percentile: null,
  inquiry1Grade: null,
  inquiry2Grade: null,
  englishGrade: null,
  koreanHistoryGrade: null,
  mathChoice: "미선택",
  inquiryType: "미선택",
  inquiry1Type: "미선택",
  inquiry2Type: "미선택",
  inquiry1ScienceLevel: "미선택",
  inquiry2ScienceLevel: "미선택",
  unexcusedAbsenceDays: null,
};
