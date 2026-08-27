import type { Admission, Department, University } from "../types";

export const seoultech2027University: University = {
  id: "seoultech",
  name: "서울과학기술대학교",
  region: "서울",
};

export const seoultech2027Departments: Department[] = [
  { id: "seoultech-computer", universityId: "seoultech", name: "컴퓨터공학과" },
  { id: "seoultech-business", universityId: "seoultech", name: "경영학과" },
  { id: "seoultech-electrical", universityId: "seoultech", name: "전기정보공학과" },
  { id: "seoultech-mechanical", universityId: "seoultech", name: "기계·자동차공학과" },
  { id: "seoultech-design", universityId: "seoultech", name: "디자인학과" },
];

export const seoultech2027Admissions: Admission[] = [];
