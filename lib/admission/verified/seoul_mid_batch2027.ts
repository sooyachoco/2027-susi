import type { Admission, Department, University } from "../types";

export const seoulMidBatch2027Universities: University[] = [
  { id: "kookmin", name: "국민대학교", region: "서울" },
  { id: "sejong", name: "세종대학교", region: "서울" },
  { id: "kwangwoon", name: "광운대학교", region: "서울" },
  { id: "hansung", name: "한성대학교", region: "서울" },
  { id: "dongduk", name: "동덕여자대학교", region: "서울" },
];

export const seoulMidBatch2027Departments: Department[] = [
  { id: "kookmin-business", universityId: "kookmin", name: "경영학부" },
  { id: "kookmin-computer", universityId: "kookmin", name: "소프트웨어학부" },
  { id: "sejong-business", universityId: "sejong", name: "경영학부" },
  { id: "sejong-computer", universityId: "sejong", name: "컴퓨터공학과" },
  { id: "kwangwoon-business", universityId: "kwangwoon", name: "경영학부" },
  { id: "kwangwoon-computer", universityId: "kwangwoon", name: "컴퓨터정보공학부" },
  { id: "hansung-business", universityId: "hansung", name: "경영학부" },
  { id: "hansung-computer", universityId: "hansung", name: "컴퓨터공학부" },
  { id: "dongduk-business", universityId: "dongduk", name: "경영학과" },
  { id: "dongduk-computer", universityId: "dongduk", name: "컴퓨터학과" },
];

export const seoulMidBatch2027Admissions: Admission[] = [
  ...seoulMidBatch2027Universities.flatMap((u) => {
    const d = seoulMidBatch2027Departments.find((x) => x.universityId === u.id);
    return d ? [
      { id: `${u.id}-batch-gyogwa`, universityId: u.id, departmentId: d.id, academicYear: 2027, name: "학생부교과", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
      { id: `${u.id}-batch-hakjong`, universityId: u.id, departmentId: d.id, academicYear: 2027, name: "학생부종합", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
    ] : [];
  }),
];
