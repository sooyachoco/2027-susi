import type { RegularAdmission } from "./types";

const UOS_SOURCE = "https://file.uos.ac.kr/upload/admission/2027%ED%95%99%EB%85%84%EB%8F%84%20%EC%A0%95%EC%8B%9C%EB%AA%A8%EC%A7%91%20%EC%8B%A0%EC%9E%85%EC%83%9D%20%EB%AA%A8%EC%A7%91%EC%9A%94%EA%B0%95_%EC%B5%9C%EC%A2%85.pdf";
const UOS_ENGLISH_I = { 1: 100, 2: 97.3333, 3: 90, 4: 80, 5: 63.3333, 6: 50, 7: 30, 8: 10, 9: 0 } as const;
const UOS_ENGLISH_II = { 1: 100, 2: 97, 3: 92, 4: 80, 5: 65, 6: 50, 7: 30, 8: 10, 9: 0 } as const;
const UOS_ENGLISH_NATURAL = { 1: 100, 2: 97, 3: 90, 4: 80, 5: 65, 6: 50, 7: 30, 8: 10, 9: 0 } as const;
const UOS_ENGLISH_DESIGN = { 1: 100, 2: 97.5, 3: 90, 4: 80, 5: 63.3333, 6: 50, 7: 30, 8: 10, 9: 0 } as const;
const UOS_ENGLISH_SPORTS = { 1: 100, 2: 96.8, 3: 89.6, 4: 80, 5: 63.2, 6: 49.6, 7: 29.6, 8: 9.6, 9: 0 } as const;
const UOS_HISTORY = { 1: 0, 2: 0, 3: 0, 4: 0, 5: -2, 6: -4, 7: -6, 8: -8, 9: -10 } as const;
const UOS_SCHOOL_VIOLENCE = "학교폭력 조치사항 감점: 1~3호 1점, 4~5호 10점, 6~7호 20점, 8~9호 30점. 복수 조치 중복 감점, 최대 30점. 지원자별 조치사항 입력 전 최종 판정 보류.";

// 2027 서울시립대 정시 일반전형. 가·나군 수능위주와 예체능 일반전형만 수록한다.
const UOS_ROWS = [
  { id: "city-administration", department: "도시행정학과", majorGroup: "경영·경제", recruitmentCount: 14, kind: "humanities1", group: "가" },
  { id: "free-major-humanities", department: "자유전공학부(인문)", majorGroup: "자율전공", recruitmentCount: 53, kind: "humanities1", group: "가" },
  { id: "free-major-natural", department: "자유전공학부(자연)", majorGroup: "자율전공", recruitmentCount: 53, kind: "natural", group: "가" },
  { id: "artificial-intelligence", department: "인공지능학과", majorGroup: "자연·공학", recruitmentCount: 22, kind: "natural", group: "가" },
  { id: "bio-health", department: "첨단융합학부(융합바이오헬스전공)", majorGroup: "자연·공학", recruitmentCount: 2, kind: "natural", group: "가" },
  { id: "intelligent-semiconductor", department: "첨단융합학부(지능형반도체전공)", majorGroup: "자연·공학", recruitmentCount: 10, kind: "natural", group: "가" },
  { id: "economics", department: "경제학부", majorGroup: "경영·경제", recruitmentCount: 32, kind: "humanities1", group: "나" },
  { id: "social-welfare", department: "사회복지학과", majorGroup: "인문·사회", recruitmentCount: 13, kind: "humanities1", group: "나" },
  { id: "taxation", department: "세무학과", majorGroup: "경영·경제", recruitmentCount: 38, kind: "humanities1", group: "나" },
  { id: "business", department: "경영학부", majorGroup: "경영·경제", recruitmentCount: 67, kind: "humanities1", group: "나" },
  { id: "administration", department: "행정학과", majorGroup: "인문·사회", recruitmentCount: 28, kind: "humanities2", group: "나" },
  { id: "international-relations", department: "국제관계학과", majorGroup: "인문·사회", recruitmentCount: 13, kind: "humanities2", group: "나" },
  { id: "english-language", department: "영어영문학과", majorGroup: "인문·어문", recruitmentCount: 8, kind: "humanities2", group: "나" },
  { id: "korean-language", department: "국어국문학과", majorGroup: "인문·어문", recruitmentCount: 8, kind: "humanities2", group: "나" },
  { id: "korean-history", department: "국사학과", majorGroup: "인문·어문", recruitmentCount: 8, kind: "humanities2", group: "나" },
  { id: "philosophy", department: "철학과", majorGroup: "인문·어문", recruitmentCount: 9, kind: "humanities2", group: "나" },
  { id: "chinese-culture", department: "중국어문화학과", majorGroup: "인문·어문", recruitmentCount: 7, kind: "humanities2", group: "나" },
  { id: "urban-sociology", department: "도시사회학과", majorGroup: "인문·사회", recruitmentCount: 14, kind: "humanities2", group: "나" },
  { id: "electronic-electrical-computer", department: "전자전기컴퓨터공학부", majorGroup: "자연·공학", recruitmentCount: 54, kind: "natural", group: "나" },
  { id: "chemical-engineering", department: "화학공학과", majorGroup: "자연·공학", recruitmentCount: 15, kind: "natural", group: "나" },
  { id: "mechanical-information", department: "기계정보공학과", majorGroup: "자연·공학", recruitmentCount: 12, kind: "natural", group: "나" },
  { id: "advanced-materials", department: "신소재공학과", majorGroup: "자연·공학", recruitmentCount: 22, kind: "natural", group: "나" },
  { id: "civil-engineering", department: "토목공학과", majorGroup: "자연·공학", recruitmentCount: 12, kind: "natural", group: "나" },
  { id: "mathematics", department: "수학과", majorGroup: "자연·공학", recruitmentCount: 11, kind: "natural", group: "나" },
  { id: "statistics", department: "통계학과", majorGroup: "자연·공학", recruitmentCount: 8, kind: "natural", group: "나" },
  { id: "physics", department: "물리학과", majorGroup: "자연·공학", recruitmentCount: 8, kind: "natural", group: "나" },
  { id: "life-science", department: "생명과학과", majorGroup: "자연·공학", recruitmentCount: 10, kind: "natural", group: "나" },
  { id: "environment-horticulture", department: "환경원예학과", majorGroup: "자연·공학", recruitmentCount: 9, kind: "natural", group: "나" },
  { id: "convergence-applied-chemistry", department: "융합응용화학과", majorGroup: "자연·공학", recruitmentCount: 8, kind: "natural", group: "나" },
  { id: "architecture-engineering", department: "건축학부(건축공학전공)", majorGroup: "자연·공학", recruitmentCount: 12, kind: "natural", group: "나" },
  { id: "architecture", department: "건축학부(건축학전공)", majorGroup: "자연·공학", recruitmentCount: 8, kind: "natural", group: "나" },
  { id: "urban-engineering", department: "도시공학과", majorGroup: "자연·공학", recruitmentCount: 9, kind: "natural", group: "나" },
  { id: "transportation-engineering", department: "교통공학과", majorGroup: "자연·공학", recruitmentCount: 5, kind: "natural", group: "나" },
  { id: "landscape-architecture", department: "조경학과", majorGroup: "자연·공학", recruitmentCount: 8, kind: "natural", group: "나" },
  { id: "environmental-engineering", department: "환경공학부", majorGroup: "자연·공학", recruitmentCount: 27, kind: "natural", group: "나" },
  { id: "geospatial-information", department: "공간정보공학과", majorGroup: "자연·공학", recruitmentCount: 8, kind: "natural", group: "나" },
  { id: "computer-science", department: "컴퓨터과학부", majorGroup: "컴퓨터·소프트웨어", recruitmentCount: 20, kind: "natural", group: "나" },
  { id: "advanced-ai", department: "첨단융합학부(첨단인공지능전공)", majorGroup: "자연·공학", recruitmentCount: 3, kind: "natural", group: "나" },
  { id: "sports-science", department: "스포츠과학과", majorGroup: "체능", recruitmentCount: 30, kind: "sports", group: "나" },
  { id: "visual-design", department: "디자인학과(시각디자인전공)", majorGroup: "예체능·디자인", recruitmentCount: 15, kind: "design", group: "가" },
  { id: "industrial-design", department: "디자인학과(산업디자인전공)", majorGroup: "예체능·디자인", recruitmentCount: 14, kind: "design", group: "가" },
  { id: "sculpture", department: "조각학과", majorGroup: "예체능·조각", recruitmentCount: 36, kind: "sculpture", group: "가" },
  { id: "music-composition", department: "음악학과(작곡전공)", majorGroup: "음악", recruitmentCount: 4, kind: "music", group: "나" },
  { id: "music-piano", department: "음악학과(피아노전공)", majorGroup: "음악", recruitmentCount: 8, kind: "music", group: "나" },
  { id: "music-orchestral", department: "음악학과(관현악전공)", majorGroup: "음악", recruitmentCount: 10, kind: "music", group: "나" },
] as const;

export const uosAdmissions2027: RegularAdmission[] = UOS_ROWS.map((row) => {
  const typeI = row.kind === "humanities1";
  const typeII = row.kind === "humanities2";
  const natural = row.kind === "natural";
  const sports = row.kind === "sports";
  const design = row.kind === "design";
  const sculpture = row.kind === "sculpture";
  const music = row.kind === "music";
  const practical = sports || design || sculpture || music;
  const inquiryRequired = typeI || typeII || natural || design || sculpture;
  const weights = typeI
    ? { koreanWeight: 35, mathWeight: 35, englishWeight: 15, inquiryWeight: 15 }
    : typeII
      ? { koreanWeight: 35, mathWeight: 25, englishWeight: 20, inquiryWeight: 20 }
      : natural
        ? { koreanWeight: 30, mathWeight: 40, englishWeight: 10, inquiryWeight: 20 }
        : sports
          ? { koreanWeight: 40, mathWeight: 35, englishWeight: 25, inquiryWeight: 0 }
          : design
            ? { koreanWeight: 50, mathWeight: 0, englishWeight: 30, inquiryWeight: 20 }
            : sculpture
              ? { koreanWeight: 40, mathWeight: 0, englishWeight: 40, inquiryWeight: 20 }
              : { koreanWeight: 50, mathWeight: 0, englishWeight: 50, inquiryWeight: 0 };
  const englishTable = typeI || music ? UOS_ENGLISH_I : typeII ? UOS_ENGLISH_II : natural ? UOS_ENGLISH_NATURAL : sports ? UOS_ENGLISH_SPORTS : UOS_ENGLISH_DESIGN;
  const inquiryBonus = typeI
    ? { 사탐: 0.03, 과탐: 0, 직탐: 0 }
    : natural
      ? { 사탐: 0, 과탐: 0.03, 직탐: 0 }
      : undefined;
  const multiplier = sports ? 500 : design ? 400 : sculpture || music ? 300 : 1000;
  const interview = design || sculpture;
  const studentRecordWeight = sports ? 20 : music ? 10 : 0;
  const practicalNote = sports
    ? "스포츠과학과: 1단계 수능 100%(4배수), 2단계 수능 50%+학생부 20%+실기 30%. 실기·학생부 점수 미입력."
    : design
      ? "디자인학과: 1단계 수능 100%(6배수), 2단계 수능 40%+실기 50%+면접 10%. 실기·면접 점수 미입력."
      : sculpture
        ? "조각학과: 1단계 수능 100%(4배수), 2단계 수능 30%+실기 50%+면접 20%. 실기·면접 점수 미입력."
        : music
          ? "음악학과: 수능 30%+실기 60%+학생부 10%. 세부전공 실기 및 학생부 점수 미입력."
          : undefined;
  return {
    id: `uos-seoul-${row.group}-${row.id}`,
    universityId: "uos-seoul",
    universityName: "서울시립대학교",
    region: "서울",
    department: row.department,
    majorGroup: row.majorGroup,
    group: row.group,
    recruitmentCount: row.recruitmentCount,
    scoreMetric: "표준점수",
    subjectMetrics: { korean: "표준점수", math: "표준점수", inquiry: design || sculpture ? "백분위" : "표준점수" },
    ...weights,
    inquirySubjects: design || sculpture || music || sports ? (design || sculpture ? 2 : 1) : 2,
    inquiryAggregation: design || sculpture ? "sum" : "sum",
    calculationMode: "normalized-standard-sum",
    finalScoreMultiplier: multiplier,
    gradeAdjustmentsAfterFinalMultiplier: true,
    inquiryConversionRequired: inquiryRequired && !design && !sculpture,
    inquiryTypeBonusRequired: Boolean(inquiryBonus),
    inquiryTypeBonusRate: inquiryBonus,
    inquiryBonusRequiresSameType: typeI ? "사탐" : natural ? "과탐" : undefined,
    englishGradeTable: englishTable,
    koreanHistoryRequired: true,
    koreanHistoryGradePoints: UOS_HISTORY,
    studentRecordWeight,
    curriculumEvaluationRequired: studentRecordWeight > 0,
    schoolViolencePenaltyRequired: true,
    schoolViolencePenaltyNote: UOS_SCHOOL_VIOLENCE,
    practicalEvaluationRequired: practical,
    practicalEvaluationNote: practicalNote,
    additionalEligibilityRequired: interview,
    additionalEligibilityNote: design ? "디자인학과 2단계 면접 10점 필수. 면접 미응시 시 불합격." : sculpture ? "조각학과 2단계 면접 20점 필수. 면접 미응시 시 불합격." : undefined,
    calculationVerified: false,
    benchmarkComparable: false,
    note: `2027 서울시립대 정시 일반전형 ${row.group}군 ${row.recruitmentCount}명. ${typeI ? "인문계열Ⅰ 국35·수35·영15·탐15, 사탐 2과목 모두 선택 시 탐구 산출점수 3% 가산." : typeII ? "인문계열Ⅱ 국35·수25·영20·탐20." : natural ? "자연계열 국30·수40·영10·탐20, 과탐 2과목 모두 선택 시 탐구 산출점수 3% 가산." : sports ? "스포츠과학과 수능 50%+학생부20%+실기30%." : design ? "디자인학과 수능40%+실기50%+면접10%." : sculpture ? "조각학과 수능30%+실기50%+면접20%." : "음악학과 수능30%+실기60%+학생부10%."} 국어·수학 표준점수는 당해 연도 최고점 대비 비율, 인문·자연 탐구 변환표준점수는 2026년 12월 발표 예정. 영어 등급 및 한국사 감점 반영. 학교폭력·학생부·실기·면접 자료 미입력으로 최종 판정 보류.`,
    sourceUrl: UOS_SOURCE,
    verifiedAt: "2026-11-25",
  };
});

if (uosAdmissions2027.length !== 45 || uosAdmissions2027.reduce((sum, row) => sum + (row.recruitmentCount ?? 0), 0) !== 785 ||
    uosAdmissions2027.filter((row) => row.group === "가").reduce((sum, row) => sum + (row.recruitmentCount ?? 0), 0) !== 219 ||
    uosAdmissions2027.filter((row) => row.group === "나").reduce((sum, row) => sum + (row.recruitmentCount ?? 0), 0) !== 566) {
  throw new Error("서울시립대 2027 정시 일반전형 모집단위·인원 검증 실패");
}
