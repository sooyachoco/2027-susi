import type { Admission, Department, University } from "../types";

export const seoulwomen2027University: University = {
  id: "seoulwomen",
  name: "서울여자대학교",
  region: "서울",
};

export const seoulwomen2027Departments: Department[] = [
  { id: "seoulwomen-business", universityId: "seoulwomen", name: "경영학과" },
  { id: "seoulwomen-economics", universityId: "seoulwomen", name: "경제학과" },
  { id: "seoulwomen-computer", universityId: "seoulwomen", name: "소프트웨어융합학과" },
  { id: "seoulwomen-media", universityId: "seoulwomen", name: "언론영상학부" },
  { id: "seoulwomen-psychology", universityId: "seoulwomen", name: "교육심리학과" },
];

export const seoulwomen2027Admissions: Admission[] = [];
