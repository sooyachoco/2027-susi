import type { Admission, Department, University } from "./types";

const source = {
  type: "university" as const,
  url: "https://www.skhu.ac.kr/enter/3065/subview.do",
  document: "성공회대학교 2027학년도 수시 모집요강",
  academicYear: 2027,
  confidence: 0.97,
};

export const verifiedSungkonghoe2027Universities: University[] = [
  { id: "sungkonghoe", name: "성공회대학교", region: "서울" },
];

const seed = [
  ["humanities", "인문융합콘텐츠학부", "인문"],
  ["business", "경영학부", "상경"],
  ["social", "사회융합학부", "사회과학"],
  ["media", "미디어콘텐츠융합학부", "미디어"],
  ["software", "소프트웨어융합학부", "IT"],
  ["future", "미래융합학부", "융합"],
  ["free", "자유전공학부", "자유전공"],
] as const;

export const verifiedSungkonghoe2027Departments: Department[] = seed.map(([id, name, category]) => ({
  id: `sungkonghoe-${id}`,
  universityId: "sungkonghoe",
  name,
  category,
}));

export const verifiedSungkonghoe2027Admissions: Admission[] = verifiedSungkonghoe2027Departments.flatMap((d) => [
  {
    id: `${d.id}-open-2027`, universityId: "sungkonghoe", departmentId: d.id,
    academicYear: 2027, name: "학생부종합(열린인재)", type: "학종" as const,
    documentWeight: 60, interview: true,
    csatMinimum: { enabled: false }, source, isMock: false,
  },
  {
    id: `${d.id}-grade-2027`, universityId: "sungkonghoe", departmentId: d.id,
    academicYear: 2027, name: "학생부교과(교과성적)", type: "교과" as const,
    studentRecordWeight: 100,
    csatMinimum: { enabled: false }, source, isMock: false,
  },
]);
