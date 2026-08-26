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
      csatMinimum: { enabled: false },
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
    {
      id: `${department.id}-essay-2027`,
      universityId: "gachon",
      departmentId: department.id,
      academicYear: 2027,
      name: "논술전형",
      type: "논술" as const,
      csatMinimum: { enabled: false },
      source: gachonSource,
      isMock: false,
    },
  ]),
];
