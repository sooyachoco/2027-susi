import type { Admission, Department, University } from "../types";

export const inha2027University: University = {
  id: "inha",
  name: "인하대학교",
  region: "인천",
};

export const inha2027Departments: Department[] = [
  { id: "inha-business", universityId: "inha", name: "경영학과" },
  { id: "inha-economics", universityId: "inha", name: "경제학과" },
  { id: "inha-computer", universityId: "inha", name: "컴퓨터공학과" },
  { id: "inha-ai", universityId: "inha", name: "인공지능공학과" },
  { id: "inha-media", universityId: "inha", name: "미디어커뮤니케이션학과" },
];

export const inha2027Admissions: Admission[] = [];
