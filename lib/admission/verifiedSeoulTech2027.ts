import type { Admission, Department, University } from "./types";

const source = {
  type: "university" as const,
  url: "https://www.seoultech.ac.kr/service/info/notice",
  document: "서울과학기술대학교 2027학년도 수시모집 모집요강",
  academicYear: 2027,
  confidence: 0.99,
};

export const verifiedSeoulTech2027Universities: University[] = [
  { id: "seoultech", name: "서울과학기술대학교", region: "서울" },
];

const departmentSeed = [
  ["seoultech-robot", "기계시스템공학부(지능형로봇전공)", "공학·로봇"],
  ["seoultech-mobility", "기계시스템공학부(미래자동차전공)", "공학·모빌리티"],
  ["seoultech-mechanical", "기계공학과", "공학·기계"],
  ["seoultech-safety", "안전공학과", "공학·안전"],
  ["seoultech-materials", "신소재공학과", "공학·신소재"],
  ["seoultech-civil", "건설시스템공학과", "공학·건설"],
  ["seoultech-arch-engineering", "건축학부(건축공학전공)", "건축·공학"],
  ["seoultech-architecture", "건축학부(건축학전공)", "건축"],
  ["seoultech-electrical", "전기정보공학과", "공학·전기"],
  ["seoultech-electronic", "전자공학과", "공학·전자"],
  ["seoultech-ict", "ICT융합공학과", "공학·ICT"],
  ["seoultech-computer", "컴퓨터공학과", "공학·컴퓨터"],
  ["seoultech-chemical", "화공생명공학과", "공학·바이오"],
  ["seoultech-environment", "환경공학과", "공학·환경"],
  ["seoultech-foodbio", "식품생명공학과", "바이오·식품"],
  ["seoultech-precision", "정밀화학과", "화학"],
  ["seoultech-optics", "안경광학과", "보건·광학"],
  ["seoultech-sports", "스포츠과학과", "체육"],
  ["seoultech-bio", "바이오메디컬학과", "공학·바이오"],
  ["seoultech-quantum", "양자융합물리학과", "자연과학"],
  ["seoultech-design-industrial", "산업디자인학과", "디자인"],
  ["seoultech-design-visual", "시각디자인학과", "디자인"],
  ["seoultech-ceramic", "도예학과", "디자인·공예"],
  ["seoultech-metal", "금속공예디자인학과", "디자인·공예"],
  ["seoultech-arts", "조형예술학과", "예술"],
  ["seoultech-public-admin", "행정학과", "사회과학"],
  ["seoultech-english", "영어영문학과", "인문"],
  ["seoultech-literature", "문예창작학과", "인문·문학"],
  ["seoultech-industrial-natural", "산업공학부(산업정보시스템전공)_자연", "공학·산업"],
  ["seoultech-industrial-humanities", "산업공학부(산업정보시스템전공)_인문", "공학·산업"],
  ["seoultech-itm-natural", "산업공학부(ITM전공)_자연", "공학·산업"],
  ["seoultech-itm-humanities", "산업공학부(ITM전공)_인문", "공학·산업"],
  ["seoultech-msde", "MSDE학과", "공학·산업"],
  ["seoultech-business", "경영학과(경영학전공)", "상경"],
  ["seoultech-global-business-humanities", "경영학과(글로벌테크노경영전공)_인문", "상경"],
  ["seoultech-global-business-natural", "경영학과(글로벌테크노경영전공)_자연", "상경·자연"],
  ["seoultech-free-engineering", "자유전공학부(공과대학)", "자유전공"],
  ["seoultech-free-information", "자유전공학부(정보통신대학)", "자유전공"],
  ["seoultech-free-energy", "자유전공학부(에너지바이오대학)", "자유전공"],
  ["seoultech-free-tech-business", "자유전공학부(기술경영융합대학)", "자유전공"],
  ["seoultech-free-humanities", "자유전공학부(인문사회대학)", "자유전공"],
  ["seoultech-ai", "인공지능응용학과", "AI·소프트웨어"],
  ["seoultech-semiconductor", "지능형반도체공학과", "첨단공학"],
  ["seoultech-energy", "미래에너지학과", "에너지"],
  ["seoultech-free-convergence", "자유전공학부(창의융합대학)", "자유전공·첨단"],
  ["seoultech-st-natural", "ST자유전공학부(자연)", "자유전공·자연"],
  ["seoultech-st-humanities", "ST자유전공학부(인문)", "자유전공·인문"],
] as const;

export const verifiedSeoulTech2027Departments: Department[] = departmentSeed.map(([id, name, category]) => ({
  id,
  universityId: "seoultech",
  name,
  category,
}));

const counts: Record<string, Partial<Record<"추천" | "우수" | "창의" | "논술" | "실기" | "보훈" | "기회" | "농어촌", number>>> = {
  "seoultech-robot": { 추천: 26, 우수: 26, 보훈: 1, 기회: 5, 농어촌: 3 },
  "seoultech-mobility": { 추천: 14, 우수: 15, 기회: 3, 농어촌: 2 },
  "seoultech-mechanical": { 추천: 38, 우수: 39, 보훈: 1, 기회: 9, 농어촌: 6 },
  "seoultech-safety": { 추천: 17, 우수: 18, 보훈: 1, 기회: 3, 농어촌: 2 },
  "seoultech-materials": { 추천: 20, 우수: 19, 보훈: 1, 기회: 4, 농어촌: 1 },
  "seoultech-civil": { 추천: 30, 우수: 31, 보훈: 1, 기회: 8, 농어촌: 1 },
  "seoultech-arch-engineering": { 추천: 19, 우수: 20, 보훈: 1, 기회: 4, 농어촌: 2 },
  "seoultech-architecture": { 추천: 12, 우수: 13, 보훈: 1, 기회: 3, 농어촌: 1 },
  "seoultech-electrical": { 추천: 27, 우수: 27, 보훈: 1, 기회: 7, 농어촌: 1 },
  "seoultech-electronic": { 추천: 22, 우수: 23, 보훈: 1, 기회: 5, 농어촌: 1 },
  "seoultech-ict": { 추천: 13, 우수: 14, 기회: 3, 농어촌: 1 },
  "seoultech-computer": { 추천: 22, 우수: 22, 보훈: 1, 기회: 3, 농어촌: 1 },
  "seoultech-chemical": { 추천: 15, 우수: 17, 보훈: 1, 기회: 3, 농어촌: 1 },
  "seoultech-environment": { 추천: 21, 우수: 20, 보훈: 1, 기회: 2, 농어촌: 3 },
  "seoultech-foodbio": { 추천: 13, 우수: 14, 보훈: 1, 기회: 2, 농어촌: 3 },
  "seoultech-precision": { 추천: 10, 우수: 10, 보훈: 1, 기회: 2, 농어촌: 3 },
  "seoultech-optics": { 추천: 10, 우수: 11, 보훈: 1, 기회: 2, 농어촌: 3 },
  "seoultech-sports": { 추천: 15, 우수: 3, 농어촌: 3, 실기: 3 },
  "seoultech-bio": { 추천: 6, 우수: 12, 창의: 2 },
  "seoultech-quantum": { 추천: 4, 창의: 9, 농어촌: 1 },
  "seoultech-design-industrial": { 추천: 13, 우수: 1, 실기: 7 },
  "seoultech-design-visual": { 추천: 3, 우수: 12, 보훈: 1, 기회: 1, 농어촌: 1, 실기: 3 },
  "seoultech-ceramic": { 실기: 14 },
  "seoultech-metal": { 추천: 3, 실기: 15, 보훈: 4 },
  "seoultech-arts": { 실기: 19 },
  "seoultech-public-admin": { 추천: 14, 우수: 13, 보훈: 1, 기회: 2, 농어촌: 1 },
  "seoultech-english": { 추천: 9, 우수: 9, 기회: 2, 농어촌: 1 },
  "seoultech-literature": { 추천: 31, 보훈: 1, 기회: 2, 농어촌: 1 },
  "seoultech-industrial-natural": { 추천: 18, 우수: 17, 보훈: 1, 기회: 3, 농어촌: 1 },
  "seoultech-industrial-humanities": {},
  "seoultech-itm-natural": { 추천: 9, 우수: 10, 보훈: 1, 기회: 1 },
  "seoultech-itm-humanities": {},
  "seoultech-msde": { 추천: 12, 우수: 12, 보훈: 1, 기회: 2 },
  "seoultech-business": { 추천: 13, 우수: 14, 보훈: 1, 기회: 2, 농어촌: 1 },
  "seoultech-global-business-humanities": { 추천: 8, 우수: 9, 보훈: 1, 기회: 2 },
  "seoultech-global-business-natural": { 추천: 3, 우수: 3 },
  "seoultech-free-engineering": {},
  "seoultech-free-information": {},
  "seoultech-free-energy": {},
  "seoultech-free-tech-business": {},
  "seoultech-free-humanities": {},
  "seoultech-ai": { 추천: 27, 창의: 20, 기회: 1, 농어촌: 2 },
  "seoultech-semiconductor": { 추천: 18, 창의: 18, 기회: 1, 농어촌: 2 },
  "seoultech-energy": { 추천: 7, 창의: 7, 보훈: 1, 기회: 1, 농어촌: 1 },
  "seoultech-free-convergence": { 추천: 25, 창의: 25 },
  "seoultech-st-natural": { 논술: 162 },
  "seoultech-st-humanities": { 우수: 18 },
};

const minimum = {
  enabled: true,
  description: "국어·수학·영어·탐구(1과목) 중 2개 영역 합 7등급 이내",
};

export const verifiedSeoulTech2027Admissions: Admission[] = verifiedSeoulTech2027Departments.flatMap((department) => {
  const c = counts[department.id] ?? {};
  const result: Admission[] = [];
  const add = (key: keyof typeof c, name: string, type: Admission["type"], 모집인원: number, extra: Partial<Admission> = {}) => {
    result.push({
      id: `${department.id}-${key}-2027`, universityId: "seoultech", departmentId: department.id,
      academicYear: 2027, name, type, 모집인원, source, isMock: false, ...extra,
    });
  };
  if (c.추천) add("추천", "고교추천전형", "교과", c.추천, { studentRecordWeight: 100, csatMinimum: minimum });
  if (c.우수) add("우수", "학교생활우수자전형", "학종", c.우수, { documentWeight: 70, interview: true, csatMinimum: { enabled: false } });
  if (c.창의) add("창의", "창의융합인재전형", "학종", c.창의, { documentWeight: 70, interview: true, csatMinimum: { enabled: false } });
  if (c.논술) add("논술", "논술전형", "논술", c.논술, { studentRecordWeight: 30, documentWeight: 70, csatMinimum: { enabled: false } });
  if (c.실기) add("실기", "실기전형", "기타", c.실기, { studentRecordWeight: 0, csatMinimum: { enabled: false } });
  if (c.보훈) add("보훈", "기회균형전형(국가보훈대상자)", "학종", c.보훈, { documentWeight: 70, interview: true, csatMinimum: { enabled: false } });
  if (c.기회) add("기회", "기회균형전형(기회균등)", "학종", c.기회, { documentWeight: 70, interview: true, csatMinimum: { enabled: false } });
  if (c.농어촌) add("농어촌", "기회균형전형(농어촌학생)", "학종", c.농어촌, { documentWeight: 70, interview: true, csatMinimum: { enabled: false } });
  return result;
});
