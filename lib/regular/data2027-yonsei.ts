import type { RegularAdmission } from "./types";

const YONSEI_SOURCE = "https://admission.yonsei.ac.kr/seoul/upload/guide/20260901184445WSGU8N.PDF";
const YONSEI_ENGLISH = { 1: 100, 2: 95, 3: 87.5, 4: 75, 5: 60, 6: 40, 7: 25, 8: 12.5, 9: 5 } as const;
const YONSEI_HISTORY = { 1: 0, 2: 0, 3: 0, 4: 0, 5: -0.2, 6: -0.4, 7: -0.6, 8: -0.8, 9: -1 } as const;

// 2027 서울캠퍼스 정시 일반전형. 모집단위별 '가'군 인원만 수록하며, 신학·예능은 별도 제외한다.
const YONSEI_ROWS = [
  { id: "korean-language", department: "국어국문학과", majorGroup: "인문·어문", kind: "I", recruitmentCount: 18 },
  { id: "chinese-language", department: "중어중문학과", majorGroup: "인문·어문", kind: "I", recruitmentCount: 13 },
  { id: "english-language", department: "영어영문학과", majorGroup: "인문·어문", kind: "I", recruitmentCount: 31 },
  { id: "german-language", department: "독어독문학과", majorGroup: "인문·어문", kind: "I", recruitmentCount: 13 },
  { id: "french-language", department: "불어불문학과", majorGroup: "인문·어문", kind: "I", recruitmentCount: 12 },
  { id: "russian-language", department: "노어노문학과", majorGroup: "인문·어문", kind: "I", recruitmentCount: 13 },
  { id: "history", department: "사학과", majorGroup: "인문·어문", kind: "I", recruitmentCount: 19 },
  { id: "philosophy", department: "철학과", majorGroup: "인문·어문", kind: "I", recruitmentCount: 14 },
  { id: "library-information", department: "문헌정보학과", majorGroup: "인문·사회", kind: "I", recruitmentCount: 13 },
  { id: "psychology", department: "심리학과", majorGroup: "인문·사회", kind: "I", recruitmentCount: 12 },
  { id: "business", department: "경영학과", majorGroup: "경영·경제", kind: "I", recruitmentCount: 113 },
  { id: "political-science", department: "정치외교학과", majorGroup: "인문·사회", kind: "I", recruitmentCount: 30 },
  { id: "public-administration", department: "행정학과", majorGroup: "인문·사회", kind: "I", recruitmentCount: 29 },
  { id: "social-welfare", department: "사회복지학과", majorGroup: "인문·사회", kind: "I", recruitmentCount: 13 },
  { id: "sociology", department: "사회학과", majorGroup: "인문·사회", kind: "I", recruitmentCount: 12 },
  { id: "cultural-anthropology", department: "문화인류학과", majorGroup: "인문·사회", kind: "I", recruitmentCount: 5 },
  { id: "media-communication", department: "언론홍보영상학부", majorGroup: "인문·사회", kind: "I", recruitmentCount: 16 },
  { id: "education", department: "교육학부", majorGroup: "교육", kind: "I", recruitmentCount: 25 },
  { id: "free-major-humanities", department: "진리자유학부(인문)", majorGroup: "자율전공", kind: "I", recruitmentCount: 72 },
  { id: "mathematics", department: "수학과", majorGroup: "자연·공학", kind: "II", recruitmentCount: 13 },
  { id: "physics", department: "물리학과", majorGroup: "자연·공학", kind: "II", recruitmentCount: 11 },
  { id: "chemistry", department: "화학과", majorGroup: "자연·공학", kind: "II", recruitmentCount: 14 },
  { id: "earth-system-science", department: "지구시스템과학과", majorGroup: "자연·공학", kind: "II", recruitmentCount: 10 },
  { id: "astronomy", department: "천문우주학과", majorGroup: "자연·공학", kind: "II", recruitmentCount: 9 },
  { id: "atmospheric-science", department: "대기과학과", majorGroup: "자연·공학", kind: "II", recruitmentCount: 8 },
  { id: "chemical-bio-engineering", department: "화공생명공학부", majorGroup: "자연·공학", kind: "II", recruitmentCount: 22 },
  { id: "electrical-electronic-engineering", department: "전기전자공학부", majorGroup: "자연·공학", kind: "II", recruitmentCount: 57 },
  { id: "architecture-engineering", department: "건축공학과", majorGroup: "자연·공학", kind: "II", recruitmentCount: 19 },
  { id: "urban-engineering", department: "도시공학과", majorGroup: "자연·공학", kind: "II", recruitmentCount: 12 },
  { id: "civil-environmental", department: "사회환경시스템공학부", majorGroup: "자연·공학", kind: "II", recruitmentCount: 25 },
  { id: "mechanical-engineering", department: "기계공학부", majorGroup: "자연·공학", kind: "II", recruitmentCount: 36 },
  { id: "advanced-materials", department: "신소재공학부", majorGroup: "자연·공학", kind: "II", recruitmentCount: 29 },
  { id: "industrial-engineering", department: "산업공학과", majorGroup: "자연·공학", kind: "II", recruitmentCount: 12 },
  { id: "system-semiconductor", department: "시스템반도체공학과", majorGroup: "자연·공학", kind: "II", recruitmentCount: 25 },
  { id: "display-convergence", department: "디스플레이융합공학과", majorGroup: "자연·공학", kind: "II", recruitmentCount: 7 },
  { id: "life-science", department: "생명과학부", majorGroup: "자연·공학", kind: "II", recruitmentCount: 14 },
  { id: "systems-biology", department: "시스템생물학과", majorGroup: "자연·공학", kind: "II", recruitmentCount: 4 },
  { id: "biochemistry", department: "생화학과", majorGroup: "자연·공학", kind: "II", recruitmentCount: 3 },
  { id: "biotechnology", department: "생명공학과", majorGroup: "자연·공학", kind: "II", recruitmentCount: 15 },
  { id: "computer-science", department: "컴퓨터과학과", majorGroup: "자연·공학", kind: "II", recruitmentCount: 20 },
  { id: "artificial-intelligence", department: "인공지능학과", majorGroup: "자연·공학", kind: "II", recruitmentCount: 23 },
  { id: "ai-systems", department: "인공지능시스템학과", majorGroup: "자연·공학", kind: "II", recruitmentCount: 16 },
  { id: "it-convergence", department: "IT융합공학전공", majorGroup: "자연·공학", kind: "II", recruitmentCount: 4 },
  { id: "intelligent-semiconductor", department: "지능형반도체전공", majorGroup: "자연·공학", kind: "II", recruitmentCount: 13 },
  { id: "mobility-systems", department: "모빌리티시스템전공", majorGroup: "자연·공학", kind: "II", recruitmentCount: 10 },
  { id: "medicine", department: "의예과", majorGroup: "의약학", kind: "II_MED", recruitmentCount: 47 },
  { id: "dentistry", department: "치의예과", majorGroup: "의약학", kind: "II", recruitmentCount: 25 },
  { id: "pharmacy", department: "약학과", majorGroup: "의약학", kind: "II", recruitmentCount: 12 },
  { id: "advanced-pharmaceutical-science", department: "첨단약과학과", majorGroup: "의약학", kind: "II", recruitmentCount: 5 },
  { id: "free-major-natural", department: "진리자유학부(자연)", majorGroup: "자율전공", kind: "II", recruitmentCount: 75 },
  { id: "business-free", department: "상경계열", majorGroup: "경영·경제", kind: "III", recruitmentCount: 70 },
  { id: "economics", department: "경제학부", majorGroup: "경영·경제", kind: "III", recruitmentCount: 41 },
  { id: "applied-statistics", department: "응용통계학과", majorGroup: "경영·경제", kind: "III", recruitmentCount: 14 },
  { id: "clothing-environment", department: "의류환경학과", majorGroup: "생활과학", kind: "III", recruitmentCount: 9 },
  { id: "food-nutrition", department: "식품영양학과", majorGroup: "생활과학", kind: "III", recruitmentCount: 9 },
  { id: "interior-architecture", department: "실내건축학과", majorGroup: "생활과학", kind: "III", recruitmentCount: 9 },
  { id: "child-family", department: "아동·가족학과", majorGroup: "생활과학", kind: "III", recruitmentCount: 9 },
  { id: "integrated-design", department: "통합디자인학과", majorGroup: "디자인", kind: "III", recruitmentCount: 9 },
  { id: "nursing", department: "간호학과", majorGroup: "보건", kind: "III", recruitmentCount: 36 },
  { id: "underwood-humanities-social", department: "언더우드학부(인문·사회)", majorGroup: "국제", kind: "III_INT", recruitmentCount: 10 },
  { id: "hass", department: "융합인문사회과학부(HASS)", majorGroup: "국제", kind: "III_INT", recruitmentCount: 18 },
  { id: "ise", department: "융합과학공학부(ISE)", majorGroup: "국제", kind: "III_INT", recruitmentCount: 20 },
  { id: "physical-education", department: "체육교육학과", majorGroup: "체능", kind: "SPORT_PE", recruitmentCount: 27 },
  { id: "sports-industry", department: "스포츠응용산업학과", majorGroup: "체능", kind: "SPORT_APP", recruitmentCount: 24 },
] as const;

export const yonseiAdmissions2027: RegularAdmission[] = YONSEI_ROWS.map((row) => {
  const typeI = row.kind === "I";
  const typeII = row.kind === "II" || row.kind === "II_MED";
  const international = row.kind === "III_INT";
  const medicine = row.kind === "II_MED";
  const physicalEducation = row.kind === "SPORT_PE";
  const sportsIndustry = row.kind === "SPORT_APP";
  const sports = physicalEducation || sportsIndustry;
  const multiplier = typeI ? 950 / 800 : typeII ? (medicine ? 1 : 950 / 900) : international ? 900 / 600 : physicalEducation ? 850 / 600 : sportsIndustry ? 900 / 600 : 950 / 600;
  const weights = typeI
    ? { koreanWeight: 150, mathWeight: 100, inquiryWeight: 100 }
    : typeII
      ? { koreanWeight: 100, mathWeight: 150, inquiryWeight: 150 }
      : { koreanWeight: 100, mathWeight: 100, inquiryWeight: 50 };
  const inquiryBonus = typeI
    ? { 사탐: 0.03, 과탐: 0, 직탐: 0 }
    : typeII
      ? { 사탐: 0, 과탐: 0.03, 직탐: 0 }
      : undefined;
  const interview = medicine || international || physicalEducation;
  const contract = row.id === "system-semiconductor" || row.id === "display-convergence";
  return {
    id: `yonsei-seoul-ga-${row.id}`,
    universityId: "yonsei-seoul",
    universityName: "연세대학교",
    region: "서울",
    department: row.department,
    majorGroup: row.majorGroup,
    group: "가",
    recruitmentCount: row.recruitmentCount,
    scoreMetric: "표준점수",
    subjectMetrics: { korean: "표준점수", math: "표준점수", inquiry: "백분위" },
    ...weights,
    englishWeight: 0,
    inquirySubjects: 2,
    inquiryAggregation: "sum",
    calculationMode: "weighted-sum-with-additive-bonuses",
    subjectScoreMultiplier: 1,
    finalScoreMultiplier: multiplier,
    inquiryConversionRequired: true,
    inquiryTypeBonusRequired: Boolean(inquiryBonus),
    inquiryTypeBonusRate: inquiryBonus,
    englishGradeTable: YONSEI_ENGLISH,
    koreanHistoryRequired: true,
    koreanHistoryGradePoints: YONSEI_HISTORY,
    studentRecordWeight: sports ? 0 : 50,
    curriculumEvaluationRequired: !sports,
    schoolViolencePenaltyRequired: true,
    schoolViolencePenaltyNote: "2027 요강상 학교폭력 조치사항 감점: 1호 10점, 2호 25점, 3호 50점, 4호 100점. 조치사항별 최종 처리 확인 전 판정 보류.",
    practicalEvaluationRequired: sports,
    practicalEvaluationNote: physicalEducation ? "체육교육학과: 수능 850점+기본 운동능력 실기 100점+면접 50점. 실기점수 미입력으로 최종 환산 불가." : sportsIndustry ? "스포츠응용산업학과: 수능 900점+선택 실기능력 100점. 선택 종목 실기점수 미입력으로 최종 환산 불가." : undefined,
    additionalEligibilityRequired: interview || contract,
    additionalEligibilityNote: medicine ? "의예과: 1단계 2.5배수 선발 후 면접 50점 반영. 면접 미응시 시 불합격." : international ? "국제계열: 1단계 3배수 선발 후 영어 제시문 기반 면접 50점 반영. 면접 미응시 시 불합격." : physicalEducation ? "체육교육학과: 교원의 자질·적성·인성을 확인하는 면접 50점 필수." : contract ? "계약학과(시스템반도체공학과·디스플레이융합공학과): 산학협력 계약 및 별도 지원자격·장학·취업연계 조건 확인 필요." : undefined,
    calculationVerified: false,
    benchmarkComparable: false,
    note: `2027 서울캠퍼스 정시 일반전형 ${row.kind} 유형 가군 ${row.recruitmentCount}명. ${typeI ? "유형 I: 국어 표준점수×1.5+수학 표준점수+탐구 변환점수 합, 총점×950/800. 사탐 과목별 변환점수 3% 가산." : typeII ? `유형 II: 국어 표준점수+수학 표준점수×1.5+탐구 변환점수 합×1.5, 총점×${medicine ? "1" : "950/900"}. 과탐 과목별 변환점수 3% 가산.` : "유형 III: 국어 표준점수+수학 표준점수+탐구 변환점수 합×0.5, 총점×950/600(국제계열은 900/600)."} 영어 등급점수 및 한국사 감점 반영. 탐구 변환점수표는 2026-12-11 수능 성적 통지 후 공지 예정이며 학생부 교과·출결, 학교폭력 및 별도 면접·실기 자료가 미입력되어 최종 판정 보류.`,
    sourceUrl: YONSEI_SOURCE,
    verifiedAt: "2026-11-25",
  };
});

if (yonseiAdmissions2027.length !== 64 || yonseiAdmissions2027.reduce((sum, row) => sum + (row.recruitmentCount ?? 0), 0) !== 1373) {
  throw new Error("연세대 2027 정시 일반전형 모집단위·인원 검증 실패");
}
