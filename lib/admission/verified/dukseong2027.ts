import type { Admission, Department, University } from "../types";

export const dukseong2027University: University = {
  id: "dukseong",
  name: "덕성여자대학교",
  region: "서울",
};

export const dukseong2027Departments: Department[] = [
  { id: "dukseong-business", universityId: "dukseong", name: "경영학전공" },
  { id: "dukseong-computer", universityId: "dukseong", name: "컴퓨터공학전공" },
  { id: "dukseong-media", universityId: "dukseong", name: "디지털소프트웨어공학부" },
  { id: "dukseong-psychology", universityId: "dukseong", name: "심리학전공" },
  { id: "dukseong-english", universityId: "dukseong", name: "영어영문학전공" },
  { id: "dukseong-media-communication", universityId: "dukseong", name: "미디어커뮤니케이션학전공" },
];

export const dukseong2027Admissions: Admission[] = [];
