import type { Admission, Department, University } from "./types";

export const anyang2027Universities: University[] = [{ id: "anyang", name: "안양대학교", region: "경기" }];

const source = {
  type: "university" as const,
  academicYear: 2027,
  url: "https://enter.anyang.ac.kr/10000012?bbs_seq=8824&mode=view",
  confidence: 0.99,
  verifiedAt: "2026-09-05",
};

// 2027 최종 수시 모집요강 기준 안양캠퍼스·강화캠퍼스 모집단위.
const units: Array<[string, string, string]> = [
  ["free", "자유전공", "전계열"],
  ["theology", "신학과", "인문사회"],
  ["christian-education", "기독교교육과", "인문사회"],
  ["early-childhood", "유아교육과", "인문사회"],
  ["korean", "국어국문학과", "인문사회"],
  ["english-culture", "영미언어문화학과", "인문사회"],
  ["russian", "러시아언어문화학과", "인문사회"],
  ["chinese", "중국언어문화학과", "인문사회"],
  ["free-humanities", "인문계열자유전공", "인문사회"],
  ["global-business", "글로벌경영학과", "인문사회"],
  ["global-business-night", "글로벌경영학과(야간)", "인문사회"],
  ["tourism", "관광경영학과(교직)", "인문사회"],
  ["public-admin", "행정학과", "인문사회"],
  ["public-admin-night", "행정학과(야간)", "인문사회"],
  ["free-social", "사회계열자유전공", "인문사회"],
  ["beauty", "뷰티메디컬디자인학과", "예체능"],
  ["food-nutrition", "식품영양학과(교직)", "자연과학"],
  ["data-science", "데이터사이언스학과", "자연과학"],
  ["data-science-night", "데이터사이언스학과(야간)", "자연과학"],
  ["ai", "AI학부", "공학"],
  ["digital-media-design", "디지털미디어디자인학과", "공학"],
  ["cosmetics", "화장품발명디자인학과", "공학"],
  ["electrical-electronics", "정보전기전자공학과", "공학"],
  ["electrical-electronics-night", "정보전기전자공학과(야간)", "공학"],
  ["urban-info", "도시정보공학과", "공학"],
  ["urban-info-night", "도시정보공학과(야간)", "공학"],
  ["environment-energy", "환경에너지공학과", "공학"],
  ["free-engineering", "이공계열자유전공", "공학"],
  ["game-content", "게임콘텐츠학과", "예체능"],
  ["smart-city", "스마트시티공학과", "공학"],
  ["marine-bio", "해양바이오공학과", "공학"],
];

export const anyang2027Departments: Department[] = units.map(([id, name, category]) => ({
  id: `anyang-${id}`,
  universityId: "anyang",
  name,
  category,
}));

const methodDefs = [
  ["아리학생부교과", "교과", 100, false],
  ["아리학생부면접", "교과", 60, true],
  ["아리학생부종합", "학종", 100, false],
] as const;

// 최종 모집요강의 전형별 모집인원. 아리학생부종합은 서류100%이며 수능최저 없음.
const counts: Record<string, [number, number, number]> = {
  free: [42, 17, 18],
  theology: [16, 4, 0],
  christian-education: [20, 4, 0],
  early-childhood: [9, 8, 10],
  korean: [11, 4, 4],
  english-culture: [9, 5, 5],
  russian: [9, 4, 4],
  chinese: [9, 4, 6],
  free-humanities: [11, 5, 5],
  global-business: [15, 8, 8],
  global-business-night: [25, 8, 0],
  tourism: [12, 6, 7],
  public-admin: [10, 5, 7],
  public-admin-night: [13, 4, 0],
  free-social: [14, 5, 4],
  beauty: [13, 6, 0],
  food-nutrition: [11, 9, 10],
  data-science: [8, 5, 9],
  data-science-night: [12, 4, 0],
  ai: [38, 20, 25],
  digital-media-design: [13, 8, 8],
  cosmetics: [8, 5, 5],
  electrical-electronics: [30, 10, 19],
  electrical-electronics-night: [13, 6, 0],
  urban-info: [15, 5, 10],
  urban-info-night: [12, 5, 0],
  environment-energy: [14, 9, 12],
  free-engineering: [10, 5, 5],
  game-content: [14, 7, 0],
  smart-city: [26, 5, 0],
  marine-bio: [13, 5, 0],
};

const aggregate = [475, 205, 181] as const;
const aggregateId = "anyang-susi-overall";

export const anyang2027DepartmentsWithAggregate: Department[] = [
  ...anyang2027Departments,
  { id: aggregateId, universityId: "anyang", name: "2027 수시 전체(핵심 전형 합계)", category: "전체" },
];

const makeAdmission = (
  departmentId: string,
  name: string,
  type: Admission["type"],
  studentRecordWeight: number,
  interview: boolean,
  recruitmentCount: number,
): Admission => ({
  id: `${departmentId}-${name}-2027`,
  universityId: "anyang",
  departmentId,
  academicYear: 2027,
  name,
  type,
  recruitmentCount,
  studentRecordWeight,
  interview,
  csatMinimum: { enabled: false },
  source,
  isMock: false,
});

export const anyang2027Admissions: Admission[] = [
  ...units.flatMap(([id]) => {
    const [gyogwa, interview, holistic] = counts[id];
    const values = [gyogwa, interview, holistic];
    return methodDefs.flatMap(([name, type, weight, hasInterview], index) =>
      values[index] > 0
        ? [makeAdmission(`anyang-${id}`, name, type, weight, hasInterview, values[index])]
        : [],
    );
  }),
  ...methodDefs.map(([name, type, weight, hasInterview], index) =>
    makeAdmission(aggregateId, name, type, weight, hasInterview, aggregate[index]),
  ),
];
