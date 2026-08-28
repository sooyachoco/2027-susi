import type { Admission, Department, University } from "./types";

// 2027 용인대학교 공식 공개자료에서 학과 개편 및 전형방법이 확인된 최소 검증 데이터.
// 모집인원은 최종 모집요강의 모집단위별 표를 별도 대조한 뒤 추가한다.
export const yongin2027Universities: University[] = [
  { id: "yongin", name: "용인대학교", region: "경기" },
];

export const yongin2027Departments: Department[] = [
  { id: "yongin-ai-system-semiconductor", universityId: "yongin", name: "AI시스템반도체학과", category: "컴퓨터·AI" },
];

const source = {
  type: "university" as const,
  academicYear: 2027,
  url: "https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000156",
  confidence: 0.94,
};

export const yongin2027Admissions: Admission[] = [
  {
    id: "yongin-ai-system-semiconductor-general-2027",
    universityId: "yongin",
    departmentId: "yongin-ai-system-semiconductor",
    academicYear: 2027,
    name: "일반학생전형",
    type: "교과",
    studentRecordWeight: 100,
    source,
    isMock: false,
  },
  {
    id: "yongin-ai-system-semiconductor-equity-2027",
    universityId: "yongin",
    departmentId: "yongin-ai-system-semiconductor",
    academicYear: 2027,
    name: "기회균형 특별전형",
    type: "교과",
    studentRecordWeight: 100,
    source,
    isMock: false,
  },
  {
    id: "yongin-ai-system-semiconductor-rural-2027",
    universityId: "yongin",
    departmentId: "yongin-ai-system-semiconductor",
    academicYear: 2027,
    name: "농어촌학생 특별전형",
    type: "교과",
    studentRecordWeight: 100,
    source,
    isMock: false,
  },
  {
    id: "yongin-ai-system-semiconductor-grade-2027",
    universityId: "yongin",
    departmentId: "yongin-ai-system-semiconductor",
    academicYear: 2027,
    name: "교과성적우수자 특별전형",
    type: "교과",
    studentRecordWeight: 100,
    csatMinimum: { enabled: true },
    source,
    isMock: false,
  },
];
