import type { RegularAdmission } from "./types";

// 2027학년도 인하대학교 정시모집요강 p.9~10, p.41~42, p.47 대조.
// 일반전형 41개 모집단위(가 415·나 537·다 211 = 1,163명)와
// 실기/실적 8개 모집단위(나 12·다 93 = 105명)를 분리 등록한다.
// 탐구 자체변환표준점수표는 수능 성적 발표 후 공개되므로 pending으로 둔다.
// 국어·수학 표준점수 최고점 역시 2027 수능 결과에 따라 달라지므로 임의 입력하지 않는다.
const INHA_SOURCE = "https://admission.inha.ac.kr/";
const INHA_ENGLISH_NATURAL = { 1:100, 2:98, 3:96, 4:90, 5:80, 6:60, 7:40, 8:20, 9:0 } as const;
const INHA_ENGLISH_HUMANITIES = { 1:150, 2:148, 3:145, 4:135, 5:120, 6:100, 7:80, 8:40, 9:0 } as const;
const INHA_HISTORY = { 1:0, 2:0, 3:0, 4:0, 5:-1, 6:-2, 7:-3, 8:-4, 9:-5 } as const;

type InhaRow = {
  id: string;
  department: string;
  group: "가" | "나" | "다";
  count: number;
  field: "humanities" | "natural" | "humanityFusion" | "naturalFusion";
  practical?: false;
};
type InhaPracticalRow = {
  id: string;
  department: string;
  group: "나" | "다";
  count: number;
  practical: true;
  csatWeight: number;
  practicalWeight: number;
  koreanWeight: number;
  mathWeight: number;
  englishWeight: number;
  inquiryWeight: number;
  englishScale: "natural" | "humanities";
  note: string;
};

const GENERAL_ROWS: InhaRow[] = [
  { id:"semiconductor-system", department:"반도체시스템공학과", group:"가", count:33, field:"natural" },
  { id:"medicine", department:"의예과", group:"가", count:16, field:"natural" },
  { id:"free-major-humanities", department:"자유전공융합학부(인문)", group:"가", count:102, field:"humanityFusion" },
  { id:"free-major-natural", department:"자유전공융합학부(자연)", group:"가", count:153, field:"naturalFusion" },
  { id:"natural-science-fusion", department:"자연과학융합학부", group:"가", count:34, field:"naturalFusion" },
  { id:"social-science-fusion", department:"사회과학융합학부", group:"가", count:42, field:"humanityFusion" },
  { id:"humanities-fusion", department:"인문융합학부", group:"가", count:35, field:"humanityFusion" },

  { id:"mechanical-engineering", department:"기계공학과", group:"나", count:25, field:"natural" },
  { id:"aerospace-engineering", department:"항공우주공학과", group:"나", count:11, field:"natural" },
  { id:"industrial-management", department:"산업경영공학과", group:"나", count:9, field:"natural" },
  { id:"chemical-engineering", department:"화공에너지공학부(화학공학전공)", group:"나", count:18, field:"natural" },
  { id:"battery-engineering", department:"화공에너지공학부(이차전지공학전공)", group:"나", count:16, field:"natural" },
  { id:"polymer-engineering", department:"고분자공학과", group:"나", count:8, field:"natural" },
  { id:"social-infrastructure", department:"사회인프라공학과", group:"나", count:12, field:"natural" },
  { id:"environmental-engineering", department:"환경공학과", group:"나", count:9, field:"natural" },
  { id:"energy-resources", department:"에너지자원공학과", group:"나", count:6, field:"natural" },
  { id:"business", department:"경영학부(경영학과)", group:"나", count:20, field:"humanities" },
  { id:"finance-business", department:"경영학부(파이낸스경영학과)", group:"나", count:16, field:"humanities" },
  { id:"asia-pacific-logistics", department:"아태물류학부", group:"나", count:14, field:"humanities" },
  { id:"korean-education", department:"국어교육과", group:"나", count:13, field:"humanities" },
  { id:"english-education", department:"영어교육과", group:"나", count:13, field:"humanities" },
  { id:"social-education", department:"사회교육과", group:"나", count:11, field:"humanities" },
  { id:"mathematics-education", department:"수학교육과", group:"나", count:11, field:"natural" },
  { id:"nursing", department:"간호학과", group:"나", count:42, field:"natural" },
  { id:"computer-engineering", department:"컴퓨터공학과", group:"나", count:64, field:"natural" },
  { id:"engineering-fusion", department:"공학융합학부", group:"나", count:132, field:"naturalFusion" },
  { id:"business-fusion", department:"경영융합학부", group:"나", count:45, field:"humanityFusion" },
  { id:"biotechnology", department:"생명공학과", group:"나", count:17, field:"natural" },
  { id:"advanced-biomedicine", department:"첨단바이오의약학과", group:"나", count:16, field:"natural" },
  { id:"biofood-engineering", department:"바이오식품공학과", group:"나", count:9, field:"natural" },

  { id:"naval-architecture", department:"조선해양공학과", group:"다", count:12, field:"natural" },
  { id:"materials-engineering", department:"신소재공학과", group:"다", count:19, field:"natural" },
  { id:"geoinformatics", department:"공간정보공학과", group:"다", count:8, field:"natural" },
  { id:"architecture", department:"건축학부", group:"다", count:18, field:"natural" },
  { id:"electrical-electronics", department:"전기전자공학부", group:"다", count:42, field:"natural" },
  { id:"international-trade", department:"국제통상학과", group:"다", count:12, field:"humanities" },
  { id:"education", department:"교육학과", group:"다", count:13, field:"humanities" },
  { id:"ai-engineering", department:"인공지능공학과", group:"다", count:38, field:"natural" },
  { id:"data-science", department:"데이터사이언스학과", group:"다", count:20, field:"natural" },
  { id:"smart-mobility", department:"스마트모빌리티공학과", group:"다", count:16, field:"natural" },
  { id:"life-science", department:"생명과학과", group:"다", count:13, field:"natural" },
];

const PRACTICAL_ROWS: InhaPracticalRow[] = [
  { id:"design-convergence", department:"디자인융합학과", group:"나", count:12, practical:true, csatWeight:30, practicalWeight:70, koreanWeight:40, mathWeight:0, englishWeight:40, inquiryWeight:20, englishScale:"humanities", note:"수능 30% + 실기 70%. 실기점수 입력 전 최종 합격 판정 보류." },
  { id:"sports-science", department:"스포츠과학과", group:"다", count:21, practical:true, csatWeight:60, practicalWeight:40, koreanWeight:40, mathWeight:0, englishWeight:40, inquiryWeight:20, englishScale:"humanities", note:"수능 60% + 실기 40%. 실기점수 입력 전 최종 합격 판정 보류." },
  { id:"physical-education", department:"체육교육과", group:"다", count:12, practical:true, csatWeight:70, practicalWeight:30, koreanWeight:40, mathWeight:0, englishWeight:30, inquiryWeight:30, englishScale:"humanities", note:"수능 70% + 실기 30%. 실기점수 입력 전 최종 합격 판정 보류." },
  { id:"sculpture-free-drawing", department:"조형예술학과(자유소묘)", group:"다", count:12, practical:true, csatWeight:30, practicalWeight:70, koreanWeight:50, mathWeight:0, englishWeight:50, inquiryWeight:0, englishScale:"humanities", note:"수능 30% + 실기 70%. 실기점수 입력 전 최종 합격 판정 보류." },
  { id:"theatre-acting", department:"연극영화학과(연기)", group:"다", count:9, practical:true, csatWeight:30, practicalWeight:70, koreanWeight:40, mathWeight:0, englishWeight:40, inquiryWeight:20, englishScale:"humanities", note:"수능 30% + 실기 70%. 실기점수 입력 전 최종 합격 판정 보류." },
  { id:"theatre-directing", department:"연극영화학과(연출)", group:"다", count:9, practical:true, csatWeight:30, practicalWeight:70, koreanWeight:40, mathWeight:0, englishWeight:40, inquiryWeight:20, englishScale:"humanities", note:"수능 30% + 실기 70%. 실기점수 입력 전 최종 합격 판정 보류." },
  { id:"apparel-design-practical", department:"의류디자인학과(실기)", group:"다", count:10, practical:true, csatWeight:30, practicalWeight:70, koreanWeight:40, mathWeight:0, englishWeight:40, inquiryWeight:20, englishScale:"humanities", note:"수능 30% + 실기 70%. 실기점수 입력 전 최종 합격 판정 보류." },
  { id:"design-technology", department:"디자인테크놀로지학과", group:"다", count:20, practical:true, csatWeight:70, practicalWeight:30, koreanWeight:40, mathWeight:20, englishWeight:40, inquiryWeight:0, englishScale:"humanities", note:"수능 70% + 실기 30%. A유형(수학)과 B유형(탐구)을 각각 계산해 유리한 점수를 반영. 실기점수 입력 전 최종 합격 판정 보류." },
];

function getWeights(field: InhaRow["field"]) {
  if (field === "humanities") return { korean:35, math:25, english:15, inquiry:25 };
  if (field === "natural") return { korean:25, math:35, english:10, inquiry:30 };
  if (field === "humanityFusion") return { korean:35, math:30, english:10, inquiry:25 };
  return { korean:25, math:40, english:10, inquiry:25 };
}

function alternateWeights(field: InhaRow["field"]) {
  if (field === "humanityFusion") return { koreanWeight:30, mathWeight:30, englishWeight:10, inquiryWeight:30 };
  if (field === "naturalFusion") return { koreanWeight:25, mathWeight:35, englishWeight:10, inquiryWeight:30 };
  return undefined;
}

function makeGeneral(row: InhaRow): RegularAdmission {
  const w = getWeights(row.field);
  const isHumanities = row.field === "humanities" || row.field === "humanityFusion";
  const isNatural = row.field === "natural";
  const isNaturalFusion = row.field === "naturalFusion";
  return {
    id:`inha-2027-${row.group}-${row.id}`,
    universityId:"inha-incheon",
    universityName:"인하대학교",
    region:"인천",
    department:row.department,
    majorGroup:isHumanities ? "인문·사회" : "자연·공학",
    group:row.group,
    recruitmentCount:row.count,
    scoreMetric:"표준점수",
    subjectMetrics:{ korean:"표준점수", math:"표준점수", inquiry:"백분위" },
    koreanWeight:w.korean,
    mathWeight:w.math,
    englishWeight:w.english,
    inquiryWeight:w.inquiry,
    inquirySubjects:2,
    inquiryAggregation:"mean",
    calculationMode:"normalized-standard-sum",
    alternateWeighting:alternateWeights(row.field),
    englishGradeTable:isHumanities ? INHA_ENGLISH_HUMANITIES : INHA_ENGLISH_NATURAL,
    englishMaximumScore:isHumanities ? 150 : 100,
    inquiryConversionRequired:true,
    inquiryConversionPending:true,
    inquiryTypeBonusRequired:isHumanities || isNatural || isNaturalFusion,
    inquiryTypeBonusRate:isHumanities
      ? { 사탐:0.03, 과탐:0, 직탐:0 }
      : isNatural || isNaturalFusion
        ? { 사탐:0, 과탐:0.03, 직탐:0 }
        : undefined,
    mathChoiceBonusRequired:isNatural,
    mathChoiceBonusRate:isNatural ? { 미적분:0.03, 기하:0.03, 확률과통계:0 } : undefined,
    koreanHistoryRequired:true,
    koreanHistoryGradePoints:INHA_HISTORY,
    schoolViolencePenaltyRequired:true,
    schoolViolencePenaltyNote:"일반전형: 1~3호 각 1점, 4~5호 각 10점, 6~7호 각 50점 감점, 8~9호 부적격. 조치사항별 감점 적용 및 지원자 입력 기능 검증 전 최종 판정 보류.",
    calculationVerified:false,
    sourceUrl:INHA_SOURCE,
    verifiedAt:"2026-11-26",
    note:"2027 정시 수능(일반) 모집단위. 국어·수학 표준점수 최고점 및 탐구 백분위 기반 자체변환표준점수표는 확정 입력 전까지 판정 보류. 융합학부는 A/B유형 중 유리한 점수 적용.",
  };
}

function makePractical(row: InhaPracticalRow): RegularAdmission {
  return {
    id:`inha-2027-${row.group}-practical-${row.id}`,
    universityId:"inha-incheon",
    universityName:"인하대학교",
    region:"인천",
    department:row.department,
    majorGroup:row.id === "physical-education" || row.id === "sports-science" ? "예체능·체육" : "예체능·디자인",
    group:row.group,
    recruitmentCount:row.count,
    scoreMetric:"표준점수",
    subjectMetrics:{ korean:"표준점수", math:"표준점수", inquiry:"백분위" },
    koreanWeight:row.koreanWeight,
    mathWeight:row.mathWeight,
    englishWeight:row.englishWeight,
    inquiryWeight:row.inquiryWeight,
    inquirySubjects:2,
    inquiryAggregation:"mean",
    calculationMode:"normalized-standard-sum",
    englishGradeTable:row.englishScale === "natural" ? INHA_ENGLISH_NATURAL : INHA_ENGLISH_HUMANITIES,
    englishMaximumScore:row.englishScale === "natural" ? 100 : 150,
    inquiryConversionRequired:row.inquiryWeight > 0,
    inquiryConversionPending:row.inquiryWeight > 0,
    koreanHistoryRequired:true,
    koreanHistoryGradePoints:INHA_HISTORY,
    practicalEvaluationRequired:true,
    practicalEvaluationNote:row.note,
    schoolViolencePenaltyRequired:true,
    schoolViolencePenaltyNote:"실기/실적전형: 1~3호 각 1점, 4~5호 각 30점, 6~7호 각 50점 감점, 8~9호 부적격. 조치사항별 감점 적용 및 지원자 입력 기능 검증 전 최종 판정 보류.",
    calculationVerified:false,
    sourceUrl:INHA_SOURCE,
    verifiedAt:"2026-11-26",
    note:`2027 정시 실기/실적 모집인원. 수능 반영비율 ${row.csatWeight}% + 실기 ${row.practicalWeight}%. 실기점수 입력 전 최종 합격 판정 보류.`,
  };
}

export const inhaAdmissions2027: RegularAdmission[] = [
  ...GENERAL_ROWS.map(makeGeneral),
  ...PRACTICAL_ROWS.map(makePractical),
];
