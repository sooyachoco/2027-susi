import type { Admission, Department, University } from "./types";

const source = { type: "university" as const, academicYear: 2027, url: "https://go.skuniv.ac.kr/", confidence: 0.99 };

export const seokyeong2027Universities: University[] = [
  { id: "skuniv", name: "서경대학교", region: "서울" },
];

const departments: Array<[string, string, string]> = [
  ["future1", "미래융합학부1", "인문·사회"],
  ["future2", "미래융합학부2", "자연·공학"],
  ["free", "자유전공학부", "자유전공"],
  ["military", "군사학과", "인문·사회"],
  ["art-tech", "아트앤테크놀로지학과", "디자인·예술"],
  ["sports-tech", "스포츠앤테크놀로지학과", "체육"],
  ["hair", "헤어디자인학과", "디자인·예술"],
  ["cosmetic", "코스메틱뷰티매니지먼트학과", "디자인·예술"],
  ["makeup", "메이크업디자인학과", "디자인·예술"],
  ["visual-design", "디자인학부(VD_비주얼디자인전공)", "디자인·예술"],
  ["lifestyle-design", "디자인학부(LF_라이프스타일디자인전공)", "디자인·예술"],
  ["film", "영화영상학과", "미디어·콘텐츠"],
  ["ad-pr", "광고홍보영상학과", "미디어·콘텐츠"],
  ["acting", "공연예술학부(연기전공)", "디자인·예술"],
  ["directing", "공연예술학부(연출전공)", "디자인·예술"],
  ["model", "공연예술학부(모델연기전공)", "디자인·예술"],
  ["stage-tech", "공연예술학부(무대기술전공)", "디자인·예술"],
  ["stage-fashion", "공연예술학부(무대패션전공)", "디자인·예술"],
  ["musical", "공연예술학부(뮤지컬전공)", "디자인·예술"],
  ["practical-music", "실용음악학부", "음악"],
  ["dance-korean", "무용예술학부(한국무용전공)", "체육"],
  ["dance-practical", "무용예술학부(실용무용전공)", "체육"],
  ["piano", "음악학부(피아노전공)", "음악"],
  ["orchestra", "음악학부(관현악전공)", "음악"],
];

export const seokyeong2027Departments: Department[] = departments.map(([id, name, category]) => ({
  id: `skuniv-${id}`,
  universityId: "skuniv",
  name,
  category,
}));

const aggregate: Department = { id: "skuniv-overall", universityId: "skuniv", name: "2027 수시 전체", category: "전체" };
export const seokyeong2027DepartmentsWithAggregate: Department[] = [...seokyeong2027Departments, aggregate];

const admissions: Array<{ name: string; type: Admission["type"]; count: number; studentRecordWeight?: number }> = [
  { name: "논술우수자", type: "논술", count: 204 },
  { name: "교과우수자", type: "교과", count: 112, studentRecordWeight: 100 },
  { name: "교과균형", type: "교과", count: 204, studentRecordWeight: 100 },
  { name: "사회기여자", type: "교과", count: 12, studentRecordWeight: 100 },
  { name: "군사학과", type: "교과", count: 30, studentRecordWeight: 100 },
  { name: "실기우수자", type: "기타", count: 409, studentRecordWeight: 25 },
  { name: "기회균형①", type: "교과", count: 22, studentRecordWeight: 100 },
  { name: "기회균형②_농어촌학생", type: "교과", count: 47, studentRecordWeight: 100 },
  { name: "기회균형②_서해5도", type: "교과", count: 12, studentRecordWeight: 100 },
  { name: "기회균형②_특성화고교졸업자", type: "교과", count: 11, studentRecordWeight: 100 },
];

export const seokyeong2027Admissions: Admission[] = admissions.map((m) => ({
  id: `skuniv-2027-${m.name}`,
  universityId: "skuniv",
  departmentId: aggregate.id,
  academicYear: 2027,
  name: m.name,
  type: m.type,
  recruitmentCount: m.count,
  ...(m.studentRecordWeight !== undefined ? { studentRecordWeight: m.studentRecordWeight } : {}),
  csatMinimum: { enabled: ["교과우수자", "논술우수자", "기회균형①"].includes(m.name) },
  source,
  isMock: false,
}));

export const seokyeong2027AggregateDepartment = aggregate;
