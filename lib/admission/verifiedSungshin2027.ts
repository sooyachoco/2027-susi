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
  url: "https://ipsi.sungshin.ac.kr/guide/dataroom.htm?bbsid=dataroom&bltn_seq=36049&ctg_cd=susi&mode=view&page=1",
  document: "성신여자대학교 2027학년도 수시 신입생 모집요강",
  academicYear: 2027,
  confidence: 0.99,
};

const csatMinimum = {
  enabled: true,
  description: "국어·영어·수학·탐구(상위 1과목) 중 2개 영역 합 7등급 이내",
};

// 공식 2027 모집요강의 논술우수자전형 모집단위 표와
// 현재 저장소에 등록된 성신여대 모집단위 중 교집합만 우선 반영한다.
// 모집인원은 다음 검증 패스에서 모집단위별 표와 다시 대조한다.
const essayDepartmentIds = new Set([
  "sungshin-business",
  "sungshin-economics",
  "sungshin-media",
  "sungshin-computer",
  "sungshin-ai",
  "sungshin-law",
]);

export const verifiedSungshin2027Admissions: Admission[] = verifiedSungshin2027Departments
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

void source;
