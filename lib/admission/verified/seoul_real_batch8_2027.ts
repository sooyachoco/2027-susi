import type { Admission, Department, University } from "../types";

// 2027학년도 공식 공개자료 기준 대표 모집단위/전형 데이터
// Sources: 대입정보포털 어디가 2027학년도 전형평가기준 및 결과공개 자료,
// 덕성여자대학교 2027학년도 수시모집요강, 동덕여자대학교 2027학년도 수시모집요강.
export const seoulRealBatch8Universities: University[] = [
  { id: "duksung-real", name: "덕성여자대학교", region: "서울" },
  { id: "dongduk-real", name: "동덕여자대학교", region: "서울" },
];

export const seoulRealBatch8Departments: Department[] = [
  { id: "duksung-real-global", universityId: "duksung-real", name: "글로벌융합대학" },
  { id: "duksung-real-science", universityId: "duksung-real", name: "과학기술대학" },
  { id: "duksung-real-pharm", universityId: "duksung-real", name: "약학과" },
  { id: "dongduk-real-business", universityId: "dongduk-real", name: "경영융합학부" },
  { id: "dongduk-real-computer", universityId: "dongduk-real", name: "컴퓨터학전공" },
  { id: "dongduk-real-data", universityId: "dongduk-real", name: "데이터사이언스전공" },
];

export const seoulRealBatch8Admissions: Admission[] = [
  { id: "duksung-real-hakjong1", universityId: "duksung-real", departmentId: "duksung-real-global", academicYear: 2027, name: "덕성인재전형Ⅰ", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "duksung-real-hakjong2", universityId: "duksung-real", departmentId: "duksung-real-global", academicYear: 2027, name: "덕성인재전형Ⅱ", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "duksung-real-hakjong2-pharm", universityId: "duksung-real", departmentId: "duksung-real-pharm", academicYear: 2027, name: "덕성인재전형Ⅱ", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "dongduk-real-hakjong", universityId: "dongduk-real", departmentId: "dongduk-real-business", academicYear: 2027, name: "동덕창의리더전형", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "dongduk-real-gyogwa", universityId: "dongduk-real", departmentId: "dongduk-real-business", academicYear: 2027, name: "학생부교과 우수자전형", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "dongduk-real-gyogwa-computer", universityId: "dongduk-real", departmentId: "dongduk-real-computer", academicYear: 2027, name: "학생부교과 우수자전형", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
];
