import type { RegularAdmission } from "./types";

const HANYANG_SOURCE = "https://go.hanyang.ac.kr/file/pdfDown.do?file_no=521&menu=mojib&type=pdf";
const HANYANG_ENGLISH_NATURAL = { 1: 100, 2: 98, 3: 94, 4: 88, 5: 80, 6: 70, 7: 58, 8: 44, 9: 28 } as const;
const HANYANG_ENGLISH_HUMANITIES = { 1: 100, 2: 96, 3: 90, 4: 82, 5: 72, 6: 60, 7: 46, 8: 30, 9: 12 } as const;
const HANYANG_HISTORY_NATURAL = { 1: 0, 2: 0, 3: 0, 4: 0, 5: -0.1, 6: -0.2, 7: -0.3, 8: -0.4, 9: -0.5 } as const;
const HANYANG_HISTORY_HUMANITIES = { 1: 0, 2: 0, 3: 0, 4: -0.1, 5: -0.2, 6: -0.3, 7: -0.4, 8: -0.5, 9: -0.6 } as const;
const HANYANG_HISTORY_ARTS = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: -0.1 } as const;
const HANYANG_SCHOOL_VIOLENCE = "학교폭력 조치사항: 1호 30점, 2·3호 100점, 4·5호 200점, 6·7호 300점 감점. 8·9호 부적격 처리. 지원자별 조치사항 입력 전 최종 판정 보류.";

// 2027 서울캠퍼스 정시 일반전형 모집단위별 인원. 특별전형은 포함하지 않는다.
const HANYANG_ROWS = [
  { id: "architecture-five", department: "건축학부(5년제)", majorGroup: "자연·공학", recruitmentCount: 18, kind: "natural", group: "가" },
  { id: "architecture-engineering", department: "건축공학부", majorGroup: "자연·공학", recruitmentCount: 17, kind: "natural", group: "가" },
  { id: "civil-environment", department: "건설환경공학과", majorGroup: "자연·공학", recruitmentCount: 22, kind: "natural", group: "가" },
  { id: "urban-engineering", department: "도시공학과", majorGroup: "자연·공학", recruitmentCount: 16, kind: "natural", group: "가" },
  { id: "resource-environment", department: "자원환경공학과", majorGroup: "자연·공학", recruitmentCount: 13, kind: "natural", group: "가" },
  { id: "biomedical-engineering", department: "전기·생체공학부(바이오메디컬공학전공)", majorGroup: "자연·공학", recruitmentCount: 12, kind: "natural", group: "가" },
  { id: "organic-nano", department: "유기나노공학과", majorGroup: "자연·공학", recruitmentCount: 14, kind: "natural", group: "가" },
  { id: "mechanical", department: "기계공학부", majorGroup: "자연·공학", recruitmentCount: 66, kind: "natural", group: "가" },
  { id: "nuclear", department: "원자력공학과", majorGroup: "자연·공학", recruitmentCount: 17, kind: "natural", group: "가" },
  { id: "industrial", department: "산업공학과", majorGroup: "자연·공학", recruitmentCount: 20, kind: "natural", group: "가" },
  { id: "nursing", department: "간호학과", majorGroup: "보건", recruitmentCount: 13, kind: "natural", group: "가" },
  { id: "korean-language", department: "국어국문학과", majorGroup: "인문·어문", recruitmentCount: 13, kind: "humanities", group: "가" },
  { id: "chinese-language", department: "중어중문학과", majorGroup: "인문·어문", recruitmentCount: 19, kind: "humanities", group: "가" },
  { id: "english-language", department: "영어영문학과", majorGroup: "인문·어문", recruitmentCount: 24, kind: "humanities", group: "가" },
  { id: "history", department: "사학과", majorGroup: "인문·어문", recruitmentCount: 9, kind: "humanities", group: "가" },
  { id: "philosophy", department: "철학과", majorGroup: "인문·어문", recruitmentCount: 7, kind: "humanities", group: "가" },
  { id: "political-science", department: "정치외교학과", majorGroup: "인문·사회", recruitmentCount: 14, kind: "humanities", group: "가" },
  { id: "sociology", department: "사회학과", majorGroup: "인문·사회", recruitmentCount: 13, kind: "humanities", group: "가" },
  { id: "physics", department: "물리학과", majorGroup: "자연·공학", recruitmentCount: 15, kind: "natural", group: "가" },
  { id: "chemistry", department: "화학과", majorGroup: "자연·공학", recruitmentCount: 19, kind: "natural", group: "가" },
  { id: "economics-finance", department: "경제금융학부", majorGroup: "경영·경제", recruitmentCount: 52, kind: "business", group: "가" },
  { id: "education", department: "교육학과", majorGroup: "교육", recruitmentCount: 9, kind: "humanities", group: "가" },
  { id: "educational-technology", department: "교육공학과", majorGroup: "교육", recruitmentCount: 9, kind: "humanities", group: "가" },
  { id: "korean-education", department: "국어교육과", majorGroup: "교육", recruitmentCount: 10, kind: "humanities", group: "가" },
  { id: "english-education", department: "영어교육과", majorGroup: "교육", recruitmentCount: 11, kind: "humanities", group: "가" },
  { id: "math-education", department: "수학교육과", majorGroup: "교육", recruitmentCount: 8, kind: "natural", group: "가" },
  { id: "clothing", department: "의류학과", majorGroup: "생활과학", recruitmentCount: 8, kind: "business", group: "가" },
  { id: "food-nutrition", department: "식품영양학과", majorGroup: "생활과학", recruitmentCount: 9, kind: "natural", group: "가" },
  { id: "interior-architecture-design", department: "실내건축디자인학과", majorGroup: "디자인", recruitmentCount: 9, kind: "business", group: "가" },
  { id: "sports-management", department: "스포츠산업과학부(스포츠매니지먼트전공)", majorGroup: "체능", recruitmentCount: 17, kind: "sports-management", group: "가" },
  { id: "film", department: "연극영화학과(영화)", majorGroup: "예술·인문", recruitmentCount: 10, kind: "humanities", group: "가" },
  { id: "drama-directing", department: "연극영화학과(연출및스탭)", majorGroup: "예술·체능", recruitmentCount: 6, kind: "drama", group: "가" },
  { id: "acting", department: "연극영화학과(연기)", majorGroup: "예술·체능", recruitmentCount: 13, kind: "drama", group: "가" },
  { id: "international-studies", department: "국제학부", majorGroup: "국제", recruitmentCount: 9, kind: "humanities", group: "가" },
  { id: "vocal", department: "성악과", majorGroup: "음악", recruitmentCount: 26, kind: "music-vocal", group: "가" },
  { id: "composition", department: "작곡과", majorGroup: "음악", recruitmentCount: 14, kind: "music-composition", group: "가" },
  { id: "piano", department: "피아노과", majorGroup: "음악", recruitmentCount: 19, kind: "music-piano", group: "가" },
  { id: "orchestral", department: "관현악과", majorGroup: "음악", recruitmentCount: 28, kind: "music-orchestra", group: "가" },
  { id: "electronic-engineering", department: "융합전자공학부", majorGroup: "자연·공학", recruitmentCount: 80, kind: "natural", group: "나" },
  { id: "computer-software", department: "컴퓨터소프트웨어학부", majorGroup: "자연·공학", recruitmentCount: 66, kind: "natural", group: "나" },
  { id: "information-systems", department: "정보시스템학과(상경)", majorGroup: "경영·경제", recruitmentCount: 18, kind: "business", group: "나" },
  { id: "electrical-engineering", department: "전기·생체공학부(전기공학전공)", majorGroup: "자연·공학", recruitmentCount: 27, kind: "natural", group: "나" },
  { id: "advanced-materials", department: "신소재공학부", majorGroup: "자연·공학", recruitmentCount: 41, kind: "natural", group: "나" },
  { id: "chemical-engineering", department: "화학공학과", majorGroup: "자연·공학", recruitmentCount: 24, kind: "natural", group: "나" },
  { id: "biotechnology", department: "생명공학과", majorGroup: "자연·공학", recruitmentCount: 11, kind: "natural", group: "나" },
  { id: "energy-engineering", department: "에너지공학과", majorGroup: "자연·공학", recruitmentCount: 14, kind: "natural", group: "나" },
  { id: "future-automotive", department: "미래자동차공학과", majorGroup: "자연·공학", recruitmentCount: 30, kind: "natural", group: "나" },
  { id: "data-science", department: "데이터사이언스학부", majorGroup: "자연·공학", recruitmentCount: 34, kind: "natural", group: "나" },
  { id: "semiconductor", department: "반도체공학과", majorGroup: "자연·공학", recruitmentCount: 8, kind: "contract-natural", group: "나" },
  { id: "medicine", department: "의예과", majorGroup: "의약학", recruitmentCount: 44, kind: "natural", group: "나" },
  { id: "media-communication", department: "미디어커뮤니케이션학과", majorGroup: "인문·사회", recruitmentCount: 17, kind: "humanities", group: "나" },
  { id: "tourism", department: "관광학부", majorGroup: "경영·경제", recruitmentCount: 14, kind: "humanities", group: "나" },
  { id: "mathematics", department: "수학과", majorGroup: "자연·공학", recruitmentCount: 15, kind: "natural", group: "나" },
  { id: "life-science", department: "생명과학과", majorGroup: "자연·공학", recruitmentCount: 17, kind: "natural", group: "나" },
  { id: "policy", department: "정책학과", majorGroup: "인문·사회", recruitmentCount: 33, kind: "humanities", group: "나" },
  { id: "public-administration", department: "행정학과", majorGroup: "인문·사회", recruitmentCount: 17, kind: "humanities", group: "나" },
  { id: "business", department: "경영학부", majorGroup: "경영·경제", recruitmentCount: 71, kind: "business", group: "나" },
  { id: "finance-business", department: "파이낸스경영학과", majorGroup: "경영·경제", recruitmentCount: 20, kind: "business", group: "나" },
  { id: "sports-science", department: "스포츠산업과학부(스포츠사이언스전공)", majorGroup: "체능", recruitmentCount: 18, kind: "sports-science", group: "나" },
  { id: "intercollege", department: "한양인터칼리지학부", majorGroup: "자율전공", recruitmentCount: 50, kind: "intercollege", group: "다" },
] as const;

export const hanyangSeoulAdmissions2027: RegularAdmission[] = HANYANG_ROWS.map((row) => {
  const natural = row.kind === "natural" || row.kind === "contract-natural";
  const business = row.kind === "business" || row.kind === "intercollege";
  const music = row.kind.startsWith("music-");
  const drama = row.kind === "drama";
  const sportsManagement = row.kind === "sports-management";
  const sportsScience = row.kind === "sports-science";
  const practical = music || drama || sportsScience;
  const contract = row.kind === "contract-natural";
  const standard = !practical;
  const weights = natural
    ? { koreanWeight: 25, mathWeight: 40, englishWeight: 10, inquiryWeight: 25 }
    : business
      ? { koreanWeight: 35, mathWeight: 35, englishWeight: 10, inquiryWeight: 20 }
      : sportsManagement || sportsScience
        ? { koreanWeight: 40, mathWeight: 30, englishWeight: 10, inquiryWeight: 20 }
        : music
          ? { koreanWeight: 80, mathWeight: 0, englishWeight: 20, inquiryWeight: 0 }
          : drama
            ? { koreanWeight: 50, mathWeight: 0, englishWeight: 30, inquiryWeight: 20 }
            : { koreanWeight: 35, mathWeight: 30, englishWeight: 10, inquiryWeight: 25 };
  const englishTable = natural ? HANYANG_ENGLISH_NATURAL : HANYANG_ENGLISH_HUMANITIES;
  const historyTable = natural ? HANYANG_HISTORY_NATURAL : practical ? HANYANG_HISTORY_ARTS : HANYANG_HISTORY_HUMANITIES;
  const inquirySubjects = sportsManagement || sportsScience || drama ? 1 : music ? 1 : 2;
  const inquiryRequired = weights.inquiryWeight > 0;
  const finalMultiplier = music
    ? (row.kind === "music-composition" || row.kind === "music-piano" ? 0.3 : 0.2)
    : drama ? 0.55 : sportsScience ? 0.7 : 900;
  const practicalNote = row.kind === "music-vocal"
    ? "성악과: 1단계 실기 100%(3배수), 2단계 실기 80%+수능 20%. 1단계 선발 및 2단계 실기점수 미입력."
    : row.kind === "music-composition"
      ? "작곡과: 실기 70%+수능 30%. 실기점수 미입력."
      : row.kind === "music-piano"
        ? "피아노과: 1단계 실기 100%(2배수), 2단계 실기 70%+수능 30%. 1단계 선발 및 2단계 실기점수 미입력."
        : row.kind === "music-orchestra"
          ? "관현악과: 실기 80%+수능 20%. 실기점수 미입력."
          : drama
            ? "연극영화학과(연출및스탭·연기): 수능 55%+실기 45%. 실기점수 미입력."
            : sportsScience
              ? "스포츠산업과학부(스포츠사이언스전공): 수능 70%+실기 30%. 실기점수 미입력."
              : undefined;
  return {
    id: `hanyang-seoul-${row.group}-${row.id}`,
    universityId: "hanyang-seoul",
    universityName: "한양대학교",
    region: "서울",
    department: row.department,
    majorGroup: row.majorGroup,
    group: row.group,
    recruitmentCount: row.recruitmentCount,
    scoreMetric: "표준점수",
    subjectMetrics: { korean: "표준점수", math: "표준점수", inquiry: "표준점수" },
    ...weights,
    inquirySubjects,
    inquiryAggregation: inquirySubjects === 1 ? "best" : "sum",
    calculationMode: practical ? "weighted-average" : "normalized-standard-sum",
    finalScoreMultiplier: finalMultiplier,
    gradeAdjustmentsAfterFinalMultiplier: true,
    inquiryConversionRequired: inquiryRequired,
    englishGradeTable: englishTable,
    koreanHistoryRequired: true,
    koreanHistoryGradePoints: historyTable,
    studentRecordWeight: standard ? 10 : 0,
    curriculumEvaluationRequired: standard,
    schoolViolencePenaltyRequired: true,
    schoolViolencePenaltyNote: HANYANG_SCHOOL_VIOLENCE,
    practicalEvaluationRequired: practical,
    practicalEvaluationNote: practicalNote,
    additionalEligibilityRequired: contract,
    additionalEligibilityNote: contract ? "반도체공학과는 SK하이닉스 채용조건형 계약학과(정원 외 8명). 계약학과 지원자격·장학생 선발 및 취업연계 조건 별도 확인 필요." : undefined,
    calculationVerified: false,
    benchmarkComparable: false,
    note: `2027 한양대 서울캠퍼스 정시 일반전형 ${row.group}군 ${row.recruitmentCount}명. ${natural ? "자연계 국25·수40·영10·탐25." : business ? "상경·의류·실내건축디자인·인터칼리지 국35·수35·영10·탐20." : sportsManagement || sportsScience ? "스포츠산업과학부 국40·수30·영10·탐20, 탐구 1과목." : music ? "음악대학 국어80·영어20, 실기 중심 단계별 선발." : drama ? "연극영화학과 연출·연기 국50·영30·탐20, 탐구 1과목." : "인문계 국35·수30·영10·탐25."} 일반 수능전형은 수능 90%+학생부종합평가 10%, 예체능 해당 모집단위는 모집요강의 실기 반영비율 적용. 영어·한국사 등급 반영, 탐구 변환표준점수 및 과목별 가산점 미공개, 학생부·실기·학교폭력 자료 미입력으로 최종 환산 보류.`,
    sourceUrl: HANYANG_SOURCE,
    verifiedAt: "2026-11-25",
  };
});

if (hanyangSeoulAdmissions2027.length !== 60 || hanyangSeoulAdmissions2027.reduce((sum, row) => sum + (row.recruitmentCount ?? 0), 0) !== 1297 ||
    hanyangSeoulAdmissions2027.filter((row) => row.group === "가").reduce((sum, row) => sum + (row.recruitmentCount ?? 0), 0) !== 628 ||
    hanyangSeoulAdmissions2027.filter((row) => row.group === "나").reduce((sum, row) => sum + (row.recruitmentCount ?? 0), 0) !== 619 ||
    hanyangSeoulAdmissions2027.filter((row) => row.group === "다").reduce((sum, row) => sum + (row.recruitmentCount ?? 0), 0) !== 50) {
  throw new Error("한양대 서울 2027 정시 일반전형 모집단위·인원 검증 실패");
}
