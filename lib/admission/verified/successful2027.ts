import type { Admission, Department, University } from "../types";

export const successful2027University: University = {
  id: "successful-2027",
  name: "성공회대학교",
  region: "서울",
};

export const successful2027Departments: Department[] = [
  { id: "successful-social", universityId: "successful-2027", name: "사회융합자율학부" },
  { id: "successful-media", universityId: "successful-2027", name: "미디어콘텐츠융합학부" },
  { id: "successful-it", universityId: "successful-2027", name: "IT융합자율학부" },
];

export const successful2027Admissions: Admission[] = [];
