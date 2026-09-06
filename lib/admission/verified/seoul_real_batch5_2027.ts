import type { Admission, Department, University } from "../types";

export const seoulRealBatch5Universities: University[] = [
  { id: "sogang", name: "서강대학교", region: "서울" },
  { id: "dongguk", name: "동국대학교", region: "서울" },
  { id: "soongsil", name: "숭실대학교", region: "서울" },
  { id: "konkuk", name: "건국대학교", region: "서울" },
  { id: "hongik", name: "홍익대학교", region: "서울" },
];

export const seoulRealBatch5Departments: Department[] = [
  { id: "sogang-aggregate", universityId: "sogang", name: "전체모집단위", category: "전체" },
  { id: "dongguk-aggregate", universityId: "dongguk", name: "전체모집단위", category: "전체" },
  { id: "soongsil-aggregate", universityId: "soongsil", name: "전체모집단위", category: "전체" },
  { id: "konkuk-aggregate", universityId: "konkuk", name: "전체모집단위", category: "전체" },
  { id: "hongik-aggregate", universityId: "hongik", name: "전체모집단위", category: "전체" },
];

const source = (url: string, document: string): Admission["source"] => ({
  type: "university",
  academicYear: 2027,
  url,
  document,
  verifiedAt: "2026-09-06",
  confidence: 0.99,
});

export const seoulRealBatch5Admissions: Admission[] = [
  // 서강대학교: 2027 수시 모집요강 기준 1,044명
  { id: "sogang-2027-region", universityId: "sogang", departmentId: "sogang-aggregate", academicYear: 2027, name: "지역균형", type: "교과", recruitmentCount: 180, studentRecordWeight: 100, csatMinimum: { enabled: true }, source: source("https://admission3.sogang.ac.kr/", "2027학년도 수시모집요강"), isMock: false, isAggregate: true },
  { id: "sogang-2027-general1", universityId: "sogang", departmentId: "sogang-aggregate", academicYear: 2027, name: "학생부종합(일반Ⅰ)", type: "학종", recruitmentCount: 494, documentWeight: 100, csatMinimum: { enabled: false }, source: source("https://admission3.sogang.ac.kr/", "2027학년도 수시모집요강"), isMock: false, isAggregate: true },
  { id: "sogang-2027-general2", universityId: "sogang", departmentId: "sogang-aggregate", academicYear: 2027, name: "학생부종합(일반Ⅱ)", type: "학종", recruitmentCount: 74, documentWeight: 100, csatMinimum: { enabled: false }, source: source("https://admission3.sogang.ac.kr/", "2027학년도 수시모집요강"), isMock: false, isAggregate: true },
  { id: "sogang-2027-opportunity", universityId: "sogang", departmentId: "sogang-aggregate", academicYear: 2027, name: "학생부종합(기회균형)", type: "학종", recruitmentCount: 85, documentWeight: 100, csatMinimum: { enabled: false }, source: source("https://admission3.sogang.ac.kr/", "2027학년도 수시모집요강"), isMock: false, isAggregate: true },
  { id: "sogang-2027-value", universityId: "sogang", departmentId: "sogang-aggregate", academicYear: 2027, name: "학생부종합(서강가치)", type: "학종", recruitmentCount: 34, documentWeight: 100, csatMinimum: { enabled: false }, source: source("https://admission3.sogang.ac.kr/", "2027학년도 수시모집요강"), isMock: false, isAggregate: true },
  { id: "sogang-2027-specialized", universityId: "sogang", departmentId: "sogang-aggregate", academicYear: 2027, name: "학생부종합(특성화고교졸업자)", type: "학종", recruitmentCount: 6, documentWeight: 80, interview: true, csatMinimum: { enabled: false }, source: source("https://admission3.sogang.ac.kr/", "2027학년도 수시모집요강"), isMock: false, isAggregate: true },
  { id: "sogang-2027-essay", universityId: "sogang", departmentId: "sogang-aggregate", academicYear: 2027, name: "논술(일반)", type: "논술", recruitmentCount: 171, csatMinimum: { enabled: true }, source: source("https://admission3.sogang.ac.kr/", "2027학년도 수시모집요강"), isMock: false, isAggregate: true },

  // 동국대학교 서울캠퍼스: 2027 수시 1,915명 중 주요 정원내 전형
  { id: "dongguk-2027-dodream", universityId: "dongguk", departmentId: "dongguk-aggregate", academicYear: 2027, name: "Do Dream", type: "학종", recruitmentCount: 656, interview: true, csatMinimum: { enabled: false }, source: source("https://ipsi.dongguk.edu/admission/html/rolling/guide.asp", "2027학년도 수시모집요강"), isMock: false, isAggregate: true },
  { id: "dongguk-2027-schoolrecommend", universityId: "dongguk", departmentId: "dongguk-aggregate", academicYear: 2027, name: "학교장추천인재", type: "교과", recruitmentCount: 410, studentRecordWeight: 70, csatMinimum: { enabled: false }, source: source("https://ipsi.dongguk.edu/admission/html/rolling/guide.asp", "2027학년도 수시모집요강"), isMock: false, isAggregate: true },
  { id: "dongguk-2027-essay", universityId: "dongguk", departmentId: "dongguk-aggregate", academicYear: 2027, name: "논술", type: "논술", recruitmentCount: 283, source: source("https://ipsi.dongguk.edu/admission/html/rolling/guide.asp", "2027학년도 수시모집요강"), isMock: false, isAggregate: true },
  { id: "dongguk-2027-buddhist", universityId: "dongguk", departmentId: "dongguk-aggregate", academicYear: 2027, name: "불교추천인재", type: "학종", recruitmentCount: 108, interview: true, csatMinimum: { enabled: false }, source: source("https://ipsi.dongguk.edu/admission/html/rolling/guide.asp", "2027학년도 수시모집요강"), isMock: false, isAggregate: true },

  // 숭실대학교: 2027 수시 모집요강 기준
  { id: "soongsil-2027-interview", universityId: "soongsil", departmentId: "soongsil-aggregate", academicYear: 2027, name: "SSU미래인재(면접형)", type: "학종", recruitmentCount: 522, interview: true, documentWeight: 100, csatMinimum: { enabled: false }, source: source("https://admission.ssu.ac.kr/", "2027학년도 수시모집요강"), isMock: false, isAggregate: true },
  { id: "soongsil-2027-document", universityId: "soongsil", departmentId: "soongsil-aggregate", academicYear: 2027, name: "SSU미래인재(서류형)", type: "학종", recruitmentCount: 163, documentWeight: 100, csatMinimum: { enabled: false }, source: source("https://admission.ssu.ac.kr/", "2027학년도 수시모집요강"), isMock: false, isAggregate: true },
  { id: "soongsil-2027-opportunity", universityId: "soongsil", departmentId: "soongsil-aggregate", academicYear: 2027, name: "기회균형", type: "학종", recruitmentCount: 130, csatMinimum: { enabled: false }, source: source("https://admission.ssu.ac.kr/", "2027학년도 수시모집요강"), isMock: false, isAggregate: true },
  { id: "soongsil-2027-sw", universityId: "soongsil", departmentId: "soongsil-aggregate", academicYear: 2027, name: "SW우수자", type: "학종", recruitmentCount: 17, csatMinimum: { enabled: false }, source: source("https://admission.ssu.ac.kr/", "2027학년도 수시모집요강"), isMock: false, isAggregate: true },
  { id: "soongsil-2027-specialedu", universityId: "soongsil", departmentId: "soongsil-aggregate", academicYear: 2027, name: "특수교육대상자", type: "학종", recruitmentCount: 38, csatMinimum: { enabled: false }, source: source("https://admission.ssu.ac.kr/", "2027학년도 수시모집요강"), isMock: false, isAggregate: true },
  { id: "soongsil-2027-gyogwa", universityId: "soongsil", departmentId: "soongsil-aggregate", academicYear: 2027, name: "교과우수자", type: "교과", recruitmentCount: 464, studentRecordWeight: 100, csatMinimum: { enabled: true }, source: source("https://admission.ssu.ac.kr/", "2027학년도 수시모집요강"), isMock: false, isAggregate: true },
  { id: "soongsil-2027-essay", universityId: "soongsil", departmentId: "soongsil-aggregate", academicYear: 2027, name: "논술우수자", type: "논술", recruitmentCount: 248, csatMinimum: { enabled: false }, source: source("https://admission.ssu.ac.kr/", "2027학년도 수시모집요강"), isMock: false, isAggregate: true },

  // 건국대학교 서울캠퍼스: 2027 수시 정원내 주요 전형
  { id: "konkuk-2027-region", universityId: "konkuk", departmentId: "konkuk-aggregate", academicYear: 2027, name: "KU지역균형", type: "교과", recruitmentCount: 345, studentRecordWeight: 70, csatMinimum: { enabled: false }, source: source("https://enter.konkuk.ac.kr/", "2027학년도 수시모집요강"), isMock: false, isAggregate: true },
  { id: "konkuk-2027-self", universityId: "konkuk", departmentId: "konkuk-aggregate", academicYear: 2027, name: "KU자기추천", type: "학종", recruitmentCount: 903, interview: true, documentWeight: 100, csatMinimum: { enabled: false }, source: source("https://enter.konkuk.ac.kr/", "2027학년도 수시모집요강"), isMock: false, isAggregate: true },
  { id: "konkuk-2027-opportunity", universityId: "konkuk", departmentId: "konkuk-aggregate", academicYear: 2027, name: "기회균형", type: "학종", recruitmentCount: 79, csatMinimum: { enabled: false }, source: source("https://enter.konkuk.ac.kr/", "2027학년도 수시모집요강"), isMock: false, isAggregate: true },
  { id: "konkuk-2027-essay", universityId: "konkuk", departmentId: "konkuk-aggregate", academicYear: 2027, name: "KU논술우수자", type: "논술", recruitmentCount: 328, csatMinimum: { enabled: true }, source: source("https://enter.konkuk.ac.kr/", "2027학년도 수시모집요강"), isMock: false, isAggregate: true },

  // 홍익대학교 서울캠퍼스: 2027 수시 확정 모집요강
  { id: "hongik-2027-recommend", universityId: "hongik", departmentId: "hongik-aggregate", academicYear: 2027, name: "학교장추천자", type: "교과", recruitmentCount: 307, studentRecordWeight: 100, csatMinimum: { enabled: true }, source: source("https://admission.hongik.ac.kr/", "2027학년도 수시모집요강"), isMock: false, isAggregate: true },
  { id: "hongik-2027-schoolrecord", universityId: "hongik", departmentId: "hongik-aggregate", academicYear: 2027, name: "학교생활우수자", type: "학종", recruitmentCount: 467, documentWeight: 100, csatMinimum: { enabled: true }, source: source("https://admission.hongik.ac.kr/", "2027학년도 수시모집요강"), isMock: false, isAggregate: true },
  { id: "hongik-2027-essay", universityId: "hongik", departmentId: "hongik-aggregate", academicYear: 2027, name: "논술", type: "논술", recruitmentCount: 384, csatMinimum: { enabled: true }, source: source("https://admission.hongik.ac.kr/", "2027학년도 수시모집요강"), isMock: false, isAggregate: true },
  { id: "hongik-2027-art", universityId: "hongik", departmentId: "hongik-aggregate", academicYear: 2027, name: "미술우수자", type: "기타", recruitmentCount: 289, source: source("https://admission.hongik.ac.kr/", "2027학년도 수시모집요강"), isMock: false, isAggregate: true },
  { id: "hongik-2027-performance", universityId: "hongik", departmentId: "hongik-aggregate", academicYear: 2027, name: "공연예술우수자", type: "기타", recruitmentCount: 48, source: source("https://admission.hongik.ac.kr/", "2027학년도 수시모집요강"), isMock: false, isAggregate: true },
  { id: "hongik-2027-opportunity1", universityId: "hongik", departmentId: "hongik-aggregate", academicYear: 2027, name: "고른기회Ⅰ", type: "학종", recruitmentCount: 15, source: source("https://admission.hongik.ac.kr/", "2027학년도 수시모집요강"), isMock: false, isAggregate: true },
  { id: "hongik-2027-opportunity2", universityId: "hongik", departmentId: "hongik-aggregate", academicYear: 2027, name: "고른기회Ⅱ", type: "학종", recruitmentCount: 10, source: source("https://admission.hongik.ac.kr/", "2027학년도 수시모집요강"), isMock: false, isAggregate: true },
  { id: "hongik-2027-basic", universityId: "hongik", departmentId: "hongik-aggregate", academicYear: 2027, name: "기초생활수급자·차상위계층", type: "학종", recruitmentCount: 30, source: source("https://admission.hongik.ac.kr/", "2027학년도 수시모집요강"), isMock: false, isAggregate: true },
  { id: "hongik-2027-rural", universityId: "hongik", departmentId: "hongik-aggregate", academicYear: 2027, name: "농어촌학생(인문·자연·예술학과)", type: "학종", recruitmentCount: 37, source: source("https://admission.hongik.ac.kr/", "2027학년도 수시모집요강"), isMock: false, isAggregate: true },
  { id: "hongik-2027-rural-art", universityId: "hongik", departmentId: "hongik-aggregate", academicYear: 2027, name: "농어촌학생(미술계열)", type: "기타", recruitmentCount: 11, source: source("https://admission.hongik.ac.kr/", "2027학년도 수시모집요강"), isMock: false, isAggregate: true },
  { id: "hongik-2027-worker-in", universityId: "hongik", departmentId: "hongik-aggregate", academicYear: 2027, name: "특성화고등을졸업한재직자(정원내)", type: "학종", recruitmentCount: 3, source: source("https://admission.hongik.ac.kr/", "2027학년도 수시모집요강"), isMock: false, isAggregate: true },
  { id: "hongik-2027-worker-out", universityId: "hongik", departmentId: "hongik-aggregate", academicYear: 2027, name: "특성화고등을졸업한재직자(정원외)", type: "학종", recruitmentCount: 182, source: source("https://admission.hongik.ac.kr/", "2027학년도 수시모집요강"), isMock: false, isAggregate: true },
];
