import type { Admission, Department, University } from "./types";

const source = {
  type: "university" as const,
  url: "https://www.skhu.ac.kr/enter/3065/subview.do",
  document: "성공회대학교 2027학년도 수시 모집요강",
  academicYear: 2027,
  verifiedAt: "2026-08-27",
  confidence: 0.99,
};

export const verifiedSungkonghoe2027Universities: University[] = [
  { id: "sungkonghoe", name: "성공회대학교", region: "서울" },
];

const seed = [
  ["humanities", "인문융합콘텐츠학부", "인문", 36, 14],
  ["business", "경영학부", "상경", 22, 7],
  ["social", "사회융합학부", "사회과학", 33, 15],
  ["media", "미디어콘텐츠융합학부", "미디어", 33, 11],
  ["future", "미래융합학부", "융합", 20, 7],
  ["software", "소프트웨어융합학부", "IT", 52, 22],
  ["free", "자유전공학부", "자유전공", 0, 109],
] as const;

export const verifiedSungkonghoe2027Departments: Department[] = seed.map(([id, name, category]) => ({
  id: `sungkonghoe-${id}`,
  universityId: "sungkonghoe",
  name,
  category,
}));

export const verifiedSungkonghoe2027Admissions: Admission[] = seed.flatMap(([id, , , openCount, gradeCount]) => {
  const departmentId = `sungkonghoe-${id}`;
  const result: Admission[] = [];
  if (openCount > 0) result.push({
    id: `${departmentId}-open-2027`, universityId: "sungkonghoe", departmentId,
    academicYear: 2027, name: "학생부종합(열린인재)", type: "학종",
    recruitmentCount: openCount, documentWeight: 60, interview: true,
    csatMinimum: { enabled: false }, source, isMock: false,
  });
  if (gradeCount > 0) result.push({
    id: `${departmentId}-grade-2027`, universityId: "sungkonghoe", departmentId,
    academicYear: 2027, name: "학생부교과(교과성적)", type: "교과",
    recruitmentCount: gradeCount, studentRecordWeight: 100,
    csatMinimum: { enabled: false }, source, isMock: false,
  });
  return result;
});
