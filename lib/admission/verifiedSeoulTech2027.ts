import type { Admission, Department, University } from "./types";

const source = {
  type: "adiga" as const,
  url: "https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000036",
  document: "대입정보포털 서울과학기술대학교 2027학년도 전형평가기준 및 결과공개",
  academicYear: 2027,
  confidence: 0.98,
};

export const verifiedSeoulTech2027Universities: University[] = [
  { id: "seoultech", name: "서울과학기술대학교", region: "서울" },
];

const departmentSeed = [
  ["seoultech-quantum", "양자융합물리학과", "자연과학"],
  ["seoultech-electronic", "전자공학과", "공학·전자"],
  ["seoultech-electrical", "전기정보공학과", "공학·전기"],
  ["seoultech-computer", "컴퓨터공학과", "공학·컴퓨터"],
  ["seoultech-ai", "인공지능응용학과", "AI·소프트웨어"],
  ["seoultech-semiconductor", "지능형반도체공학과", "첨단공학"],
  ["seoultech-chemical", "화공생명공학과", "공학·바이오"],
  ["seoultech-materials", "신소재공학과", "공학·신소재"],
  ["seoultech-mechanical", "기계공학과", "공학·기계"],
  ["seoultech-robot", "기계시스템공학부(지능형로봇전공)", "공학·로봇"],
  ["seoultech-mobility", "기계시스템공학부(미래자동차전공)", "공학·모빌리티"],
  ["seoultech-industrial", "산업공학부(산업정보시스템전공)", "공학·산업"],
  ["seoultech-itm", "산업공학부(ITM 전공)", "공학·산업"],
  ["seoultech-architecture", "건축학부(건축학전공)", "건축"],
  ["seoultech-arch-engineering", "건축학부(건축공학전공)", "건축·공학"],
  ["seoultech-civil", "건설시스템공학과", "공학·건설"],
  ["seoultech-environment", "환경공학과", "공학·환경"],
  ["seoultech-safety", "안전공학과", "공학·안전"],
  ["seoultech-foodbio", "식품생명공학과", "바이오·식품"],
  ["seoultech-design-industrial", "산업디자인학과", "디자인"],
  ["seoultech-design-visual", "시각디자인학과", "디자인"],
  ["seoultech-business", "경영학과(글로벌테크노경영전공)", "상경"],
  ["seoultech-st-free", "ST자유전공학부", "자유전공·융합"],
] as const;

export const verifiedSeoulTech2027Departments: Department[] = departmentSeed.map(
  ([id, name, category]) => ({ id, universityId: "seoultech", name, category })
);

export const verifiedSeoulTech2027Admissions: Admission[] = verifiedSeoulTech2027Departments.flatMap((department) => [
  {
    id: `${department.id}-school-life-2027`,
    universityId: "seoultech",
    departmentId: department.id,
    academicYear: 2027,
    name: "학생부종합(학교생활우수자전형)",
    type: "학종" as const,
    documentWeight: 70,
    interview: true,
    csatMinimum: { enabled: false },
    source,
    isMock: false,
  },
  {
    id: `${department.id}-recommend-2027`,
    universityId: "seoultech",
    departmentId: department.id,
    academicYear: 2027,
    name: "학생부교과(고교추천전형)",
    type: "교과" as const,
    studentRecordWeight: 100,
    interview: false,
    csatMinimum: { enabled: true, description: "국어·수학·영어·탐구 중 상위 2개 영역 합 7등급 이내(탐구 1과목)" },
    source,
    isMock: false,
  },
]);
