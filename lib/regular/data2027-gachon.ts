import type { RegularAdmission } from "./types";

const SOURCE = "https://admission.gachon.ac.kr/upload/BBS0021/20261113172843MBT5BA.PDF";

// 2027학년도 가천대 최종 정시모집요강(2026-11-13 게시) 일반전형1.
// 모집단위별 가·나·다군과 인원은 요강의 정시모집인원 표 기준.
// 수능은 국어·수학 중 40/30, 영어·탐구(1과목) 중 20/10을 각각 고득점 순으로 반영.
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
  note: "2027학년도 가천대 최종 정시모집요강 일반전형1 기준. 국어·수학 중 고득점 영역 40/30, 영어·탐구(1과목) 중 고득점 영역 20/10. 모집인원은 요강에 명시된 일반전형1 기준이며 수시 미충원 등에 따라 변경될 수 있음.",
  sourceUrl: SOURCE,
  verifiedAt: "2026-11-23",
};

export const regularAdmissions2027Gachon: RegularAdmission[] = [
  { ...COMMON, id: "gachon-tourism-ga", department: "관광경영학과", majorGroup: "경영·경제", group: "가", recruitmentCount: 15 },
  { ...COMMON, id: "gachon-economics-ga", department: "경제학과", majorGroup: "경영·경제", group: "가", recruitmentCount: 16 },
  { ...COMMON, id: "gachon-applied-statistics-ga", department: "응용통계학과", majorGroup: "경영·경제", group: "가", recruitmentCount: 16 },
  { ...COMMON, id: "gachon-accounting-na", department: "회계세무학과", majorGroup: "경영·경제", group: "나", recruitmentCount: 15 },
  { ...COMMON, id: "gachon-social-welfare-na", department: "사회복지학과", majorGroup: "사회·법", group: "나", recruitmentCount: 13 },
  { ...COMMON, id: "gachon-early-childhood-na", department: "유아교육학과", majorGroup: "인문·어문", group: "나", recruitmentCount: 13 },
  { ...COMMON, id: "gachon-psychology-na", department: "심리학과", majorGroup: "사회·법", group: "나", recruitmentCount: 15 },
  { ...COMMON, id: "gachon-business-da", department: "경영학과", majorGroup: "경영·경제", group: "다", recruitmentCount: 38 },
  { ...COMMON, id: "gachon-medical-industry-management-da", department: "의료산업경영학과", majorGroup: "경영·경제", group: "다", recruitmentCount: 17 },
  { ...COMMON, id: "gachon-media-communication-da", department: "미디어커뮤니케이션학과", majorGroup: "사회·법", group: "다", recruitmentCount: 10 },
  { ...COMMON, id: "gachon-fashion-industry-da", department: "패션산업학과", majorGroup: "예체능·디자인", group: "다", recruitmentCount: 13 },
];
