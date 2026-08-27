import type { Admission, Department, University } from "../types";

export const seoulRealBatch6Universities: University[] = [
  { id: "seoultech-real", name: "서울과학기술대학교", region: "서울" },
  { id: "gwangwoon-real", name: "광운대학교", region: "서울" },
  { id: "hansung-real", name: "한성대학교", region: "서울" },
  { id: "sangmyung-real", name: "상명대학교", region: "서울" },
];

export const seoulRealBatch6Departments: Department[] = [
  { id: "seoultech-real-business", universityId: "seoultech-real", name: "경영학과" },
  { id: "seoultech-real-computer", universityId: "seoultech-real", name: "컴퓨터공학과" },
  { id: "gwangwoon-real-business", universityId: "gwangwoon-real", name: "경영학부" },
  { id: "gwangwoon-real-computer", universityId: "gwangwoon-real", name: "컴퓨터정보공학부" },
  { id: "hansung-real-business", universityId: "hansung-real", name: "경영학부" },
  { id: "hansung-real-computer", universityId: "hansung-real", name: "컴퓨터공학부" },
  { id: "sangmyung-real-business", universityId: "sangmyung-real", name: "경영학부" },
  { id: "sangmyung-real-computer", universityId: "sangmyung-real", name: "컴퓨터과학전공" },
];

export const seoulRealBatch6Admissions: Admission[] = [
  { id: "seoultech-real-student", universityId: "seoultech-real", departmentId: "seoultech-real-business", academicYear: 2027, name: "학생부교과", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "seoultech-real-hakjong", universityId: "seoultech-real", departmentId: "seoultech-real-business", academicYear: 2027, name: "학교생활우수자전형", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "gwangwoon-real-student", universityId: "gwangwoon-real", departmentId: "gwangwoon-real-business", academicYear: 2027, name: "지역균형전형", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "gwangwoon-real-hakjong", universityId: "gwangwoon-real", departmentId: "gwangwoon-real-business", academicYear: 2027, name: "광운참빛인재전형", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "hansung-real-student", universityId: "hansung-real", departmentId: "hansung-real-business", academicYear: 2027, name: "교과우수전형", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "hansung-real-hakjong", universityId: "hansung-real", departmentId: "hansung-real-business", academicYear: 2027, name: "한성인재전형", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "sangmyung-real-student", universityId: "sangmyung-real", departmentId: "sangmyung-real-business", academicYear: 2027, name: "학생부교과전형", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "sangmyung-real-hakjong", universityId: "sangmyung-real", departmentId: "sangmyung-real-business", academicYear: 2027, name: "상명인재전형", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
];
