import type { Admission, Department, University } from "../types";

export const myongji2027University: University = {
  id: "myongji",
  name: "명지대학교",
  region: "서울",
};

export const myongji2027Departments: Department[] = [
  { id: "myongji-business", universityId: "myongji", name: "경영학과" },
  { id: "myongji-computer", universityId: "myongji", name: "컴퓨터공학과" },
  { id: "myongji-software", universityId: "myongji", name: "융합소프트웨어학부" },
  { id: "myongji-media", universityId: "myongji", name: "디지털미디어학과" },
  { id: "myongji-design", universityId: "myongji", name: "디자인학부" },
];

export const myongji2027Admissions: Admission[] = [
  {
    id: "myongji-business-gyogwa",
    universityId: "myongji",
    departmentId: "myongji-business",
    academicYear: 2027,
    name: "학생부교과",
    type: "교과",
    studentRecordWeight: 100,
    source: { type: "university", academicYear: 2027 },
    isMock: false,
  },
  {
    id: "myongji-business-hakjong",
    universityId: "myongji",
    departmentId: "myongji-business",
    academicYear: 2027,
    name: "학생부종합",
    type: "학종",
    source: { type: "university", academicYear: 2027 },
    isMock: false,
  },
];
