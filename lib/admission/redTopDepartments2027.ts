import type { Admission, Department } from "./types";

const source = {
  type: "university" as const,
  academicYear: 2027,
  collectedAt: "2026-09-04",
  verifiedAt: "2026-09-04",
  confidence: 0.99,
};

type Row = [string, string, number];

// 2027 서강대 수시 모집요강의 일반Ⅰ·일반Ⅱ 모집단위별 인원을 연결한다.
// 일반Ⅰ은 학과·학부별 전공예약제, 일반Ⅱ는 광역단위 모집이다.
const sogangGeneralI: Row[] = [
  ["sogang-2027-korean", "국어국문학과", 10],
  ["sogang-2027-history", "사학과", 10],
  ["sogang-2027-philosophy", "철학과", 10],
  ["sogang-2027-religious", "종교학과", 8],
  ["sogang-2027-english", "영문학부", 27],
  ["sogang-2027-europe", "유럽문화학과", 18],
  ["sogang-2027-china", "중국문화학과", 12],
  ["sogang-2027-sociology", "사회학과", 10],
  ["sogang-2027-politics", "정치외교학과", 10],
  ["sogang-2027-psychology", "심리학과", 10],
  ["sogang-2027-economics", "경제학과", 43],
  ["sogang-2027-business", "경영학부", 72],
  ["sogang-2027-broadcast", "신문방송학과", 11],
  ["sogang-2027-media", "미디어&엔터테인먼트학과", 11],
  ["sogang-2027-arttech", "아트&테크놀로지학과", 11],
  ["sogang-2027-global-korean", "글로벌한국학부", 8],
  ["sogang-2027-geppert", "게페르트국제학부", 4],
  ["sogang-2027-math", "수학과", 14],
  ["sogang-2027-physics", "물리학과", 14],
  ["sogang-2027-chemistry", "화학과", 18],
  ["sogang-2027-life", "생명과학과", 18],
  ["sogang-2027-electronics", "전자공학과", 23],
  ["sogang-2027-chemical", "화공생명공학과", 29],
  ["sogang-2027-mechanical", "기계공학과", 25],
  ["sogang-2027-semiconductor", "반도체공학과", 13],
  ["sogang-2027-system-semiconductor", "시스템반도체공학과", 14],
  ["sogang-2027-computer", "컴퓨터공학과", 29],
  ["sogang-2027-ai", "인공지능학과", 12],
];

const sogangGeneralII: Row[] = [
  ["sogang-2027-humanities", "인문학부", 8],
  ["sogang-2027-social", "사회과학부", 8],
  ["sogang-2027-media-wide", "지식융합미디어학부", 8],
  ["sogang-2027-humanities-free", "인문학기반자유전공학부", 20],
  ["sogang-2027-science-free", "SCIENCE기반자유전공학부", 15],
  ["sogang-2027-ai-free", "AI기반자유전공학부", 15],
];

const allRows = [...sogangGeneralI, ...sogangGeneralII];

export const redTopDepartment2027Departments: Department[] = allRows.map(([id, name]) => ({
  id,
  universityId: "sogang",
  name,
  category: "수시모집단위",
}));

export const redTopDepartment2027Admissions: Admission[] = allRows.map(([departmentId, name, recruitmentCount]) => ({
  id: `sogang-redtop-dept-general-${departmentId}-2027`,
  universityId: "sogang",
  departmentId,
  academicYear: 2027,
  name: `학생부종합 일반${sogangGeneralI.some(([id]) => id === departmentId) ? "Ⅰ" : "Ⅱ"}`,
  type: "학종",
  recruitmentCount,
  source: {
    ...source,
    url: "https://admission.sogang.ac.kr/",
  },
  isMock: false,
}));
