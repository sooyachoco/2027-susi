import type { Admission, Department, AdmissionType } from "./types";

const source = { type: "university" as const, academicYear: 2027, collectedAt: "2026-09-04", verifiedAt: "2026-09-04", confidence: 0.99 };
const url = "https://admission.cau.ac.kr/file/pdfDown.pdf?ofn=%EC%A4%91%EC%95%99%EB%8C%80%ED%95%99%EA%B5%90_2027%ED%95%99%EB%85%84%EB%8F%84+%EC%88%98%EC%8B%9C%EB%AA%A8%EC%A7%91%EC%9A%94%EA%B0%95%28%EB%8B%A8%EB%A9%B4%29_%EA%B3%B5%EA%B3%A0%EC%9A%A9.pdf&sfn=20260609111455769_c6144e06ef38475d8ce9563f87b7f3b4.pdf";
const rows: [string, string, number][] = [
  ["cau-2027-physics", "물리학과", 2],
  ["cau-2027-architecture", "건축학부", 2],
  ["cau-2027-software", "소프트웨어학부", 2],
  ["cau-2027-nursing", "간호학과", 2],
  ["cau-2027-english", "영어영문학과", 2],
  ["cau-2027-french", "유럽문화학부(프랑스어문학)", 2],
  ["cau-2027-sociology", "사회학과", 2],
  ["cau-2027-public", "공공인재학부", 2],
  ["cau-2027-economics", "경제학부", 2],
  ["cau-2027-business", "경영학부(경영학)", 2]
];
export const redCentralHarmony2027Departments: Department[] = rows.map(([id, name]) => ({ id, universityId: "cau", name, category: "수시모집단위" }));
export const redCentralHarmony2027Admissions: Admission[] = rows.map(([departmentId, _name, count]) => ({
  id: `cau-red-harmony-${departmentId}-2027`, universityId: "cau", departmentId, academicYear: 2027,
  name: "학생부종합(어울림)", type: "학종" as AdmissionType, recruitmentCount: count,
  source: { ...source, url }, isMock: false
} as Admission));