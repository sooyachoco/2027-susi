import type { Admission, Department, University } from "../types";

export const inha2027University: University = {
  id: "inha",
  name: "인하대학교",
  region: "인천",
};

export const inha2027Departments: Department[] = [
  { id: "inha-mechanical", universityId: "inha", name: "기계공학과", category: "공학" },
  { id: "inha-aerospace", universityId: "inha", name: "항공우주공학과", category: "공학" },
  { id: "inha-industrial", universityId: "inha", name: "산업경영공학과", category: "공학" },
  { id: "inha-chemical", universityId: "inha", name: "화학공학과", category: "공학" },
  { id: "inha-electrical", universityId: "inha", name: "전기전자공학부", category: "공학" },
  { id: "inha-semiconductor", universityId: "inha", name: "반도체시스템공학과", category: "공학" },
  { id: "inha-software", universityId: "inha", name: "소프트웨어융합공학과", category: "IT" },
  { id: "inha-business", universityId: "inha", name: "경영학과", category: "상경" },
  { id: "inha-economics", universityId: "inha", name: "경제학과", category: "상경" },
  { id: "inha-media", universityId: "inha", name: "미디어커뮤니케이션학과", category: "인문사회" },
];

export const inha2027Admissions: Admission[] = [];
