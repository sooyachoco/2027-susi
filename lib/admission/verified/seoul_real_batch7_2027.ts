import type { Admission, Department, University } from "../types";

export const seoulRealBatch7Universities: University[] = [
  { id: "korea_univ", name: "고려대학교", region: "서울" },
  { id: "yonsei_univ", name: "연세대학교", region: "서울" },
  { id: "ewha_univ", name: "이화여자대학교", region: "서울" },
  { id: "chungang_univ", name: "중앙대학교", region: "서울" },
];

export const seoulRealBatch7Departments: Department[] = [
  { id: "korea_business", universityId: "korea_univ", name: "경영학과" },
  { id: "korea_computer", universityId: "korea_univ", name: "컴퓨터학과" },
  { id: "yonsei_business", universityId: "yonsei_univ", name: "경영학과" },
  { id: "yonsei_computer", universityId: "yonsei_univ", name: "컴퓨터과학과" },
  { id: "ewha_business", universityId: "ewha_univ", name: "경영학부" },
  { id: "ewha_computer", universityId: "ewha_univ", name: "컴퓨터공학과" },
  { id: "chungang_business", universityId: "chungang_univ", name: "경영학부" },
  { id: "chungang_computer", universityId: "chungang_univ", name: "소프트웨어학부" },
];

export const seoulRealBatch7Admissions: Admission[] = [
  { id: "korea_hakjong", universityId: "korea_univ", departmentId: "korea_business", academicYear: 2027, name: "학생부종합전형", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "yonsei_hakjong", universityId: "yonsei_univ", departmentId: "yonsei_business", academicYear: 2027, name: "학생부종합전형", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "ewha_hakjong", universityId: "ewha_univ", departmentId: "ewha_business", academicYear: 2027, name: "미래인재전형", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "ewha_gyogwa", universityId: "ewha_univ", departmentId: "ewha_business", academicYear: 2027, name: "고교추천전형", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "chungang_hakjong", universityId: "chungang_univ", departmentId: "chungang_business", academicYear: 2027, name: "CAU융합형인재전형", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "chungang_gyogwa", universityId: "chungang_univ", departmentId: "chungang_business", academicYear: 2027, name: "지역균형전형", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
];
