import type { Admission, Department, University } from "../types";

export const seoulRealBatch3Universities: University[] = [
  { id: "kookmin", name: "국민대학교", region: "서울" },
  { id: "sejong", name: "세종대학교", region: "서울" },
  { id: "myongji", name: "명지대학교", region: "서울" },
  { id: "seoulwomen", name: "서울여자대학교", region: "서울" },
  { id: "hansung", name: "한성대학교", region: "서울" },
  { id: "dongduk", name: "동덕여자대학교", region: "서울" },
];

export const seoulRealBatch3Departments: Department[] = [
  { id: "kookmin-business-real", universityId: "kookmin", name: "경영학부" },
  { id: "kookmin-software-real", universityId: "kookmin", name: "소프트웨어학부" },
  { id: "sejong-business-real", universityId: "sejong", name: "경영학부" },
  { id: "sejong-computer-real", universityId: "sejong", name: "컴퓨터공학과" },
  { id: "myongji-business-real", universityId: "myongji", name: "경영학과" },
  { id: "myongji-computer-real", universityId: "myongji", name: "융합소프트웨어학부" },
  { id: "seoulwomen-business-real", universityId: "seoulwomen", name: "경영학과" },
  { id: "seoulwomen-software-real", universityId: "seoulwomen", name: "소프트웨어융합학과" },
  { id: "hansung-business-real", universityId: "hansung", name: "경영학부" },
  { id: "hansung-it-real", universityId: "hansung", name: "IT공과대학" },
  { id: "dongduk-business-real", universityId: "dongduk", name: "경영학과" },
  { id: "dongduk-computer-real", universityId: "dongduk", name: "컴퓨터학과" },
];

export const seoulRealBatch3Admissions: Admission[] = [
  { id: "kookmin-real-gyogwa", universityId: "kookmin", departmentId: "kookmin-business-real", academicYear: 2027, name: "교과성적우수자전형", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "kookmin-real-hakjong", universityId: "kookmin", departmentId: "kookmin-business-real", academicYear: 2027, name: "학교장추천전형", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "sejong-real-gyogwa", universityId: "sejong", departmentId: "sejong-business-real", academicYear: 2027, name: "학생부교과(지역균형)", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "sejong-real-hakjong", universityId: "sejong", departmentId: "sejong-business-real", academicYear: 2027, name: "학생부종합(세종창의인재)", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "myongji-real-gyogwa", universityId: "myongji", departmentId: "myongji-business-real", academicYear: 2027, name: "학교장추천전형", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "myongji-real-hakjong", universityId: "myongji", departmentId: "myongji-business-real", academicYear: 2027, name: "명지인재서류전형", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "seoulwomen-real-gyogwa", universityId: "seoulwomen", departmentId: "seoulwomen-business-real", academicYear: 2027, name: "교과우수자전형", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "seoulwomen-real-hakjong", universityId: "seoulwomen", departmentId: "seoulwomen-business-real", academicYear: 2027, name: "바롬인재서류전형", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "hansung-real-gyogwa", universityId: "hansung", departmentId: "hansung-business-real", academicYear: 2027, name: "교과우수전형", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "hansung-real-hakjong", universityId: "hansung", departmentId: "hansung-business-real", academicYear: 2027, name: "한성인재전형", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "dongduk-real-gyogwa", universityId: "dongduk", departmentId: "dongduk-business-real", academicYear: 2027, name: "학생부교과우수자전형", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "dongduk-real-hakjong", universityId: "dongduk", departmentId: "dongduk-business-real", academicYear: 2027, name: "동덕창의리더전형", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
];
