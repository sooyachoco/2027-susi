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
  { id:"dukseong-seoul-ga-science-technology", universityId:"dukseong-seoul", universityName:"덕성여자대학교", region:"서울", department:"과학기술대학", majorGroup:"자연·공학", group:"가", recruitmentCount:84, scoreMetric:"백분위", subjectMetrics:{korean:"백분위",math:"백분위",inquiry:"백분위"}, koreanWeight:30,mathWeight:25,englishWeight:25,inquiryWeight:20,inquirySubjects:1,inquiryAggregation:"best",calculationMode:"normalized-standard-sum",subjectMaximumScores:{korean:100,math:100,inquiry:100},rankedAreaWeights:[30,25,25,20],finalScoreMultiplier:1000,gradeAdjustmentsAfterFinalMultiplier:true,englishGradeTable:DUKSUNG_ENGLISH,koreanHistoryRequired:true,koreanHistoryGradePoints:DUKSUNG_HISTORY_I,schoolViolencePenaltyRequired:true,schoolViolencePenaltyNote:"학교폭력 1~2호 감점 없음, 3호 50점, 4호 100점, 5호 200점, 6호 300점, 7호 400점 감점, 8~9호 결격(최종환산점수 1,000점 기준)",calculationVerified:false,sourceUrl:DUKSUNG_SOURCE,verifiedAt:"2026-11-24",note:"수능우수전형Ⅰ. 국어·수학·영어·탐구(상위1) 백분위 상위순 30·25·25·20, 수능 1,000점. 학교폭력 조치사항 감점·결격 입력 미지원으로 최종 검증 보류." },
  { id:"dukseong-seoul-ga-pharmacy", universityId:"dukseong-seoul", universityName:"덕성여자대학교", region:"서울", department:"약학대학(약학과)", majorGroup:"약학", group:"가", recruitmentCount:30, scoreMetric:"백분위", subjectMetrics:{korean:"백분위",math:"백분위",inquiry:"백분위"}, koreanWeight:25,mathWeight:30,englishWeight:20,inquiryWeight:25,inquirySubjects:2,inquiryAggregation:"mean",calculationMode:"normalized-standard-sum",subjectMaximumScores:{korean:100,math:100,inquiry:100},finalScoreMultiplier:1000,gradeAdjustmentsAfterFinalMultiplier:true,englishGradeTable:DUKSUNG_ENGLISH,koreanHistoryRequired:true,koreanHistoryGradePoints:DUKSUNG_HISTORY_I,inquiryTypeBonusRequired:true,inquiryTypeBonusRate:{사탐:0,과탐:0.2,직탐:0},inquiryBonusRequiresSameType:"과탐",schoolViolencePenaltyRequired:true,calculationVerified:false,sourceUrl:DUKSUNG_SOURCE,verifiedAt:"2026-11-24",note:"수능우수전형Ⅰ. 국어25·수학30·영어20·탐구2과목 평균25. 과학탐구 2과목 응시 시 탐구 환산점수 20% 가산. 학교폭력 조치사항 감점·결격 입력 미지원으로 최종 검증 보류." },
  { id:"dukseong-seoul-ga-virtual-reality", universityId:"dukseong-seoul", universityName:"덕성여자대학교", region:"서울", department:"미래인재대학(가상현실융합학과)", majorGroup:"자연·공학", group:"가", recruitmentCount:15, scoreMetric:"백분위", subjectMetrics:{korean:"백분위",math:"백분위",inquiry:"백분위"},koreanWeight:30,mathWeight:25,englishWeight:25,inquiryWeight:20,inquirySubjects:1,inquiryAggregation:"best",calculationMode:"normalized-standard-sum",subjectMaximumScores:{korean:100,math:100,inquiry:100},rankedAreaWeights:[30,25,25,20],finalScoreMultiplier:1000,gradeAdjustmentsAfterFinalMultiplier:true,englishGradeTable:DUKSUNG_ENGLISH,koreanHistoryRequired:true,koreanHistoryGradePoints:DUKSUNG_HISTORY_I,schoolViolencePenaltyRequired:true,calculationVerified:false,sourceUrl:DUKSUNG_SOURCE,verifiedAt:"2026-11-24",note:"수능우수전형Ⅰ. 백분위 상위순 30·25·25·20, 수능 1,000점. 학교폭력 조치사항 감점·결격 입력 미지원으로 최종 검증 보류." },
  { id:"dukseong-seoul-ga-data-science", universityId:"dukseong-seoul", universityName:"덕성여자대학교", region:"서울", department:"미래인재대학(데이터사이언스학과)", majorGroup:"자연·공학", group:"가", recruitmentCount:15, scoreMetric:"백분위", subjectMetrics:{korean:"백분위",math:"백분위",inquiry:"백분위"},koreanWeight:30,mathWeight:25,englishWeight:25,inquiryWeight:20,inquirySubjects:1,inquiryAggregation:"best",calculationMode:"normalized-standard-sum",subjectMaximumScores:{korean:100,math:100,inquiry:100},rankedAreaWeights:[30,25,25,20],finalScoreMultiplier:1000,gradeAdjustmentsAfterFinalMultiplier:true,englishGradeTable:DUKSUNG_ENGLISH,koreanHistoryRequired:true,koreanHistoryGradePoints:DUKSUNG_HISTORY_I,schoolViolencePenaltyRequired:true,calculationVerified:false,sourceUrl:DUKSUNG_SOURCE,verifiedAt:"2026-11-24",note:"수능우수전형Ⅰ. 백분위 상위순 30·25·25·20, 수능 1,000점. 학교폭력 조치사항 감점·결격 입력 미지원으로 최종 검증 보류." },
  { id:"dukseong-seoul-ga-ai-drug", universityId:"dukseong-seoul", universityName:"덕성여자대학교", region:"서울", department:"미래인재대학(AI신약학과)", majorGroup:"자연·공학", group:"가", recruitmentCount:15, scoreMetric:"백분위", subjectMetrics:{korean:"백분위",math:"백분위",inquiry:"백분위"},koreanWeight:30,mathWeight:25,englishWeight:25,inquiryWeight:20,inquirySubjects:1,inquiryAggregation:"best",calculationMode:"normalized-standard-sum",subjectMaximumScores:{korean:100,math:100,inquiry:100},rankedAreaWeights:[30,25,25,20],finalScoreMultiplier:1000,gradeAdjustmentsAfterFinalMultiplier:true,englishGradeTable:DUKSUNG_ENGLISH,koreanHistoryRequired:true,koreanHistoryGradePoints:DUKSUNG_HISTORY_I,schoolViolencePenaltyRequired:true,calculationVerified:false,sourceUrl:DUKSUNG_SOURCE,verifiedAt:"2026-11-24",note:"수능우수전형Ⅰ. 백분위 상위순 30·25·25·20, 수능 1,000점. 학교폭력 조치사항 감점·결격 입력 미지원으로 최종 검증 보류." },
  { id:"dukseong-seoul-na-global-humanities", universityId:"dukseong-seoul", universityName:"덕성여자대학교", region:"서울", department:"글로벌융합대학(인문사회)", majorGroup:"인문·사회", group:"나", recruitmentCount:164, scoreMetric:"백분위", subjectMetrics:{korean:"백분위",math:"백분위",inquiry:"백분위"},koreanWeight:30,mathWeight:25,englishWeight:25,inquiryWeight:20,inquirySubjects:1,inquiryAggregation:"best",calculationMode:"normalized-standard-sum",subjectMaximumScores:{korean:100,math:100,inquiry:100},rankedAreaWeights:[30,25,25,20],finalScoreMultiplier:1000,gradeAdjustmentsAfterFinalMultiplier:true,englishGradeTable:DUKSUNG_ENGLISH,koreanHistoryRequired:true,koreanHistoryGradePoints:DUKSUNG_HISTORY_I,schoolViolencePenaltyRequired:true,calculationVerified:false,sourceUrl:DUKSUNG_SOURCE,verifiedAt:"2026-11-24",note:"수능우수전형Ⅰ. 글로벌융합대학 인문사회, 백분위 상위순 30·25·25·20, 수능 1,000점. 학교폭력 조치사항 감점·결격 입력 미지원으로 최종 검증 보류." },
  { id:"dukseong-seoul-na-early-childhood", universityId:"dukseong-seoul", universityName:"덕성여자대학교", region:"서울", department:"글로벌융합대학(유아교육과)", majorGroup:"교육", group:"나", recruitmentCount:15, scoreMetric:"백분위", subjectMetrics:{korean:"백분위",math:"백분위",inquiry:"백분위"},koreanWeight:30,mathWeight:25,englishWeight:25,inquiryWeight:20,inquirySubjects:1,inquiryAggregation:"best",calculationMode:"normalized-standard-sum",subjectMaximumScores:{korean:100,math:100,inquiry:100},rankedAreaWeights:[30,25,25,20],finalScoreMultiplier:1000,gradeAdjustmentsAfterFinalMultiplier:true,englishGradeTable:DUKSUNG_ENGLISH,koreanHistoryRequired:true,koreanHistoryGradePoints:DUKSUNG_HISTORY_I,schoolViolencePenaltyRequired:true,calculationVerified:false,sourceUrl:DUKSUNG_SOURCE,verifiedAt:"2026-11-24",note:"수능우수전형Ⅰ. 유아교육과, 백분위 상위순 30·25·25·20, 수능 1,000점. 학교폭력 조치사항 감점·결격 입력 미지원으로 최종 검증 보류." },
  { id:"dukseong-seoul-na-art", universityId:"dukseong-seoul", universityName:"덕성여자대학교", region:"서울", department:"Art & Design대학(미술실기전형)", majorGroup:"예체능·미술", group:"나", recruitmentCount:23, scoreMetric:"백분위", subjectMetrics:{korean:"백분위",math:"백분위",inquiry:"백분위"},koreanWeight:50,mathWeight:50,englishWeight:20,inquiryWeight:20,inquirySubjects:1,inquiryAggregation:"best",calculationMode:"normalized-standard-sum",subjectMaximumScores:{korean:100,math:100,inquiry:100},rankedAreaWeights:[50,50],finalScoreMultiplier:200,gradeAdjustmentsAfterFinalMultiplier:true,englishGradeTable:DUKSUNG_ENGLISH,koreanHistoryRequired:true,koreanHistoryGradePoints:DUKSUNG_HISTORY_ART,schoolViolencePenaltyRequired:true,practicalEvaluationRequired:true,calculationVerified:false,sourceUrl:DUKSUNG_SOURCE,verifiedAt:"2026-11-24",note:"미술실기전형. 수능 200점(전형 20%)과 실기 800점(80%). 국어·수학·영어·탐구 중 상위 2개 영역 각 50% 반영. 실기점수 및 학교폭력 조치사항 미입력으로 최종 점수 산출 보류." },
  { id:"dukseong-seoul-na-sports", universityId:"dukseong-seoul", universityName:"덕성여자대학교", region:"서울", department:"Art & Design대학(체육실기전형)", majorGroup:"예체능·체육", group:"나", recruitmentCount:23, scoreMetric:"백분위", subjectMetrics:{korean:"백분위",math:"백분위",inquiry:"백분위"},koreanWeight:50,mathWeight:50,englishWeight:20,inquiryWeight:20,inquirySubjects:1,inquiryAggregation:"best",calculationMode:"normalized-standard-sum",subjectMaximumScores:{korean:100,math:100,inquiry:100},rankedAreaWeights:[50,50],finalScoreMultiplier:400,gradeAdjustmentsAfterFinalMultiplier:true,englishGradeTable:DUKSUNG_ENGLISH,koreanHistoryRequired:true,koreanHistoryGradePoints:DUKSUNG_HISTORY_SPORTS,schoolViolencePenaltyRequired:true,practicalEvaluationRequired:true,calculationVerified:false,sourceUrl:DUKSUNG_SOURCE,verifiedAt:"2026-11-24",note:"체육실기전형. 수능 400점(전형 40%)과 실기 600점(60%). 국어·수학·영어·탐구 중 상위 2개 영역 각 50% 반영. 실기점수 및 학교폭력 조치사항 미입력으로 최종 점수 산출 보류." },
  { id:"dukseong-seoul-da-free-major", universityId:"dukseong-seoul", universityName:"덕성여자대학교", region:"서울", department:"미래인재대학(자유전공학부)", majorGroup:"자율전공", group:"다", recruitmentCount:100, scoreMetric:"백분위", subjectMetrics:{korean:"백분위",math:"백분위",inquiry:"백분위"},koreanWeight:30,mathWeight:25,englishWeight:25,inquiryWeight:20,inquirySubjects:1,inquiryAggregation:"best",calculationMode:"normalized-standard-sum",subjectMaximumScores:{korean:100,math:100,inquiry:100},rankedAreaWeights:[30,25,25,20],finalScoreMultiplier:900,gradeAdjustmentsAfterFinalMultiplier:true,englishGradeTable:DUKSUNG_ENGLISH,koreanHistoryRequired:true,koreanHistoryGradePoints:DUKSUNG_HISTORY_II,studentRecordWeight:10,schoolViolencePenaltyRequired:true,calculationVerified:false,sourceUrl:DUKSUNG_SOURCE,verifiedAt:"2026-11-24",note:"수능우수전형Ⅱ. 수능 900점 + 학생부 교과 100점. 백분위 상위순 30·25·25·20. 학생부 교과 및 학교폭력 조치사항 미입력으로 전체 전형 점수 산출 보류." }
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
    koreanHistoryRequired: true,
    englishGradeTable: KWANGWOON_ENGLISH,
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

export const regularAdmissions2027SeoulExtra: RegularAdmission[] = [
  ...kwangwoonAdmissions2027,
  { id:"myongji-seoul-na-humanities", universityId:"myongji-seoul", universityName:"명지대학교", region:"서울", department:"인문계열 대표", majorGroup:"인문·어문", group:"나", scoreMetric:"백분위", koreanWeight:35, mathWeight:25, englishWeight:15, inquiryWeight:25, inquirySubjects:2, note:"2027 정시 대표 인문계열.", sourceUrl:"https://iphak.mju.ac.kr/", verifiedAt:"2026-09-27" },
  { id:"sangmyung-seoul-ga-humanities", universityId:"sangmyung-seoul", universityName:"상명대학교", region:"서울", department:"인문계열 대표", majorGroup:"인문·어문", group:"가", scoreMetric:"백분위", koreanWeight:35, mathWeight:25, englishWeight:15, inquiryWeight:25, inquirySubjects:2, note:"2027 정시 대표 인문계열.", sourceUrl:"https://admission.smu.ac.kr/", verifiedAt:"2026-09-27" },
  { id:"sungshin-seoul-ga-humanities", universityId:"sungshin-seoul", universityName:"성신여자대학교", region:"서울", department:"인문계열 대표", majorGroup:"인문·어문", group:"가", scoreMetric:"백분위", koreanWeight:35, mathWeight:25, englishWeight:15, inquiryWeight:25, inquirySubjects:2, note:"2027 정시 대표 인문계열.", sourceUrl:"https://ipsi.sungshin.ac.kr/", verifiedAt:"2026-09-27" },
  ...duksungAdmissions2027,
  { id:"dongduk-seoul-na-humanities", universityId:"dongduk-seoul", universityName:"동덕여자대학교", region:"서울", department:"인문계열 대표", majorGroup:"인문·어문", group:"나", scoreMetric:"백분위", koreanWeight:35, mathWeight:25, englishWeight:15, inquiryWeight:25, inquirySubjects:2, note:"2027 정시 대표 인문계열.", sourceUrl:"https://ipsi.dongduk.ac.kr/", verifiedAt:"2026-09-27" },

];
