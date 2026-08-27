import type { Admission, Department, University } from "../types";

/**
 * Canonical Seoul verified dataset additions.
 * Source basis: 2027 대입정보포털 대학별 공개자료.
 * Keep one canonical ID per university/department/admission to prevent duplicate rows.
 */
export const seoulCanonical2027Universities: University[] = [
  { id: "sookmyung", name: "숙명여자대학교", region: "서울" },
  { id: "sungshin", name: "성신여자대학교", region: "서울" },
  { id: "dongguk", name: "동국대학교", region: "서울" },
  { id: "seoulwomen", name: "서울여자대학교", region: "서울" },
  { id: "myongji", name: "명지대학교", region: "서울" },
];

export const seoulCanonical2027Departments: Department[] = [
  { id: "sookmyung-business-canonical", universityId: "sookmyung", name: "경영학부" },
  { id: "sungshin-business-canonical", universityId: "sungshin", name: "경영학과" },
  { id: "dongguk-business-canonical", universityId: "dongguk", name: "경영학과" },
  { id: "seoulwomen-business-canonical", universityId: "seoulwomen", name: "경영학과" },
  { id: "myongji-business-canonical", universityId: "myongji", name: "경영학과" },
];

export const seoulCanonical2027Admissions: Admission[] = [
  { id: "sookmyung-region-balance-canonical", universityId: "sookmyung", departmentId: "sookmyung-business-canonical", academicYear: 2027, name: "지역균형선발전형", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "sookmyung-talent-document-canonical", universityId: "sookmyung", departmentId: "sookmyung-business-canonical", academicYear: 2027, name: "숙명인재(서류형)", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "sungshin-region-balance-canonical", universityId: "sungshin", departmentId: "sungshin-business-canonical", academicYear: 2027, name: "지역균형전형", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "sungshin-school-record-canonical", universityId: "sungshin", departmentId: "sungshin-business-canonical", academicYear: 2027, name: "학교생활우수자전형", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "dongguk-do-dream-canonical", universityId: "dongguk", departmentId: "dongguk-business-canonical", academicYear: 2027, name: "Do Dream", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "dongguk-school-recommend-canonical", universityId: "dongguk", departmentId: "dongguk-business-canonical", academicYear: 2027, name: "학교장추천인재", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "seoulwomen-school-record-canonical", universityId: "seoulwomen", departmentId: "seoulwomen-business-canonical", academicYear: 2027, name: "교과우수자전형", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "seoulwomen-barom-document-canonical", universityId: "seoulwomen", departmentId: "seoulwomen-business-canonical", academicYear: 2027, name: "바롬인재서류전형", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "myongji-school-recommend-canonical", universityId: "myongji", departmentId: "myongji-business-canonical", academicYear: 2027, name: "학교장추천전형", type: "교과", studentRecordWeight: 100, source: { type: "university", academicYear: 2027 }, isMock: false },
  { id: "myongji-myeongji-talent-document-canonical", universityId: "myongji", departmentId: "myongji-business-canonical", academicYear: 2027, name: "명지인재서류전형", type: "학종", source: { type: "university", academicYear: 2027 }, isMock: false },
];
