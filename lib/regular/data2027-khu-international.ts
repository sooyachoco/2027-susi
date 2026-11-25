import type { RegularAdmission } from "./types";

// 2027학년도 경희대학교 국제캠퍼스 정시 일반 모집단위.
// 공식 모집요강 p.16~17의 모집단위·군·모집인원 표에서 국제캠퍼스 모집단위를 분리.
const KHU_INTERNATIONAL_SOURCE = "https://iphak.khu.ac.kr/detail.do?board_seq=19434";
const KHU_ENGLISH = { 1:0, 2:0, 3:-2, 4:-4, 5:-8, 6:-12, 7:-18, 8:-24, 9:-30 } as const;
const KHU_HISTORY = { 1:0, 2:0, 3:0, 4:0, 5:-2, 6:-4, 7:-8, 8:-14, 9:-20 } as const;
const KHU_INTERNATIONAL_ROWS = [
  {
    "key": "ga-applied-english-translation",
    "department": "응용영어통번역학과",
    "group": "가",
    "recruitmentCount": 17,
    "field": "humanities"
  },
  {
    "key": "ga-french",
    "department": "프랑스어학과",
    "group": "가",
    "recruitmentCount": 14,
    "field": "humanities"
  },
  {
    "key": "ga-spanish",
    "department": "스페인어학과",
    "group": "가",
    "recruitmentCount": 14,
    "field": "humanities"
  },
  {
    "key": "ga-russian",
    "department": "러시아어학과",
    "group": "가",
    "recruitmentCount": 14,
    "field": "humanities"
  },
  {
    "key": "ga-chinese",
    "department": "중국어학과",
    "group": "가",
    "recruitmentCount": 17,
    "field": "humanities"
  },
  {
    "key": "ga-japanese",
    "department": "일본어학과",
    "group": "가",
    "recruitmentCount": 15,
    "field": "humanities"
  },
  {
    "key": "ga-korean-language",
    "department": "한국어학과",
    "group": "가",
    "recruitmentCount": 9,
    "field": "humanities"
  },
  {
    "key": "ga-global-communication",
    "department": "글로벌커뮤니케이션학부(영미어문전공·영미문화전공)",
    "group": "가",
    "recruitmentCount": 23,
    "field": "humanities"
  },
  {
    "key": "ga-international-studies",
    "department": "국제학과",
    "group": "가",
    "recruitmentCount": 48,
    "field": "social"
  },
  {
    "key": "ga-hospitality-management",
    "department": "Hospitality경영학과",
    "group": "가",
    "recruitmentCount": 44,
    "field": "social"
  },
  {
    "key": "ga-culinary-food-design",
    "department": "조리&푸드디자인학과",
    "group": "가",
    "recruitmentCount": 6,
    "field": "social"
  },
  {
    "key": "ga-tourism-entertainment",
    "department": "관광·엔터테인먼트학부(관광학과·문화엔터테인먼트학과)",
    "group": "가",
    "recruitmentCount": 26,
    "field": "social"
  },
  {
    "key": "ga-global-hospitality-tourism",
    "department": "글로벌Hospitality·관광학과",
    "group": "가",
    "recruitmentCount": 5,
    "field": "social"
  },
  {
    "key": "na-mechanical-engineering",
    "department": "기계공학부(기계공학전공·지능로봇공학전공·항공우주모빌리티전공)",
    "group": "나",
    "recruitmentCount": 69,
    "field": "natural"
  },
  {
    "key": "na-industrial-management-engineering",
    "department": "산업경영공학과",
    "group": "나",
    "recruitmentCount": 35,
    "field": "natural"
  },
  {
    "key": "na-nuclear-engineering",
    "department": "원자력공학과",
    "group": "나",
    "recruitmentCount": 27,
    "field": "natural"
  },
  {
    "key": "na-chemical-engineering",
    "department": "화학공학과",
    "group": "나",
    "recruitmentCount": 32,
    "field": "natural"
  },
  {
    "key": "na-advanced-materials",
    "department": "신소재공학과",
    "group": "나",
    "recruitmentCount": 35,
    "field": "natural"
  },
  {
    "key": "na-civil-systems",
    "department": "사회기반시스템공학과",
    "group": "나",
    "recruitmentCount": 36,
    "field": "natural"
  },
  {
    "key": "na-architectural-engineering",
    "department": "건축공학과",
    "group": "나",
    "recruitmentCount": 37,
    "field": "natural"
  },
  {
    "key": "na-environmental-engineering",
    "department": "환경학및환경공학과",
    "group": "나",
    "recruitmentCount": 22,
    "field": "natural"
  },
  {
    "key": "na-architecture-5yr",
    "department": "건축학과(5년제)",
    "group": "나",
    "recruitmentCount": 25,
    "field": "natural"
  },
  {
    "key": "na-applied-math",
    "department": "응용수학과",
    "group": "나",
    "recruitmentCount": 18,
    "field": "natural"
  },
  {
    "key": "na-applied-physics",
    "department": "응용물리학과",
    "group": "나",
    "recruitmentCount": 19,
    "field": "natural"
  },
  {
    "key": "na-applied-chemistry",
    "department": "응용화학과",
    "group": "나",
    "recruitmentCount": 26,
    "field": "natural"
  },
  {
    "key": "na-space-science",
    "department": "우주과학과",
    "group": "나",
    "recruitmentCount": 20,
    "field": "natural"
  },
  {
    "key": "na-genetic-biotechnology",
    "department": "유전생명공학과",
    "group": "나",
    "recruitmentCount": 20,
    "field": "natural"
  },
  {
    "key": "na-food-biotechnology",
    "department": "식품생명공학과",
    "group": "나",
    "recruitmentCount": 14,
    "field": "natural"
  },
  {
    "key": "na-bio-materials",
    "department": "융합바이오·신소재공학과",
    "group": "나",
    "recruitmentCount": 19,
    "field": "natural"
  },
  {
    "key": "na-smart-farm",
    "department": "스마트팜과학과",
    "group": "나",
    "recruitmentCount": 15,
    "field": "natural"
  },
  {
    "key": "na-industrial-design",
    "department": "산업디자인학과",
    "group": "나",
    "recruitmentCount": 9,
    "field": "arts-general"
  },
  {
    "key": "na-visual-design-csat",
    "department": "시각디자인학과",
    "group": "나",
    "recruitmentCount": 2,
    "field": "arts-general"
  },
  {
    "key": "na-visual-design-practical",
    "department": "시각디자인학과",
    "group": "나",
    "recruitmentCount": 8,
    "field": "arts-practical"
  },
  {
    "key": "na-landscape-design",
    "department": "환경조경디자인학과",
    "group": "나",
    "recruitmentCount": 4,
    "field": "arts-general"
  },
  {
    "key": "na-clothing-design-csat",
    "department": "의류디자인학과",
    "group": "나",
    "recruitmentCount": 6,
    "field": "arts-general"
  },
  {
    "key": "na-clothing-design-practical",
    "department": "의류디자인학과",
    "group": "나",
    "recruitmentCount": 7,
    "field": "arts-practical"
  },
  {
    "key": "na-digital-content",
    "department": "디지털콘텐츠학과",
    "group": "나",
    "recruitmentCount": 2,
    "field": "arts-general"
  },
  {
    "key": "na-film-direction",
    "department": "연극영화학과(영화연출 및 제작)",
    "group": "나",
    "recruitmentCount": 8,
    "field": "arts-general"
  },
  {
    "key": "na-postmodern-music",
    "department": "PostModern음악학과",
    "group": "나",
    "recruitmentCount": 2,
    "field": "arts-general"
  },
  {
    "key": "na-physical-education",
    "department": "체육학과",
    "group": "나",
    "recruitmentCount": 33,
    "field": "arts-general"
  },
  {
    "key": "na-sports-medicine",
    "department": "스포츠의학과",
    "group": "나",
    "recruitmentCount": 20,
    "field": "arts-general"
  },
  {
    "key": "na-golf-industry",
    "department": "골프산업학과",
    "group": "나",
    "recruitmentCount": 23,
    "field": "arts-general"
  },
  {
    "key": "na-taekwondo",
    "department": "태권도학과",
    "group": "나",
    "recruitmentCount": 21,
    "field": "arts-general"
  }
] as const;

export const khuInternationalAdmissions2027: RegularAdmission[] = KHU_INTERNATIONAL_ROWS.map((row) => {
  const humanities = row.field === "humanities";
  const social = row.field === "social";
  const natural = row.field === "natural";
  const practical = row.field === "arts-practical";
  const arts = row.field.startsWith("arts-");
  const weights = humanities
    ? { koreanWeight:40, mathWeight:25, englishWeight:0, inquiryWeight:35 }
    : social
      ? { koreanWeight:35, mathWeight:35, englishWeight:0, inquiryWeight:30 }
      : natural
        ? { koreanWeight:25, mathWeight:40, englishWeight:0, inquiryWeight:35 }
        : { koreanWeight:60, mathWeight:0, englishWeight:0, inquiryWeight:40 };
  return {
    id: `khu-international-${row.key}`,
    universityId: "khu-international",
    universityName: "경희대학교(국제)",
    region: "경기",
    department: row.department,
    majorGroup: natural ? "자연·공학" : arts ? "예체능" : social ? "사회·상경" : "인문·어문",
    group: row.group,
    recruitmentCount: row.recruitmentCount,
    scoreMetric: "표준점수",
    ...weights,
    inquirySubjects: 2,
    inquiryAggregation: "sum",
    calculationMode: "weighted-sum-with-additive-bonuses",
    subjectScoreMultiplier: 3,
    finalScoreMultiplier: 1,
    gradeAdjustmentsAfterFinalMultiplier: true,
    inquiryConversionRequired: true,
    inquiryConversionPending: true,
    inquiryTypeBonusRequired: natural,
    inquiryTypeBonusRate: natural ? { "사탐":0, "과탐":0, "직탐":0 } : undefined,
    inquiryTypeBonusPerSubject: natural ? { "과탐":4 } : undefined,
    englishGradeTable: KHU_ENGLISH,
    koreanHistoryRequired: true,
    koreanHistoryGradePoints: KHU_HISTORY,
    schoolViolencePenaltyRequired: true,
    schoolViolencePenaltyNote: "경희대 2027 정시 학교폭력 조치사항 입력 필요: 1~3호 전형 총점의 1%, 4~5호 5%, 6~7호 20%, 8호 40% 감점, 9호 결격. 수능위주·실기위주별 만점과 감점 점수 환산을 별도 적용해야 하므로 지원자 조치사항 및 전형 총점 확인 전 최종 판정 보류.",
    practicalEvaluationRequired: practical,
    practicalEvaluationNote: practical ? "실기평가 점수 미입력(실기위주 일반전형). 전형별 실기 배점 확인 전 판정 보류." : undefined,
    calculationVerified: false,
    sourceUrl: KHU_INTERNATIONAL_SOURCE,
    verifiedAt: "2026-11-25",
    note: natural
      ? "2027 경희대 국제캠퍼스 자연계열: 국어25·수학40·탐구35, 수능 반영 총점 600점. 과탐 응시자는 변환표준점수 과목당 4점 가산(자유전공학부 제외). 탐구 변환표와 영역별 환산 세부값 미확보로 최종 환산 보류."
      : humanities
        ? "2027 경희대 국제캠퍼스 인문계열: 국어40·수학25·탐구35, 수능 반영 총점 600점. 탐구 변환표와 영어·한국사 감점 세부값 미확보로 최종 환산 보류."
        : social
          ? "2027 경희대 국제캠퍼스 사회계열: 국어35·수학35·탐구30, 수능 반영 총점 600점. 탐구 변환표와 영어·한국사 감점 세부값 미확보로 최종 환산 보류."
          : practical
            ? "2027 경희대 국제캠퍼스 실기위주 일반전형. 실기점수 입력 및 세부 반영비율 검증 전 최종 판정 보류."
            : "2027 경희대 국제캠퍼스 예술·체육계열 수능위주 일반전형: 국어60·탐구40. 영역별 환산 세부값 검증 전 최종 판정 보류."
  };
});

if (khuInternationalAdmissions2027.length !== 43 ||
    khuInternationalAdmissions2027.reduce((sum,row)=>sum+(row.recruitmentCount ?? 0),0) !== 866) {
  throw new Error("경희대 국제캠퍼스 2027 정시 모집단위·인원 검증 실패");
}
