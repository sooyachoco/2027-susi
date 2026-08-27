import type { Admission, Department, University } from "../types";

export const sangmyung2027University: University = {
  id: "sangmyung",
  name: "상명대학교",
  region: "서울",
};

export const sangmyung2027Departments: Department[] = [
  { id: "sangmyung-business", universityId: "sangmyung", name: "경영학부" },
  { id: "sangmyung-computer", universityId: "sangmyung", name: "컴퓨터과학전공" },
  { id: "sangmyung-software", universityId: "sangmyung", name: "소프트웨어학과" },
  { id: "sangmyung-media", universityId: "sangmyung", name: "디지털콘텐츠전공" },
  { id: "sangmyung-design", universityId: "sangmyung", name: "디자인학부" },
];

export const sangmyung2027Admissions: Admission[] = [];
