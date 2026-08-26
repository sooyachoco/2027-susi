import type { Admission, Department, University } from "./types";
import { admissionSources } from "./sources";

/**
 * 세종대학교 2027학년도 핵심 모집단위에 대해 대학 입학처가 공개한 자료로 확인한 전형 데이터.
 * 모집인원은 2027학년도 수시모집 모집요강의 모집단위별 표를 기준으로 반영한다.
 */
export const verifiedSejong2027Universities: University[] = [
  { id: "sejong", name: "세종대학교", region: "서울" },
];

export const verifiedSejong2027Departments: Department[] = [
  { id: "sejong-law", universityId: "sejong", name: "법학부", category: "법·행정" },
  { id: "sejong-business", universityId: "sejong", name: "경영학부", category: "경영·경제" },
  { id: "sejong-economics", universityId: "sejong", name: "경제학과", category: "경영·경제" },
  { id: "sejong-cs", universityId: "sejong", name: "컴퓨터공학과", category: "컴퓨터·소프트웨어" },
];

const source = admissionSources.sejong2027;

const regionalMinimum = {
  enabled: true,
  description: "인문·자연계열: 2개 영역 등급 합 6 이내",
  requiredSubjects: 2,
  gradeSum: 6,
};

const essayMinimum = {
  enabled: true,
  description: "인문·자연계열: 2개 영역 등급 합 5 이내",
  requiredSubjects: 2,
  gradeSum: 5,
};

export const verifiedSejong2027Admissions: Admission[] = [
  {
    id: "sejong-law-talent-interview-2027", universityId: "sejong", departmentId: "sejong-law", academicYear: 2027,
    name: "세종인재 전형(면접형)", type: "학종", recruitmentCount: 4, documentWeight: 60, interview: true,
    csatMinimum: { enabled: false }, source, isMock: false,
  },
  {
    id: "sejong-law-regional-2027", universityId: "sejong", departmentId: "sejong-law", academicYear: 2027,
    name: "지역균형", type: "교과", recruitmentCount: 4, studentRecordWeight: 100,
    csatMinimum: regionalMinimum, source, isMock: false,
  },
  {
    id: "sejong-law-essay-2027", universityId: "sejong", departmentId: "sejong-law", academicYear: 2027,
    name: "논술우수자", type: "논술", recruitmentCount: 4, studentRecordWeight: 20,
    csatMinimum: essayMinimum, source, isMock: false,
  },
  {
    id: "sejong-business-talent-interview-2027", universityId: "sejong", departmentId: "sejong-business", academicYear: 2027,
    name: "세종인재 전형(면접형)", type: "학종", recruitmentCount: 12, documentWeight: 60, interview: true,
    csatMinimum: { enabled: false }, source, isMock: false,
  },
  {
    id: "sejong-business-talent-document-2027", universityId: "sejong", departmentId: "sejong-business", academicYear: 2027,
    name: "세종인재 전형(서류형)", type: "학종", recruitmentCount: 1, documentWeight: 100,
    csatMinimum: { enabled: false }, source, isMock: false,
  },
  {
    id: "sejong-business-regional-2027", universityId: "sejong", departmentId: "sejong-business", academicYear: 2027,
    name: "지역균형", type: "교과", recruitmentCount: 10, studentRecordWeight: 100,
    csatMinimum: regionalMinimum, source, isMock: false,
  },
  {
    id: "sejong-business-essay-2027", universityId: "sejong", departmentId: "sejong-business", academicYear: 2027,
    name: "논술우수자", type: "논술", recruitmentCount: 9, studentRecordWeight: 20,
    csatMinimum: essayMinimum, source, isMock: false,
  },
  {
    id: "sejong-economics-talent-interview-2027", universityId: "sejong", departmentId: "sejong-economics", academicYear: 2027,
    name: "세종인재 전형(면접형)", type: "학종", recruitmentCount: 5, documentWeight: 60, interview: true,
    csatMinimum: { enabled: false }, source, isMock: false,
  },
  {
    id: "sejong-economics-regional-2027", universityId: "sejong", departmentId: "sejong-economics", academicYear: 2027,
    name: "지역균형", type: "교과", recruitmentCount: 4, studentRecordWeight: 100,
    csatMinimum: regionalMinimum, source, isMock: false,
  },
  {
    id: "sejong-economics-essay-2027", universityId: "sejong", departmentId: "sejong-economics", academicYear: 2027,
    name: "논술우수자", type: "논술", recruitmentCount: 4, studentRecordWeight: 20,
    csatMinimum: essayMinimum, source, isMock: false,
  },
  {
    id: "sejong-cs-talent-interview-2027", universityId: "sejong", departmentId: "sejong-cs", academicYear: 2027,
    name: "세종인재 전형(면접형)", type: "학종", recruitmentCount: 12, documentWeight: 60, interview: true,
    csatMinimum: { enabled: false }, source, isMock: false,
  },
  {
    id: "sejong-cs-talent-document-2027", universityId: "sejong", departmentId: "sejong-cs", academicYear: 2027,
    name: "세종인재 전형(서류형)", type: "학종", recruitmentCount: 1, documentWeight: 100,
    csatMinimum: { enabled: false }, source, isMock: false,
  },
  {
    id: "sejong-cs-regional-2027", universityId: "sejong", departmentId: "sejong-cs", academicYear: 2027,
    name: "지역균형", type: "교과", recruitmentCount: 10, studentRecordWeight: 100,
    csatMinimum: regionalMinimum, source, isMock: false,
  },
  {
    id: "sejong-cs-essay-2027", universityId: "sejong", departmentId: "sejong-cs", academicYear: 2027,
    name: "논술우수자", type: "논술", recruitmentCount: 10, studentRecordWeight: 20,
    csatMinimum: essayMinimum, source, isMock: false,
  },
];
