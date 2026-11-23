import type { RegularAdmission } from "./types";

const ERICA_ENGLISH = { 1: 100, 2: 99, 3: 96, 4: 91, 5: 80, 6: 60, 7: 40, 8: 20, 9: 0 } as const;
const ERICA_HISTORY = { 1: 10, 2: 9.9, 3: 9.8, 4: 9.7, 5: 9.6, 6: 9.0, 7: 9.0, 8: 9.0, 9: 9.0 } as const;

const SOURCES = {
  gachon: "https://admission.gachon.ac.kr/admission/html/regular/guide.asp",
  ajou: "https://www.iajou.ac.kr/notice/view.php?bn=78759",
  kyonggi: "https://enter.kyonggi.ac.kr/",
  dankook: "https://ipsi.dankook.ac.kr/jukjeon/",
  erica: "https://goerica.hanyang.ac.kr/admission/html/regular/guide.asp",
  kau: "https://ibhak.kau.ac.kr/",
  koreatech: "https://www.kpu.ac.kr/",
};

const AJOU_ENGLISH = { 1: 100, 2: 98, 3: 96, 4: 84, 5: 60, 6: 40, 7: 20, 8: 10, 9: 0 } as const;
const AJOU_HISTORY = { 1: 0, 2: 0, 3: 0, 4: 0, 5: -5, 6: -10, 7: -20, 8: -30, 9: -40 } as const;
const AJOU_BASE = {
  universityId: "ajou",
  universityName: "아주대학교",
  region: "경기",
  scoreMetric: "표준점수" as const,
  subjectMetrics: { korean: "표준점수" as const, math: "표준점수" as const, inquiry: "백분위" as const },
  inquirySubjects: 2 as const,
  inquiryAggregation: "sum" as const,
  calculationMode: "normalized-standard-sum" as const,
  finalScoreMultiplier: 1000,
  gradeAdjustmentsAfterFinalMultiplier: true,
  inquiryConversionRequired: true,
  koreanHistoryRequired: true,
  koreanHistoryGradePoints: AJOU_HISTORY,
  englishGradeTable: AJOU_ENGLISH,
  calculationVerified: false,
  sourceUrl: SOURCES.ajou,
  verifiedAt: "2026-11-23",
};
type AjouRow = {
  id: string;
  department: string;
  majorGroup: string;
  group: "나" | "다";
  recruitmentCount: number;
  field: "natural" | "humanities-business" | "humanities";
  admissionType: "일반전형2" | "일반전형3" | "일반전형4";
};
const AJOU_ROWS: AjouRow[] = [
  { id: "pharmacy-na-general2", department: "약학과", majorGroup: "의약학", group: "나", recruitmentCount: 10, field: "natural", admissionType: "일반전형2" },
  { id: "free-major-natural-na-general2", department: "자유전공학부(자연)", majorGroup: "자연·공학", group: "나", recruitmentCount: 63, field: "natural", admissionType: "일반전형2" },
  { id: "free-major-humanities-na-general2", department: "자유전공학부(인문)", majorGroup: "인문·사회", group: "나", recruitmentCount: 48, field: "humanities", admissionType: "일반전형2" },
  { id: "mechanical-engineering-da-general3", department: "기계공학과", majorGroup: "자연·공학", group: "다", recruitmentCount: 31, field: "natural", admissionType: "일반전형3" },
  { id: "advanced-smart-industrial-da-general3", department: "첨단스마트산업공학과", majorGroup: "자연·공학", group: "다", recruitmentCount: 20, field: "natural", admissionType: "일반전형3" },
  { id: "chemical-engineering-da-general3", department: "화학공학과", majorGroup: "자연·공학", group: "다", recruitmentCount: 6, field: "natural", admissionType: "일반전형3" },
  { id: "advanced-materials-da-general3", department: "첨단신소재공학과", majorGroup: "자연·공학", group: "다", recruitmentCount: 22, field: "natural", admissionType: "일반전형3" },
  { id: "advanced-eco-energy-da-general3", department: "첨단에코에너지공학과", majorGroup: "자연·공학", group: "다", recruitmentCount: 26, field: "natural", admissionType: "일반전형3" },
  { id: "civil-systems-da-general3", department: "건설시스템공학과", majorGroup: "자연·공학", group: "다", recruitmentCount: 7, field: "natural", admissionType: "일반전형3" },
  { id: "transportation-systems-da-general3", department: "교통시스템공학과", majorGroup: "자연·공학", group: "다", recruitmentCount: 7, field: "natural", admissionType: "일반전형3" },
  { id: "architecture-da-general3", department: "건축학과", majorGroup: "자연·공학", group: "다", recruitmentCount: 10, field: "natural", admissionType: "일반전형3" },
  { id: "electronic-engineering-da-general3", department: "전자공학과", majorGroup: "자연·공학", group: "다", recruitmentCount: 30, field: "natural", admissionType: "일반전형3" },
  { id: "intelligent-semiconductor-da-general3", department: "지능형반도체공학과", majorGroup: "자연·공학", group: "다", recruitmentCount: 27, field: "natural", admissionType: "일반전형3" },
  { id: "future-mobility-da-general3", department: "미래모빌리티공학과", majorGroup: "자연·공학", group: "다", recruitmentCount: 47, field: "natural", admissionType: "일반전형3" },
  { id: "ai-computer-da-general3", department: "AI컴퓨터공학부", majorGroup: "자연·공학", group: "다", recruitmentCount: 24, field: "natural", admissionType: "일반전형3" },
  { id: "cyber-security-da-general3", department: "사이버보안학과", majorGroup: "자연·공학", group: "다", recruitmentCount: 7, field: "natural", admissionType: "일반전형3" },
  { id: "digital-media-da-general3", department: "디지털미디어학과", majorGroup: "자연·공학", group: "다", recruitmentCount: 10, field: "natural", admissionType: "일반전형3" },
  { id: "mathematics-da-general3", department: "수학과", majorGroup: "자연·공학", group: "다", recruitmentCount: 3, field: "natural", admissionType: "일반전형3" },
  { id: "frontier-science-da-general3", department: "프런티어과학학부", majorGroup: "자연·공학", group: "다", recruitmentCount: 30, field: "natural", admissionType: "일반전형3" },
  { id: "nursing-da-general3", department: "간호학과", majorGroup: "보건", group: "다", recruitmentCount: 22, field: "natural", admissionType: "일반전형3" },
  { id: "advanced-bio-da-general3", department: "첨단바이오융합대학", majorGroup: "자연·공학", group: "다", recruitmentCount: 32, field: "natural", admissionType: "일반전형3" },
  { id: "business-da-general3", department: "경영학과", majorGroup: "경영·경제", group: "다", recruitmentCount: 21, field: "humanities-business", admissionType: "일반전형3" },
  { id: "business-intelligence-da-general3", department: "경영인텔리전스학과", majorGroup: "경영·경제", group: "다", recruitmentCount: 10, field: "humanities-business", admissionType: "일반전형3" },
  { id: "financial-engineering-da-general3", department: "금융공학과", majorGroup: "경영·경제", group: "다", recruitmentCount: 10, field: "humanities-business", admissionType: "일반전형3" },
  { id: "korean-language-da-general3", department: "국어국문학과", majorGroup: "인문·어문", group: "다", recruitmentCount: 4, field: "humanities", admissionType: "일반전형3" },
  { id: "english-language-da-general3", department: "영어영문학과", majorGroup: "인문·어문", group: "다", recruitmentCount: 9, field: "humanities", admissionType: "일반전형3" },
  { id: "french-language-da-general3", department: "불어불문학과", majorGroup: "인문·어문", group: "다", recruitmentCount: 3, field: "humanities", admissionType: "일반전형3" },
  { id: "history-da-general3", department: "사학과", majorGroup: "인문·사회", group: "다", recruitmentCount: 3, field: "humanities", admissionType: "일반전형3" },
  { id: "culture-contents-da-general3", department: "문화콘텐츠학과", majorGroup: "인문·사회", group: "다", recruitmentCount: 5, field: "humanities", admissionType: "일반전형3" },
  { id: "public-administration-da-general3", department: "행정학과", majorGroup: "인문·사회", group: "다", recruitmentCount: 10, field: "humanities", admissionType: "일반전형3" },
  { id: "psychology-da-general3", department: "심리학과", majorGroup: "인문·사회", group: "다", recruitmentCount: 10, field: "humanities", admissionType: "일반전형3" },
  { id: "economics-politics-society-da-general3", department: "경제정치사회융합학부", majorGroup: "인문·사회", group: "다", recruitmentCount: 27, field: "humanities", admissionType: "일반전형3" },
  { id: "nursing-da-general4-cross", department: "간호학과(교차)", majorGroup: "보건", group: "다", recruitmentCount: 12, field: "humanities-business", admissionType: "일반전형4" },
];
const ajouAdmissions: RegularAdmission[] = AJOU_ROWS.map((row) => {
  const natural = row.field === "natural";
  const humanitiesBusiness = row.field === "humanities-business";
  const weights = natural
    ? { koreanWeight: 20, mathWeight: 35, englishWeight: 15, inquiryWeight: 30 }
    : humanitiesBusiness
      ? { koreanWeight: 25, mathWeight: 40, englishWeight: 15, inquiryWeight: 20 }
      : { koreanWeight: 35, mathWeight: 25, englishWeight: 15, inquiryWeight: 25 };
  return {
    ...AJOU_BASE,
    ...weights,
    id: `ajou-${row.id}`,
    department: row.department,
    majorGroup: row.majorGroup,
    group: row.group,
    recruitmentCount: row.recruitmentCount,
    mathChoiceBonusRequired: natural,
    mathChoiceBonusRate: natural ? { 미적분: 0.03, 기하: 0.03, 확률과통계: 0 } : undefined,
    inquiryTypeBonusRequired: natural,
    inquiryTypeBonusRate: natural ? { 사탐: 0, 과탐: 0.03, 직탐: 0 } : undefined,
    note: `2027 아주대 ${row.admissionType} 기준. ${row.department} ${row.group}군 ${row.recruitmentCount}명. ${natural ? "자연1 국20·수35·영15·탐30, 미적분·기하 수학 표준점수 3% 및 과탐 탐구변환점수 3% 가산." : humanitiesBusiness ? "인문1 국25·수40·영15·탐20." : "인문2 국35·수25·영15·탐25."} 국어·수학 표준점수, 탐구 백분위 기반 자체변환점수 2과목, 영어 등급환산, 한국사 5등급부터 감점. 탐구 변환표와 해당 수능 최고점 확정 전이므로 계산 판정 보류.`,
  };
});

// 2027 정시 경기권 1차 데이터. 대표 모집단위 기준이며 세부 학과별 예외는 note에 표시.
export const regularAdmissions2027Gyeonggi: RegularAdmission[] = [
  ...ajouAdmissions,
  { id:"kyonggi-ga-humanities", universityId:"kyonggi-suwon", universityName:"경기대학교", region:"경기", department:"사회과학부(인문·사회 B형 대표)", majorGroup:"인문·어문", group:"가", recruitmentCount:52, scoreMetric:"백분위", koreanWeight:35, mathWeight:30, englishWeight:20, inquiryWeight:15, inquirySubjects:1, inquiryAggregation:"best", englishGradeTable:{1:100,2:100,3:96,4:92,5:80,6:70,7:60,8:50,9:0}, koreanHistoryRequired:true, calculationVerified:false, note:"2027 최종 모집요강 기준 가군 사회과학부 52명. 일반학생Ⅰ B형: 국35·수30·영20·탐15, 탐구 상위 1과목. 한국사 6~7등급 0.5점, 8~9등급 1점 감점이나 현재 계산 엔진에 감점 방식이 미구현이므로 계산 검증 보류.", sourceUrl:"https://enter.kyonggi.ac.kr/cms/FR_BBS_CON/BoardView.do?BBS_SEQ=4376&BOARD_SEQ=1&CONTENTS_NO=6&MENU_ID=210&SEARCH_SEQ=2&SITE_NO=2&pageNo=1&pagePerCnt=10", verifiedAt:"2026-11-23" },
  { id:"kyonggi-ga-natural", universityId:"kyonggi-suwon", universityName:"경기대학교", region:"경기", department:"창의공학부(자연·공학 A형 대표)", majorGroup:"자연·공학", group:"가", recruitmentCount:52, scoreMetric:"백분위", koreanWeight:30, mathWeight:35, englishWeight:20, inquiryWeight:15, inquirySubjects:1, inquiryAggregation:"best", englishGradeTable:{1:100,2:100,3:96,4:92,5:80,6:70,7:60,8:50,9:0}, koreanHistoryRequired:true, calculationVerified:false, note:"2027 최종 모집요강 기준 가군 창의공학부 52명. 일반학생Ⅰ A형: 국30·수35·영20·탐15, 탐구 상위 1과목. 한국사 6~7등급 0.5점, 8~9등급 1점 감점이나 현재 계산 엔진에 감점 방식이 미구현이므로 계산 검증 보류.", sourceUrl:"https://enter.kyonggi.ac.kr/cms/FR_BBS_CON/BoardView.do?BBS_SEQ=4376&BOARD_SEQ=1&CONTENTS_NO=6&MENU_ID=210&SEARCH_SEQ=2&SITE_NO=2&pageNo=1&pagePerCnt=10", verifiedAt:"2026-11-23" },
  { id:"hanyang-erica-ga-business", universityId:"hanyang-erica", universityName:"한양대학교 ERICA", region:"경기", department:"상경·인문계열 대표", majorGroup:"경영·경제", group:"가", scoreMetric:"표준점수", koreanWeight:30, mathWeight:30, englishWeight:15, inquiryWeight:25, inquirySubjects:2, inquiryConversionRequired:true, englishGradeTable:ERICA_ENGLISH, koreanHistoryRequired:true, koreanHistoryGradePoints:ERICA_HISTORY, calculationVerified:false, note:"2027 최종 모집요강 확인: 인문 반영비율 국30·수30·영15·탐25. 영어 등급환산 및 한국사 가산점 반영. 탐구 변환표준점수표는 2026-12-18 이후 공개 예정이므로 현시점 계산 검증 보류.", sourceUrl:SOURCES.erica, verifiedAt:"2026-09-27" },
  { id:"kau-ga-engineering", universityId:"kau", universityName:"한국항공대학교", region:"경기", department:"공과대학 대표", majorGroup:"자연·공학", group:"가", scoreMetric:"표준점수", koreanWeight:20, mathWeight:35, englishWeight:20, inquiryWeight:25, inquirySubjects:1, note:"탐구 1과목, 영어 등급환산, 한국사 가점.", sourceUrl:SOURCES.kau, verifiedAt:"2026-09-27" },
  { id:"kau-ga-business", universityId:"kau", universityName:"한국항공대학교", region:"경기", department:"항공·경영대학 대표", majorGroup:"경영·경제", group:"가", scoreMetric:"표준점수", koreanWeight:25, mathWeight:30, englishWeight:20, inquiryWeight:25, inquirySubjects:1, note:"사회적성 기준. 탐구 1과목.", sourceUrl:SOURCES.kau, verifiedAt:"2026-09-27" },
  { id:"koreatech-ga-engineering", universityId:"koreatech", universityName:"한국공학대학교", region:"경기", department:"공학계열 대표", majorGroup:"자연·공학", group:"가", scoreMetric:"백분위", koreanWeight:25, mathWeight:35, englishWeight:20, inquiryWeight:20, inquirySubjects:1, note:"대표 공학계열. 학과별 반영유형이 다름.", sourceUrl:SOURCES.koreatech, verifiedAt:"2026-09-27" },
];
