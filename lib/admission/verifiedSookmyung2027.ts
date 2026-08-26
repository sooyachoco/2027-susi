import type { Admission, Department, University } from "./types";

const source = {
  type: "adiga" as const,
  url: "https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000141",
  document: "숙명여자대학교 2027학년도 전형평가기준 및 결과공개",
  academicYear: 2027,
  confidence: 0.95,
};

/** 2027학년도 공식 자료에서 모집단위/전형 관계가 명시적으로 확인된 숙명여자대학교 핵심 데이터. */
export const verifiedSookmyung2027Universities: University[] = [
  { id: "sookmyung", name: "숙명여자대학교", region: "서울" },
];

export const verifiedSookmyung2027Departments: Department[] = [
  { id: "sookmyung-ai", universityId: "sookmyung", name: "인공지능공학부", category: "컴퓨터·소프트웨어" },
  { id: "sookmyung-cs", universityId: "sookmyung", name: "컴퓨터과학전공", category: "컴퓨터·소프트웨어" },
  { id: "sookmyung-data", universityId: "sookmyung", name: "데이터사이언스전공", category: "컴퓨터·소프트웨어" },
  { id: "sookmyung-free", universityId: "sookmyung", name: "자유전공학부", category: "자율전공" },
];

export const verifiedSookmyung2027Admissions: Admission[] = [
  ...["sookmyung-ai", "sookmyung-cs", "sookmyung-data"].map((departmentId) => ({
    id: `sookmyung-software-${departmentId}-2027`,
    universityId: "sookmyung",
    departmentId,
    academicYear: 2027,
    name: "소프트웨어인재",
    type: "학종" as const,
    documentWeight: 100,
    interview: true,
    csatMinimum: { enabled: false },
    source,
    isMock: false,
  })),
  {
    id: "sookmyung-free-region-2027",
    universityId: "sookmyung",
    departmentId: "sookmyung-free",
    academicYear: 2027,
    name: "지역균형선발",
    type: "교과",
    studentRecordWeight: 70,
    documentWeight: 30,
    csatMinimum: { enabled: false },
    source,
    isMock: false,
  },
];
