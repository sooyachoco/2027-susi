export type AdmissionGroup = "가" | "나" | "다";
export type ScoreMetric = "백분위" | "표준점수";
export type RegularTier = "상향" | "소신" | "적정" | "안정";

export type RegularStudentProfile = {
  desiredMajor: string;
  koreanStandard: number | null;
  koreanPercentile: number | null;
  mathStandard: number | null;
  mathPercentile: number | null;
  inquiry1Percentile: number | null;
  inquiry2Percentile: number | null;
  englishGrade: number | null;
  koreanHistoryGrade: number | null;
  mathChoice: "확통" | "미적분" | "기하" | "미선택";
  inquiryType: "사탐" | "과탐" | "혼합" | "미선택";
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
  scoreMetric: ScoreMetric;
  koreanWeight: number;
  mathWeight: number;
  englishWeight: number;
  inquiryWeight: number;
  inquirySubjects: 1 | 2;
  studentRecordWeight?: number;
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
  tier: RegularTier;
  reason: string;
};

export const DEFAULT_REGULAR_PROFILE: RegularStudentProfile = {
  desiredMajor: "",
  koreanStandard: null,
  koreanPercentile: null,
  mathStandard: null,
  mathPercentile: null,
  inquiry1Percentile: null,
  inquiry2Percentile: null,
  englishGrade: null,
  koreanHistoryGrade: null,
  mathChoice: "미선택",
  inquiryType: "미선택",
};
