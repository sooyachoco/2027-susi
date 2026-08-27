import type { Admission, Department, University } from "../types";

export const ajou2027University: University = {
  id: "ajou",
  name: "아주대학교",
  region: "경기",
};

export const ajou2027Departments: Department[] = [
  { id: "ajou-business", universityId: "ajou", name: "경영학과" },
  { id: "ajou-economics", universityId: "ajou", name: "경제학과" },
  { id: "ajou-media", universityId: "ajou", name: "문화콘텐츠학과" },
  { id: "ajou-computer", universityId: "ajou", name: "소프트웨어학과" },
  { id: "ajou-ai", universityId: "ajou", name: "인공지능융합학과" },
];

export const ajou2027Admissions: Admission[] = [];
