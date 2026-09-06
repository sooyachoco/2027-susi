import type { Admission, Department, University } from "../types";

// 2027학년도 최종 수시모집요강 기준 서울권 검증 데이터
// 삼육대학교 — 최종 모집인원 1,029명. 전형별 일부 수치는 공식 최종 안내에서 교차 확인된 항목만 반영.
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
  { id: "sahmyook-2027-essay", universityId: "sahmyook-2027", departmentId: "sahmyook-all-2027", academicYear: 2027, name: "논술우수자", type: "논술", recruitmentCount: 277, csatMinimum: { enabled: true }, source, isMock: false, isAggregate: true },
  { id: "sahmyook-2027-seum", universityId: "sahmyook-2027", departmentId: "sahmyook-all-2027", academicYear: 2027, name: "세움인재", type: "학종", recruitmentCount: 231, documentWeight: 60, interview: true, csatMinimum: { enabled: true }, source, isMock: false, isAggregate: true },
  { id: "sahmyook-2027-school-recommend", universityId: "sahmyook-2027", departmentId: "sahmyook-all-2027", academicYear: 2027, name: "학교장추천", type: "교과", recruitmentCount: 131, studentRecordWeight: 100, csatMinimum: { enabled: true }, source, isMock: false, isAggregate: true },
  { id: "sahmyook-2027-pastor", universityId: "sahmyook-2027", departmentId: "sahmyook-all-2027", academicYear: 2027, name: "재림교회목회자추천", type: "학종", recruitmentCount: 117, documentWeight: 60, interview: true, csatMinimum: { enabled: true }, source, isMock: false, isAggregate: true },
  { id: "sahmyook-2027-opportunity1", universityId: "sahmyook-2027", departmentId: "sahmyook-all-2027", academicYear: 2027, name: "기회균형Ⅰ", type: "학종", recruitmentCount: 38, documentWeight: 60, interview: true, csatMinimum: { enabled: false }, source, isMock: false, isAggregate: true },
  { id: "sahmyook-2027-rural", universityId: "sahmyook-2027", departmentId: "sahmyook-all-2027", academicYear: 2027, name: "농어촌", type: "교과", recruitmentCount: 39, studentRecordWeight: 100, csatMinimum: { enabled: false }, source, isMock: false, isAggregate: true },
];
