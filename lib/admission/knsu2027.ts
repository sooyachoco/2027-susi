import type { Admission, Department, University } from "./types";

const source = {
  type: "university" as const,
  academicYear: 2027,
  url: "https://www.knsu.ac.kr/ipsi/rolling/application.do",
  document: "2027학년도 수시모집요강",
  collectedAt: "2026-09-04",
  verifiedAt: "2026-09-04",
  confidence: 0.99,
};

export const knsu2027Universities: University[] = [
  { id: "knsu", name: "한국체육대학교", region: "서울" },
];

const departments = [
  ["physical", "체육학과", "체육"],
  ["game", "경기지도학과", "체육"],
  ["social", "사회체육학과", "체육"],
  ["youth", "스포츠청소년지도학과", "체육"],
  ["special", "특수체육교육과", "체육·사범"],
  ["industry", "스포츠산업학과", "체육"],
  ["health", "운동건강관리학과", "체육"],
  ["senior", "노인체육복지학과", "체육"],
  ["performing", "공연예술학과", "예술"],
  ["taekwondo", "태권도학과", "체육"],
] as const;

export const knsu2027Departments: Department[] = [
  { id: "knsu-overall", universityId: "knsu", name: "2027 수시 전체(모집단위 합계)", category: "전체" },
  ...departments.map(([id, name, category]) => ({
    id: `knsu-${id}`,
    universityId: "knsu",
    name,
    category,
  })),
];

const dept = (id: string) => `knsu-${id}`;

const admission = (
  departmentId: string,
  name: string,
  type: Admission["type"],
  recruitmentCount: number,
  options: Partial<Admission> = {},
): Admission => ({
  id: `knsu-2027-${departmentId}-${name}`,
  universityId: "knsu",
  departmentId,
  academicYear: 2027,
  name,
  type,
  recruitmentCount,
  csatMinimum: { enabled: false },
  source,
  isMock: false,
  ...options,
});

const csat = (description: string) => ({ enabled: true, description });

export const knsu2027Admissions: Admission[] = [
  // 체육특기자: 2027 수시 총 164명. 세부 종목별 모집이며 체육학과 소속.
  admission(dept("physical"), "체육특기자", "기타", 164, { studentRecordWeight: 10 }),

  // 경기입상실적우수자: 경기지도 16 + 태권도 15.
  admission(dept("game"), "경기입상실적우수자", "기타", 16, { studentRecordWeight: 40 }),
  admission(dept("taekwondo"), "경기입상실적우수자", "기타", 15, { studentRecordWeight: 35 }),

  // 실기우수자: 공연예술학과와 태권도학과를 분리하여 기록.
  admission(dept("performing"), "실기우수자", "기타", 30, { studentRecordWeight: 30 }),
  admission(dept("taekwondo"), "실기우수자", "기타", 5, { studentRecordWeight: 30 }),

  // 교과성적우수자: 사회4, 스포츠청소년5, 특수체육19, 스포츠산업10,
  // 운동건강5, 노인체육7 = 총 50명.
  admission(dept("social"), "교과성적우수자", "교과", 4, {
    studentRecordWeight: 100,
    csatMinimum: csat("국어·수학·영어·탐구 중 상위 2개 영역 합 6등급 이내이며 각 4등급 이내(탐구 1과목)"),
  }),
  admission(dept("youth"), "교과성적우수자", "교과", 5, {
    studentRecordWeight: 85,
    csatMinimum: csat("국어·수학·영어·탐구 중 3개 영역 이상 각 4등급 이내(탐구 1과목)"),
  }),
  admission(dept("special"), "교과성적우수자", "교과", 19, {
    studentRecordWeight: 60,
    interview: true,
    csatMinimum: csat("국어·수학·영어·탐구 중 상위 2개 영역 합 7등급 이내(탐구 1과목)"),
  }),
  admission(dept("industry"), "교과성적우수자", "교과", 10, {
    studentRecordWeight: 80,
    csatMinimum: csat("국어·수학·영어·탐구 중 3개 영역 이상 각 4등급 이내(탐구 1과목)"),
  }),
  admission(dept("health"), "교과성적우수자", "교과", 5, {
    studentRecordWeight: 70,
    csatMinimum: csat("국어·수학·영어·탐구 중 상위 2개 영역 합 6등급 이내이며 각 4등급 이내(탐구 1과목)"),
  }),
  admission(dept("senior"), "교과성적우수자", "교과", 7, {
    studentRecordWeight: 80,
    csatMinimum: csat("국어·수학·영어·탐구 중 상위 3개 영역 합 10등급 이내(탐구 1과목)"),
  }),

  // 국가보훈대상자: 사회1, 스포츠청소년1, 특수체육1, 운동건강1, 노인체육1 = 5명.
  admission(dept("social"), "국가보훈대상자", "교과", 1, { studentRecordWeight: 100 }),
  admission(dept("youth"), "국가보훈대상자", "교과", 1, { studentRecordWeight: 80 }),
  admission(dept("special"), "국가보훈대상자", "교과", 1, { studentRecordWeight: 60, interview: true }),
  admission(dept("health"), "국가보훈대상자", "교과", 1, { studentRecordWeight: 70 }),
  admission(dept("senior"), "국가보훈대상자", "교과", 1, { studentRecordWeight: 80 }),

  // 특수교육대상자: 경기지도2, 특수체육3, 태권도8 = 13명.
  admission(dept("game"), "특수교육대상자", "기타", 2, { studentRecordWeight: 20, interview: true }),
  admission(dept("special"), "특수교육대상자", "기타", 3, { studentRecordWeight: 10, interview: true, csatMinimum: csat("국어·수학·영어·탐구 중 상위 2개 영역 합 12등급 이내(탐구 1과목)") }),
  admission(dept("taekwondo"), "특수교육대상자", "기타", 8, { studentRecordWeight: 10, csatMinimum: csat("국어·수학·영어·탐구 중 상위 2개 영역 합 12등급 이내(탐구 1과목)") }),

  // 농어촌지역학생: 공연예술학과 2명.
  admission(dept("performing"), "농어촌지역학생", "기타", 2, { studentRecordWeight: 30, csatMinimum: csat("국어·수학·영어·탐구 중 2개 영역 이상 4등급 이내(탐구 1과목)") }),

  // 외국인군(북한이탈주민 포함): 경기지도학과 수시 2명.
  admission(dept("game"), "외국인군(북한이탈주민 포함)", "기타", 2),
];
