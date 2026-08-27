import type { Admission, Department, University } from "../types";

export const dongduk2027University: University = {
  id: "dongduk",
  name: "동덕여자대학교",
  region: "서울",
};

export const dongduk2027Departments: Department[] = [
  { id: "dongduk-business", universityId: "dongduk", name: "경영학과" },
  { id: "dongduk-economics", universityId: "dongduk", name: "경제학과" },
  { id: "dongduk-computer", universityId: "dongduk", name: "컴퓨터학과" },
  { id: "dongduk-media", universityId: "dongduk", name: "미디어디자인학과" },
  { id: "dongduk-content", universityId: "dongduk", name: "문화예술경영전공" },
];

export const dongduk2027Admissions: Admission[] = [];
