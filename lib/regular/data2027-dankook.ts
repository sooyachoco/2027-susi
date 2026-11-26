import type { RegularAdmission } from "./types";

// 단국대학교 2027학년도 정시모집요강(2026.09.04 배포), 죽전캠퍼스 수능위주 일반학생.
// 모집단위·군·모집인원: 모집요강 p.24-25, 수능 반영비율·환산표: p.28-29.
// 학교폭력 조치사항은 대학별 감점 규칙이 있어도 학생별 조치 내역 입력이 필요하므로 최종 산출은 보류한다.
const SOURCE = "https://ipsi.dankook.ac.kr/jukjeon/notice/list.html?bbsid=juk_info&bltn_seq=51567&mode=view";
const ENGLISH = { 1:100, 2:98, 3:95, 4:85, 5:70, 6:40, 7:15, 8:5, 9:0 } as const;
const HISTORY = { 1:5, 2:5, 3:5, 4:5, 5:4, 6:3, 7:2, 8:1, 9:0 } as const;
const ROWS = [
  [
    "ga-free-wide",
    "퇴계혁신칼리지(광역)",
    "다",
    145,
    "free"
  ],
  [
    "na-korean",
    "국어국문학과",
    "나",
    14,
    "human"
  ],
  [
    "na-history",
    "사학과",
    "나",
    14,
    "human"
  ],
  [
    "na-philosophy",
    "철학과",
    "나",
    8,
    "human"
  ],
  [
    "ga-english-humanities",
    "영미인문학과",
    "가",
    14,
    "human"
  ],
  [
    "da-social-wide",
    "퇴계혁신칼리지(사회계열광역)",
    "다",
    30,
    "human"
  ],
  [
    "na-law",
    "법학과",
    "나",
    24,
    "human"
  ],
  [
    "na-politics",
    "정치외교학과",
    "나",
    11,
    "human"
  ],
  [
    "na-public-admin",
    "행정학과",
    "나",
    10,
    "human"
  ],
  [
    "na-urban",
    "도시계획·부동산학부",
    "나",
    13,
    "human"
  ],
  [
    "ga-media",
    "미디어커뮤니케이션학부",
    "가",
    14,
    "human"
  ],
  [
    "ga-counseling",
    "상담학과",
    "가",
    9,
    "human"
  ],
  [
    "na-economics",
    "경제학과",
    "나",
    12,
    "business"
  ],
  [
    "na-trade",
    "무역학과",
    "나",
    13,
    "business"
  ],
  [
    "na-business",
    "경영학부",
    "나",
    61,
    "business"
  ],
  [
    "ga-international-business",
    "국제경영학과",
    "가",
    22,
    "business"
  ],
  [
    "da-mobile-systems",
    "모바일시스템공학과",
    "다",
    18,
    "natural"
  ],
  [
    "da-engineering-wide",
    "퇴계혁신칼리지(공학계열광역)",
    "다",
    20,
    "natural"
  ],
  [
    "ga-electrical",
    "전자전기공학과",
    "가",
    21,
    "natural"
  ],
  [
    "ga-semiconductor",
    "융합반도체공학과",
    "가",
    18,
    "natural"
  ],
  [
    "ga-polymer",
    "고분자공학전공",
    "가",
    14,
    "natural"
  ],
  [
    "ga-materials",
    "융합소재공학전공",
    "가",
    10,
    "natural"
  ],
  [
    "ga-infrastructure",
    "인프라건설공학과",
    "가",
    24,
    "natural"
  ],
  [
    "ga-mechanical",
    "기계공학과",
    "가",
    16,
    "natural"
  ],
  [
    "ga-chemical",
    "화학공학과",
    "가",
    27,
    "natural"
  ],
  [
    "na-architecture-5",
    "건축학전공(5년제)",
    "나",
    15,
    "architecture"
  ],
  [
    "ga-architecture-engineering",
    "건축공학전공",
    "가",
    11,
    "natural"
  ],
  [
    "na-software",
    "소프트웨어학과",
    "나",
    13,
    "natural"
  ],
  [
    "na-computer",
    "컴퓨터공학과",
    "나",
    13,
    "natural"
  ],
  [
    "na-statistics-data",
    "통계데이터사이언스학과",
    "나",
    16,
    "natural"
  ],
  [
    "na-cybersecurity",
    "사이버보안학과",
    "나",
    16,
    "natural"
  ],
  [
    "na-ai",
    "인공지능학과",
    "나",
    19,
    "natural"
  ],
  [
    "na-ai-architecture",
    "AI건축융합학과",
    "나",
    8,
    "natural"
  ],
  [
    "da-hanmun",
    "한문교육과",
    "다",
    12,
    "human"
  ],
  [
    "da-special-education",
    "특수교육과",
    "다",
    18,
    "human"
  ],
  [
    "da-math-education",
    "수학교육과",
    "다",
    10,
    "natural"
  ],
  [
    "da-science-education",
    "과학교육과",
    "다",
    14,
    "natural"
  ],
  [
    "da-physical-education",
    "체육교육과",
    "다",
    30,
    "sports"
  ],
  [
    "ga-film-theory",
    "영화전공(이론·연출·스탭)",
    "가",
    15,
    "human"
  ],
  [
    "ga-theatre-direction",
    "연극전공(연출)",
    "가",
    5,
    "human"
  ]
] as const;

function weights(field: string) {
  if (field === "business") return [25,35,20,20] as const;
  if (field === "natural") return [20,35,20,25] as const;
  if (field === "architecture") return [35,25,20,20] as const;
  if (field === "sports") return [40,10,20,30] as const;
  if (field === "free") return [30,30,20,20] as const;
  return [35,25,20,20] as const;
}
function majorGroup(field: string) {
  return field === "business" ? "경영·경제"
    : field === "natural" || field === "architecture" ? "자연·공학"
    : field === "sports" ? "예체능·체육"
    : field === "free" ? "자율전공" : "인문·사회";
}
export const dankookJukjeonAdmissions2027: RegularAdmission[] = ROWS.map(([key, department, group, recruitmentCount, field]) => {
  const [koreanWeight, mathWeight, englishWeight, inquiryWeight] = weights(field);
  const naturalBonus = field === "natural";
  const sports = field === "sports";
  return {
    id: `dankook-jukjeon-${key}`,
    universityId: "dankook-jukjeon",
    universityName: "단국대학교(죽전)",
    region: "경기",
    department,
    majorGroup: majorGroup(field),
    group,
    recruitmentCount,
    scoreMetric: "백분위",
    subjectMetrics: { korean: "백분위", math: "백분위", inquiry: "백분위" },
    koreanWeight, mathWeight, englishWeight, inquiryWeight,
    inquirySubjects: 2,
    inquiryAggregation: "mean",
    calculationMode: "normalized-standard-sum",
    finalScoreMultiplier: 1000,
    englishGradeTable: ENGLISH,
    koreanHistoryRequired: true,
    koreanHistoryGradePoints: HISTORY,
    mathChoiceBonusRequired: naturalBonus || sports,
    mathChoiceBonusRate: naturalBonus || sports ? { 미적분: 0.05, 기하: 0.05, 확률과통계: 0 } : undefined,
    inquiryTypeBonusRequired: naturalBonus || sports,
    inquiryTypeBonusRate: naturalBonus || sports ? { 사탐: 0, 과탐: 0.05, 직탐: 0 } : undefined,
    schoolViolencePenaltyRequired: true,
    schoolViolencePenaltyNote: "총점 1,000점 기준 학교폭력 조치사항 감점 적용(모집요강 p.29). 조치 호수별 개인 감점 산출을 별도 입력으로 검증하기 전까지 최종 판정 보류.",
    practicalEvaluationRequired: sports,
    practicalEvaluationNote: sports ? "체육교육과 수능 70% + 실기 30%(실질반영비율 74.47% + 25.53%). 실기 종목별 점수 입력 필요." : undefined,
    calculationVerified: false,
    sourceUrl: SOURCE,
    verifiedAt: "2026-11-26",
    note: "2027학년도 정시 수능위주 일반학생, 죽전캠퍼스. 모집요강 p.28-29의 영역별 반영비율·영어 등급 환산·한국사 가산·자연계열 수학/과탐 가산을 반영. 학교폭력 개인별 조치 입력과 체육교육과 실기점수 미지원으로 최종 합격 가능성 판정은 보류.",
  };
});
const totals = dankookJukjeonAdmissions2027.reduce((sum, item) => {
  sum[item.group] += item.recruitmentCount ?? 0;
  return sum;
}, { 가: 0, 나: 0, 다: 0 });
if (dankookJukjeonAdmissions2027.length !== 40 || totals.가 + totals.나 + totals.다 !== 797) {
  throw new Error("단국대 죽전 2027 정시 일반학생 모집단위·인원 검증 실패");
}
