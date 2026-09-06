import type { Admission, Department, University } from "../types";

// 2027학년도 서울권 검증 데이터 - 이화여자대학교 / 중앙대학교 서울캠퍼스
// 2027학년도 최종 수시모집요강 및 대학 입학처 자료에서 확인한 모집인원만 반영.
export const seoulRealBatch14Universities: University[] = [
  { id: "ewha-2027", name: "이화여자대학교", region: "서울" },
  { id: "cau-2027", name: "중앙대학교", region: "서울" },
];

export const seoulRealBatch14Departments: Department[] = [
  { id: "ewha-all-2027", universityId: "ewha-2027", name: "전체모집단위", category: "전체" },
  { id: "cau-all-2027", universityId: "cau-2027", name: "전체모집단위", category: "전체" },
];

const ewhaSource = {
  type: "university" as const,
  academicYear: 2027,
  document: "2027학년도 이화여자대학교 수시모집요강",
  verifiedAt: "2026-09-07",
  confidence: 0.99,
  url: "https://admission.ewha.ac.kr/upload/GUIDES/20260602125244F7AFE4.pdf",
};

const cauSource = {
  type: "university" as const,
  academicYear: 2027,
  document: "2027학년도 중앙대학교 입학전형시행계획 및 수시모집요강",
  verifiedAt: "2026-09-07",
  confidence: 0.99,
  url: "https://admission.cau.ac.kr/",
};

export const seoulRealBatch14Admissions: Admission[] = [
  // 이화여자대학교: 수시 정원내 2,092명. 대학 전체 모집인원 행이므로 추천 후보에서는 제외.
  { id: "ewha-2027-school-recommend", universityId: "ewha-2027", departmentId: "ewha-all-2027", academicYear: 2027, name: "고교추천전형", type: "교과", recruitmentCount: 377, studentRecordWeight: 100, csatMinimum: { enabled: true }, source: ewhaSource, isMock: false, isAggregate: true },
  { id: "ewha-2027-future-doc", universityId: "ewha-2027", departmentId: "ewha-all-2027", academicYear: 2027, name: "미래인재전형-서류형", type: "학종", recruitmentCount: 909, documentWeight: 100, csatMinimum: { enabled: true }, source: ewhaSource, isMock: false, isAggregate: true },
  { id: "ewha-2027-future-interview", universityId: "ewha-2027", departmentId: "ewha-all-2027", academicYear: 2027, name: "미래인재전형-면접형", type: "학종", recruitmentCount: 209, documentWeight: 70, interview: true, source: ewhaSource, isMock: false, isAggregate: true },
  { id: "ewha-2027-equal-opportunity", universityId: "ewha-2027", departmentId: "ewha-all-2027", academicYear: 2027, name: "고른기회전형", type: "학종", recruitmentCount: 164, documentWeight: 100, source: ewhaSource, isMock: false, isAggregate: true },
  { id: "ewha-2027-social-contributor", universityId: "ewha-2027", departmentId: "ewha-all-2027", academicYear: 2027, name: "사회기여자전형", type: "학종", recruitmentCount: 16, documentWeight: 100, source: ewhaSource, isMock: false, isAggregate: true },
  { id: "ewha-2027-essay", universityId: "ewha-2027", departmentId: "ewha-all-2027", academicYear: 2027, name: "논술전형", type: "논술", recruitmentCount: 297, csatMinimum: { enabled: true }, source: ewhaSource, isMock: false, isAggregate: true },
  { id: "ewha-2027-practical", universityId: "ewha-2027", departmentId: "ewha-all-2027", academicYear: 2027, name: "예체능실기전형", type: "기타", recruitmentCount: 81, source: ewhaSource, isMock: false, isAggregate: true },
  { id: "ewha-2027-arts-record", universityId: "ewha-2027", departmentId: "ewha-all-2027", academicYear: 2027, name: "예체능서류전형", type: "학종", recruitmentCount: 39, documentWeight: 100, source: ewhaSource, isMock: false, isAggregate: true },

  // 중앙대학교 서울캠퍼스: 2027 수시 전체 2,862명. 전형별 대학 전체 모집인원 행.
  { id: "cau-2027-region", universityId: "cau-2027", departmentId: "cau-all-2027", academicYear: 2027, name: "학생부교과(지역균형)", type: "교과", recruitmentCount: 508, studentRecordWeight: 100, source: cauSource, isMock: false, isAggregate: true },
  { id: "cau-2027-convergence", universityId: "cau-2027", departmentId: "cau-all-2027", academicYear: 2027, name: "CAU융합형인재", type: "학종", recruitmentCount: 378, documentWeight: 100, source: cauSource, isMock: false, isAggregate: true },
  { id: "cau-2027-exploration", universityId: "cau-2027", departmentId: "cau-all-2027", academicYear: 2027, name: "CAU탐구형인재", type: "학종", recruitmentCount: 512, documentWeight: 100, source: cauSource, isMock: false, isAggregate: true },
  { id: "cau-2027-growth", universityId: "cau-2027", departmentId: "cau-all-2027", academicYear: 2027, name: "성장형인재", type: "학종", recruitmentCount: 108, documentWeight: 70, interview: true, csatMinimum: { enabled: true }, source: cauSource, isMock: false, isAggregate: true },
  { id: "cau-2027-opportunity", universityId: "cau-2027", departmentId: "cau-all-2027", academicYear: 2027, name: "어울림+기회균형", type: "학종", recruitmentCount: 480, documentWeight: 100, source: cauSource, isMock: false, isAggregate: true },
  { id: "cau-2027-essay-general", universityId: "cau-2027", departmentId: "cau-all-2027", academicYear: 2027, name: "논술(일반형)", type: "논술", recruitmentCount: 403, csatMinimum: { enabled: true }, source: cauSource, isMock: false, isAggregate: true },
  { id: "cau-2027-essay-creative", universityId: "cau-2027", departmentId: "cau-all-2027", academicYear: 2027, name: "논술(창의형)", type: "논술", recruitmentCount: 86, source: cauSource, isMock: false, isAggregate: true },
  { id: "cau-2027-practical", universityId: "cau-2027", departmentId: "cau-all-2027", academicYear: 2027, name: "실기·실적위주", type: "기타", recruitmentCount: 387, source: cauSource, isMock: false, isAggregate: true },
];
