import type { Admission, Department, University } from "../types";

// 2027학년도 서울권 검증 데이터 - 고려대학교 서울캠퍼스
// 최종 수시모집요강 기준. 대학 전체 합계이므로 추천 후보에서는 제외.
export const seoulRealBatch15Universities: University[] = [
  { id: "korea-seoul-2027", name: "고려대학교", region: "서울" },
];

export const seoulRealBatch15Departments: Department[] = [
  { id: "korea-seoul-all-2027", universityId: "korea-seoul-2027", name: "전체모집단위", category: "전체" },
];

const source = {
  type: "university" as const,
  academicYear: 2027,
  document: "2027학년도 수시모집요강",
  verifiedAt: "2026-09-07",
  confidence: 0.99,
  url: "https://oku.korea.ac.kr/oku/index.do",
};

export const seoulRealBatch15Admissions: Admission[] = [
  { id: "korea-2027-school-recommend", universityId: "korea-seoul-2027", departmentId: "korea-seoul-all-2027", academicYear: 2027, name: "학교추천전형", type: "교과", recruitmentCount: 648, studentRecordWeight: 90, csatMinimum: { enabled: true }, source, isMock: false, isAggregate: true },
  { id: "korea-2027-academic-excellence", universityId: "korea-seoul-2027", departmentId: "korea-seoul-all-2027", academicYear: 2027, name: "학업우수전형", type: "학종", recruitmentCount: 903, documentWeight: 100, csatMinimum: { enabled: true }, source, isMock: false, isAggregate: true },
  { id: "korea-2027-department-fit", universityId: "korea-seoul-2027", departmentId: "korea-seoul-all-2027", academicYear: 2027, name: "계열적합전형", type: "학종", recruitmentCount: 523, documentWeight: 100, source, isMock: false, isAggregate: true },
  { id: "korea-2027-opportunity", universityId: "korea-seoul-2027", departmentId: "korea-seoul-all-2027", academicYear: 2027, name: "고른기회전형", type: "학종", recruitmentCount: 201, documentWeight: 100, source, isMock: false, isAggregate: true },
  { id: "korea-2027-multicultural", universityId: "korea-seoul-2027", departmentId: "korea-seoul-all-2027", academicYear: 2027, name: "다문화전형", type: "학종", recruitmentCount: 20, documentWeight: 100, source, isMock: false, isAggregate: true },
  { id: "korea-2027-employee", universityId: "korea-seoul-2027", departmentId: "korea-seoul-all-2027", academicYear: 2027, name: "재직자전형", type: "교과", recruitmentCount: 18, studentRecordWeight: 100, source, isMock: false, isAggregate: true },
  { id: "korea-2027-cyber-defense", universityId: "korea-seoul-2027", departmentId: "korea-seoul-all-2027", academicYear: 2027, name: "사이버국방전형", type: "기타", recruitmentCount: 10, source, isMock: false, isAggregate: true },
  { id: "korea-2027-essay", universityId: "korea-seoul-2027", departmentId: "korea-seoul-all-2027", academicYear: 2027, name: "논술전형", type: "논술", recruitmentCount: 351, csatMinimum: { enabled: true }, source, isMock: false, isAggregate: true },
  { id: "korea-2027-special-talent", universityId: "korea-seoul-2027", departmentId: "korea-seoul-all-2027", academicYear: 2027, name: "특기자전형", type: "기타", recruitmentCount: 55, source, isMock: false, isAggregate: true },
];
