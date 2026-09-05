import type { Admission, Department, University } from "./types";

const universityId = "sungshin-2027";

const source = {
  type: "university" as const,
  academicYear: 2027,
  url: "https://ipsi.sungshin.ac.kr/guide/dataroom.htm?bbsid=dataroom&bltn_seq=36049&ctg_cd=susi&mode=view",
  document: "2027학년도 수시 성신여자대학교 신입생 모집요강",
  confidence: 0.99,
  verifiedAt: "2026-09-05",
};

export const verifiedSungshin2027Universities: University[] = [
  { id: universityId, name: "성신여자대학교", region: "서울" },
];

const departmentRows: Array<[string, string, string]> = [
  ["korean", "국어국문학과", "인문·어문"], ["english", "영어영문학과", "인문·어문"],
  ["german", "독일어문·문화학과", "인문·어문"], ["french", "프랑스어문·문화학과", "인문·어문"],
  ["japanese", "일본어문·문화학과", "인문·어문"], ["chinese", "중국어문·문화학과", "인문·어문"],
  ["history", "사학과", "인문·어문"], ["arts-management", "문화예술경영학과", "문화·예술"],
  ["politics", "정치외교학과", "사회과학"], ["psychology", "심리학과", "사회과학"],
  ["geography", "지리학과", "사회과학"], ["economics", "경제학과", "경영·경제"],
  ["media", "미디어커뮤니케이션학과", "미디어·콘텐츠"], ["business", "경영학과", "경영·경제"],
  ["social-welfare", "사회복지학과", "사회과학"], ["law", "법학부", "법·행정"],
  ["statistics", "수리통계데이터사이언스학부", "자연·데이터"], ["chem-energy", "화학·에너지융합학부", "자연·공학"],
  ["biohealth", "바이오헬스융합학부", "자연·공학"], ["clean-materials", "청정신소재공학과", "공학"],
  ["biofood", "바이오식품공학과", "공학"], ["biodrug", "바이오신약의과학부", "자연·공학"],
  ["ai", "AI융합학과", "컴퓨터·소프트웨어"], ["ai-semiconductor", "융합AI반도체공학과", "컴퓨터·소프트웨어"],
  ["computer", "컴퓨터공학과", "컴퓨터·소프트웨어"], ["security", "융합보안공학과", "컴퓨터·소프트웨어"],
  ["service-design", "서비스디자인공학과", "디자인·공학"], ["nursing", "간호학과", "보건·의료"],
  ["clothing", "의류산업학과", "생활산업"], ["consumer", "소비자산업학과", "생활산업"],
  ["beauty", "뷰티산업학과", "생활산업"], ["education", "교육학과", "교육·사범"],
  ["social-education", "사회교육과", "교육·사범"], ["ethics-education", "윤리교육과", "교육·사범"],
  ["chinese-education", "한문교육과", "교육·사범"], ["early-childhood", "유아교육과", "교육·사범"],
  ["media-acting", "미디어영상연기학과", "공연·영상"], ["practical-music", "현대실용음악학과", "공연·음악"],
  ["dance", "무용예술학과", "공연·예술"], ["oriental-painting", "동양화과", "미술"],
  ["western-painting", "서양화과", "미술"], ["sculpture", "조소과", "미술"], ["craft", "공예과", "미술"],
  ["design", "디자인과", "미술"], ["vocal", "성악과", "음악"], ["instrument", "기악과", "음악"],
  ["composition", "작곡과", "음악"], ["creative-free", "창의융합학부(자유전공)", "융합·자유전공"],
  ["creative-advanced", "창의융합학부(첨단분야전공)", "융합·첨단"],
];

export const verifiedSungshin2027Departments: Department[] = departmentRows.map(([id, name, category]) => ({
  id: `${universityId}-${id}`,
  universityId,
  name,
  category,
}));

const id = (key: string) => `${universityId}-${key}`;

const csatMinimum = {
  enabled: true,
  description: "수능 지정영역(국어·영어·수학·탐구 상위 1과목) 4개 중 2개 영역 합 7등급 이내",
  requiredSubjects: 2,
  gradeSum: 7,
};

const noCsatMinimum = { enabled: false };

const admission = (
  departmentId: string,
  name: string,
  type: Admission["type"],
  recruitmentCount: number,
  extra: Partial<Admission> = {},
): Admission => ({
  id: `${departmentId}-${name}-2027`,
  universityId,
  departmentId,
  academicYear: 2027,
  name,
  type,
  recruitmentCount,
  csatMinimum: noCsatMinimum,
  source,
  isMock: false,
  ...extra,
});

// 2027 정원내 모집인원 표(p.7~8) 기준. 지역균형은 전공선발과 무전공선발을 별도 모집단위로 반영.
const selfDirectedCounts: Record<string, number> = {
  korean: 7, english: 12, german: 6, french: 5, japanese: 12, chinese: 12, history: 6, "arts-management": 5,
  politics: 7, psychology: 8, geography: 7, economics: 14, media: 12, business: 27, "social-welfare": 9, law: 30,
  statistics: 21, "chem-energy": 22, biohealth: 24, "clean-materials": 17, biofood: 12, biodrug: 27, ai: 27,
  "ai-semiconductor": 17, computer: 17, security: 21, "service-design": 20, nursing: 30, clothing: 12, consumer: 9,
  beauty: 5, education: 10, "social-education": 10, "ethics-education": 10, "chinese-education": 10, "early-childhood": 13,
};

const regionalCounts: Record<string, number> = {
  korean: 4, english: 5, german: 4, french: 4, japanese: 4, chinese: 5, history: 4, "arts-management": 4,
  politics: 4, psychology: 4, geography: 4, economics: 5, media: 5, business: 6, "social-welfare": 4, law: 7,
  statistics: 4, "chem-energy": 4, biohealth: 4, "clean-materials": 7, biofood: 4, biodrug: 10, ai: 8,
  "ai-semiconductor": 7, computer: 7, security: 4, "service-design": 4, nursing: 16, clothing: 4, consumer: 4,
  education: 4, "social-education": 4, "ethics-education": 4, "chinese-education": 4, "early-childhood": 5,
};

// 공식 모집요강 표에 인쇄된 논술 모집인원. 총계 표기(159명)와 개별 행 합계 사이에 5명 산술 불일치가 있어,
// 임의로 어느 모집단위의 인원을 조정하지 않고 원문 행 숫자를 그대로 보존한다.
const essayCounts: Record<string, number> = {
  korean: 4, english: 4, german: 3, french: 3, japanese: 5, chinese: 5, history: 3, "arts-management": 3,
  politics: 3, psychology: 5, geography: 4, economics: 4, media: 4, business: 6, "social-welfare": 5, law: 8,
  statistics: 5, "chem-energy": 6, biohealth: 4, "clean-materials": 5, biofood: 4, biodrug: 8, ai: 6,
  "ai-semiconductor": 5, computer: 5, security: 10, "service-design": 5, "nursing-humanities": 5, "nursing-natural": 6,
  clothing: 5, consumer: 5,
};

const admissions: Admission[] = [];
for (const [key, count] of Object.entries(selfDirectedCounts)) {
  admissions.push(admission(id(key), "자기주도인재전형", "학종", count, { documentWeight: 60, interview: true }));
}
for (const [key, count] of Object.entries(regionalCounts)) {
  admissions.push(admission(id(key), "지역균형전형", "교과", count, { studentRecordWeight: 100, csatMinimum }));
}
for (const [key, count] of Object.entries(essayCounts)) {
  const departmentId = key === "nursing-humanities" ? id("nursing") : key === "nursing-natural" ? id("nursing") : id(key);
  admissions.push(admission(departmentId, "논술우수자전형", "논술", count, { csatMinimum }));
}

// 지역균형 무전공: 자유전공 54명 + 첨단분야전공 73명.
admissions.push(admission(id("creative-free"), "지역균형전형", "교과", 54, { studentRecordWeight: 100, csatMinimum }));
admissions.push(admission(id("creative-advanced"), "지역균형전형", "교과", 73, { studentRecordWeight: 100, csatMinimum }));

// 실기/실적 일반학생(p.8): 모집단위별 총 모집인원.
const practicalCounts: Record<string, number> = {
  "media-acting": 13, "practical-music": 11, dance: 18, beauty: 13, "oriental-painting": 21, "western-painting": 22,
  sculpture: 24, craft: 31, design: 16, vocal: 13, instrument: 31, composition: 13,
};
for (const [key, count] of Object.entries(practicalCounts)) {
  admissions.push(admission(id(key), "일반학생전형", "기타", count, { studentRecordWeight: 30 }));
}

// 정원외 재직자: 경영학과 경영학전공 70명 + 세무회계전공 43명.
admissions.push(admission(id("business"), "특성화고 등을 졸업한 재직자전형(경영학전공)", "학종", 70));
admissions.push(admission(id("business"), "특성화고 등을 졸업한 재직자전형(세무회계전공)", "학종", 43));

export const verifiedSungshin2027Admissions: Admission[] = admissions;
