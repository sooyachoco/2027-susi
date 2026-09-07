import type { Admission, Department, University } from "../types";

/**
 * 2027학년도 연세대학교 서울캠퍼스 수시 검증 데이터
 * 공식 2027 서울캠퍼스 입학전형 시행계획 기준 전형별 합계.
 * 학과별 인원은 추정하지 않고 대학 전체 합계만 기록한다.
 */
export const seoulRealBatch21Universities: University[] = [
  { id: "yonsei-2027", name: "연세대학교", region: "서울" },
];

export const seoulRealBatch21Departments: Department[] = [
  { id: "yonsei-all-2027", universityId: "yonsei-2027", name: "연세대학교 전체", category: "전체" },
];

const source = {
  type: "university" as const,
  academicYear: 2027,
  document: "2027학년도 연세대학교 서울캠퍼스 입학전형 시행계획",
  verifiedAt: "2026-09-07",
  confidence: 1,
  url: "https://www2.yonsei.ac.kr/entrance/plan/2027_plan.pdf",
};

export const seoulRealBatch21Admissions: Admission[] = [
  { id: "yonsei-2027-recommend", universityId: "yonsei-2027", departmentId: "yonsei-all-2027", academicYear: 2027, name: "추천형", type: "교과", recruitmentCount: 512, studentRecordWeight: 100, csatMinimum: { enabled: true }, source, isAggregate: true },
  { id: "yonsei-2027-activity", universityId: "yonsei-2027", departmentId: "yonsei-all-2027", academicYear: 2027, name: "활동우수형", type: "학종", recruitmentCount: 766, interview: true, documentWeight: 60, csatMinimum: { enabled: true }, source, isAggregate: true },
  { id: "yonsei-2027-international", universityId: "yonsei-2027", departmentId: "yonsei-all-2027", academicYear: 2027, name: "국제형", type: "학종", recruitmentCount: 175, interview: true, documentWeight: 60, csatMinimum: { enabled: true }, source, isAggregate: true },
  { id: "yonsei-2027-international-talent", universityId: "yonsei-2027", departmentId: "yonsei-all-2027", academicYear: 2027, name: "국제인재", type: "학종", recruitmentCount: 79, interview: true, documentWeight: 60, source, isAggregate: true },
  { id: "yonsei-2027-opportunity", universityId: "yonsei-2027", departmentId: "yonsei-all-2027", academicYear: 2027, name: "기회균형", type: "학종", recruitmentCount: 195, documentWeight: 100, source, isAggregate: true },
  { id: "yonsei-2027-essay", universityId: "yonsei-2027", departmentId: "yonsei-all-2027", academicYear: 2027, name: "논술전형", type: "논술", recruitmentCount: 288, source, isAggregate: true },
  { id: "yonsei-2027-sports", universityId: "yonsei-2027", departmentId: "yonsei-all-2027", academicYear: 2027, name: "특기자전형(체육인재)", type: "기타", recruitmentCount: 38, source, isAggregate: true },
  { id: "yonsei-2027-special-education", universityId: "yonsei-2027", departmentId: "yonsei-all-2027", academicYear: 2027, name: "특수교육대상자", type: "기타", recruitmentCount: 13, source, isAggregate: true },
];
