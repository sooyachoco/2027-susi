import type { RegularAdmission } from "./types";

// 삼육대학교 2027 정시모집요강 p.12-13, p.35-37 기준.
// 일반 수능백분위 계열 23개 모집단위 245명만 등록한다.
// 음악학과·아트앤디자인학과 27명은 수능영역을 등급환산하는 별도 산식이므로
// 현재 점수 입력 모델이 과목별 등급을 받지 않아 이 파일에 억지로 환산하지 않는다.
const SAMYUK_SOURCE = "https://ipsi.syu.ac.kr/upload_data/mojib/RF(0)_26090117733.pdf";
const SAMYUK_ENGLISH = { 1: 98, 2: 95, 3: 92, 4: 87, 5: 82, 6: 70, 7: 50, 8: 40, 9: 30 } as const;

type Row = {
  key: string;
  department: string;
  group: "가" | "나" | "다";
  count: number;
  field: "humanities" | "natural" | "sports" | "pharmacy";
};

const SAMYUK_ROWS: Row[] = [
  { key: "ga-creative-free", department: "창의융합자유전공학부", group: "가", count: 45, field: "humanities" },
  { key: "da-english", department: "영어영문학과", group: "다", count: 3, field: "humanities" },
  { key: "da-airline-tourism", department: "항공관광외국어학부", group: "다", count: 3, field: "humanities" },
  { key: "da-global-korean", department: "글로벌한국학과", group: "다", count: 3, field: "humanities" },
  { key: "ga-business", department: "경영학과", group: "가", count: 3, field: "humanities" },
  { key: "da-early-childhood", department: "유아교육과", group: "다", count: 5, field: "humanities" },
  { key: "ga-social-welfare", department: "사회복지학과", group: "가", count: 3, field: "humanities" },
  { key: "ga-counseling-psychology", department: "상담심리학과", group: "가", count: 3, field: "humanities" },
  { key: "ga-physical-education", department: "체육학과", group: "가", count: 15, field: "sports" },
  { key: "na-future-convergence-free", department: "미래융합자유전공학부", group: "나", count: 73, field: "natural" },
  { key: "ga-physical-therapy", department: "물리치료학과", group: "가", count: 12, field: "natural" },
  { key: "da-health-administration", department: "보건관리학과", group: "다", count: 3, field: "natural" },
  { key: "ga-food-nutrition", department: "식품영양학과", group: "가", count: 3, field: "natural" },
  { key: "ga-computer-science", department: "컴퓨터공학부", group: "가", count: 3, field: "natural" },
  { key: "da-ai-convergence", department: "인공지능융합학부", group: "다", count: 5, field: "natural" },
  { key: "da-bio-convergence", department: "바이오융합공학과", group: "다", count: 3, field: "natural" },
  { key: "ga-chemical-life-science", department: "화학생명과학과", group: "가", count: 3, field: "natural" },
  { key: "ga-animal-resources", department: "동물자원과학과", group: "가", count: 3, field: "natural" },
  { key: "da-environmental-design-horticulture", department: "환경디자인원예학과", group: "다", count: 5, field: "natural" },
  { key: "ga-data-cloud", department: "데이터클라우드공학과", group: "가", count: 5, field: "natural" },
  { key: "ga-architecture-5y", department: "건축학과(5년제)", group: "가", count: 7, field: "natural" },
  { key: "na-pharmacy", department: "약학과", group: "나", count: 12, field: "pharmacy" },
  { key: "da-nursing", department: "간호학과", group: "다", count: 25, field: "natural" },
];

export const samyukAdmissions2027: RegularAdmission[] = SAMYUK_ROWS.map((row) => {
  const pharmacy = row.field === "pharmacy";
  const sports = row.field === "sports";
  const natural = row.field === "natural";
  return {
    id: `samyuk-${row.key}`,
    universityId: "samyuk-seoul",
    universityName: "삼육대학교",
    region: "서울",
    department: row.department,
    majorGroup: row.field === "humanities" ? "인문·사회" : row.field === "sports" ? "예체능·체육" : pharmacy ? "의약·보건" : "자연·공학",
    group: row.group,
    recruitmentCount: row.count,
    scoreMetric: "백분위",
    subjectMetrics: { korean: "백분위", math: "백분위", inquiry: "백분위" },
    subjectMaximumScores: { korean: 100, math: 100, inquiry: 100 },
    koreanWeight: pharmacy ? 25 : 35,
    mathWeight: pharmacy ? 30 : 25,
    englishWeight: pharmacy ? 25 : 25,
    inquiryWeight: pharmacy ? 20 : 15,
    inquirySubjects: pharmacy ? 2 : 1,
    inquiryAggregation: "mean",
    calculationMode: "normalized-standard-sum",
    ...(sports
      ? { topAreaWeights: { areas: ["korean", "math", "english", "inquiry"] as ("korean" | "math" | "english" | "inquiry")[], count: 2, weight: 50 } }
      : pharmacy
        ? {}
        : { rankedAreaWeights: [35, 25, 25, 15] }),
    finalScoreMultiplier: 1000,
    englishGradeTable: SAMYUK_ENGLISH,
    ...(natural ? { mathChoiceBonusRequired: true, mathChoiceBonusRate: { 미적분: 0.03, 기하: 0.03, 확률과통계: 0 } } : {}),
    ...(pharmacy
      ? {
          mathChoiceBonusRequired: true,
          mathChoiceBonusRate: { 미적분: 0.05, 기하: 0.05, 확률과통계: 0 },
          inquiryTypeBonusRequired: true,
          inquiryTypeBonusRate: { 사탐: 0, 과탐: 0.03, 직탐: 0 },
          inquiryBonusRequiresSameType: "과탐" as const,
        }
      : {}),
    ...(sports
      ? {
          practicalEvaluationRequired: true,
          practicalEvaluationNote: "체육학과 실기평가 점수 미입력(수능 60% + 실기 40%, 실기 3종목 환산 필요)",
        }
      : {}),
    schoolViolencePenaltyRequired: true,
    schoolViolencePenaltyNote: "삼육대 2027 정시 학교폭력 조치사항 입력 필요(요강 p.37의 호수별 총점 감점표 적용 전까지 최종 판정 보류)",
    calculationVerified: false,
    benchmarkComparable: false,
    sourceUrl: SAMYUK_SOURCE,
    verifiedAt: "2026-11-25",
    note: pharmacy
      ? "정시 나군 약학과 12명. 국어 25%, 수학 30%, 영어 25%, 탐구 2과목 평균 20%; 미적분·기하 수학 5% 가산, 과탐 2과목 3% 가산. 학교폭력 조치사항 입력 및 엔진 검증 전 판정 보류."
      : sports
        ? "정시 가군 체육학과 15명. 수능 60% + 실기 40%; 수능은 국어·수학·영어·탐구 중 상위 2개 각 50%. 실기 점수 미입력으로 최종 점수 판정 보류."
        : natural
          ? "정시 수능위주 모집. 국어·수학·영어·탐구(1과목)를 백분위 기준 성적순으로 35%·25%·25%·15% 반영; 미적분·기하 선택 시 수학 취득점수 3% 가산."
          : "정시 수능위주 모집. 국어·수학·영어·탐구(1과목)를 백분위 기준 성적순으로 35%·25%·25%·15% 반영. 학교폭력 조치사항 입력 및 최종 검증 전 판정 보류.",
  };
});
