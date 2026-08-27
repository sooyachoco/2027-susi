import type { Admission, Department, University } from "./types";

const source = {
  type: "adiga" as const,
  url: "https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000074",
  document: "대입정보포털 광운대학교 2027학년도 전형평가기준 및 결과공개",
  academicYear: 2027,
  confidence: 0.97,
};

export const verifiedKwangwoon2027Universities: University[] = [
  { id: "kwangwoon", name: "광운대학교", region: "서울" },
];

const departmentSeed = [
  ["kwangwoon-electronics", "전자공학과", "공학·전자"],
  ["kwangwoon-electronic-communication", "전자통신공학과", "공학·전자"],
  ["kwangwoon-electronic-convergence", "전자융합공학과", "공학·전자"],
  ["kwangwoon-electrical", "전기공학과", "공학·전기"],
  ["kwangwoon-electronic-materials", "전자재료공학과", "공학·전자"],
  ["kwangwoon-semiconductor", "반도체시스템공학부", "공학·반도체"],
  ["kwangwoon-computer", "컴퓨터정보공학부", "컴퓨터·소프트웨어"],
  ["kwangwoon-software", "소프트웨어학부", "컴퓨터·소프트웨어"],
  ["kwangwoon-information-convergence", "정보융합학부", "컴퓨터·데이터"],
  ["kwangwoon-robot", "로봇학부 AI로봇전공", "컴퓨터·로봇"],
  ["kwangwoon-architecture", "건축학과", "건축"],
  ["kwangwoon-architecture-engineering", "건축공학과", "건축"],
  ["kwangwoon-chemical", "화학공학과", "공학·화학"],
  ["kwangwoon-environment", "환경공학과", "공학·환경"],
  ["kwangwoon-math", "수학과", "자연과학"],
  ["kwangwoon-electronic-biophysics", "전자바이오물리학과", "자연과학·바이오"],
  ["kwangwoon-chemistry", "화학과", "자연과학"],
  ["kwangwoon-korean", "국어국문학과", "인문·어문"],
  ["kwangwoon-english", "영어영문학과", "인문·어문"],
  ["kwangwoon-media", "미디어커뮤니케이션학부", "사회과학·미디어"],
  ["kwangwoon-psychology", "산업심리학과", "사회과학"],
  ["kwangwoon-northeast-culture", "동북아문화산업학부", "인문·문화"],
  ["kwangwoon-admin", "행정학과", "사회과학"],
  ["kwangwoon-law", "법학부", "법·행정"],
  ["kwangwoon-international", "국제학부", "인문·국제"],
  ["kwangwoon-business", "경영학부 경영학전공", "경영·경제"],
  ["kwangwoon-business-bigdata", "경영학부 빅데이터경영전공", "경영·데이터"],
  ["kwangwoon-international-trade", "국제통상학부", "경영·국제"],
] as const;

export const verifiedKwangwoon2027Departments: Department[] = departmentSeed.map(
  ([id, name, category]) => ({ id, universityId: "kwangwoon", name, category })
);

const commonAdmissions = verifiedKwangwoon2027Departments.flatMap((department) => [
  {
    id: `${department.id}-bright-2027`,
    universityId: "kwangwoon",
    departmentId: department.id,
    academicYear: 2027,
    name: "광운참빛인재전형Ⅰ-면접형",
    type: "학종" as const,
    documentWeight: 60,
    interview: true,
    csatMinimum: { enabled: false },
    source,
    isMock: false,
  },
  {
    id: `${department.id}-bright-doc-2027`,
    universityId: "kwangwoon",
    departmentId: department.id,
    academicYear: 2027,
    name: "광운참빛인재전형Ⅱ-서류형",
    type: "학종" as const,
    documentWeight: 100,
    interview: false,
    csatMinimum: { enabled: false },
    source,
    isMock: false,
  },
  {
    id: `${department.id}-regional-2027`,
    universityId: "kwangwoon",
    departmentId: department.id,
    academicYear: 2027,
    name: "지역균형전형",
    type: "교과" as const,
    studentRecordWeight: 100,
    interview: false,
    csatMinimum: { enabled: false },
    source,
    isMock: false,
  },
]);

const softwareDepartmentIds = new Set([
  "kwangwoon-computer",
  "kwangwoon-software",
  "kwangwoon-information-convergence",
  "kwangwoon-robot",
]);

const softwareAdmissions = verifiedKwangwoon2027Departments
  .filter((department) => softwareDepartmentIds.has(department.id))
  .map((department) => ({
    id: `${department.id}-software-excellence-2027`,
    universityId: "kwangwoon",
    departmentId: department.id,
    academicYear: 2027,
    name: "소프트웨어우수인재전형",
    type: "학종" as const,
    documentWeight: 60,
    interview: true,
    csatMinimum: { enabled: false },
    source,
    isMock: false,
  }));

const essayRecruitmentCounts: Record<string, number> = {
  "kwangwoon-electronics": 13,
  "kwangwoon-electronic-communication": 9,
  "kwangwoon-electronic-convergence": 8,
  "kwangwoon-electrical": 8,
  "kwangwoon-electronic-materials": 8,
  "kwangwoon-semiconductor": 6,
  "kwangwoon-computer": 8,
  "kwangwoon-software": 9,
  "kwangwoon-information-convergence": 8,
  "kwangwoon-robot": 8,
  "kwangwoon-architecture": 4,
  "kwangwoon-architecture-engineering": 4,
  "kwangwoon-chemical": 7,
  "kwangwoon-environment": 4,
  "kwangwoon-math": 5,
  "kwangwoon-electronic-biophysics": 5,
  "kwangwoon-chemistry": 6,
  "kwangwoon-korean": 4,
  "kwangwoon-english": 4,
  "kwangwoon-media": 8,
  "kwangwoon-psychology": 4,
  "kwangwoon-northeast-culture": 6,
  "kwangwoon-admin": 5,
  "kwangwoon-law": 12,
  "kwangwoon-international": 4,
  "kwangwoon-business": 12,
  "kwangwoon-business-bigdata": 4,
  "kwangwoon-international-trade": 6,
};

const essayAdmissions: Admission[] = verifiedKwangwoon2027Departments
  .filter((department) => essayRecruitmentCounts[department.id] !== undefined)
  .map((department) => ({
    id: `${department.id}-essay-2027`,
    universityId: "kwangwoon",
    departmentId: department.id,
    academicYear: 2027,
    name: "논술우수자전형",
    type: "논술" as const,
    recruitmentCount: essayRecruitmentCounts[department.id],
    studentRecordWeight: 20,
    csatMinimum: { enabled: false },
    source,
    isMock: false,
  }));

export const verifiedKwangwoon2027Admissions: Admission[] = [
  ...commonAdmissions,
  ...softwareAdmissions,
  ...essayAdmissions,
];
