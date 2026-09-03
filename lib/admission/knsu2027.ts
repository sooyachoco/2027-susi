import type { Admission, Department, University } from "./types";

const source = { type: "university" as const, academicYear: 2027, url: "https://www.knsu.ac.kr/ipsi/regular/susi.do", collectedAt: "2026-09-03", verifiedAt: "2026-09-03", confidence: 0.99 };

export const knsu2027Universities: University[] = [{ id: "knsu", name: "한국체육대학교", region: "서울" }];
const departments = [
  ["physical", "체육학과", "체육"], ["game", "경기지도학과", "체육"], ["social", "사회체육학과", "체육"],
  ["youth", "스포츠청소년지도학과", "체육"], ["special", "특수체육교육과", "체육·사범"], ["industry", "스포츠산업학과", "체육"],
  ["health", "운동건강관리학과", "체육"], ["senior", "노인체육복지학과", "체육"], ["performing", "공연예술학과", "예술"], ["taekwondo", "태권도학과", "체육"],
] as const;
export const knsu2027Departments: Department[] = [
  { id: "knsu-overall", universityId: "knsu", name: "2027 수시 전체(모집단위 합계)", category: "전체" },
  ...departments.map(([id, name, category]) => ({ id: `knsu-${id}`, universityId: "knsu", name, category })),
];
const methods: Array<[string, Admission["type"], number, number?, boolean?]> = [
  ["체육특기자", "기타", 164, 10], ["경기입상실적우수자", "기타", 31, 10], ["실기우수자", "기타", 35, 30],
  ["교과성적우수자", "교과", 50, 80, true], ["국가보훈대상자", "교과", 5, 100, true], ["특수교육대상자", "기타", 13, 20, true],
  ["농어촌지역학생", "기타", 20, 30, true], ["외국인군(북한이탈주민 포함)", "기타", 2],
];
export const knsu2027Admissions: Admission[] = methods.map(([name, type, count, studentRecordWeight, csat]) => ({
  id: `knsu-2027-${name}`, universityId: "knsu", departmentId: "knsu-overall", academicYear: 2027, name, type, recruitmentCount: count,
  ...(studentRecordWeight !== undefined ? { studentRecordWeight } : {}), csatMinimum: { enabled: !!csat }, source, isMock: false,
}));
