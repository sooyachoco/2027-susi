import type { Admission, Department, University } from "./types";

const source = { type: "university" as const, academicYear: 2027, url: "https://enter.skhu.ac.kr/enter/3070/subview.do", confidence: 0.99 };

export const skhu2027Universities: University[] = [
  { id: "skhu", name: "성공회대학교", region: "서울" },
];

const departments = [
  ["humanities", "인문융합콘텐츠학부", "인문·사회"],
  ["business", "경영학부", "경영·경제"],
  ["social", "사회융합학부", "인문·사회"],
  ["media", "미디어콘텐츠융합학부", "미디어·콘텐츠"],
  ["future", "미래융합학부", "컴퓨터·AI"],
  ["software", "소프트웨어융합학부", "컴퓨터·소프트웨어"],
  ["free-major", "자유전공학부", "자유전공"],
] as const;

export const skhu2027Departments: Department[] = departments.map(([id, name, category]) => ({
  id: `skhu-${id}`,
  universityId: "skhu",
  name,
  category,
}));

const aggregate: Department = {
  id: "skhu-overall",
  universityId: "skhu",
  name: "2027 수시 전체",
  category: "전체",
};

export const skhu2027DepartmentsWithAggregate: Department[] = [...skhu2027Departments, aggregate];

const admissions: Array<[string, Admission["type"], number, number, boolean]> = [
  ["열린인재", "학종", 196, 60, true],
  ["대안학교출신자", "학종", 15, 60, true],
  ["교과성적", "교과", 185, 100, false],
  ["사회기여자 및 배려대상자", "교과", 8, 100, false],
  ["국가보훈대상자", "교과", 11, 100, false],
  ["특성화고교교과성적", "교과", 11, 100, false],
  ["기회균형선발", "교과", 15, 100, false],
  ["농어촌학생", "교과", 6, 100, false],
  ["특성화고교졸업자", "교과", 6, 100, false],
];

export const skhu2027Admissions: Admission[] = admissions.map(([name, type, count, studentRecordWeight, interview]) => ({
  id: `skhu-2027-${name}`,
  universityId: "skhu",
  departmentId: aggregate.id,
  academicYear: 2027,
  name,
  type,
  recruitmentCount: count,
  ...(type === "학종" ? { documentWeight: 60 } : { studentRecordWeight }),
  ...(interview ? { interview: true } : {}),
  csatMinimum: { enabled: false },
  source,
  isMock: false,
}));

export const skhu2027AggregateDepartment = aggregate;
