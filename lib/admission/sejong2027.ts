import type { Admission, Department, University } from "./types";

export const sejong2027Universities: University[] = [{ id: "sejong", name: "세종대학교", region: "서울" }];

const src = "https://ipsi.sejong.ac.kr/board/upload_file/pdf/20266159234314522.pdf";
const source = { type: "university" as const, academicYear: 2027, collectedAt: "2026-09-05", verifiedAt: "2026-09-05", confidence: 0.99, url: src };

type Row = [string, string, number, number, number, number, number];
// 지역균형, 세종인재(면접형), 세종인재(서류형), 논술우수자, 실기/실적, 기타 특수전형
const rows: Row[] = [
  ["free", "자유전공학부", 122, 71, 0, 0, 0], ["humanities-open", "인문사회계열", 30, 9, 6, 0, 0],
  ["korean", "국어국문학과", 5, 5, 0, 5, 0], ["international", "국제학부", 10, 15, 0, 10, 0],
  ["history", "역사학과", 0, 6, 0, 6, 0], ["education", "교육학과", 5, 5, 0, 5, 0],
  ["publicadmin", "행정학과", 4, 4, 0, 3, 0], ["media", "미디어커뮤니케이션학과", 4, 4, 0, 4, 0],
  ["law", "법학과", 4, 4, 0, 4, 0], ["business-open", "경상호텔관광계열", 30, 15, 5, 0, 0],
  ["business", "경영학부", 10, 12, 1, 9, 0], ["economics", "경제학과", 4, 5, 0, 4, 0],
  ["hotel", "호텔관광외식경영학부", 12, 14, 0, 9, 0], ["franchise", "호텔외식관광프랜차이즈경영학과", 0, 0, 0, 0, 0],
  ["culinary", "조리서비스경영학과", 0, 0, 0, 0, 0], ["natural-open", "자연생명계열", 31, 11, 6, 0, 0],
  ["math", "수학통계학과", 4, 5, 0, 7, 0], ["physics", "물리천문학과", 6, 10, 0, 7, 0],
  ["chemistry", "화학과", 4, 5, 0, 4, 0], ["life", "생명시스템학부", 12, 17, 0, 12, 0],
  ["smart-life", "스마트생명산업융합학과", 4, 4, 4, 4, 0], ["it-open", "IT계열", 30, 14, 5, 0, 0],
  ["ai-electronic", "AI융합전자공학과", 9, 11, 0, 11, 0], ["semiconductor", "반도체시스템공학과", 5, 6, 0, 6, 0],
  ["computer", "컴퓨터공학과", 10, 12, 1, 10, 0], ["security", "정보보호학과", 4, 5, 0, 4, 0],
  ["quantum", "양자지능정보학과", 8, 5, 7, 5, 0], ["design", "디자인이노베이션전공", 0, 0, 0, 0, 48],
  ["animation", "만화애니메이션텍전공", 0, 0, 0, 0, 48], ["cyber-defense", "사이버국방학과", 0, 0, 0, 0, 16],
  ["national-ai-robot", "국방AI로봇융합공학과", 0, 0, 0, 0, 24], ["advanced-open", "첨단융합계열", 0, 50, 0, 0, 0],
  ["ai-data", "인공지능데이터사이언스학과", 22, 10, 5, 0, 0], ["ai-robot", "AI로봇학과", 30, 14, 7, 24, 0],
  ["intelligent-info", "지능정보융합학과", 22, 9, 5, 0, 0], ["contents-software", "콘텐츠소프트웨어학과", 14, 6, 5, 12, 0],
  ["engineering-open", "공과계열", 50, 20, 8, 0, 0], ["architectural-engineering", "건축공학과", 7, 8, 0, 6, 0],
  ["architecture", "건축학과(5년)", 4, 6, 0, 5, 0], ["civil", "건설환경공학과", 6, 9, 0, 9, 0],
  ["environment", "환경융합공학과", 6, 8, 0, 6, 0], ["energy", "에너지자원공학과", 7, 8, 0, 8, 0],
  ["mechanical", "기계공학과", 6, 8, 0, 7, 0], ["aerospace", "우주항공시스템공학부", 0, 0, 0, 0, 0],
  ["aerospace-major", "우주항공공학전공", 4, 6, 0, 5, 0], ["drone", "지능형드론융합전공", 17, 7, 6, 0, 0],
  ["air-force", "항공시스템공학전공", 0, 0, 0, 0, 23], ["nano", "나노신소재공학과", 7, 9, 0, 8, 0],
  ["nuclear", "양자원자력공학과", 6, 7, 0, 0, 0], ["navy-ai", "국방AI융합시스템공학과", 0, 0, 0, 0, 32],
  ["music", "음악과", 0, 0, 0, 0, 38], ["sports", "체육학과", 0, 0, 0, 0, 13],
  ["dance", "무용과", 0, 0, 0, 0, 36], ["film", "영화예술학과", 0, 0, 0, 0, 45]
];

export const sejong2027Departments: Department[] = rows.map(([id, name]) => ({ id: `sejong-${id}`, universityId: "sejong", name, category: "2027 수시 모집단위" }));

const make = (departmentId: string, name: string, type: Admission["type"], recruitmentCount: number, extra: Partial<Admission> = {}): Admission => ({
  id: `sejong-${departmentId}-${name}-${recruitmentCount}-2027`, universityId: "sejong", departmentId: `sejong-${departmentId}`, academicYear: 2027, name, type, recruitmentCount,
  source, isMock: false, ...extra
});

export const sejong2027Admissions: Admission[] = rows.flatMap(([id, _name, regional, interview, document, essay, practical]) => {
  const out: Admission[] = [];
  if (regional > 0) out.push(make(id, "지역균형전형", "교과", regional, { studentRecordWeight: 100 }));
  if (interview > 0) out.push(make(id, "세종인재(면접형)", "학종", interview, { documentWeight: 100, interview: true }));
  if (document > 0) out.push(make(id, "세종인재(서류형)", "학종", document, { documentWeight: 100 }));
  if (essay > 0) out.push(make(id, "논술우수자전형", "논술", essay));
  if (practical > 0) out.push(make(id, "실기우수자/예체능특기자", "실기", practical));
  return out;
});
