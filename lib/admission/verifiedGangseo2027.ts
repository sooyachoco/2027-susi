import type { Admission, Department, University } from "@/lib/types";

const source = {
  type: "university" as const,
  url: "https://entrance.kcu.ac.kr/kcui/mainService",
  document: "강서대학교 2027학년도 수시모집요강",
  academicYear: 2027,
  verifiedAt: "2026-09-06",
  confidence: 0.98,
};

export const verifiedGangseo2027Universities: University[] = [
  { id: "gangseo-2027", name: "강서대학교", region: "서울" },
];

const aggregate: Department = {
  id: "gangseo-2027-aggregate",
  universityId: "gangseo-2027",
  name: "강서대학교 수시 전체",
};

const make = (
  id: string,
  name: string,
  type: Admission["type"],
  recruitmentCount: number,
  extra: Partial<Admission> = {},
): Admission => ({
  id,
  universityId: "gangseo-2027",
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

export const verifiedGangseo2027Departments: Department[] = [aggregate];

export const verifiedGangseo2027Admissions: Admission[] = [
  make("gangseo-general-2027", "일반학생", "교과", 152, {
    studentRecordWeight: 80,
    interview: true,
    csatMinimum: { enabled: false, description: "간호학과는 수능최저 적용" },
  }),
  make("gangseo-curriculum-excellence-2027", "교과우수자", "교과", 106, {
    studentRecordWeight: 100,
    csatMinimum: { enabled: false },
  }),
  make("gangseo-social-integration-2027", "사회통합", "교과", 9, {
    studentRecordWeight: 80,
    interview: true,
    csatMinimum: { enabled: false },
  }),
  make("gangseo-practical-2027", "실기·실적 일반학생", "기타", 25, {
    studentRecordWeight: 20,
    csatMinimum: { enabled: false },
  }),
];

export const verifiedGangseo2027Summary = {
  source,
  seoulCampusTotals: {
    generalStudent: 152,
    curriculumExcellence: 106,
    socialIntegration: 9,
    practical: 25,
    inCampusTotal: 292,
  },
  notes: [
    "서울 강서구 소재 강서대학교 2027학년도 수시 최종 모집요강 기준.",
    "2027학년도부터 경영학과로 학과명이 변경되고 자유전공학부가 신설됨.",
    "일반학생전형은 학생부교과 80% + 면접 20%, 단 간호학과는 수능최저가 적용됨.",
    "교과우수자전형은 학생부교과 100%이며 수능최저 없음.",
    "사회통합전형은 학생부교과 80% + 면접 20%.",
    "실용음악학과 실기·실적 전형은 실기 중심으로 선발하며 정원내 실기 모집인원을 집계함.",
    "농어촌학생·기회균등할당제·특수교육대상자 등 정원외 전형은 별도 세부 모집단위 매핑 단계에서 추가 보강 예정.",
  ],
};
