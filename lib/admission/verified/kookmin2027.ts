import type { Admission, Department, University } from "../types";

export const kookmin2027University: University = {
  id: "kookmin",
  name: "국민대학교",
  region: "서울",
};

export const kookmin2027Departments: Department[] = [
  { id: "kookmin-business", universityId: "kookmin", name: "경영학부" },
  { id: "kookmin-economics", universityId: "kookmin", name: "경제학과" },
  { id: "kookmin-computer", universityId: "kookmin", name: "소프트웨어학부" },
  { id: "kookmin-media", universityId: "kookmin", name: "미디어·광고학부" },
];

export const kookmin2027Admissions: Admission[] = [];
