import type { Admission, Department, University } from "./types";

const source = {
  type: "university" as const,
  url: "https://www.hongik.ac.kr/kr/admission/index.do",
  document: "홍익대학교 2027학년도 수시모집요강",
  academicYear: 2027,
  confidence: 0.98,
};

export const verifiedHongik2027Universities: University[] = [
  { id: "hongik", name: "홍익대학교", region: "서울" },
];

export const verifiedHongik2027Departments: Department[] = [
  { id: "hongik-business", universityId: "hongik", name: "경영학부", category: "경영·경제" },
  { id: "hongik-cs", universityId: "hongik", name: "컴퓨터공학과", category: "컴퓨터·소프트웨어" },
  { id: "hongik-law", universityId: "hongik", name: "법학부", category: "법·행정" },
  { id: "hongik-electrical", universityId: "hongik", name: "전자·전기공학부", category: "전기·전자" },
  { id: "hongik-mechanical", universityId: "hongik", name: "기계·시스템디자인공학과", category: "기계·자동차" },
  { id: "hongik-materials", universityId: "hongik", name: "신소재·화공시스템공학부", category: "화학·소재" },
  { id: "hongik-data", universityId: "hongik", name: "산업·데이터공학과", category: "AI·데이터" },
];

const schoolLife = new Set([
  "hongik-business", "hongik-cs", "hongik-law", "hongik-electrical", "hongik-mechanical", "hongik-materials", "hongik-data",
]);

const schoolRecommendation = new Set([
  "hongik-business", "hongik-cs", "hongik-law", "hongik-electrical", "hongik-mechanical", "hongik-materials", "hongik-data",
]);

const essay = new Set([
  "hongik-business", "hongik-cs", "hongik-law", "hongik-electrical", "hongik-mechanical", "hongik-materials", "hongik-data",
]);

export const verifiedHongik2027Admissions: Admission[] = verifiedHongik2027Departments.flatMap((department) => {
  const admissions: Admission[] = [];
  if (schoolLife.has(department.id)) {
    admissions.push({ id: `${department.id}-school-life-2027`, universityId: "hongik", departmentId: department.id, academicYear: 2027, name: "학교생활우수자", type: "학종", documentWeight: 100, csatMinimum: { enabled: true }, source, isMock: false });
  }
  if (schoolRecommendation.has(department.id)) {
    admissions.push({ id: `${department.id}-school-recommendation-2027`, universityId: "hongik", departmentId: department.id, academicYear: 2027, name: "학교장추천자", type: "교과", studentRecordWeight: 100, csatMinimum: { enabled: true }, source, isMock: false });
  }
  if (essay.has(department.id)) {
    admissions.push({ id: `${department.id}-essay-2027`, universityId: "hongik", departmentId: department.id, academicYear: 2027, name: "논술", type: "논술", csatMinimum: { enabled: true }, source, isMock: false });
  }
  return admissions;
});
