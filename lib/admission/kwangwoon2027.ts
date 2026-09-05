import type { Admission, Department, University } from "./types";

const source = {
  type: "university" as const,
  url: "https://iphak.kw.ac.kr/mojib/mojib.php?m_type=SUSI",
  document: "2027학년도 신입학 수시 모집요강",
  academicYear: 2027,
  confidence: 0.99,
  verifiedAt: "2026-09-05",
};

export const kwangwoon2027Universities: University[] = [
  { id: "kwangwoon", name: "광운대학교", region: "서울" },
];

export const kwangwoon2027Departments: Department[] = [
  ["free-natural", "자율전공학부(자연)", "자연"],
  ["free-humanities", "자율전공학부(인문)", "인문"],
  ["electrical", "전자공학과", "자연"],
  ["telecom", "전자통신공학과", "자연"],
  ["electronic-convergence", "전자융합공학과", "자연"],
  ["electrical-engineering", "전기공학과", "자연"],
  ["electronic-materials", "전자재료공학과", "자연"],
  ["semiconductor", "반도체시스템공학전공", "자연"],
  ["computer-info", "컴퓨터정보공학부", "자연"],
  ["software", "소프트웨어학부", "자연"],
  ["information-convergence", "정보융합학부", "자연"],
  ["robot-ai", "로봇학부 AI로봇전공", "자연"],
  ["architecture", "건축학과", "자연"],
  ["architectural-engineering", "건축공학과", "자연"],
  ["chemical-engineering", "화학공학과", "자연"],
  ["environmental", "환경공학과", "자연"],
  ["math", "수학과", "자연"],
  ["biophysics", "전자바이오물리학과", "자연"],
  ["chemistry", "화학과", "자연"],
  ["korean", "국어국문학과", "인문"],
  ["english", "영어영문학과", "인문"],
  ["media", "미디어커뮤니케이션학부", "인문"],
  ["industrial-psychology", "산업심리학과", "인문"],
  ["northeast-asian", "동북아문화산업학부", "인문"],
  ["public-administration", "행정학과", "인문"],
  ["law", "법학부", "인문"],
  ["international", "국제학부", "인문"],
  ["business", "경영학부 경영학전공", "인문"],
  ["bigdata-business", "경영학부 빅데이터경영전공", "인문"],
  ["international-trade", "국제통상학부", "인문"],
  ["kwangwoon-overall", "2027 수시 전체", "전체"],
].map(([id, name, category]) => ({ id: `kwangwoon-${id}`, universityId: "kwangwoon", name, category }));

const overall = "kwangwoon-kwangwoon-overall";
const dept = (id: string) => `kwangwoon-${id}`;

const aggregate = (
  id: string,
  name: string,
  type: Admission["type"],
  recruitmentCount: number,
  extra: Partial<Admission> = {},
): Admission => ({
  id,
  universityId: "kwangwoon",
  departmentId: overall,
  academicYear: 2027,
  name,
  type,
  recruitmentCount,
  source,
  isAggregate: true,
  ...extra,
});

export const kwangwoon2027Admissions: Admission[] = [
  aggregate("kwangwoon-regular-balance", "지역균형", "교과", 198, { studentRecordWeight: 100 }),
  aggregate("kwangwoon-light-i", "광운참빛인재Ⅰ-면접형", "학종", 250, { documentWeight: 60, interview: true }),
  aggregate("kwangwoon-light-ii", "광운참빛인재Ⅱ-서류형", "학종", 221, { documentWeight: 100 }),
  aggregate("kwangwoon-software-talent", "소프트웨어우수인재", "학종", 72, { documentWeight: 60, interview: true }),
  aggregate("kwangwoon-rural", "농어촌학생", "학종", 39, { documentWeight: 100 }),
  aggregate("kwangwoon-specialized-graduate", "특성화고졸업자", "학종", 25, { documentWeight: 100 }),
  aggregate("kwangwoon-employed", "특성화고등을졸업한재직자", "학종", 122, { documentWeight: 100 }),
  aggregate("kwangwoon-seohae5", "서해5도출신자", "학종", 6, { documentWeight: 100 }),
  aggregate("kwangwoon-essay", "논술우수자", "논술", 187, { studentRecordWeight: 20, majorGroup: "논술 80% + 학생부교과 20%" }),
  aggregate("kwangwoon-athlete", "체육특기자", "기타", 15, { majorGroup: "경기실적 60% + 실기 30% + 학생부 10%" }),

  // 공식 모집요강의 모집단위별 논술 모집인원 확인분
  { ...aggregate("kwangwoon-essay-computer", "논술우수자", "논술", 20), departmentId: dept("computer"), isAggregate: false },
  { ...aggregate("kwangwoon-essay-business", "논술우수자", "논술", 20), departmentId: dept("business"), isAggregate: false },
  { ...aggregate("kwangwoon-essay-korean", "논술우수자", "논술", 6), departmentId: dept("korean"), isAggregate: false },
  { ...aggregate("kwangwoon-essay-english", "논술우수자", "논술", 6), departmentId: dept("english"), isAggregate: false },
];

export const kwangwoon2027DepartmentsWithAggregate = kwangwoon2027Departments;
