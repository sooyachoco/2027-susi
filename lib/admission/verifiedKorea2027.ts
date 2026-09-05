import type { Admission, Department, University } from "./types";

const source = {
  type: "university" as const,
  url: "https://oku.korea.ac.kr/attach/202607/1783652032558_0.pdf",
  document: "고려대학교 2027학년도 수시모집요강",
  academicYear: 2027,
  verifiedAt: "2026-09-06",
  confidence: 0.99,
};

export const verifiedKorea2027Universities: University[] = [
  { id: "korea", name: "고려대학교", region: "서울" },
];

type Unit = {
  id: string;
  name: string;
  category: string;
  school?: number;
  excellence?: number;
  fit?: number;
  equal?: number;
  multicultural?: number;
  employee?: number;
  cyber?: number;
  essay?: number;
  special?: number;
};

const units: Unit[] = [
  { id: "business", name: "경영학과", category: "인문", school: 54, excellence: 75, fit: 48, equal: 15, multicultural: 4, essay: 12 },
  { id: "korean", name: "국어국문학과", category: "인문", school: 9, excellence: 11, fit: 7, equal: 3, essay: 4 },
  { id: "philosophy", name: "철학과", category: "인문", school: 11, excellence: 5, fit: 3, equal: 2, essay: 4 },
  { id: "korean-history", name: "한국사학과", category: "인문", school: 4, excellence: 5, fit: 3, equal: 1, essay: 2 },
  { id: "history", name: "사학과", category: "인문", school: 7, excellence: 9, fit: 5, equal: 2, essay: 5 },
  { id: "sociology", name: "사회학과", category: "인문", school: 12, excellence: 15, fit: 9, equal: 4, essay: 6 },
  { id: "chinese-classics", name: "한문학과", category: "인문", school: 4, excellence: 5, fit: 3, equal: 1, essay: 2 },
  { id: "english", name: "영어영문학과", category: "인문", school: 16, excellence: 21, fit: 12, equal: 5, multicultural: 1, essay: 8 },
  { id: "german", name: "독어독문학과", category: "인문", school: 6, excellence: 7, fit: 4, equal: 2, essay: 3 },
  { id: "french", name: "불어불문학과", category: "인문", school: 6, excellence: 7, fit: 5, equal: 2, essay: 4 },
  { id: "chinese", name: "중어중문학과", category: "인문", school: 8, excellence: 10, fit: 6, equal: 2, essay: 6 },
  { id: "russian", name: "노어노문학과", category: "인문", school: 6, excellence: 7, fit: 4, equal: 2, essay: 3 },
  { id: "japanese", name: "일어일문학과", category: "인문", school: 7, excellence: 8, fit: 5, equal: 2, essay: 3 },
  { id: "spanish", name: "서어서문학과", category: "인문", school: 7, excellence: 10, fit: 6, equal: 2, essay: 5 },
  { id: "linguistics", name: "언어학과", category: "인문", school: 4, excellence: 6, fit: 3, equal: 1, essay: 4 },
  { id: "life-science", name: "생명과학부", category: "자연", school: 15, excellence: 21, fit: 11, equal: 5, essay: 10 },
  { id: "biotech", name: "생명공학부", category: "자연", school: 17, excellence: 22, fit: 12, equal: 5, multicultural: 1, essay: 9 },
  { id: "food-engineering", name: "식품공학과", category: "자연", school: 7, excellence: 9, fit: 5, equal: 2, essay: 5 },
  { id: "environment-ecology", name: "환경생태공학부", category: "자연", school: 11, excellence: 14, fit: 8, equal: 3, essay: 7 },
  { id: "food-economics", name: "식품자원경제학과", category: "인문", school: 9, excellence: 10, fit: 6, equal: 3, essay: 5 },
  { id: "political", name: "정치외교학과", category: "인문", school: 12, excellence: 17, fit: 9, equal: 4, essay: 6 },
  { id: "economics", name: "경제학과", category: "인문", school: 21, excellence: 25, fit: 15, equal: 6, multicultural: 2, essay: 11 },
  { id: "statistics", name: "통계학과", category: "인문", school: 14, excellence: 16, fit: 11, equal: 5, essay: 7 },
  { id: "public-admin", name: "행정학과", category: "인문", school: 12, excellence: 14, fit: 9, equal: 4, essay: 6 },
  { id: "math", name: "수학과", category: "자연", school: 8, excellence: 12, fit: 5, equal: 2, essay: 5 },
  { id: "physics", name: "물리학과", category: "자연", school: 8, excellence: 10, fit: 6, equal: 2, essay: 5 },
  { id: "chemistry", name: "화학과", category: "자연", school: 7, excellence: 10, fit: 5, equal: 2, essay: 5 },
  { id: "earth", name: "지구환경과학과", category: "자연", school: 4, excellence: 6, fit: 5, equal: 2, essay: 4 },
  { id: "chemical-bio", name: "화공생명공학과", category: "자연", school: 14, excellence: 15, fit: 5, equal: 4, essay: 13 },
  { id: "materials", name: "신소재공학부", category: "자연", school: 22, excellence: 23, fit: 15, equal: 7, multicultural: 2, essay: 11 },
  { id: "civil", name: "건축사회환경공학부", category: "자연", school: 15, excellence: 16, fit: 11, equal: 4, essay: 9 },
  { id: "architecture", name: "건축학과", category: "자연", school: 6, excellence: 9, fit: 5, equal: 2, essay: 4 },
  { id: "mechanical", name: "기계공학부", category: "자연", school: 21, excellence: 25, fit: 15, equal: 6, multicultural: 2, essay: 13 },
  { id: "industrial-management", name: "산업경영공학부", category: "자연", school: 8, excellence: 8, fit: 6, equal: 2, essay: 7 },
  { id: "electrical-electronics", name: "전기전자공학부", category: "자연", school: 34, excellence: 48, fit: 25, equal: 14, multicultural: 3, essay: 10 },
  { id: "semiconductor", name: "반도체공학과", category: "자연", excellence: 14, fit: 14 },
  { id: "energy", name: "융합에너지공학과", category: "자연", school: 5, excellence: 7, fit: 4, equal: 1, essay: 3 },
  { id: "next-gen-communication", name: "차세대통신학과", category: "자연", excellence: 10, fit: 10 },
  { id: "medicine", name: "의학과", category: "자연", school: 18, excellence: 28, fit: 15, equal: 5, multicultural: 1 },
  { id: "education", name: "교육학과", category: "인문", school: 8, excellence: 11, fit: 6, equal: 2, essay: 4 },
  { id: "korean-education", name: "국어교육과", category: "인문", school: 8, excellence: 9, fit: 6, equal: 2, essay: 5 },
  { id: "english-education", name: "영어교육과", category: "인문", school: 9, excellence: 11, fit: 7, equal: 3, essay: 6 },
  { id: "geography-education", name: "지리교육과", category: "인문", school: 6, excellence: 7, fit: 4, equal: 2, essay: 3 },
  { id: "history-education", name: "역사교육과", category: "인문", school: 5, excellence: 6, fit: 4, equal: 1, essay: 3 },
  { id: "home-economics-education", name: "가정교육과", category: "자연", school: 7, excellence: 7, fit: 4, equal: 2, essay: 2 },
  { id: "math-education", name: "수학교육과", category: "자연", school: 6, excellence: 7, fit: 4, equal: 2, essay: 4 },
  { id: "physical-education", name: "체육교육과", category: "체능", special: 40 },
  { id: "nursing", name: "간호학과", category: "자연", school: 10, excellence: 13, fit: 6, equal: 3, essay: 5 },
  { id: "computer", name: "컴퓨터학과", category: "자연", school: 19, excellence: 26, fit: 15, equal: 8, multicultural: 2, essay: 11 },
  { id: "data-science", name: "데이터과학과", category: "자연", school: 7, excellence: 8, fit: 6, equal: 2, essay: 3 },
  { id: "ai", name: "인공지능학과", category: "자연", school: 16, excellence: 22, fit: 13, equal: 5, essay: 9 },
  { id: "design", name: "디자인조형학부", category: "예능", special: 15 },
  { id: "international", name: "국제학부", category: "인문", school: 6, excellence: 9, fit: 9, equal: 2, essay: 4 },
  { id: "global-korean", name: "글로벌한국융합학부", category: "인문", fit: 5 },
  { id: "media", name: "미디어학부", category: "인문", school: 10, excellence: 14, fit: 8, equal: 4, essay: 6 },
  { id: "bio-medical", name: "바이오의공학부", category: "자연", school: 12, excellence: 16, fit: 10, equal: 4, essay: 7 },
  { id: "bio-system", name: "바이오시스템의과학부", category: "자연", school: 10, excellence: 14, fit: 8, equal: 3, essay: 6 },
  { id: "health-environment", name: "보건환경융합과학부", category: "자연", school: 18, excellence: 22, fit: 13, equal: 6, multicultural: 2, essay: 9 },
  { id: "health-policy", name: "보건정책관리학부", category: "인문", school: 12, excellence: 15, fit: 9, equal: 4, essay: 6 },
  { id: "free-major", name: "자유전공학부", category: "인문", school: 18, excellence: 24, equal: 5, essay: 15 },
  { id: "cyber-defense", name: "사이버국방학과", category: "자연", cyber: 10 },
  { id: "smart-security", name: "스마트보안학부", category: "자연", school: 8, excellence: 11, fit: 6, equal: 3, essay: 5 },
  { id: "psychology", name: "심리학부", category: "인문", school: 6, excellence: 8, fit: 5, equal: 2, essay: 4 },
  { id: "smart-mobility", name: "스마트모빌리티학부", category: "자연", excellence: 10, fit: 20 },
  { id: "college", name: "학부대학", category: "자연", excellence: 9, essay: 8 },
];

export const verifiedKorea2027Departments: Department[] = units.map(({ id, name, category }) => ({
  id: `korea-${id}`,
  universityId: "korea",
  name,
  category,
}));

const make = (unit: Unit, key: string, name: string, type: Admission["type"], count: number, extra: Partial<Admission> = {}): Admission => ({
  id: `korea-${unit.id}-${key}-2027`,
  universityId: "korea",
  departmentId: `korea-${unit.id}`,
  academicYear: 2027,
  name,
  type,
  recruitmentCount: count,
  source,
  isMock: false,
  ...extra,
});

export const verifiedKorea2027Admissions: Admission[] = units.flatMap((unit) => {
  const out: Admission[] = [];
  if (unit.school) out.push(make(unit, "school", "학생부교과(학교추천전형)", "교과", unit.school, { studentRecordWeight: 100, csatMinimum: { enabled: true, requiredSubjects: 3, gradeSum: 7, description: "국어·수학·영어·탐구 4개 영역 중 3개 영역 등급합 7 이내 및 한국사 4등급 이내" } }));
  if (unit.excellence) out.push(make(unit, "excellence", "학생부종합(학업우수전형)", "학종", unit.excellence, { documentWeight: 100, csatMinimum: { enabled: true, requiredSubjects: 4, gradeSum: 8, description: "국어·수학·영어·탐구 4개 영역 등급합 8 이내 및 한국사 4등급 이내" } }));
  if (unit.fit) out.push(make(unit, "fit", "학생부종합(계열적합전형)", "학종", unit.fit, { documentWeight: 100, interview: true, csatMinimum: { enabled: false } }));
  if (unit.equal) out.push(make(unit, "equal", "학생부종합(고른기회전형)", "학종", unit.equal, { documentWeight: 100, interview: true, csatMinimum: { enabled: false } }));
  if (unit.multicultural) out.push(make(unit, "multicultural", "학생부종합(다문화전형)", "학종", unit.multicultural, { documentWeight: 100, interview: true, csatMinimum: { enabled: false } }));
  if (unit.employee) out.push(make(unit, "employee", "학생부종합(재직자전형)", "학종", unit.employee, { documentWeight: 100, interview: true, csatMinimum: { enabled: false } }));
  if (unit.cyber) out.push(make(unit, "cyber", "학생부종합(사이버국방전형)", "학종", unit.cyber, { documentWeight: 100, interview: true, csatMinimum: { enabled: false } }));
  if (unit.essay) out.push(make(unit, "essay", "논술(논술전형)", "논술", unit.essay, { csatMinimum: { enabled: true, requiredSubjects: 4, gradeSum: 8, description: "국어·수학·영어·탐구 4개 영역 등급합 8 이내 및 한국사 4등급 이내" } }));
  if (unit.special) out.push(make(unit, "special", "실기/실적(특기자전형)", "기타", unit.special, { interview: true, csatMinimum: unit.id === "design" ? { enabled: true, requiredSubjects: 3, gradeSum: 8, description: "국어·수학·영어·탐구 4개 영역 중 3개 영역 등급합 8 이내 및 한국사 4등급 이내" } : { enabled: false } }));
  return out;
});
