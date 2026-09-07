import type { Admission, Department, University } from "../types";

export const seoulRealBatch19Universities: University[] = [
  { id: "hanyang-2027", name: "한양대학교", region: "서울" },
];

export const seoulRealBatch19Departments: Department[] = [
  { id: "hanyang-all-2027", universityId: "hanyang-2027", name: "한양대학교 전체", category: "전체" },
];

const source = {
  type: "university" as const,
  academicYear: 2027,
  document: "2027학년도 한양대학교 신입학 수시모집요강",
  verifiedAt: "2026-09-07",
  confidence: 1,
  url: "https://go.hanyang.ac.kr/web/mojib/mojib.do?m_type=SUSI&m_year=2027",
};

export const seoulRealBatch19Admissions: Admission[] = [
  { id: "hanyang-2027-recommended-subject", universityId: "hanyang-2027", departmentId: "hanyang-all-2027", academicYear: 2027, name: "학생부교과(추천형)", type: "교과", recruitmentCount: 346, studentRecordWeight: 100, csatMinimum: { enabled: true }, isAggregate: true, source },
  { id: "hanyang-2027-recommended-holistic", universityId: "hanyang-2027", departmentId: "hanyang-all-2027", academicYear: 2027, name: "학생부종합(추천형)", type: "학종", recruitmentCount: 300, documentWeight: 100, csatMinimum: { enabled: true }, isAggregate: true, source },
  { id: "hanyang-2027-document", universityId: "hanyang-2027", departmentId: "hanyang-all-2027", academicYear: 2027, name: "학생부종합(서류형)", type: "학종", recruitmentCount: 518, documentWeight: 100, isAggregate: true, source },
  { id: "hanyang-2027-interview", universityId: "hanyang-2027", departmentId: "hanyang-all-2027", academicYear: 2027, name: "학생부종합(면접형)", type: "학종", recruitmentCount: 138, documentWeight: 100, interview: true, isAggregate: true, source },
  { id: "hanyang-2027-opportunity", universityId: "hanyang-2027", departmentId: "hanyang-all-2027", academicYear: 2027, name: "학생부종합(고른기회)", type: "학종", recruitmentCount: 113, documentWeight: 100, isAggregate: true, source },
  { id: "hanyang-2027-social", universityId: "hanyang-2027", departmentId: "hanyang-all-2027", academicYear: 2027, name: "학생부종합(사회통합)", type: "학종", recruitmentCount: 5, documentWeight: 100, isAggregate: true, source },
  { id: "hanyang-2027-worker", universityId: "hanyang-2027", departmentId: "hanyang-all-2027", academicYear: 2027, name: "학생부종합(특성화고졸재직자)", type: "학종", recruitmentCount: 158, documentWeight: 100, isAggregate: true, source },
  { id: "hanyang-2027-essay", universityId: "hanyang-2027", departmentId: "hanyang-all-2027", academicYear: 2027, name: "논술", type: "논술", recruitmentCount: 233, csatMinimum: { enabled: true }, isAggregate: true, source },
  { id: "hanyang-2027-practical", universityId: "hanyang-2027", departmentId: "hanyang-all-2027", academicYear: 2027, name: "실기·실적", type: "기타", recruitmentCount: 110, isAggregate: true, source },
];
