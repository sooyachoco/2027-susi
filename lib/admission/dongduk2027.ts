import type { Admission, Department, University } from "./types";

const source = {
  type: "university" as const,
  academicYear: 2027,
  url: "https://ipsi.dongduk.ac.kr/ipsi/contents/nontime-notice.do?id=91994&schBdcode=_ipsi_noti01&schM=view",
  document: "2027학년도 동덕여자대학교 신입학 수시 모집요강(2026-07-13 변경공고)",
  confidence: 0.99,
  verifiedAt: "2026-09-06",
};

export const dongduk2027Universities: University[] = [
  { id: "dongduk", name: "동덕여자대학교", region: "서울" },
];

const departments: Array<[string, string, string]> = [
  ["korean", "국어국문학전공", "인문·사회"],
  ["history", "국사학전공", "인문·사회"],
  ["creative-writing", "문예창작전공", "인문·사회"],
  ["english", "영어전공", "인문·사회"],
  ["japanese", "일어일본학전공", "인문·사회"],
  ["european", "유러피언스터디즈전공", "인문·사회"],
  ["chinese", "중어중국학전공", "인문·사회"],
  ["library", "문헌정보학전공", "인문·사회"],
  ["social-welfare", "사회복지학전공", "인문·사회"],
  ["child", "아동학전공", "인문·사회"],
  ["business", "경영융합학부", "경영·경제"],
  ["food-nutrition", "식품영양학전공", "자연·보건"],
  ["health-management", "보건관리학전공", "자연·보건"],
  ["applied-chemistry", "응용화학전공", "자연·공학"],
  ["cosmetics", "화장품학전공", "자연·공학"],
  ["computer", "컴퓨터학전공", "컴퓨터·소프트웨어"],
  ["statistics", "정보통계학전공", "자연·공학"],
  ["pharmacy", "약학과", "보건·약학"],
  ["curator", "큐레이터학전공", "예술·문화"],
  ["communication", "커뮤니케이션콘텐츠전공", "미디어·콘텐츠"],
  ["hci", "HCI사이언스전공", "컴퓨터·AI"],
  ["data-science", "데이터사이언스전공", "컴퓨터·AI"],
  ["culture-management", "문화예술경영전공", "문화·경영"],
  ["global-mice", "글로벌MICE융합전공", "문화·경영"],
  ["entrepreneurship", "앙트러프러너십전공", "경영·창업"],
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
};

const pharmacyCsat = {
  enabled: true,
  description: "국어·수학(미적분/기하 필수)·탐구(과학 2과목 중 상위 1과목) 3개 영역 등급 합 6 이내",
};

const creativeLeader: Record<string, number> = {
  "korean": 9, "history": 7, "creative-writing": 7, "english": 16,
  "japanese": 11, "european": 12, "chinese": 12, "library": 8,
  "social-welfare": 7, "child": 10, "business": 33, "food-nutrition": 9,
  "health-management": 8, "applied-chemistry": 8, "cosmetics": 7,
  "computer": 16, "statistics": 9, "pharmacy": 8, "curator": 4,
  "communication": 9, "hci": 9, "data-science": 6, "culture-management": 9,
  "global-mice": 9, "entrepreneurship": 12,
};

const curriculum: Record<string, number> = {
  "korean": 6, "history": 5, "creative-writing": 5, "english": 9,
  "japanese": 8, "european": 9, "chinese": 11, "library": 6,
  "social-welfare": 5, "child": 9, "business": 25, "food-nutrition": 7,
  "health-management": 6, "applied-chemistry": 5, "cosmetics": 5,
  "computer": 14, "statistics": 9, "pharmacy": 12, "curator": 3,
  "communication": 8, "hci": 8, "data-science": 5, "culture-management": 8,
  "global-mice": 8,
};

const essay: Record<string, number> = {
  "korean": 10, "history": 8, "creative-writing": 8, "english": 12,
  "japanese": 9, "european": 11, "chinese": 11, "library": 8,
  "social-welfare": 8, "child": 11, "business": 40, "food-nutrition": 10,
  "health-management": 10, "applied-chemistry": 8, "cosmetics": 8,
  "computer": 18, "statistics": 11, "curator": 4, "communication": 11,
  "hci": 11, "data-science": 9, "culture-management": 11, "global-mice": 11,
  "entrepreneurship": 8,
};

const rows: Array<[string, string, Admission["type"], number, Partial<Admission>]> = [];

for (const [id, count] of Object.entries(creativeLeader)) {
  rows.push([`dongduk-${id}`, "동덕창의리더전형", "학종", count, { documentWeight: 40, interview: true }]);
}
for (const [id, count] of Object.entries(curriculum)) {
  rows.push([`dongduk-${id}`, "학생부교과우수자전형", "교과", count, {
    studentRecordWeight: 100,
    csatMinimum: id === "pharmacy" ? pharmacyCsat : generalCsat,
  }]);
}
for (const [id, count] of Object.entries(essay)) {
  rows.push([`dongduk-${id}`, "논술우수자전형", "논술", count, {
    studentRecordWeight: 0,
    csatMinimum: generalCsat,
    majorGroup: "약술형 논술 100%",
  }]);
}

rows.push(
  ["dongduk-overall", "기회균형 특별전형", "학종", 12, { documentWeight: 100 }],
  ["dongduk-overall", "실기우수자전형", "기타", 361, { majorGroup: "실기 80% + 학생부교과 20%" }],
  ["dongduk-overall", "특기자 특별전형", "기타", 12, { majorGroup: "특기 및 질의응답 등 모집단위별 평가" }],
  ["dongduk-overall", "특성화고 등 고졸재직자 특별전형", "학종", 84, { documentWeight: 100 }],
);

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
