import type { RegularAdmission } from "./types";

const KOREA_SOURCE = "https://oku.korea.ac.kr/oku/cms/FR_BBS_CON/BoardView.do?BBS_SEQ=1806&BOARD_SEQ=5&CONTENTS_NO=1&MENU_ID=750&SITE_NO=2";
const KOREA_ENGLISH = { 1: 0, 2: -3, 3: -6, 4: -9, 5: -12, 6: -15, 7: -18, 8: -21, 9: -24 } as const;
const KOREA_HISTORY = { 1: 0, 2: 0, 3: 0, 4: 0, 5: -0.2, 6: -0.4, 7: -0.6, 8: -0.8, 9: -2 } as const;
const KOREA_SCHOOL_VIOLENCE = "학교폭력 조치사항은 2027 정시 최종 요강의 전형별 적용 기준과 지원자별 기재 내역을 대조해야 함. 현재 세부 감점표·조치사항 입력이 없어 최종 판정 보류.";

// 2027 고려대 서울캠퍼스 정시 일반전형 가군 모집단위별 인원. 교과우수전형은 별도 전형이므로 제외한다.
const KOREA_ROWS = [
  { id: "business", department: "경영학과", majorGroup: "경영·경제", recruitmentCount: 73, kind: "humanities" },
  { id: "korean-language", department: "국어국문학과", majorGroup: "인문·어문", recruitmentCount: 12, kind: "humanities" },
  { id: "philosophy", department: "철학과", majorGroup: "인문·어문", recruitmentCount: 9, kind: "humanities" },
  { id: "korean-history", department: "한국사학과", majorGroup: "인문·어문", recruitmentCount: 6, kind: "humanities" },
  { id: "history", department: "사학과", majorGroup: "인문·어문", recruitmentCount: 10, kind: "humanities" },
  { id: "sociology", department: "사회학과", majorGroup: "인문·사회", recruitmentCount: 17, kind: "humanities" },
  { id: "classical-chinese", department: "한문학과", majorGroup: "인문·어문", recruitmentCount: 6, kind: "humanities" },
  { id: "english-language", department: "영어영문학과", majorGroup: "인문·어문", recruitmentCount: 24, kind: "humanities" },
  { id: "german-language", department: "독어독문학과", majorGroup: "인문·어문", recruitmentCount: 8, kind: "humanities" },
  { id: "french-language", department: "불어불문학과", majorGroup: "인문·어문", recruitmentCount: 9, kind: "humanities" },
  { id: "chinese-language", department: "중어중문학과", majorGroup: "인문·어문", recruitmentCount: 12, kind: "humanities" },
  { id: "russian-language", department: "노어노문학과", majorGroup: "인문·어문", recruitmentCount: 8, kind: "humanities" },
  { id: "japanese-language", department: "일어일문학과", majorGroup: "인문·어문", recruitmentCount: 10, kind: "humanities" },
  { id: "spanish-language", department: "서어서문학과", majorGroup: "인문·어문", recruitmentCount: 10, kind: "humanities" },
  { id: "linguistics", department: "언어학과", majorGroup: "인문·어문", recruitmentCount: 6, kind: "humanities" },
  { id: "food-resource-economics", department: "식품자원경제학과", majorGroup: "경영·경제", recruitmentCount: 12, kind: "humanities" },
  { id: "political-science", department: "정치외교학과", majorGroup: "인문·사회", recruitmentCount: 17, kind: "humanities" },
  { id: "economics", department: "경제학과", majorGroup: "경영·경제", recruitmentCount: 30, kind: "humanities" },
  { id: "statistics", department: "통계학과", majorGroup: "자연·공학", recruitmentCount: 19, kind: "humanities" },
  { id: "public-administration", department: "행정학과", majorGroup: "인문·사회", recruitmentCount: 18, kind: "humanities" },
  { id: "education", department: "교육학과", majorGroup: "교육", recruitmentCount: 12, kind: "humanities" },
  { id: "korean-education", department: "국어교육과", majorGroup: "교육", recruitmentCount: 10, kind: "humanities" },
  { id: "english-education", department: "영어교육과", majorGroup: "교육", recruitmentCount: 14, kind: "humanities" },
  { id: "geography-education", department: "지리교육과", majorGroup: "교육", recruitmentCount: 8, kind: "humanities" },
  { id: "history-education", department: "역사교육과", majorGroup: "교육", recruitmentCount: 7, kind: "humanities" },
  { id: "home-economics-education", department: "가정교육과", majorGroup: "교육", recruitmentCount: 8, kind: "humanities" },
  { id: "nursing", department: "간호학과", majorGroup: "보건", recruitmentCount: 14, kind: "humanities" },
  { id: "media", department: "미디어학부", majorGroup: "인문·사회", recruitmentCount: 12, kind: "humanities" },
  { id: "health-policy", department: "보건정책관리학부", majorGroup: "보건", recruitmentCount: 17, kind: "humanities" },
  { id: "free-major", department: "자유전공학부", majorGroup: "자율전공", recruitmentCount: 21, kind: "humanities" },
  { id: "psychology", department: "심리학부", majorGroup: "인문·사회", recruitmentCount: 7, kind: "humanities" },
  { id: "life-science", department: "생명과학부", majorGroup: "자연·공학", recruitmentCount: 21, kind: "natural" },
  { id: "biotechnology", department: "생명공학부", majorGroup: "자연·공학", recruitmentCount: 24, kind: "natural" },
  { id: "food-science", department: "식품공학과", majorGroup: "자연·공학", recruitmentCount: 10, kind: "natural" },
  { id: "environmental-ecology", department: "환경생태공학부", majorGroup: "자연·공학", recruitmentCount: 15, kind: "natural" },
  { id: "mathematics", department: "수학과", majorGroup: "자연·공학", recruitmentCount: 11, kind: "natural" },
  { id: "physics", department: "물리학과", majorGroup: "자연·공학", recruitmentCount: 11, kind: "natural" },
  { id: "chemistry", department: "화학과", majorGroup: "자연·공학", recruitmentCount: 10, kind: "natural" },
  { id: "earth-environment", department: "지구환경과학과", majorGroup: "자연·공학", recruitmentCount: 8, kind: "natural" },
  { id: "chemical-biological-engineering", department: "화공생명공학과", majorGroup: "자연·공학", recruitmentCount: 17, kind: "natural" },
  { id: "advanced-materials", department: "신소재공학부", majorGroup: "자연·공학", recruitmentCount: 22, kind: "natural" },
  { id: "architecture-civil-environment", department: "건축사회환경공학부", majorGroup: "자연·공학", recruitmentCount: 19, kind: "natural" },
  { id: "architecture", department: "건축학과", majorGroup: "자연·공학", recruitmentCount: 9, kind: "natural" },
  { id: "mechanical-engineering", department: "기계공학부", majorGroup: "자연·공학", recruitmentCount: 27, kind: "natural" },
  { id: "industrial-management", department: "산업경영공학부", majorGroup: "자연·공학", recruitmentCount: 10, kind: "natural" },
  { id: "electrical-electronics", department: "전기전자공학부", majorGroup: "자연·공학", recruitmentCount: 41, kind: "natural" },
  { id: "semiconductor", department: "반도체공학과", majorGroup: "자연·공학", recruitmentCount: 12, kind: "contract-natural" },
  { id: "energy-convergence", department: "융합에너지공학과", majorGroup: "자연·공학", recruitmentCount: 7, kind: "natural" },
  { id: "next-generation-communications", department: "차세대통신학과", majorGroup: "자연·공학", recruitmentCount: 10, kind: "contract-natural" },
  { id: "medicine", department: "의학과", majorGroup: "의약학", recruitmentCount: 20, kind: "medical" },
  { id: "math-education", department: "수학교육과", majorGroup: "교육", recruitmentCount: 8, kind: "natural" },
  { id: "physical-education", department: "체육교육과", majorGroup: "체능", recruitmentCount: 40, kind: "physical" },
  { id: "computer-science", department: "컴퓨터학과", majorGroup: "자연·공학", recruitmentCount: 24, kind: "natural" },
  { id: "data-science", department: "데이터과학과", majorGroup: "자연·공학", recruitmentCount: 9, kind: "natural" },
  { id: "artificial-intelligence", department: "인공지능학과", majorGroup: "자연·공학", recruitmentCount: 26, kind: "natural" },
  { id: "design-arts", department: "디자인조형학부", majorGroup: "예체능·디자인", recruitmentCount: 35, kind: "design" },
  { id: "international-studies", department: "국제학부", majorGroup: "국제", recruitmentCount: 5, kind: "humanities" },
  { id: "bio-medical-engineering", department: "바이오의공학부", majorGroup: "자연·공학", recruitmentCount: 19, kind: "natural" },
  { id: "biosystems-medical-science", department: "바이오시스템의과학부", majorGroup: "자연·공학", recruitmentCount: 16, kind: "natural" },
  { id: "health-environment", department: "보건환경융합과학부", majorGroup: "자연·공학", recruitmentCount: 26, kind: "natural" },
  { id: "cyber-defense", department: "사이버국방학과", majorGroup: "자연·공학", recruitmentCount: 20, kind: "cyber" },
  { id: "smart-security", department: "스마트보안학부", majorGroup: "자연·공학", recruitmentCount: 12, kind: "natural" },
  { id: "smart-mobility", department: "스마트모빌리티학부", majorGroup: "자연·공학", recruitmentCount: 20, kind: "natural" },
  { id: "college-metropolitan", department: "학부대학", majorGroup: "자율전공", recruitmentCount: 20, kind: "natural" },
] as const;

export const koreaAdmissions2027: RegularAdmission[] = KOREA_ROWS.map((row) => {
  const natural = row.kind === "natural" || row.kind === "medical" || row.kind === "cyber" || row.kind === "contract-natural";
  const medicine = row.kind === "medical";
  const cyber = row.kind === "cyber";
  const contract = row.kind === "contract-natural";
  const physical = row.kind === "physical";
  const design = row.kind === "design";
  const practical = physical || design;
  const weights = natural || medicine || cyber
    ? { koreanWeight: 100, mathWeight: 120, inquiryWeight: 100 }
    : design
      ? { koreanWeight: 200, mathWeight: 0, inquiryWeight: 160 }
      : { koreanWeight: 100, mathWeight: 100, inquiryWeight: 80 };
  const multiplier = cyber ? 800 / 640 : practical ? 700 / (design ? 360 : 560) : natural || medicine ? 1000 / 640 : 1000 / 560;
  const scienceBonus = natural || medicine || cyber ? { 사탐: 0, 과탐: 0.03, 직탐: 0 } : undefined;
  return {
    id: `korea-seoul-ga-${row.id}`,
    universityId: "korea-seoul",
    universityName: "고려대학교",
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
    gradeAdjustmentsAfterFinalMultiplier: true,
    inquiryConversionRequired: true,
    inquiryTypeBonusRequired: Boolean(scienceBonus),
    inquiryTypeBonusRate: scienceBonus,
    englishGradeTable: KOREA_ENGLISH,
    koreanHistoryRequired: true,
    koreanHistoryGradePoints: KOREA_HISTORY,
    schoolViolencePenaltyRequired: true,
    schoolViolencePenaltyNote: KOREA_SCHOOL_VIOLENCE,
    practicalEvaluationRequired: practical,
    practicalEvaluationNote: physical ? "체육교육과: 수능 70%+실기 30%. 실기평가 점수 미입력으로 최종 환산 보류." : design ? "디자인조형학부: 수능 70%+실기 30%. 실기평가 점수 미입력으로 최종 환산 보류." : undefined,
    additionalEligibilityRequired: medicine || cyber || contract,
    additionalEligibilityNote: medicine ? "의학과: 적성·인성 면접 필수(별도 배점 없음). 면접 미응시 또는 부적격 시 최종 판정 불가." : cyber ? "사이버국방학과: 수능 80%+군면접 20%. 연령·임관 결격사유, 수능최저, 신원조회·인성검사·신체검사·체력검정 확인 필요." : contract ? "계약학과(반도체공학과·차세대통신학과): 산학협력 계약 및 별도 지원자격·장학·취업연계 조건 확인 필요." : undefined,
    calculationVerified: false,
    benchmarkComparable: false,
    note: `2027 고려대 서울캠퍼스 정시 일반전형 가군 ${row.recruitmentCount}명. ${natural || medicine || cyber ? "자연·의학 계열: 국어 표준점수+수학 표준점수×1.2+탐구 변환점수 합, 1,000점 환산. 과탐 응시 과목별 변환점수 3% 가산." : design ? "예능계열: 국어 표준점수+탐구 변환점수 합, 1,000점 환산 후 수능 70% 반영." : "인문·체능·가정교육·간호: 국어 표준점수+수학 표준점수+탐구 변환점수 합×0.8, 1,000점 환산."} 영어·한국사 등급별 감점은 환산총점에서 차감. 탐구 변환점수표 미등록, 실기·면접·학교폭력 입력 미지원으로 최종 판정 보류.`,
    sourceUrl: KOREA_SOURCE,
    verifiedAt: "2026-11-25",
  };
});

if (koreaAdmissions2027.length !== 64 || koreaAdmissions2027.reduce((sum, row) => sum + (row.recruitmentCount ?? 0), 0) !== 1030) {
  throw new Error("고려대 2027 정시 일반전형 모집단위·인원 검증 실패");
}
