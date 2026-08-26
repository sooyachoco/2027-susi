import type { Admission, Department, University } from "./types";

const gachonSource = {
  type: "university" as const,
  url: "https://admission.gachon.ac.kr/admission/html/rolling/noticeView.asp?BOARD_IDX=30228",
  document: "가천대학교 2027학년도 수시 모집요강",
  academicYear: 2027,
  confidence: 0.98,
};

export const verifiedGachonAllFields2027Universities: University[] = [
  { id: "gachon", name: "가천대학교", region: "경기" },
];

// 2027 최종 수시모집요강에 등장하는 비법·경영·컴퓨터 계열의 주요 모집단위.
// 의예·한의예·약학 및 예체능은 별도 전형요소가 적용되므로 이 묶음에서는 분리한다.
export const verifiedGachonAllFields2027Departments: Department[] = [
  ["gachon-accounting-tax", "회계세무학과", "경영·경제"],
  ["gachon-tourism-business", "관광경영학과", "경영·관광"],
  ["gachon-medical-industry-business", "의료산업경영학과", "보건·경영"],
  ["gachon-finance-bigdata", "금융·빅데이터학부", "금융·데이터"],
  ["gachon-media", "미디어커뮤니케이션학과", "미디어·커뮤니케이션"],
  ["gachon-economics", "경제학과", "경영·경제"],
  ["gachon-applied-statistics", "응용통계학과", "수학·통계"],
  ["gachon-social-welfare", "사회복지학과", "사회과학"],
  ["gachon-early-childhood", "유아교육학과", "교육"],
  ["gachon-psychology", "심리학과", "사회과학"],
  ["gachon-fashion", "패션산업학과", "생활·디자인"],
  ["gachon-ai-humanities", "AI인문대학", "인문·융합"],
  ["gachon-urban-landscape", "도시계획·조경학부", "건축·도시"],
  ["gachon-architecture", "건축학부", "건축·도시"],
  ["gachon-architectural-engineering", "건축공학과", "건축·도시"],
  ["gachon-chemical-battery", "화공생명배터리공학부", "공학·바이오"],
  ["gachon-mechanical", "기계공학부", "기계·공학"],
  ["gachon-smart-factory", "스마트팩토리학과", "산업·공학"],
  ["gachon-civil-environment", "건설환경공학과", "토목·환경"],
  ["gachon-materials", "신소재공학과", "신소재·공학"],
  ["gachon-bionano", "바이오나노학과", "바이오"],
  ["gachon-food-bio", "식품생명공학과", "생명·식품"],
  ["gachon-food-nutrition", "식품영양학과", "식품·보건"],
  ["gachon-life-science", "생명과학과", "자연과학·생명"],
  ["gachon-semiconductor-physics", "반도체물리학과", "자연과학·반도체"],
  ["gachon-chemistry", "화학과", "자연과학"],
  ["gachon-semiconductor-college", "반도체대학", "반도체·공학"],
  ["gachon-system-semiconductor", "시스템반도체학과", "반도체·공학"],
  ["gachon-ai", "인공지능학과", "AI·소프트웨어"],
  ["gachon-smart-security", "스마트보안학과", "정보보호·보안"],
  ["gachon-electrical", "전기공학과", "전기·전자"],
  ["gachon-smart-city", "스마트시티학과", "도시·첨단융합"],
  ["gachon-biomedical", "의공학과", "바이오·공학"],
  ["gachon-biology", "바이오로직스학과", "바이오"],
  ["gachon-nursing", "간호학과", "간호·보건"],
  ["gachon-dental-hygiene", "치위생학과", "보건"],
  ["gachon-emergency", "응급구조학과", "보건"],
  ["gachon-physical-therapy", "물리치료학과", "보건"],
  ["gachon-radiology", "방사선학과", "보건"],
  ["gachon-exercise-rehab", "운동재활학과", "체육·보건"],
  ["gachon-free", "자유전공학부(자유전공)", "자유전공·융합"],
].map(([id, name, category]) => ({ id, universityId: "gachon", name, category }));

const departments = verifiedGachonAllFields2027Departments;

export const verifiedGachonAllFields2027Admissions: Admission[] = departments.flatMap((department) => [
  {
    id: `${department.id}-baram-2027`,
    universityId: "gachon",
    departmentId: department.id,
    academicYear: 2027,
    name: "학생부종합(가천바람개비)",
    type: "학종" as const,
    documentWeight: 50,
    interview: true,
    csatMinimum: { enabled: false },
    source: gachonSource,
    isMock: false,
  },
  {
    id: `${department.id}-excellent-2027`,
    universityId: "gachon",
    departmentId: department.id,
    academicYear: 2027,
    name: "학생부교과(학생부우수자)",
    type: "교과" as const,
    studentRecordWeight: 100,
    csatMinimum: { enabled: true, description: "수능최저 적용. 세부 기준은 모집단위별 2027 수시모집요강 확인" },
    source: gachonSource,
    isMock: false,
  },
  {
    id: `${department.id}-region-2027`,
    universityId: "gachon",
    departmentId: department.id,
    academicYear: 2027,
    name: "학생부교과(지역균형)",
    type: "교과" as const,
    studentRecordWeight: 50,
    interview: true,
    csatMinimum: { enabled: false },
    source: gachonSource,
    isMock: false,
  },
]);
