import type { Admission, Department, University } from "../types";

export const seoulRealNext2027Universities: University[] = [
  { id: "success", name: "성공회대학교", region: "서울" },
  { id: "seoultech", name: "서울과학기술대학교", region: "서울" },
  { id: "dongduk", name: "동덕여자대학교", region: "서울" },
];

export const seoulRealNext2027Departments: Department[] = [
  { id: "success-all-2027", universityId: "success", name: "전체모집단위", category: "전체" },
  { id: "seoultech-all-2027", universityId: "seoultech", name: "전체모집단위", category: "전체" },
  { id: "dongduk-all-2027", universityId: "dongduk", name: "전체모집단위", category: "전체" },
];

const successSource = {
  type: "university" as const,
  academicYear: 2027,
  document: "2027학년도 수시 모집요강",
  verifiedAt: "2026-09-06",
  confidence: 0.99,
  url: "https://enter.skhu.ac.kr/",
};

const seoultechSource = {
  type: "university" as const,
  academicYear: 2027,
  document: "2027학년도 수시 신입생 모집요강",
  verifiedAt: "2026-09-06",
  confidence: 0.99,
  url: "https://admission.seoultech.ac.kr/",
};

const dongdukSource = {
  type: "university" as const,
  academicYear: 2027,
  document: "2027학년도 수시모집요강",
  verifiedAt: "2026-09-06",
  confidence: 0.99,
  url: "https://ipsi.dongduk.ac.kr/",
};

export const seoulRealNext2027Admissions: Admission[] = [
  // 성공회대학교: 정원내 425 + 정원외 37 = 462
  { id: "success-2027-open-talent", universityId: "success", departmentId: "success-all-2027", academicYear: 2027, name: "열린인재", type: "학종", recruitmentCount: 196, source: successSource, isMock: false, isAggregate: true },
  { id: "success-2027-alternative-school", universityId: "success", departmentId: "success-all-2027", academicYear: 2027, name: "대안학교출신자", type: "학종", recruitmentCount: 15, source: successSource, isMock: false, isAggregate: true },
  { id: "success-2027-gyogwa", universityId: "success", departmentId: "success-all-2027", academicYear: 2027, name: "교과성적", type: "교과", recruitmentCount: 185, source: successSource, isMock: false, isAggregate: true },
  { id: "success-2027-national-merit", universityId: "success", departmentId: "success-all-2027", academicYear: 2027, name: "국가보훈대상자", type: "학종", recruitmentCount: 8, source: successSource, isMock: false, isAggregate: true },
  { id: "success-2027-social-care", universityId: "success", departmentId: "success-all-2027", academicYear: 2027, name: "사회기여자 및 배려대상자", type: "학종", recruitmentCount: 10, source: successSource, isMock: false, isAggregate: true },
  { id: "success-2027-specialized", universityId: "success", departmentId: "success-all-2027", academicYear: 2027, name: "특성화고교 교과성적", type: "교과", recruitmentCount: 11, source: successSource, isMock: false, isAggregate: true },
  { id: "success-2027-opportunity", universityId: "success", departmentId: "success-all-2027", academicYear: 2027, name: "기회균형선발", type: "교과", recruitmentCount: 15, source: successSource, isMock: false, isAggregate: true },
  { id: "success-2027-rural", universityId: "success", departmentId: "success-all-2027", academicYear: 2027, name: "농어촌학생", type: "교과", recruitmentCount: 6, source: successSource, isMock: false, isAggregate: true },
  { id: "success-2027-specialized-out", universityId: "success", departmentId: "success-all-2027", academicYear: 2027, name: "특성화고교졸업자", type: "교과", recruitmentCount: 6, source: successSource, isMock: false, isAggregate: true },
  { id: "success-2027-north-korean", universityId: "success", departmentId: "success-all-2027", academicYear: 2027, name: "북한이탈주민", type: "기타", recruitmentCount: 10, source: successSource, isMock: false, isAggregate: true },

  // 서울과학기술대학교: 수시 1,747
  { id: "seoultech-2027-recommend", universityId: "seoultech", departmentId: "seoultech-all-2027", academicYear: 2027, name: "고교추천", type: "교과", recruitmentCount: 502, studentRecordWeight: 100, source: seoultechSource, isMock: false, isAggregate: true },
  { id: "seoultech-2027-school-record", universityId: "seoultech", departmentId: "seoultech-all-2027", academicYear: 2027, name: "학교생활우수자", type: "학종", recruitmentCount: 496, source: seoultechSource, isMock: false, isAggregate: true },
  { id: "seoultech-2027-convergence", universityId: "seoultech", departmentId: "seoultech-all-2027", academicYear: 2027, name: "창의융합인재", type: "학종", recruitmentCount: 91, source: seoultechSource, isMock: false, isAggregate: true },
  { id: "seoultech-2027-national-merit", universityId: "seoultech", departmentId: "seoultech-all-2027", academicYear: 2027, name: "국가보훈", type: "학종", recruitmentCount: 19, source: seoultechSource, isMock: false, isAggregate: true },
  { id: "seoultech-2027-opportunity", universityId: "seoultech", departmentId: "seoultech-all-2027", academicYear: 2027, name: "기회균등", type: "학종", recruitmentCount: 86, source: seoultechSource, isMock: false, isAggregate: true },
  { id: "seoultech-2027-lifelong", universityId: "seoultech", departmentId: "seoultech-all-2027", academicYear: 2027, name: "평생학습자", type: "학종", recruitmentCount: 72, source: seoultechSource, isMock: false, isAggregate: true },
  { id: "seoultech-2027-rural", universityId: "seoultech", departmentId: "seoultech-all-2027", academicYear: 2027, name: "농어촌학생", type: "학종", recruitmentCount: 68, source: seoultechSource, isMock: false, isAggregate: true },
  { id: "seoultech-2027-employed", universityId: "seoultech", departmentId: "seoultech-all-2027", academicYear: 2027, name: "특성화고졸재직자", type: "교과", recruitmentCount: 168, source: seoultechSource, isMock: false, isAggregate: true },
  { id: "seoultech-2027-special-education", universityId: "seoultech", departmentId: "seoultech-all-2027", academicYear: 2027, name: "특수교육대상자", type: "학종", recruitmentCount: 10, source: seoultechSource, isMock: false, isAggregate: true },
  { id: "seoultech-2027-essay", universityId: "seoultech", departmentId: "seoultech-all-2027", academicYear: 2027, name: "논술", type: "논술", recruitmentCount: 162, source: seoultechSource, isMock: false, isAggregate: true },
  { id: "seoultech-2027-practical", universityId: "seoultech", departmentId: "seoultech-all-2027", academicYear: 2027, name: "실기", type: "기타", recruitmentCount: 73, source: seoultechSource, isMock: false, isAggregate: true },

  // 동덕여자대학교: 정원내 1,102 + 정원외 84 = 1,186
  { id: "dongduk-2027-changui", universityId: "dongduk", departmentId: "dongduk-all-2027", academicYear: 2027, name: "동덕창의리더", type: "학종", recruitmentCount: 255, source: dongdukSource, isMock: false, isAggregate: true },
  { id: "dongduk-2027-opportunity", universityId: "dongduk", departmentId: "dongduk-all-2027", academicYear: 2027, name: "기회균형", type: "학종", recruitmentCount: 12, source: dongdukSource, isMock: false, isAggregate: true },
  { id: "dongduk-2027-gyogwa", universityId: "dongduk", departmentId: "dongduk-all-2027", academicYear: 2027, name: "학생부교과우수자", type: "교과", recruitmentCount: 196, source: dongdukSource, isMock: false, isAggregate: true },
  { id: "dongduk-2027-essay", universityId: "dongduk", departmentId: "dongduk-all-2027", academicYear: 2027, name: "논술우수자", type: "논술", recruitmentCount: 266, source: dongdukSource, isMock: false, isAggregate: true },
  { id: "dongduk-2027-practical", universityId: "dongduk", departmentId: "dongduk-all-2027", academicYear: 2027, name: "실기우수자", type: "기타", recruitmentCount: 361, source: dongdukSource, isMock: false, isAggregate: true },
  { id: "dongduk-2027-special-talent", universityId: "dongduk", departmentId: "dongduk-all-2027", academicYear: 2027, name: "특기자", type: "기타", recruitmentCount: 12, source: dongdukSource, isMock: false, isAggregate: true },
  { id: "dongduk-2027-employed", universityId: "dongduk", departmentId: "dongduk-all-2027", academicYear: 2027, name: "특성화고 등 고졸재직자", type: "학종", recruitmentCount: 84, source: dongdukSource, isMock: false, isAggregate: true },
];
