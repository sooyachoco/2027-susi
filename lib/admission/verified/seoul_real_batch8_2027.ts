import type { Admission, Department, University } from "../types";

// 2027학년도 광운대학교 신입학 수시 모집요강 기준 확정 모집인원
export const seoulRealBatch8Universities: University[] = [
  { id: "kwangwoon-real-2027", name: "광운대학교", region: "서울" },
];

export const seoulRealBatch8Departments: Department[] = [
  { id: "kwangwoon-real-all-2027", universityId: "kwangwoon-real-2027", name: "전체모집단위", category: "전체" },
];

const source = {
  type: "university" as const,
  academicYear: 2027,
  document: "2027학년도 신입학 수시 모집요강",
  verifiedAt: "2026-09-06",
  confidence: 0.99,
  url: "https://iphak.kw.ac.kr/mojib/mojib.php?m_type=SUSI",
};

export const seoulRealBatch8Admissions: Admission[] = [
  { id: "kwangwoon-2027-chambit1", universityId: "kwangwoon-real-2027", departmentId: "kwangwoon-real-all-2027", academicYear: 2027, name: "광운참빛인재전형Ⅰ", type: "학종", recruitmentCount: 250, interview: true, documentWeight: 100, csatMinimum: { enabled: false }, source, isMock: false, isAggregate: true },
  { id: "kwangwoon-2027-chambit2", universityId: "kwangwoon-real-2027", departmentId: "kwangwoon-real-all-2027", academicYear: 2027, name: "광운참빛인재전형Ⅱ", type: "학종", recruitmentCount: 221, documentWeight: 100, csatMinimum: { enabled: false }, source, isMock: false, isAggregate: true },
  { id: "kwangwoon-2027-software", universityId: "kwangwoon-real-2027", departmentId: "kwangwoon-real-all-2027", academicYear: 2027, name: "소프트웨어우수인재전형", type: "학종", recruitmentCount: 72, documentWeight: 100, csatMinimum: { enabled: false }, source, isMock: false, isAggregate: true },
  { id: "kwangwoon-2027-regional", universityId: "kwangwoon-real-2027", departmentId: "kwangwoon-real-all-2027", academicYear: 2027, name: "지역균형전형", type: "교과", recruitmentCount: 198, studentRecordWeight: 100, csatMinimum: { enabled: false }, source, isMock: false, isAggregate: true },
  { id: "kwangwoon-2027-essay", universityId: "kwangwoon-real-2027", departmentId: "kwangwoon-real-all-2027", academicYear: 2027, name: "논술우수자전형", type: "논술", recruitmentCount: 187, csatMinimum: { enabled: false }, source, isMock: false, isAggregate: true },
  { id: "kwangwoon-2027-athlete", universityId: "kwangwoon-real-2027", departmentId: "kwangwoon-real-all-2027", academicYear: 2027, name: "체육특기자전형", type: "기타", recruitmentCount: 15, csatMinimum: { enabled: false }, source, isMock: false, isAggregate: true },
  { id: "kwangwoon-2027-employed-in", universityId: "kwangwoon-real-2027", departmentId: "kwangwoon-real-all-2027", academicYear: 2027, name: "특성화고등을졸업한재직자전형", type: "학종", recruitmentCount: 2, documentWeight: 100, csatMinimum: { enabled: false }, source, isMock: false, isAggregate: true },
  { id: "kwangwoon-2027-employed-out", universityId: "kwangwoon-real-2027", departmentId: "kwangwoon-real-all-2027", academicYear: 2027, name: "특성화고등을졸업한재직자전형(정원외)", type: "학종", recruitmentCount: 120, documentWeight: 100, csatMinimum: { enabled: false }, source, isMock: false, isAggregate: true },
  { id: "kwangwoon-2027-rural", universityId: "kwangwoon-real-2027", departmentId: "kwangwoon-real-all-2027", academicYear: 2027, name: "농어촌학생전형(정원외)", type: "학종", recruitmentCount: 39, documentWeight: 100, csatMinimum: { enabled: false }, source, isMock: false, isAggregate: true },
  { id: "kwangwoon-2027-special", universityId: "kwangwoon-real-2027", departmentId: "kwangwoon-real-all-2027", academicYear: 2027, name: "특성화고졸업자전형(정원외)", type: "학종", recruitmentCount: 25, documentWeight: 100, csatMinimum: { enabled: false }, source, isMock: false, isAggregate: true },
  { id: "kwangwoon-2027-seohae5", universityId: "kwangwoon-real-2027", departmentId: "kwangwoon-real-all-2027", academicYear: 2027, name: "서해5도출신자전형(정원외)", type: "학종", recruitmentCount: 6, documentWeight: 100, csatMinimum: { enabled: false }, source, isMock: false, isAggregate: true },
];
