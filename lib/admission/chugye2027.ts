import type { Admission, Department, University } from "./types";

const source = (url: string) => ({
  type: "university" as const,
  academicYear: 2027,
  url,
  confidence: 0.97,
});

const url = "https://enter.chugye.ac.kr/ArticleList.do?categorySeq=504&dataSeq=494&menuSeq=16";

export const chugye2027Universities: University[] = [
  { id: "chugye", name: "추계예술대학교", region: "서울" },
];

const defs: Array<[string, string, string]> = [
  ["gugak", "국악과", "예체능"],
  ["vocal", "성악과", "예체능"],
  ["piano", "피아노과", "예체능"],
  ["orchestra", "관현악과", "예체능"],
  ["composition", "작곡과", "예체능"],
  ["fine-art", "미술창작학부", "예체능"],
  ["creative-writing", "문예창작과", "인문·사회"],
  ["convergence-art", "융합예술학부", "예체능"],
];

export const chugye2027Departments: Department[] = defs.map(([id, name, category]) => ({
  id: `chugye-${id}`,
  universityId: "chugye",
  name,
  category,
}));

const admission = (
  departmentId: string,
  name: string,
  type: Admission["type"],
  recruitmentCount: number,
  options: Partial<Admission> = {},
): Admission => ({
  id: `chugye-${departmentId}-${name}-${2027}`,
  universityId: "chugye",
  departmentId: `chugye-${departmentId}`,
  academicYear: 2027,
  name,
  type,
  recruitmentCount,
  csatMinimum: { enabled: false },
  source: source(url),
  isMock: false,
  ...options,
});

export const chugye2027Admissions: Admission[] = [
  admission("gugak", "실기/실적(일반학생)", "기타", 21),
  admission("vocal", "실기/실적(일반학생)", "기타", 24),
  admission("piano", "실기/실적(일반학생)", "기타", 6),
  admission("orchestra", "실기/실적(일반학생)", "기타", 19),
  admission("composition", "실기/실적(일반학생)", "기타", 10),
  admission("fine-art", "실기/실적(일반학생)", "기타", 45, { studentRecordWeight: 20 }),
  admission("creative-writing", "실기/실적(수상실적특기자)", "기타", 4, { documentWeight: 100 }),
  admission("convergence-art", "학생부교과(미래인재)", "교과", 10, { studentRecordWeight: 40, interview: true }),
];
