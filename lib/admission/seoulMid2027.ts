import type { Admission, Department, University } from "./types";

const source = (url: string) => ({ type: "university" as const, academicYear: 2027, url, confidence: 0.97 });

type Spec = { id: string; name: string; type: Admission["type"]; count: number; studentRecordWeight?: number; documentWeight?: number; interview?: boolean; csat?: boolean };

const make = (universityId: string, departmentId: string, s: Spec, url: string): Admission => ({
  id: `${departmentId}-${s.id}-2027`, universityId, departmentId, academicYear: 2027, name: s.name, type: s.type,
  recruitmentCount: s.count, studentRecordWeight: s.studentRecordWeight, documentWeight: s.documentWeight,
  interview: s.interview, csatMinimum: { enabled: s.csat ?? false }, source: source(url), isMock: false,
});

export const seoulMid2027Universities: University[] = [
  { id: "duksung", name: "덕성여자대학교", region: "서울" },
  { id: "swu", name: "서울여자대학교", region: "서울" },
  { id: "hansung", name: "한성대학교", region: "서울" },
  { id: "skhu", name: "성공회대학교", region: "서울" },
];

const duksungId = "duksung-susi-overall";
export const duksungMidDepartments: Department[] = [{ id: duksungId, universityId: "duksung", name: "2027 수시 전체(모집단위 합계)", category: "전체" }];
const duksungUrl = "https://www.dwu.ac.kr/notice/view.php?bn=7205";
const duksungSpecs: Spec[] = [
  { id: "recommend", name: "고교추천", type: "교과", count: 145, studentRecordWeight: 100, csat: false },
  { id: "balanced1", name: "기회균형Ⅰ(사회통합)", type: "학종", count: 25, documentWeight: 100 },
  { id: "talent1", name: "덕성인재Ⅰ", type: "학종", count: 115, documentWeight: 100 },
  { id: "talent2", name: "덕성인재Ⅱ", type: "학종", count: 240, documentWeight: 100 },
  { id: "balanced2", name: "기회균형Ⅱ(사회통합)", type: "학종", count: 15, documentWeight: 100 },
  { id: "essay", name: "논술", type: "논술", count: 120 },
  { id: "art", name: "미술실기", type: "기타", count: 71 },
  { id: "special", name: "특성화고교", type: "교과", count: 6, studentRecordWeight: 100 },
  { id: "rural", name: "농어촌학생", type: "학종", count: 37, documentWeight: 100 },
  { id: "basic", name: "기초생활수급자등", type: "학종", count: 20, documentWeight: 100 },
  { id: "disabled", name: "장애인등대상자", type: "학종", count: 5, documentWeight: 100 },
  { id: "worker", name: "기회균형Ⅰ(특성화고 등을 졸업한 재직자)", type: "학종", count: 63, documentWeight: 100 },
];
export const duksungMidAdmissions = duksungSpecs.map(s => make("duksung", duksungId, s, duksungUrl));

const swuId = "swu-susi-overall";
export const swuMidDepartments: Department[] = [{ id: swuId, universityId: "swu", name: "2027 수시 전체(모집단위 합계)", category: "전체" }];
const swuUrl = "https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000126";
const swuSpecs: Spec[] = [
  { id: "barom-doc", name: "바롬인재서류", type: "학종", count: 183, documentWeight: 100 },
  { id: "barom-interview", name: "바롬인재면접", type: "학종", count: 202, documentWeight: 50, interview: true },
  { id: "sw", name: "SW융합인재", type: "학종", count: 33, documentWeight: 50, interview: true },
  { id: "christian", name: "기독교지도자", type: "학종", count: 23, documentWeight: 50, interview: true },
  { id: "social", name: "기회균형(사회통합지원)", type: "학종", count: 61, documentWeight: 100 },
  { id: "rural", name: "기회균형(농어촌학생)", type: "학종", count: 63, documentWeight: 100 },
  { id: "special", name: "기회균형(특성화고교졸업자)", type: "학종", count: 23, documentWeight: 100 },
  { id: "recommend", name: "교과우수자", type: "교과", count: 185, studentRecordWeight: 100, csat: true },
  { id: "sports-subject", name: "교과우수자(체육)", type: "교과", count: 10, studentRecordWeight: 40 },
  { id: "essay", name: "논술우수자", type: "논술", count: 120 },
  { id: "sports", name: "실기우수자(체육)", type: "기타", count: 8 },
  { id: "art", name: "실기우수자(미술)", type: "기타", count: 65 },
  { id: "worker", name: "특성화고 등을 졸업한 재직자", type: "학종", count: 89, documentWeight: 100 },
];
export const swuMidAdmissions = swuSpecs.map(s => make("swu", swuId, s, swuUrl));

const hansungId = "hansung-susi-overall";
export const hansungMidDepartments: Department[] = [{ id: hansungId, universityId: "hansung", name: "2027 수시 전체(모집단위 합계)", category: "전체" }];
const hansungUrl = "https://www.hansung.ac.kr/futureplus/728/subview.do";
const hansungSpecs: Spec[] = [
  { id: "subject", name: "교과우수전형", type: "교과", count: 260, studentRecordWeight: 100, csat: true },
  { id: "regional", name: "지역균형전형", type: "교과", count: 188, studentRecordWeight: 100 },
  { id: "talent", name: "한성인재전형", type: "학종", count: 310, documentWeight: 100 },
  { id: "balanced", name: "고른기회전형", type: "학종", count: 45, documentWeight: 100 },
  { id: "adult", name: "기회균형 성인학습자", type: "학종", count: 20, documentWeight: 100 },
  { id: "practical", name: "실기우수자전형", type: "기타", count: 128 },
  { id: "rural", name: "농어촌학생", type: "교과", count: 58, studentRecordWeight: 100 },
  { id: "special", name: "특성화고교졸업자", type: "교과", count: 21, studentRecordWeight: 100 },
  { id: "worker", name: "특성화고교졸재직자", type: "교과", count: 80, studentRecordWeight: 100 },
];
export const hansungMidAdmissions = hansungSpecs.map(s => make("hansung", hansungId, s, hansungUrl));

const skhuId = "skhu-susi-overall";
export const skhuMidDepartments: Department[] = [{ id: skhuId, universityId: "skhu", name: "2027 수시 전체(모집단위 합계)", category: "전체" }];
const skhuUrl = "https://www.skhu.ac.kr/viewer/enter/6/fileDown1/fileDownload.do";
const skhuSpecs: Spec[] = [
  { id: "open", name: "열린인재", type: "학종", count: 196, documentWeight: 100 },
  { id: "alternative", name: "대안학교 출신자", type: "교과", count: 15, studentRecordWeight: 100 },
  { id: "subject", name: "교과성적", type: "교과", count: 185, studentRecordWeight: 100 },
  { id: "social", name: "사회기여자 및 배려대상자", type: "교과", count: 10, studentRecordWeight: 100 },
  { id: "veteran", name: "국가보훈 대상자", type: "교과", count: 8, studentRecordWeight: 100 },
  { id: "special", name: "특성화고교 교과성적", type: "교과", count: 11, studentRecordWeight: 100 },
  { id: "equal", name: "기회균형 선발", type: "교과", count: 15, studentRecordWeight: 100 },
  { id: "rural", name: "농어촌학생", type: "교과", count: 6, studentRecordWeight: 100 },
  { id: "special-rural", name: "특성화고교 졸업자", type: "교과", count: 6, studentRecordWeight: 100 },
];
export const skhuMidAdmissions = skhuSpecs.map(s => make("skhu", skhuId, s, skhuUrl));

export const seoulMid2027Departments: Department[] = [
  ...duksungMidDepartments, ...swuMidDepartments, ...hansungMidDepartments, ...skhuMidDepartments,
];
export const seoulMid2027Admissions: Admission[] = [
  ...duksungMidAdmissions, ...swuMidAdmissions, ...hansungMidAdmissions, ...skhuMidAdmissions,
];
