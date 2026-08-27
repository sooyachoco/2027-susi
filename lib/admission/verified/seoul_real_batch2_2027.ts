import type { Admission, Department, University } from "../types";

export const seoulRealBatch2Universities: University[] = [
  { id: "gwangwoon", name: "광운대학교", region: "서울" },
  { id: "hansung", name: "한성대학교", region: "서울" },
  { id: "sangmyung", name: "상명대학교", region: "서울" },
  { id: "seokyeong", name: "서경대학교", region: "서울" },
  { id: "sammyook", name: "삼육대학교", region: "서울" },
  { id: "sungshin", name: "성신여자대학교", region: "서울" },
];

export const seoulRealBatch2Departments: Department[] = [
  { id: "gwangwoon-business", universityId: "gwangwoon", name: "경영학부" },
  { id: "gwangwoon-computer", universityId: "gwangwoon", name: "컴퓨터정보공학부" },
  { id: "hansung-business", universityId: "hansung", name: "경영학부" },
  { id: "hansung-computer", universityId: "hansung", name: "컴퓨터공학부" },
  { id: "sangmyung-business", universityId: "sangmyung", name: "경영학부" },
  { id: "sangmyung-computer", universityId: "sangmyung", name: "컴퓨터과학전공" },
  { id: "seokyeong-business", universityId: "seokyeong", name: "경영학부" },
  { id: "seokyeong-software", universityId: "seokyeong", name: "소프트웨어학과" },
  { id: "sammyook-business", universityId: "sammyook", name: "경영학과" },
  { id: "sammyook-computer", universityId: "sammyook", name: "컴퓨터공학부" },
  { id: "sungshin-business", universityId: "sungshin", name: "경영학과" },
  { id: "sungshin-computer", universityId: "sungshin", name: "컴퓨터공학과" },
];

export const seoulRealBatch2Admissions: Admission[] = [
  { id: "gwangwoon-gyogwa", universityId: "gwangwoon", departmentId: "gwangwoon-business", academicYear: 2027, name: "지역균형", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "gwangwoon-hakjong", universityId: "gwangwoon", departmentId: "gwangwoon-business", academicYear: 2027, name: "광운참빛인재전형", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "hansung-gyogwa", universityId: "hansung", departmentId: "hansung-business", academicYear: 2027, name: "교과우수", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "hansung-hakjong", universityId: "hansung", departmentId: "hansung-business", academicYear: 2027, name: "한성인재", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "sangmyung-gyogwa", universityId: "sangmyung", departmentId: "sangmyung-business", academicYear: 2027, name: "학생부교과", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "sangmyung-hakjong", universityId: "sangmyung", departmentId: "sangmyung-business", academicYear: 2027, name: "상명인재", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "seokyeong-gyogwa", universityId: "seokyeong", departmentId: "seokyeong-business", academicYear: 2027, name: "교과성적우수자", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "sammyook-gyogwa", universityId: "sammyook", departmentId: "sammyook-business", academicYear: 2027, name: "학생부교과", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "sungshin-gyogwa", universityId: "sungshin", departmentId: "sungshin-business", academicYear: 2027, name: "지역균형", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "sungshin-hakjong", universityId: "sungshin", departmentId: "sungshin-business", academicYear: 2027, name: "학교생활우수자", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
];
