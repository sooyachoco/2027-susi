import type { RegularAdmission } from "./types";

const SEOULTECH_SOURCE = "https://admission.seoultech.ac.kr/";
const SEOULTECH_ENGLISH = { 1: 100, 2: 97.7778, 3: 94.8148, 4: 88.8889, 5: 74.0741, 6: 59.2593, 7: 44.4444, 8: 22.2222, 9: 0 } as const;
const SEOULTECH_HISTORY = { 1: 0, 2: 0, 3: 0, 4: -1, 5: -2, 6: -3, 7: -4, 8: -5, 9: -10 } as const;

type SeoultechField = "natural" | "humanities" | "tech-management" | "sports" | "industrial-design" | "design";
type SeoultechRow = { group: "가" | "나" | "다"; key: string; department: string; majorGroup: string; recruitmentCount: number; field: SeoultechField };
const SEOULTECH_ROWS: SeoultechRow[] = [
  { group: "가", key: "free-engineering", department: "자유전공학부(공과대학)", majorGroup: "자연·공학", recruitmentCount: 69, field: "natural" },
  { group: "가", key: "electrical-information", department: "전기정보공학과", majorGroup: "자연·공학", recruitmentCount: 24, field: "natural" },
  { group: "가", key: "electronic", department: "전자공학과", majorGroup: "자연·공학", recruitmentCount: 18, field: "natural" },
  { group: "가", key: "ict-convergence", department: "ICT융합공학과", majorGroup: "자연·공학", recruitmentCount: 11, field: "natural" },
  { group: "가", key: "computer", department: "컴퓨터공학과", majorGroup: "자연·공학", recruitmentCount: 21, field: "natural" },
  { group: "가", key: "chemical-bio", department: "화공생명공학과", majorGroup: "자연·공학", recruitmentCount: 16, field: "natural" },
  { group: "가", key: "environment", department: "환경공학과", majorGroup: "자연·공학", recruitmentCount: 21, field: "natural" },
  { group: "가", key: "food-bio", department: "식품생명공학과", majorGroup: "자연·공학", recruitmentCount: 9, field: "natural" },
  { group: "가", key: "precision-chemistry", department: "정밀화학과", majorGroup: "자연·공학", recruitmentCount: 11, field: "natural" },
  { group: "가", key: "optometry", department: "안경광학과", majorGroup: "자연·공학", recruitmentCount: 11, field: "natural" },
  { group: "가", key: "biomedical", department: "바이오메디컬학과", majorGroup: "자연·공학", recruitmentCount: 7, field: "natural" },
  { group: "가", key: "quantum-physics", department: "양자융합물리학과", majorGroup: "자연·공학", recruitmentCount: 4, field: "natural" },
  { group: "가", key: "industrial-info-natural", department: "산업공학부(산업정보시스템전공)_자연", majorGroup: "자연·공학", recruitmentCount: 6, field: "natural" },
  { group: "가", key: "itm-natural", department: "산업공학부(ITM전공)_자연", majorGroup: "자연·공학", recruitmentCount: 6, field: "natural" },
  { group: "가", key: "msde", department: "MSDE학과", majorGroup: "자연·공학", recruitmentCount: 13, field: "natural" },
  { group: "가", key: "global-tech-natural", department: "경영학과(글로벌테크노경영전공)_자연", majorGroup: "자연·공학", recruitmentCount: 3, field: "natural" },
  { group: "가", key: "english", department: "영어영문학과", majorGroup: "인문·어문", recruitmentCount: 5, field: "humanities" },
  { group: "가", key: "public-administration", department: "행정학과", majorGroup: "인문·사회", recruitmentCount: 9, field: "humanities" },
  { group: "가", key: "industrial-info-humanities", department: "산업공학부(산업정보시스템전공)_인문", majorGroup: "인문·사회", recruitmentCount: 2, field: "humanities" },
  { group: "가", key: "itm-humanities", department: "산업공학부(ITM전공)_인문", majorGroup: "인문·사회", recruitmentCount: 2, field: "humanities" },
  { group: "가", key: "business", department: "경영학과(경영학전공)", majorGroup: "경영·경제", recruitmentCount: 9, field: "humanities" },
  { group: "가", key: "global-tech-humanities", department: "경영학과(글로벌테크노경영전공)_인문", majorGroup: "경영·경제", recruitmentCount: 8, field: "humanities" },
  { group: "가", key: "free-creative", department: "자유전공학부(창의융합대학)", majorGroup: "자연·공학", recruitmentCount: 19, field: "natural" },
  { group: "나", key: "robotics", department: "기계시스템공학부(지능형로봇전공)", majorGroup: "자연·공학", recruitmentCount: 25, field: "natural" },
  { group: "나", key: "future-mobility", department: "기계시스템공학부(미래자동차전공)", majorGroup: "자연·공학", recruitmentCount: 14, field: "natural" },
  { group: "나", key: "mechanical", department: "기계공학과", majorGroup: "자연·공학", recruitmentCount: 37, field: "natural" },
  { group: "나", key: "safety", department: "안전공학과", majorGroup: "자연·공학", recruitmentCount: 15, field: "natural" },
  { group: "나", key: "materials", department: "신소재공학과", majorGroup: "자연·공학", recruitmentCount: 21, field: "natural" },
  { group: "나", key: "civil", department: "건설시스템공학과", majorGroup: "자연·공학", recruitmentCount: 29, field: "natural" },
  { group: "나", key: "architecture-engineering", department: "건축학부(건축공학전공)", majorGroup: "자연·공학", recruitmentCount: 18, field: "natural" },
  { group: "나", key: "architecture", department: "건축학부(건축학전공)", majorGroup: "자연·공학", recruitmentCount: 12, field: "natural" },
  { group: "나", key: "free-information", department: "자유전공학부(정보통신대학)", majorGroup: "자연·공학", recruitmentCount: 35, field: "natural" },
  { group: "나", key: "free-energy-bio", department: "자유전공학부(에너지바이오대학)", majorGroup: "자연·공학", recruitmentCount: 29, field: "natural" },
  { group: "나", key: "free-humanities", department: "자유전공학부(인문사회대학)", majorGroup: "인문·사회", recruitmentCount: 12, field: "humanities" },
  { group: "나", key: "free-tech-management", department: "자유전공학부(기술경영융합대학)", majorGroup: "경영·경제", recruitmentCount: 14, field: "tech-management" },
  { group: "나", key: "sports-science", department: "스포츠과학과", majorGroup: "체육", recruitmentCount: 3, field: "sports" },
  { group: "나", key: "industrial-design", department: "산업디자인학과(수능100%)", majorGroup: "디자인", recruitmentCount: 7, field: "industrial-design" },
  { group: "나", key: "visual-design", department: "시각디자인학과(수능100%)", majorGroup: "디자인", recruitmentCount: 3, field: "design" },
  { group: "나", key: "metal-craft", department: "금속공예디자인학과(수능100%)", majorGroup: "디자인", recruitmentCount: 3, field: "design" },
  { group: "다", key: "ai-application", department: "인공지능응용학과", majorGroup: "자연·공학", recruitmentCount: 18, field: "natural" },
  { group: "다", key: "intelligent-semiconductor", department: "지능형반도체공학과", majorGroup: "자연·공학", recruitmentCount: 13, field: "natural" },
  { group: "다", key: "future-energy", department: "미래에너지학과", majorGroup: "자연·공학", recruitmentCount: 4, field: "natural" },
  { group: "다", key: "st-free-natural", department: "ST자유전공학부_자연", majorGroup: "자연·공학", recruitmentCount: 26, field: "natural" },
];

function seoultechWeights(field: SeoultechField) {
  switch (field) {
    case "natural": return { koreanWeight: 20, mathWeight: 35, englishWeight: 20, inquiryWeight: 25 };
    case "humanities": return { koreanWeight: 30, mathWeight: 25, englishWeight: 20, inquiryWeight: 25 };
    case "tech-management": return { koreanWeight: 25, mathWeight: 30, englishWeight: 20, inquiryWeight: 25 };
    case "sports": return { koreanWeight: 30, mathWeight: 20, englishWeight: 25, inquiryWeight: 25 };
    case "industrial-design": return { koreanWeight: 30, mathWeight: 25, englishWeight: 25, inquiryWeight: 20 };
    case "design": return { koreanWeight: 40, mathWeight: 0, englishWeight: 25, inquiryWeight: 35 };
  }
}

export const seoultechAdmissions: RegularAdmission[] = SEOULTECH_ROWS.map((row) => {
  const natural = row.field === "natural";
  return {
    id: `seoultech-seoul-${row.group}-${row.key}`,
    universityId: "seoultech-seoul",
    universityName: "서울과학기술대학교",
    region: "서울",
    department: row.department,
    majorGroup: row.majorGroup,
    group: row.group,
    recruitmentCount: row.recruitmentCount,
    scoreMetric: "표준점수",
    subjectMetrics: { korean: "표준점수", math: "표준점수", inquiry: "표준점수" },
    ...seoultechWeights(row.field),
    inquirySubjects: 2,
    inquiryAggregation: "mean",
    calculationMode: "normalized-standard-sum",
    finalScoreMultiplier: 1000,
    gradeAdjustmentsAfterFinalMultiplier: true,
    ...(natural ? {
      inquiryTypeBonusRequired: true,
      inquiryTypeBonusRate: { "사탐": 0, "과탐": 0.07, "직탐": 0 },
    } : {}),
    englishGradeTable: SEOULTECH_ENGLISH,
    koreanHistoryRequired: true,
    koreanHistoryGradePoints: SEOULTECH_HISTORY,
    calculationVerified: false,
    note: `2027 정시 수능위주 일반전형 ${row.group}군 ${row.recruitmentCount}명. 모집요강 p.13 모집단위별 인원 및 p.40 반영비율 기준. 영어는 가상 표준점수(135점 만점)를 100점 기준으로 정규화해 입력, 한국사는 감산. ${natural ? "자연계열 과탐 응시 과목별 표준점수 7% 가산." : ""} 당해 연도 국어·수학·탐구 표준점수 최고점 미확보로 최종 환산은 미검증.`,
    sourceUrl: SEOULTECH_SOURCE,
    verifiedAt: "2026-11-23",
  };
});

export const seoultechQuota2027 = SEOULTECH_ROWS.reduce((totals, row) => {
  totals[row.group] += row.recruitmentCount;
  return totals;
}, { 가: 0, 나: 0, 다: 0 });
