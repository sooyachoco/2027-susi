import type { Admission, Department, University } from "../types";

export const kwangwoon2027University: University = {
  id: "kwangwoon",
  name: "광운대학교",
  region: "서울",
};

export const kwangwoon2027Departments: Department[] = [
  { id: "kwangwoon-electronic", universityId: "kwangwoon", name: "전자공학과" },
  { id: "kwangwoon-computer", universityId: "kwangwoon", name: "컴퓨터정보공학부" },
  { id: "kwangwoon-software", universityId: "kwangwoon", name: "소프트웨어학부" },
  { id: "kwangwoon-business", universityId: "kwangwoon", name: "경영학부" },
];

export const kwangwoon2027Admissions: Admission[] = [];
