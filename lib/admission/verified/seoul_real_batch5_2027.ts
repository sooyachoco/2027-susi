import type { Admission, Department, University } from "../types";

export const seoulRealBatch5Universities: University[] = [
  { id: "sogang", name: "서강대학교", region: "서울" },
  { id: "dongguk", name: "동국대학교", region: "서울" },
  { id: "soongsil", name: "숭실대학교", region: "서울" },
  { id: "konkuk", name: "건국대학교", region: "서울" },
  { id: "hongik", name: "홍익대학교", region: "서울" },
];

export const seoulRealBatch5Departments: Department[] = [
  { id: "sogang-business-real", universityId: "sogang", name: "경영학부" },
  { id: "sogang-computer-real", universityId: "sogang", name: "컴퓨터공학과" },
  { id: "dongguk-business-real", universityId: "dongguk", name: "경영학과" },
  { id: "dongguk-computer-real", universityId: "dongguk", name: "컴퓨터공학전공" },
  { id: "soongsil-business-real", universityId: "soongsil", name: "경영학부" },
  { id: "soongsil-computer-real", universityId: "soongsil", name: "컴퓨터학부" },
  { id: "konkuk-business-real", universityId: "konkuk", name: "경영학과" },
  { id: "konkuk-computer-real", universityId: "konkuk", name: "컴퓨터공학부" },
  { id: "hongik-business-real", universityId: "hongik", name: "경영학부" },
  { id: "hongik-computer-real", universityId: "hongik", name: "컴퓨터공학과" },
];

export const seoulRealBatch5Admissions: Admission[] = [
  { id: "sogang-real-hakjong", universityId: "sogang", departmentId: "sogang-business-real", academicYear: 2027, name: "학생부종합(일반)", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "sogang-real-gyogwa", universityId: "sogang", departmentId: "sogang-business-real", academicYear: 2027, name: "지역균형", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "dongguk-real-hakjong", universityId: "dongguk", departmentId: "dongguk-business-real", academicYear: 2027, name: "Do Dream", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "dongguk-real-gyogwa", universityId: "dongguk", departmentId: "dongguk-business-real", academicYear: 2027, name: "학교장추천인재", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "soongsil-real-hakjong", universityId: "soongsil", departmentId: "soongsil-business-real", academicYear: 2027, name: "SSU미래인재(면접형)", type: "학종", interview: true, documentWeight: 50, csatMinimum: { enabled: false, description: "수능 최저학력기준 없음" }, source: { type: "university", academicYear: 2027, document: "2027학년도 입학전형 시행계획", url: "https://admission.ssu.ac.kr/upload/2027_plan3.pdf", verifiedAt: "2026-08-27", confidence: 0.99 }, isMock: false },
  { id: "soongsil-real-hakjong-document", universityId: "soongsil", departmentId: "soongsil-business-real", academicYear: 2027, name: "SSU미래인재(서류형)", type: "학종", interview: false, documentWeight: 100, csatMinimum: { enabled: false, description: "수능 최저학력기준 없음" }, source: { type: "university", academicYear: 2027, document: "2027학년도 입학전형 시행계획", url: "https://admission.ssu.ac.kr/upload/2027_plan3.pdf", verifiedAt: "2026-08-27", confidence: 0.99 }, isMock: false },
  { id: "soongsil-real-gyogwa", universityId: "soongsil", departmentId: "soongsil-business-real", academicYear: 2027, name: "교과우수자전형", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027, document: "2027학년도 입학전형 시행계획", url: "https://admission.ssu.ac.kr/upload/2027_plan3.pdf", verifiedAt: "2026-08-27", confidence: 0.99 }, isMock: false },
  { id: "konkuk-real-hakjong", universityId: "konkuk", departmentId: "konkuk-business-real", academicYear: 2027, name: "KU자기추천", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "konkuk-real-gyogwa", universityId: "konkuk", departmentId: "konkuk-business-real", academicYear: 2027, name: "KU지역균형", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "hongik-real-hakjong", universityId: "hongik", departmentId: "hongik-business-real", academicYear: 2027, name: "학교생활우수자", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "hongik-real-gyogwa", universityId: "hongik", departmentId: "hongik-business-real", academicYear: 2027, name: "학교장추천자", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
];
