import type { Admission, Department, University } from "../types";

export const hansung2027University: University = {
  id: "hansung",
  name: "한성대학교",
  region: "서울",
};

export const hansung2027Departments: Department[] = [
  { id: "hansung-business", universityId: "hansung", name: "경영학부" },
  { id: "hansung-computer", universityId: "hansung", name: "컴퓨터공학부" },
  { id: "hansung-it", universityId: "hansung", name: "IT융합공학부" },
];

export const hansung2027Admissions: Admission[] = [];
