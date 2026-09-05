import type { Admission, Department, University } from "./types";

const source = {
  type: "university" as const,
  academicYear: 2027,
  url: "https://ipsi.dongduk.ac.kr/ipsi/contents/nontime-notice.do?id=91994&schBdcode=_ipsi_noti01&schM=view",
  document: "2027학년도 동덕여자대학교 신입학 수시모집요강(2026-07-13 변경공고)",
  confidence: 0.99,
  verifiedAt: "2026-09-05",
};

export const dongduk2027Universities: University[] = [
  { id: "dongduk", name: "동덕여자대학교", region: "서울" },
];

const departments: Array<[string, string, string]> = [
  ["korean", "국어국문학전공", "인문·사회"],
  ["history", "국사학전공", "인문·사회"],
  ["creative-writing", "문예창작전공", "인문·사회"],
  ["english", "영어전공", "인문·사회"],
  ["business", "경영융합학부", "경영·경제"],
  ["computer", "컴퓨터학전공", "컴퓨터·소프트웨어"],
  ["statistics", "정보통계학전공", "자연·공학"],
  ["data-science", "데이터사이언스전공", "컴퓨터·AI"],
  ["communication", "커뮤니케이션콘텐츠전공", "미디어·콘텐츠"],
  ["design", "시각&실내디자인전공", "디자인·예술"],
  ["pharmacy", "약학과", "보건·약학"],
];

export const dongduk2027Departments: Department[] = departments.map(([id, name, category]) => ({
  id: `dongduk-${id}`,
  universityId: "dongduk",
  name,
  category,
}));

const aggregate: Department = {
  id: "dongduk-overall",
  universityId: "dongduk",
  name: "2027 수시 전체",
  category: "전체",
};
export const dongduk2027DepartmentsWithAggregate: Department[] = [...dongduk2027Departments, aggregate];

const generalCsat = {
  enabled: true,
  description: "국어·영어·수학·탐구(상위 1과목) 중 2개 영역 등급 합 6 이내",
  requiredSubjects: 2,
  gradeSum: 6,
};

const pharmacyCsat = {
  enabled: true,
  description: "국어·수학(미적분/기하)·탐구(과학 2과목 중 상위 1과목) 3개 영역 등급 합 6 이내",
  requiredSubjects: 3,
  gradeSum: 6,
};

const rows: Array<[string, string, Admission["type"], number, Partial<Admission>]> = [
  ["dongduk-overall", "동덕창의리더전형", "학종", 255, { documentWeight: 40, interview: true }],
  ["dongduk-overall", "기회균형 특별전형", "학종", 12, { documentWeight: 100 }],
  ["dongduk-overall", "학생부교과우수자전형", "교과", 196, { studentRecordWeight: 100, csatMinimum: generalCsat }],
  ["dongduk-overall", "논술우수자전형", "논술", 266, { studentRecordWeight: 0, csatMinimum: generalCsat, majorGroup: "약술형 논술 100%" }],
  ["dongduk-overall", "실기우수자전형", "기타", 361, { majorGroup: "실기 80% + 학생부교과 20%" }],
  ["dongduk-overall", "특기자 특별전형", "기타", 12, { majorGroup: "특기 및 질의응답 등 모집단위별 평가" }],
  ["dongduk-overall", "특성화고 등 고졸재직자 특별전형", "학종", 84, { documentWeight: 100 }],
  ["dongduk-pharmacy", "학생부교과우수자전형", "교과", 20, { studentRecordWeight: 100, csatMinimum: pharmacyCsat }],
  ["dongduk-computer", "논술우수자전형", "논술", 18, { csatMinimum: generalCsat, majorGroup: "약술형 논술 100%" }],
  ["dongduk-business", "논술우수자전형", "논술", 39, { csatMinimum: generalCsat, majorGroup: "약술형 논술 100%" }],
  ["dongduk-korean", "논술우수자전형", "논술", 10, { csatMinimum: generalCsat, majorGroup: "약술형 논술 100%" }],
  ["dongduk-english", "논술우수자전형", "논술", 12, { csatMinimum: generalCsat, majorGroup: "약술형 논술 100%" }],
];

export const dongduk2027Admissions: Admission[] = rows.map(([departmentId, name, type, recruitmentCount, extra]) => ({
  id: `dongduk-2027-${departmentId}-${name}`,
  universityId: "dongduk",
  departmentId,
  academicYear: 2027,
  name,
  type,
  recruitmentCount,
  csatMinimum: { enabled: false },
  source,
  isMock: false,
  ...extra,
}));
