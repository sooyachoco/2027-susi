import type { Admission, Department, University } from "../types";

export const seoulRealBatch4Universities: University[] = [
  { id: "gachon_seoul", name: "가톨릭대학교", region: "서울" },
  { id: "sookmyung", name: "숙명여자대학교", region: "서울" },
  { id: "sungshin", name: "성신여자대학교", region: "서울" },
  { id: "seoul_women", name: "서울여자대학교", region: "서울" },
];

export const seoulRealBatch4Departments: Department[] = [
  { id: "sookmyung-business", universityId: "sookmyung", name: "경영학부" },
  { id: "sookmyung-computer", universityId: "sookmyung", name: "컴퓨터과학전공" },
  { id: "sungshin-business", universityId: "sungshin", name: "경영학과" },
  { id: "sungshin-computer", universityId: "sungshin", name: "컴퓨터공학과" },
  { id: "seoul-women-business", universityId: "seoul_women", name: "경영학과" },
  { id: "seoul-women-software", universityId: "seoul_women", name: "소프트웨어융합학과" },
  { id: "catholic-business", universityId: "gachon_seoul", name: "경영학과" },
  { id: "catholic-computer", universityId: "gachon_seoul", name: "컴퓨터정보공학부" },
];

export const seoulRealBatch4Admissions: Admission[] = [
  { id: "sookmyung-real-hakjong", universityId: "sookmyung", departmentId: "sookmyung-business", academicYear: 2027, name: "숙명인재(서류형)", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "sookmyung-real-gyogwa", universityId: "sookmyung", departmentId: "sookmyung-business", academicYear: 2027, name: "지역균형선발전형", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "sungshin-real-hakjong", universityId: "sungshin", departmentId: "sungshin-business", academicYear: 2027, name: "학교생활우수자전형", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "sungshin-real-gyogwa", universityId: "sungshin", departmentId: "sungshin-business", academicYear: 2027, name: "지역균형전형", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "seoul-women-real-hakjong", universityId: "seoul_women", departmentId: "seoul-women-business", academicYear: 2027, name: "바롬인재서류전형", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "seoul-women-real-gyogwa", universityId: "seoul_women", departmentId: "seoul-women-business", academicYear: 2027, name: "교과우수자전형", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "catholic-real-hakjong", universityId: "gachon_seoul", departmentId: "catholic-business", academicYear: 2027, name: "잠재능력우수자전형", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
];
