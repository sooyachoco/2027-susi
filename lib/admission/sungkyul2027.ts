import type { Admission, Department } from "./types";

const source = {
  type: "university" as const,
  academicYear: 2027,
  url: "https://www.sungkyul.ac.kr/ipsi/101/subview.do",
  document: "2027학년도 성결대학교 수시모집요강",
  confidence: 0.99,
  verifiedAt: "2026-09-05",
};

// 2027학년도 최종 수시 모집요강 기준 모집단위 명칭을 반영한다.
// 전형별 학과 배정 인원은 공식 자료의 전체 전형별 합계와 분리해 관리한다.
const catalog: Array<[string, string, string]> = [
  ["theology", "신학과", "인문·사회"],
  ["korean-culture", "한국어문화학과", "인문·사회"],
  ["english-culture", "영미언어문화학과", "인문·사회"],
  ["chinese-culture", "중국어문화학과", "인문·사회"],
  ["public-admin", "행정학부", "인문·사회"],
  ["social-welfare", "사회복지학과", "인문·사회"],
  ["global-development", "국제교류·개발협력학과", "인문·사회"],
  ["early-childhood", "유아교육과", "교육"],
  ["global-logistics", "글로벌물류학과", "경영·서비스"],
  ["smart-tourism", "스마트관광항공학부(관광학전공)", "관광·서비스"],
  ["smart-aviation", "스마트관광항공학부(항공경영전공)", "관광·서비스"],
  ["business", "경영학과", "경영·서비스"],
  ["christian-education", "기독교교육상담학과", "인문·사회"],
  ["humanities-free", "인문사회계열자율전공학부", "자유전공"],
  ["computer-ai", "컴퓨터AI공학과", "컴퓨터·AI"],
  ["ict", "ICT공학과", "컴퓨터·소프트웨어"],
  ["media-software", "미디어소프트웨어학과", "컴퓨터·소프트웨어"],
  ["engineering-free", "공학계열자율전공학부", "자유전공"],
  ["industrial-systems", "산업시스템공학과", "공학"],
  ["smart-city", "스마트도시공학과", "공학"],
  ["cosmetics-engineering", "화장품공학과", "공학"],
  ["beauty-design", "뷰티디자인학과", "예체능"],
  ["physical-education", "체육교육과", "예체능"],
  ["acting", "연기예술학과", "예체능"],
  ["film", "영화영상학과", "예체능"],
  ["music", "음악학부", "예체능"],
  ["practical-music", "실용음악예술학과", "예체능"],
  ["convergence", "융합학부", "융합"],
  ["sk-open-major", "SK자율전공학부", "자유전공"],
];

export const sungkyul2027Departments: Department[] = catalog.map(([id, name, category]) => ({
  id: `sungkyul-${id}`,
  universityId: "sungkyul",
  name,
  category,
}));

// 공식 대입정보포털 및 성결대 모집요강에서 2027학년도 전형별 전체 모집인원을 확인했다.
// 학과별 배정 수치는 공식 최종표를 전형/모집단위별로 별도 대조한 뒤 넣어야 하므로,
// 현재는 전체 합계 행을 isAggregate=true로 저장해 가짜 학과별 복제를 방지한다.
const aggregateDefs: Array<[string, string, "교과" | "학종", number, number, boolean, number]> = [
  ["subject", "교과성적우수자", "교과", 424, 100, false, 0],
  ["sku-creative", "SKU창의", "교과", 263, 40, true, 60],
  ["fair-chance-1", "고른기회Ⅰ", "교과", 38, 100, false, 0],
  ["pastor-recommendation", "목회자추천자", "교과", 15, 70, true, 30],
  ["future-talent", "미래인재", "교과", 30, 70, true, 30],
  ["specialized-highschool", "특성화고교졸업자", "교과", 43, 100, false, 0],
  ["rural", "농어촌학생", "교과", 15, 100, false, 0],
  ["fair-chance-2", "고른기회Ⅱ", "교과", 26, 100, false, 0],
  ["yeongam", "영암인재", "학종", 186, 0, false, 0],
];

export const sungkyul2027Admissions: Admission[] = aggregateDefs.map(
  ([id, name, type, recruitmentCount, studentRecordWeight, interview, interviewWeight]) => ({
    id: `sungkyul-${id}-2027`,
    universityId: "sungkyul",
    // 전체 대학 전형 합계는 특정 학과에 임의 귀속하지 않는다.
    departmentId: "sungkyul-aggregate",
    academicYear: 2027,
    name,
    type,
    recruitmentCount,
    ...(type === "학종" ? { documentWeight: 100 } : { studentRecordWeight }),
    interview,
    source,
    isMock: false,
    isAggregate: true,
    ...(interviewWeight > 0 ? { majorGroup: `면접 ${interviewWeight}%` } : {}),
  }),
);
