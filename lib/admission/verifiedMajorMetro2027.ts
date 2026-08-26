import type { Admission, Department, University } from "@/lib/types";

const sourceAjou = {
  type: "adiga" as const,
  url: "https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000146",
  academicYear: 2027,
  verifiedAt: "2026-08-27",
  confidence: 0.98,
};
const sourceInha = {
  type: "adiga" as const,
  url: "https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000169",
  academicYear: 2027,
  verifiedAt: "2026-08-27",
  confidence: 0.98,
};
const sourceGachon = {
  type: "adiga" as const,
  url: "https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000063",
  academicYear: 2027,
  verifiedAt: "2026-08-27",
  confidence: 0.98,
};

export const verifiedMajorMetro2027Universities: University[] = [
  { id: "ajou", name: "아주대학교", region: "경기" },
  { id: "inha", name: "인하대학교", region: "인천" },
  { id: "gachon", name: "가천대학교", region: "경기" },
];

export const verifiedMajorMetro2027Departments: Department[] = [
  { id: "ajou-business", universityId: "ajou", name: "경영학과", category: "경영·경제" },
  { id: "ajou-ai-computer", universityId: "ajou", name: "AI컴퓨터공학부", category: "컴퓨터·소프트웨어" },
  { id: "ajou-electronics", universityId: "ajou", name: "전자공학과", category: "공학" },
  { id: "inha-business", universityId: "inha", name: "경영학과", category: "경영·경제" },
  { id: "inha-computer", universityId: "inha", name: "컴퓨터공학과", category: "컴퓨터·소프트웨어" },
  { id: "inha-ai", universityId: "inha", name: "인공지능공학과", category: "컴퓨터·소프트웨어" },
  { id: "gachon-business", universityId: "gachon", name: "경영학부", category: "경영·경제" },
  { id: "gachon-computer", universityId: "gachon", name: "컴퓨터공학과", category: "컴퓨터·소프트웨어" },
  { id: "gachon-ai", universityId: "gachon", name: "AI·소프트웨어학부", category: "컴퓨터·소프트웨어" },
];

function admissions(
  universityId: string,
  departmentIds: string[],
  entries: Array<Pick<Admission, "name" | "type" | "studentRecordWeight" | "documentWeight" | "interview" | "csatMinimum" | "source">>,
): Admission[] {
  return departmentIds.flatMap((departmentId) => entries.map((entry) => ({
    id: `${universityId}-${departmentId}-${entry.name.replace(/[^가-힣A-Za-z0-9]/g, "-")}`,
    universityId,
    departmentId,
    academicYear: 2027,
    ...entry,
    isMock: false,
  })));
}

export const verifiedMajorMetro2027Admissions: Admission[] = [
  ...admissions("ajou", ["ajou-business", "ajou-ai-computer", "ajou-electronics"], [
    { name: "학생부교과(고교추천전형)", type: "교과", studentRecordWeight: 100, csatMinimum: { enabled: true, description: "전체(의학과 제외): 국어·수학·영어·탐구 중 2개 영역 등급 합 5 이내" }, source: sourceAjou },
    { name: "학생부종합(ACE전형)", type: "학종", documentWeight: 70, interview: true, csatMinimum: { enabled: false }, source: sourceAjou },
    { name: "학생부종합(첨단융합인재전형)", type: "학종", documentWeight: 70, interview: true, csatMinimum: { enabled: false }, source: sourceAjou },
  ]),
  ...admissions("inha", ["inha-business", "inha-computer", "inha-ai"], [
    { name: "학생부교과(지역균형)", type: "교과", studentRecordWeight: 100, csatMinimum: { enabled: true, description: "인문: 국어·수학·영어·탐구 중 2개 합 6 이내 / 자연(의예과 외): 2개 합 5 이내" }, source: sourceInha },
    { name: "학생부종합(인하미래인재(면접형))", type: "학종", documentWeight: 70, interview: true, csatMinimum: { enabled: false }, source: sourceInha },
    { name: "학생부종합(인하미래인재(서류형))", type: "학종", documentWeight: 100, interview: false, csatMinimum: { enabled: false }, source: sourceInha },
  ]),
  ...admissions("gachon", ["gachon-business", "gachon-computer", "gachon-ai"], [
    { name: "학생부교과(학생부우수자)", type: "교과", studentRecordWeight: 100, csatMinimum: { enabled: true, description: "수능최저학력기준 적용" }, source: sourceGachon },
    { name: "학생부교과(지역균형)", type: "교과", studentRecordWeight: 100, interview: true, source: sourceGachon },
    { name: "학생부종합(가천바람개비)", type: "학종", documentWeight: 50, interview: true, csatMinimum: { enabled: false }, source: sourceGachon },
    { name: "논술전형", type: "논술", studentRecordWeight: 0, csatMinimum: { enabled: true, description: "수능최저학력기준 적용" }, source: sourceGachon },
  ]),
];
