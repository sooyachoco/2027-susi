import type { RegularAdmission } from "./types";

// 2027학년도 건국대학교 서울캠퍼스 정시 수능(KU일반학생) 모집단위.
// 모집인원은 공식 정시모집요강 p.9~10 기준(수시 이월 전).
const KONKUK_SOURCE = "https://www.konkuk.ac.kr/bbs/admission/6282/1204956/artclView.do";
const KONKUK_ENGLISH = { 1:200, 2:197, 3:194, 4:190, 5:185, 6:180, 7:170, 8:160, 9:150 } as const;
const KONKUK_HISTORY = { 1:0, 2:0, 3:0, 4:0, 5:-1, 6:-1.75, 7:-3, 8:-4.25, 9:-5 } as const;
const KONKUK_ROWS = [
  {
    "key": "ga-physics",
    "department": "물리학과",
    "group": "가",
    "recruitmentCount": 12,
    "field": "natural"
  },
  {
    "key": "ga-architecture",
    "department": "건축학부",
    "group": "가",
    "recruitmentCount": 39,
    "field": "natural"
  },
  {
    "key": "ga-civil-environment",
    "department": "사회환경공학부",
    "group": "가",
    "recruitmentCount": 42,
    "field": "natural"
  },
  {
    "key": "ga-mechanical-robot-auto",
    "department": "기계·로봇·자동차공학부",
    "group": "가",
    "recruitmentCount": 35,
    "field": "natural"
  },
  {
    "key": "ga-electrical-electronics",
    "department": "전기전자공학부",
    "group": "가",
    "recruitmentCount": 63,
    "field": "natural"
  },
  {
    "key": "ga-chemical-bio-energy",
    "department": "화공·생명·에너지공학부",
    "group": "가",
    "recruitmentCount": 31,
    "field": "natural"
  },
  {
    "key": "ga-ai",
    "department": "인공지능학과",
    "group": "가",
    "recruitmentCount": 27,
    "field": "natural"
  },
  {
    "key": "ga-computer",
    "department": "컴퓨터공학과",
    "group": "가",
    "recruitmentCount": 32,
    "field": "natural"
  },
  {
    "key": "ga-materials",
    "department": "재료공학과",
    "group": "가",
    "recruitmentCount": 26,
    "field": "natural"
  },
  {
    "key": "ga-aerospace",
    "department": "항공우주·모빌리티공학과",
    "group": "가",
    "recruitmentCount": 25,
    "field": "natural"
  },
  {
    "key": "ga-bioengineering",
    "department": "생물공학과",
    "group": "가",
    "recruitmentCount": 15,
    "field": "natural"
  },
  {
    "key": "ga-industrial-engineering",
    "department": "산업공학과",
    "group": "가",
    "recruitmentCount": 16,
    "field": "natural"
  },
  {
    "key": "ga-international-trade",
    "department": "국제무역학과",
    "group": "가",
    "recruitmentCount": 32,
    "field": "humanities"
  },
  {
    "key": "ga-technology-management",
    "department": "기술경영학과",
    "group": "가",
    "recruitmentCount": 15,
    "field": "humanities"
  },
  {
    "key": "ga-veterinary",
    "department": "수의예과",
    "group": "가",
    "recruitmentCount": 31,
    "field": "natural"
  },
  {
    "key": "ga-modern-art",
    "department": "현대미술학과",
    "group": "가",
    "recruitmentCount": 32,
    "field": "practical"
  },
  {
    "key": "ga-math-education",
    "department": "수학교육과",
    "group": "가",
    "recruitmentCount": 8,
    "field": "natural"
  },
  {
    "key": "ga-english-education",
    "department": "영어교육과",
    "group": "가",
    "recruitmentCount": 4,
    "field": "humanities"
  },
  {
    "key": "ga-free",
    "department": "KU자유전공학부",
    "group": "가",
    "recruitmentCount": 60,
    "field": "free"
  },
  {
    "key": "na-media",
    "department": "미디어커뮤니케이션학과",
    "group": "나",
    "recruitmentCount": 5,
    "field": "humanities"
  },
  {
    "key": "na-culture-content",
    "department": "문화콘텐츠학과",
    "group": "나",
    "recruitmentCount": 5,
    "field": "humanities"
  },
  {
    "key": "na-math",
    "department": "수학과",
    "group": "나",
    "recruitmentCount": 8,
    "field": "natural"
  },
  {
    "key": "na-chemistry",
    "department": "화학과",
    "group": "나",
    "recruitmentCount": 9,
    "field": "natural"
  },
  {
    "key": "na-political",
    "department": "정치외교학과",
    "group": "나",
    "recruitmentCount": 13,
    "field": "humanities"
  },
  {
    "key": "na-economics",
    "department": "경제학과",
    "group": "나",
    "recruitmentCount": 32,
    "field": "humanities"
  },
  {
    "key": "na-public-admin",
    "department": "행정학과",
    "group": "나",
    "recruitmentCount": 25,
    "field": "humanities"
  },
  {
    "key": "na-statistics",
    "department": "응용통계학과",
    "group": "나",
    "recruitmentCount": 18,
    "field": "natural"
  },
  {
    "key": "na-business",
    "department": "경영학과",
    "group": "나",
    "recruitmentCount": 65,
    "field": "humanities"
  },
  {
    "key": "na-real-estate",
    "department": "부동산학과",
    "group": "나",
    "recruitmentCount": 12,
    "field": "humanities"
  },
  {
    "key": "na-advanced-bio",
    "department": "첨단바이오공학부",
    "group": "나",
    "recruitmentCount": 19,
    "field": "natural"
  },
  {
    "key": "na-food-convergence",
    "department": "식품융합학부",
    "group": "나",
    "recruitmentCount": 25,
    "field": "natural"
  },
  {
    "key": "na-environment-ecology",
    "department": "환경생태과학부",
    "group": "나",
    "recruitmentCount": 23,
    "field": "natural"
  },
  {
    "key": "na-animal-science",
    "department": "동물자원과학과",
    "group": "나",
    "recruitmentCount": 14,
    "field": "natural"
  },
  {
    "key": "na-life-science",
    "department": "생명과학과",
    "group": "나",
    "recruitmentCount": 6,
    "field": "natural"
  },
  {
    "key": "na-food-resource",
    "department": "식량자원과학과",
    "group": "나",
    "recruitmentCount": 12,
    "field": "natural"
  },
  {
    "key": "na-communication-design",
    "department": "커뮤니케이션디자인학과",
    "group": "나",
    "recruitmentCount": 39,
    "field": "practical"
  },
  {
    "key": "na-clothing-humanities",
    "department": "의상디자인학과–인문계",
    "group": "나",
    "recruitmentCount": 17,
    "field": "humanities"
  },
  {
    "key": "na-clothing-arts",
    "department": "의상디자인학과–예체능계",
    "group": "나",
    "recruitmentCount": 17,
    "field": "practical"
  },
  {
    "key": "na-living-design",
    "department": "리빙디자인학과",
    "group": "나",
    "recruitmentCount": 45,
    "field": "practical"
  },
  {
    "key": "na-physical-education",
    "department": "체육교육과",
    "group": "나",
    "recruitmentCount": 25,
    "field": "practical"
  },
  {
    "key": "na-music-vocal",
    "department": "음악교육과–성악",
    "group": "나",
    "recruitmentCount": 7,
    "field": "practical"
  },
  {
    "key": "na-music-piano",
    "department": "음악교육과–피아노",
    "group": "나",
    "recruitmentCount": 7,
    "field": "practical"
  },
  {
    "key": "na-music-violin",
    "department": "음악교육과–바이올린",
    "group": "나",
    "recruitmentCount": 4,
    "field": "practical"
  },
  {
    "key": "na-music-viola",
    "department": "음악교육과–비올라",
    "group": "나",
    "recruitmentCount": 1,
    "field": "practical"
  },
  {
    "key": "na-music-cello",
    "department": "음악교육과–첼로",
    "group": "나",
    "recruitmentCount": 1,
    "field": "practical"
  },
  {
    "key": "na-educational-technology",
    "department": "교육공학과",
    "group": "나",
    "recruitmentCount": 13,
    "field": "humanities"
  },
  {
    "key": "da-free-humanities",
    "department": "문과대학자유전공학부",
    "group": "다",
    "recruitmentCount": 20,
    "field": "humanities"
  },
  {
    "key": "da-free-natural",
    "department": "이과대학자유전공학부",
    "group": "다",
    "recruitmentCount": 13,
    "field": "natural"
  },
  {
    "key": "da-free-engineering",
    "department": "공과대학자유전공학부",
    "group": "다",
    "recruitmentCount": 60,
    "field": "natural"
  },
  {
    "key": "da-social-sciences-convergence",
    "department": "사회과학대학융합전공학부",
    "group": "다",
    "recruitmentCount": 68,
    "field": "natural"
  },
  {
    "key": "da-bioengineering",
    "department": "생명공학부",
    "group": "다",
    "recruitmentCount": 23,
    "field": "natural"
  },
  {
    "key": "da-free-life-science",
    "department": "융합생명과학대학자유전공학부",
    "group": "다",
    "recruitmentCount": 65,
    "field": "natural"
  },
  {
    "key": "da-industrial-design",
    "department": "산업디자인학과",
    "group": "다",
    "recruitmentCount": 34,
    "field": "practical"
  },
  {
    "key": "da-video-design",
    "department": "영상디자인학과",
    "group": "다",
    "recruitmentCount": 35,
    "field": "practical"
  }
] as const;

export const konkukAdmissions2027: RegularAdmission[] = KONKUK_ROWS.map((row) => {
  const practical = row.field === "practical";
  const humanities = row.field === "humanities" || row.field === "free";
  const free = row.field === "free";
  const arts = practical;
  const csatShare = practical ? 60 : 100;
  const weights = arts
    ? { koreanWeight:45, mathWeight:0, englishWeight:25, inquiryWeight:0 }
    : humanities
      ? { koreanWeight:40, mathWeight:30, englishWeight:10, inquiryWeight:20 }
      : { koreanWeight:30, mathWeight:40, englishWeight:10, inquiryWeight:20 };
  return {
    id: `konkuk-seoul-${row.key}`,
    universityId: "konkuk-seoul",
    universityName: "건국대학교",
    region: "서울",
    department: row.department,
    majorGroup: arts ? "예체능" : free ? "전체" : humanities ? "인문·사회" : "자연·공학",
    group: row.group,
    recruitmentCount: row.recruitmentCount,
    scoreMetric: "표준점수",
    subjectMetrics: { korean:"표준점수", math:"표준점수", inquiry:"백분위" },
    ...weights,
    inquirySubjects: 2,
    inquiryAggregation: "sum",
    calculationMode: "normalized-standard-sum",
    subjectMaximumScores: { korean:200, math:200, inquiry:200 },
    finalScoreMultiplier: csatShare * 10,
    gradeAdjustmentsAfterFinalMultiplier: true,
    inquiryConversionRequired: true,
    inquiryConversionPending: true,
    languageMathMode: free ? "고득점 우선" : undefined,
    alternateWeighting: free ? { koreanWeight:30, mathWeight:40, englishWeight:10, inquiryWeight:20 } : undefined,
    topAreaWeights: arts ? { areas:["math","inquiry"], count:1, weight:30 } : undefined,
    englishGradeTable: KONKUK_ENGLISH,
    englishMaximumScore: 200,
    koreanHistoryRequired: true,
    koreanHistoryGradePoints: KONKUK_HISTORY,
    practicalEvaluationRequired: practical,
    practicalEvaluationNote: practical ? "실기평가 점수 미입력(수능 60%, 실기 40%; 수능 내 수학·탐구 중 높은 영역 30% 반영)" : undefined,
    schoolViolencePenaltyRequired: true,
    schoolViolencePenaltyNote: "전 전형 총점 1,000점 기준: 1호 감점 없음, 2호 20점, 3호 30점, 4호 200점, 5호 300점, 6~9호 각 500점 감점. 조치사항 입력 전 최종 판정 보류.",
    calculationVerified: false,
    sourceUrl: KONKUK_SOURCE,
    verifiedAt: "2026-11-25",
    note: practical
      ? "2027 KU일반학생 예체능: 수능60%+실기40%, 국어45%·영어25%·수학/탐구 중 반영점수가 높은 영역30%. 실기점수와 탐구 변환표 미입력으로 판정 보류."
      : free
        ? "2027 KU자유전공학부: 언어중심 A(국어40·수학30)와 수리중심 B(국어30·수학40) 중 높은 점수 반영, 영어10·탐구20. 탐구 변환표 미공개로 최종 환산 보류."
        : `2027 KU일반학생 ${row.group}군. ${humanities ? "언어중심 A 국어40·수학30·영어10·탐구20" : "수리중심 B 국어30·수학40·영어10·탐구20"}. 탐구 백분위 변환표 미공개로 최종 환산 보류.`
  };
});

if (konkukAdmissions2027.length !== 54 ||
    konkukAdmissions2027.reduce((sum,row)=>sum+(row.recruitmentCount ?? 0),0) !== 1330) {
  throw new Error("건국대 2027 KU일반학생 모집단위·인원 검증 실패");
}
