import type { Admission, Department, University } from "../types";

export const duksung2027University: University = {
  id: "duksung",
  name: "덕성여자대학교",
  region: "서울",
};

export const duksung2027Departments: Department[] = [
  { id: "duksung-business", universityId: "duksung", name: "경영학전공" },
  { id: "duksung-economics", universityId: "duksung", name: "국제통상학전공" },
  { id: "duksung-computer", universityId: "duksung", name: "컴퓨터공학전공" },
  { id: "duksung-media", universityId: "duksung", name: "미디어커뮤니케이션학전공" },
  { id: "duksung-psychology", universityId: "duksung", name: "심리학전공" },
];

export const duksung2027Admissions: Admission[] = [];
