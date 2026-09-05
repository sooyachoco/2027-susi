import type { Admission, Department, University } from "./types";

const source = {
  type: "university" as const,
  url: "https://admission.seoultech.ac.kr/",
  document: "서울과학기술대학교 2027학년도 수시모집 모집요강",
  academicYear: 2027,
  confidence: 0.99,
};

export const verifiedSeoulTech2027Universities: University[] = [
  { id: "seoultech", name: "서울과학기술대학교", region: "서울" },
];

const departmentSeed = [
  ["seoultech-robot", "기계시스템디자인공학과", "공학·기계"],
  ["seoultech-mechanical", "기계공학과", "공학·기계"],
  ["seoultech-safety", "안전공학과", "공학·안전"],
  ["seoultech-materials", "신소재공학과", "공학·신소재"],
  ["seoultech-civil", "건설시스템공학과", "공학·건설"],
  ["seoultech-architecture", "건축학부(건축학전공)", "건축"],
  ["seoultech-arch-engineering", "건축학부(건축공학전공)", "건축·공학"],
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
  ["seoultech-bio", "바이오메디컬공학과", "공학·바이오"],
  ["seoultech-quantum", "양자융합물리학과", "자연과학"],
  ["seoultech-design-industrial", "디자인학과(산업디자인전공)", "디자인"],
  ["seoultech-design-visual", "디자인학과(시각디자인전공)", "디자인"],
  ["seoultech-ceramic", "도예학과", "디자인·공예"],
  ["seoultech-metal", "금속공예디자인학과", "디자인·공예"],
  ["seoultech-arts", "조형예술학과", "예술"],
  ["seoultech-public-admin", "행정학과", "사회과학"],
  ["seoultech-english", "영어영문학과", "인문"],
  ["seoultech-literature", "문예창작학과", "인문·문학"],
  ["seoultech-industrial", "산업공학과", "공학·산업"],
  ["seoultech-itm", "MSDE학과", "공학·산업"],
  ["seoultech-business", "경영학과", "상경"],
  ["seoultech-global-business", "경영학과(글로벌테크노경영전공)", "상경"],
  ["seoultech-ai", "인공지능응용학과", "AI·소프트웨어"],
  ["seoultech-semiconductor", "지능형반도체공학과", "첨단공학"],
  ["seoultech-energy", "미래에너지융합학과", "에너지"],
  ["seoultech-free-convergence", "자유전공학부(창의융합대학)", "자유전공·첨단"],
  ["seoultech-st-natural", "ST자유전공학부(자연)", "자유전공·자연"],
  ["seoultech-st-humanities", "ST자유전공학부(인문)", "자유전공·인문"],
] as const;

export const verifiedSeoulTech2027Departments: Department[] = departmentSeed.map(([id, name, category]) => ({ id, universityId: "seoultech", name, category }));

const counts: Record<string, Partial<Record<"추천" | "우수" | "창의" | "논술" | "실기", number>>> = {
  "seoultech-robot": { 추천: 40, 우수: 39 }, "seoultech-mechanical": { 추천: 38, 우수: 39 }, "seoultech-safety": { 추천: 17, 우수: 18 },
  "seoultech-materials": { 추천: 20, 우수: 19 }, "seoultech-civil": { 추천: 30, 우수: 31 }, "seoultech-architecture": { 추천: 12, 우수: 13 },
  "seoultech-arch-engineering": { 추천: 19, 우수: 20 }, "seoultech-electrical": { 추천: 27, 우수: 27 }, "seoultech-electronic": { 추천: 22, 우수: 23 },
  "seoultech-ict": { 추천: 13, 우수: 14 }, "seoultech-computer": { 추천: 22, 우수: 22 }, "seoultech-chemical": { 추천: 15, 우수: 17 },
  "seoultech-environment": { 추천: 21, 우수: 20 }, "seoultech-foodbio": { 추천: 13, 우수: 14 }, "seoultech-precision": { 추천: 10, 우수: 10 },
  "seoultech-optics": { 추천: 10, 우수: 11 }, "seoultech-sports": { 추천: 15, 우수: 3, 실기: 3 }, "seoultech-bio": { 추천: 6, 우수: 12, 창의: 2 },
  "seoultech-quantum": { 추천: 4, 창의: 9 }, "seoultech-design-industrial": { 추천: 13, 우수: 1, 실기: 7 }, "seoultech-design-visual": { 추천: 3, 우수: 12, 실기: 3 },
  "seoultech-ceramic": { 실기: 14 }, "seoultech-metal": { 추천: 3, 실기: 15 }, "seoultech-arts": { 실기: 19 }, "seoultech-public-admin": { 추천: 14, 우수: 13 },
  "seoultech-english": { 추천: 9, 우수: 9 }, "seoultech-literature": { 추천: 31 }, "seoultech-industrial": { 추천: 27, 우수: 27 }, "seoultech-itm": { 추천: 12, 우수: 12 },
  "seoultech-business": { 추천: 13, 우수: 14 }, "seoultech-global-business": { 추천: 11, 우수: 12 }, "seoultech-ai": { 추천: 27, 창의: 20 },
  "seoultech-semiconductor": { 추천: 18, 창의: 18 }, "seoultech-energy": { 추천: 7, 창의: 7 }, "seoultech-free-convergence": { 추천: 25, 창의: 25 },
  "seoultech-st-natural": { 논술: 162 }, "seoultech-st-humanities": { 우수: 18 },
};

const minimum = { enabled: true, description: "국어·수학·영어·탐구(1과목) 중 2개 영역 합 7등급 이내" };

export const verifiedSeoulTech2027Admissions: Admission[] = verifiedSeoulTech2027Departments.flatMap((department) => {
  const c = counts[department.id] ?? {};
  const result: Admission[] = [];
  const add = (key: string, name: string, type: Admission["type"], 모집인원: number, extra: Partial<Admission> = {}) => {
    result.push({ id: `${department.id}-${key}-2027`, universityId: "seoultech", departmentId: department.id, academicYear: 2027, name, type, 모집인원, source, isMock: false, ...extra });
  };
  if (c.추천) add("추천", "고교추천전형", "교과", c.추천, { studentRecordWeight: 100, csatMinimum: minimum });
  if (c.우수) add("우수", "학교생활우수자전형", "학종", c.우수, { documentWeight: 70, interview: true, csatMinimum: { enabled: false } });
  if (c.창의) add("창의", "창의융합인재전형", "학종", c.창의, { documentWeight: 70, interview: true, csatMinimum: { enabled: false } });
  if (c.논술) add("논술", "논술전형", "논술", c.논술, { studentRecordWeight: 30, documentWeight: 70, csatMinimum: { enabled: false } });
  if (c.실기) add("실기", "실기전형", "기타", c.실기, { csatMinimum: { enabled: false } });
  return result;
});
