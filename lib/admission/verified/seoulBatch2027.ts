import type { Admission, Department, University } from "../types";

export const seoulBatch2027Universities: University[] = [
  { id: "myongji", name: "명지대학교", region: "서울" },
  { id: "duksung", name: "덕성여자대학교", region: "서울" },
  { id: "seoulwomen", name: "서울여자대학교", region: "서울" },
  { id: "sangmyung", name: "상명대학교", region: "서울" },
  { id: "seokyeong", name: "서경대학교", region: "서울" },
  { id: "sammyook", name: "삼육대학교", region: "서울" },
];

export const seoulBatch2027Departments: Department[] = [
  { id: "duksung-business", universityId: "duksung", name: "경영학전공" },
  { id: "duksung-computer", universityId: "duksung", name: "컴퓨터공학전공" },
  { id: "seoulwomen-business", universityId: "seoulwomen", name: "경영학과" },
  { id: "seoulwomen-computer", universityId: "seoulwomen", name: "소프트웨어융합학과" },
  { id: "sangmyung-business", universityId: "sangmyung", name: "경영학부" },
  { id: "sangmyung-computer", universityId: "sangmyung", name: "컴퓨터과학전공" },
  { id: "seokyeong-business", universityId: "seokyeong", name: "경영학부" },
  { id: "seokyeong-software", universityId: "seokyeong", name: "소프트웨어학과" },
  { id: "sammyook-business", universityId: "sammyook", name: "경영학과" },
  { id: "sammyook-computer", universityId: "sammyook", name: "컴퓨터공학부" },
];

export const seoulBatch2027Admissions: Admission[] = [
  { id: "duksung-batch-gyogwa", universityId: "duksung", departmentId: "duksung-business", academicYear: 2027, name: "학생부교과", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "duksung-batch-hakjong", universityId: "duksung", departmentId: "duksung-business", academicYear: 2027, name: "학생부종합", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "seoulwomen-batch-gyogwa", universityId: "seoulwomen", departmentId: "seoulwomen-business", academicYear: 2027, name: "학생부교과", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "seoulwomen-batch-hakjong", universityId: "seoulwomen", departmentId: "seoulwomen-business", academicYear: 2027, name: "학생부종합", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "sangmyung-batch-gyogwa", universityId: "sangmyung", departmentId: "sangmyung-business", academicYear: 2027, name: "학생부교과", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "sangmyung-batch-hakjong", universityId: "sangmyung", departmentId: "sangmyung-business", academicYear: 2027, name: "학생부종합", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "seokyeong-batch-gyogwa", universityId: "seokyeong", departmentId: "seokyeong-business", academicYear: 2027, name: "학생부교과", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "seokyeong-batch-hakjong", universityId: "seokyeong", departmentId: "seokyeong-business", academicYear: 2027, name: "학생부종합", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "sammyook-batch-gyogwa", universityId: "sammyook", departmentId: "sammyook-business", academicYear: 2027, name: "학생부교과", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "sammyook-batch-hakjong", universityId: "sammyook", departmentId: "sammyook-business", academicYear: 2027, name: "학생부종합", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
];
