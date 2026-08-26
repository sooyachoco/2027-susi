import type { Admission, Department, University } from "./types";
import { admissionSources } from "./sources";

/**
 * 세종대학교 2027학년도 핵심 모집단위에 대해 대학 입학처가 공개한 자료로 확인한 전형 데이터.
 * 2027학년도 학생부위주전형 안내표의 모집인원을 기준으로, 현재 서비스에서 우선 활용하는
 * 법학부·경영학부·컴퓨터공학과만 편입한다. 확인되지 않은 서류형 전형은 임의로 만들지 않는다.
 */
export const verifiedSejong2027Universities: University[] = [
  { id: "sejong", name: "세종대학교", region: "서울" },
];

export const verifiedSejong2027Departments: Department[] = [
  { id: "sejong-law", universityId: "sejong", name: "법학부", category: "법·행정" },
  { id: "sejong-business", universityId: "sejong", name: "경영학부", category: "경영·경제" },
  { id: "sejong-cs", universityId: "sejong", name: "컴퓨터공학과", category: "컴퓨터·소프트웨어" },
];

const source = admissionSources.sejong2027;

export const verifiedSejong2027Admissions: Admission[] = [
  {
    id: "sejong-law-talent-interview-2027",
    universityId: "sejong",
    departmentId: "sejong-law",
    academicYear: 2027,
    name: "세종인재 전형(면접형)",
    type: "학종",
    recruitmentCount: 4,
    documentWeight: 60,
    interview: true,
    csatMinimum: { enabled: false },
    source,
    isMock: false,
  },
  {
    id: "sejong-law-regional-balance-2027",
    universityId: "sejong",
    departmentId: "sejong-law",
    academicYear: 2027,
    name: "지역균형",
    type: "교과",
    recruitmentCount: 4,
    studentRecordWeight: 100,
    csatMinimum: { enabled: true, description: "수능최저 적용" },
    source,
    isMock: false,
  },
  {
    id: "sejong-business-talent-interview-2027",
    universityId: "sejong",
    departmentId: "sejong-business",
    academicYear: 2027,
    name: "세종인재 전형(면접형)",
    type: "학종",
    recruitmentCount: 12,
    documentWeight: 60,
    interview: true,
    csatMinimum: { enabled: false },
    source,
    isMock: false,
  },
  {
    id: "sejong-business-regional-balance-2027",
    universityId: "sejong",
    departmentId: "sejong-business",
    academicYear: 2027,
    name: "지역균형",
    type: "교과",
    recruitmentCount: 10,
    studentRecordWeight: 100,
    csatMinimum: { enabled: true, description: "수능최저 적용" },
    source,
    isMock: false,
  },
  {
    id: "sejong-cs-talent-interview-2027",
    universityId: "sejong",
    departmentId: "sejong-cs",
    academicYear: 2027,
    name: "세종인재 전형(면접형)",
    type: "학종",
    recruitmentCount: 12,
    documentWeight: 60,
    interview: true,
    csatMinimum: { enabled: false },
    source,
    isMock: false,
  },
  {
    id: "sejong-cs-regional-balance-2027",
    universityId: "sejong",
    departmentId: "sejong-cs",
    academicYear: 2027,
    name: "지역균형",
    type: "교과",
    recruitmentCount: 10,
    studentRecordWeight: 100,
    csatMinimum: { enabled: true, description: "수능최저 적용" },
    source,
    isMock: false,
  },
];
