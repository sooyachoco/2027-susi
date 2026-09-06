import type { Admission, Department, University } from "../types";

// 2027학년도 서울권 검증 데이터 - 한국외국어대학교 서울캠퍼스
// 서울캠퍼스 전형별 합계. 대학 전체 합계가 아닌 서울캠퍼스 기준으로 분리.
export const seoulRealBatch16Universities: University[] = [
  { id: "hufs-seoul-2027", name: "한국외국어대학교", region: "서울" },
];

export const seoulRealBatch16Departments: Department[] = [
  { id: "hufs-seoul-all-2027", universityId: "hufs-seoul-2027", name: "전체모집단위", category: "전체" },
];

const source = {
  type: "university" as const,
  academicYear: 2027,
  document: "2027학년도 수시모집요강",
  verifiedAt: "2026-09-07",
  confidence: 0.98,
  url: "https://adms.hufs.ac.kr/",
};

export const seoulRealBatch16Admissions: Admission[] = [
  { id: "hufs-2027-school-recommend", universityId: "hufs-seoul-2027", departmentId: "hufs-seoul-all-2027", academicYear: 2027, name: "학교장추천전형", type: "교과", recruitmentCount: 198, studentRecordWeight: 100, csatMinimum: { enabled: true }, source, isMock: false, isAggregate: true },
  { id: "hufs-2027-interview", universityId: "hufs-seoul-2027", departmentId: "hufs-seoul-all-2027", academicYear: 2027, name: "학생부종합전형(면접형)", type: "학종", recruitmentCount: 277, interview: true, documentWeight: 50, source, isMock: false, isAggregate: true },
  { id: "hufs-2027-document", universityId: "hufs-seoul-2027", departmentId: "hufs-seoul-all-2027", academicYear: 2027, name: "학생부종합전형(서류형)", type: "학종", recruitmentCount: 303, documentWeight: 100, source, isMock: false, isAggregate: true },
  { id: "hufs-2027-opportunity", universityId: "hufs-seoul-2027", departmentId: "hufs-seoul-all-2027", academicYear: 2027, name: "기회균형전형", type: "학종", recruitmentCount: 68, documentWeight: 100, source, isMock: false, isAggregate: true },
  { id: "hufs-2027-essay", universityId: "hufs-seoul-2027", departmentId: "hufs-seoul-all-2027", academicYear: 2027, name: "논술전형", type: "논술", recruitmentCount: 284, csatMinimum: { enabled: true }, source, isMock: false, isAggregate: true },
];
