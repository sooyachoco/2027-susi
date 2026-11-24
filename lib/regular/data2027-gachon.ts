import type { RegularAdmission } from "./types";

const SOURCE = "https://admission.gachon.ac.kr/upload/BBS0021/20261113172843MBT5BA.PDF";

// 2027학년도 최종 정시모집요강 일반전형 1.
// 모집군별 상세 모집인원 표(요강 38·40·42쪽)와 수능 반영방법(38·40·42쪽)을 기준으로 정리.
// 일반전형 2는 국어·수학·탐구까지 등급 지표를 쓰므로 별도 산식 구현 전 이 데이터셋에 혼합하지 않는다.
const COMMON = {
  universityId: "gachon-seongnam",
  universityName: "가천대학교",
  region: "경기",
  scoreMetric: "백분위" as const,
  subjectMetrics: { korean: "백분위" as const, math: "백분위" as const, inquiry: "백분위" as const },
  koreanWeight: 40,
  mathWeight: 30,
  englishWeight: 20,
  inquiryWeight: 10,
  inquirySubjects: 1 as const,
  inquiryAggregation: "best" as const,
  calculationMode: "normalized-standard-sum" as const,
  subjectMaximumScores: { korean: 100, math: 100, inquiry: 100 },
  languageMathMode: "고득점 우선" as const,
  englishInquiryMode: "고득점 우선" as const,
  finalScoreMultiplier: 1000,
  gradeAdjustmentsAfterFinalMultiplier: true,
  englishGradeTable: { 1: 98, 2: 95, 3: 92, 4: 86, 5: 80, 6: 60, 7: 50, 8: 40, 9: 30 },
  calculationVerified: true,
  benchmarkComparable: false,
  note: "2027학년도 가천대 최종 정시모집요강 일반전형 1. 국어·수학 중 고득점 영역 40/30, 영어·탐구(1과목) 중 고득점 영역 20/10. 2026학년도는 국어·수학·영어 상위 3개 영역 35/25/20과 탐구 20을 반영해 산식이 달라 전년도 환산점수는 비교 기준으로 사용하지 않음.",
  sourceUrl: SOURCE,
  verifiedAt: "2026-11-23",
};

const MEDICAL = {
  ...COMMON,
  koreanWeight: 25,
  mathWeight: 30,
  englishWeight: 20,
  inquiryWeight: 25,
  inquirySubjects: 2 as const,
  inquiryAggregation: "mean" as const,
  languageMathMode: undefined,
  englishInquiryMode: undefined,
  note: "2027 최종 모집요강 일반전형 1 의예·약학·한의예 특별 반영비율: 국25·수30·영20·탐구2과목25. 일반계열의 40/30·20/10 고득점 배분을 적용하지 않는다. 수학 선택과목·탐구 세부 요건을 포함한 전체 산식 검증 전까지 합격 판정 보류.",
  calculationVerified: false,
};

type Row = {
  id: string;
  department: string;
  majorGroup: string;
  group: "가" | "나" | "다";
  recruitmentCount: number;
  medical?: boolean;
};

const rows: Row[] = [
  // 가군: 일반전형 1 모집인원 합계 347명
  { id: "tourism", department: "관광경영학과", majorGroup: "경영·경제", group: "가", recruitmentCount: 15 },
  { id: "finance-bigdata", department: "금융·빅데이터학부", majorGroup: "경영·경제", group: "가", recruitmentCount: 35 },
  { id: "economics", department: "경제학과", majorGroup: "경영·경제", group: "가", recruitmentCount: 16 },
  { id: "applied-statistics", department: "응용통계학과", majorGroup: "경영·경제", group: "가", recruitmentCount: 16 },
  { id: "law-college", department: "법과대학(법학과·경찰행정학과·행정학과)", majorGroup: "사회·법", group: "가", recruitmentCount: 45 },
  { id: "urban-planning-landscape", department: "도시계획·조경학부", majorGroup: "자연·공학", group: "가", recruitmentCount: 25 },
  { id: "chemical-bio-battery", department: "화공생명배터리공학부", majorGroup: "자연·공학", group: "가", recruitmentCount: 60 },
  { id: "life-science", department: "생명과학과", majorGroup: "자연·공학", group: "가", recruitmentCount: 15 },
  { id: "semiconductor-physics", department: "반도체물리학과", majorGroup: "자연·공학", group: "가", recruitmentCount: 11 },
  { id: "computer-engineering", department: "컴퓨터공학과", majorGroup: "자연·공학", group: "가", recruitmentCount: 30 },
  { id: "ai-systems", department: "인공지능시스템학과", majorGroup: "자연·공학", group: "가", recruitmentCount: 17 },
  { id: "electrical-engineering", department: "전기공학과", majorGroup: "자연·공학", group: "가", recruitmentCount: 21 },
  { id: "medicine", department: "의예과", majorGroup: "의약학", group: "가", recruitmentCount: 14, medical: true },
  { id: "korean-medicine", department: "한의예과", majorGroup: "의약학", group: "가", recruitmentCount: 16, medical: true },
  { id: "pharmacy", department: "약학과", majorGroup: "의약학", group: "가", recruitmentCount: 11, medical: true },

  // 나군: 일반전형 1 모집인원 합계 346명
  { id: "accounting", department: "회계세무학과", majorGroup: "경영·경제", group: "나", recruitmentCount: 15 },
  { id: "social-welfare", department: "사회복지학과", majorGroup: "사회·법", group: "나", recruitmentCount: 13 },
  { id: "early-childhood", department: "유아교육학과", majorGroup: "교육", group: "나", recruitmentCount: 13 },
  { id: "psychology", department: "심리학과", majorGroup: "사회·법", group: "나", recruitmentCount: 15 },
  { id: "ai-humanities-college", department: "AI인문대학(한국어문학·영미어문·중국어문·일본어문·유럽어문)", majorGroup: "인문·어문", group: "나", recruitmentCount: 61 },
  { id: "architecture-engineering", department: "건축공학과", majorGroup: "자연·공학", group: "나", recruitmentCount: 13 },
  { id: "smart-factory", department: "스마트팩토리학과", majorGroup: "자연·공학", group: "나", recruitmentCount: 18 },
  { id: "construction-environment", department: "건설환경공학과", majorGroup: "자연·공학", group: "나", recruitmentCount: 16 },
  { id: "semiconductor-college", department: "반도체대학(전자공학과·반도체공학과)", majorGroup: "자연·공학", group: "나", recruitmentCount: 61 },
  { id: "system-semiconductor", department: "시스템반도체학과", majorGroup: "자연·공학", group: "나", recruitmentCount: 18 },
  { id: "information-security", department: "정보보호학과", majorGroup: "자연·공학", group: "나", recruitmentCount: 17 },
  { id: "smart-city", department: "스마트시티학과", majorGroup: "자연·공학", group: "나", recruitmentCount: 16 },
  { id: "nursing", department: "간호학과", majorGroup: "보건", group: "나", recruitmentCount: 70 },

  // 다군: 일반전형 1 모집인원 합계 378명
  { id: "business", department: "경영학과", majorGroup: "경영·경제", group: "다", recruitmentCount: 38 },
  { id: "medical-industry-management", department: "의료산업경영학과", majorGroup: "경영·경제", group: "다", recruitmentCount: 17 },
  { id: "media-communication", department: "미디어커뮤니케이션학과", majorGroup: "사회·법", group: "다", recruitmentCount: 10 },
  { id: "fashion-industry", department: "패션산업학과", majorGroup: "예체능·디자인", group: "다", recruitmentCount: 13 },
  { id: "architecture", department: "건축학부", majorGroup: "자연·공학", group: "다", recruitmentCount: 22 },
  { id: "mechanical-engineering", department: "기계공학부", majorGroup: "자연·공학", group: "다", recruitmentCount: 45 },
  { id: "materials-engineering", department: "신소재공학과", majorGroup: "자연·공학", group: "다", recruitmentCount: 16 },
  { id: "bio-nano", department: "바이오나노학과", majorGroup: "자연·공학", group: "다", recruitmentCount: 16 },
  { id: "food-biotechnology", department: "식품생명공학과", majorGroup: "자연·공학", group: "다", recruitmentCount: 16 },
  { id: "food-nutrition", department: "식품영양학과", majorGroup: "자연·공학", group: "다", recruitmentCount: 14 },
  { id: "chemistry", department: "화학과", majorGroup: "자연·공학", group: "다", recruitmentCount: 15 },
  { id: "artificial-intelligence", department: "인공지능학과", majorGroup: "자연·공학", group: "다", recruitmentCount: 46 },
  { id: "medical-engineering", department: "의공학과", majorGroup: "보건", group: "다", recruitmentCount: 17 },
  { id: "dental-hygiene", department: "치위생학과", majorGroup: "보건", group: "다", recruitmentCount: 13 },
  { id: "emergency-medical", department: "응급구조학과", majorGroup: "보건", group: "다", recruitmentCount: 10 },
  { id: "physical-therapy", department: "물리치료학과", majorGroup: "보건", group: "다", recruitmentCount: 13 },
  { id: "radiology", department: "방사선학과", majorGroup: "보건", group: "다", recruitmentCount: 13 },
  { id: "exercise-rehabilitation", department: "운동재활학과", majorGroup: "보건", group: "다", recruitmentCount: 14 },
  { id: "biologics", department: "바이오로직스학과", majorGroup: "자연·공학", group: "다", recruitmentCount: 30 },
];

const groupTotals = rows.reduce<Record<"가" | "나" | "다", number>>(
  (totals, row) => ({ ...totals, [row.group]: totals[row.group] + row.recruitmentCount }),
  { 가: 0, 나: 0, 다: 0 },
);
if (groupTotals.가 !== 347 || groupTotals.나 !== 346 || groupTotals.다 !== 378) {
  throw new Error("가천대 2027 일반전형 1 모집군별 인원 합계가 공식 요강과 일치하지 않습니다.");
}

export const regularAdmissions2027Gachon: RegularAdmission[] = rows.map((row) => {
  if (row.medical) {
    return {
      ...MEDICAL,
      id: `gachon-${row.id}-${row.group}`,
      department: row.department,
      majorGroup: row.majorGroup,
      group: row.group,
      recruitmentCount: row.recruitmentCount,
    };
  }
  return {
    ...COMMON,
    id: `gachon-${row.id}-${row.group}`,
    department: row.department,
    majorGroup: row.majorGroup,
    group: row.group,
    recruitmentCount: row.recruitmentCount,
  };
});
