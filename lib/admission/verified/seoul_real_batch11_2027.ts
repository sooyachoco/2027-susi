import type { Admission, Department, University } from "../types";

// 2027학년도 최종 수시모집요강 기준 서울권 검증 데이터
// 삼육대학교 — 확인된 최종 수치만 반영. 미확인 전형별 수치는 추정하지 않음.
export const seoulRealBatch11Universities: University[] = [
  { id: "sahmyook-2027", name: "삼육대학교", region: "서울" },
];

export const seoulRealBatch11Departments: Department[] = [
  { id: "sahmyook-all-2027", universityId: "sahmyook-2027", name: "전체모집단위", category: "전체" },
];

const source = {
  type: "university" as const,
  academicYear: 2027,
  document: "2027학년도 수시모집요강",
  verifiedAt: "2026-09-07",
  confidence: 0.99,
  url: "https://ipsi.syu.ac.kr/2016_syu/pages/index.asp?mj=01&p=8",
};

export const seoulRealBatch11Admissions: Admission[] = [
  { id: "sahmyook-2027-total", universityId: "sahmyook-2027", departmentId: "sahmyook-all-2027", academicYear: 2027, name: "수시 전체", type: "기타", recruitmentCount: 1029, source, isMock: false, isAggregate: true },
  { id: "sahmyook-2027-essay", universityId: "sahmyook-2027", departmentId: "sahmyook-all-2027", academicYear: 2027, name: "논술우수자", type: "논술", recruitmentCount: 277, source, isMock: false, isAggregate: true },
  { id: "sahmyook-2027-seum", universityId: "sahmyook-2027", departmentId: "sahmyook-all-2027", academicYear: 2027, name: "세움인재", type: "학종", recruitmentCount: 231, source, isMock: false, isAggregate: true },
  { id: "sahmyook-2027-school-recommend", universityId: "sahmyook-2027", departmentId: "sahmyook-all-2027", academicYear: 2027, name: "학교장추천", type: "교과", recruitmentCount: 131, source, isMock: false, isAggregate: true },
];
