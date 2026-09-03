import type { Admission, Department, University } from "./types";

const source = { type: "university" as const, academicYear: 2027, url: "https://entrance.gangseo.ac.kr/template/2027susi.pdf", confidence: 0.98 };

export const gangseo2027Universities: University[] = [
  { id: "gangseo", name: "강서대학교", region: "서울" },
];

const departments = [
  ["business", "경영학과", "경영·경제"],
  ["social-welfare", "사회복지학과", "인문·사회"],
  ["counseling", "상담심리학과", "인문·사회"],
  ["food-nutrition", "식품영양학과", "자연·생활"],
  ["nursing", "간호학과", "보건·간호"],
  ["practical-music", "실용음악학과", "디자인·예술"],
  ["free-major", "자유전공학부", "자유전공"],
] as const;

export const gangseo2027Departments: Department[] = departments.map(([id, name, category]) => ({ id: `gangseo-${id}`, universityId: "gangseo", name, category }));

const aggregate: Department = { id: "gangseo-overall", universityId: "gangseo", name: "2027 수시 전체(신학과 제외)", category: "전체" };
export const gangseo2027DepartmentsWithAggregate: Department[] = [...gangseo2027Departments, aggregate];

const admissions: Array<[string, Admission["type"], number, number?, number?]> = [
  ["일반학생", "교과", 102, 80, 20],
  ["교과우수자", "교과", 100, 100],
  ["사회통합", "교과", 10, 80, 20],
  ["실기 일반학생", "기타", 23],
  ["실기 사회통합", "기타", 2],
  ["자유전공", "교과", 45, 100],
];

export const gangseo2027Admissions: Admission[] = admissions.map(([name, type, count, studentRecordWeight, interviewWeight]) => ({
  id: `gangseo-2027-${name}`,
  universityId: "gangseo",
  departmentId: "gangseo-overall",
  academicYear: 2027,
  name,
  type,
  recruitmentCount: count,
  ...(studentRecordWeight !== undefined ? { studentRecordWeight } : {}),
  ...(interviewWeight ? { interview: true } : {}),
  csatMinimum: { enabled: false },
  source,
  isMock: false,
}));

export const gangseo2027AggregateDepartment = aggregate;
