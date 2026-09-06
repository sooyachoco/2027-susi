import type { Admission, Department, University } from "@/lib/types";

const source = {
  type: "university" as const,
  url: "https://www.skuniv.ac.kr/",
  document: "서경대학교 2027학년도 수시모집요강",
  academicYear: 2027,
  verifiedAt: "2026-09-06",
  confidence: 0.98,
};

export const verifiedSeokyeong2027Universities: University[] = [
  { id: "seokyeong-2027", name: "서경대학교", region: "서울" },
];

const aggregate: Department = {
  id: "seokyeong-2027-aggregate",
  universityId: "seokyeong-2027",
  name: "서경대학교 수시 전체",
};

const make = (
  id: string,
  name: string,
  type: Admission["type"],
  recruitmentCount: number,
  extra: Partial<Admission> = {},
): Admission => ({
  id,
  universityId: "seokyeong-2027",
  departmentId: aggregate.id,
  academicYear: 2027,
  name,
  type,
  recruitmentCount,
  source,
  isMock: false,
  isAggregate: true,
  ...extra,
});

export const verifiedSeokyeong2027Departments: Department[] = [aggregate];

export const verifiedSeokyeong2027Admissions: Admission[] = [
  make("seokyeong-essay-2027", "논술우수자", "논술", 214, { documentWeight: 0, csatMinimum: { enabled: false } }),
  make("seokyeong-curriculum-excellence-2027", "교과우수자", "교과", 112, { studentRecordWeight: 100, csatMinimum: { enabled: false } }),
  make("seokyeong-social-contribution-2027", "사회기여자", "교과", 12, { studentRecordWeight: 100, csatMinimum: { enabled: false } }),
  make("seokyeong-military-2027", "군사학과", "교과", 40, { studentRecordWeight: 70, interview: true, csatMinimum: { enabled: false } }),
  make("seokyeong-practical-2027", "실기우수자", "기타", 409, { studentRecordWeight: 20, csatMinimum: { enabled: false } }),
  make("seokyeong-curriculum-balance-2027", "교과균형", "교과", 204, { studentRecordWeight: 100, csatMinimum: { enabled: true, description: "국어·수학·영어·탐구(1과목) 중 2개 영역 합 8등급 이내" } }),
  make("seokyeong-opportunity1-2027", "기회균형①", "교과", 22, { studentRecordWeight: 100, csatMinimum: { enabled: true, description: "국어·수학·영어·탐구(1과목) 중 2개 영역 합 9등급 이내" } }),
];

export const verifiedSeokyeong2027Summary = {
  source,
  seoulCampusTotals: {
    essay: 214,
    curriculumExcellence: 112,
    socialContribution: 12,
    military: 40,
    practical: 409,
    curriculumBalance: 204,
    opportunity1: 22,
    inCampusTotal: 1013,
  },
  notes: [
    "서울 소재 서경대학교 기준으로 반영.",
    "논술우수자는 논술 100%이며 수능최저 없음.",
    "교과균형은 국어·수학·영어·탐구(1과목) 중 2개 영역 합 8등급 이내.",
    "기회균형①은 국어·수학·영어·탐구(1과목) 중 2개 영역 합 9등급 이내.",
    "정원외 전형은 별도 세부 모집단위 매핑 단계에서 추가 보강 예정.",
  ],
};
