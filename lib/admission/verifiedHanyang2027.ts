import type { Admission, Department, University } from "./types";

const source = {
  type: "adiga" as const,
  url: "https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000203",
  academicYear: 2027,
  verifiedAt: "2026-08-27",
  confidence: 0.98,
};

export const verifiedHanyang2027Universities: University[] = [
  { id: "hanyang", name: "한양대학교", region: "서울" },
];

export const verifiedHanyang2027Departments: Department[] = [
  { id: "hanyang-business", universityId: "hanyang", name: "경영학부", category: "경영·경제" },
];

/**
 * 한양대학교 2027학년도 경영학부에서 확인 가능한 핵심 수시 전형.
 * 모집단위별 모집인원은 별도 표 대조 전까지 의도적으로 입력하지 않는다.
 */
export const verifiedHanyang2027Admissions: Admission[] = [
  {
    id: "hanyang-business-recommend-2027",
    universityId: "hanyang",
    departmentId: "hanyang-business",
    academicYear: 2027,
    name: "학생부교과(추천형)",
    type: "교과",
    studentRecordWeight: 90,
    interview: false,
    csatMinimum: {
      enabled: true,
      requiredSubjects: 3,
      gradeSum: 7,
      description: "국어·수학·영어·사탐 또는 과탐(상위 1개 과목) 중 3개 영역 등급합 7 이내",
    },
    source,
    isMock: false,
  },
  {
    id: "hanyang-business-holistic-recommend-2027",
    universityId: "hanyang",
    departmentId: "hanyang-business",
    academicYear: 2027,
    name: "학생부종합(추천형)",
    type: "학종",
    documentWeight: 100,
    interview: false,
    csatMinimum: {
      enabled: true,
      requiredSubjects: 3,
      gradeSum: 7,
      description: "자연·인문·상경: 국어·수학·영어·사탐 또는 과탐(상위 1개 과목) 중 3개 영역 등급합 7 이내",
    },
    source,
    isMock: false,
  },
  {
    id: "hanyang-business-holistic-document-2027",
    universityId: "hanyang",
    departmentId: "hanyang-business",
    academicYear: 2027,
    name: "학생부종합(서류형)",
    type: "학종",
    documentWeight: 100,
    interview: false,
    csatMinimum: { enabled: false },
    source,
    isMock: false,
  },
  {
    id: "hanyang-business-holistic-interview-2027",
    universityId: "hanyang",
    departmentId: "hanyang-business",
    academicYear: 2027,
    name: "학생부종합(면접형)",
    type: "학종",
    documentWeight: 70,
    interview: true,
    csatMinimum: { enabled: false },
    source,
    isMock: false,
  },
];
