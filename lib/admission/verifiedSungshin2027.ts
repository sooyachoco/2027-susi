import type { Admission, Department, University } from "./types";

export const verifiedSungshin2027Universities: University[] = [
  { id: "sungshin-2027", name: "성신여자대학교", region: "서울" },
];

const coreDepartments = [
  { id: "sungshin-business", name: "경영학과", category: "경영·경제" },
  { id: "sungshin-economics", name: "경제학과", category: "경영·경제" },
  { id: "sungshin-media", name: "미디어커뮤니케이션학과", category: "미디어·콘텐츠" },
  { id: "sungshin-computer", name: "컴퓨터공학과", category: "컴퓨터·소프트웨어" },
  { id: "sungshin-ai", name: "AI융합학과", category: "컴퓨터·소프트웨어" },
  { id: "sungshin-ai-semiconductor", name: "융합AI반도체공학과", category: "컴퓨터·소프트웨어" },
  { id: "sungshin-law", name: "법학부", category: "법·행정" },
];

const educationDepartments = [
  { id: "sungshin-education", name: "교육학과", category: "교육·사범" },
  { id: "sungshin-social-education", name: "사회교육과", category: "교육·사범" },
  { id: "sungshin-ethics-education", name: "윤리교육과", category: "교육·사범" },
  { id: "sungshin-chinese-education", name: "한문교육과", category: "교육·사범" },
  { id: "sungshin-early-childhood", name: "유아교육과", category: "교육·사범" },
];

export const verifiedSungshin2027Departments: Department[] = [
  ...[...coreDepartments, ...educationDepartments].map((department) => ({ ...department, universityId: "sungshin-2027" })),
];

const source = {
  type: "university" as const,
  url: "https://ipsi.sungshin.ac.kr/guide/recruit.htm?ctg_cd=susi",
  document: "성신여자대학교 2027학년도 수시 신입생 모집요강",
  academicYear: 2027,
  confidence: 0.99,
};

const csatMinimum = {
  enabled: true,
  description: "국어·영어·수학·탐구(상위 1과목) 중 2개 영역 합 7등급 이내",
};

const essayDepartmentIds = new Set([
  "sungshin-business",
  "sungshin-economics",
  "sungshin-media",
  "sungshin-computer",
  "sungshin-ai",
  "sungshin-law",
]);

// 2027 최종 모집요강의 전형방법을 현재 저장소에 등록된 모집단위에 우선 연결한다.
// 모집인원은 모집단위별 표의 2차 검증에서 별도 반영한다.
const selfDirectedDepartmentIds = new Set(verifiedSungshin2027Departments.map(({ id }) => id));
const regionalDepartmentIds = new Set(verifiedSungshin2027Departments.map(({ id }) => id));

const essayAdmissions: Admission[] = verifiedSungshin2027Departments
  .filter((department) => essayDepartmentIds.has(department.id))
  .map((department) => ({
    id: `${department.id}-essay-2027`,
    universityId: "sungshin-2027",
    departmentId: department.id,
    academicYear: 2027,
    name: "논술우수자전형",
    type: "논술",
    csatMinimum,
    source,
    isMock: false,
  }));

const selfDirectedAdmissions: Admission[] = verifiedSungshin2027Departments
  .filter((department) => selfDirectedDepartmentIds.has(department.id))
  .map((department) => ({
    id: `${department.id}-self-directed-2027`,
    universityId: "sungshin-2027",
    departmentId: department.id,
    academicYear: 2027,
    name: "자기주도인재",
    type: "학종",
    documentWeight: 60,
    interview: true,
    source,
    isMock: false,
  }));

const regionalAdmissions: Admission[] = verifiedSungshin2027Departments
  .filter((department) => regionalDepartmentIds.has(department.id))
  .map((department) => ({
    id: `${department.id}-regional-2027`,
    universityId: "sungshin-2027",
    departmentId: department.id,
    academicYear: 2027,
    name: "지역균형",
    type: "교과",
    studentRecordWeight: 100,
    csatMinimum,
    source,
    isMock: false,
  }));

export const verifiedSungshin2027Admissions: Admission[] = [
  ...essayAdmissions,
  ...selfDirectedAdmissions,
  ...regionalAdmissions,
];

void source;
