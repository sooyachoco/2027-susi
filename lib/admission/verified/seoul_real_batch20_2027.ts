import type { Admission, Department, University } from "../types";

/**
 * 2027학년도 성균관대학교 수시모집 검증 데이터
 * - 수시 전체 2,378명
 * - 학생부종합 1,487명 / 학생부교과 419명 / 논술 376명 / 실기·실적 96명
 * - 대학 전체 전형 합계만 기록하여 학과별 인원을 추정하지 않는다.
 */

export const seoulRealBatch20Universities: University[] = [
  { id: "skku-2027", name: "성균관대학교", region: "서울" },
];

export const seoulRealBatch20Departments: Department[] = [
  { id: "skku-all-2027", universityId: "skku-2027", name: "성균관대학교 전체", category: "전체" },
];

const source = {
  type: "university" as const,
  academicYear: 2027,
  document: "2027학년도 성균관대학교 수시 모집요강",
  verifiedAt: "2026-09-07",
  confidence: 1,
  url: "https://admission.skku.edu/admission/html/rolling/noticeView.html?idx=59468",
};

export const seoulRealBatch20Admissions: Admission[] = [
  { id: "skku-2027-yungin", universityId: "skku-2027", departmentId: "skku-all-2027", academicYear: 2027, name: "융합인재", type: "학종", recruitmentCount: 329, documentWeight: 100, csatMinimum: { enabled: true }, source, isAggregate: true },
  { id: "skku-2027-tamgu", universityId: "skku-2027", departmentId: "skku-all-2027", academicYear: 2027, name: "탐구인재", type: "학종", recruitmentCount: 589, documentWeight: 100, source, isAggregate: true },
  { id: "skku-2027-sungkyun", universityId: "skku-2027", departmentId: "skku-all-2027", academicYear: 2027, name: "성균인재", type: "학종", recruitmentCount: 199, interview: true, documentWeight: 60, source, isAggregate: true },
  { id: "skku-2027-science", universityId: "skku-2027", departmentId: "skku-all-2027", academicYear: 2027, name: "과학인재", type: "학종", recruitmentCount: 155, interview: true, documentWeight: 60, source, isAggregate: true },
  { id: "skku-2027-opportunity", universityId: "skku-2027", departmentId: "skku-all-2027", academicYear: 2027, name: "기회균형", type: "학종", recruitmentCount: 28, documentWeight: 100, source, isAggregate: true },
  { id: "skku-2027-special", universityId: "skku-2027", departmentId: "skku-all-2027", academicYear: 2027, name: "특별전형(정원외)", type: "학종", recruitmentCount: 187, source, isAggregate: true },
  { id: "skku-2027-recommend", universityId: "skku-2027", departmentId: "skku-all-2027", academicYear: 2027, name: "추천인재", type: "교과", recruitmentCount: 419, studentRecordWeight: 100, source, isAggregate: true },
  { id: "skku-2027-essay", universityId: "skku-2027", departmentId: "skku-all-2027", academicYear: 2027, name: "논술우수", type: "논술", recruitmentCount: 376, source, isAggregate: true },
  { id: "skku-2027-practical", universityId: "skku-2027", departmentId: "skku-all-2027", academicYear: 2027, name: "실기·실적(예체능)", type: "기타", recruitmentCount: 96, source, isAggregate: true },
];
