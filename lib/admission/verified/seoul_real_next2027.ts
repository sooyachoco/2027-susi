import type { Admission, Department, University } from "../types";

export const seoulRealNext2027Universities: University[] = [
  { id: "success", name: "성공회대학교", region: "서울" },
  { id: "seoultech", name: "서울과학기술대학교", region: "서울" },
  { id: "dongduk", name: "동덕여자대학교", region: "서울" },
];

export const seoulRealNext2027Departments: Department[] = [
  { id: "success-social", universityId: "success", name: "사회복지학과" },
  { id: "success-business", universityId: "success", name: "경영학부" },
  { id: "seoultech-business", universityId: "seoultech", name: "경영학전공" },
  { id: "seoultech-computer", universityId: "seoultech", name: "컴퓨터공학과" },
  { id: "dongduk-business", universityId: "dongduk", name: "경영학과" },
  { id: "dongduk-computer", universityId: "dongduk", name: "컴퓨터학과" },
];

export const seoulRealNext2027Admissions: Admission[] = [
  {
    id: "success-open-talent",
    universityId: "success",
    departmentId: "success-social",
    academicYear: 2027,
    name: "열린인재전형",
    type: "학종",
    studentRecordWeight: 60,
    source: { type: "university", academicYear: 2027 },
    isMock: false,
  },
  {
    id: "success-alternative-school",
    universityId: "success",
    departmentId: "success-social",
    academicYear: 2027,
    name: "대안학교출신자전형",
    type: "학종",
    studentRecordWeight: 60,
    source: { type: "university", academicYear: 2027 },
    isMock: false,
  },
];
