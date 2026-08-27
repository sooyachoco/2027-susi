import type { Admission, Department, University } from "../types";

export const kyonggi2027University: University = {
  id: "kyonggi",
  name: "경기대학교",
  region: "경기",
};

export const kyonggi2027Departments: Department[] = [
  { id: "kyonggi-business", universityId: "kyonggi", name: "경영학부" },
  { id: "kyonggi-economics", universityId: "kyonggi", name: "경제학부" },
  { id: "kyonggi-computer", universityId: "kyonggi", name: "컴퓨터공학부" },
  { id: "kyonggi-media", universityId: "kyonggi", name: "미디어영상학과" },
];

export const kyonggi2027Admissions: Admission[] = [];
