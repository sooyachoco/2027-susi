import type { Admission, Department, University } from "./types";

const incheonSource = {
  type: "university" as const,
  url: "https://admission.inu.ac.kr/main.do",
  document: "인천대학교 2027학년도 수시모집요강",
  academicYear: 2027,
  confidence: 0.98,
};

export const verifiedIncheonAllFields2027Universities: University[] = [
  { id: "incheon", name: "인천대학교", region: "인천" },
];

export const verifiedIncheonAllFields2027Departments: Department[] = [
  ["incheon-korean", "국어국문학과", "인문·어문"],
  ["incheon-german", "독어독문학과", "인문·어문"],
  ["incheon-japanese-education", "일어교육과", "교육"],
  ["incheon-chinese", "중어중국학과", "인문·어문"],
  ["incheon-media", "미디어커뮤니케이션학과", "사회과학·미디어"],
  ["incheon-public-admin", "행정학과", "사회과학"],
  ["incheon-urban-admin", "도시행정학과", "사회과학·도시"],
  ["incheon-fashion", "패션산업학과", "생활·디자인"],
  ["incheon-math", "수학과", "자연과학"],
  ["incheon-chemistry", "화학과", "자연과학"],
  ["incheon-environment", "환경공학전공", "공학·환경"],
  ["incheon-civil-environment", "건설환경공학전공", "공학·환경"],
  ["incheon-bio-robot", "바이오-로봇시스템공학과", "바이오·로봇"],
  ["incheon-design", "디자인학부", "디자인·예체능"],
  ["incheon-sports", "스포츠과학부", "체육"],
  ["incheon-exercise-health", "운동건강학부", "체육·보건"],
  ["incheon-performance", "공연예술학과", "공연예술"],
  ["incheon-free", "자유전공학부", "자유전공·융합"],
].map(([id, name, category]) => ({ id, universityId: "incheon", name, category }));

const departments = verifiedIncheonAllFields2027Departments;

export const verifiedIncheonAllFields2027Admissions: Admission[] = departments.flatMap((department) => [
  {
    id: `${department.id}-self-2027`,
    universityId: "incheon",
    departmentId: department.id,
    academicYear: 2027,
    name: "학생부종합(자기추천전형)",
    type: "학종" as const,
    documentWeight: 70,
    interview: true,
    csatMinimum: { enabled: false },
    source: incheonSource,
    isMock: false,
  },
  {
    id: `${department.id}-grade-2027`,
    universityId: "incheon",
    departmentId: department.id,
    academicYear: 2027,
    name: "학생부교과(교과성적우수자전형)",
    type: "교과" as const,
    studentRecordWeight: 100,
    csatMinimum: {
      enabled: true,
      requiredSubjects: 2,
      gradeSum: 7,
      description: "인문계열·자연계열·디자인학부(동북아국제통상전공 제외) 2개 영역 등급합 7 이내. 동북아국제통상전공은 등급합 6 이내.",
    },
    source: incheonSource,
    isMock: false,
  },
  {
    id: `${department.id}-regional-2027`,
    universityId: "incheon",
    departmentId: department.id,
    academicYear: 2027,
    name: "학생부교과(지역균형전형)",
    type: "교과" as const,
    studentRecordWeight: 100,
    csatMinimum: { enabled: false },
    source: incheonSource,
    isMock: false,
  },
]);
