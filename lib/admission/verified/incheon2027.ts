import type { Admission, Department, University } from "../types";

export const incheon2027University: University = {
  id: "incheon",
  name: "인천대학교",
  region: "인천",
};

export const incheon2027Departments: Department[] = [
  { id: "incheon-business", universityId: "incheon", name: "경영학부" },
  { id: "incheon-economics", universityId: "incheon", name: "경제학과" },
  { id: "incheon-computer", universityId: "incheon", name: "컴퓨터공학부" },
  { id: "incheon-media", universityId: "incheon", name: "미디어커뮤니케이션학과" },
  { id: "incheon-ai", universityId: "incheon", name: "인공지능학과" },
];

export const incheon2027Admissions: Admission[] = [];
