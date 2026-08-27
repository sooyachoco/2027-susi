import type { Admission, Department, University } from "./types";

const source = {
  type: "university" as const,
  url: "https://ipsi.dongduk.ac.kr/ipsi/",
  document: "동덕여자대학교 2027학년도 신입학 수시모집요강",
  academicYear: 2027,
  verifiedAt: "2026-08-27",
  confidence: 0.97,
};

export const verifiedDongduk2027Universities: University[] = [
  { id: "dongduk", name: "동덕여자대학교", region: "서울" },
];

const rows = [
  ["korean", "국어국문학전공", 10],
  ["history", "국사학전공", 8],
  ["creative-writing", "문예창작전공", 8],
  ["english", "영어전공", 12],
  ["japanese", "일어일본학전공", 9],
  ["european", "유러피언스터디즈전공", 11],
  ["chinese", "중어중국학전공", 11],
  ["library", "문헌정보학전공", 8],
  ["social-welfare", "사회복지학전공", 8],
  ["child", "아동학전공", 11],
  ["business", "경영융합학부", 39],
  ["nutrition", "식품영양학전공", 10],
  ["health", "보건관리학전공", 9],
  ["chemistry", "응용화학전공", 8],
  ["cosmetic", "화장품학전공", 8],
  ["computer", "컴퓨터학전공", 18],
  ["statistics", "정보통계학전공", 11],
  ["curator", "큐레이터학전공", 4],
  ["communication", "커뮤니케이션콘텐츠전공", 11],
  ["hci", "HCI사이언스전공", 11],
  ["data-science", "문화지식 데이터사이언스전공", 9],
  ["culture-management", "문화예술경영전공", 11],
  ["mice", "글로벌MICE융합전공", 11],
  ["entrepreneurship", "앙트러프러너십전공", 8],
] as const;

export const verifiedDongduk2027Departments: Department[] = rows.map(([id, name]) => ({
  id: `dongduk-${id}`,
  universityId: "dongduk",
  name,
}));

export const verifiedDongduk2027Admissions: Admission[] = rows.map(([id, name, recruitmentCount]) => ({
  id: `dongduk-${id}-essay-2027`,
  universityId: "dongduk",
  departmentId: `dongduk-${id}`,
  academicYear: 2027,
  name: "논술우수자전형",
  type: "논술" as const,
  recruitmentCount,
  source,
  isMock: false,
  csatMinimum: { enabled: true, description: "국어·영어·수학·탐구(상위 1과목) 중 2개 영역 등급 합 6 이내" },
}));
