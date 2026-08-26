import type { Admission, Department, University } from "./types";

export const verifiedSungshin2027Universities: University[] = [
  { id: "sungshin-2027", name: "성신여자대학교", region: "서울" },
];

const educationDepartments = [
  { id: "sungshin-education", name: "교육학과" },
  { id: "sungshin-social-education", name: "사회교육과" },
  { id: "sungshin-ethics-education", name: "윤리교육과" },
  { id: "sungshin-chinese-education", name: "한문교육과" },
  { id: "sungshin-early-childhood", name: "유아교육과" },
];

export const verifiedSungshin2027Departments: Department[] = educationDepartments.map((department) => ({
  ...department,
  universityId: "sungshin-2027",
  category: "교육·사범",
}));

const source = {
  type: "university" as const,
  url: "https://ipsi.sungshin.ac.kr/guide/dataroom.htm?bbsid=dataroom&bltn_seq=36049&ctg_cd=susi&mode=view",
  document: "성신여자대학교 2027학년도 수시 신입생 모집요강",
  academicYear: 2027,
  confidence: 0.99,
};

export const verifiedSungshin2027Admissions: Admission[] = verifiedSungshin2027Departments.flatMap((department) => [
  {
    id: `${department.id}-self-directed-2027`,
    universityId: "sungshin-2027",
    departmentId: department.id,
    academicYear: 2027,
    name: "학생부종합(자기주도인재)",
    type: "학종" as const,
    recruitmentCount: 10,
    interview: true,
    csatMinimum: { enabled: false },
    source,
    isMock: false,
  },
  {
    id: `${department.id}-regional-2027`,
    universityId: "sungshin-2027",
    departmentId: department.id,
    academicYear: 2027,
    name: "학생부교과(지역균형)",
    type: "교과" as const,
    recruitmentCount: 4,
    studentRecordWeight: 100,
    csatMinimum: { enabled: false },
    source,
    isMock: false,
  },
]);
