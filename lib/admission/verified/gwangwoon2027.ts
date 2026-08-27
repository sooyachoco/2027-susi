import type { Admission, Department, University } from "../types";

export const gwangwoon2027University: University = {
  id: "gwangwoon",
  name: "광운대학교",
  region: "서울",
};

export const gwangwoon2027Departments: Department[] = [
  { id: "gwangwoon-business", universityId: "gwangwoon", name: "경영학부" },
  { id: "gwangwoon-electronics", universityId: "gwangwoon", name: "전자공학과" },
  { id: "gwangwoon-computer", universityId: "gwangwoon", name: "컴퓨터정보공학부" },
  { id: "gwangwoon-media", universityId: "gwangwoon", name: "미디어커뮤니케이션학부" },
  { id: "gwangwoon-industrial", universityId: "gwangwoon", name: "산업심리학과" },
];

export const gwangwoon2027Admissions: Admission[] = [];
