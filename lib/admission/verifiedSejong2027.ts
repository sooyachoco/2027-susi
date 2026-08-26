import type { Admission, Department, University } from "./types";

const source = {
  type: "adiga" as const,
  url: "https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000138",
  document: "세종대학교 2027학년도 전형평가기준 및 결과공개",
  academicYear: 2027,
  confidence: 0.95,
};

/**
 * 세종대학교 2027학년도 핵심 모집단위에 대해 공식 공개자료로 확인한 전형 데이터.
 * 전체 모집단위가 아닌 핵심 3개 모집단위의 1차 검증분이며, 미확인 전형은 추가하지 않는다.
 */
export const verifiedSejong2027Universities: University[] = [
  { id: "sejong", name: "세종대학교", region: "서울" },
];

export const verifiedSejong2027Departments: Department[] = [
  { id: "sejong-law", universityId: "sejong", name: "법학부", category: "법·행정" },
  { id: "sejong-business", universityId: "sejong", name: "경영학부", category: "경영·경제" },
  { id: "sejong-cs", universityId: "sejong", name: "컴퓨터공학과", category: "컴퓨터·소프트웨어" },
];

const departments = verifiedSejong2027Departments;

export const verifiedSejong2027Admissions: Admission[] = departments.flatMap((department) => [
  {
    id: `${department.id}-sejong-talent-interview-2027`,
    universityId: "sejong",
    departmentId: department.id,
    academicYear: 2027,
    name: "세종인재 전형(면접형)",
    type: "학종",
    documentWeight: 60,
    interview: true,
    csatMinimum: { enabled: false },
    source,
    isMock: false,
  },
  {
    id: `${department.id}-sejong-talent-document-2027`,
    universityId: "sejong",
    departmentId: department.id,
    academicYear: 2027,
    name: "세종인재 전형(서류형)",
    type: "학종",
    documentWeight: 100,
    interview: false,
    csatMinimum: { enabled: false },
    source,
    isMock: false,
  },
  {
    id: `${department.id}-regional-balance-2027`,
    universityId: "sejong",
    departmentId: department.id,
    academicYear: 2027,
    name: "지역균형",
    type: "교과",
    studentRecordWeight: 100,
    csatMinimum: { enabled: true, description: "인문·자연 모집단위: 국어·수학·영어·탐구 중 2개 영역 등급합 6 이내" },
    source,
    isMock: false,
  },
]);
