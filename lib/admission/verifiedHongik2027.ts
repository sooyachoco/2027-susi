import type { Admission, Department, University } from "./types";

const source = {
  type: "adiga" as const,
  url: "https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000212",
  document: "홍익대학교 2027학년도 전형평가기준 및 결과공개",
  academicYear: 2027,
  confidence: 0.95,
};

export const verifiedHongik2027Universities: University[] = [
  { id: "hongik", name: "홍익대학교", region: "서울" },
];

export const verifiedHongik2027Departments: Department[] = [
  { id: "hongik-business", universityId: "hongik", name: "경영학부", category: "경영·경제" },
  { id: "hongik-cs", universityId: "hongik", name: "컴퓨터공학과", category: "컴퓨터·소프트웨어" },
];

export const verifiedHongik2027Admissions: Admission[] = verifiedHongik2027Departments.flatMap((department) => [
  {
    id: `${department.id}-school-record-2027`,
    universityId: "hongik",
    departmentId: department.id,
    academicYear: 2027,
    name: "학교생활우수자전형",
    type: "학종",
    documentWeight: 100,
    interview: false,
    csatMinimum: { enabled: true, description: "국어·수학·영어·탐구 중 2개 영역 등급합 5 이내 및 한국사 4등급 이내" },
    source,
    isMock: false,
  },
  {
    id: `${department.id}-school-recommendation-2027`,
    universityId: "hongik",
    departmentId: department.id,
    academicYear: 2027,
    name: "학교장추천자전형(서울)",
    type: "교과",
    studentRecordWeight: 100,
    csatMinimum: { enabled: true, description: "국어·수학·영어·탐구 중 2개 영역 등급합 5 이내 및 한국사 4등급 이내" },
    source,
    isMock: false,
  },
]);
