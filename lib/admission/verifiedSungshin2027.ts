import type { Admission, Department, University } from "./types";
import { verifiedSangmyung2027Admissions, verifiedSangmyung2027Departments, verifiedSangmyung2027Universities } from "./verifiedSangmyung2027";
import { verifiedHansung2027Admissions, verifiedHansung2027Departments, verifiedHansung2027Universities } from "./verifiedHansung2027";

export const verifiedSungshin2027Universities: University[] = [
  { id: "sungshin-2027", name: "성신여자대학교", region: "서울" },
  ...verifiedSangmyung2027Universities,
  ...verifiedHansung2027Universities,
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
  ...verifiedSangmyung2027Departments,
  ...verifiedHansung2027Departments,
];

const source = {
  type: "university" as const,
  url: "https://ipsi.sungshin.ac.kr/bbs/fileview.php?bbsid=guideline&file_seq=2871",
  document: "성신여자대학교 2027학년도 수시 신입생 모집요강",
  academicYear: 2027,
  confidence: 0.99,
};

const coreRecruitment: Record<string, { self: number; regional: number; essay: number }> = {
  "sungshin-business": { self: 27, regional: 6, essay: 6 },
  "sungshin-economics": { self: 14, regional: 5, essay: 4 },
  "sungshin-media": { self: 12, regional: 5, essay: 4 },
  "sungshin-computer": { self: 17, regional: 7, essay: 5 },
  "sungshin-ai": { self: 27, regional: 8, essay: 6 },
  "sungshin-law": { self: 30, regional: 7, essay: 8 },
};

const coreAdmissions: Admission[] = coreDepartments.flatMap((department) => {
  const counts = coreRecruitment[department.id];
  const common = { universityId: "sungshin-2027", departmentId: department.id, academicYear: 2027, source, isMock: false };
  return [
    { ...common, id: `${department.id}-self-directed-2027`, name: "학생부종합(자기주도인재)", type: "학종" as const, recruitmentCount: counts.self, documentWeight: 60, interview: true, csatMinimum: { enabled: false } },
    { ...common, id: `${department.id}-regional-2027`, name: "학생부교과(지역균형)", type: "교과" as const, recruitmentCount: counts.regional, studentRecordWeight: 100, csatMinimum: { enabled: false } },
    { ...common, id: `${department.id}-essay-2027`, name: "논술우수자", type: "논술" as const, recruitmentCount: counts.essay, csatMinimum: { enabled: true } },
  ];
});

const educationRecruitment: Record<string, number> = {
  "sungshin-education": 10,
  "sungshin-social-education": 10,
  "sungshin-ethics-education": 10,
  "sungshin-chinese-education": 10,
  "sungshin-early-childhood": 13,
};

const educationAdmissions: Admission[] = educationDepartments.flatMap((department) => {
  const common = { universityId: "sungshin-2027", departmentId: department.id, academicYear: 2027, source, isMock: false };
  return [
    { ...common, id: `${department.id}-self-directed-2027`, name: "학생부종합(자기주도인재)", type: "학종" as const, recruitmentCount: educationRecruitment[department.id], documentWeight: 60, interview: true, csatMinimum: { enabled: false } },
    { ...common, id: `${department.id}-regional-2027`, name: "학생부교과(지역균형)", type: "교과" as const, recruitmentCount: department.id === "sungshin-early-childhood" ? 5 : 4, studentRecordWeight: 100, csatMinimum: { enabled: false } },
  ];
});

export const verifiedSungshin2027Admissions: Admission[] = [
  ...coreAdmissions,
  ...educationAdmissions,
  ...verifiedSangmyung2027Admissions,
  ...verifiedHansung2027Admissions,
];
