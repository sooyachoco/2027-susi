import type { Admission, Department, University } from "./types";

export const verifiedSogang2027Universities: University[] = [
  { id: "sogang-2027", name: "서강대학교", region: "서울" },
];

const names = [
  "국어국문학과", "영어영문학과", "사학과", "철학과", "종교학과", "사회학과", "정치외교학과", "심리학과",
  "경제학과", "경영학부", "커뮤니케이션학부", "유럽문화학과", "중국문화학과", "수학과", "물리학과", "화학과", "생명과학과",
  "전자공학과", "컴퓨터공학과", "화공생명공학과", "기계공학과", "인공지능학과", "시스템반도체공학과", "글로벌한국학부", "국제한국학과",
  "지식융합미디어학부", "자유전공학부",
];

export const verifiedSogang2027Departments: Department[] = names.map((name, i) => ({
  id: `sogang-2027-${i + 1}`,
  universityId: "sogang-2027",
  name,
}));

const source = {
  type: "university" as const,
  url: "https://admission3.sogang.ac.kr/enter/html/rolling/guide.asp",
  document: "서강대학교 2027학년도 수시모집요강",
  academicYear: 2027,
  confidence: 0.99,
};

export const verifiedSogang2027Admissions: Admission[] = verifiedSogang2027Departments.flatMap((department) => [
  {
    id: `${department.id}-region`, universityId: "sogang-2027", departmentId: department.id, academicYear: 2027,
    name: "학생부교과(지역균형)", type: "교과", studentRecordWeight: 100,
    csatMinimum: { enabled: false }, source, isMock: false,
  },
  {
    id: `${department.id}-general`, universityId: "sogang-2027", departmentId: department.id, academicYear: 2027,
    name: "학생부종합(일반)", type: "학종", documentWeight: 100,
    csatMinimum: { enabled: false }, source, isMock: false,
  },
  {
    id: `${department.id}-essay`, universityId: "sogang-2027", departmentId: department.id, academicYear: 2027,
    name: "논술(일반)", type: "논술", studentRecordWeight: 10,
    csatMinimum: { enabled: true, description: "모집단위별 수능최저학력기준은 2027 모집요강 확인" }, source, isMock: false,
  },
]);
