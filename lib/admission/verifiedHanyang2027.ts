import type { Admission, Department, University } from "@/lib/types";

const source = {
  type: "university" as const,
  url: "https://go.hanyang.ac.kr/web/mojib/mojib.do?m_type=SUSI&m_year=2027",
  academicYear: 2027,
  verifiedAt: "2026-09-06",
  confidence: 0.99,
};

export const verifiedHanyang2027Universities: University[] = [
  { id: "hanyang", name: "한양대학교", region: "서울" },
];

export const verifiedHanyang2027Departments: Department[] = [
  { id: "hanyang-business", universityId: "hanyang", name: "경영학부", category: "경영·경제" },
  { id: "hanyang-overall", universityId: "hanyang", name: "2027 수시 전체(서울캠퍼스)", category: "전체" },
];

const aggregate = verifiedHanyang2027Departments[1];

type Spec = {
  id: string;
  name: string;
  type: Admission["type"];
  count: number;
  studentRecordWeight?: number;
  documentWeight?: number;
  interview?: boolean;
  csatMinimum?: Admission["csatMinimum"];
};

const specs: Spec[] = [
  {
    id: "recommend",
    name: "학생부교과(추천형)",
    type: "교과",
    count: 346,
    studentRecordWeight: 100,
    csatMinimum: {
      enabled: true,
      requiredSubjects: 3,
      gradeSum: 7,
      description: "국어·수학·영어·탐구 중 3개 영역 등급합 7 이내",
    },
  },
  { id: "holistic-recommend", name: "학생부종합(추천형)", type: "학종", count: 300, documentWeight: 100, csatMinimum: { enabled: false } },
  { id: "holistic-document", name: "학생부종합(서류형)", type: "학종", count: 518, documentWeight: 100, csatMinimum: { enabled: false } },
  { id: "holistic-interview", name: "학생부종합(면접형)", type: "학종", count: 138, documentWeight: 70, interview: true, csatMinimum: { enabled: false } },
  { id: "opportunity", name: "학생부종합(고른기회)", type: "학종", count: 113, documentWeight: 70, csatMinimum: { enabled: false } },
  { id: "social", name: "학생부종합(사회통합)", type: "학종", count: 5, documentWeight: 70, csatMinimum: { enabled: false } },
  { id: "employee", name: "학생부종합(특성화고졸재직자)", type: "학종", count: 158, documentWeight: 100, csatMinimum: { enabled: false } },
  { id: "essay", name: "논술", type: "논술", count: 233, csatMinimum: { enabled: false } },
  { id: "practical", name: "실기/실적", type: "기타", count: 110, csatMinimum: { enabled: false } },
];

export const verifiedHanyang2027Admissions: Admission[] = specs.map((s) => ({
  id: `hanyang-2027-${s.id}`,
  universityId: "hanyang",
  departmentId: aggregate.id,
  academicYear: 2027,
  name: s.name,
  type: s.type,
  recruitmentCount: s.count,
  ...(s.studentRecordWeight !== undefined ? { studentRecordWeight: s.studentRecordWeight } : {}),
  ...(s.documentWeight !== undefined ? { documentWeight: s.documentWeight } : {}),
  ...(s.interview ? { interview: true } : {}),
  csatMinimum: s.csatMinimum ?? { enabled: false },
  source,
  isMock: false,
}));
