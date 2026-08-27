import type { Admission, Department, University } from "../types";

const source = { type: "adiga" as const, url: "https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000099", academicYear: 2027, verifiedAt: "2026-08-27", confidence: 0.95 };

export const duksung2027University: University = { id: "duksung", name: "덕성여자대학교", region: "서울" };
export const duksung2027Departments: Department[] = [
  { id: "duksung-business", universityId: "duksung", name: "경영학전공" },
  { id: "duksung-economics", universityId: "duksung", name: "국제통상학전공" },
  { id: "duksung-computer", universityId: "duksung", name: "컴퓨터공학전공" },
  { id: "duksung-media", universityId: "duksung", name: "미디어커뮤니케이션학전공" },
  { id: "duksung-psychology", universityId: "duksung", name: "심리학전공" },
];

export const duksung2027Admissions: Admission[] = [
  { id: "duksung-business-gyogwa", universityId: "duksung", departmentId: "duksung-business", academicYear: 2027, name: "학생부교과", type: "교과", studentRecordWeight: 100, csatMinimum: { enabled: true }, source, isMock: false },
  { id: "duksung-business-injae1", universityId: "duksung", departmentId: "duksung-business", academicYear: 2027, name: "덕성인재전형Ⅰ", type: "학종", documentWeight: 100, interview: false, csatMinimum: { enabled: false }, source, isMock: false },
  { id: "duksung-business-injae2", universityId: "duksung", departmentId: "duksung-business", academicYear: 2027, name: "덕성인재전형Ⅱ", type: "학종", documentWeight: 60, interview: true, csatMinimum: { enabled: false }, source, isMock: false },
];
