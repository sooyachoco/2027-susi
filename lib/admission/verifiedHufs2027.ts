import type { Admission, Department, University } from "./types";

/**
 * 한국외국어대학교 2027학년도 수시모집 최종 공개자료 기준.
 * 프로젝트 범위는 서울캠퍼스로 한정한다.
 */
export const verifiedHufs2027Universities: University[] = [
  { id: "hufs-2027", name: "한국외국어대학교", region: "서울" },
];

const names = [
  "경영학부",
  "경제학부",
  "국제통상학과",
  "미디어커뮤니케이션학부",
  "국제학부",
  "정치외교학과",
  "행정학과",
  "한국어교육과",
  "영어교육과",
  "Language & Trade학부",
  "Language & AI융합학부",
  "AI융합대학(서울)",
];

export const verifiedHufs2027Departments: Department[] = names.map((name, i) => ({
  id: `hufs-2027-${i + 1}`,
  universityId: "hufs-2027",
  name,
}));

const source = {
  type: "university" as const,
  url: "https://adms.hufs.ac.kr/",
  document: "한국외국어대학교 2027학년도 수시모집요강",
  academicYear: 2027,
  confidence: 0.99,
};

const makeAdmission = (
  department: Department,
  suffix: string,
  name: string,
  type: Admission["type"],
  extra: Partial<Admission> = {},
): Admission => ({
  id: `${department.id}-${suffix}`,
  universityId: "hufs-2027",
  departmentId: department.id,
  academicYear: 2027,
  name,
  type,
  source,
  isMock: false,
  ...extra,
});

export const verifiedHufs2027Admissions: Admission[] = verifiedHufs2027Departments.flatMap((department) => [
  makeAdmission(department, "recommendation", "학생부교과(학교장추천전형)", "교과", {
    studentRecordWeight: 100,
    csatMinimum: { enabled: true, description: "서울캠퍼스 국어·수학·영어·탐구 중 2개 영역 등급 합 4 이내" },
  }),
  makeAdmission(department, "interview", "학생부종합(면접형)", "학종", {
    documentWeight: 50,
    interview: true,
    csatMinimum: { enabled: false },
  }),
  makeAdmission(department, "document", "학생부종합(서류형)", "학종", {
    documentWeight: 100,
    csatMinimum: { enabled: false },
  }),
  makeAdmission(department, "essay", "논술전형", "논술", {
    csatMinimum: { enabled: true, description: "서울캠퍼스 국어·수학·영어·탐구 중 2개 영역 등급 합 4 이내" },
  }),
]);

const aggregateDepartment: Department = {
  id: "hufs-2027-aggregate",
  universityId: "hufs-2027",
  name: "한국외국어대학교 서울캠퍼스 수시 전체",
};

export const verifiedHufs2027AggregateAdmissions: Admission[] = [
  makeAdmission(aggregateDepartment, "recommendation-total", "학생부교과(학교장추천전형) 서울캠퍼스 전체", "교과", {
    recruitmentCount: 198,
    isAggregate: true,
    studentRecordWeight: 100,
    csatMinimum: { enabled: true, description: "서울캠퍼스 2개 영역 등급 합 4 이내" },
  }),
  makeAdmission(aggregateDepartment, "interview-total", "학생부종합(면접형) 전체", "학종", {
    recruitmentCount: 478,
    isAggregate: true,
    documentWeight: 50,
    interview: true,
    csatMinimum: { enabled: false },
  }),
  makeAdmission(aggregateDepartment, "sw-total", "학생부종합(SW인재) 전체", "학종", {
    recruitmentCount: 34,
    isAggregate: true,
    documentWeight: 100,
    csatMinimum: { enabled: false },
  }),
  makeAdmission(aggregateDepartment, "document-total", "학생부종합(서류형) 전체", "학종", {
    recruitmentCount: 585,
    isAggregate: true,
    documentWeight: 100,
    csatMinimum: { enabled: false },
  }),
  makeAdmission(aggregateDepartment, "opportunity-total", "학생부종합(기회균형) 전체", "기타", {
    recruitmentCount: 183,
    isAggregate: true,
    documentWeight: 100,
    csatMinimum: { enabled: false },
  }),
  makeAdmission(aggregateDepartment, "essay-seoul-total", "논술전형 서울캠퍼스 전체", "논술", {
    recruitmentCount: 284,
    isAggregate: true,
    csatMinimum: { enabled: true, description: "서울캠퍼스 2개 영역 등급 합 4 이내" },
  }),
];

export const verifiedHufs2027Summary = {
  source,
  campusScope: "서울캠퍼스",
  officialTotal: 2102,
  totals: {
    schoolRecommendation: 370,
    schoolRecommendationSeoul: 198,
    interview: 478,
    sw: 34,
    document: 585,
    opportunity: 183,
    essay: 452,
    essaySeoul: 284,
  },
  selection: {
    schoolRecommendation: "학생부교과 100%",
    interview: "1단계 서류100% 3배수 → 2단계 서류50% + 면접50%",
    document: "서류평가 100%",
    sw: "서류평가 100%",
    essay: "논술 100%",
    schoolRecommendationCsat: "서울캠퍼스 2개 영역 등급 합 4 이내",
    essayCsat: "서울캠퍼스 2개 영역 등급 합 4 이내",
  },
  changes: [
    "한국사 수능최저 기준 제외",
    "AI융합대학 서울 통합모집 신설",
    "송도캠퍼스 글로벌바이오 & 비즈니스융합학부 신설은 서울캠퍼스 범위에서 제외",
    "SW인재는 글로벌캠퍼스 전형으로 서울캠퍼스 세부 모집단위에 직접 배정하지 않음",
  ],
};
