import type { Admission, Department, University } from "./types";

const source = {
  type: "university" as const,
  academicYear: 2027,
  url: "https://entrance.gangseo.ac.kr/template/2027susi.pdf",
  document: "2027학년도 수시 신입생 모집요강",
  page: 15,
  confidence: 0.99,
};

export const gangseo2027Universities: University[] = [
  { id: "gangseo", name: "강서대학교", region: "서울" },
];

const departments = [
  ["theology", "신학과", "인문·사회"],
  ["business", "경영학과", "경영·경제"],
  ["social-welfare", "사회복지학과", "인문·사회"],
  ["counseling", "상담심리학과", "인문·사회"],
  ["food-nutrition", "식품영양학과", "자연·생활"],
  ["nursing", "간호학과", "보건·간호"],
  ["practical-music", "실용음악학과", "디자인·예술"],
  ["free-major", "자유전공학부", "자유전공"],
] as const;

export const gangseo2027Departments: Department[] = departments.map(([id, name, category]) => ({
  id: `gangseo-${id}`,
  universityId: "gangseo",
  name,
  category,
}));

const aggregate: Department = {
  id: "gangseo-overall",
  universityId: "gangseo",
  name: "2027 수시 전체",
  category: "전체",
};
export const gangseo2027DepartmentsWithAggregate: Department[] = [...gangseo2027Departments, aggregate];

const dept = (id: string) => `gangseo-${id}`;

const admission = (
  departmentId: string,
  name: string,
  type: Admission["type"],
  recruitmentCount: number,
  options: Partial<Admission> = {},
): Admission => ({
  id: `gangseo-2027-${departmentId}-${name}`,
  universityId: "gangseo",
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

const nursingCsat = {
  enabled: true,
  description: "국어/수학/영어/탐구(사회·과학) 중 2개 영역 합 8등급 이내(탐구 상위 1과목)",
  requiredSubjects: 2,
  gradeSum: 8,
};

export const gangseo2027Admissions: Admission[] = [
  // 정원내 학생부교과 일반학생전형: 교과 80 + 면접 20
  admission(dept("theology"), "일반학생", "교과", 5, { studentRecordWeight: 80, interview: true }),
  admission(dept("business"), "일반학생", "교과", 16, { studentRecordWeight: 80, interview: true }),
  admission(dept("social-welfare"), "일반학생", "교과", 17, { studentRecordWeight: 80, interview: true }),
  admission(dept("counseling"), "일반학생", "교과", 14, { studentRecordWeight: 80, interview: true }),
  admission(dept("food-nutrition"), "일반학생", "교과", 14, { studentRecordWeight: 80, interview: true }),
  admission(dept("nursing"), "일반학생", "교과", 41, { studentRecordWeight: 80, interview: true, csatMinimum: nursingCsat }),

  // 정원내 학생부교과 교과우수자전형: 교과 100, 수능최저 없음
  admission(dept("theology"), "교과우수자", "교과", 6, { studentRecordWeight: 100 }),
  admission(dept("business"), "교과우수자", "교과", 21, { studentRecordWeight: 100 }),
  admission(dept("social-welfare"), "교과우수자", "교과", 22, { studentRecordWeight: 100 }),
  admission(dept("counseling"), "교과우수자", "교과", 5, { studentRecordWeight: 100 }),
  admission(dept("food-nutrition"), "교과우수자", "교과", 7, { studentRecordWeight: 100 }),
  admission(dept("free-major"), "교과우수자", "교과", 45, { studentRecordWeight: 100 }),

  // 정원내 학생부교과 사회통합전형: 교과 80 + 면접 20
  admission(dept("theology"), "사회통합", "교과", 1, { studentRecordWeight: 80, interview: true }),
  admission(dept("business"), "사회통합", "교과", 2, { studentRecordWeight: 80, interview: true }),
  admission(dept("social-welfare"), "사회통합", "교과", 2, { studentRecordWeight: 80, interview: true }),
  admission(dept("counseling"), "사회통합", "교과", 2, { studentRecordWeight: 80, interview: true }),
  admission(dept("food-nutrition"), "사회통합", "교과", 2, { studentRecordWeight: 80, interview: true }),
  admission(dept("nursing"), "사회통합", "교과", 2, { studentRecordWeight: 80, interview: true, csatMinimum: nursingCsat }),

  // 정원내 실기·실적 일반학생/사회통합
  admission(dept("practical-music"), "실기 일반학생", "기타", 23, { studentRecordWeight: 20 }),
  admission(dept("practical-music"), "실기 사회통합", "기타", 2, { studentRecordWeight: 20 }),

  // 정원외 전형은 모집단위별 확정 고정인원이 아닌 모집단위 묶음 기준 모집으로 원문 구조를 보존한다.
  admission(aggregate.id, "농어촌학생", "교과", 5, { studentRecordWeight: 100, csatMinimum: nursingCsat }),
  admission(aggregate.id, "기회균등할당제", "교과", 10, { studentRecordWeight: 100, csatMinimum: nursingCsat }),
  admission(aggregate.id, "특수교육대상자", "교과", 2, { studentRecordWeight: 80, interview: true, csatMinimum: nursingCsat }),
];

export const gangseo2027AggregateDepartment = aggregate;
