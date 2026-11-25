import type { RegularAdmission } from "./types";

const SKKU_SOURCE = "https://admission.skku.edu/upload/board/20260904132104TLJSQ4.pdf";
const SKKU_HISTORY = { 1: 0, 2: 0, 3: 0, 4: 0, 5: -1, 6: -2, 7: -5, 8: -10, 9: -20 } as const;
const SKKU_SCHOOL_VIOLENCE = "학교폭력 조치사항: 1호 100점 감점, 2~9호는 전형 총점 0점 처리. 지원자별 조치사항 입력 전 최종 판정 보류.";

// 2027 성균관대 정시 수능위주 일반전형. 학생부위주 사범계열·정원외 특별전형은 제외.
const SKKU_ROWS = [
  { id: "free-major", department: "자유전공계열", majorGroup: "자율전공", recruitmentCount: 110, kind: "a45", group: "가" },
  { id: "social-science", department: "사회과학계열", majorGroup: "인문·사회", recruitmentCount: 196, kind: "a45", group: "가" },
  { id: "humanities", department: "인문과학계열", majorGroup: "인문·어문", recruitmentCount: 168, kind: "n35", group: "나" },
  { id: "business", department: "경영학과", majorGroup: "경영·경제", recruitmentCount: 77, kind: "n45", group: "나" },
  { id: "global-leader", department: "글로벌리더학부", majorGroup: "인문·사회", recruitmentCount: 23, kind: "n35", group: "나" },
  { id: "global-economics", department: "글로벌경제학과", majorGroup: "경영·경제", recruitmentCount: 30, kind: "d45", group: "다" },
  { id: "global-business", department: "글로벌경영학과", majorGroup: "경영·경제", recruitmentCount: 44, kind: "d35", group: "다" },
  { id: "clothing", department: "의상학과", majorGroup: "생활과학", recruitmentCount: 15, kind: "a40", group: "가" },
  { id: "video", department: "영상학과", majorGroup: "예술·미디어", recruitmentCount: 15, kind: "n45", group: "나" },
  { id: "natural-science", department: "자연과학계열", majorGroup: "자연·공학", recruitmentCount: 120, kind: "a40", group: "가" },
  { id: "electronic-electrical", department: "전자전기정보공학부", majorGroup: "자연·공학", recruitmentCount: 66, kind: "n35", group: "나" },
  { id: "engineering", department: "공학계열", majorGroup: "자연·공학", recruitmentCount: 272, kind: "n45", group: "나" },
  { id: "computer-science", department: "컴퓨터공학과", majorGroup: "컴퓨터·소프트웨어", recruitmentCount: 21, kind: "n45", group: "나" },
  { id: "semiconductor-system", department: "반도체시스템공학과", majorGroup: "자연·공학", recruitmentCount: 15, kind: "a40", group: "가" },
  { id: "intelligent-software", department: "지능형소프트웨어학과", majorGroup: "컴퓨터·소프트웨어", recruitmentCount: 15, kind: "n35", group: "나" },
  { id: "battery", department: "배터리학과", majorGroup: "자연·공학", recruitmentCount: 10, kind: "d35", group: "다" },
  { id: "global-biomedical", department: "글로벌바이오메디컬공학과", majorGroup: "자연·공학", recruitmentCount: 11, kind: "d35", group: "다" },
  { id: "semiconductor-convergence", department: "반도체융합공학과", majorGroup: "자연·공학", recruitmentCount: 30, kind: "d45", group: "다" },
  { id: "energy", department: "에너지학과", majorGroup: "자연·공학", recruitmentCount: 10, kind: "d35", group: "다" },
  { id: "quantum-information", department: "양자정보공학과", majorGroup: "자연·공학", recruitmentCount: 10, kind: "d35", group: "다" },
  { id: "bio-pharma-regulatory", department: "바이오신약·규제과학과", majorGroup: "자연·공학", recruitmentCount: 16, kind: "n35", group: "나" },
  { id: "artificial-intelligence", department: "인공지능학과", majorGroup: "컴퓨터·소프트웨어", recruitmentCount: 10, kind: "d45", group: "다" },
  { id: "pharmacy", department: "약학과", majorGroup: "의약학", recruitmentCount: 30, kind: "a40", group: "가" },
  { id: "medicine", department: "의예과", majorGroup: "의약학", recruitmentCount: 16, kind: "aMed", group: "가" },
  { id: "construction-environment", department: "건설환경공학부", majorGroup: "자연·공학", recruitmentCount: 20, kind: "d45", group: "다" },
  { id: "global-ai", department: "글로벌AI융합학부", majorGroup: "컴퓨터·소프트웨어", recruitmentCount: 10, kind: "a40", group: "가" },
  { id: "oriental-painting", department: "미술학과(동양화)", majorGroup: "예술·미술", recruitmentCount: 18, kind: "art", group: "가" },
  { id: "western-painting", department: "미술학과(서양화)", majorGroup: "예술·미술", recruitmentCount: 19, kind: "art", group: "가" },
  { id: "design", department: "디자인학과", majorGroup: "예술·디자인", recruitmentCount: 38, kind: "art", group: "가" },
  { id: "sports-science", department: "스포츠과학과", majorGroup: "체능", recruitmentCount: 28, kind: "sport", group: "가" },
] as const;

export const skkuAdmissions2027: RegularAdmission[] = SKKU_ROWS.map((row) => {
  const groupA45 = row.kind === "a45";
  const groupA40 = row.kind === "a40";
  const medicine = row.kind === "aMed";
  const groupN45 = row.kind === "n45";
  const groupN35 = row.kind === "n35";
  const groupD45 = row.kind === "d45";
  const groupD35 = row.kind === "d35";
  const art = row.kind === "art";
  const sport = row.kind === "sport";
  const contract = row.id === "semiconductor-system" || row.id === "intelligent-software" || row.id === "battery";
  const scienceBonus = ["free-major","natural-science","semiconductor-system","pharmacy","medicine","global-ai","electronic-electrical","engineering","computer-science","intelligent-software","bio-pharma-regulatory","global-biomedical","semiconductor-convergence","energy","quantum-information","artificial-intelligence","battery","construction-environment"].includes(row.id);
  const mathBonus = ["social-science","clothing","business","global-economics","global-business"].includes(row.id);
  const percentileGroup = groupN45 || groupN35;
  const weights = groupA45
    ? { koreanWeight: 45, mathWeight: 35, englishWeight: 10, inquiryWeight: 10 }
    : groupA40
      ? { koreanWeight: 40, mathWeight: 30, englishWeight: 15, inquiryWeight: 15 }
      : medicine
        ? { koreanWeight: 30, mathWeight: 30, englishWeight: 20, inquiryWeight: 20 }
        : groupN45
          ? { koreanWeight: 45, mathWeight: 30, englishWeight: 10, inquiryWeight: 15 }
          : groupN35
            ? { koreanWeight: 35, mathWeight: 30, englishWeight: 20, inquiryWeight: 15 }
            : groupD45
              ? { koreanWeight: 45, mathWeight: 35, englishWeight: 10, inquiryWeight: 10 }
              : groupD35
                ? { koreanWeight: 35, mathWeight: 30, englishWeight: 10, inquiryWeight: 25 }
                : art
                  ? { koreanWeight: 45, mathWeight: 0, englishWeight: 45, inquiryWeight: 10 }
                  : { koreanWeight: 35, mathWeight: 25, englishWeight: 30, inquiryWeight: 10 };
  const inquirySubjects = groupD45 || groupD35 || sport ? 1 : 2;
  const hasPractical = art || sport;
  const finalMultiplier = art ? 600 : sport ? 700 : percentileGroup ? 1 : 1000;
  const additionalEligibility = medicine || contract;
  const practicalNote = art
    ? "미술학과(동양화·서양화) 및 디자인학과: 수능 60%+실기 40%. 실기점수 미입력으로 최종 환산 보류."
    : sport
      ? "스포츠과학과: 수능 70%+실기 30%. 탐구 상위 1과목 반영, 실기점수 미입력으로 최종 환산 보류."
      : undefined;
  return {
    id: `skku-seoul-${row.group}-${row.id}`,
    universityId: "skku-seoul",
    universityName: "성균관대학교",
    region: "서울",
    department: row.department,
    majorGroup: row.majorGroup,
    group: row.group,
    recruitmentCount: row.recruitmentCount,
    scoreMetric: percentileGroup ? "백분위" : "표준점수",
    subjectMetrics: {
      korean: percentileGroup ? "백분위" : "표준점수",
      math: percentileGroup ? "백분위" : "표준점수",
      inquiry: percentileGroup ? "백분위" : "표준점수",
    },
    ...weights,
    inquirySubjects,
    inquiryAggregation: inquirySubjects === 1 ? "best" : "sum",
    calculationMode: percentileGroup ? "weighted-average" : "normalized-standard-sum",
    finalScoreMultiplier: finalMultiplier,
    gradeAdjustmentsAfterFinalMultiplier: true,
    languageMathMode: medicine || art || sport ? undefined : "고득점 우선",
    inquiryConversionRequired: true,
    inquiryTypeBonusRequired: scienceBonus,
    inquiryTypeBonusRate: scienceBonus ? { 사탐: 0, 과탐: 0.05, 직탐: 0 } : undefined,
    mathChoiceBonusRequired: mathBonus,
    mathChoiceBonusRate: mathBonus ? { 미적분: 0.03, 기하: 0, 확률과통계: 0 } : undefined,
    koreanHistoryRequired: true,
    koreanHistoryGradePoints: SKKU_HISTORY,
    schoolViolencePenaltyRequired: true,
    schoolViolencePenaltyNote: SKKU_SCHOOL_VIOLENCE,
    practicalEvaluationRequired: hasPractical,
    practicalEvaluationNote: practicalNote,
    additionalEligibilityRequired: additionalEligibility,
    additionalEligibilityNote: medicine
      ? "의예과: 인·적성 면접 P/F 필수. 면접 결격 또는 결시 시 불합격."
      : contract
        ? "채용조건형 계약학과(반도체시스템공학과·지능형소프트웨어학과·배터리학과): 삼성전자·삼성SDI 협약에 따른 별도 지원자격 및 계약 조건 확인 필요."
        : undefined,
    studentRecordWeight: 0,
    curriculumEvaluationRequired: false,
    calculationVerified: false,
    benchmarkComparable: false,
    note: `2027 성균관대 정시 수능위주 일반전형 ${row.group}군 ${row.recruitmentCount}명. ${groupA45 ? "가군 유형1: 국·수 우수영역 순 45/35, 탐구10, 영어10." : groupA40 ? "가군 유형2: 국·수 우수영역 순 40/30, 탐구15, 영어15." : medicine ? "가군 의예과: 국30·수30·탐20·영20, 인·적성 면접 P/F." : groupN45 ? "나군 유형1: 국·수 백분위 우수영역 순 45/30, 탐구15, 영어10." : groupN35 ? "나군 유형2: 국·수 백분위 우수영역 순 35/30, 탐구15, 영어20." : groupD45 ? "다군 유형1: 국·수 우수영역 순 45/35, 탐구 상위1과목10, 영어10." : groupD35 ? "다군 유형2: 국·수 우수영역 순 35/30, 탐구 상위1과목25, 영어10." : art ? "예체능 미술·디자인: 수능60%+실기40%." : "예체능 스포츠과학: 수능70%+실기30%."} 과탐 선택자 지정 모집단위 최대5%, 미적분 선택자 지정 모집단위 최대3% 가산. 영어 자체 변환점수와 탐구 변환표 미등록, 한국사 감점 및 학교폭력 조치사항·면접·실기 확인 전 최종 판정 보류.`,
    sourceUrl: SKKU_SOURCE,
    verifiedAt: "2026-11-25",
  };
});

if (skkuAdmissions2027.length !== 30 || skkuAdmissions2027.reduce((sum, row) => sum + (row.recruitmentCount ?? 0), 0) !== 1463 ||
    skkuAdmissions2027.filter((row) => row.group === "가").reduce((sum, row) => sum + (row.recruitmentCount ?? 0), 0) !== 615 ||
    skkuAdmissions2027.filter((row) => row.group === "나").reduce((sum, row) => sum + (row.recruitmentCount ?? 0), 0) !== 673 ||
    skkuAdmissions2027.filter((row) => row.group === "다").reduce((sum, row) => sum + (row.recruitmentCount ?? 0), 0) !== 175) {
  throw new Error("성균관대 2027 정시 일반전형 모집단위·인원 검증 실패");
}
