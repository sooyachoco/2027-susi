import type { Admission, Department, University } from "../types";

export const seoulRealBatch6Universities: University[] = [
  { id: "duksung", name: "덕성여자대학교", region: "서울" },
  { id: "sungshin", name: "성신여자대학교", region: "서울" },
];

export const seoulRealBatch6Departments: Department[] = [
  { id: "duksung-all-2027", universityId: "duksung", name: "전체모집단위", category: "전체" },
  { id: "sungshin-all-2027", universityId: "sungshin", name: "전체모집단위", category: "전체" },
];

const duksungSource = {
  type: "university" as const,
  academicYear: 2027,
  document: "2027학년도 수시모집요강",
  verifiedAt: "2026-09-06",
  confidence: 0.99,
  url: "https://enter.duksung.ac.kr/",
};

const sungshinSource = {
  type: "university" as const,
  academicYear: 2027,
  document: "2027학년도 수시 신입생 모집요강",
  verifiedAt: "2026-09-06",
  confidence: 0.99,
  url: "https://ipsi.sungshin.ac.kr/",
};

export const seoulRealBatch6Admissions: Admission[] = [
  // 덕성여대: 2027 수시 총 862명
  { id: "duksung-2027-recommend", universityId: "duksung", departmentId: "duksung-all-2027", academicYear: 2027, name: "고교추천전형", type: "교과", recruitmentCount: 145, studentRecordWeight: 100, csatMinimum: { enabled: true }, source: duksungSource, isMock: false, isAggregate: true },
  { id: "duksung-2027-doksung1", universityId: "duksung", departmentId: "duksung-all-2027", academicYear: 2027, name: "덕성인재전형Ⅰ", type: "학종", recruitmentCount: 115, documentWeight: 100, csatMinimum: { enabled: false }, source: duksungSource, isMock: false, isAggregate: true },
  { id: "duksung-2027-doksung2", universityId: "duksung", departmentId: "duksung-all-2027", academicYear: 2027, name: "덕성인재전형Ⅱ", type: "학종", recruitmentCount: 240, interview: true, documentWeight: 60, csatMinimum: { enabled: false }, source: duksungSource, isMock: false, isAggregate: true },
  { id: "duksung-2027-social", universityId: "duksung", departmentId: "duksung-all-2027", academicYear: 2027, name: "기회균형전형Ⅱ_사회통합", type: "학종", recruitmentCount: 15, documentWeight: 100, csatMinimum: { enabled: false }, source: duksungSource, isMock: false, isAggregate: true },
  { id: "duksung-2027-specialized", universityId: "duksung", departmentId: "duksung-all-2027", academicYear: 2027, name: "기회균형전형Ⅰ_특성화고교", type: "학종", recruitmentCount: 6, documentWeight: 100, csatMinimum: { enabled: false }, source: duksungSource, isMock: false, isAggregate: true },
  { id: "duksung-2027-rural", universityId: "duksung", departmentId: "duksung-all-2027", academicYear: 2027, name: "기회균형전형Ⅰ_농어촌학생", type: "학종", recruitmentCount: 37, documentWeight: 100, csatMinimum: { enabled: false }, source: duksungSource, isMock: false, isAggregate: true },
  { id: "duksung-2027-basic", universityId: "duksung", departmentId: "duksung-all-2027", academicYear: 2027, name: "기회균형전형Ⅰ_기초생활수급자 등", type: "학종", recruitmentCount: 20, documentWeight: 100, csatMinimum: { enabled: false }, source: duksungSource, isMock: false, isAggregate: true },
  { id: "duksung-2027-disabled", universityId: "duksung", departmentId: "duksung-all-2027", academicYear: 2027, name: "기회균형전형Ⅰ_장애인 등 대상자", type: "학종", recruitmentCount: 5, interview: true, documentWeight: 60, csatMinimum: { enabled: false }, source: duksungSource, isMock: false, isAggregate: true },
  { id: "duksung-2027-employed", universityId: "duksung", departmentId: "duksung-all-2027", academicYear: 2027, name: "기회균형전형Ⅰ_특성화고 등을 졸업한 재직자", type: "학종", recruitmentCount: 63, documentWeight: 100, csatMinimum: { enabled: false }, source: duksungSource, isMock: false, isAggregate: true },
  { id: "duksung-2027-social-gyogwa", universityId: "duksung", departmentId: "duksung-all-2027", academicYear: 2027, name: "기회균형전형Ⅰ_사회통합", type: "교과", recruitmentCount: 25, studentRecordWeight: 100, csatMinimum: { enabled: false }, source: duksungSource, isMock: false, isAggregate: true },
  { id: "duksung-2027-essay", universityId: "duksung", departmentId: "duksung-all-2027", academicYear: 2027, name: "논술우수자", type: "논술", recruitmentCount: 120, csatMinimum: { enabled: false }, source: duksungSource, isMock: false, isAggregate: true },
  { id: "duksung-2027-art", universityId: "duksung", departmentId: "duksung-all-2027", academicYear: 2027, name: "미술실기전형", type: "기타", recruitmentCount: 71, source: duksungSource, isMock: false, isAggregate: true },

  // 성신여대: 2027 수시 정원내 1,342명 + 정원외 136명
  { id: "sungshin-2027-self", universityId: "sungshin", departmentId: "sungshin-all-2027", academicYear: 2027, name: "자기주도인재", type: "학종", recruitmentCount: 533, interview: true, documentWeight: 60, csatMinimum: { enabled: false }, source: sungshinSource, isMock: false, isAggregate: true },
  { id: "sungshin-2027-opportunity", universityId: "sungshin", departmentId: "sungshin-all-2027", academicYear: 2027, name: "기회균형Ⅰ", type: "학종", recruitmentCount: 112, documentWeight: 100, csatMinimum: { enabled: false }, source: sungshinSource, isMock: false, isAggregate: true },
  { id: "sungshin-2027-employed", universityId: "sungshin", departmentId: "sungshin-all-2027", academicYear: 2027, name: "특성화고 등을 졸업한 재직자(정원외)", type: "학종", recruitmentCount: 113, documentWeight: 100, csatMinimum: { enabled: false }, source: sungshinSource, isMock: false, isAggregate: true },
  { id: "sungshin-2027-disabled", universityId: "sungshin", departmentId: "sungshin-all-2027", academicYear: 2027, name: "특수교육대상자(정원외)", type: "학종", recruitmentCount: 23, documentWeight: 100, csatMinimum: { enabled: false }, source: sungshinSource, isMock: false, isAggregate: true },
  { id: "sungshin-2027-major", universityId: "sungshin", departmentId: "sungshin-all-2027", academicYear: 2027, name: "지역균형_전공", type: "교과", recruitmentCount: 185, studentRecordWeight: 90, csatMinimum: { enabled: true }, source: sungshinSource, isMock: false, isAggregate: true },
  { id: "sungshin-2027-free", universityId: "sungshin", departmentId: "sungshin-all-2027", academicYear: 2027, name: "지역균형_무전공", type: "교과", recruitmentCount: 127, studentRecordWeight: 90, csatMinimum: { enabled: true }, source: sungshinSource, isMock: false, isAggregate: true },
  { id: "sungshin-2027-essay", universityId: "sungshin", departmentId: "sungshin-all-2027", academicYear: 2027, name: "논술우수자", type: "논술", recruitmentCount: 159, csatMinimum: { enabled: true }, source: sungshinSource, isMock: false, isAggregate: true },
  { id: "sungshin-2027-practical", universityId: "sungshin", departmentId: "sungshin-all-2027", academicYear: 2027, name: "일반학생", type: "기타", recruitmentCount: 226, csatMinimum: { enabled: false }, source: sungshinSource, isMock: false, isAggregate: true },
];
