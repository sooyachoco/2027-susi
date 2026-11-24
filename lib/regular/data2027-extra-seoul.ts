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
// 2027 정시 수도권 확장 1차 — 서울 비신학 대학
export const regularAdmissions2027SeoulExtra: RegularAdmission[] = [
  { id:"kwangwoon-seoul-ga-natural", universityId:"kwangwoon-seoul", universityName:"광운대학교", region:"서울", department:"자연·공학계열 대표", majorGroup:"자연·공학", group:"가", scoreMetric:"표준점수", koreanWeight:20, mathWeight:35, englishWeight:20, inquiryWeight:25, inquirySubjects:2, inquiryAggregation:"sum", inquiryConversionRequired:true, koreanHistoryRequired:true, calculationVerified:false, note:"2027 광운대 정시 자연계열 기준 국20·수35·영20·탐25. 국어·수학 표준점수, 영어 200점 환산, 탐구 백분위 기반 자체 변환표준점수 2과목 합산. 미적분·기하 및 과탐 가산점은 모집단위 예외가 있어 세부 확인과 변환표 반영 전 계산 보류.", sourceUrl:"https://iphak.kw.ac.kr/", verifiedAt:"2026-09-27" },
  { id:"kwangwoon-seoul-na-humanities", universityId:"kwangwoon-seoul", universityName:"광운대학교", region:"서울", department:"인문계열 대표", majorGroup:"인문·어문", group:"나", scoreMetric:"표준점수", koreanWeight:30, mathWeight:25, englishWeight:20, inquiryWeight:25, inquirySubjects:2, inquiryAggregation:"sum", inquiryConversionRequired:true, koreanHistoryRequired:true, calculationVerified:false, note:"2027 광운대 정시 인문계열(경영·국제통상 제외) 기준 국30·수25·영20·탐25. 경영·국제통상은 국30·수30·영20·탐20으로 별도 분리 필요. 탐구 자체 변환표준점수와 영어 200점 환산표 반영 전 계산 보류.", sourceUrl:"https://iphak.kw.ac.kr/", verifiedAt:"2026-09-27" },
  { id:"snut-seoul-ga-natural", universityId:"snut-seoul", universityName:"서울과학기술대학교", region:"서울", department:"자연·공학계열 대표", majorGroup:"자연·공학", group:"가", scoreMetric:"표준점수", koreanWeight:20, mathWeight:35, englishWeight:20, inquiryWeight:25, inquirySubjects:2, inquiryAggregation:"mean", inquiryConversionRequired:true, koreanHistoryRequired:true, calculationVerified:false, note:"2027 서울과기대 정시 일반전형 자연·공학계열 대표 반영비율 국20·수35·영20·탐25. 탐구 변환 및 영어 등급 환산, 세부 모집단위별 가산점 확인 전까지 계산 검증 보류. 모집단위별 모집군·인원은 개별 행으로 분리 필요.", sourceUrl:"https://admission.seoultech.ac.kr/", verifiedAt:"2026-09-27" },
  { id:"myongji-seoul-na-humanities", universityId:"myongji-seoul", universityName:"명지대학교", region:"서울", department:"인문계열 대표", majorGroup:"인문·어문", group:"나", scoreMetric:"백분위", koreanWeight:35, mathWeight:25, englishWeight:15, inquiryWeight:25, inquirySubjects:2, note:"2027 정시 대표 인문계열.", sourceUrl:"https://iphak.mju.ac.kr/", verifiedAt:"2026-09-27" },
  { id:"sangmyung-seoul-ga-humanities", universityId:"sangmyung-seoul", universityName:"상명대학교", region:"서울", department:"인문계열 대표", majorGroup:"인문·어문", group:"가", scoreMetric:"백분위", koreanWeight:35, mathWeight:25, englishWeight:15, inquiryWeight:25, inquirySubjects:2, note:"2027 정시 대표 인문계열.", sourceUrl:"https://admission.smu.ac.kr/", verifiedAt:"2026-09-27" },
  { id:"sungshin-seoul-ga-humanities", universityId:"sungshin-seoul", universityName:"성신여자대학교", region:"서울", department:"인문계열 대표", majorGroup:"인문·어문", group:"가", scoreMetric:"백분위", koreanWeight:35, mathWeight:25, englishWeight:15, inquiryWeight:25, inquirySubjects:2, note:"2027 정시 대표 인문계열.", sourceUrl:"https://ipsi.sungshin.ac.kr/", verifiedAt:"2026-09-27" },
  { id:"dukseong-seoul-ga-humanities", universityId:"dukseong-seoul", universityName:"덕성여자대학교", region:"서울", department:"인문계열 대표", majorGroup:"인문·어문", group:"가", scoreMetric:"백분위", koreanWeight:35, mathWeight:25, englishWeight:15, inquiryWeight:25, inquirySubjects:2, note:"2027 정시 대표 인문계열.", sourceUrl:"https://enter.duksung.ac.kr/", verifiedAt:"2026-09-27" },
  { id:"dongduk-seoul-na-humanities", universityId:"dongduk-seoul", universityName:"동덕여자대학교", region:"서울", department:"인문계열 대표", majorGroup:"인문·어문", group:"나", scoreMetric:"백분위", koreanWeight:35, mathWeight:25, englishWeight:15, inquiryWeight:25, inquirySubjects:2, note:"2027 정시 대표 인문계열.", sourceUrl:"https://ipsi.dongduk.ac.kr/", verifiedAt:"2026-09-27" },

];
