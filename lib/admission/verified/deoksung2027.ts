import type { Admission, Department, University } from "../types";

export const deoksung2027University: University = {
  id: "deoksung",
  name: "덕성여자대학교",
  region: "서울",
};

export const deoksung2027Departments: Department[] = [
  { id: "deoksung-business", universityId: "deoksung", name: "경영학전공" },
  { id: "deoksung-economics", universityId: "deoksung", name: "국제통상학전공" },
  { id: "deoksung-computer", universityId: "deoksung", name: "컴퓨터공학전공" },
  { id: "deoksung-software", universityId: "deoksung", name: "소프트웨어전공" },
  { id: "deoksung-media", universityId: "deoksung", name: "미디어디자인전공" },
];

export const deoksung2027Admissions: Admission[] = [];
