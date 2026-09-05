import type { Admission, Department, University } from "./types";

const source = {
  type: "university" as const,
  url: "https://admission.swu.ac.kr/",
  document: "서울여자대학교 2027학년도 수시모집요강",
  page: 4,
  academicYear: 2027,
  verifiedAt: "2026-09-05",
  confidence: 1,
};

export const verifiedSeoulWomen2027Universities: University[] = [
  { id: "seoul-women", name: "서울여자대학교", region: "서울" },
];

const departmentSeed = [
  ["free-humanities", "자유전공학부(인문)", "인문"],
  ["free-social", "자유전공학부(사회과학)", "사회과학"],
  ["free-scitech", "자유전공학부(과학기술융합)", "자연·융합"],
  ["free-future", "자유전공학부(미래산업융합)", "융합"],
  ["free-wide", "자유전공학부(광역)", "자유전공"],
  ["ai-content", "AI융합콘텐츠전공", "인문·ICT융합"],
  ["french", "프랑스문화콘텐츠전공", "인문·어문"],
  ["german", "독일문화콘텐츠전공", "인문·어문"],
  ["korean", "국어국문학과", "인문·어문"],
  ["english", "영어영문학과", "인문·어문"],
  ["chinese", "중어중문학과", "인문·어문"],
  ["japanese", "일어일문학과", "인문·어문"],
  ["history", "사학과", "인문·역사"],
  ["christian", "기독교학과", "종교·인문"],
  ["economics", "경제학과", "사회·경제"],
  ["library", "문헌정보학과", "인문·정보"],
  ["social", "사회복지학과", "사회복지"],
  ["child", "아동학과", "사회과학"],
  ["admin", "행정학과", "사회과학"],
  ["media", "언론영상학부", "미디어·콘텐츠"],
  ["psych", "심리·인지과학학부", "심리·AI융합"],
  ["sports", "스포츠운동과학과", "체육"],
  ["math", "수학과", "자연과학"],
  ["chem", "화학과", "자연과학"],
  ["bioenv", "생명환경공학과", "생명·환경"],
  ["biohealth", "바이오헬스융합학과", "바이오·보건"],
  ["hort", "원예생명조경학과", "생명·환경"],
  ["foodbio", "식품생명공학과", "생명·바이오"],
  ["foodnutri", "식품영양학과", "식품·보건"],
  ["business", "경영학과", "상경"],
  ["fashion", "패션산업학과", "디자인·생활"],
  ["digital", "디지털미디어학과", "미디어·ICT"],
  ["info", "지능정보보호학부", "정보보호"],
  ["ai", "AI융합학부(인공지능전공)", "AI·소프트웨어"],
  ["software", "AI융합학부(소프트웨어전공)", "AI·소프트웨어"],
  ["data", "AI융합학부(데이터사이언스전공)", "데이터·AI"],
  ["industrial", "산업디자인학과", "디자인"],
  ["modern", "현대미술전공", "미술"],
  ["craft", "공예_컬렉터블디자인전공", "디자인·예술"],
  ["visual", "시각디자인전공", "디자인"],
  ["newmedia", "첨단미디어디자인전공", "디자인·첨단융합"],
  ["realcontent", "첨단융합학부(AI실감콘텐츠전공)", "첨단융합"],
  ["new-media", "첨단융합학부(뉴미디어디자인전공)", "디자인·첨단융합"],
  ["business-conv", "첨단융합학부(기업경영전공)", "경영·첨단융합"],
] as const;

export const verifiedSeoulWomen2027Departments: Department[] = departmentSeed.map(([id, name, category]) => ({
  id: `seoul-women-${id}`, universityId: "seoul-women", name, category,
}));
const byKey = (key: string) => `seoul-women-${key}`;

type Row = readonly [number, number, number, number, number, number, number, number, number, number, number, number];
const counts: Record<string, Row> = {
  "ai-content": [4,5,0,0,2,2,0,4,0,0,0,0],
  "french": [4,5,0,0,2,2,0,5,0,0,0,0],
  "german": [4,7,0,0,2,2,0,5,0,0,0,0],
  "korean": [7,8,0,0,2,2,0,7,0,0,0,0],
  "english": [7,8,0,0,2,2,0,7,0,0,0,0],
  "chinese": [4,5,0,0,2,2,0,5,0,0,0,0],
  "japanese": [6,8,0,0,2,2,0,6,0,0,0,0],
  "history": [4,4,0,0,2,2,0,4,0,0,0,0],
  "christian": [0,0,0,23,0,0,0,0,0,0,0,0],
  "economics": [7,8,0,0,2,2,11,7,0,0,0,0],
  "library": [4,5,0,0,2,2,0,5,0,0,0,0],
  "social": [6,8,0,0,2,2,0,6,0,0,0,0],
  "child": [11,8,0,0,3,3,0,9,0,0,0,0],
  "admin": [7,8,0,0,2,2,0,7,0,0,0,0],
  "media": [7,14,0,0,3,3,0,10,0,0,0,0],
  "psych": [5,8,0,0,2,2,0,6,0,0,0,0],
  "sports": [0,4,0,0,0,0,0,0,10,0,8,0],
  "math": [4,4,0,0,2,2,0,4,0,0,0,0],
  "chem": [4,8,0,0,2,2,12,6,0,0,0,0],
  "bioenv": [4,5,0,0,2,2,0,5,0,0,0,0],
  "biohealth": [7,8,0,0,2,2,0,6,0,0,0,0],
  "hort": [9,8,0,0,2,3,0,8,0,0,0,0],
  "foodbio": [6,8,0,0,2,2,0,6,0,0,0,0],
  "foodnutri": [6,8,0,0,2,2,0,6,0,0,0,0],
  "business": [9,14,0,0,3,4,0,11,0,0,0,0],
  "fashion": [4,7,0,0,2,2,0,5,0,0,0,0],
  "digital": [9,0,8,0,2,3,0,8,0,0,0,0],
  "info": [8,0,8,0,2,3,0,7,0,0,0,0],
  "ai": [4,0,4,0,2,0,0,4,0,0,0,0],
  "software": [4,0,6,0,2,2,0,5,0,0,0,0],
  "data": [7,0,7,0,2,2,0,6,0,0,0,0],
  "industrial": [6,6,0,0,0,0,0,0,0,0,0,13],
  "modern": [0,0,0,0,0,0,0,0,0,0,0,21],
  "craft": [0,0,0,0,0,0,0,0,0,0,0,19],
  "visual": [0,8,0,0,0,0,0,0,0,0,0,12],
  "newmedia": [5,5,0,0,0,0,0,5,0,0,0,0],
};

const admissions: Admission[] = [];
const add = (key: string, name: string, type: Admission["type"], countIndex: number, options: Partial<Admission> = {}) => {
  for (const [departmentKey, row] of Object.entries(counts)) {
    const recruitmentCount = row[countIndex];
    if (!recruitmentCount) continue;
    admissions.push({
      id: `seoul-women-${departmentKey}-${key}-2027`,
      universityId: "seoul-women",
      departmentId: byKey(departmentKey),
      academicYear: 2027,
      name,
      type,
      recruitmentCount,
      csatMinimum: { enabled: false },
      source,
      isMock: false,
      ...options,
    });
  }
};

add("barom-doc", "바롬인재서류전형", "학종", 0, { documentWeight: 100, interview: false });
add("barom-interview", "바롬인재면접전형", "학종", 1, { documentWeight: 50, interview: true });
add("sw", "SW융합인재전형", "학종", 2, { documentWeight: 50, interview: true });
add("christian", "기독교지도자전형", "학종", 3, { documentWeight: 50, interview: true });
add("social-support", "기회균형전형_사회통합지원", "학종", 4, { documentWeight: 100, interview: false });
add("rural", "기회균형전형_농어촌학생", "학종", 5, { documentWeight: 100, interview: false });
add("specialized", "기회균형전형_특성화고교졸업자", "학종", 6, { documentWeight: 100, interview: false });
add("school", "교과우수자전형", "교과", 7, {
  studentRecordWeight: 100,
  csatMinimum: {
    enabled: true,
    description: "국어·수학·영어·탐구 4개 영역 중 2개 영역 합 7등급 이내. 탐구는 상위 1개 과목 등급 반영.",
    requiredSubjects: 2,
    gradeSum: 7,
  },
});
add("school-sports", "교과우수자전형_체육", "교과", 8, { studentRecordWeight: 60 });
add("sports-practical", "실기우수자전형_체육", "기타", 10, { studentRecordWeight: 40 });
add("art-practical", "실기우수자전형_미술", "기타", 11);

admissions.push({
  id: "seoul-women-free-wide-essay-2027",
  universityId: "seoul-women",
  departmentId: byKey("free-wide"),
  academicYear: 2027,
  name: "논술우수자전형",
  type: "논술",
  recruitmentCount: 120,
  studentRecordWeight: 20,
  source,
  isMock: false,
  csatMinimum: { enabled: false },
});

export const verifiedSeoulWomen2027Admissions: Admission[] = admissions;
