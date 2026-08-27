import type { Admission, Department, University } from "../types";

export const sammyung2027University: University = {
  id: "sammyung",
  name: "삼육대학교",
  region: "서울",
};

export const sammyung2027Departments: Department[] = [
  { id: "sammyung-business", universityId: "sammyung", name: "경영학과" },
  { id: "sammyung-computer", universityId: "sammyung", name: "컴퓨터공학부" },
  { id: "sammyung-counseling", universityId: "sammyung", name: "상담심리학과" },
  { id: "sammyung-food", universityId: "sammyung", name: "식품영양학과" },
  { id: "sammyung-health", universityId: "sammyung", name: "보건관리학과" },
];

export const sammyung2027Admissions: Admission[] = [];
