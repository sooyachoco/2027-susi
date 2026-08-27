import type { Admission, Department, University } from "../types";

export const seoulRealtimeBatch2027Universities: University[] = [
  { id: "kwangwoon", name: "광운대학교", region: "서울" },
  { id: "seoulwomen", name: "서울여자대학교", region: "서울" },
  { id: "deoksung", name: "덕성여자대학교", region: "서울" },
  { id: "myongji", name: "명지대학교", region: "서울" },
  { id: "seokyeong", name: "서경대학교", region: "서울" },
];

export const seoulRealtimeBatch2027Departments: Department[] = [
  { id: "kwangwoon-business", universityId: "kwangwoon", name: "경영학부" },
  { id: "kwangwoon-computer", universityId: "kwangwoon", name: "컴퓨터정보공학부" },
  { id: "seoulwomen-business", universityId: "seoulwomen", name: "경영학과" },
  { id: "seoulwomen-software", universityId: "seoulwomen", name: "소프트웨어융합학과" },
  { id: "deoksung-business", universityId: "deoksung", name: "경영학전공" },
  { id: "deoksung-computer", universityId: "deoksung", name: "컴퓨터공학전공" },
  { id: "myongji-business", universityId: "myongji", name: "경영학과" },
  { id: "myongji-computer", universityId: "myongji", name: "컴퓨터공학과" },
  { id: "seokyeong-business", universityId: "seokyeong", name: "경영학부" },
  { id: "seokyeong-software", universityId: "seokyeong", name: "소프트웨어학과" },
];

export const seoulRealtimeBatch2027Admissions: Admission[] = [];
