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

const KYONGGI_ENGLISH = { 1: 100, 2: 100, 3: 96, 4: 92, 5: 80, 6: 70, 7: 60, 8: 50, 9: 0 } as const;
const KYONGGI_HISTORY = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: -0.05, 7: -0.05, 8: -0.1, 9: -0.1 } as const;
const KYONGGI_SOURCE = "https://enter.kyonggi.ac.kr/cms/FR_BBS_CON/BoardView.do?BBS_SEQ=4376&BOARD_SEQ=1&CONTENTS_NO=6&MENU_ID=210&SEARCH_SEQ=2&SITE_NO=2&pageNo=1&pagePerCnt=10";
const KYONGGI_ROWS = [["society-ga","사회과학부","인문·사회","가",52,"B"],["creative-engineering-ga","창의공학부","자연·공학","가",52,"A"],["humanities-na","인문학부","인문·어문","나",36,"B"],["software-business-na","소프트웨어경영학부","자연·공학","나",40,"A"],["convergence-science-na","융합과학부","자연·공학","나",18,"A"],["korean-language-da","국어국문학과","인문·어문","다",16,"B"],["english-language-da","영어영문학과","인문·어문","다",21,"B"],["history-da","사학과","인문·어문","다",10,"B"],["library-information-da","문헌정보학과","인문·사회","다",5,"B"],["global-language-da","글로벌어문학부","인문·어문","다",17,"B"],["early-childhood-da","유아교육과","교육","다",7,"B"],["law-da","법학과","인문·사회","다",14,"B"],["trade-da","무역학과","경영·경제","다",27,"B"],["public-safety-da","공공안전학부","인문·사회","다",15,"B"],["social-welfare-youth-da","사회복지·청소년학과","인문·사회","다",11,"B"],["public-talent-da","공공인재학부","인문·사회","다",28,"B"],["economics-da","경제학부","경영·경제","다",32,"B"],["business-da","경영학부","경영·경제","다",82,"A"],["industrial-management-da","산업경영공학과","자연·공학","다",20,"A"],["ai-computer-da","AI컴퓨터공학부","자연·공학","다",76,"A"],["ai-major-da","AI컴퓨터공학부 인공지능전공","자연·공학","다",10,"A"],["sw-security-da","AI컴퓨터공학부 SW안전보안전공","자연·공학","다",20,"A"],["mathematics-da","수학과","자연·공학","다",4,"A"],["chemistry-da","화학과","자연·공학","다",8,"A"],["bio-convergence-da","바이오융합학부","자연·공학","다",17,"A"],["architecture-da","건축학과(5년제)","자연·공학","다",5,"A"],["social-energy-system-da","사회에너지시스템공학과","자연·공학","다",28,"A"],["mechanical-system-da","기계시스템공학과","자연·공학","다",11,"A"],["electronic-engineering-da","전자공학부","자연·공학","다",31,"A"],["materials-chemical-da","신소재화학공학부","자연·공학","다",28,"A"],["smart-city-da","스마트시티공학부","자연·공학","다",12,"A"],["media-video-da","미디어영상학과","인문·사회","다",11,"B"],["tourism-development-da","관광개발경영학과","경영·경제","다",24,"B"],["tourism-culture-da","관광문화콘텐츠학과","인문·사회","다",11,"B"],["hotel-food-da","호텔외식경영학부","경영·경제","다",21,"B"]] as const;
const kyonggiAdmissions: RegularAdmission[] = KYONGGI_ROWS.map(([key, department, majorGroup, group, recruitmentCount, type]) => ({
  id: `kyonggi-${key}`, universityId: "kyonggi-suwon", universityName: "경기대학교", region: "경기",
  department, majorGroup, group, recruitmentCount, scoreMetric: "백분위",
  koreanWeight: type === "A" ? 30 : 35, mathWeight: type === "A" ? 35 : 30,
  englishWeight: 20, inquiryWeight: 15, inquirySubjects: 1, inquiryAggregation: "best",
  englishGradeTable: KYONGGI_ENGLISH, koreanHistoryRequired: true, koreanHistoryGradePoints: KYONGGI_HISTORY,
  calculationVerified: true,
  benchmarkComparable: false,
  note: `2027 정시 수능(일반학생Ⅰ) 비실기 ${group}군 ${recruitmentCount}명. 유형 ${type}: 국어 ${type === "A" ? 30 : 35}·수학 ${type === "A" ? 35 : 30}·영어20·탐구15, 백분위 및 탐구 상위 1과목. 한국사 6~7등급 0.5점, 8~9등급 1점 감점. 2026학년도와 영어 등급 환산표가 달라 전년도 환산점수는 비교 기준으로 사용하지 않음.`,
  sourceUrl: KYONGGI_SOURCE, verifiedAt: "2026-11-23",
}));

// 2027 정시 경기권 1차 데이터. 대표 모집단위 기준이며 세부 학과별 예외는 note에 표시.
export const regularAdmissions2027Gyeonggi: RegularAdmission[] = [
  ...ajouAdmissions,
  ...kyonggiAdmissions,
  { id:"hanyang-erica-na-business", universityId:"hanyang-erica", universityName:"한양대학교 ERICA", region:"경기", department:"경영학부", majorGroup:"경영·경제", group:"나", recruitmentCount:40, scoreMetric:"표준점수", subjectMetrics:{ korean:"표준점수", math:"표준점수", inquiry:"표준점수" }, calculationMode:"normalized-standard-sum", koreanWeight:25, mathWeight:35, englishWeight:15, inquiryWeight:25, inquirySubjects:2, inquiryAggregation:"sum", inquiryConversionRequired:true, finalScoreMultiplier:1000, gradeAdjustmentsAfterFinalMultiplier:true, englishGradeTable:ERICA_ENGLISH, koreanHistoryRequired:true, koreanHistoryGradePoints:ERICA_HISTORY, calculationVerified:false, schoolViolencePenaltyRequired:true, schoolViolencePenaltyNote:"학교폭력 조치사항 감점: 1호 5점, 2호 10점, 3호 15점, 4·5호 30점, 6·7호 100점, 8호 200점, 9호 300점. 조치사항 입력 전 최종점수 판정 보류.", note:"2027 최종 모집요강 나군 경영학부 일반전형 40명. 상경계열 반영비율 국25·수35·영15·탐25(2과목). 국어·수학은 당해 연도 표준점수 최고점으로 정규화, 탐구는 변환표준점수 2과목 합을 변환표 최고점×2로 정규화, 영어는 등급환산점수×영역반영점수/100, 한국사는 등급별 가산점. 상경계열 탐구 가산점 없음. 탐구 변환표와 2027 수능 최고점 미확정으로 계산 검증 보류.", sourceUrl:SOURCES.erica, verifiedAt:"2026-11-24" },
  { id:"hanyang-erica-na-lions", universityId:"hanyang-erica", universityName:"한양대학교 ERICA", region:"경기", department:"LIONS자율전공학부(전계열)", majorGroup:"자유전공", group:"나", recruitmentCount:94, scoreMetric:"표준점수", subjectMetrics:{ korean:"표준점수", math:"표준점수", inquiry:"표준점수" }, calculationMode:"normalized-standard-sum", koreanWeight:30, mathWeight:35, englishWeight:10, inquiryWeight:25, inquirySubjects:2, inquiryAggregation:"sum", inquiryConversionRequired:true, finalScoreMultiplier:1000, gradeAdjustmentsAfterFinalMultiplier:true, englishGradeTable:ERICA_ENGLISH, koreanHistoryRequired:true, koreanHistoryGradePoints:ERICA_HISTORY, calculationVerified:false, schoolViolencePenaltyRequired:true, schoolViolencePenaltyNote:"학교폭력 조치사항 감점: 1호 5점, 2호 10점, 3호 15점, 4·5호 30점, 6·7호 100점, 8호 200점, 9호 300점. 조치사항 입력 전 최종점수 판정 보류.", note:"2027 최종 모집요강 나군 일반전형 94명. LIONS 전계열 반영비율 국30·수35·영10·탐25(2과목). 국어·수학 표준점수 최고점 정규화, 탐구 변환표준점수 2과목 합 정규화, 영어 등급환산, 한국사 가산점. 탐구 가산점 없음. 탐구 변환표와 2027 수능 최고점 미확정으로 계산 검증 보류.", sourceUrl:SOURCES.erica, verifiedAt:"2026-11-24" },
  // 한국항공대 2027 공식 모집요강 공개 확인. 세부표 추출 검증 전까지 미등록.
];
