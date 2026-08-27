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

// 전형별 모집단위 매핑을 공식 모집요강 표와 대조하기 전에는
// 다른 대학의 데이터를 성신여대 데이터에 섞지 않는다.
// 기존 파일은 상명대/한성대를 성신여대 export에 포함시키는 오류가 있었으므로 제거했다.
export const verifiedSungshin2027Admissions: Admission[] = [];

void source;
