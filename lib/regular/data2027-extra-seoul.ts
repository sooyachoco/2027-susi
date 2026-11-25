import type { RegularAdmission } from "./types";

const HANSUNG_SOURCE = "https://enter.hansung.ac.kr/api/file/get?destFilename=2027%ED%95%99%EB%85%84%EB%8F%84+%EC%A0%95%EC%8B%9C%EB%AA%A8%EC%A7%91%EC%9A%94%EA%B0%95+v2.pdf&ignoreDestFilename=1&path=board%2F%2Fa089186d-2aac-49f6-a23a-79b108050f9d.pdf";
const HANSUNG_ROWS = [
  {"key":"ga-creative-humanities","department":"크리에이티브인문학부","majorGroup":"인문·사회","group":"가","recruitmentCount":41,"field":"humanities"},
  {"key":"ga-future-social-science","department":"미래융합사회과학대학","majorGroup":"인문·사회","group":"가","recruitmentCount":40,"field":"humanities"},
  {"key":"ga-ai-fashion","department":"AI패션학부","majorGroup":"디자인","group":"가","recruitmentCount":15,"field":"humanities"},
  {"key":"ga-ai-convergence-design","department":"AI융합디자인학부","majorGroup":"디자인","group":"가","recruitmentCount":4,"field":"humanities"},
  {"key":"ga-it-engineering","department":"IT공과대학(컴퓨터공학부·전기전자공학부·산업시스템공학부)","majorGroup":"자연·공학","group":"가","recruitmentCount":147,"field":"engineering"},
  {"key":"ga-ai-beauty-conditional","department":"AI뷰티디자인학과(수시 미충원 시)","majorGroup":"디자인","group":"가","recruitmentCount":0,"field":"humanities","conditional":true},
  {"key":"na-ai-application","department":"AI응용학과","majorGroup":"자연·공학","group":"나","recruitmentCount":30,"field":"engineering"},
  {"key":"na-convergence-security","department":"융합보안학과","majorGroup":"자연·공학","group":"나","recruitmentCount":20,"field":"engineering"},
  {"key":"na-future-mobility","department":"미래모빌리티학과","majorGroup":"자연·공학","group":"나","recruitmentCount":15,"field":"engineering"},
  {"key":"na-ai-mechanical-robotics","department":"AI기계로봇공학과","majorGroup":"자연·공학","group":"나","recruitmentCount":10,"field":"engineering"},
  {"key":"na-literature-conditional","department":"문학문화콘텐츠학과(수시 미충원 시)","majorGroup":"인문·사회","group":"나","recruitmentCount":0,"field":"humanities","conditional":true},
  {"key":"da-imagination-autonomous","department":"상상력인재학부(자율전공)","majorGroup":"자율전공","group":"다","recruitmentCount":78,"field":"autonomous"},
  {"key":"da-creative-humanities-night","department":"크리에이티브인문학부(야)","majorGroup":"인문·사회","group":"다","recruitmentCount":33,"field":"night"},
  {"key":"da-future-social-science-night","department":"미래융합사회과학대학(야)","majorGroup":"인문·사회","group":"다","recruitmentCount":45,"field":"night"},
  {"key":"da-ai-fashion-night","department":"AI패션학부(야)","majorGroup":"디자인","group":"다","recruitmentCount":17,"field":"night"},
  {"key":"da-ai-beauty-night-conditional","department":"AI뷰티디자인학과(야·수시 미충원 시)","majorGroup":"디자인","group":"다","recruitmentCount":0,"field":"night","conditional":true}
] as const;
const HANSUNG_ENGLISH = { 1:100, 2:97, 3:94, 4:80, 5:70, 6:55, 7:40, 8:25, 9:10 } as const;
const HANSUNG_HISTORY = { 1:10, 2:10, 3:10, 4:10, 5:8, 6:6, 7:4, 8:2, 9:0 } as const;
export const hansungAdmissions2027: RegularAdmission[] = HANSUNG_ROWS.map((row) => {
  const common = {
    id: `hansung-seoul-${row.key}`,
    universityId: "hansung-seoul",
    universityName: "한성대학교",
    region: "서울",
    department: row.department,
    majorGroup: row.majorGroup,
    group: row.group,
    recruitmentCount: row.recruitmentCount,
    scoreMetric: "백분위" as const,
    subjectMetrics: { korean: "백분위" as const, math: "백분위" as const, inquiry: "백분위" as const },
    inquirySubjects: 1 as const,
    inquiryAggregation: "best" as const,
    calculationMode: "normalized-standard-sum" as const,
    finalScoreMultiplier: 1000,
    gradeAdjustmentsAfterFinalMultiplier: true,
    englishGradeTable: HANSUNG_ENGLISH,
    koreanHistoryRequired: true,
    koreanHistoryGradePoints: HANSUNG_HISTORY,
    calculationVerified: false,
    sourceUrl: HANSUNG_SOURCE,
    verifiedAt: "2026-11-24",
  };
  if (row.field === "engineering") return {
    ...common, koreanWeight:25, mathWeight:35, englishWeight:20, inquiryWeight:20,
    note: "주간 공학계열. 국어25·수학35·탐구1과목20·영어20. 학교폭력 조치사항 감점은 별도 적용 여부 미입력으로 최종 계산 검증 보류."
  };
  if (row.field === "autonomous") return {
    ...common, koreanWeight:40, mathWeight:30, englishWeight:20, inquiryWeight:10,
    rankedAreaWeights:[40,30,20,10],
    note: "상상력인재학부: 국어·수학·영어·탐구 백분위 성적순 40·30·20·10. 학교폭력 조치사항 감점은 별도 적용 여부 미입력으로 최종 계산 검증 보류."
  };
  if (row.field === "night") return {
    ...common, koreanWeight:40, mathWeight:40, englishWeight:20, inquiryWeight:40,
    topAreaWeights:{ areas:["korean","math","inquiry"], count:2, weight:40 },
    note: "야간 모집단위: 국어·수학·탐구 3개 영역 중 상위 2개를 각각 40%, 영어20%. 학교폭력 조치사항 감점은 별도 적용 여부 미입력으로 최종 계산 검증 보류."
  };
  return {
    ...common, koreanWeight:35, mathWeight:25, englishWeight:20, inquiryWeight:20,
    note: "주간 인문·사회·디자인계열. 국어35·수학25·탐구1과목20·영어20. 학교폭력 조치사항 감점은 별도 적용 여부 미입력으로 최종 계산 검증 보류."
  };
});




// 서울여자대학교 2027 정시 일반학생전형: 41개 모집단위, 군별 모집인원 및 영역 순위 반영 방식



// 덕성여자대학교 2027 정시: 수능우수전형Ⅰ·Ⅱ 및 실기전형 모집단위
const DUKSUNG_SOURCE = "https://enter.duksung.ac.kr/mojib/?m_type=JEONGSI&m_year=2027";
const DUKSUNG_ENGLISH = { 1:100, 2:98, 3:96, 4:80, 5:70, 6:60, 7:50, 8:40, 9:0 } as const;
const DUKSUNG_HISTORY_I = { 1:10, 2:10, 3:10, 4:10, 5:9, 6:8, 7:7, 8:6, 9:0 } as const;
const DUKSUNG_HISTORY_II = { 1:9, 2:9, 3:9, 4:9, 5:8.1, 6:7.2, 7:6.3, 8:5.4, 9:0 } as const;
const DUKSUNG_HISTORY_ART = { 1:2, 2:2, 3:2, 4:2, 5:1.8, 6:1.6, 7:1.4, 8:1.2, 9:0 } as const;
const DUKSUNG_HISTORY_SPORTS = { 1:4, 2:4, 3:4, 4:4, 5:3.6, 6:3.2, 7:2.8, 8:2.4, 9:0 } as const;
export const duksungAdmissions2027: RegularAdmission[] = [
  { id:"duksung-seoul-ga-science-technology", universityId:"duksung-seoul", universityName:"덕성여자대학교", region:"서울", department:"과학기술대학", majorGroup:"자연·공학", group:"가", recruitmentCount:84, scoreMetric:"백분위", subjectMetrics:{korean:"백분위",math:"백분위",inquiry:"백분위"}, koreanWeight:30,mathWeight:25,englishWeight:25,inquiryWeight:20,inquirySubjects:1,inquiryAggregation:"best",calculationMode:"normalized-standard-sum",subjectMaximumScores:{korean:100,math:100,inquiry:100},rankedAreaWeights:[30,25,25,20],finalScoreMultiplier:1000,gradeAdjustmentsAfterFinalMultiplier:true,englishGradeTable:DUKSUNG_ENGLISH,koreanHistoryRequired:true,koreanHistoryGradePoints:DUKSUNG_HISTORY_I,schoolViolencePenaltyRequired:true,schoolViolencePenaltyNote:"학교폭력 1~2호 감점 없음, 3호 50점, 4호 100점, 5호 200점, 6호 300점, 7호 400점 감점, 8~9호 결격(최종환산점수 1,000점 기준)",calculationVerified:false,sourceUrl:DUKSUNG_SOURCE,verifiedAt:"2026-11-24",note:"수능우수전형Ⅰ. 국어·수학·영어·탐구(상위1) 백분위 상위순 30·25·25·20, 수능 1,000점. 학교폭력 조치사항 감점·결격 입력 미지원으로 최종 검증 보류." },
  { id:"duksung-seoul-ga-pharmacy", universityId:"duksung-seoul", universityName:"덕성여자대학교", region:"서울", department:"약학대학(약학과)", majorGroup:"약학", group:"가", recruitmentCount:30, scoreMetric:"백분위", subjectMetrics:{korean:"백분위",math:"백분위",inquiry:"백분위"}, koreanWeight:25,mathWeight:30,englishWeight:20,inquiryWeight:25,inquirySubjects:2,inquiryAggregation:"mean",calculationMode:"normalized-standard-sum",subjectMaximumScores:{korean:100,math:100,inquiry:100},finalScoreMultiplier:1000,gradeAdjustmentsAfterFinalMultiplier:true,englishGradeTable:DUKSUNG_ENGLISH,koreanHistoryRequired:true,koreanHistoryGradePoints:DUKSUNG_HISTORY_I,inquiryTypeBonusRequired:true,inquiryTypeBonusRate:{사탐:0,과탐:0.2,직탐:0},inquiryBonusRequiresSameType:"과탐",schoolViolencePenaltyRequired:true,calculationVerified:false,sourceUrl:DUKSUNG_SOURCE,verifiedAt:"2026-11-24",note:"수능우수전형Ⅰ. 국어25·수학30·영어20·탐구2과목 평균25. 과학탐구 2과목 응시 시 탐구 환산점수 20% 가산. 학교폭력 조치사항 감점·결격 입력 미지원으로 최종 검증 보류." },
  { id:"duksung-seoul-ga-virtual-reality", universityId:"duksung-seoul", universityName:"덕성여자대학교", region:"서울", department:"미래인재대학(가상현실융합학과)", majorGroup:"자연·공학", group:"가", recruitmentCount:15, scoreMetric:"백분위", subjectMetrics:{korean:"백분위",math:"백분위",inquiry:"백분위"},koreanWeight:30,mathWeight:25,englishWeight:25,inquiryWeight:20,inquirySubjects:1,inquiryAggregation:"best",calculationMode:"normalized-standard-sum",subjectMaximumScores:{korean:100,math:100,inquiry:100},rankedAreaWeights:[30,25,25,20],finalScoreMultiplier:1000,gradeAdjustmentsAfterFinalMultiplier:true,englishGradeTable:DUKSUNG_ENGLISH,koreanHistoryRequired:true,koreanHistoryGradePoints:DUKSUNG_HISTORY_I,schoolViolencePenaltyRequired:true,calculationVerified:false,sourceUrl:DUKSUNG_SOURCE,verifiedAt:"2026-11-24",note:"수능우수전형Ⅰ. 백분위 상위순 30·25·25·20, 수능 1,000점. 학교폭력 조치사항 감점·결격 입력 미지원으로 최종 검증 보류." },
  { id:"duksung-seoul-ga-data-science", universityId:"duksung-seoul", universityName:"덕성여자대학교", region:"서울", department:"미래인재대학(데이터사이언스학과)", majorGroup:"자연·공학", group:"가", recruitmentCount:15, scoreMetric:"백분위", subjectMetrics:{korean:"백분위",math:"백분위",inquiry:"백분위"},koreanWeight:30,mathWeight:25,englishWeight:25,inquiryWeight:20,inquirySubjects:1,inquiryAggregation:"best",calculationMode:"normalized-standard-sum",subjectMaximumScores:{korean:100,math:100,inquiry:100},rankedAreaWeights:[30,25,25,20],finalScoreMultiplier:1000,gradeAdjustmentsAfterFinalMultiplier:true,englishGradeTable:DUKSUNG_ENGLISH,koreanHistoryRequired:true,koreanHistoryGradePoints:DUKSUNG_HISTORY_I,schoolViolencePenaltyRequired:true,calculationVerified:false,sourceUrl:DUKSUNG_SOURCE,verifiedAt:"2026-11-24",note:"수능우수전형Ⅰ. 백분위 상위순 30·25·25·20, 수능 1,000점. 학교폭력 조치사항 감점·결격 입력 미지원으로 최종 검증 보류." },
  { id:"duksung-seoul-ga-ai-drug", universityId:"duksung-seoul", universityName:"덕성여자대학교", region:"서울", department:"미래인재대학(AI신약학과)", majorGroup:"자연·공학", group:"가", recruitmentCount:15, scoreMetric:"백분위", subjectMetrics:{korean:"백분위",math:"백분위",inquiry:"백분위"},koreanWeight:30,mathWeight:25,englishWeight:25,inquiryWeight:20,inquirySubjects:1,inquiryAggregation:"best",calculationMode:"normalized-standard-sum",subjectMaximumScores:{korean:100,math:100,inquiry:100},rankedAreaWeights:[30,25,25,20],finalScoreMultiplier:1000,gradeAdjustmentsAfterFinalMultiplier:true,englishGradeTable:DUKSUNG_ENGLISH,koreanHistoryRequired:true,koreanHistoryGradePoints:DUKSUNG_HISTORY_I,schoolViolencePenaltyRequired:true,calculationVerified:false,sourceUrl:DUKSUNG_SOURCE,verifiedAt:"2026-11-24",note:"수능우수전형Ⅰ. 백분위 상위순 30·25·25·20, 수능 1,000점. 학교폭력 조치사항 감점·결격 입력 미지원으로 최종 검증 보류." },
  { id:"duksung-seoul-na-global-humanities", universityId:"duksung-seoul", universityName:"덕성여자대학교", region:"서울", department:"글로벌융합대학(인문사회)", majorGroup:"인문·사회", group:"나", recruitmentCount:164, scoreMetric:"백분위", subjectMetrics:{korean:"백분위",math:"백분위",inquiry:"백분위"},koreanWeight:30,mathWeight:25,englishWeight:25,inquiryWeight:20,inquirySubjects:1,inquiryAggregation:"best",calculationMode:"normalized-standard-sum",subjectMaximumScores:{korean:100,math:100,inquiry:100},rankedAreaWeights:[30,25,25,20],finalScoreMultiplier:1000,gradeAdjustmentsAfterFinalMultiplier:true,englishGradeTable:DUKSUNG_ENGLISH,koreanHistoryRequired:true,koreanHistoryGradePoints:DUKSUNG_HISTORY_I,schoolViolencePenaltyRequired:true,calculationVerified:false,sourceUrl:DUKSUNG_SOURCE,verifiedAt:"2026-11-24",note:"수능우수전형Ⅰ. 글로벌융합대학 인문사회, 백분위 상위순 30·25·25·20, 수능 1,000점. 학교폭력 조치사항 감점·결격 입력 미지원으로 최종 검증 보류." },
  { id:"duksung-seoul-na-early-childhood", universityId:"duksung-seoul", universityName:"덕성여자대학교", region:"서울", department:"글로벌융합대학(유아교육과)", majorGroup:"교육", group:"나", recruitmentCount:15, scoreMetric:"백분위", subjectMetrics:{korean:"백분위",math:"백분위",inquiry:"백분위"},koreanWeight:30,mathWeight:25,englishWeight:25,inquiryWeight:20,inquirySubjects:1,inquiryAggregation:"best",calculationMode:"normalized-standard-sum",subjectMaximumScores:{korean:100,math:100,inquiry:100},rankedAreaWeights:[30,25,25,20],finalScoreMultiplier:1000,gradeAdjustmentsAfterFinalMultiplier:true,englishGradeTable:DUKSUNG_ENGLISH,koreanHistoryRequired:true,koreanHistoryGradePoints:DUKSUNG_HISTORY_I,schoolViolencePenaltyRequired:true,calculationVerified:false,sourceUrl:DUKSUNG_SOURCE,verifiedAt:"2026-11-24",note:"수능우수전형Ⅰ. 유아교육과, 백분위 상위순 30·25·25·20, 수능 1,000점. 학교폭력 조치사항 감점·결격 입력 미지원으로 최종 검증 보류." },
  { id:"duksung-seoul-na-art", universityId:"duksung-seoul", universityName:"덕성여자대학교", region:"서울", department:"Art & Design대학(미술실기전형)", majorGroup:"예체능·미술", group:"나", recruitmentCount:23, scoreMetric:"백분위", subjectMetrics:{korean:"백분위",math:"백분위",inquiry:"백분위"},koreanWeight:50,mathWeight:50,englishWeight:20,inquiryWeight:20,inquirySubjects:1,inquiryAggregation:"best",calculationMode:"normalized-standard-sum",subjectMaximumScores:{korean:100,math:100,inquiry:100},rankedAreaWeights:[50,50],finalScoreMultiplier:200,gradeAdjustmentsAfterFinalMultiplier:true,englishGradeTable:DUKSUNG_ENGLISH,koreanHistoryRequired:true,koreanHistoryGradePoints:DUKSUNG_HISTORY_ART,schoolViolencePenaltyRequired:true,practicalEvaluationRequired:true,calculationVerified:false,sourceUrl:DUKSUNG_SOURCE,verifiedAt:"2026-11-24",note:"미술실기전형. 수능 200점(전형 20%)과 실기 800점(80%). 국어·수학·영어·탐구 중 상위 2개 영역 각 50% 반영. 실기점수 및 학교폭력 조치사항 미입력으로 최종 점수 산출 보류." },
  { id:"duksung-seoul-na-sports", universityId:"duksung-seoul", universityName:"덕성여자대학교", region:"서울", department:"Art & Design대학(체육실기전형)", majorGroup:"예체능·체육", group:"나", recruitmentCount:23, scoreMetric:"백분위", subjectMetrics:{korean:"백분위",math:"백분위",inquiry:"백분위"},koreanWeight:50,mathWeight:50,englishWeight:20,inquiryWeight:20,inquirySubjects:1,inquiryAggregation:"best",calculationMode:"normalized-standard-sum",subjectMaximumScores:{korean:100,math:100,inquiry:100},rankedAreaWeights:[50,50],finalScoreMultiplier:400,gradeAdjustmentsAfterFinalMultiplier:true,englishGradeTable:DUKSUNG_ENGLISH,koreanHistoryRequired:true,koreanHistoryGradePoints:DUKSUNG_HISTORY_SPORTS,schoolViolencePenaltyRequired:true,practicalEvaluationRequired:true,calculationVerified:false,sourceUrl:DUKSUNG_SOURCE,verifiedAt:"2026-11-24",note:"체육실기전형. 수능 400점(전형 40%)과 실기 600점(60%). 국어·수학·영어·탐구 중 상위 2개 영역 각 50% 반영. 실기점수 및 학교폭력 조치사항 미입력으로 최종 점수 산출 보류." },
  { id:"duksung-seoul-da-free-major", universityId:"duksung-seoul", universityName:"덕성여자대학교", region:"서울", department:"미래인재대학(자유전공학부)", majorGroup:"자율전공", group:"다", recruitmentCount:100, scoreMetric:"백분위", subjectMetrics:{korean:"백분위",math:"백분위",inquiry:"백분위"},koreanWeight:30,mathWeight:25,englishWeight:25,inquiryWeight:20,inquirySubjects:1,inquiryAggregation:"best",calculationMode:"normalized-standard-sum",subjectMaximumScores:{korean:100,math:100,inquiry:100},rankedAreaWeights:[30,25,25,20],finalScoreMultiplier:900,gradeAdjustmentsAfterFinalMultiplier:true,englishGradeTable:DUKSUNG_ENGLISH,koreanHistoryRequired:true,koreanHistoryGradePoints:DUKSUNG_HISTORY_II,studentRecordWeight:10,schoolViolencePenaltyRequired:true,calculationVerified:false,sourceUrl:DUKSUNG_SOURCE,verifiedAt:"2026-11-24",note:"수능우수전형Ⅱ. 수능 900점 + 학생부 교과 100점. 백분위 상위순 30·25·25·20. 학생부 교과 및 학교폭력 조치사항 미입력으로 전체 전형 점수 산출 보류." }
];

// 2027학년도 광운대학교 정시 일반학생전형: 모집요강 p.7 모집단위·인원, p.4~5 수능 반영방법
const KWANGWOON_SOURCE = "https://iphak.kw.ac.kr/mojib/mojib.php?m_type=JEONGSI&m_year=2027";
const KWANGWOON_ENGLISH = { 1:200, 2:198, 3:195, 4:190, 5:182, 6:170, 7:158, 8:146, 9:0 } as const;
const KWANGWOON_HISTORY = { 1:10, 2:10, 3:10, 4:10, 5:9.8, 6:9.6, 7:9.4, 8:9.2, 9:9 } as const;
const KWANGWOON_ROWS = [
  {
    "key": "ga-electronic",
    "department": "전자공학과",
    "group": "가",
    "recruitmentCount": 18,
    "field": "natural"
  },
  {
    "key": "ga-telecom",
    "department": "전자통신공학과",
    "group": "가",
    "recruitmentCount": 5,
    "field": "natural"
  },
  {
    "key": "ga-electronic-convergence",
    "department": "전자융합공학과",
    "group": "가",
    "recruitmentCount": 5,
    "field": "natural"
  },
  {
    "key": "ga-electrical",
    "department": "전기공학과",
    "group": "가",
    "recruitmentCount": 5,
    "field": "natural"
  },
  {
    "key": "ga-electronic-materials",
    "department": "전자재료공학과",
    "group": "가",
    "recruitmentCount": 5,
    "field": "natural"
  },
  {
    "key": "ga-semiconductor-system",
    "department": "반도체시스템공학부 반도체시스템공학전공",
    "group": "가",
    "recruitmentCount": 20,
    "field": "natural"
  },
  {
    "key": "ga-computer-info",
    "department": "컴퓨터정보공학부",
    "group": "가",
    "recruitmentCount": 8,
    "field": "natural"
  },
  {
    "key": "ga-software",
    "department": "소프트웨어학부",
    "group": "가",
    "recruitmentCount": 8,
    "field": "natural"
  },
  {
    "key": "ga-information-convergence",
    "department": "정보융합학부",
    "group": "가",
    "recruitmentCount": 9,
    "field": "info"
  },
  {
    "key": "ga-robot-ai",
    "department": "로봇학부 AI로봇전공",
    "group": "가",
    "recruitmentCount": 26,
    "field": "natural"
  },
  {
    "key": "ga-architecture",
    "department": "건축학과(5년제)",
    "group": "가",
    "recruitmentCount": 12,
    "field": "natural"
  },
  {
    "key": "ga-architecture-engineering",
    "department": "건축공학과",
    "group": "가",
    "recruitmentCount": 6,
    "field": "natural"
  },
  {
    "key": "ga-chemical-engineering",
    "department": "화학공학과",
    "group": "가",
    "recruitmentCount": 9,
    "field": "natural"
  },
  {
    "key": "ga-environment",
    "department": "환경공학과",
    "group": "가",
    "recruitmentCount": 6,
    "field": "natural"
  },
  {
    "key": "ga-math",
    "department": "수학과",
    "group": "가",
    "recruitmentCount": 7,
    "field": "natural"
  },
  {
    "key": "ga-electronic-bio-physics",
    "department": "전자바이오물리학과",
    "group": "가",
    "recruitmentCount": 7,
    "field": "natural"
  },
  {
    "key": "ga-chemistry",
    "department": "화학과",
    "group": "가",
    "recruitmentCount": 8,
    "field": "natural"
  },
  {
    "key": "na-korean",
    "department": "국어국문학과",
    "group": "나",
    "recruitmentCount": 6,
    "field": "humanities"
  },
  {
    "key": "na-english",
    "department": "영어영문학과",
    "group": "나",
    "recruitmentCount": 8,
    "field": "humanities"
  },
  {
    "key": "na-media",
    "department": "미디어커뮤니케이션학부",
    "group": "나",
    "recruitmentCount": 10,
    "field": "humanities"
  },
  {
    "key": "na-industrial-psychology",
    "department": "산업심리학과",
    "group": "나",
    "recruitmentCount": 8,
    "field": "humanities"
  },
  {
    "key": "na-northeast-asian",
    "department": "동북아문화산업학부",
    "group": "나",
    "recruitmentCount": 10,
    "field": "humanities"
  },
  {
    "key": "na-public-admin",
    "department": "행정학과",
    "group": "나",
    "recruitmentCount": 8,
    "field": "humanities"
  },
  {
    "key": "na-law",
    "department": "법학부",
    "group": "나",
    "recruitmentCount": 14,
    "field": "humanities"
  },
  {
    "key": "na-international",
    "department": "국제학부",
    "group": "나",
    "recruitmentCount": 6,
    "field": "humanities"
  },
  {
    "key": "na-business",
    "department": "경영학부 경영학전공",
    "group": "나",
    "recruitmentCount": 18,
    "field": "business"
  },
  {
    "key": "na-bigdata-business",
    "department": "경영학부 빅데이터경영전공",
    "group": "나",
    "recruitmentCount": 14,
    "field": "business"
  },
  {
    "key": "na-trade",
    "department": "국제통상학부",
    "group": "나",
    "recruitmentCount": 9,
    "field": "business"
  },
  {
    "key": "da-sports",
    "department": "스포츠융합과학과",
    "group": "다",
    "recruitmentCount": 22,
    "field": "sports"
  },
  {
    "key": "da-autonomous-natural",
    "department": "자율전공학부(자연)",
    "group": "다",
    "recruitmentCount": 257,
    "field": "natural"
  },
  {
    "key": "da-autonomous-humanities",
    "department": "자율전공학부(인문)",
    "group": "다",
    "recruitmentCount": 146,
    "field": "humanities"
  }
] as const;
const kwangwoonAdmissions2027: RegularAdmission[] = KWANGWOON_ROWS.map((row) => {
  const business = row.field === "business";
  const humanities = row.field === "humanities";
  const sports = row.field === "sports";
  const natural = row.field === "natural";
  const info = row.field === "info";
  const weights = sports
    ? { koreanWeight:40, mathWeight:0, englishWeight:30, inquiryWeight:30 }
    : business
      ? { koreanWeight:30, mathWeight:30, englishWeight:20, inquiryWeight:20 }
      : humanities
        ? { koreanWeight:30, mathWeight:25, englishWeight:20, inquiryWeight:25 }
        : { koreanWeight:20, mathWeight:35, englishWeight:20, inquiryWeight:25 };
  return {
    id: `kwangwoon-seoul-${row.key}`,
    universityId: "kwangwoon-seoul",
    universityName: "광운대학교",
    region: "서울",
    department: row.department,
    majorGroup: sports ? "예체능·체육" : humanities || business ? "인문·사회" : "자연·공학",
    group: row.group,
    recruitmentCount: row.recruitmentCount,
    scoreMetric: "표준점수",
    subjectMetrics: { korean:"표준점수", math:"표준점수", inquiry:"백분위" },
    ...weights,
    inquirySubjects: 2,
    inquiryAggregation: "sum",
    inquiryConversionRequired: true,
    inquiryConversionPending: true,
    koreanHistoryRequired: true,
    englishGradeTable: KWANGWOON_ENGLISH,
    englishMaximumScore: 200,
    koreanHistoryGradePoints: KWANGWOON_HISTORY,
    finalScoreMultiplier: 1000,
    gradeAdjustmentsAfterFinalMultiplier: true,
    mathChoiceBonusRequired: natural && !info,
    mathChoiceBonusRate: natural && !info ? { "미적분":0.03, "기하":0.03 } : undefined,
    inquiryTypeBonusRequired: natural && !info,
    inquiryTypeBonusRate: natural && !info ? { "사탐":0, "과탐":0.03, "직탐":0 } : undefined,
    schoolViolencePenaltyRequired: true,
    schoolViolencePenaltyNote: "일반학생전형 전형총점 1,000점 기준: 1~3호 각 3점, 4~5호 각 30점, 6~7호 각 50점 감점, 8~9호 부적격. 해당 입력·결격 처리가 구현되기 전까지 최종 판정 보류.",
    practicalEvaluationRequired: sports,
    practicalEvaluationNote: sports ? "실기평가 점수 미입력(전형 총점의 30%)" : undefined,
    studentRecordWeight: sports ? 30 : undefined,
    calculationVerified: false,
    sourceUrl: KWANGWOON_SOURCE,
    verifiedAt: "2026-11-24",
    note: sports
      ? "스포츠융합과학과 일반학생전형: 수능40%·학생부30%·실기30%, 국어40·영어30·탐구30(수학 미반영). 탐구 변환점수, 학생부, 실기 및 학교폭력 반영까지 엔진 검증 전 최종 판정 보류."
      : "2027 정시 일반학생전형. 국어·수학 표준점수, 영어 등급별 변환점수, 탐구 2과목 백분위 기반 대학 자체 변환표준점수 합산. 한국사 가산점 반영. 자연계열은 미적분·기하 수학 및 과학탐구 가산점 3%(정보융합학부 제외). 탐구 변환표와 가산 처리, 학교폭력 조치사항 처리 검증 전 최종 판정 보류."
  };
});
const kwangwoonTotals = kwangwoonAdmissions2027.reduce<Record<"가"|"나"|"다",number>>(
  (totals,row) => ({...totals,[row.group]:totals[row.group]+(row.recruitmentCount ?? 0)}),
  {가:0,나:0,다:0},
);
if (kwangwoonAdmissions2027.length !== 31 || kwangwoonTotals.가 !== 164 || kwangwoonTotals.나 !== 111 || kwangwoonTotals.다 !== 425) {
  throw new Error("광운대 2027 일반학생전형 모집단위·군별 인원 합계 검증 실패");
}

// 2027학년도 상명대학교 서울캠퍼스 정시 수능전형: 모집요강 p.6 모집단위·인원, p.31~33 수능 반영방법
const SANGMYUNG_SOURCE = "https://admission.smu.ac.kr/bbs/fileview.php?bbsid=seoul_mojib&file_seq=8635";
const SANGMYUNG_ENGLISH = { 1:100, 2:98, 3:96, 4:94, 5:90, 6:80, 7:60, 8:40, 9:0 } as const;
const SANGMYUNG_HISTORY = { 1:10, 2:10, 3:10, 4:10, 5:9.8, 6:9.6, 7:9.4, 8:9.2, 9:9 } as const;
const SANGMYUNG_ROWS = [
  {
    "key": "free-humanities",
    "department": "자유전공(인문계열)",
    "group": "나",
    "recruitmentCount": 75,
    "field": "humanities"
  },
  {
    "key": "free-science",
    "department": "자유전공(이공계열)",
    "group": "나",
    "recruitmentCount": 54,
    "field": "natural"
  },
  {
    "key": "free-arts",
    "department": "자유전공(예체능계열)",
    "group": "나",
    "recruitmentCount": 11,
    "field": "humanities"
  },
  {
    "key": "history-content",
    "department": "역사콘텐츠전공",
    "group": "나",
    "recruitmentCount": 9,
    "field": "humanities"
  },
  {
    "key": "intellectual-property",
    "department": "지적재산권전공",
    "group": "나",
    "recruitmentCount": 9,
    "field": "humanities"
  },
  {
    "key": "library-information",
    "department": "문헌정보학전공",
    "group": "나",
    "recruitmentCount": 8,
    "field": "humanities"
  },
  {
    "key": "japanese-content",
    "department": "한일문화콘텐츠전공",
    "group": "나",
    "recruitmentCount": 8,
    "field": "humanities"
  },
  {
    "key": "spatial-environment",
    "department": "공간환경학부",
    "group": "나",
    "recruitmentCount": 13,
    "field": "humanities"
  },
  {
    "key": "public-administration",
    "department": "행정학부",
    "group": "나",
    "recruitmentCount": 14,
    "field": "humanities"
  },
  {
    "key": "family-welfare",
    "department": "가족복지학과",
    "group": "나",
    "recruitmentCount": 8,
    "field": "humanities"
  },
  {
    "key": "economics-finance",
    "department": "경제금융학부",
    "group": "나",
    "recruitmentCount": 19,
    "field": "humanities"
  },
  {
    "key": "business",
    "department": "경영학부",
    "group": "나",
    "recruitmentCount": 18,
    "field": "humanities"
  },
  {
    "key": "global-business",
    "department": "글로벌경영학과",
    "group": "나",
    "recruitmentCount": 19,
    "field": "humanities"
  },
  {
    "key": "korean-education",
    "department": "국어교육과",
    "group": "나",
    "recruitmentCount": 21,
    "field": "humanities"
  },
  {
    "key": "english-education",
    "department": "영어교육과",
    "group": "나",
    "recruitmentCount": 16,
    "field": "humanities"
  },
  {
    "key": "education",
    "department": "교육학과",
    "group": "나",
    "recruitmentCount": 13,
    "field": "humanities"
  },
  {
    "key": "math-education",
    "department": "수학교육과",
    "group": "나",
    "recruitmentCount": 15,
    "field": "natural"
  },
  {
    "key": "human-ai",
    "department": "휴먼AI공학전공",
    "group": "나",
    "recruitmentCount": 35,
    "field": "natural"
  },
  {
    "key": "data-science",
    "department": "데이터과학전공",
    "group": "나",
    "recruitmentCount": 21,
    "field": "natural"
  },
  {
    "key": "computer-science",
    "department": "컴퓨터과학전공",
    "group": "나",
    "recruitmentCount": 30,
    "field": "natural"
  },
  {
    "key": "electrical-engineering",
    "department": "전기공학전공",
    "group": "나",
    "recruitmentCount": 10,
    "field": "natural"
  },
  {
    "key": "game",
    "department": "게임전공",
    "group": "나",
    "recruitmentCount": 8,
    "field": "natural"
  },
  {
    "key": "biotechnology",
    "department": "생명공학전공",
    "group": "나",
    "recruitmentCount": 11,
    "field": "natural"
  },
  {
    "key": "chemical-energy",
    "department": "화학에너지공학전공",
    "group": "나",
    "recruitmentCount": 11,
    "field": "natural"
  },
  {
    "key": "chemical-materials",
    "department": "화공신소재전공",
    "group": "나",
    "recruitmentCount": 10,
    "field": "natural"
  },
  {
    "key": "food-nutrition",
    "department": "식품영양학전공",
    "group": "나",
    "recruitmentCount": 7,
    "field": "natural"
  },
  {
    "key": "clothing",
    "department": "의류학과",
    "group": "나",
    "recruitmentCount": 7,
    "field": "natural"
  },
  {
    "key": "animation",
    "department": "애니메이션전공",
    "group": "나",
    "recruitmentCount": 9,
    "field": "natural"
  }
] as const;
const sangmyungAdmissions2027: RegularAdmission[] = SANGMYUNG_ROWS.map((row) => {
  const natural = row.field === "natural";
  const animation = row.key === "animation";
  return {
    id: `sangmyung-seoul-${row.key}`,
    universityId: "sangmyung-seoul",
    universityName: "상명대학교",
    region: "서울",
    department: row.department,
    majorGroup: natural ? "자연·공학" : row.key === "free-arts" ? "자율전공·예체능" : "인문·사회",
    group: "나",
    recruitmentCount: row.recruitmentCount,
    scoreMetric: "백분위",
    subjectMetrics: { korean:"백분위", math:"백분위", inquiry:"백분위" },
    koreanWeight: natural ? 25 : 35,
    mathWeight: natural ? 35 : 25,
    englishWeight: 20,
    inquiryWeight: 20,
    inquirySubjects: 1,
    inquiryAggregation: "best",
    calculationMode: "normalized-standard-sum",
    subjectMaximumScores: { korean:100, math:100, inquiry:100 },
    finalScoreMultiplier: 1000,
    gradeAdjustmentsAfterFinalMultiplier: true,
    englishGradeTable: SANGMYUNG_ENGLISH,
    koreanHistoryRequired: true,
    koreanHistoryGradePoints: SANGMYUNG_HISTORY,
    mathChoiceBonusRequired: natural && !animation,
    mathChoiceBonusRate: natural && !animation ? { "미적분":0.10, "기하":0.10 } : undefined,
    inquiryTypeBonusRequired: natural && !animation,
    inquiryTypeBonusRate: natural && !animation ? { "사탐":0, "과탐":0.05, "직탐":0 } : undefined,
    schoolViolencePenaltyRequired: true,
    schoolViolencePenaltyNote: "수능전형 총점 1,000점 기준 누적 감점: 1~4호 감점 없음, 5~7호 각 5점, 8~9호 각 10점. 조치 건수별 누적 감점 및 결격 처리 입력 미지원으로 최종 판정 보류.",
    calculationVerified: false,
    sourceUrl: SANGMYUNG_SOURCE,
    verifiedAt: "2026-11-24",
    note: "2027학년도 상명대 서울캠퍼스 수능전형. 국어·수학·탐구 백분위와 영어 등급 환산점수 반영, 탐구 상위 1과목, 한국사 가산점. 자연계열은 미적분·기하 수학 10%, 과학탐구 5% 가산(애니메이션전공 제외). 학교폭력 누적 감점까지 계산엔진 검증 전 최종 판정 보류."
  };
});
if (sangmyungAdmissions2027.length !== 28 || sangmyungAdmissions2027.reduce((sum,row)=>sum+(row.recruitmentCount ?? 0),0) !== 489) {
  throw new Error("상명대 2027 서울캠퍼스 수능전형 모집단위·인원 검증 실패");
}

// 2027학년도 성신여자대학교 정시 일반학생전형: 공식 모집요강 p.8~9, p.20~21, p.44, p.48
const SUNGSHIN_SOURCE = "https://ipsi.sungshin.ac.kr/bbs/fileview.php?bbsid=guideline&file_seq=2989";
const SUNGSHIN_ENGLISH = { 1:100, 2:97, 3:94, 4:85, 5:60, 6:40, 7:25, 8:10, 9:0 } as const;
const SUNGSHIN_HISTORY = { 1:2, 2:1.5, 3:1, 4:0.5, 5:0, 6:0, 7:0, 8:0, 9:0 } as const;
const SUNGSHIN_ROWS = [
  {
    "key": "ga-media-video",
    "department": "미디어영상연기학과",
    "group": "가",
    "recruitmentCount": 7,
    "field": "p30"
  },
  {
    "key": "ga-modern-music",
    "department": "현대실용음악학과",
    "group": "가",
    "recruitmentCount": 9,
    "field": "p55"
  },
  {
    "key": "ga-math-fintech",
    "department": "수리통계데이터사이언스학부 수학·핀테크전공",
    "group": "가",
    "recruitmentCount": 8,
    "field": "natural"
  },
  {
    "key": "ga-stats-bigdata",
    "department": "수리통계데이터사이언스학부 통계학·빅데이터사이언스전공",
    "group": "가",
    "recruitmentCount": 8,
    "field": "natural"
  },
  {
    "key": "ga-chem-energy",
    "department": "화학·에너지융합학부",
    "group": "가",
    "recruitmentCount": 5,
    "field": "natural"
  },
  {
    "key": "ga-biohealth",
    "department": "바이오헬스융합학부",
    "group": "가",
    "recruitmentCount": 7,
    "field": "natural"
  },
  {
    "key": "ga-bio-drug",
    "department": "바이오신약의과학부",
    "group": "가",
    "recruitmentCount": 16,
    "field": "natural"
  },
  {
    "key": "ga-ai",
    "department": "AI융합학과",
    "group": "가",
    "recruitmentCount": 15,
    "field": "ai"
  },
  {
    "key": "ga-ai-semiconductor",
    "department": "융합AI반도체공학과",
    "group": "가",
    "recruitmentCount": 8,
    "field": "ai"
  },
  {
    "key": "ga-nursing-human",
    "department": "간호학과(인문)",
    "group": "가",
    "recruitmentCount": 11,
    "field": "nursing"
  },
  {
    "key": "ga-nursing-natural",
    "department": "간호학과(자연)",
    "group": "가",
    "recruitmentCount": 14,
    "field": "nursing"
  },
  {
    "key": "ga-sports-leisure",
    "department": "스포츠과학부(스포츠레저전공)",
    "group": "가",
    "recruitmentCount": 25,
    "field": "p60"
  },
  {
    "key": "ga-sports-rehab",
    "department": "스포츠과학부(운동재활전공)",
    "group": "가",
    "recruitmentCount": 25,
    "field": "p60"
  },
  {
    "key": "ga-education",
    "department": "교육학과",
    "group": "가",
    "recruitmentCount": 6,
    "field": "education"
  },
  {
    "key": "ga-social-education",
    "department": "사회교육과",
    "group": "가",
    "recruitmentCount": 6,
    "field": "education"
  },
  {
    "key": "ga-ethics-education",
    "department": "윤리교육과",
    "group": "가",
    "recruitmentCount": 6,
    "field": "education"
  },
  {
    "key": "ga-classical-education",
    "department": "한문교육과",
    "group": "가",
    "recruitmentCount": 6,
    "field": "education"
  },
  {
    "key": "ga-early-childhood",
    "department": "유아교육과",
    "group": "가",
    "recruitmentCount": 7,
    "field": "education"
  },
  {
    "key": "ga-oriental-painting",
    "department": "동양화과",
    "group": "가",
    "recruitmentCount": 7,
    "field": "p40"
  },
  {
    "key": "ga-western-painting",
    "department": "서양화과",
    "group": "가",
    "recruitmentCount": 10,
    "field": "p40"
  },
  {
    "key": "ga-sculpture",
    "department": "조소과",
    "group": "가",
    "recruitmentCount": 7,
    "field": "p40"
  },
  {
    "key": "ga-vocal",
    "department": "성악과",
    "group": "가",
    "recruitmentCount": 8,
    "field": "p30"
  },
  {
    "key": "ga-composition",
    "department": "작곡과",
    "group": "가",
    "recruitmentCount": 6,
    "field": "p55"
  },
  {
    "key": "ga-free",
    "department": "창의융합학부(자유전공)",
    "group": "가",
    "recruitmentCount": 184,
    "field": "free"
  },
  {
    "key": "na-korean",
    "department": "국어국문학과",
    "group": "나",
    "recruitmentCount": 5,
    "field": "humanities"
  },
  {
    "key": "na-english",
    "department": "영어영문학과",
    "group": "나",
    "recruitmentCount": 8,
    "field": "humanities"
  },
  {
    "key": "na-german",
    "department": "독일어문·문화학과",
    "group": "나",
    "recruitmentCount": 4,
    "field": "humanities"
  },
  {
    "key": "na-french",
    "department": "프랑스어문·문화학과",
    "group": "나",
    "recruitmentCount": 4,
    "field": "humanities"
  },
  {
    "key": "na-japanese",
    "department": "일본어문·문화학과",
    "group": "나",
    "recruitmentCount": 6,
    "field": "humanities"
  },
  {
    "key": "na-chinese",
    "department": "중국어문·문화학과",
    "group": "나",
    "recruitmentCount": 6,
    "field": "humanities"
  },
  {
    "key": "na-history",
    "department": "사학과",
    "group": "나",
    "recruitmentCount": 4,
    "field": "humanities"
  },
  {
    "key": "na-culture-art-management",
    "department": "문화예술경영학과",
    "group": "나",
    "recruitmentCount": 4,
    "field": "humanities"
  },
  {
    "key": "na-politics",
    "department": "정치외교학과",
    "group": "나",
    "recruitmentCount": 5,
    "field": "social"
  },
  {
    "key": "na-psychology",
    "department": "심리학과",
    "group": "나",
    "recruitmentCount": 6,
    "field": "social"
  },
  {
    "key": "na-geography",
    "department": "지리학과",
    "group": "나",
    "recruitmentCount": 4,
    "field": "social"
  },
  {
    "key": "na-economics",
    "department": "경제학과",
    "group": "나",
    "recruitmentCount": 8,
    "field": "social"
  },
  {
    "key": "na-media",
    "department": "미디어커뮤니케이션학과",
    "group": "나",
    "recruitmentCount": 6,
    "field": "social"
  },
  {
    "key": "na-business",
    "department": "경영학과",
    "group": "나",
    "recruitmentCount": 17,
    "field": "social"
  },
  {
    "key": "na-social-welfare",
    "department": "사회복지학과",
    "group": "나",
    "recruitmentCount": 6,
    "field": "social"
  },
  {
    "key": "na-law",
    "department": "법학부",
    "group": "나",
    "recruitmentCount": 15,
    "field": "social"
  },
  {
    "key": "na-clean-materials",
    "department": "청정신소재공학과",
    "group": "나",
    "recruitmentCount": 8,
    "field": "engineering"
  },
  {
    "key": "na-biofood",
    "department": "바이오식품공학과",
    "group": "나",
    "recruitmentCount": 4,
    "field": "engineering"
  },
  {
    "key": "na-computer",
    "department": "컴퓨터공학과",
    "group": "나",
    "recruitmentCount": 8,
    "field": "engineering"
  },
  {
    "key": "na-security",
    "department": "융합보안공학과",
    "group": "나",
    "recruitmentCount": 12,
    "field": "engineering"
  },
  {
    "key": "na-service-design",
    "department": "서비스디자인공학과",
    "group": "나",
    "recruitmentCount": 8,
    "field": "engineering"
  },
  {
    "key": "na-clothing",
    "department": "의류산업학과",
    "group": "나",
    "recruitmentCount": 7,
    "field": "social"
  },
  {
    "key": "na-consumer",
    "department": "소비자산업학과",
    "group": "나",
    "recruitmentCount": 6,
    "field": "social"
  },
  {
    "key": "na-craft",
    "department": "공예과",
    "group": "나",
    "recruitmentCount": 20,
    "field": "p55"
  },
  {
    "key": "na-instrumental",
    "department": "기악과",
    "group": "나",
    "recruitmentCount": 22,
    "field": "p30"
  },
  {
    "key": "na-free-advanced",
    "department": "창의융합학부(첨단분야전공)",
    "group": "나",
    "recruitmentCount": 71,
    "field": "naturalAdvanced"
  },
  {
    "key": "da-design",
    "department": "디자인과",
    "group": "다",
    "recruitmentCount": 36,
    "field": "p55"
  }
] as const;
function sungshinWeights(field: string): readonly [number,number,number,number] {
  if (field === "free") return [30,30,20,20];
  if (field === "natural" || field === "naturalAdvanced" || field === "nursing") return [20,30,20,30];
  if (field === "ai") return [10,35,30,25];
  if (field === "education") return [30,20,20,30];
  if (field === "humanities") return [30,20,30,20];
  if (field === "social") return [30,25,20,25];
  if (field === "engineering") return [20,30,20,30];
  return [25,25,25,25];
}
const sungshinAdmissions2027: RegularAdmission[] = SUNGSHIN_ROWS.map((row) => {
  const practical = row.field.startsWith("p");
  const csatShare = practical ? Number(row.field.slice(1)) : 100;
  const scienceBonus = row.field === "natural" || row.field === "ai" || row.field === "engineering";
  const [koreanWeight,mathWeight,englishWeight,inquiryWeight] = sungshinWeights(row.field);
  const majorGroup = practical
    ? row.field === "p60" ? "예체능·체육" : "예체능"
    : row.field === "education" ? "교육" : ["natural","naturalAdvanced","ai","engineering","nursing"].includes(row.field) ? "자연·공학" : "인문·사회";
  return {
    id: `sungshin-seoul-${row.key}`,
    universityId: "sungshin-seoul",
    universityName: "성신여자대학교",
    region: "서울",
    department: row.department,
    majorGroup,
    group: row.group,
    recruitmentCount: row.recruitmentCount,
    scoreMetric: "백분위",
    subjectMetrics: { korean:"백분위", math:"백분위", inquiry:"백분위" },
    koreanWeight, mathWeight, englishWeight, inquiryWeight,
    inquirySubjects: 2,
    inquiryAggregation: "mean",
    calculationMode: "normalized-standard-sum",
    subjectMaximumScores: { korean:100, math:100, inquiry:100 },
    topAreaWeights: practical ? { areas:["korean","math","english","inquiry"], count:3, weight:100/3 } : undefined,
    finalScoreMultiplier: practical ? csatShare * 5 : 500,
    gradeAdjustmentsAfterFinalMultiplier: true,
    englishGradeTable: SUNGSHIN_ENGLISH,
    koreanHistoryRequired: true,
    koreanHistoryGradePoints: SUNGSHIN_HISTORY,
    inquiryTopSubjectBonusRate: scienceBonus ? 0.10 : undefined,
    inquiryTopSubjectBonusType: scienceBonus ? "과탐" : undefined,
    practicalEvaluationRequired: practical,
    practicalEvaluationNote: practical ? `실기평가 점수 미입력(수능 ${csatShare}%, 실기 ${100-csatShare}%)` : undefined,
    schoolViolencePenaltyRequired: true,
    schoolViolencePenaltyNote: "일반학생전형: 학교폭력 1호 3점, 2호 6점, 3호 9점, 4호 12점, 5호 15점, 6호 20점 감점, 7~9호 불합격. 조치사항 입력 전 최종 판정 보류.",
    calculationVerified: false,
    sourceUrl: SUNGSHIN_SOURCE,
    verifiedAt: "2026-11-24",
    note: practical
      ? `2027 정시 일반학생전형 실기 모집단위. 수능 ${csatShare}%와 실기 ${100-csatShare}% 반영, 수능은 국어·수학·영어·탐구 중 상위 3개 영역 각 1/3. 실기 점수 미입력으로 판정 보류.`
      : "2027 정시 일반학생전형 수능100%. 국어·수학·탐구 백분위, 영어 등급별 백분위 환산, 탐구 2과목 평균, 한국사 가산점. 지정영역 응시자격·과탐 상위 1과목 10% 가산 및 학교폭력 조치사항까지 검증 전 판정 보류."
  };
});
if (sungshinAdmissions2027.length !== 51 || sungshinAdmissions2027.reduce((sum,row)=>sum+(row.recruitmentCount ?? 0),0) !== 721) {
  throw new Error("성신여대 2027 일반학생전형 모집단위·인원 검증 실패");
}

// 2027학년도 동덕여자대학교 정시 수능우수자전형: 공식 모집요강 p.8, p.25~26
const DONGDUK_SOURCE = "https://ipsi.dongduk.ac.kr/ipsi/contents/fxdtime-viewer.do?gotoMenuNo=fxdtime-viewer";
const DONGDUK_ENGLISH = { 1:100, 2:99, 3:96, 4:85, 5:70, 6:55, 7:40, 8:20, 9:0 } as const;
const DONGDUK_HISTORY = { 1:3, 2:3, 3:3, 4:3, 5:2.5, 6:2, 7:1.5, 8:1, 9:0.5 } as const;
const DONGDUK_ROWS = [
  {
    "key": "ga-autonomous",
    "department": "자율전공학부",
    "group": "가",
    "recruitmentCount": 93,
    "field": "standard"
  },
  {
    "key": "ga-data-science",
    "department": "데이터사이언스전공",
    "group": "가",
    "recruitmentCount": 30,
    "field": "standard"
  },
  {
    "key": "ga-pharmacy",
    "department": "약학과",
    "group": "가",
    "recruitmentCount": 20,
    "field": "pharmacy"
  },
  {
    "key": "ga-curator",
    "department": "큐레이터학전공",
    "group": "가",
    "recruitmentCount": 12,
    "field": "standard"
  },
  {
    "key": "ga-entrepreneurship",
    "department": "앙트러프러너십전공",
    "group": "가",
    "recruitmentCount": 5,
    "field": "standard"
  },
  {
    "key": "na-humanities-social-culture",
    "department": "인문사회문화학부",
    "group": "나",
    "recruitmentCount": 125,
    "field": "standard"
  },
  {
    "key": "na-natural-info-convergence",
    "department": "자연정보융합학부",
    "group": "나",
    "recruitmentCount": 43,
    "field": "standard"
  }
] as const;
const dongdukAdmissions2027: RegularAdmission[] = DONGDUK_ROWS.map((row) => {
  const pharmacy = row.field === "pharmacy";
  const majorGroup = pharmacy ? "의약·보건"
    : row.key.includes("data-science") || row.key.includes("natural-info") ? "자연·공학"
    : row.key.includes("entrepreneurship") ? "경영·경제" : "인문·사회";
  return {
    id: `dongduk-seoul-${row.key}`,
    universityId: "dongduk-seoul",
    universityName: "동덕여자대학교",
    region: "서울",
    department: row.department,
    majorGroup,
    group: row.group,
    recruitmentCount: row.recruitmentCount,
    scoreMetric: "백분위",
    subjectMetrics: { korean:"백분위", math:"백분위", inquiry:"백분위" },
    koreanWeight: pharmacy ? 25 : 35,
    mathWeight: pharmacy ? 35 : 25,
    englishWeight: 20,
    inquiryWeight: 20,
    languageMathMode: pharmacy ? undefined : "고득점 우선",
    inquirySubjects: pharmacy ? 2 : 1,
    inquiryAggregation: pharmacy ? "mean" : "best",
    inquiryTypeBonusRequired: pharmacy,
    inquiryTypeBonusRate: pharmacy ? { "사탐":0, "과탐":0, "직탐":0 } : undefined,
    inquiryBonusRequiresSameType: pharmacy ? "과탐" : undefined,
    mathChoiceBonusRequired: pharmacy,
    mathChoiceBonusRate: pharmacy ? { "미적분":0, "기하":0 } : undefined,
    calculationMode: "normalized-standard-sum",
    subjectMaximumScores: { korean:100, math:100, inquiry:100 },
    finalScoreMultiplier: 1000,
    gradeAdjustmentsAfterFinalMultiplier: true,
    englishGradeTable: DONGDUK_ENGLISH,
    koreanHistoryRequired: true,
    koreanHistoryGradePoints: DONGDUK_HISTORY,
    schoolViolencePenaltyRequired: true,
    schoolViolencePenaltyNote: "전 전형 총점 감점: 1~3호 각 10점, 4~5호 각 30점, 6~7호 각 100점, 8호 200점, 9호 400점. 조치사항 입력 전 최종 판정 보류.",
    calculationVerified: false,
    sourceUrl: DONGDUK_SOURCE,
    verifiedAt: "2026-11-24",
    note: pharmacy
      ? "2027 수능우수자전형 약학과: 국어25·수학35·영어20·탐구20, 수학 미적분/기하 필수, 과학탐구 2과목 필수. 선택과목·탐구 응시자격과 학교폭력 감점 검증 전 판정 보류."
      : "2027 수능우수자전형. 국어·수학 중 우수 영역 35%, 나머지 25%, 영어20%, 탐구 상위 1과목20%. 수학·국어 중 1개 미응시 및 탐구 미응시 부적격, 한국사 가산점과 학교폭력 감점 검증 전 판정 보류."
  };
});
if (dongdukAdmissions2027.length !== 7 || dongdukAdmissions2027.reduce((sum,row)=>sum+(row.recruitmentCount ?? 0),0) !== 328) {
  throw new Error("동덕여대 2027 수능우수자전형 모집단위·인원 검증 실패");
}

// 2027학년도 명지대학교 인문캠퍼스(서울) 정시 수능 일반전형: 공식 모집요강 p.16, p.44~47
const MYONGJI_SOURCE = "https://iphak.mju.ac.kr/_common/new_download_file.php?file_no=10963&menu=boardfile";
const MYONGJI_ENGLISH = { 1:100, 2:98, 3:96, 4:90, 5:80, 6:60, 7:40, 8:20, 9:0 } as const;
const MYONGJI_HISTORY = { 1:3, 2:2.8, 3:2.6, 4:2.4, 5:2.2, 6:2, 7:1.8, 8:1.6, 9:1.4 } as const;
const MYONGJI_ROWS = [
  {
    "key": "ga-autonomous-humanities",
    "department": "자율전공학부(인문)",
    "group": "가",
    "recruitmentCount": 150,
    "field": "humanities"
  },
  {
    "key": "na-humanities-college",
    "department": "인문대학[광역]",
    "group": "나",
    "recruitmentCount": 85,
    "field": "humanities"
  },
  {
    "key": "na-social-sciences",
    "department": "사회과학대학[광역]",
    "group": "나",
    "recruitmentCount": 88,
    "field": "humanities"
  },
  {
    "key": "na-media-humanlife",
    "department": "미디어·휴먼라이프대학[광역]",
    "group": "나",
    "recruitmentCount": 23,
    "field": "humanities"
  },
  {
    "key": "da-business-college",
    "department": "경영대학[광역]",
    "group": "다",
    "recruitmentCount": 57,
    "field": "business"
  },
  {
    "key": "da-ai-software-college",
    "department": "인공지능·소프트웨어융합대학[광역]",
    "group": "다",
    "recruitmentCount": 25,
    "field": "natural"
  }
] as const;
const myongjiAdmissions2027: RegularAdmission[] = MYONGJI_ROWS.map((row) => {
  const business = row.field === "business";
  const natural = row.field === "natural";
  return {
    id: `myongji-seoul-${row.key}`,
    universityId: "myongji-seoul",
    universityName: "명지대학교",
    region: "서울",
    department: row.department,
    majorGroup: business ? "경영·경제" : natural ? "자연·공학" : "인문·사회",
    group: row.group,
    recruitmentCount: row.recruitmentCount,
    scoreMetric: "백분위",
    subjectMetrics: { korean:"백분위", math:"백분위", inquiry:"백분위" },
    koreanWeight: business ? 30 : natural ? 25 : 35,
    mathWeight: business ? 30 : natural ? 35 : 25,
    englishWeight: 20,
    inquiryWeight: 20,
    inquirySubjects: 1,
    inquiryAggregation: "best",
    inquiryTypeBonusRequired: natural,
    inquiryTypeBonusRate: natural ? { "사탐":0, "과탐":0.10, "직탐":0 } : undefined,
    calculationMode: "normalized-standard-sum",
    subjectMaximumScores: { korean:100, math:100, inquiry:100 },
    finalScoreMultiplier: 1000,
    gradeAdjustmentsAfterFinalMultiplier: true,
    englishGradeTable: MYONGJI_ENGLISH,
    koreanHistoryRequired: true,
    koreanHistoryGradePoints: MYONGJI_HISTORY,
    schoolViolencePenaltyRequired: true,
    schoolViolencePenaltyNote: "수능 일반전형: 1~3호 감점 없음, 4~5호 각 150점, 6~7호 각 300점 감점, 8~9호 결격 처리. 조치사항 입력 전 최종 판정 보류.",
    calculationVerified: false,
    sourceUrl: MYONGJI_SOURCE,
    verifiedAt: "2026-11-24",
    note: natural
      ? "2027 정시 수능 일반전형 명지대 인문캠퍼스(서울) 자연공학계열. 국어25·수학35·영어20·탐구 상위1과목20, 과탐 선택 시 탐구 백분위 반영점수 10% 가산. 학교폭력 조치사항 입력·가산 검증 전 판정 보류."
      : business
        ? "2027 정시 수능 일반전형 명지대 인문캠퍼스(서울) 경영대학. 국어30·수학30·영어20·탐구 상위1과목20, 한국사 가산점. 학교폭력 조치사항 입력 전 판정 보류."
        : "2027 정시 수능 일반전형 명지대 인문캠퍼스(서울) 인문사회계열(경영대학 외). 국어35·수학25·영어20·탐구 상위1과목20, 한국사 가산점. 학교폭력 조치사항 입력 전 판정 보류."
  };
});
if (myongjiAdmissions2027.length !== 6 || myongjiAdmissions2027.reduce((sum,row)=>sum+(row.recruitmentCount ?? 0),0) !== 428) {
  throw new Error("명지대 서울캠퍼스 2027 일반전형 모집단위·인원 검증 실패");
}

export const regularAdmissions2027SeoulExtra: RegularAdmission[] = [
  ...kwangwoonAdmissions2027,
  ...myongjiAdmissions2027,
  ...sangmyungAdmissions2027,
  ...sungshinAdmissions2027,
  ...duksungAdmissions2027,
  ...dongdukAdmissions2027,

];
