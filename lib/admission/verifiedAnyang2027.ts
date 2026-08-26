import type { Admission, Department, University } from "./types";

const source = {
  type: "adiga" as const,
  url: "https://www.adiga.kr/ucp/uvt/uni/univDetail.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000147",
  academicYear: 2027,
  confidence: 0.98,
};

/**
 * 안양대학교 2027 수시모집요강(최종본, 2026-06-19 반영)과 대입정보포털을 대조한 핵심 모집단위.
 * 전체 모집단위/특수전형은 후속 검증 대상으로 남긴다.
 */
export const verifiedAnyang2027Universities: University[] = [
  { id: "anyang", name: "안양대학교", region: "경기" },
];

export const verifiedAnyang2027Departments: Department[] = [
  { id: "anyang-free", universityId: "anyang", name: "자유전공", category: "자유전공" },
  { id: "anyang-early-childhood", universityId: "anyang", name: "유아교육과", category: "교육" },
  { id: "anyang-global-business", universityId: "anyang", name: "글로벌경영학과", category: "경영·경제" },
  { id: "anyang-public-admin", universityId: "anyang", name: "행정학과", category: "법·행정" },
  { id: "anyang-data-science", universityId: "anyang", name: "데이터사이언스학과", category: "AI·데이터" },
  { id: "anyang-ai", universityId: "anyang", name: "AI학부", category: "컴퓨터·소프트웨어" },
  { id: "anyang-digital-media-design", universityId: "anyang", name: "디지털미디어디자인학과", category: "디자인·예술" },
  { id: "anyang-info-electronics", universityId: "anyang", name: "정보전기전자공학과", category: "전기·전자" },
  { id: "anyang-environment-energy", universityId: "anyang", name: "환경에너지공학과", category: "공학" },
  { id: "anyang-sports", universityId: "anyang", name: "스포츠과학과", category: "체육·스포츠" },
];

const departments = verifiedAnyang2027Departments.map((d) => d.id);

export const verifiedAnyang2027Admissions: Admission[] = departments.flatMap((departmentId) => [
  {
    id: `anyang-subject-${departmentId}`,
    universityId: "anyang",
    departmentId,
    academicYear: 2027,
    name: "아리학생부교과전형",
    type: "교과" as const,
    studentRecordWeight: 100,
    source,
    isMock: false,
  },
  {
    id: `anyang-interview-${departmentId}`,
    universityId: "anyang",
    departmentId,
    academicYear: 2027,
    name: "아리학생부면접전형",
    type: "교과" as const,
    studentRecordWeight: 60,
    interview: true,
    source,
    isMock: false,
  },
  {
    id: `anyang-holistic-${departmentId}`,
    universityId: "anyang",
    departmentId,
    academicYear: 2027,
    name: "아리학생부종합전형",
    type: "학종" as const,
    studentRecordWeight: 100,
    source,
    isMock: false,
  },
]);
