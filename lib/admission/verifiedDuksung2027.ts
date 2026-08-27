import type { Admission, Department, University } from "./types";

const source = {
  type: "university" as const,
  url: "https://www.ds.ac.kr/mojib/?m_type=SUSI&m_year=2027",
  document: "덕성여자대학교 2027학년도 수시모집요강",
  academicYear: 2027,
  verifiedAt: "2026-08-27",
  confidence: 0.98,
};

export const verifiedDuksung2027Universities: University[] = [
  { id: "duksung", name: "덕성여자대학교", region: "서울" },
];

const rows = [
  ["duksung-global-humanities", "글로벌융합대학(인문사회)"],
  ["duksung-science-tech", "과학기술대학"],
  ["duksung-pharmacy", "약학대학"],
] as const;

export const verifiedDuksung2027Departments: Department[] = rows.map(([id, name]) => ({
  id,
  universityId: "duksung",
  name,
}));

export const verifiedDuksung2027Admissions: Admission[] = [
  {
    id: "duksung-global-humanities-essay-2027",
    universityId: "duksung",
    departmentId: "duksung-global-humanities",
    academicYear: 2027,
    name: "논술전형",
    type: "논술",
    recruitmentCount: 65,
    source,
    isMock: false,
    csatMinimum: { enabled: true, description: "국어·수학·영어·탐구(사회/과학) 중 2개 영역 등급 합 7 이내" },
  },
  {
    id: "duksung-science-tech-essay-2027",
    universityId: "duksung",
    departmentId: "duksung-science-tech",
    academicYear: 2027,
    name: "논술전형",
    type: "논술",
    recruitmentCount: 50,
    source,
    isMock: false,
    csatMinimum: { enabled: true, description: "국어·수학·영어·탐구(사회/과학) 중 2개 영역 등급 합 7 이내" },
  },
  {
    id: "duksung-pharmacy-essay-2027",
    universityId: "duksung",
    departmentId: "duksung-pharmacy",
    academicYear: 2027,
    name: "논술전형",
    type: "논술",
    recruitmentCount: 5,
    source,
    isMock: false,
    csatMinimum: { enabled: true, description: "국어·수학·영어·탐구(사회/과학) 중 수학을 포함한 3개 영역 등급 합 5 이내" },
  },
];
