import type { Admission, Department, University } from "./types";
import { admissionSources } from "./sources";

const source = admissionSources.catholic2027;

/**
 * 가톨릭대학교 2027학년도 수시모집요강 기준 검증 데이터.
 * 성심교정 기존 검증분을 유지하고 성의교정 의예과·간호학과 공식 데이터를 추가 반영한다.
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
  { id: "catholic-med", universityId: "catholic", name: "의예과", category: "의학" },
  { id: "catholic-nursing", universityId: "catholic", name: "간호학과", category: "간호·보건" },
];

const departmentCounts: Record<string, { subject: number; document: number; interview: number }> = {
  "catholic-business": { subject: 5, document: 9, interview: 9 },
  "catholic-law": { subject: 5, document: 4, interview: 5 },
  "catholic-cs": { subject: 6, document: 10, interview: 10 },
  "catholic-ai": { subject: 9, document: 10, interview: 10 },
  "catholic-data": { subject: 8, document: 8, interview: 10 },
};

const csat = { enabled: true, description: "2개 영역 등급 합 7 이내" };

export const verifiedCatholic2027Admissions: Admission[] = [
  ...verifiedCatholic2027Departments
    .filter((department) => departmentCounts[department.id])
    .flatMap((department) => {
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
    }),
  {
    id: "catholic-med-regional-2027",
    universityId: "catholic",
    departmentId: "catholic-med",
    academicYear: 2027,
    name: "지역균형전형",
    type: "교과",
    recruitmentCount: 10,
    studentRecordWeight: 100,
    csatMinimum: { enabled: true, requiredSubjects: 4, gradeSum: 5, description: "국어·수학·영어·과탐(2과목 평균) 중 4개 영역 등급 합 5 이내 및 한국사 4등급 이내" },
    source,
    isMock: false,
  },
  {
    id: "catholic-med-leader-2027",
    universityId: "catholic",
    departmentId: "catholic-med",
    academicYear: 2027,
    name: "가톨릭지도자추천전형",
    type: "학종",
    recruitmentCount: 2,
    documentWeight: 70,
    interview: true,
    csatMinimum: { enabled: false },
    source,
    isMock: false,
  },
  {
    id: "catholic-med-school-2027",
    universityId: "catholic",
    departmentId: "catholic-med",
    academicYear: 2027,
    name: "학교장추천전형",
    type: "학종",
    recruitmentCount: 25,
    documentWeight: 70,
    interview: true,
    csatMinimum: { enabled: true, requiredSubjects: 3, gradeSum: 4, description: "국어·수학·영어·과탐(2과목 평균) 중 3개 영역 등급 합 4 이내 및 한국사 4등급 이내" },
    source,
    isMock: false,
  },
  {
    id: "catholic-med-essay-2027",
    universityId: "catholic",
    departmentId: "catholic-med",
    academicYear: 2027,
    name: "논술전형",
    type: "논술",
    recruitmentCount: 19,
    csatMinimum: { enabled: true, requiredSubjects: 3, gradeSum: 4, description: "국어·수학·영어·과탐(2과목 평균) 중 3개 영역 등급 합 4 이내 및 한국사 4등급 이내" },
    source,
    isMock: false,
  },
  {
    id: "catholic-nursing-regional-2027",
    universityId: "catholic",
    departmentId: "catholic-nursing",
    academicYear: 2027,
    name: "지역균형",
    type: "교과",
    recruitmentCount: 14,
    studentRecordWeight: 100,
    csatMinimum: { enabled: true, requiredSubjects: 3, gradeSum: 7, description: "국어·수학·영어·사탐/과탐 중 3개 영역 등급 합 7 이내" },
    source,
    isMock: false,
  },
  {
    id: "catholic-nursing-school-2027",
    universityId: "catholic",
    departmentId: "catholic-nursing",
    academicYear: 2027,
    name: "학교장추천",
    type: "학종",
    recruitmentCount: 16,
    documentWeight: 70,
    interview: true,
    csatMinimum: { enabled: false },
    source,
    isMock: false,
  },
  {
    id: "catholic-nursing-essay-2027",
    universityId: "catholic",
    departmentId: "catholic-nursing",
    academicYear: 2027,
    name: "논술",
    type: "논술",
    recruitmentCount: 18,
    csatMinimum: { enabled: true, requiredSubjects: 3, gradeSum: 7, description: "국어·수학·영어·사탐/과탐 중 3개 영역 등급 합 7 이내" },
    source,
    isMock: false,
  },
];
