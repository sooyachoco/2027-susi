import type { RegularAdmission } from "./types";

// 2027학년도 동국대학교 서울캠퍼스 정시 일반전형 모집단위.
// 모집인원은 공식 정시모집요강 p.8~9 기준(수시 이월 전).
// 탐구 변환표준점수는 수능 성적 발표 후 별도 공지되므로 최종 환산은 보류한다.
const DONGGUK_SOURCE = "https://ipsi.dongguk.edu/upload/file/20260916161730JHGHCW.PDF";
const DONGGUK_ENGLISH = { 1:200, 2:199, 3:197, 4:190, 5:180, 6:140, 7:90, 8:20, 9:0 } as const;
const DONGGUK_HISTORY = { 1:0, 2:0, 3:0, 4:0, 5:-2, 6:-4, 7:-6, 8:-8, 9:-10 } as const;
const DONGGUK_ROWS = [
  {
    "key": "ga-cultural-heritage",
    "department": "문화유산학과",
    "group": "가",
    "recruitmentCount": 2,
    "field": "humanities"
  },
  {
    "key": "ga-english",
    "department": "영어영문학부",
    "group": "가",
    "recruitmentCount": 37,
    "field": "humanities"
  },
  {
    "key": "ga-chinese",
    "department": "중어중문학과",
    "group": "가",
    "recruitmentCount": 14,
    "field": "humanities"
  },
  {
    "key": "ga-chemistry",
    "department": "화학과",
    "group": "가",
    "recruitmentCount": 12,
    "field": "natural2"
  },
  {
    "key": "ga-physics",
    "department": "물리학과",
    "group": "가",
    "recruitmentCount": 8,
    "field": "natural1"
  },
  {
    "key": "ga-public-admin",
    "department": "정치행정학부 행정학전공",
    "group": "가",
    "recruitmentCount": 15,
    "field": "humanities"
  },
  {
    "key": "ga-north-korea",
    "department": "정치행정학부 북한학전공",
    "group": "가",
    "recruitmentCount": 4,
    "field": "humanities"
  },
  {
    "key": "ga-economics",
    "department": "경제학과",
    "group": "가",
    "recruitmentCount": 39,
    "field": "humanities"
  },
  {
    "key": "ga-trade",
    "department": "국제통상학과",
    "group": "가",
    "recruitmentCount": 26,
    "field": "humanities"
  },
  {
    "key": "ga-media",
    "department": "사회언론정보학부 미디어커뮤니케이션학전공",
    "group": "가",
    "recruitmentCount": 19,
    "field": "humanities"
  },
  {
    "key": "ga-food-industry",
    "department": "식품산업관리학과",
    "group": "가",
    "recruitmentCount": 10,
    "field": "humanities"
  },
  {
    "key": "ga-social-welfare",
    "department": "사회복지학과",
    "group": "가",
    "recruitmentCount": 4,
    "field": "humanities"
  },
  {
    "key": "ga-environment",
    "department": "융합환경과학과",
    "group": "가",
    "recruitmentCount": 16,
    "field": "natural2"
  },
  {
    "key": "ga-life-science",
    "department": "생명과학과",
    "group": "가",
    "recruitmentCount": 9,
    "field": "natural2"
  },
  {
    "key": "ga-electrical-electronics",
    "department": "전자전기공학부",
    "group": "가",
    "recruitmentCount": 67,
    "field": "natural3"
  },
  {
    "key": "ga-mechanical-robot-energy",
    "department": "기계로봇에너지공학과",
    "group": "가",
    "recruitmentCount": 45,
    "field": "natural3"
  },
  {
    "key": "ga-architecture",
    "department": "건축공학부",
    "group": "가",
    "recruitmentCount": 18,
    "field": "natural3"
  },
  {
    "key": "ga-industrial-systems",
    "department": "산업시스템공학과",
    "group": "가",
    "recruitmentCount": 27,
    "field": "natural1"
  },
  {
    "key": "ga-energy-materials",
    "department": "에너지신소재공학과",
    "group": "가",
    "recruitmentCount": 28,
    "field": "natural3"
  },
  {
    "key": "ga-medical-ai",
    "department": "의료인공지능공학과",
    "group": "가",
    "recruitmentCount": 14,
    "field": "natural3"
  },
  {
    "key": "ga-physical-education",
    "department": "체육교육과",
    "group": "가",
    "recruitmentCount": 11,
    "field": "practical-sport"
  },
  {
    "key": "ga-film-video",
    "department": "영화영상학과",
    "group": "가",
    "recruitmentCount": 14,
    "field": "humanities"
  },
  {
    "key": "na-buddhist",
    "department": "불교학부",
    "group": "나",
    "recruitmentCount": 18,
    "field": "humanities"
  },
  {
    "key": "na-korean-writing",
    "department": "국어국문문예창작학부",
    "group": "나",
    "recruitmentCount": 12,
    "field": "humanities"
  },
  {
    "key": "na-japanese",
    "department": "일본학과",
    "group": "나",
    "recruitmentCount": 10,
    "field": "humanities"
  },
  {
    "key": "na-philosophy",
    "department": "철학과",
    "group": "나",
    "recruitmentCount": 4,
    "field": "humanities"
  },
  {
    "key": "na-history",
    "department": "사학과",
    "group": "나",
    "recruitmentCount": 10,
    "field": "humanities"
  },
  {
    "key": "na-math",
    "department": "수학과",
    "group": "나",
    "recruitmentCount": 10,
    "field": "natural1"
  },
  {
    "key": "na-statistics",
    "department": "통계학과",
    "group": "나",
    "recruitmentCount": 14,
    "field": "natural1"
  },
  {
    "key": "na-law",
    "department": "법학과",
    "group": "나",
    "recruitmentCount": 47,
    "field": "humanities"
  },
  {
    "key": "na-political-science",
    "department": "정치행정학부 정치외교학전공",
    "group": "나",
    "recruitmentCount": 13,
    "field": "humanities"
  },
  {
    "key": "na-sociology",
    "department": "사회언론정보학부 사회학전공",
    "group": "나",
    "recruitmentCount": 8,
    "field": "humanities"
  },
  {
    "key": "na-advertising",
    "department": "광고홍보학과",
    "group": "나",
    "recruitmentCount": 18,
    "field": "humanities"
  },
  {
    "key": "na-police",
    "department": "경찰행정학부",
    "group": "나",
    "recruitmentCount": 23,
    "field": "humanities"
  },
  {
    "key": "na-food-bio",
    "department": "식품바이오융합공학과",
    "group": "나",
    "recruitmentCount": 16,
    "field": "natural3"
  },
  {
    "key": "na-biomedical",
    "department": "의생명공학과",
    "group": "나",
    "recruitmentCount": 9,
    "field": "natural3"
  },
  {
    "key": "na-information-communications",
    "department": "정보통신공학과",
    "group": "나",
    "recruitmentCount": 31,
    "field": "natural3"
  },
  {
    "key": "na-civil-environment",
    "department": "건설환경공학과",
    "group": "나",
    "recruitmentCount": 14,
    "field": "natural3"
  },
  {
    "key": "na-chemical-bio",
    "department": "화공생물공학과",
    "group": "나",
    "recruitmentCount": 26,
    "field": "natural3"
  },
  {
    "key": "na-computer-ai",
    "department": "컴퓨터·AI학부",
    "group": "나",
    "recruitmentCount": 73,
    "field": "natural3"
  },
  {
    "key": "na-computer-ai-humanities",
    "department": "컴퓨터·AI학부(인문)",
    "group": "나",
    "recruitmentCount": 7,
    "field": "humanities"
  },
  {
    "key": "na-system-semiconductor",
    "department": "시스템반도체학부",
    "group": "나",
    "recruitmentCount": 23,
    "field": "natural3"
  },
  {
    "key": "na-intelligent-network",
    "department": "지능형네트워크융합학과",
    "group": "나",
    "recruitmentCount": 8,
    "field": "natural3"
  },
  {
    "key": "na-sculpture",
    "department": "조소전공",
    "group": "나",
    "recruitmentCount": 15,
    "field": "practical-sculpture"
  },
  {
    "key": "na-pharmacy",
    "department": "약학과",
    "group": "나",
    "recruitmentCount": 9,
    "field": "natural3"
  },
  {
    "key": "da-business",
    "department": "경영대학(광역화 모집단위)",
    "group": "다",
    "recruitmentCount": 99,
    "field": "humanities"
  },
  {
    "key": "da-biosystems",
    "department": "바이오시스템대학(광역화 모집단위)",
    "group": "다",
    "recruitmentCount": 24,
    "field": "natural3"
  },
  {
    "key": "da-education",
    "department": "교육학과",
    "group": "다",
    "recruitmentCount": 11,
    "field": "humanities"
  },
  {
    "key": "da-korean-education",
    "department": "국어교육과",
    "group": "다",
    "recruitmentCount": 12,
    "field": "humanities"
  },
  {
    "key": "da-history-education",
    "department": "역사교육과",
    "group": "다",
    "recruitmentCount": 11,
    "field": "humanities"
  },
  {
    "key": "da-geography-education",
    "department": "지리교육과",
    "group": "다",
    "recruitmentCount": 11,
    "field": "humanities"
  },
  {
    "key": "da-math-education",
    "department": "수학교육과",
    "group": "다",
    "recruitmentCount": 11,
    "field": "natural3"
  },
  {
    "key": "da-home-education",
    "department": "가정교육과",
    "group": "다",
    "recruitmentCount": 11,
    "field": "humanities"
  },
  {
    "key": "da-open-humanities",
    "department": "열린전공학부(인문)",
    "group": "다",
    "recruitmentCount": 61,
    "field": "humanities"
  },
  {
    "key": "da-open-natural",
    "department": "열린전공학부(자연)",
    "group": "다",
    "recruitmentCount": 58,
    "field": "natural3"
  }
] as const;

function donggukWeights(field: string) {
  if (field === "humanities") return { koreanWeight:35, mathWeight:25, englishWeight:15, inquiryWeight:25 };
  if (field === "practical-sport") return { koreanWeight:35, mathWeight:25, englishWeight:15, inquiryWeight:25 };
  if (field === "practical-sculpture") return { koreanWeight:45, mathWeight:0, englishWeight:15, inquiryWeight:40 };
  return { koreanWeight:25, mathWeight:35, englishWeight:15, inquiryWeight:25 };
}

export const donggukAdmissions2027: RegularAdmission[] = DONGGUK_ROWS.map((row) => {
  const practical = row.field.startsWith("practical");
  const natural = row.field.startsWith("natural");
  const mathBonus = row.field === "natural1" || row.field === "natural3";
  const scienceBonus = row.field === "natural2" || row.field === "natural3";
  const weights = donggukWeights(row.field);
  const csatShare = practical ? 60 : row.group === "다" ? 90 : 100;
  return {
    id: `dongguk-seoul-${row.key}`,
    universityId: "dongguk-seoul",
    universityName: "동국대학교",
    region: "서울",
    department: row.department,
    majorGroup: row.field === "practical-sport" ? "예체능·체육"
      : row.field === "practical-sculpture" ? "예체능"
      : row.field === "natural1" || row.field === "natural2" || row.field === "natural3" ? "자연·공학"
      : row.department === "경영대학" ? "경영·경제"
      : "인문·사회",
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
    mathChoiceBonusRequired: mathBonus,
    mathChoiceBonusRate: mathBonus ? { "미적분":0.03, "기하":0.03, "확률과통계":0 } : undefined,
    inquiryTypeBonusRequired: scienceBonus,
    inquiryTypeBonusRate: scienceBonus ? { "사탐":0, "과탐":0.03, "직탐":0 } : undefined,
    englishGradeTable: DONGGUK_ENGLISH,
    englishMaximumScore: 200,
    koreanHistoryRequired: true,
    koreanHistoryGradePoints: DONGGUK_HISTORY,
    studentRecordWeight: row.group === "다" ? 10 : undefined,
    curriculumEvaluationRequired: row.group === "다" ? true : undefined,
    practicalEvaluationRequired: practical,
    practicalEvaluationNote: practical ? "실기평가 점수 미입력(수능 60%, 실기 40%)" : undefined,
    schoolViolencePenaltyRequired: true,
    schoolViolencePenaltyNote: "일반전형: 학교폭력 1~3호 0점, 4호 100점, 5호 200점, 6호 300점, 7호 400점 감점, 8~9호 불합격(사정 제외). 조치사항 입력 전 최종 판정 보류.",
    calculationVerified: false,
    sourceUrl: DONGGUK_SOURCE,
    verifiedAt: "2026-11-25",
    note: row.group === "다"
      ? `2027 일반전형 다군. 수능 ${csatShare}% + 학생부평가 10%. ${natural ? "자연계열" : "인문계열"} 수능 영역별 반영비율 적용. 학생부 정성평가 점수 미입력 및 탐구 변환표 미공개로 판정 보류.`
      : practical
        ? `2027 일반전형 ${row.group}군. 수능 60% + 실기 40%. 대학별 실기점수 미입력 및 탐구 변환표 미공개로 판정 보류.`
        : natural
          ? `2027 일반전형 ${row.group}군 자연계열. 국어25·수학35·영어15·탐구25. ${row.field === "natural1" ? "수학 미적분·기하 표준점수 3% 가산" : row.field === "natural2" ? "과탐 과목별 변환표준점수 3% 가산" : "수학 미적분·기하 3% 및 과탐 과목별 3% 가산"}. 탐구 변환표 미공개로 최종 환산 보류.`
          : "2027 일반전형 가·나군 인문계열. 국어35·수학25·영어15·탐구25. 탐구 변환표 미공개로 최종 환산 보류."
  };
});

if (donggukAdmissions2027.length !== 55 ||
    donggukAdmissions2027.reduce((sum,row)=>sum+(row.recruitmentCount ?? 0),0) !== 1166) {
  throw new Error("동국대 2027 일반전형 모집단위·인원 검증 실패");
}
