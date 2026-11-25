import type { RegularAdmission } from "./types";

// 서울교대 2027 정시 일반전형: 공식 모집요강(2026.08.20) 기준
const SNUE_SOURCE = "https://admission.snue.ac.kr/admission/na/ntt/selectNttList.do?bbsId=3069&mi=3367";

export const snueAdmissions2027: RegularAdmission[] = [
  {
    id: "snue-seoul-na-elementary-education",
    universityId: "snue-seoul",
    universityName: "서울교육대학교",
    region: "서울",
    department: "초등교육과",
    majorGroup: "사범·교육",
    group: "나",
    recruitmentCount: 108,
    scoreMetric: "표준점수",
    subjectMetrics: { korean: "표준점수", math: "표준점수", inquiry: "표준점수" },
    koreanWeight: 33.3375,
    mathWeight: 33.3375,
    englishWeight: 0,
    inquiryWeight: 33.3375,
    inquirySubjects: 2,
    inquiryAggregation: "sum",
    calculationMode: "normalized-standard-sum",
    subjectMaximumScores: { korean: 160, math: 160, inquiry: 160 },
    finalScoreMultiplier: 800,
    calculationVerified: false,
    benchmarkComparable: false,
    additionalEligibilityRequired: true,
    additionalEligibilityNote: "수능최저학력기준 확인 필요: 영어 3등급 이내 및 한국사 4등급 이내",
    interviewEvaluationRequired: true,
    interviewEvaluationNote: "2단계 면접평가 200점 입력 필요. 최종 전형은 1단계 수능 800점과 면접 200점 합산이며 면접 결시 시 불합격",
    note: "2027 정시 나군 일반전형 초등교육과 108명. 1단계 수능 800점으로 1.5배수 선발, 2단계에서 수능 800점+면접 200점 합산. 국어·수학·탐구(사회/과학 2과목) 표준점수를 각 266.7점 배점으로 반영(영어·한국사는 점수 가산이 아닌 최저학력기준). 탐구 변환표는 별도 요구하지 않으며, 면접 점수와 최저학력기준을 입력하기 전 최종 합격판정 보류.",
    sourceUrl: SNUE_SOURCE,
    verifiedAt: "2026-11-25",
  },
];
