import type { RegularAdmission } from "./types";

// 2027학년도 서울과학기술대학교 정시모집요강 p.13, p.40-41, p.48 대조.
// 모집인원은 수능100%와 수능+실기 전형을 별도 행으로 유지한다.
// 점수 산식의 표준점수 최고점·영어 가상표준점수의 환산 단위·한국사 감산 및
// 학교폭력 감점의 지원자별 입력을 엔진에서 완전히 검증하기 전까지 판정은 보류한다.
const SEOULTECH_SOURCE = "https://admission.seoultech.ac.kr/";
const rows = [
  [
    "ga-free-engineering",
    "자유전공학부(공과대학)",
    "가",
    69,
    "natural"
  ],
  [
    "ga-electrical-information",
    "전기정보공학과",
    "가",
    24,
    "natural"
  ],
  [
    "ga-electronic-engineering",
    "전자공학과",
    "가",
    18,
    "natural"
  ],
  [
    "ga-ict-convergence",
    "ICT융합공학과",
    "가",
    11,
    "natural"
  ],
  [
    "ga-computer-engineering",
    "컴퓨터공학과",
    "가",
    21,
    "natural"
  ],
  [
    "ga-chemical-bio",
    "화공생명공학과",
    "가",
    16,
    "natural"
  ],
  [
    "ga-environmental",
    "환경공학과",
    "가",
    21,
    "natural"
  ],
  [
    "ga-food-bio",
    "식품생명공학과",
    "가",
    9,
    "natural"
  ],
  [
    "ga-precision-chemistry",
    "정밀화학과",
    "가",
    11,
    "natural"
  ],
  [
    "ga-optometry",
    "안경광학과",
    "가",
    11,
    "natural"
  ],
  [
    "ga-biomedical",
    "바이오메디컬학과",
    "가",
    7,
    "natural"
  ],
  [
    "ga-quantum-physics",
    "양자융합물리학과",
    "가",
    4,
    "natural"
  ],
  [
    "ga-industrial-info-natural",
    "산업공학부(산업정보시스템전공)_자연",
    "가",
    6,
    "natural"
  ],
  [
    "ga-itm-natural",
    "산업공학부(ITM전공)_자연",
    "가",
    6,
    "natural"
  ],
  [
    "ga-msde",
    "MSDE학과",
    "가",
    13,
    "natural"
  ],
  [
    "ga-global-tech-natural",
    "경영학과(글로벌테크노경영전공)_자연",
    "가",
    3,
    "natural"
  ],
  [
    "ga-english",
    "영어영문학과",
    "가",
    5,
    "humanities"
  ],
  [
    "ga-public-admin",
    "행정학과",
    "가",
    9,
    "humanities"
  ],
  [
    "ga-industrial-info-humanities",
    "산업공학부(산업정보시스템전공)_인문",
    "가",
    2,
    "humanities"
  ],
  [
    "ga-itm-humanities",
    "산업공학부(ITM전공)_인문",
    "가",
    2,
    "humanities"
  ],
  [
    "ga-business",
    "경영학과(경영학전공)",
    "가",
    9,
    "humanities"
  ],
  [
    "ga-global-tech-humanities",
    "경영학과(글로벌테크노경영전공)_인문",
    "가",
    8,
    "humanities"
  ],
  [
    "ga-free-creative",
    "자유전공학부(창의융합대학)",
    "가",
    19,
    "natural"
  ],
  [
    "na-robotics",
    "기계시스템공학부(지능형로봇전공)",
    "나",
    25,
    "natural"
  ],
  [
    "na-future-mobility",
    "기계시스템공학부(미래자동차전공)",
    "나",
    14,
    "natural"
  ],
  [
    "na-mechanical",
    "기계공학과",
    "나",
    37,
    "natural"
  ],
  [
    "na-safety",
    "안전공학과",
    "나",
    15,
    "natural"
  ],
  [
    "na-materials",
    "신소재공학과",
    "나",
    21,
    "natural"
  ],
  [
    "na-civil",
    "건설시스템공학과",
    "나",
    29,
    "natural"
  ],
  [
    "na-architecture-engineering",
    "건축학부(건축공학전공)",
    "나",
    18,
    "natural"
  ],
  [
    "na-architecture",
    "건축학부(건축학전공)",
    "나",
    12,
    "natural"
  ],
  [
    "na-free-ict",
    "자유전공학부(정보통신대학)",
    "나",
    35,
    "natural"
  ],
  [
    "na-free-energy-bio",
    "자유전공학부(에너지바이오대학)",
    "나",
    29,
    "natural"
  ],
  [
    "na-free-humanities",
    "자유전공학부(인문사회대학)",
    "나",
    12,
    "humanities"
  ],
  [
    "na-free-tech-management",
    "자유전공학부(기술경영융합대학)",
    "나",
    14,
    "tech"
  ],
  [
    "na-sports-csat",
    "스포츠과학과",
    "나",
    3,
    "sports"
  ],
  [
    "na-industrial-design-csat",
    "산업디자인학과",
    "나",
    7,
    "industrialDesign"
  ],
  [
    "na-visual-design-csat",
    "시각디자인학과",
    "나",
    3,
    "arts"
  ],
  [
    "na-metal-design-csat",
    "금속공예디자인학과",
    "나",
    3,
    "arts"
  ],
  [
    "da-ai-application",
    "인공지능응용학과",
    "다",
    18,
    "natural"
  ],
  [
    "da-intelligent-semiconductor",
    "지능형반도체공학과",
    "다",
    13,
    "natural"
  ],
  [
    "da-future-energy",
    "미래에너지학과",
    "다",
    4,
    "natural"
  ],
  [
    "da-st-free-natural",
    "ST자유전공학부_자연",
    "다",
    26,
    "natural"
  ],
  [
    "na-sports-practical",
    "스포츠과학과",
    "나",
    14,
    "sportsPractical"
  ],
  [
    "na-industrial-design-practical",
    "산업디자인학과",
    "나",
    27,
    "artsPractical"
  ],
  [
    "na-visual-design-practical",
    "시각디자인학과",
    "나",
    30,
    "artsPractical"
  ],
  [
    "na-pottery-practical",
    "도예학과",
    "나",
    20,
    "artsPractical"
  ],
  [
    "na-metal-design-practical",
    "금속공예디자인학과",
    "나",
    19,
    "artsPractical"
  ],
  [
    "na-sculpture-practical",
    "조형예술학과",
    "나",
    16,
    "artsPractical"
  ]
] as const;

function weights(type: string) {
  if (type === "humanities") return [30,25,20,25] as const;
  if (type === "tech") return [25,30,20,25] as const;
  if (type === "industrialDesign") return [30,25,25,20] as const;
  if (type === "sports") return [30,20,25,25] as const;
  if (type === "arts" || type === "artsPractical") return [40,0,25,35] as const;
  if (type === "sportsPractical") return [30,20,25,25] as const;
  return [20,35,20,25] as const;
}

function majorGroup(type: string) {
  if (type === "humanities" || type === "tech") return "인문·사회";
  if (type === "sports" || type === "sportsPractical") return "예체능·체육";
  if (type === "industrialDesign" || type === "arts" || type === "artsPractical") return "예체능·미술";
  return "자연·공학";
}

export const seoultechAdmissions2027: RegularAdmission[] = rows.map(([key, department, group, count, type]) => {
  const [koreanWeight, mathWeight, englishWeight, inquiryWeight] = weights(type);
  const practical = type === "sportsPractical" || type === "artsPractical";
  return {
    id: `seoultech-${key}`,
    universityId: "seoultech-seoul",
    universityName: "서울과학기술대학교",
    region: "서울",
    department,
    majorGroup: majorGroup(type),
    group,
    recruitmentCount: count,
    scoreMetric: "표준점수",
    subjectMetrics: { korean: "표준점수", math: "표준점수", inquiry: "표준점수" },
    koreanWeight,
    mathWeight,
    englishWeight,
    inquiryWeight,
    inquirySubjects: 2,
    inquiryAggregation: "mean",
    calculationMode: "normalized-standard-sum",
    practicalEvaluationRequired: practical,
    koreanHistoryRequired: true,
    inquiryTypeBonusRequired: type === "natural",
    inquiryTypeBonusRate: type === "natural" ? { 사탐: 0, 과탐: 0.07, 직탐: 0 } : undefined,
    schoolViolencePenaltyRequired: true,
    calculationVerified: false,
    sourceUrl: SEOULTECH_SOURCE,
    verifiedAt: "2026-11-24",
    note: practical
      ? "2027 정시 나군 수능+실기 모집인원. 실기 반영 및 1단계·2단계 산식 미구현으로 합격 점수 판정 보류."
      : "2027 정시 일반전형 수능100% 모집인원. 국어·수학·탐구 표준점수 최고점 정규화, 영어 가상 표준점수, 한국사 감산 및 학교폭력 감점의 완전한 엔진 검증 전까지 판정 보류.",
  };
});
