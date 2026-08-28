import type { Admission, Department, University } from "./types";
import { admissionSources } from "./sources";

const source = admissionSources.catholic2027;

/**
 * 가톨릭대학교 2027학년도 수시모집요강 기준 검증 데이터.
 * 공식 모집요강의 모집단위·모집인원 표를 우선 반영한다.
 */
export const verifiedCatholic2027Universities: University[] = [
  { id: "catholic", name: "가톨릭대학교", region: "경기" },
];

export const verifiedCatholic2027Departments: Department[] = [
  { id: "catholic-free", universityId: "catholic", name: "자유전공학부", category: "자유전공" },
  { id: "catholic-humanities", universityId: "catholic", name: "인문사회계열", category: "인문·사회" },
  { id: "catholic-natural", universityId: "catholic", name: "자연공학계열", category: "자연·공학" },
  { id: "catholic-korean", universityId: "catholic", name: "국어국문학과", category: "인문·사회" },
  { id: "catholic-philosophy", universityId: "catholic", name: "철학과", category: "인문·사회" },
  { id: "catholic-history", universityId: "catholic", name: "국사학과", category: "인문·사회" },
  { id: "catholic-english", universityId: "catholic", name: "영어영문학부", category: "인문·사회" },
  { id: "catholic-chinese", universityId: "catholic", name: "중국언어문화학과", category: "인문·사회" },
  { id: "catholic-japanese", universityId: "catholic", name: "일어일본문화학과", category: "인문·사회" },
  { id: "catholic-social-welfare", universityId: "catholic", name: "사회복지학과", category: "인문·사회" },
  { id: "catholic-psychology", universityId: "catholic", name: "심리학과", category: "인문·사회" },
  { id: "catholic-sociology", universityId: "catholic", name: "사회학과", category: "인문·사회" },
  { id: "catholic-law", universityId: "catholic", name: "법학과", category: "법·행정" },
  { id: "catholic-business", universityId: "catholic", name: "경영학과", category: "경영·경제" },
  { id: "catholic-ai", universityId: "catholic", name: "인공지능학과", category: "컴퓨터·소프트웨어" },
  { id: "catholic-data", universityId: "catholic", name: "데이터사이언스학과", category: "컴퓨터·소프트웨어" },
  { id: "catholic-cs", universityId: "catholic", name: "컴퓨터정보공학부", category: "컴퓨터·소프트웨어" },
  { id: "catholic-med", universityId: "catholic", name: "의예과", category: "의학" },
  { id: "catholic-pharm", universityId: "catholic", name: "약학과", category: "약학" },
  { id: "catholic-nursing", universityId: "catholic", name: "간호학과", category: "간호·보건" },
];

const departmentCounts: Record<string, { subject?: number; document?: number; interview?: number; essay?: number }> = {
  "catholic-free": { subject: 5 },
  "catholic-humanities": { subject: 15, document: 10 },
  "catholic-natural": { subject: 10, document: 9 },
  "catholic-korean": { subject: 5, document: 4, interview: 5, essay: 4 },
  "catholic-philosophy": { subject: 5, document: 4, interview: 5, essay: 4 },
  "catholic-history": { subject: 5, document: 4, interview: 6, essay: 3 },
  "catholic-english": { subject: 6, document: 10, interview: 10, essay: 5 },
  "catholic-chinese": { subject: 5, document: 5, interview: 6, essay: 4 },
  "catholic-japanese": { subject: 5, document: 5, interview: 6, essay: 4 },
  "catholic-social-welfare": { subject: 5, document: 5, interview: 6, essay: 4 },
  "catholic-psychology": { subject: 5, document: 8, interview: 8, essay: 5 },
  "catholic-sociology": { subject: 5, document: 5, interview: 5, essay: 4 },
  "catholic-law": { subject: 5, document: 4, interview: 5, essay: 4 },
  "catholic-business": { subject: 5, document: 9, interview: 9, essay: 5 },
  "catholic-cs": { subject: 6, document: 10, interview: 10, essay: 5 },
  "catholic-ai": { subject: 5, document: 6, interview: 6, essay: 5 },
  "catholic-data": { subject: 5, document: 6, interview: 5, essay: 5 },
};

const generalCsat = { enabled: true, description: "2개 영역 등급 합 7 이내" };
const broadCsat = { enabled: true, description: "자유전공학부·인문사회계열·자연공학계열: 2개 영역 등급 합 6 이내" };

export const verifiedCatholic2027Admissions: Admission[] = [
  ...verifiedCatholic2027Departments.flatMap((department) => {
    const counts = departmentCounts[department.id];
    if (!counts) return [];
    const admissions: Admission[] = [];

    if (counts.subject) {
      admissions.push({
        id: `${department.id}-regional-balance-2027`,
        universityId: "catholic",
        departmentId: department.id,
        academicYear: 2027,
        name: "지역균형전형",
        type: "교과",
        recruitmentCount: counts.subject,
        studentRecordWeight: 100,
        csatMinimum: ["catholic-free", "catholic-humanities", "catholic-natural"].includes(department.id) ? broadCsat : generalCsat,
        source,
        isMock: false,
      });
    }

    if (counts.document) {
      admissions.push({
        id: `${department.id}-potential-document-2027`,
        universityId: "catholic",
        departmentId: department.id,
        academicYear: 2027,
        name: "잠재능력우수자서류전형",
        type: "학종",
        recruitmentCount: counts.document,
        documentWeight: 100,
        interview: false,
        csatMinimum: { enabled: false },
        source,
        isMock: false,
      });
    }

    if (counts.interview) {
      admissions.push({
        id: `${department.id}-potential-interview-2027`,
        universityId: "catholic",
        departmentId: department.id,
        academicYear: 2027,
        name: "잠재능력우수자면접전형",
        type: "학종",
        recruitmentCount: counts.interview,
        documentWeight: 70,
        interview: true,
        csatMinimum: { enabled: false },
        source,
        isMock: false,
      });
    }

    if (counts.essay) {
      admissions.push({
        id: `${department.id}-essay-2027`,
        universityId: "catholic",
        departmentId: department.id,
        academicYear: 2027,
        name: "논술전형",
        type: "논술",
        recruitmentCount: counts.essay,
        csatMinimum: { enabled: false },
        source,
        isMock: false,
      });
    }

    return admissions;
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
    id: "catholic-pharm-school-2027",
    universityId: "catholic",
    departmentId: "catholic-pharm",
    academicYear: 2027,
    name: "학교장추천전형",
    type: "학종",
    recruitmentCount: 9,
    documentWeight: 70,
    interview: true,
    csatMinimum: { enabled: true, requiredSubjects: 3, gradeSum: 5, description: "국어·수학·영어·과탐 중 3개 영역 등급 합 5 이내" },
    source,
    isMock: false,
  },
  {
    id: "catholic-pharm-essay-2027",
    universityId: "catholic",
    departmentId: "catholic-pharm",
    academicYear: 2027,
    name: "논술전형",
    type: "논술",
    recruitmentCount: 7,
    csatMinimum: { enabled: true, requiredSubjects: 3, gradeSum: 5, description: "국어·수학·영어·과탐 중 3개 영역 등급 합 5 이내" },
    source,
    isMock: false,
  },
  {
    id: "catholic-nursing-regional-2027",
    universityId: "catholic",
    departmentId: "catholic-nursing",
    academicYear: 2027,
    name: "지역균형전형",
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
    name: "학교장추천전형",
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
    name: "논술전형",
    type: "논술",
    recruitmentCount: 18,
    csatMinimum: { enabled: true, requiredSubjects: 3, gradeSum: 7, description: "국어·수학·영어·사탐/과탐 중 3개 영역 등급 합 7 이내" },
    source,
    isMock: false,
  },
];
