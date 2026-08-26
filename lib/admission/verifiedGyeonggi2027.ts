import type { Admission, Department, University } from "./types";

export const verifiedGyeonggi2027Universities: University[] = [
  { id: "kyonggi", name: "경기대학교", region: "경기" },
  { id: "gachon", name: "가천대학교", region: "경기" },
];

export const verifiedGyeonggi2027Departments: Department[] = [
  { id: "kyonggi-law", universityId: "kyonggi", name: "법학과", category: "법·행정" },
  { id: "kyonggi-business", universityId: "kyonggi", name: "경영학부", category: "경영·경제" },
  { id: "kyonggi-sw", universityId: "kyonggi", name: "AI컴퓨터공학부", category: "컴퓨터·소프트웨어" },
  { id: "gachon-law", universityId: "gachon", name: "법학과", category: "법·행정" },
  { id: "gachon-business", universityId: "gachon", name: "경영학부", category: "경영·경제" },
  { id: "gachon-sw", universityId: "gachon", name: "컴퓨터공학과", category: "컴퓨터·소프트웨어" },
  { id: "gachon-accounting-tax", universityId: "gachon", name: "회계세무학과", category: "경영·경제" },
  { id: "gachon-tourism-business", universityId: "gachon", name: "관광경영학과", category: "경영·관광" },
  { id: "gachon-medical-industry-business", universityId: "gachon", name: "의료산업경영학과", category: "보건·경영" },
  { id: "gachon-finance-bigdata", universityId: "gachon", name: "금융·빅데이터학부", category: "금융·데이터" },
  { id: "gachon-media", universityId: "gachon", name: "미디어커뮤니케이션학과", category: "미디어·커뮤니케이션" },
  { id: "gachon-economics", universityId: "gachon", name: "경제학과", category: "경영·경제" },
  { id: "gachon-applied-statistics", universityId: "gachon", name: "응용통계학과", category: "수학·통계" },
  { id: "gachon-social-welfare", universityId: "gachon", name: "사회복지학과", category: "사회과학" },
  { id: "gachon-ai-system", universityId: "gachon", name: "인공지능시스템학과", category: "AI·소프트웨어" },
];

const kyonggiSource = {
  type: "adiga" as const,
  url: "https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000056",
  document: "경기대학교 2027학년도 전형평가기준 및 결과공개",
  academicYear: 2027,
  confidence: 0.95,
};

const gachonSource = {
  type: "adiga" as const,
  url: "https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000063",
  document: "가천대학교 2027학년도 전형평가기준 및 결과공개",
  academicYear: 2027,
  confidence: 0.95,
};

const kyonggiDepartments = verifiedGyeonggi2027Departments.filter((d) => d.universityId === "kyonggi");
const gachonDepartments = verifiedGyeonggi2027Departments.filter((d) => d.universityId === "gachon");

export const verifiedGyeonggi2027Admissions: Admission[] = [
  ...kyonggiDepartments.flatMap((department) => [
    {
      id: `${department.id}-kgu-2027`,
      universityId: "kyonggi",
      departmentId: department.id,
      academicYear: 2027,
      name: "학생부종합(KGU 학생부종합전형)",
      type: "학종" as const,
      documentWeight: 70,
      interview: true,
      csatMinimum: { enabled: false },
      source: kyonggiSource,
      isMock: false,
    },
    {
      id: `${department.id}-grade-2027`,
      universityId: "kyonggi",
      departmentId: department.id,
      academicYear: 2027,
      name: "학생부교과(교과성적우수자전형)",
      type: "교과" as const,
      studentRecordWeight: 90,
      csatMinimum: { enabled: true, description: "국어·수학·영어·탐구(1) 중 상위 2개 영역 합 7 이내, 한국사 6등급 이내" },
      source: kyonggiSource,
      isMock: false,
    },
    {
      id: `${department.id}-recommend-2027`,
      universityId: "kyonggi",
      departmentId: department.id,
      academicYear: 2027,
      name: "학생부교과(학교장추천전형)",
      type: "교과" as const,
      studentRecordWeight: 90,
      csatMinimum: { enabled: false },
      source: kyonggiSource,
      isMock: false,
    },
  ]),
  ...gachonDepartments.flatMap((department) => [
    {
      id: `${department.id}-baram-2027`,
      universityId: "gachon",
      departmentId: department.id,
      academicYear: 2027,
      name: "학생부종합(가천바람개비)",
      type: "학종" as const,
      documentWeight: 50,
      interview: true,
      csatMinimum: { enabled: false },
      source: gachonSource,
      isMock: false,
    },
    {
      id: `${department.id}-excellent-2027`,
      universityId: "gachon",
      departmentId: department.id,
      academicYear: 2027,
      name: "학생부교과(학생부우수자)",
      type: "교과" as const,
      studentRecordWeight: 100,
      csatMinimum: { enabled: true, description: "수능최저 적용 여부는 모집단위별 2027 수시모집요강 확인" },
      source: gachonSource,
      isMock: false,
    },
    {
      id: `${department.id}-region-2027`,
      universityId: "gachon",
      departmentId: department.id,
      academicYear: 2027,
      name: "학생부교과(지역균형)",
      type: "교과" as const,
      studentRecordWeight: 100,
      interview: true,
      csatMinimum: { enabled: false },
      source: gachonSource,
      isMock: false,
    },
  ]),
];
