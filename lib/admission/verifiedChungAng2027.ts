import type { Admission, Department, University } from "./types";

const source = {
  type: "university" as const,
  url: "https://admission.cau.ac.kr/detail.do?board_seq=3239",
  document: "중앙대학교 2027학년도 수시모집요강_20260529_최종",
  academicYear: 2027,
  confidence: 0.99,
};

export const verifiedChungAng2027Universities: University[] = [
  { id: "cau-2027", name: "중앙대학교", region: "서울" },
];

// 서울캠퍼스 모집단위. 다빈치캠퍼스(경기)는 프로젝트 범위에서 제외한다.
const seoulNames = [
  "국어국문학부", "영어영문학과", "유럽문화학부", "아시아문화학부", "철학과", "역사학과",
  "정치국제학과", "심리학과", "문헌정보학과", "사회복지학부", "사회학과", "도시계획·부동산학과",
  "공공인재학부", "미디어커뮤니케이션학부", "교육학과", "유아교육과", "영어교육과", "체육교육과",
  "경제학부", "응용통계학과", "광고홍보학부", "국제물류학과", "산업보안학과(인문)",
  "산업보안학과(자연)", "경영학부", "글로벌금융학부", "간호학과", "물리학과", "화학과", "생명과학과",
  "수학과", "사회기반시스템공학부", "건축학부", "에너지시스템공학부", "화학공학과", "기계공학부",
  "전자전기공학부", "융합공학부", "지능형반도체공학과", "소프트웨어학부", "AI학과", "약학부", "의학부",
];

const growthRecruitmentCounts: Record<string, number> = {
  "간호학과": 8, "건축학부": 4, "에너지시스템공학부": 4, "화학공학과": 4, "기계공학부": 4,
  "전자전기공학부": 6, "융합공학부": 6, "소프트웨어학부": 6, "약학부": 6, "의학부": 4,
  "국어국문학부": 4, "영어영문학과": 8, "정치국제학과": 4, "심리학과": 4, "공공인재학부": 4,
  "미디어커뮤니케이션학부": 4, "경제학부": 6, "응용통계학과": 4, "산업보안학과(인문)": 4,
  "경영학부": 10, "글로벌금융학부": 4,
};

// 중앙대 최종 모집요강의 논술(일반형) 서울캠퍼스 모집단위별 인원.
const essayGeneralRecruitment: Record<string, number> = {
  "국어국문학부": 6, "영어영문학과": 6,
  "유럽문화학부": 24, "아시아문화학부": 12, "철학과": 6, "역사학과": 6,
  "정치국제학과": 4, "심리학과": 4, "문헌정보학과": 6, "사회복지학부": 6, "사회학과": 6,
  "도시계획·부동산학과": 6, "공공인재학부": 7, "미디어커뮤니케이션학부": 6,
  "교육학과": 5, "영어교육과": 6, "경제학부": 7, "응용통계학과": 6,
  "광고홍보학부": 6, "국제물류학과": 6, "경영학부": 42, "글로벌금융학부": 6,
  "간호학과": 26, "산업보안학과(자연)": 6, "물리학과": 6, "화학과": 6, "생명과학과": 6,
  "수학과": 6, "사회기반시스템공학부": 14, "건축학부": 10, "에너지시스템공학부": 9,
  "화학공학과": 6, "기계공학부": 9, "전자전기공학부": 10, "융합공학부": 7,
  "지능형반도체공학과": 5, "소프트웨어학부": 9, "AI학과": 7, "약학부": 16, "의학부": 14,
};

const departmentId = (name: string) => `cau-2027-${name.replace(/[^가-힣A-Za-z0-9]+/g, "-")}`;

export const verifiedChungAng2027Departments: Department[] = seoulNames.map((name) => ({
  id: departmentId(name),
  universityId: "cau-2027",
  name,
}));

const byName = new Map(verifiedChungAng2027Departments.map((d) => [d.name, d]));

const admission = (
  department: Department,
  id: string,
  name: string,
  type: Admission["type"],
  extra: Partial<Admission> = {},
): Admission => ({
  id: `${department.id}-${id}`,
  universityId: "cau-2027",
  departmentId: department.id,
  academicYear: 2027,
  name,
  type,
  source,
  isMock: false,
  ...extra,
});

export const verifiedChungAng2027Admissions: Admission[] = verifiedChungAng2027Departments.flatMap((department) => {
  const admissions: Admission[] = [
    admission(department, "regional", "학생부교과(지역균형)", "교과", {
      studentRecordWeight: 90,
      csatMinimum: { enabled: true, description: "서울캠퍼스 모집단위 수능최저 적용" },
    }),
    admission(department, "fusion", "학생부종합(융합형인재)", "학종", {
      documentWeight: 70,
      csatMinimum: { enabled: false },
    }),
    admission(department, "exploration", "학생부종합(탐구형인재)", "학종", {
      documentWeight: 70,
      interview: true,
      csatMinimum: { enabled: false },
    }),
  ];

  const growthCount = growthRecruitmentCounts[department.name];
  if (growthCount) {
    admissions.push(admission(department, "growth", "학생부종합(성장형인재)", "학종", {
      recruitmentCount: growthCount,
      documentWeight: 70,
      interview: true,
      csatMinimum: {
        enabled: true,
        description: department.name === "약학부" || department.name === "의학부"
          ? "4개 영역 등급 합 5 이내"
          : "3개 영역 등급 합 6 이내",
      },
    }));
  }

  const essayCount = essayGeneralRecruitment[department.name];
  if (essayCount) {
    admissions.push(admission(department, "essay-general", "논술(일반형)", "논술", {
      recruitmentCount: essayCount,
      studentRecordWeight: 30,
      csatMinimum: { enabled: true, description: "서울캠퍼스 적용" },
    }));
  }

  return admissions;
});

// 전형 전체 총원은 공식 최종 모집요강 기준으로 별도 보존한다.
// 모집단위별 세부 배정이 확인되지 않은 전형은 중복 계산을 피하기 위해 aggregate로만 기록한다.
const aggregateDepartment: Department = {
  id: "cau-2027-aggregate",
  universityId: "cau-2027",
  name: "중앙대학교 수시 전체",
};

export const verifiedChungAng2027AggregateAdmissions: Admission[] = [
  admission(aggregateDepartment, "regional-total", "학생부교과(지역균형) 전체", "교과", { recruitmentCount: 508, isAggregate: true, studentRecordWeight: 90, csatMinimum: { enabled: true, description: "서울캠퍼스 적용" } }),
  admission(aggregateDepartment, "growth-total", "학생부종합(성장형인재) 전체", "학종", { recruitmentCount: 108, isAggregate: true, documentWeight: 70, interview: true, csatMinimum: { enabled: true } }),
  admission(aggregateDepartment, "fusion-total", "학생부종합(융합형인재) 전체", "학종", { recruitmentCount: 378, isAggregate: true, documentWeight: 70, csatMinimum: { enabled: false } }),
  admission(aggregateDepartment, "exploration-total", "학생부종합(탐구형인재) 전체", "학종", { recruitmentCount: 512, isAggregate: true, documentWeight: 70, interview: true, csatMinimum: { enabled: false } }),
  admission(aggregateDepartment, "harmony-total", "학생부종합(어울림) 전체", "학종", { recruitmentCount: 20, isAggregate: true, documentWeight: 100, csatMinimum: { enabled: false } }),
  admission(aggregateDepartment, "essay-general-total", "논술(일반형) 전체", "논술", { recruitmentCount: 403, isAggregate: true, studentRecordWeight: 30, csatMinimum: { enabled: true, description: "서울캠퍼스 적용, 다빈치 미적용" } }),
  admission(aggregateDepartment, "essay-creative-total", "논술(창의형) 전체", "논술", { recruitmentCount: 86, isAggregate: true, studentRecordWeight: 30, csatMinimum: { enabled: false, description: "국내 고교 졸업예정자 지원" } }),
  admission(aggregateDepartment, "farmland-total", "학생부종합(기회균형-농어촌학생) 전체", "기타", { recruitmentCount: 142, isAggregate: true, documentWeight: 100 }),
  admission(aggregateDepartment, "basic-total", "학생부종합(기회균형-기초생활수급자 및 차상위계층) 전체", "기타", { recruitmentCount: 74, isAggregate: true, documentWeight: 100 }),
  admission(aggregateDepartment, "disability-total", "학생부종합(기회균형-장애인 등 대상자) 전체", "기타", { recruitmentCount: 10, isAggregate: true, documentWeight: 100 }),
  admission(aggregateDepartment, "employee-total", "학생부종합(기회균형-특성화고졸재직자) 전체", "기타", { recruitmentCount: 234, isAggregate: true, documentWeight: 100 }),
];

export const verifiedChungAng2027Summary = {
  source,
  campusScope: "서울캠퍼스 중심",
  excludedCampus: "다빈치캠퍼스(경기)",
  official2027Totals: {
    regional: 508,
    growth: 108,
    fusion: 378,
    exploration: 512,
    harmony: 20,
    opportunity: 460,
    essayGeneral: 403,
    essayCreative: 86,
    essayTotal: 489,
    practical: 387,
    susiTotal: 2862,
  },
  selection: {
    regional: "학생부 100(교과 90 + 비교과 출결 10)",
    growth: "1단계 서류100 → 2단계 1단계70 + 면접30, 수능최저 적용",
    fusion: "서류100, 의학부는 2단계 면접 실시",
    exploration: "1단계 서류100 → 2단계 1단계70 + 면접30",
    essayGeneral: "논술70 + 학생부30(교과20 + 비교과 출결10), 서울캠퍼스 수능최저",
    essayCreative: "논술70 + 학생부30, 수능최저 미적용",
  },
  notes: [
    "중앙대 공식 2027 수시모집요강 최종본(2026-05-29)을 기준으로 구조 보정",
    "2027 논술 일반형 403명, 창의형 86명 신설",
    "2027 성장형인재 108명 신설",
    "다빈치캠퍼스(경기) 모집단위는 프로젝트 범위에서 제외",
  ],
};
