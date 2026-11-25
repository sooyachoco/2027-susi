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

const KAU_ENGLISH = { 1: 136, 2: 134, 3: 132, 4: 127, 5: 122, 6: 117, 7: 112, 8: 107, 9: 102 } as const;
const KAU_HISTORY = { 1: 10, 2: 10, 3: 10, 4: 10, 5: 9.9, 6: 9.8, 7: 9.7, 8: 9.6, 9: 9.5 } as const;
const KAU_SOURCE = "https://ibhak.kau.ac.kr/admission/html/regular/guide.asp";
const KAU_ROWS = [
  ["engineering-ga","공과대학","자연·공학","가",57,"engineering"],
  ["aviation-management-science-ga","항공·경영대학(이학적성)","자연·공학","가",18,"flexible"],
  ["aviation-management-social-ga","항공·경영대학(사회적성)","인문·사회","가",24,"flexible"],
  ["ai-convergence-na","AI융합대학","자연·공학","나",57,"engineering"],
  ["flight-operation-na","항공운항학과","항공·운항","나",10,"flexible"],
  ["free-engineering-da","자유전공학부(공학적성)","자연·공학","다",28,"engineering"],
  ["free-science-da","자유전공학부(이학적성)","자연·공학","다",23,"flexible"],
  ["free-social-da","자유전공학부(사회적성)","인문·사회","다",4,"flexible"],
] as const;

const kauAdmissions: RegularAdmission[] = KAU_ROWS.map(([id, department, majorGroup, group, recruitmentCount, field]) => {
  const engineering = field === "engineering";
  const weights = engineering
    ? { koreanWeight: 20, mathWeight: 35, englishWeight: 20, inquiryWeight: 25 }
    : { koreanWeight: 25, mathWeight: 30, englishWeight: 20, inquiryWeight: 25 };
  const scienceBonus = engineering ? { 사탐: 0, 과탐: 0.05, 직탐: 0 } : undefined;
  return {
    id: `kau-${id}`,
    universityId: "kau",
    universityName: "한국항공대학교",
    region: "경기",
    department,
    majorGroup,
    group,
    recruitmentCount,
    scoreMetric: "표준점수",
    ...weights,
    inquirySubjects: 2,
    inquiryAggregation: "best",
    calculationMode: "weighted-sum-with-additive-bonuses",
    subjectScoreMultiplier: 5,
    languageMathMode: engineering ? undefined : "고득점 우선",
    inquiryTypeBonusRequired: engineering,
    inquiryTypeBonusRate: scienceBonus,
    englishGradeTable: KAU_ENGLISH,
    koreanHistoryRequired: true,
    koreanHistoryGradePoints: KAU_HISTORY,
    schoolViolencePenaltyRequired: true,
    schoolViolencePenaltyNote: "학교폭력 조치 4~7호는 환산총점의 10% 감점, 8~9호는 불합격 처리. 조치사항 입력 기능이 없어 최종 판정 보류.",
    additionalEligibilityRequired: id === "flight-operation-na",
    additionalEligibilityNote: id === "flight-operation-na"
      ? "항공운항학과는 수능 성적순 3배수 대상자의 항공신체검사 1종 합격 여부가 최종 선발 요건이며, 신체검사는 점수 가산이 아닌 합격·불합격으로 처리."
      : undefined,
    calculationVerified: true,
    benchmarkComparable: false,
    note: `2027 정시 일반학생전형 ${group}군 ${recruitmentCount}명. 수능 100%, 표준점수 사용, 탐구 2과목 중 상위 1과목 반영. ${engineering ? "국20·수35·영20·탐25, 과탐 점수 5% 가산 후 상위 1과목 선택." : "국25·수30·영20·탐25 또는 국30·수25·영20·탐25 중 고득점 조합 적용."} 영어 등급별 환산 표준점수 및 한국사 가산점 반영. 학교폭력 조치사항 입력 전 최종 판정 보류.`,
    sourceUrl: KAU_SOURCE,
    verifiedAt: "2026-11-25",
  };
});

const KUT_ENGLISH = { 1: 100, 2: 96, 3: 92, 4: 88, 5: 80, 6: 60, 7: 30, 8: 20, 9: 10 } as const;
const KUT_SOURCE = "https://iphak.tukorea.ac.kr/bbs/fileview.php?bbsid=guide&file_seq=2041&save_file_nm=guide_20261029152250_4347.pdf";
const KUT_ROWS = [
  ["ai-convergence-free-ga","AI융합 자율전공","자유전공","가",10,0,"engineering"],
  ["computer-engineering-na","컴퓨터공학전공","자연·공학","나",11,8,"engineering"],
  ["software-na","소프트웨어전공","자연·공학","다",10,9,"engineering"],
  ["game-na","게임공학과","자연·공학","나",16,12,"engineering"],
  ["artificial-intelligence-da","인공지능학과","자연·공학","다",6,5,"engineering"],
  ["it-semiconductor-free-ga","IT반도체융합 자율전공","자유전공","가",10,0,"engineering"],
  ["electronic-engineering-na","전자공학전공","자연·공학","나",16,12,"engineering"],
  ["embedded-systems-da","임베디드시스템전공","자연·공학","다",11,8,"engineering"],
  ["nano-semiconductor-da","나노반도체공학전공","자연·공학","다",10,9,"engineering"],
  ["semiconductor-systems-na","반도체시스템전공","자연·공학","나",7,5,"engineering"],
  ["smart-mechanical-free-ga","스마트기계융합 자율전공","자유전공","가",10,0,"engineering"],
  ["mechanical-engineering-na","기계공학과","자연·공학","나",17,13,"engineering"],
  ["mechanical-design-na","기계설계전공","자연·공학","나",11,8,"engineering"],
  ["intelligent-mobility-da","지능형모빌리티전공","자연·공학","다",4,3,"engineering"],
  ["mechatronics-da","메카트로닉스전공","자연·공학","다",12,10,"engineering"],
  ["ai-robotics-na","AI로봇전공","자연·공학","나",5,5,"engineering"],
  ["advanced-convergence-free-ga","첨단융합 자율전공","자유전공","가",10,0,"engineering"],
  ["advanced-materials-na","신소재공학과","자연·공학","나",13,10,"engineering"],
  ["bio-chemical-na","생명화학공학과","자연·공학","나",13,10,"engineering"],
  ["electrical-engineering-da","전기공학전공","자연·공학","다",10,9,"engineering"],
  ["energy-engineering-na","에너지공학전공","자연·공학","나",7,5,"engineering"],
  ["business-free-ga","경영 자율전공","경영·경제","가",6,0,"business"],
  ["business-da","경영학전공","경영·경제","다",9,6,"business"],
  ["data-science-business-na","데이터사이언스경영전공","경영·경제","나",6,5,"business"],
  ["it-business-na","IT경영전공","경영·경제","나",6,5,"business"],
  ["industrial-design-da","산업디자인공학전공","디자인","다",14,12,"engineering"],
  ["liberal-studies-ga","자유전공학부","자유전공","가",20,0,"engineering"],
] as const;

const KUT_SCHOOL_VIOLENCE_NOTE = "학교폭력 조치사항은 500점 환산총점에서 1호 10점, 2호 15점, 3호 20점, 4호 30점, 5호 45점, 6호 60점, 7호 80점, 8호 90점, 9호 100점 감점. 조치사항 입력 기능이 없어 최종 판정 보류.";
const KUT_MATH_BONUS = { 미적분: 0.1, 기하: 0.1, 확률과통계: 0 } as const;
const KUT_HISTORY_ZERO = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 } as const;

const tukoreaAdmissions: RegularAdmission[] = KUT_ROWS.flatMap(([key, department, majorGroup, group, general1Count, general2Count, field]) => {
  const business = field === "business";
  const common = {
    universityId: "tukorea",
    universityName: "한국공학대학교",
    region: "경기",
    department,
    majorGroup,
    group,
    scoreMetric: "백분위" as const,
    inquirySubjects: 2 as const,
    inquiryAggregation: "best" as const,
    englishGradeTable: KUT_ENGLISH,
    mathChoiceBonusRequired: true,
    mathChoiceBonusRate: KUT_MATH_BONUS,
    schoolViolencePenaltyRequired: true,
    schoolViolencePenaltyNote: KUT_SCHOOL_VIOLENCE_NOTE,
    calculationVerified: true,
    benchmarkComparable: false,
    sourceUrl: KUT_SOURCE,
    verifiedAt: "2026-11-25",
  };
  const rows: RegularAdmission[] = [];
  if (general1Count > 0) {
    rows.push({
      ...common,
      id: `tukorea-${key}-general1`,
      recruitmentCount: general1Count,
      koreanWeight: business ? 30 : 25,
      mathWeight: business ? 30 : 35,
      englishWeight: 20,
      inquiryWeight: 20,
      calculationMode: "weighted-average",
      finalScoreMultiplier: 0.5,
      koreanHistoryGradePoints: KUT_HISTORY_ZERO,
      note: `2027 정시 수능 일반학생1 ${group}군 ${general1Count}명. 500점 만점, 백분위 활용, ${business ? "경영계열 국30·수30·영20·탐20." : "공학계열 국25·수35·영20·탐20."} 수학 미적분·기하 백분위 10% 가산. 탐구 2과목 중 상위 1과목 반영. 한국사 필수 응시. ${KUT_SCHOOL_VIOLENCE_NOTE}`,
    });
  }
  if (general2Count > 0) {
    rows.push({
      ...common,
      id: `tukorea-${key}-general2`,
      recruitmentCount: general2Count,
      koreanWeight: 25,
      mathWeight: 25,
      englishWeight: 25,
      inquiryWeight: 25,
      calculationMode: "normalized-standard-sum",
      subjectMetrics: { korean: "백분위", math: "백분위", inquiry: "백분위" },
      subjectMaximumScores: { korean: 100, math: 100, inquiry: 100 },
      englishMaximumScore: 100,
      rankedAreaWeights: [45, 35, 20],
      rankedAreaRequired: ["math"],
      finalScoreMultiplier: 500,
      note: `2027 정시 수능 일반학생2 ${group}군 ${general2Count}명. 500점 만점, 수학 필수 포함 국어·영어·탐구 중 상위 2개를 추가해 3개 영역을 성적순으로 45%·35%·20% 반영. 수학 미적분·기하 백분위 10% 가산. 탐구 2과목 중 상위 1과목 반영. 한국사 필수 응시. ${KUT_SCHOOL_VIOLENCE_NOTE}`,
    });
  }
  return rows;
});

// 2027 정시 경기권 데이터: 아주대·경기대 원천 행과 한양대 ERICA 공식 모집요강 행을 결합.
const regularAdmissions2027GyeonggiBase: RegularAdmission[] = [
  ...ajouAdmissions,
  ...kyonggiAdmissions,
  ...kauAdmissions,
  ...tukoreaAdmissions,
];

const HANYANG_ERICA_ROWS = [
  ["architecture-major-ga","건축학부 건축학전공","자연·공학","가",13,"natural2"],
  ["architecture-engineering-ga","건축학부 건축공학전공","자연·공학","가",13,"natural1"],
  ["civil-environment-ga","건설환경공학과","자연·공학","가",14,"natural1"],
  ["transport-logistics-ga","교통·물류공학과","자연·공학","가",12,"natural2"],
  ["electronic-engineering-ga","전자공학부","자연·공학","가",50,"natural1"],
  ["battery-materials-ga","배터리소재화학공학과","자연·공학","가",31,"natural1"],
  ["mechanical-engineering-ga","기계공학과","자연·공학","가",32,"natural1"],
  ["industrial-management-ga","산업경영공학과","자연·공학","가",13,"natural2"],
  ["computer-major-ga","컴퓨터전공","자연·공학","가",22,"natural2"],
  ["intelligent-cloud-ga","지능형클라우드전공","자연·공학","가",6,"natural2"],
  ["ict-convergence-ga","ICT융합학부","자연·공학","가",19,"natural2"],
  ["math-data-ga","수리데이터사이언스학과","자연·공학","가",10,"natural1"],
  ["nextgen-semiconductor-ga","차세대반도체융합공학부(학부모집)","자연·공학","가",19,"natural1"],
  ["semiconductor-display-ga","반도체·디스플레이공학전공","자연·공학","가",12,"natural1"],
  ["molecular-medicine-ga","분자의약전공","자연·공학","가",13,"natural1"],
  ["bio-nano-ga","바이오나노공학전공","자연·공학","가",12,"natural1"],
  ["intelligent-system-ga","지능형시스템공학전공","자연·공학","가",22,"natural1"],
  ["global-culture-ga","글로벌문화통상학부","인문·사회","가",32,"humanities"],
  ["advertising-ga","광고홍보학과","인문·사회","가",20,"humanities"],
  ["economics-ga","경제학부","경영·경제","가",28,"business"],
  ["insurance-actuarial-ga","보험계리학과","경영·경제","가",11,"natural1"],
  ["robotics-na","로봇공학과","자연·공학","나",20,"natural1"],
  ["energy-bio-na","에너지바이오학과","자연·공학","나",19,"natural1"],
  ["marine-convergence-na","해양융합공학과","자연·공학","나",11,"natural1"],
  ["computer-faculty-na","컴퓨터학부(학부모집)","자연·공학","나",8,"natural2"],
  ["artificial-intelligence-na","인공지능학과","자연·공학","나",30,"natural1"],
  ["pharmacy-na","약학과","자연·공학","나",10,"natural1"],
  ["semiconductor-materials-na","신소재·반도체공학전공","자연·공학","나",20,"natural1"],
  ["bio-pharma-faculty-na","바이오신약융합학부(학부모집)","자연·공학","나",24,"natural1"],
  ["media-na","미디어학과","인문·사회","나",20,"humanities"],
  ["cultural-anthropology-na","문화인류학과","인문·사회","나",11,"humanities"],
  ["culture-contents-na","문화콘텐츠학과","인문·사회","나",12,"humanities"],
  ["business-na","경영학부","경영·경제","나",40,"business"],
  ["lions-free-major-na","LIONS자율전공학부(전계열)","자유전공","나",94,"lions"],
] as const;

const HANYANG_ERICA_ENGLISH = { 1: 100, 2: 99, 3: 96, 4: 91, 5: 80, 6: 60, 7: 40, 8: 20, 9: 0 } as const;
const HANYANG_ERICA_HISTORY = { 1: 10, 2: 9.9, 3: 9.8, 4: 9.7, 5: 9.6, 6: 9.0 } as const;
const HANYANG_ERICA_SOURCE = "https://goerica.hanyang.ac.kr/admission/html/regular/guide.asp";

const hanyangEricaAdmissions: RegularAdmission[] = HANYANG_ERICA_ROWS.map(([id, department, majorGroup, group, recruitmentCount, field]) => {
  const natural1 = field === "natural1";
  const natural2 = field === "natural2";
  const humanities = field === "humanities";
  const lions = field === "lions";
  const weights = lions
    ? { koreanWeight: 30, mathWeight: 35, englishWeight: 10, inquiryWeight: 25 }
    : humanities
      ? { koreanWeight: 30, mathWeight: 30, englishWeight: 15, inquiryWeight: 25 }
      : { koreanWeight: 25, mathWeight: 35, englishWeight: 15, inquiryWeight: 25 };
  const inquiryBonus = natural1 ? { 과탐: 0.03 } : humanities ? { 사탐: 0.03 } : undefined;
  return {
    id: `hanyang-erica-${id}`,
    universityId: "hanyang-erica",
    universityName: "한양대학교 ERICA",
    region: "경기",
    department: department,
    majorGroup: majorGroup,
    group: group,
    recruitmentCount: recruitmentCount,
    scoreMetric: "표준점수",
    subjectMetrics: { korean: "표준점수", math: "표준점수", inquiry: "표준점수" },
    calculationMode: "normalized-standard-sum",
    ...weights,
    inquirySubjects: 2,
    inquiryAggregation: "sum",
    inquiryConversionRequired: true,
    inquiryTypeBonusRequired: Boolean(inquiryBonus),
    inquiryTypeBonusRate: inquiryBonus,
    finalScoreMultiplier: 1000,
    gradeAdjustmentsAfterFinalMultiplier: true,
    englishGradeTable: HANYANG_ERICA_ENGLISH,
    koreanHistoryRequired: true,
    koreanHistoryGradePoints: HANYANG_ERICA_HISTORY,
    calculationVerified: false,
    schoolViolencePenaltyRequired: true,
    schoolViolencePenaltyNote: "학교폭력 조치사항은 총점 1,000점에서 감점: 1호 5점, 2호 10점, 3호 15점, 4·5호 30점, 6·7호 100점, 8호 200점, 9호 300점. 조치사항 입력 전 최종 판정 보류.",
    note: `2027 정시 일반전형 ${group}군 ${recruitmentCount}명. ${natural1 ? "자연1" : natural2 ? "자연2" : humanities ? "인문" : lions ? "LIONS 전계열" : "상경"} 반영비율 국${weights.koreanWeight}·수${weights.mathWeight}·영${weights.englishWeight}·탐${weights.inquiryWeight}(탐구 2과목). ${natural1 ? "과탐 과목당 변환표준점수 3% 가산" : humanities ? "사탐 과목당 변환표준점수 3% 가산" : "탐구 가산점 없음"}. 영어 등급환산, 한국사 등급별 가산점 반영. 2027 탐구 변환표준점수표 및 국어·수학 표준점수 최고점은 2026-12-18 이후 공지 예정이므로 환산점수 판정 보류.`,
    sourceUrl: HANYANG_ERICA_SOURCE,
    verifiedAt: "2026-11-25",
  };
});

export const regularAdmissions2027Gyeonggi: RegularAdmission[] = [
  ...regularAdmissions2027GyeonggiBase,
  ...hanyangEricaAdmissions,
];

// 한국항공대 2027 정시 일반학생전형 8개 모집단위 등록 완료. 학교폭력·항공신체검사 입력 전 최종 판정은 보류한다.
