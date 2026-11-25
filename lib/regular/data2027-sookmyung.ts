import type { RegularAdmission } from "./types";

const SOURCE = "https://admission.sookmyung.ac.kr/upload/BBS0021/20260901143304EF2RTS.PDF";
const ENGLISH = { 1:100, 2:98, 3:94, 4:88, 5:80, 6:70, 7:60, 8:40, 9:20 } as const;
const HISTORY = { 1:3, 2:3, 3:3, 4:3, 5:2, 6:2, 7:2, 8:1, 9:1 } as const;
const VIOLENCE = "학교폭력 정량감점(전형총점 1,000점 기준): 1호 1점, 2~3호 각 10점, 4호 30점, 5호 40점, 6~7호 각 50점, 8~9호 각 100점 감점. 복수 조치는 전형별 최대 감점 범위 내 중복 감점. 지원자별 조치사항 입력·중복감점 적용 미지원으로 최종 판정 보류.";
const ROWS = [
  ["ga-korean","한국어문학부","가",17,"humanities"],
  ["ga-history","역사문화학과","가",9,"humanities"],
  ["ga-french","프랑스언어·문화학과","가",5,"humanities"],
  ["ga-chinese","중어중문학부","가",20,"humanities"],
  ["ga-german","독일언어·문화학과","가",5,"humanities"],
  ["ga-japanese","일본학과","가",4,"humanities"],
  ["ga-library","문헌정보학과","가",8,"humanities"],
  ["ga-tourism","문화관광학전공","가",9,"humanities"],
  ["ga-lecordonbleu","르꼬르동블루외식경영전공","가",9,"humanities"],
  ["ga-education","교육학부","가",23,"humanities"],
  ["ga-family","가족자원경영학과","가",9,"humanities"],
  ["ga-child-welfare","아동복지학부","가",15,"humanities"],
  ["ga-politics","정치외교학과","가",11,"humanities"],
  ["ga-public-admin","행정학과","가",8,"humanities"],
  ["ga-advertising","홍보광고학과","가",11,"humanities"],
  ["ga-consumer","소비자경제학과","가",7,"humanities"],
  ["ga-social-psychology","사회심리학과","가",9,"humanities"],
  ["ga-law","법학부","가",32,"humanities"],
  ["ga-economics","경제학부","가",26,"humanities"],
  ["ga-business","경영학부","가",35,"humanities"],
  ["ga-global-cooperation","글로벌협력전공","가",4,"humanities"],
  ["ga-entrepreneurship","앙트러프러너십전공","가",5,"humanities"],
  ["ga-english","영어영문학전공","가",17,"humanities"],
  ["ga-tesl","테솔(TESL)전공","가",3,"humanities"],
  ["ga-media","미디어학부","가",15,"humanities"],
  ["ga-chemistry","화학과","가",10,"natural"],
  ["ga-life-system","생명시스템학부","가",15,"natural"],
  ["ga-mathematics","수학과","가",12,"natural"],
  ["ga-statistics","통계학과","가",10,"natural"],
  ["ga-chemical-bio","화공생명공학부","가",20,"natural"],
  ["ga-ai-engineering","인공지능공학부","가",16,"natural"],
  ["ga-intelligent-electronics","지능형전자시스템학부","가",10,"natural"],
  ["ga-materials-physics","신소재물리학부","가",6,"natural"],
  ["ga-computer-science","컴퓨터과학전공","가",13,"natural"],
  ["ga-data-science","데이터사이언스전공","가",8,"natural"],
  ["ga-mechanical","기계시스템학부","가",12,"natural"],
  ["ga-clothing","의류학과","가",9,"natural"],
  ["ga-food-nutrition","식품영양학과","가",12,"natural"],
  ["na-pharmacy","약학부","나",56,"natural"],
  ["na-advanced-engineering","첨단공학부","나",68,"natural"],
  ["na-free-major","자유전공학부","나",264,"free"],
  ["na-physical-education","체육교육과","나",20,"sports"],
  ["ga-visual-video-design","시각·영상디자인과","가",28,"design"],
  ["ga-industrial-design","산업디자인과","가",16,"design"],
  ["ga-environment-design","환경디자인과","가",15,"design"],
  ["ga-crafts","공예과","가",23,"design"],
  ["ga-piano","피아노과","가",32,"music"],
  ["ga-vocal","성악과","가",26,"music"],
  ["ga-orchestra","관현악과(확정 악기)","가",16,"music"],
  ["ga-composition","작곡과","가",10,"composition"],
  ["ga-painting-korean","회화과(한국화)","가",6,"painting"],
  ["ga-painting-western","회화과(서양화)","가",7,"painting"],
  ["ga-dance-conditional","무용과","가",0,"dance"]
] as const;

export const sookmyungAdmissions2027: RegularAdmission[] = ROWS.map(([key, department, group, recruitmentCount, field]) => {
  const humanities = field === "humanities";
  const natural = field === "natural";
  const practical = ["sports","design","music","composition","painting","dance"].includes(field);
  const weights = humanities ? { koreanWeight:35, mathWeight:25, englishWeight:15, inquiryWeight:25 }
    : natural ? { koreanWeight:25, mathWeight:35, englishWeight:15, inquiryWeight:25 }
    : field === "free" ? { koreanWeight:30, mathWeight:30, englishWeight:15, inquiryWeight:25 }
    : field === "sports" ? { koreanWeight:40, mathWeight:0, englishWeight:30, inquiryWeight:30 }
    : field === "design" ? { koreanWeight:40, mathWeight:0, englishWeight:30, inquiryWeight:30 }
    : field === "painting" ? { koreanWeight:60, mathWeight:0, englishWeight:40, inquiryWeight:0 }
    : field === "music" ? { koreanWeight:60, mathWeight:0, englishWeight:40, inquiryWeight:0 }
    : field === "composition" ? { koreanWeight:60, mathWeight:0, englishWeight:40, inquiryWeight:0 }
    : { koreanWeight:60, mathWeight:0, englishWeight:40, inquiryWeight:0 };
  const csatShare = field === "sports" ? 60 : field === "design" ? 60 : field === "painting" ? 30 : field === "music" ? 20 : field === "composition" ? 40 : field === "dance" ? 30 : 100;
  const inquirySubjects = field === "sports" || field === "design" ? 1 : 2;
  const inquiryTypeBonusRate = humanities ? { 사탐:0.03, 과탐:0, 직탐:0 }
    : natural ? { 사탐:0, 과탐:0.03, 직탐:0 } : undefined;
  const majorGroup = ["sports"].includes(field) ? "예체능·체육"
    : ["design","painting","music","composition","dance"].includes(field) ? "예체능"
    : natural ? "자연·공학"
    : field === "free" ? "자율전공"
    : "인문·사회";
  return {
    id: `sookmyung-seoul-${key}`,
    universityId: "sookmyung-seoul",
    universityName: "숙명여자대학교",
    region: "서울",
    department,
    majorGroup,
    group,
    recruitmentCount,
    scoreMetric: "표준점수" as const,
    subjectMetrics: { korean:"표준점수" as const, math:"표준점수" as const, inquiry:"백분위" as const },
    ...weights,
    inquirySubjects,
    inquiryAggregation: "sum" as const,
    calculationMode: "normalized-standard-sum" as const,
    subjectMaximumScores: { korean:200, math:200, inquiry:200 },
    finalScoreMultiplier: csatShare * 10,
    gradeAdjustmentsAfterFinalMultiplier: true,
    englishGradeTable: ENGLISH,
    englishMaximumScore: 100,
    koreanHistoryRequired: true,
    koreanHistoryGradePoints: HISTORY,
    inquiryConversionRequired: inquirySubjects === 2 && weights.inquiryWeight > 0,
    inquiryConversionPending: inquirySubjects === 2 && weights.inquiryWeight > 0,
    inquiryTypeBonusRequired: Boolean(inquiryTypeBonusRate),
    inquiryTypeBonusRate,
    practicalEvaluationRequired: practical,
    practicalEvaluationNote: practical ? `수능 ${csatShare}% + 실기 ${100-csatShare}% 반영. 실기 점수 입력 전 최종점수·합격판정 보류.` : undefined,
    schoolViolencePenaltyRequired: true,
    schoolViolencePenaltyNote: VIOLENCE,
    calculationVerified: false,
    sourceUrl: SOURCE,
    verifiedAt: "2026-11-25",
    note: field === "dance"
      ? "정시 가군 무용과는 수시 미충원 인원 발생 시 선발. 모집인원 0은 미확정 조건부 표기이며 현재 추천 인원에 포함하지 않음."
      : practical
        ? `2027 정시 ${group}군 일반학생전형. 수능 ${csatShare}% + 실기 ${100-csatShare}%. 대학 실기 점수 미입력 및 학교폭력 감점 미적용으로 최종 판정 보류.`
        : `2027 정시 ${group}군 일반학생전형. ${humanities ? "인문" : natural ? "자연" : "자유전공"}계열 수능 반영비율 적용. 탐구 변환표준점수는 수능 성적 발표 후 공개 예정이며 학교폭력 감점 미적용으로 최종 판정 보류.`
  };
});

const activeRows = sookmyungAdmissions2027.filter((row) => row.recruitmentCount && row.recruitmentCount > 0);
const totals = activeRows.reduce((acc, row) => { acc[row.group] += row.recruitmentCount ?? 0; return acc; }, { 가:0, 나:0, 다:0 });
if (activeRows.length !== 52 || totals.가 !== 648 || totals.나 !== 408 || totals.다 !== 0) {
  throw new Error(`숙명여대 2027 정시 일반학생 모집인원 검증 실패: rows=${activeRows.length}, totals=${JSON.stringify(totals)}`);
}
