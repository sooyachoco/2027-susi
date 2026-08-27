import type { Admission, Department, University } from "../types";

export const seoulRealBatch3Universities: University[] = [
  { id: "kookmin", name: "국민대학교", region: "서울" },
  { id: "sejong", name: "세종대학교", region: "서울" },
  { id: "dongduk", name: "동덕여자대학교", region: "서울" },
  { id: "seoultech", name: "서울과학기술대학교", region: "서울" },
  { id: "sangmyung", name: "상명대학교", region: "서울" },
  { id: "sammyook", name: "삼육대학교", region: "서울" },
];

export const seoulRealBatch3Departments: Department[] = [
  { id: "kookmin-business", universityId: "kookmin", name: "경영학부" },
  { id: "kookmin-software", universityId: "kookmin", name: "소프트웨어학부" },
  { id: "sejong-business", universityId: "sejong", name: "경영학부" },
  { id: "sejong-computer", universityId: "sejong", name: "컴퓨터공학과" },
  { id: "dongduk-business", universityId: "dongduk", name: "경영학과" },
  { id: "dongduk-computer", universityId: "dongduk", name: "컴퓨터학과" },
  { id: "seoultech-business", universityId: "seoultech", name: "경영학전공" },
  { id: "seoultech-computer", universityId: "seoultech", name: "컴퓨터공학과" },
  { id: "sangmyung-business", universityId: "sangmyung", name: "경영학부" },
  { id: "sangmyung-computer", universityId: "sangmyung", name: "컴퓨터과학전공" },
  { id: "sammyook-business", universityId: "sammyook", name: "경영학과" },
  { id: "sammyook-computer", universityId: "sammyook", name: "컴퓨터공학부" },
];

export const seoulRealBatch3Admissions: Admission[] = [
  { id: "kookmin-gyogwa", universityId: "kookmin", departmentId: "kookmin-business", academicYear: 2027, name: "교과성적우수자전형", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "kookmin-hakjong", universityId: "kookmin", departmentId: "kookmin-business", academicYear: 2027, name: "학교장추천전형", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "sejong-gyogwa", universityId: "sejong", departmentId: "sejong-business", academicYear: 2027, name: "지역균형전형", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "sejong-hakjong", universityId: "sejong", departmentId: "sejong-business", academicYear: 2027, name: "세종창의인재전형", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "dongduk-gyogwa", universityId: "dongduk", departmentId: "dongduk-business", academicYear: 2027, name: "학생부교과우수자전형", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "dongduk-hakjong", universityId: "dongduk", departmentId: "dongduk-business", academicYear: 2027, name: "동덕창의리더전형", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "seoultech-gyogwa", universityId: "seoultech", departmentId: "seoultech-business", academicYear: 2027, name: "고교추천전형", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "seoultech-hakjong", universityId: "seoultech", departmentId: "seoultech-business", academicYear: 2027, name: "학교생활우수자전형", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "sangmyung-gyogwa", universityId: "sangmyung", departmentId: "sangmyung-business", academicYear: 2027, name: "학생부교과전형", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "sangmyung-hakjong", universityId: "sangmyung", departmentId: "sangmyung-business", academicYear: 2027, name: "상명인재전형", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "sammyook-gyogwa", universityId: "sammyook", departmentId: "sammyook-business", academicYear: 2027, name: "학교장추천전형", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "sammyook-hakjong", universityId: "sammyook", departmentId: "sammyook-business", academicYear: 2027, name: "세움인재전형", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
];
