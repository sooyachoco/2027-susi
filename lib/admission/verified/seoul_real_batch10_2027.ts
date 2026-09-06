import type { Admission, Department, University } from "../types";

// 2027학년도 최종 수시모집요강 기준 서울권 검증 데이터
// 상명대·한성대·서경대
export const seoulRealBatch10Universities: University[] = [
  { id: "sangmyung-2027", name: "상명대학교", region: "서울" },
  { id: "hansung-2027", name: "한성대학교", region: "서울" },
  { id: "seokyeong-2027", name: "서경대학교", region: "서울" },
];

export const seoulRealBatch10Departments: Department[] = [
  { id: "sangmyung-all-2027", universityId: "sangmyung-2027", name: "전체모집단위", category: "전체" },
  { id: "hansung-all-2027", universityId: "hansung-2027", name: "전체모집단위", category: "전체" },
  { id: "seokyeong-all-2027", universityId: "seokyeong-2027", name: "전체모집단위", category: "전체" },
];

const sangmyungSource = { type: "university" as const, academicYear: 2027, document: "2027학년도 수시모집요강", verifiedAt: "2026-09-07", confidence: 0.99, url: "https://adiga.kr/" };
const hansungSource = { type: "university" as const, academicYear: 2027, document: "2027학년도 수시모집요강", verifiedAt: "2026-09-07", confidence: 0.99, url: "https://enter.hansung.ac.kr/" };
const seokyeongSource = { type: "university" as const, academicYear: 2027, document: "2027학년도 수시모집요강", verifiedAt: "2026-09-07", confidence: 0.99, url: "https://go.skuniv.ac.kr/" };

export const seoulRealBatch10Admissions: Admission[] = [
  { id: "sangmyung-2027-recommend", universityId: "sangmyung-2027", departmentId: "sangmyung-all-2027", academicYear: 2027, name: "고교추천전형", type: "교과", recruitmentCount: 349, studentRecordWeight: 100, csatMinimum: { enabled: false }, source: sangmyungSource, isMock: false, isAggregate: true },
  { id: "sangmyung-2027-sangmyung", universityId: "sangmyung-2027", departmentId: "sangmyung-all-2027", academicYear: 2027, name: "상명인재전형", type: "학종", recruitmentCount: 155, documentWeight: 100, csatMinimum: { enabled: false }, source: sangmyungSource, isMock: false, isAggregate: true },
  { id: "sangmyung-2027-opportunity", universityId: "sangmyung-2027", departmentId: "sangmyung-all-2027", academicYear: 2027, name: "기회균형전형", type: "학종", recruitmentCount: 70, documentWeight: 100, csatMinimum: { enabled: false }, source: sangmyungSource, isMock: false, isAggregate: true },
  { id: "sangmyung-2027-essay", universityId: "sangmyung-2027", departmentId: "sangmyung-all-2027", academicYear: 2027, name: "논술전형", type: "논술", recruitmentCount: 98, csatMinimum: { enabled: false }, source: sangmyungSource, isMock: false, isAggregate: true },
  { id: "sangmyung-2027-practical", universityId: "sangmyung-2027", departmentId: "sangmyung-all-2027", academicYear: 2027, name: "실기전형", type: "기타", recruitmentCount: 138, source: sangmyungSource, isMock: false, isAggregate: true },
  { id: "sangmyung-2027-employed", universityId: "sangmyung-2027", departmentId: "sangmyung-all-2027", academicYear: 2027, name: "특성화고졸재직자", type: "학종", recruitmentCount: 123, source: sangmyungSource, isMock: false, isAggregate: true },
  { id: "sangmyung-2027-disabled", universityId: "sangmyung-2027", departmentId: "sangmyung-all-2027", academicYear: 2027, name: "특수교육대상자", type: "학종", recruitmentCount: 7, source: sangmyungSource, isMock: false, isAggregate: true },
  { id: "sangmyung-2027-employed-extra", universityId: "sangmyung-2027", departmentId: "sangmyung-all-2027", academicYear: 2027, name: "특성화고졸재직자(정원외)", type: "학종", recruitmentCount: 1, source: sangmyungSource, isMock: false, isAggregate: true },
  { id: "sangmyung-2027-seohae5", universityId: "sangmyung-2027", departmentId: "sangmyung-all-2027", academicYear: 2027, name: "서해5도학생전형", type: "교과", recruitmentCount: 6, source: sangmyungSource, isMock: false, isAggregate: true },

  { id: "hansung-2027-gyogwa", universityId: "hansung-2027", departmentId: "hansung-all-2027", academicYear: 2027, name: "교과우수", type: "교과", recruitmentCount: 260, studentRecordWeight: 100, csatMinimum: { enabled: true }, source: hansungSource, isMock: false, isAggregate: true },
  { id: "hansung-2027-regional", universityId: "hansung-2027", departmentId: "hansung-all-2027", academicYear: 2027, name: "지역균형", type: "교과", recruitmentCount: 188, studentRecordWeight: 100, csatMinimum: { enabled: false }, source: hansungSource, isMock: false, isAggregate: true },
  { id: "hansung-2027-hansung", universityId: "hansung-2027", departmentId: "hansung-all-2027", academicYear: 2027, name: "한성인재", type: "학종", recruitmentCount: 310, documentWeight: 100, csatMinimum: { enabled: false }, source: hansungSource, isMock: false, isAggregate: true },
  { id: "hansung-2027-opportunity", universityId: "hansung-2027", departmentId: "hansung-all-2027", academicYear: 2027, name: "기회균형(고른기회)", type: "학종", recruitmentCount: 45, documentWeight: 100, csatMinimum: { enabled: false }, source: hansungSource, isMock: false, isAggregate: true },
  { id: "hansung-2027-adult", universityId: "hansung-2027", departmentId: "hansung-all-2027", academicYear: 2027, name: "기회균형(성인학습자)", type: "학종", recruitmentCount: 20, documentWeight: 100, csatMinimum: { enabled: false }, source: hansungSource, isMock: false, isAggregate: true },
  { id: "hansung-2027-practical", universityId: "hansung-2027", departmentId: "hansung-all-2027", academicYear: 2027, name: "실기우수자", type: "기타", recruitmentCount: 128, source: hansungSource, isMock: false, isAggregate: true },
  { id: "hansung-2027-rural", universityId: "hansung-2027", departmentId: "hansung-all-2027", academicYear: 2027, name: "기회균형(농어촌학생)", type: "교과", recruitmentCount: 58, source: hansungSource, isMock: false, isAggregate: true },
  { id: "hansung-2027-special", universityId: "hansung-2027", departmentId: "hansung-all-2027", academicYear: 2027, name: "기회균형(특성화고교졸업자)", type: "교과", recruitmentCount: 21, source: hansungSource, isMock: false, isAggregate: true },
  { id: "hansung-2027-employed", universityId: "hansung-2027", departmentId: "hansung-all-2027", academicYear: 2027, name: "기회균형(특성화고졸재직자)", type: "학종", recruitmentCount: 80, source: hansungSource, isMock: false, isAggregate: true },
  { id: "hansung-2027-foreign", universityId: "hansung-2027", departmentId: "hansung-all-2027", academicYear: 2027, name: "재외국민 및 외국인", type: "기타", recruitmentCount: 29, source: hansungSource, isMock: false, isAggregate: true },

  { id: "seokyeong-2027-essay", universityId: "seokyeong-2027", departmentId: "seokyeong-all-2027", academicYear: 2027, name: "논술우수자", type: "논술", recruitmentCount: 214, csatMinimum: { enabled: false }, source: seokyeongSource, isMock: false, isAggregate: true },
  { id: "seokyeong-2027-gyogwa", universityId: "seokyeong-2027", departmentId: "seokyeong-all-2027", academicYear: 2027, name: "교과우수자", type: "교과", recruitmentCount: 112, studentRecordWeight: 100, csatMinimum: { enabled: false }, source: seokyeongSource, isMock: false, isAggregate: true },
  { id: "seokyeong-2027-balance", universityId: "seokyeong-2027", departmentId: "seokyeong-all-2027", academicYear: 2027, name: "교과균형", type: "교과", recruitmentCount: 204, studentRecordWeight: 100, csatMinimum: { enabled: true }, source: seokyeongSource, isMock: false, isAggregate: true },
  { id: "seokyeong-2027-social", universityId: "seokyeong-2027", departmentId: "seokyeong-all-2027", academicYear: 2027, name: "사회기여자", type: "교과", recruitmentCount: 12, studentRecordWeight: 100, csatMinimum: { enabled: false }, source: seokyeongSource, isMock: false, isAggregate: true },
  { id: "seokyeong-2027-practical", universityId: "seokyeong-2027", departmentId: "seokyeong-all-2027", academicYear: 2027, name: "실기우수자", type: "기타", recruitmentCount: 419, source: seokyeongSource, isMock: false, isAggregate: true },
  { id: "seokyeong-2027-military", universityId: "seokyeong-2027", departmentId: "seokyeong-all-2027", academicYear: 2027, name: "군사학과 특별전형", type: "기타", recruitmentCount: 30, source: seokyeongSource, isMock: false, isAggregate: true },
  { id: "seokyeong-2027-opportunity", universityId: "seokyeong-2027", departmentId: "seokyeong-all-2027", academicYear: 2027, name: "기회균형①", type: "교과", recruitmentCount: 22, studentRecordWeight: 100, csatMinimum: { enabled: true }, source: seokyeongSource, isMock: false, isAggregate: true },
];
