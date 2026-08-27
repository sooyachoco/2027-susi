import type { Admission, Department, University } from "../types";

export const seoulFinalBatch2027Universities: University[] = [
  { id: "seoultech", name: "서울과학기술대학교", region: "서울" },
  { id: "hankuk_foreign", name: "한국외국어대학교", region: "서울" },
  { id: "konkuk", name: "건국대학교", region: "서울" },
  { id: "hongik", name: "홍익대학교", region: "서울" },
];

export const seoulFinalBatch2027Departments: Department[] = [
  { id: "seoultech-business", universityId: "seoultech", name: "경영학전공" },
  { id: "seoultech-computer", universityId: "seoultech", name: "컴퓨터공학과" },
  { id: "konkuk-business", universityId: "konkuk", name: "경영학과" },
  { id: "konkuk-computer", universityId: "konkuk", name: "컴퓨터공학부" },
  { id: "hongik-business", universityId: "hongik", name: "경영학부" },
  { id: "hongik-computer", universityId: "hongik", name: "컴퓨터공학과" },
  { id: "hankuk_foreign-business", universityId: "hankuk_foreign", name: "경영학부" },
  { id: "hankuk_foreign-computer", universityId: "hankuk_foreign", name: "컴퓨터공학부" },
];

export const seoulFinalBatch2027Admissions: Admission[] = [];
