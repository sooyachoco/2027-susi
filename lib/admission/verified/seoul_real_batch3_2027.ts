import type { Admission, Department, University } from "../types";

export const seoulRealBatch3Universities: University[] = [
  { id: "kookmin", name: "국민대학교", region: "서울" },
  { id: "sejong", name: "세종대학교", region: "서울" },
  { id: "myongji", name: "명지대학교", region: "서울" },
];

export const seoulRealBatch3Departments: Department[] = [
  { id: "kookmin-all-2027", universityId: "kookmin", name: "전체모집단위", category: "전체" },
  { id: "sejong-all-2027", universityId: "sejong", name: "전체모집단위", category: "전체" },
  { id: "myongji-all-2027", universityId: "myongji", name: "전체모집단위", category: "전체" },
];

const kookminSource = {
  type: "university" as const,
  academicYear: 2027,
  document: "2027학년도 수시모집 모집요강 / 학생부위주전형가이드북",
  verifiedAt: "2026-09-06",
  confidence: 0.99,
  url: "https://admission.kookmin.ac.kr/",
};

const sejongSource = {
  type: "university" as const,
  academicYear: 2027,
  document: "2027학년도 수시모집 모집요강",
  verifiedAt: "2026-09-06",
  confidence: 0.99,
  url: "https://ipsi.sejong.ac.kr/ipsi/index.do",
};

const myongjiSource = {
  type: "university" as const,
  academicYear: 2027,
  document: "2027학년도 신입학 수시 모집요강(수정)",
  verifiedAt: "2026-09-06",
  confidence: 0.99,
  url: "https://iphak.mju.ac.kr/",
};

export const seoulRealBatch3Admissions: Admission[] = [
  { id: "kookmin-2027-gyogwa", universityId: "kookmin", departmentId: "kookmin-all-2027", academicYear: 2027, name: "교과우수자(학교장추천)", type: "교과", recruitmentCount: 586, studentRecordWeight: 100, source: kookminSource, isMock: false, isAggregate: true },
  { id: "kookmin-2027-frontier", universityId: "kookmin", departmentId: "kookmin-all-2027", academicYear: 2027, name: "국민프런티어", type: "학종", recruitmentCount: 724, source: kookminSource, isMock: false, isAggregate: true },
  { id: "kookmin-2027-international", universityId: "kookmin", departmentId: "kookmin-all-2027", academicYear: 2027, name: "국제인재", type: "학종", recruitmentCount: 15, source: kookminSource, isMock: false, isAggregate: true },
  { id: "kookmin-2027-algorithm", universityId: "kookmin", departmentId: "kookmin-all-2027", academicYear: 2027, name: "알고리즘우수자", type: "학종", recruitmentCount: 10, source: kookminSource, isMock: false, isAggregate: true },
  { id: "kookmin-2027-opportunity", universityId: "kookmin", departmentId: "kookmin-all-2027", academicYear: 2027, name: "기회균형Ⅰ", type: "학종", recruitmentCount: 122, source: kookminSource, isMock: false, isAggregate: true },
  { id: "kookmin-2027-adult", universityId: "kookmin", departmentId: "kookmin-all-2027", academicYear: 2027, name: "성인학습자", type: "학종", recruitmentCount: 20, source: kookminSource, isMock: false, isAggregate: true },
  { id: "kookmin-2027-essay", universityId: "kookmin", departmentId: "kookmin-all-2027", academicYear: 2027, name: "논술", type: "논술", recruitmentCount: 205, source: kookminSource, isMock: false, isAggregate: true },
  { id: "kookmin-2027-practical", universityId: "kookmin", departmentId: "kookmin-all-2027", academicYear: 2027, name: "실기/실적", type: "기타", recruitmentCount: 108, source: kookminSource, isMock: false, isAggregate: true },
  { id: "kookmin-2027-total", universityId: "kookmin", departmentId: "kookmin-all-2027", academicYear: 2027, name: "수시 정원내 합계", type: "기타", recruitmentCount: 1796, source: kookminSource, isMock: false, isAggregate: true },

  { id: "sejong-2027-region", universityId: "sejong", departmentId: "sejong-all-2027", academicYear: 2027, name: "학생부교과(지역균형)", type: "교과", recruitmentCount: 398, studentRecordWeight: 100, source: sejongSource, isMock: false, isAggregate: true },
  { id: "sejong-2027-hakjong-interview", universityId: "sejong", departmentId: "sejong-all-2027", academicYear: 2027, name: "세종인재(면접형)", type: "학종", recruitmentCount: 364, interview: true, source: sejongSource, isMock: false, isAggregate: true },
  { id: "sejong-2027-hakjong-document", universityId: "sejong", departmentId: "sejong-all-2027", academicYear: 2027, name: "세종인재(서류형)", type: "학종", recruitmentCount: 260, source: sejongSource, isMock: false, isAggregate: true },
  { id: "sejong-2027-opportunity", universityId: "sejong", departmentId: "sejong-all-2027", academicYear: 2027, name: "기회균형", type: "학종", recruitmentCount: 99, source: sejongSource, isMock: false, isAggregate: true },
  { id: "sejong-2027-social", universityId: "sejong", departmentId: "sejong-all-2027", academicYear: 2027, name: "사회기여 및 배려자", type: "학종", recruitmentCount: 42, source: sejongSource, isMock: false, isAggregate: true },
  { id: "sejong-2027-seohae5", universityId: "sejong", departmentId: "sejong-all-2027", academicYear: 2027, name: "서해5도 학생", type: "학종", recruitmentCount: 3, source: sejongSource, isMock: false, isAggregate: true },
  { id: "sejong-2027-employed", universityId: "sejong", departmentId: "sejong-all-2027", academicYear: 2027, name: "특성화고교졸 재직자", type: "학종", recruitmentCount: 120, source: sejongSource, isMock: false, isAggregate: true },
  { id: "sejong-2027-cyber", universityId: "sejong", departmentId: "sejong-all-2027", academicYear: 2027, name: "사이버국방", type: "기타", recruitmentCount: 16, source: sejongSource, isMock: false, isAggregate: true },
  { id: "sejong-2027-naval", universityId: "sejong", departmentId: "sejong-all-2027", academicYear: 2027, name: "국방AI융합시스템공학", type: "기타", recruitmentCount: 32, source: sejongSource, isMock: false, isAggregate: true },
  { id: "sejong-2027-marine", universityId: "sejong", departmentId: "sejong-all-2027", academicYear: 2027, name: "국방AI로봇융합공학", type: "기타", recruitmentCount: 24, source: sejongSource, isMock: false, isAggregate: true },
  { id: "sejong-2027-essay", universityId: "sejong", departmentId: "sejong-all-2027", academicYear: 2027, name: "논술우수자", type: "논술", recruitmentCount: 120, source: sejongSource, isMock: false, isAggregate: true },
  { id: "sejong-2027-practical", universityId: "sejong", departmentId: "sejong-all-2027", academicYear: 2027, name: "실기/실적", type: "기타", recruitmentCount: 127, source: sejongSource, isMock: false, isAggregate: true },
  { id: "sejong-2027-total", universityId: "sejong", departmentId: "sejong-all-2027", academicYear: 2027, name: "수시 합계", type: "기타", recruitmentCount: 1381, source: sejongSource, isMock: false, isAggregate: true },

  { id: "myongji-2027-school", universityId: "myongji", departmentId: "myongji-all-2027", academicYear: 2027, name: "학교장추천", type: "교과", recruitmentCount: 299, studentRecordWeight: 100, source: myongjiSource, isMock: false, isAggregate: true },
  { id: "myongji-2027-interview-gyogwa", universityId: "myongji", departmentId: "myongji-all-2027", academicYear: 2027, name: "교과면접", type: "교과", recruitmentCount: 269, source: myongjiSource, isMock: false, isAggregate: true },
  { id: "myongji-2027-opportunity", universityId: "myongji", departmentId: "myongji-all-2027", academicYear: 2027, name: "기회균형", type: "교과", recruitmentCount: 60, source: myongjiSource, isMock: false, isAggregate: true },
  { id: "myongji-2027-specialized", universityId: "myongji", departmentId: "myongji-all-2027", academicYear: 2027, name: "특성화고교", type: "교과", recruitmentCount: 37, source: myongjiSource, isMock: false, isAggregate: true },
  { id: "myongji-2027-adult", universityId: "myongji", departmentId: "myongji-all-2027", academicYear: 2027, name: "만학도고등졸", type: "교과", recruitmentCount: 25, source: myongjiSource, isMock: false, isAggregate: true },
  { id: "myongji-2027-employed", universityId: "myongji", departmentId: "myongji-all-2027", academicYear: 2027, name: "특성화고등졸재직자", type: "교과", recruitmentCount: 147, source: myongjiSource, isMock: false, isAggregate: true },
  { id: "myongji-2027-special-education", universityId: "myongji", departmentId: "myongji-all-2027", academicYear: 2027, name: "특수교육대상자", type: "교과", recruitmentCount: 50, source: myongjiSource, isMock: false, isAggregate: true },
  { id: "myongji-2027-frontier-interview", universityId: "myongji", departmentId: "myongji-all-2027", academicYear: 2027, name: "명지인재면접", type: "학종", recruitmentCount: 379, interview: true, source: myongjiSource, isMock: false, isAggregate: true },
  { id: "myongji-2027-frontier-document", universityId: "myongji", departmentId: "myongji-all-2027", academicYear: 2027, name: "명지인재서류", type: "학종", recruitmentCount: 361, source: myongjiSource, isMock: false, isAggregate: true },
  { id: "myongji-2027-christian", universityId: "myongji", departmentId: "myongji-all-2027", academicYear: 2027, name: "크리스천리더", type: "학종", recruitmentCount: 52, source: myongjiSource, isMock: false, isAggregate: true },
  { id: "myongji-2027-social", universityId: "myongji", departmentId: "myongji-all-2027", academicYear: 2027, name: "사회적배려대상자", type: "학종", recruitmentCount: 35, source: myongjiSource, isMock: false, isAggregate: true },
  { id: "myongji-2027-rural", universityId: "myongji", departmentId: "myongji-all-2027", academicYear: 2027, name: "농어촌학생", type: "학종", recruitmentCount: 93, source: myongjiSource, isMock: false, isAggregate: true },
  { id: "myongji-2027-practical", universityId: "myongji", departmentId: "myongji-all-2027", academicYear: 2027, name: "실기우수자", type: "기타", recruitmentCount: 139, source: myongjiSource, isMock: false, isAggregate: true },
  { id: "myongji-2027-special-talent", universityId: "myongji", departmentId: "myongji-all-2027", academicYear: 2027, name: "특기자", type: "기타", recruitmentCount: 31, source: myongjiSource, isMock: false, isAggregate: true },
  { id: "myongji-2027-domestic-total", universityId: "myongji", departmentId: "myongji-all-2027", academicYear: 2027, name: "국내 수시 합계(재외국민 제외)", type: "기타", recruitmentCount: 1977, source: myongjiSource, isMock: false, isAggregate: true },
];
