import type { RegularAdmission } from "./types";

const KNSU_SOURCE = "https://election.knsu.ac.kr/cms/etcResourceDown.do?key=%24cms%24NIOQygqgTADFDsArArgOwOYGcCWA6ADgCYBmQA&site=%24cms%24JYBwzsQ";
const KNSU_ENGLISH = { 1:100, 2:95, 3:90, 4:85, 5:80, 6:75, 7:70, 8:65, 9:60 } as const;
const KNSU_ROWS = [
  { key:"general-social-physical", department:"사회체육학과", count:55, csat:65, record:10, practical:25, interview:0, field:"sports" },
  { key:"general-sports-youth", department:"스포츠청소년지도학과", count:14, csat:65, record:20, practical:15, interview:0, field:"sports" },
  { key:"general-special-physical-education", department:"특수체육교육과", count:10, csat:65, record:0, practical:25, interview:10, field:"education" },
  { key:"general-sports-industry", department:"스포츠산업학과", count:20, csat:55, record:25, practical:20, interview:0, field:"sports" },
  { key:"general-exercise-health", department:"운동건강관리학과", count:24, csat:70, record:10, practical:20, interview:0, field:"health" },
  { key:"general-senior-sports-welfare", department:"노인체육복지학과", count:19, csat:60, record:20, practical:20, interview:0, field:"health" },
  { key:"general-taekwondo", department:"태권도학과", count:10, csat:50, record:20, practical:30, interview:0, field:"sports" },
  { key:"csat-sports-youth", department:"스포츠청소년지도학과(수능성적우수자)", count:11, csat:100, record:0, practical:0, interview:0, field:"sports" },
  { key:"csat-senior-sports-welfare", department:"노인체육복지학과(수능성적우수자)", count:3, csat:100, record:0, practical:0, interview:0, field:"health" },
] as const;

export const knsuAdmissions2027: RegularAdmission[] = KNSU_ROWS.map((row) => ({
  id: `knsu-seoul-${row.key}`,
  universityId: "knsu-seoul",
  universityName: "한국체육대학교",
  region: "서울",
  department: row.department,
  majorGroup: row.field === "education" ? "사범·교육" : row.field === "health" ? "의약·보건" : "예체능·체육",
  group: "가",
  recruitmentCount: row.count,
  scoreMetric: "표준점수",
  subjectMetrics: { korean:"표준점수", math:"표준점수", inquiry:"표준점수" },
  koreanWeight: 35,
  mathWeight: 35,
  englishWeight: 35,
  inquiryWeight: 30,
  inquirySubjects: 1,
  inquiryAggregation: "best",
  topAreaWeights: { areas:["korean","math","english"], count:2, weight:35 },
  calculationMode: "normalized-standard-sum",
  finalScoreMultiplier: 1000,
  englishGradeTable: KNSU_ENGLISH,
  studentRecordWeight: row.record,
  practicalEvaluationRequired: row.practical > 0,
  practicalEvaluationNote: row.practical > 0 ? `전형 총점 1,000점 중 실기 ${row.practical}% 반영. 실기점수 입력 전 최종점수 판정 보류.` : undefined,
  interviewEvaluationRequired: row.interview > 0,
  interviewEvaluationNote: row.interview > 0 ? "특수체육교육과 면접 100점(10%) 반영. 면접점수 입력 전 최종점수 판정 보류." : undefined,
  schoolViolencePenaltyRequired: true,
  schoolViolencePenaltyNote: "학교폭력 1~2호 각 5점, 3호 10점, 4호 20점 감점, 5~9호 부적격. 지원자별 조치사항 입력 및 감점 적용 전 최종 판정 보류.",
  calculationVerified: false,
  benchmarkComparable: false,
  sourceUrl: KNSU_SOURCE,
  verifiedAt: "2026-11-26",
  note: row.csat === 100
    ? "가군 수능성적우수자전형. 수능 100% 전형이나 모집단위별 수능 영역 가중치·환산값의 완전한 엔진 검증 전 판정 보류."
    : `가군 일반학생전형. 수능 ${row.csat}% + 학생부 ${row.record}% + 실기 ${row.practical}% + 면접 ${row.interview}%. 복합 전형요소 중 수능 외 점수 미입력으로 최종 판정 보류.`,
}));

const GANGSEO_SOURCE = "https://entrance.gangseo.ac.kr/template/2027jungsi.pdf";
const GANGSEO_ENGLISH = { 1:9, 2:8, 3:7, 4:6, 5:5, 6:4, 7:3, 8:2, 9:1 } as const;
const GANGSEO_ROWS = [
  { key:"business", department:"경영학과", group:"다", count:3, field:"humanities" },
  { key:"social-welfare", department:"사회복지학과", group:"다", count:3, field:"humanities" },
  { key:"counseling-psychology", department:"상담심리학과", group:"다", count:4, field:"humanities" },
  { key:"food-nutrition", department:"식품영양학과", group:"다", count:4, field:"natural" },
  { key:"nursing", department:"간호학과", group:"다", count:6, field:"nursing" },
  { key:"applied-music", department:"실용음악학과", group:"다", count:5, field:"practical" },
] as const;

export const gangseoAdmissions2027: RegularAdmission[] = GANGSEO_ROWS.map((row) => {
  const nursing = row.field === "nursing";
  const practical = row.field === "practical";
  const humanities = row.field === "humanities";
  return {
    id: `gangseo-seoul-${row.key}`,
    universityId: "gangseo-seoul",
    universityName: "강서대학교",
    region: "서울",
    department: row.department,
    majorGroup: practical ? "예체능·음악" : nursing ? "의약·보건" : humanities ? "인문·사회" : "자연·공학",
    group: row.group,
    recruitmentCount: row.count,
    scoreMetric: "백분위",
    subjectMetrics: { korean:"백분위", math:"백분위", inquiry:"백분위" },
    subjectMaximumScores: { korean:100, math:100, inquiry:100 },
    koreanWeight: practical ? 0 : nursing ? 30 : 40,
    mathWeight: practical ? 0 : nursing ? 40 : 30,
    englishWeight: 0,
    inquiryWeight: practical ? 0 : 30,
    inquirySubjects: 1,
    inquiryAggregation: "best",
    calculationMode: "normalized-standard-sum",
    finalScoreMultiplier: practical ? 1000 : 10,
    englishGradeTable: GANGSEO_ENGLISH,
    englishMaximumScore: 9,
    koreanHistoryRequired: true,
    studentRecordWeight: practical ? 20 : 0,
    practicalEvaluationRequired: practical,
    practicalEvaluationNote: practical ? "실용음악학과 다군 실기 80% + 학생부 교과 20%. 실기·학생부 점수 입력 전 최종 판정 보류." : undefined,
    interviewEvaluationRequired: nursing,
    interviewEvaluationNote: nursing ? "간호학과 수능 80%(800점) + 면접 20%(200점). 면접점수 입력 전 최종 판정 보류." : undefined,
    schoolViolencePenaltyRequired: true,
    schoolViolencePenaltyNote: "학교폭력 조치사항별 감점: 1~3호 없음, 4~5호 10점, 6~7호 20점, 8호 30점, 9호 40점(100점 만점 기준). 점수단위 환산 검증 전 최종 판정 보류.",
    calculationVerified: false,
    benchmarkComparable: false,
    sourceUrl: GANGSEO_SOURCE,
    verifiedAt: "2026-11-26",
    note: practical
      ? "다군 실용음악학과 정시 실기·실적 일반학생 5명. 수능 미반영, 실기 80% + 학생부 20%."
      : nursing
        ? "다군 간호학과 정시 수능위주 일반학생 6명. 수능 80% + 면접 20%."
        : `다군 수능위주 일반학생. ${humanities ? "국어40·수학30·탐구30" : "국어30·수학40·탐구30"} + 영어 등급 가산점. 영어 가산점의 엔진 반영 및 학교폭력 점수단위 검증 전 판정 보류.`,
  };
});
