import type { Admission, Department, University } from "./types";

const source = {
  type: "university" as const,
  academicYear: 2027,
  url: "https://enter.duksung.ac.kr/notice/view.php?bn=6947&m_type=SUSI",
  document: "2027학년도 덕성여자대학교 수시모집요강",
  confidence: 0.99,
};

export const duksung2027Universities: University[] = [
  { id: "duksung", name: "덕성여자대학교", region: "서울" },
];

const departments: Array<[string, string, string]> = [
  ["global", "글로벌융합대학(인문사회)", "인문·사회"],
  ["science", "과학기술대학", "자연·공학"],
  ["pharmacy", "약학대학", "보건·약학"],
  ["art-design", "Art & Design대학", "디자인·예술"],
  ["free", "미래인재대학(자유전공학부)", "자유전공"],
  ["vr", "미래인재대학(가상현실융합학과)", "컴퓨터·AI"],
  ["data", "미래인재대학(데이터사이언스학과)", "컴퓨터·AI"],
  ["ai-drug", "미래인재대학(AI신약학과)", "자연·공학"],
  ["early-childhood", "유아교육과", "교육"],
];

export const duksung2027Departments: Department[] = departments.map(([id, name, category]) => ({
  id: `duksung-${id}`,
  universityId: "duksung",
  name,
  category,
}));

const aggregate: Department = {
  id: "duksung-overall",
  universityId: "duksung",
  name: "2027 수시 전체",
  category: "전체",
};
export const duksung2027DepartmentsWithAggregate: Department[] = [...duksung2027Departments, aggregate];

const csatGlobalScienceFuture = {
  enabled: true,
  description: "국어·수학·영어·탐구(사회/과학)[상위 1과목] 중 2개 영역 등급 합 7 이내",
  requiredSubjects: 2,
  gradeSum: 7,
};

const csatPharmacy = {
  enabled: true,
  description: "국어·수학·영어·탐구(사회/과학)[상위 1과목] 중 수학을 포함한 3개 영역 등급 합 5 이내. 영어와 사회탐구는 상위 1개 영역만 반영",
  requiredSubjects: 3,
  gradeSum: 5,
};

const rows: Array<{
  departmentId: string;
  name: string;
  type: Admission["type"];
  count: number;
  studentRecordWeight?: number;
  documentWeight?: number;
  interview?: boolean;
  csatMinimum?: Admission["csatMinimum"];
}> = [
  ["duksung-global", "고교추천전형", "교과", 25, 100, undefined, false, csatGlobalScienceFuture],
  ["duksung-global", "기회균형전형Ⅰ_사회통합", "교과", 15, 100],
  ["duksung-global", "덕성인재전형Ⅰ", "학종", 65, undefined, 100],
  ["duksung-global", "덕성인재전형Ⅱ", "학종", 74, undefined, 60, true],
  ["duksung-global", "논술전형", "논술", 65, undefined, undefined, false, csatGlobalScienceFuture],
  ["duksung-global", "기회균형전형Ⅰ_특성화고교", "학종", 3, undefined, 100],
  ["duksung-global", "기회균형전형Ⅰ_농어촌학생", "학종", 10, undefined, 100],
  ["duksung-global", "기회균형전형Ⅰ_장애인 등 대상자", "학종", 5, undefined, 60, true],

  ["duksung-early-childhood", "고교추천전형", "교과", 10, 100, undefined, false, csatGlobalScienceFuture],
  ["duksung-early-childhood", "덕성인재전형Ⅱ", "학종", 12, undefined, 60, true],

  ["duksung-science", "고교추천전형", "교과", 10, 100, undefined, false, csatGlobalScienceFuture],
  ["duksung-science", "기회균형전형Ⅰ_사회통합", "교과", 10, 100],
  ["duksung-science", "덕성인재전형Ⅰ", "학종", 20, undefined, 100],
  ["duksung-science", "덕성인재전형Ⅱ", "학종", 20, undefined, 60, true],
  ["duksung-science", "논술전형", "논술", 50, undefined, undefined, false, csatGlobalScienceFuture],
  ["duksung-science", "기회균형전형Ⅰ_농어촌학생", "학종", 14, undefined, 100],
  ["duksung-science", "기회균형전형Ⅰ_기초생활수급자 등", "학종", 6, undefined, 100],
  ["duksung-science", "기회균형전형Ⅰ_특성화고 등을 졸업한 재직자", "학종", 63, undefined, 100],

  ["duksung-pharmacy", "고교추천전형", "교과", 20, 100, undefined, false, csatPharmacy],
  ["duksung-pharmacy", "덕성인재전형Ⅱ", "학종", 25, undefined, 60, true],
  ["duksung-pharmacy", "논술전형", "논술", 5, undefined, undefined, false, csatPharmacy],
  ["duksung-pharmacy", "기회균형전형Ⅰ_기초생활수급자 등", "학종", 6, undefined, 100],

  ["duksung-art-design", "미술실기전형", "기타", 71],
  ["duksung-art-design", "기회균형전형Ⅰ_특성화고교", "학종", 3, undefined, 100],

  ["duksung-free", "고교추천전형", "교과", 50, 100, undefined, false, csatGlobalScienceFuture],
  ["duksung-free", "덕성인재전형Ⅰ", "학종", 30, undefined, 100],
  ["duksung-free", "덕성인재전형Ⅱ", "학종", 64, undefined, 60, true],
  ["duksung-free", "기회균형전형Ⅱ_사회통합", "학종", 15, undefined, 100],
  ["duksung-free", "기회균형전형Ⅰ_농어촌학생", "학종", 13, undefined, 100],
  ["duksung-free", "기회균형전형Ⅰ_기초생활수급자 등", "학종", 8, undefined, 100],

  ["duksung-vr", "고교추천전형", "교과", 10, 100, undefined, false, csatGlobalScienceFuture],
  ["duksung-vr", "덕성인재전형Ⅱ", "학종", 15, undefined, 60, true],

  ["duksung-data", "고교추천전형", "교과", 10, 100, undefined, false, csatGlobalScienceFuture],
  ["duksung-data", "덕성인재전형Ⅱ", "학종", 15, undefined, 60, true],

  ["duksung-ai-drug", "고교추천전형", "교과", 10, 100, undefined, false, csatGlobalScienceFuture],
  ["duksung-ai-drug", "덕성인재전형Ⅱ", "학종", 15, undefined, 60, true],
];

export const duksung2027Admissions: Admission[] = rows.map((m) => ({
  id: `duksung-2027-${m.departmentId}-${m.name}`,
  universityId: "duksung",
  departmentId: m.departmentId,
  academicYear: 2027,
  name: m.name,
  type: m.type,
  recruitmentCount: m.count,
  ...(m.studentRecordWeight !== undefined ? { studentRecordWeight: m.studentRecordWeight } : {}),
  ...(m.documentWeight !== undefined ? { documentWeight: m.documentWeight } : {}),
  ...(m.interview ? { interview: true } : {}),
  csatMinimum: m.csatMinimum ?? { enabled: false },
  source,
  isMock: false,
}));

export const duksung2027AggregateDepartment = aggregate;
