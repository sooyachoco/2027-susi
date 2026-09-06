import type { Admission, Department, University } from "../types";

export const seoulRealBatch4Universities: University[] = [
  { id: "sookmyung", name: "숙명여자대학교", region: "서울" },
];

export const seoulRealBatch4Departments: Department[] = [
  { id: "sookmyung-all-2027", universityId: "sookmyung", name: "전체모집단위", category: "전체" },
];

const source = {
  type: "university" as const,
  academicYear: 2027,
  document: "2027학년도 수시모집요강",
  verifiedAt: "2026-09-06",
  confidence: 0.99,
  url: "https://admission.sookmyung.ac.kr/",
};

export const seoulRealBatch4Admissions: Admission[] = [
  { id: "sookmyung-2027-hakjong-interview", universityId: "sookmyung", departmentId: "sookmyung-all-2027", academicYear: 2027, name: "숙명인재(면접형)", type: "학종", recruitmentCount: 361, interview: true, documentWeight: 70, source, isMock: false, isAggregate: true },
  { id: "sookmyung-2027-hakjong-sw", universityId: "sookmyung", departmentId: "sookmyung-all-2027", academicYear: 2027, name: "소프트웨어인재", type: "학종", recruitmentCount: 35, interview: true, documentWeight: 70, source, isMock: false, isAggregate: true },
  { id: "sookmyung-2027-hakjong-opportunity", universityId: "sookmyung", departmentId: "sookmyung-all-2027", academicYear: 2027, name: "기회균형", type: "학종", recruitmentCount: 71, source, isMock: false, isAggregate: true },
  { id: "sookmyung-2027-hakjong-rural", universityId: "sookmyung", departmentId: "sookmyung-all-2027", academicYear: 2027, name: "농어촌학생", type: "학종", recruitmentCount: 63, source, isMock: false, isAggregate: true },
  { id: "sookmyung-2027-hakjong-specialized", universityId: "sookmyung", departmentId: "sookmyung-all-2027", academicYear: 2027, name: "특성화고교출신자", type: "학종", recruitmentCount: 24, source, isMock: false, isAggregate: true },
  { id: "sookmyung-2027-hakjong-special-education", universityId: "sookmyung", departmentId: "sookmyung-all-2027", academicYear: 2027, name: "특수교육대상자", type: "학종", recruitmentCount: 10, source, isMock: false, isAggregate: true },
  { id: "sookmyung-2027-hakjong-employed", universityId: "sookmyung", departmentId: "sookmyung-all-2027", academicYear: 2027, name: "특성화고졸재직자", type: "학종", recruitmentCount: 118, source, isMock: false, isAggregate: true },
  { id: "sookmyung-2027-gyogwa", universityId: "sookmyung", departmentId: "sookmyung-all-2027", academicYear: 2027, name: "지역균형선발전형", type: "교과", recruitmentCount: 287, studentRecordWeight: 100, csatMinimum: { enabled: false, description: "약학부 제외 수능 최저 없음" }, source, isMock: false, isAggregate: true },
  { id: "sookmyung-2027-essay", universityId: "sookmyung", departmentId: "sookmyung-all-2027", academicYear: 2027, name: "논술우수자", type: "논술", recruitmentCount: 214, source, isMock: false, isAggregate: true },
  { id: "sookmyung-2027-practical", universityId: "sookmyung", departmentId: "sookmyung-all-2027", academicYear: 2027, name: "예능창의인재", type: "기타", recruitmentCount: 127, source, isMock: false, isAggregate: true },
];
