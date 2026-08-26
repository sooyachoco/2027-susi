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
  ["kwangwoon-northeast-culture", "동북아문화산업학부", "인문·문화"],
  ["kwangwoon-admin", "행정학과", "사회과학"],
  ["kwangwoon-psychology", "산업심리학과", "사회과학"],
  ["kwangwoon-korean", "국어국문학과", "인문·어문"],
  ["kwangwoon-international", "국제학부", "인문·국제"],
  ["kwangwoon-english-industry", "영어산업학과", "인문·어문"],
  ["kwangwoon-math", "수학과", "자연과학"],
  ["kwangwoon-electronic-biophysics", "전자바이오물리학과", "자연과학·바이오"],
  ["kwangwoon-electronics", "전자공학과", "공학·전자"],
  ["kwangwoon-media", "미디어커뮤니케이션학부", "사회과학·미디어"],
] as const;

export const verifiedKwangwoon2027Departments: Department[] = departmentSeed.map(
  ([id, name, category]) => ({ id, universityId: "kwangwoon", name, category })
);

export const verifiedKwangwoon2027Admissions: Admission[] = verifiedKwangwoon2027Departments.flatMap((department) => [
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
