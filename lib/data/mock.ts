import type { Admission, RecommendationTier, StudentProfile, University, Department } from "@/lib/types";

/** UX prototype data only. Never use as real admission results. */
export const MOCK_UNIVERSITIES: University[] = [
  { id: "u-cau", name: "중앙대학교", region: "서울" },
  { id: "u-uos", name: "서울시립대학교", region: "서울" },
  { id: "u-kku", name: "건국대학교", region: "서울" },
  { id: "u-dgu", name: "동국대학교", region: "서울" },
  { id: "u-ssu", name: "숭실대학교", region: "서울" },
  { id: "u-kw", name: "광운대학교", region: "서울" },
];

export const MOCK_DEPARTMENTS: Department[] = [
  { id: "d-cau-sw", universityId: "u-cau", name: "소프트웨어학부", category: "자연계", majorGroup: "컴퓨터·소프트웨어" },
  { id: "d-uos-cs", universityId: "u-uos", name: "컴퓨터과학부", category: "자연계", majorGroup: "컴퓨터·소프트웨어" },
  { id: "d-kku-ce", universityId: "u-kku", name: "컴퓨터공학부", category: "자연계", majorGroup: "컴퓨터·소프트웨어" },
  { id: "d-dgu-ai", universityId: "u-dgu", name: "AI융합학부", category: "자연계", majorGroup: "컴퓨터·소프트웨어" },
  { id: "d-ssu-sw", universityId: "u-ssu", name: "소프트웨어학부", category: "자연계", majorGroup: "컴퓨터·소프트웨어" },
  { id: "d-kw-cie", universityId: "u-kw", name: "컴퓨터정보공학부", category: "자연계", majorGroup: "컴퓨터·소프트웨어" },
  { id: "d-cau-biz", universityId: "u-cau", name: "경영학부", category: "인문계", majorGroup: "경영·경제" },
  { id: "d-uos-biz", universityId: "u-uos", name: "경영학부", category: "인문계", majorGroup: "경영·경제" },
  { id: "d-kku-biz", universityId: "u-kku", name: "경영학과", category: "인문계", majorGroup: "경영·경제" },
  { id: "d-dgu-biz", universityId: "u-dgu", name: "경영학과", category: "인문계", majorGroup: "경영·경제" },
  { id: "d-ssu-biz", universityId: "u-ssu", name: "경영학부", category: "인문계", majorGroup: "경영·경제" },
  { id: "d-kw-biz", universityId: "u-kw", name: "경영학부", category: "인문계", majorGroup: "경영·경제" },
];

const MOCK_SOURCE = { type: "other" as const, document: "mock", collectedAt: "2026-08-25", confidence: 0 };
export const MOCK_ADMISSIONS: Admission[] = [
  { id: "a-cau-sw", universityId: "u-cau", departmentId: "d-cau-sw", academicYear: 2027, name: "학생부종합(다빈치형인재)", type: "학종", interview: false, csatMinimum: { enabled: true, description: "mock" }, source: MOCK_SOURCE, isMock: true, majorGroup: "컴퓨터·소프트웨어" },
  { id: "a-uos-cs", universityId: "u-uos", departmentId: "d-uos-cs", academicYear: 2027, name: "학생부종합", type: "학종", interview: true, csatMinimum: { enabled: false }, source: MOCK_SOURCE, isMock: true, majorGroup: "컴퓨터·소프트웨어" },
  { id: "a-kku-ce", universityId: "u-kku", departmentId: "d-kku-ce", academicYear: 2027, name: "학생부교과", type: "교과", csatMinimum: { enabled: true, description: "mock" }, source: MOCK_SOURCE, isMock: true, majorGroup: "컴퓨터·소프트웨어" },
  { id: "a-dgu-ai", universityId: "u-dgu", departmentId: "d-dgu-ai", academicYear: 2027, name: "학생부종합(Do Dream)", type: "학종", interview: true, csatMinimum: { enabled: false }, source: MOCK_SOURCE, isMock: true, majorGroup: "컴퓨터·소프트웨어" },
  { id: "a-ssu-sw", universityId: "u-ssu", departmentId: "d-ssu-sw", academicYear: 2027, name: "학생부교과", type: "교과", csatMinimum: { enabled: true, description: "mock" }, source: MOCK_SOURCE, isMock: true, majorGroup: "컴퓨터·소프트웨어" },
  { id: "a-kw-cie", universityId: "u-kw", departmentId: "d-kw-cie", academicYear: 2027, name: "학생부교과(지역균형)", type: "교과", csatMinimum: { enabled: false }, source: MOCK_SOURCE, isMock: true, majorGroup: "컴퓨터·소프트웨어" },
  { id: "a-cau-biz", universityId: "u-cau", departmentId: "d-cau-biz", academicYear: 2027, name: "학생부종합", type: "학종", interview: false, csatMinimum: { enabled: false }, source: MOCK_SOURCE, isMock: true, majorGroup: "경영·경제" },
  { id: "a-uos-biz", universityId: "u-uos", departmentId: "d-uos-biz", academicYear: 2027, name: "학생부종합", type: "학종", interview: true, csatMinimum: { enabled: false }, source: MOCK_SOURCE, isMock: true, majorGroup: "경영·경제" },
  { id: "a-kku-biz", universityId: "u-kku", departmentId: "d-kku-biz", academicYear: 2027, name: "학생부교과", type: "교과", csatMinimum: { enabled: false }, source: MOCK_SOURCE, isMock: true, majorGroup: "경영·경제" },
  { id: "a-dgu-biz", universityId: "u-dgu", departmentId: "d-dgu-biz", academicYear: 2027, name: "학생부종합", type: "학종", interview: true, csatMinimum: { enabled: false }, source: MOCK_SOURCE, isMock: true, majorGroup: "경영·경제" },
  { id: "a-ssu-biz", universityId: "u-ssu", departmentId: "d-ssu-biz", academicYear: 2027, name: "학생부교과", type: "교과", csatMinimum: { enabled: true, description: "mock" }, source: MOCK_SOURCE, isMock: true, majorGroup: "경영·경제" },
  { id: "a-kw-biz", universityId: "u-kw", departmentId: "d-kw-biz", academicYear: 2027, name: "학생부교과(지역균형)", type: "교과", csatMinimum: { enabled: false }, source: MOCK_SOURCE, isMock: true, majorGroup: "경영·경제" },
];

export type MockRecommendationSeed = { admissionId: string; tier: RecommendationTier; baseScore: number; reason: string };
export const MOCK_RECOMMENDATION_SEEDS: MockRecommendationSeed[] = [];

/** First-run template: no user-entered values are prefilled. */
export const DEFAULT_STUDENT_PROFILE: StudentProfile = {
  gradeAverage: null,
  track: null,
  desiredMajor: "",
  mockAverage: null,
  studentRecordLink: null,
  csatMinimumChance: null,
};
