import type { Admission, Department, University } from "@/lib/types";

const source = {
  type: "university" as const,
  url: "https://admission.snue.ac.kr/admission/na/ntt/selectNttList.do?bbsId=3068&mi=3366",
  document: "서울교육대학교 2027학년도 수시모집 신입생 모집요강",
  academicYear: 2027,
  confidence: 0.99,
};

export const verifiedSeoulEdu2027Universities: University[] = [
  { id: "seoul-edu-2027", name: "서울교육대학교", region: "서울" },
];

export const verifiedSeoulEdu2027Departments: Department[] = [
  { id: "seoul-edu-elementary-2027", universityId: "seoul-edu-2027", name: "초등교육학과", category: "교육" },
];

const aggregateDepartmentId = "seoul-edu-2027-aggregate";
export const verifiedSeoulEdu2027Admissions: Admission[] = [
  {
    id: "seoul-edu-school-recommendation-2027",
    universityId: "seoul-edu-2027",
    departmentId: aggregateDepartmentId,
    academicYear: 2027,
    name: "학생부교과 학교장추천전형",
    type: "교과",
    recruitmentCount: 40,
    studentRecordWeight: 80,
    interview: true,
    csatMinimum: { enabled: true, requiredSubjects: 2, gradeSum: 6, description: "국어·수학·영어·탐구(사회/과학) 중 2개 영역 합 6등급 이내, 한국사 4등급 이내" },
    source,
    isMock: false,
    isAggregate: true,
  },
  {
    id: "seoul-edu-teaching-character-2027",
    universityId: "seoul-edu-2027",
    departmentId: aggregateDepartmentId,
    academicYear: 2027,
    name: "학생부종합 교직인성우수자전형",
    type: "학종",
    recruitmentCount: 150,
    documentWeight: 50,
    interview: true,
    csatMinimum: { enabled: true, requiredSubjects: 2, gradeSum: 6, description: "국어·수학·영어·탐구(사회/과학) 중 2개 영역 합 6등급 이내, 한국사 4등급 이내" },
    source,
    isMock: false,
    isAggregate: true,
  },
  {
    id: "seoul-edu-veterans-2027",
    universityId: "seoul-edu-2027",
    departmentId: aggregateDepartmentId,
    academicYear: 2027,
    name: "학생부종합 국가보훈대상자전형",
    type: "학종",
    recruitmentCount: 5,
    documentWeight: 50,
    interview: true,
    csatMinimum: { enabled: true, requiredSubjects: 2, gradeSum: 8, description: "국어·수학·영어·탐구(사회/과학) 중 2개 영역 합 8등급 이내, 한국사 4등급 이내" },
    source,
    isMock: false,
    isAggregate: true,
  },
  {
    id: "seoul-edu-farmland-2027",
    universityId: "seoul-edu-2027",
    departmentId: aggregateDepartmentId,
    academicYear: 2027,
    name: "학생부종합 농어촌학생전형",
    type: "학종",
    recruitmentCount: 10,
    documentWeight: 50,
    interview: true,
    csatMinimum: { enabled: true, requiredSubjects: 2, gradeSum: 8, description: "국어·수학·영어·탐구(사회/과학) 중 2개 영역 합 8등급 이내, 한국사 4등급 이내" },
    source,
    isMock: false,
    isAggregate: true,
  },
  {
    id: "seoul-edu-basic-living-2027",
    universityId: "seoul-edu-2027",
    departmentId: aggregateDepartmentId,
    academicYear: 2027,
    name: "학생부종합 기초생활수급자등전형",
    type: "학종",
    recruitmentCount: 19,
    documentWeight: 50,
    interview: true,
    csatMinimum: { enabled: true, requiredSubjects: 2, gradeSum: 8, description: "국어·수학·영어·탐구(사회/과학) 중 2개 영역 합 8등급 이내, 한국사 4등급 이내" },
    source,
    isMock: false,
    isAggregate: true,
  },
  {
    id: "seoul-edu-disability-2027",
    universityId: "seoul-edu-2027",
    departmentId: aggregateDepartmentId,
    academicYear: 2027,
    name: "학생부종합 장애인등대상자전형",
    type: "학종",
    recruitmentCount: 11,
    documentWeight: 50,
    interview: true,
    csatMinimum: { enabled: true, requiredSubjects: 2, gradeSum: 8, description: "국어·수학·영어·탐구(사회/과학) 중 2개 영역 합 8등급 이내, 한국사 4등급 이내" },
    source,
    isMock: false,
    isAggregate: true,
  },
];

export const verifiedSeoulEdu2027Summary = {
  source,
  totalEarly: 245,
  inQuota: 205,
  outOfQuota: 40,
  selection: {
    schoolRecommendation: "1단계 학생부교과100% 2배수 → 2단계 1단계 성적80% + 면접20%",
    comprehensive: "1단계 서류100% 2배수 → 2단계 서류50% + 면접50%",
    csat: "학교장추천·교직인성우수자는 2개 영역 합6, 기회균형 전형은 2개 영역 합8, 모두 한국사 4등급 이내",
  },
  notes: ["모집단위는 초등교육학과 단일 모집단위", "재외국민특별전형 7명과 북한이탈학생전형 3명은 별도 기타전형으로 수시 지원횟수 제한에서 제외"],
};

export const verifiedSeoulEdu2027AggregateDepartment: Department = {
  id: aggregateDepartmentId,
  universityId: "seoul-edu-2027",
  name: "서울교육대학교 수시 전체",
};
