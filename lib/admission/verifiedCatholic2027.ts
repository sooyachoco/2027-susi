import type { Admission, Department, University } from "./types";
import { admissionSources } from "./sources";

const source = admissionSources.catholic2027;

/**
 * 가톨릭대학교 2027학년도 수시모집요강을 기준으로 우선 편입한 핵심 모집단위.
 * 경영·법학·컴퓨터·AI·데이터 계열을 먼저 연결하고, 나머지 모집단위는 추가 대조 후 확장한다.
 */
export const verifiedCatholic2027Universities: University[] = [
  { id: "catholic", name: "가톨릭대학교", region: "경기" },
];

export const verifiedCatholic2027Departments: Department[] = [
  { id: "catholic-business", universityId: "catholic", name: "경영학과", category: "경영·경제" },
  { id: "catholic-law", universityId: "catholic", name: "법학과", category: "법·행정" },
  { id: "catholic-cs", universityId: "catholic", name: "컴퓨터정보공학부", category: "컴퓨터·소프트웨어" },
  { id: "catholic-ai", universityId: "catholic", name: "인공지능학과", category: "컴퓨터·소프트웨어" },
  { id: "catholic-data", universityId: "catholic", name: "데이터사이언스학과", category: "컴퓨터·소프트웨어" },
];

const departmentCounts: Record<string, { subject: number; document: number; interview: number }> = {
  "catholic-business": { subject: 5, document: 9, interview: 9 },
  "catholic-law": { subject: 5, document: 4, interview: 5 },
  "catholic-cs": { subject: 6, document: 10, interview: 10 },
  "catholic-ai": { subject: 9, document: 10, interview: 10 },
  "catholic-data": { subject: 8, document: 8, interview: 10 },
};

const csat = { enabled: true, description: "2개 영역 등급 합 7 이내" };

export const verifiedCatholic2027Admissions: Admission[] = verifiedCatholic2027Departments.flatMap((department) => {
  const counts = departmentCounts[department.id];
  return [
    {
      id: `${department.id}-regional-balance-2027`,
      universityId: "catholic",
      departmentId: department.id,
      academicYear: 2027,
      name: "지역균형전형",
      type: "교과" as const,
      recruitmentCount: counts.subject,
      studentRecordWeight: 100,
      csatMinimum: csat,
      source,
      isMock: false,
    },
    {
      id: `${department.id}-potential-document-2027`,
      universityId: "catholic",
      departmentId: department.id,
      academicYear: 2027,
      name: "잠재능력우수자서류전형",
      type: "학종" as const,
      recruitmentCount: counts.document,
      documentWeight: 100,
      interview: false,
      csatMinimum: { enabled: false },
      source,
      isMock: false,
    },
    {
      id: `${department.id}-potential-interview-2027`,
      universityId: "catholic",
      departmentId: department.id,
      academicYear: 2027,
      name: "잠재능력우수자면접전형",
      type: "학종" as const,
      recruitmentCount: counts.interview,
      documentWeight: 70,
      interview: true,
      csatMinimum: { enabled: false },
      source,
      isMock: false,
    },
  ];
});
