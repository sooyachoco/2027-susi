import type { Admission, Department, University } from "../types";

const source = { type: "university" as const, url: "https://enter.duksung.ac.kr/mojib/?m_type=SUSI", academicYear: 2027, verifiedAt: "2026-08-27", confidence: 0.95 };

export const deoksung2027University: University = { id: "deoksung", name: "덕성여자대학교", region: "서울" };

export const deoksung2027Departments: Department[] = [
  { id: "deoksung-business", universityId: "deoksung", name: "경영학전공" },
  { id: "deoksung-economics", universityId: "deoksung", name: "국제통상학전공" },
  { id: "deoksung-computer", universityId: "deoksung", name: "컴퓨터공학전공" },
  { id: "deoksung-software", universityId: "deoksung", name: "소프트웨어전공" },
  { id: "deoksung-media", universityId: "deoksung", name: "미디어디자인전공" },
];

export const deoksung2027Admissions: Admission[] = [
  { id: "deoksung-student-record", universityId: "deoksung", departmentId: "deoksung-business", academicYear: 2027, name: "학생부교과", type: "교과", studentRecordWeight: 100, source, isMock: false },
  { id: "deoksung-hakjong", universityId: "deoksung", departmentId: "deoksung-business", academicYear: 2027, name: "학생부종합", type: "학종", source, isMock: false },
  { id: "deoksung-nonsul", universityId: "deoksung", departmentId: "deoksung-business", academicYear: 2027, name: "논술", type: "논술", source, isMock: false },
];
