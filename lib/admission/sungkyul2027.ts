import type { Admission, Department } from "./types";

const source = {
  type: "university" as const,
  academicYear: 2027,
  url: "https://ipsi.sungkyul.ac.kr/10000007",
  confidence: 0.95,
};

// 2027 성결대 공식 입학처의 신설·명칭변경 공지에서 확인된 모집단위.
// 최종 모집요강의 전형별 학과 배정/학과별 모집인원은 별도 대조가 필요하므로 임의 배분하지 않는다.
const catalog: Array<[string, string, string]> = [
  ["korean-culture", "한국어문화학과", "인문·사회"],
  ["english-culture", "영미언어문화학과", "인문·사회"],
  ["chinese-culture", "중국어문화학과", "인문·사회"],
  ["smart-tourism", "스마트관광항공학부(관광학전공)", "관광·서비스"],
  ["smart-aviation", "스마트관광항공학부(항공경영전공)", "관광·서비스"],
  ["global-development", "국제교류·개발협력학과", "인문·사회"],
  ["computer-ai", "컴퓨터AI공학과", "컴퓨터·AI"],
  ["ict", "ICT공학과", "컴퓨터·소프트웨어"],
  ["industrial-systems", "산업시스템공학과", "공학"],
  ["smart-city", "스마트도시공학과", "공학"],
  ["cosmetics-engineering", "화장품공학과", "공학"],
  ["sk-open-major", "SK자율전공학부", "자유전공"],
];

export const sungkyul2027Departments: Department[] = catalog.map(([id, name, category]) => ({
  id: `sungkyul-${id}`,
  universityId: "sungkyul",
  name,
  category,
}));

// 대입정보포털 2027 성결대 전형평가기준과 공식 입학처 자료를 대조한 전형 방법.
// 영암인재: 서류 100%, 수능최저 없음.
// 교과성적우수자: 학생부교과 100%, 수능최저 없음.
// SKU창의: 1단계 학생부교과 100%(6배수), 2단계 1단계 성적 40% + 면접 60%.
// 미래인재/목회자추천자: 학생부교과 70% + 면접 30%.
// 전형별 총 모집인원은 확인됐지만 학과별 배정은 이 파일에서 임의로 복제하지 않는다.
export const sungkyul2027Admissions: Admission[] = sungkyul2027Departments.flatMap((department) => [
  {
    id: `${department.id}-subject-2027`,
    universityId: "sungkyul",
    departmentId: department.id,
    academicYear: 2027,
    name: "교과성적우수자",
    type: "교과" as const,
    studentRecordWeight: 100,
    csatMinimum: { enabled: false },
    source,
    isMock: false,
  },
  {
    id: `${department.id}-future-2027`,
    universityId: "sungkyul",
    departmentId: department.id,
    academicYear: 2027,
    name: "미래인재",
    type: "교과" as const,
    studentRecordWeight: 70,
    interview: true,
    csatMinimum: { enabled: false },
    source,
    isMock: false,
  },
  {
    id: `${department.id}-sku-creative-2027`,
    universityId: "sungkyul",
    departmentId: department.id,
    academicYear: 2027,
    name: "SKU창의",
    type: "교과" as const,
    studentRecordWeight: 40,
    interview: true,
    csatMinimum: { enabled: false },
    source,
    isMock: false,
  },
  {
    id: `${department.id}-yeongam-2027`,
    universityId: "sungkyul",
    departmentId: department.id,
    academicYear: 2027,
    name: "영암인재",
    type: "학종" as const,
    documentWeight: 100,
    interview: false,
    csatMinimum: { enabled: false },
    source,
    isMock: false,
  },
]);
