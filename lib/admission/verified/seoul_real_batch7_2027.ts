import type { Admission, Department, University } from "../types";

export const seoulRealBatch7Universities: University[] = [
  { id: "seoulw", name: "서울여자대학교", region: "서울" },
];

export const seoulRealBatch7Departments: Department[] = [
  { id: "seoulw-all-2027", universityId: "seoulw", name: "전체모집단위", category: "전체" },
];

const seoulwSource = {
  type: "university" as const,
  academicYear: 2027,
  document: "2027학년도 수시모집요강",
  verifiedAt: "2026-09-06",
  confidence: 0.98,
  url: "https://adiga.kr/",
};

export const seoulRealBatch7Admissions: Admission[] = [
  // 서울여대: 2027 수시 최종 모집인원 합계 1,065명
  { id: "seoulw-2027-barom-doc", universityId: "seoulw", departmentId: "seoulw-all-2027", academicYear: 2027, name: "바롬인재서류전형", type: "학종", recruitmentCount: 183, documentWeight: 100, csatMinimum: { enabled: false }, source: seoulwSource, isMock: false, isAggregate: true },
  { id: "seoulw-2027-barom-interview", universityId: "seoulw", departmentId: "seoulw-all-2027", academicYear: 2027, name: "바롬인재면접전형", type: "학종", recruitmentCount: 202, interview: true, documentWeight: 60, csatMinimum: { enabled: false }, source: seoulwSource, isMock: false, isAggregate: true },
  { id: "seoulw-2027-sw", universityId: "seoulw", departmentId: "seoulw-all-2027", academicYear: 2027, name: "SW융합인재전형", type: "학종", recruitmentCount: 33, documentWeight: 100, csatMinimum: { enabled: false }, source: seoulwSource, isMock: false, isAggregate: true },
  { id: "seoulw-2027-christian", universityId: "seoulw", departmentId: "seoulw-all-2027", academicYear: 2027, name: "기독교지도자전형", type: "학종", recruitmentCount: 23, documentWeight: 100, csatMinimum: { enabled: false }, source: seoulwSource, isMock: false, isAggregate: true },
  { id: "seoulw-2027-opportunity-social", universityId: "seoulw", departmentId: "seoulw-all-2027", academicYear: 2027, name: "기회균형전형_사회통합지원", type: "학종", recruitmentCount: 61, documentWeight: 100, csatMinimum: { enabled: false }, source: seoulwSource, isMock: false, isAggregate: true },
  { id: "seoulw-2027-opportunity-rural", universityId: "seoulw", departmentId: "seoulw-all-2027", academicYear: 2027, name: "기회균형전형_농어촌학생", type: "학종", recruitmentCount: 63, documentWeight: 100, csatMinimum: { enabled: false }, source: seoulwSource, isMock: false, isAggregate: true },
  { id: "seoulw-2027-opportunity-specialized-grad", universityId: "seoulw", departmentId: "seoulw-all-2027", academicYear: 2027, name: "기회균형전형_특성화고교졸업자", type: "학종", recruitmentCount: 23, documentWeight: 100, csatMinimum: { enabled: false }, source: seoulwSource, isMock: false, isAggregate: true },
  { id: "seoulw-2027-teaching", universityId: "seoulw", departmentId: "seoulw-all-2027", academicYear: 2027, name: "교과우수자전형", type: "교과", recruitmentCount: 185, studentRecordWeight: 100, csatMinimum: { enabled: true }, source: seoulwSource, isMock: false, isAggregate: true },
  { id: "seoulw-2027-teaching-sports", universityId: "seoulw", departmentId: "seoulw-all-2027", academicYear: 2027, name: "교과우수자전형(체육)", type: "교과", recruitmentCount: 10, studentRecordWeight: 100, csatMinimum: { enabled: true }, source: seoulwSource, isMock: false, isAggregate: true },
  { id: "seoulw-2027-essay", universityId: "seoulw", departmentId: "seoulw-all-2027", academicYear: 2027, name: "논술우수자", type: "논술", recruitmentCount: 120, csatMinimum: { enabled: false }, source: seoulwSource, isMock: false, isAggregate: true },
  { id: "seoulw-2027-practical-sports", universityId: "seoulw", departmentId: "seoulw-all-2027", academicYear: 2027, name: "실기우수자(체육)", type: "기타", recruitmentCount: 8, source: seoulwSource, isMock: false, isAggregate: true },
  { id: "seoulw-2027-practical-art", universityId: "seoulw", departmentId: "seoulw-all-2027", academicYear: 2027, name: "실기우수자(미술)", type: "기타", recruitmentCount: 65, source: seoulwSource, isMock: false, isAggregate: true },
  { id: "seoulw-2027-employed", universityId: "seoulw", departmentId: "seoulw-all-2027", academicYear: 2027, name: "기회균형전형_특성화고등을졸업한재직자(정원외)", type: "학종", recruitmentCount: 89, documentWeight: 100, csatMinimum: { enabled: false }, source: seoulwSource, isMock: false, isAggregate: true },
];
