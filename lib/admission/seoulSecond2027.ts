import type { Admission, Department, University } from "./types";

const source = (url: string) => ({ type: "university" as const, academicYear: 2027, url, confidence: 0.97 });
type Spec = { id: string; name: string; type: Admission["type"]; count: number; studentRecordWeight?: number; documentWeight?: number; interview?: boolean; csat?: boolean };
const make = (universityId: string, departmentId: string, s: Spec, url: string): Admission => ({ id: `${departmentId}-${s.id}-2027`, universityId, departmentId, academicYear: 2027, name: s.name, type: s.type, recruitmentCount: s.count, studentRecordWeight: s.studentRecordWeight, documentWeight: s.documentWeight, interview: s.interview, csatMinimum: { enabled: s.csat ?? false }, source: source(url), isMock: false });

export const seoulSecond2027Universities: University[] = [
  { id: "konkuk", name: "건국대학교", region: "서울" }, { id: "dongguk", name: "동국대학교", region: "서울" },
  { id: "kwangwoon", name: "광운대학교", region: "서울" }, { id: "sangmyung", name: "상명대학교", region: "서울" },
];

const konkukId = "konkuk-susi-overall";
const konkukUrl = "https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000052";
export const konkukDepartments: Department[] = [{ id: konkukId, universityId: "konkuk", name: "2027 수시 전체(모집단위 합계)", category: "전체" }];
const konkukSpecs: Spec[] = [
  { id: "self", name: "KU자기추천", type: "학종", count: 903, documentWeight: 70, interview: true },
  { id: "special-education", name: "특수교육대상자", type: "학종", count: 20, documentWeight: 70, interview: true },
  { id: "balance", name: "기회균형", type: "학종", count: 79, documentWeight: 70, studentRecordWeight: 30 },
  { id: "special", name: "특성화고교졸업자", type: "학종", count: 22, documentWeight: 100 },
  { id: "worker", name: "특성화고졸재직자", type: "학종", count: 165, documentWeight: 100 },
  { id: "regional", name: "KU지역균형", type: "교과", count: 345, studentRecordWeight: 70, documentWeight: 30 },
];
export const konkukAdmissions = konkukSpecs.map(s => make("konkuk", konkukId, s, konkukUrl));

const donggukId = "dongguk-susi-overall";
const donggukUrl = "https://ipsi.dongguk.edu/upload/file/20260601115911UVEHWG.PDF";
export const donggukDepartments: Department[] = [{ id: donggukId, universityId: "dongguk", name: "2027 수시 전체(모집단위 합계)", category: "전체" }];
const donggukSpecs: Spec[] = [
  { id: "do-dream", name: "Do Dream", type: "학종", count: 655, documentWeight: 70, interview: true }, { id: "buddhist", name: "불교추천인재", type: "학종", count: 108, documentWeight: 70, interview: true },
  { id: "balance", name: "기회균형통합", type: "학종", count: 132, documentWeight: 70, interview: true }, { id: "special-education", name: "특수교육대상자", type: "학종", count: 8, documentWeight: 70, interview: true },
  { id: "worker-doc", name: "특성화고등을졸업한재직자(서류형)", type: "학종", count: 90, documentWeight: 100 }, { id: "worker-interview", name: "특성화고등을졸업한재직자(면접형)", type: "학종", count: 58, documentWeight: 70, interview: true },
  { id: "recommend", name: "학교장추천인재", type: "교과", count: 409, studentRecordWeight: 70, documentWeight: 30 }, { id: "essay", name: "논술", type: "논술", count: 282, csat: true }, { id: "practical", name: "실기/실적", type: "기타", count: 173 },
];
export const donggukAdmissions = donggukSpecs.map(s => make("dongguk", donggukId, s, donggukUrl));

const kwangwoonId = "kwangwoon-susi-overall";
const kwangwoonUrl = "https://iphak.kw.ac.kr/mojib/mojib.php?m_type=SUSI";
export const kwangwoonDepartments: Department[] = [{ id: kwangwoonId, universityId: "kwangwoon", name: "2027 수시 전체(모집단위 합계)", category: "전체" }];
const kwangwoonSpecs: Spec[] = [
  { id: "bright-interview", name: "광운참빛인재전형Ⅰ-면접형", type: "학종", count: 250, documentWeight: 60, interview: true }, { id: "bright-doc", name: "광운참빛인재전형Ⅱ-서류형", type: "학종", count: 221, documentWeight: 100 },
  { id: "software", name: "소프트웨어우수인재전형", type: "학종", count: 72, documentWeight: 60, interview: true }, { id: "rural", name: "농어촌학생전형", type: "학종", count: 39, documentWeight: 100 },
  { id: "special", name: "특성화고졸업자전형", type: "학종", count: 25, documentWeight: 100 }, { id: "worker", name: "특성화고등을졸업한재직자전형", type: "학종", count: 122, documentWeight: 100 },
  { id: "west-sea", name: "서해5도출신자전형", type: "학종", count: 6, documentWeight: 100 }, { id: "regional", name: "지역균형전형", type: "교과", count: 198, studentRecordWeight: 100 },
];
export const kwangwoonAdmissions = kwangwoonSpecs.map(s => make("kwangwoon", kwangwoonId, s, kwangwoonUrl));

const sangmyungId = "sangmyung-susi-overall";
const sangmyungUrl = "https://admission.smu.ac.kr/_seoul/board/bbs.html?bbsid=seoul_notice&ctg_cd=&keyword=&mode=list&page=16&s_state=&skey=";
export const sangmyungDepartments: Department[] = [{ id: sangmyungId, universityId: "sangmyung", name: "2027 수시 전체(모집단위 합계)", category: "전체" }];
const sangmyungSpecs: Spec[] = [
  { id: "talent-general", name: "상명인재전형(인문/자연/예체능 애니메이션)", type: "학종", count: 139, documentWeight: 100 }, { id: "talent-practical", name: "상명인재전형(스포츠건강관리/조형예술)", type: "학종", count: 16, documentWeight: 60, interview: true },
  { id: "balance", name: "기회균형전형", type: "학종", count: 70, documentWeight: 100 }, { id: "special-education", name: "특수교육대상자전형", type: "학종", count: 7, documentWeight: 100 },
  { id: "worker", name: "특성화고졸재직자전형", type: "학종", count: 124, documentWeight: 100 }, { id: "recommend", name: "고교추천전형", type: "교과", count: 349, studentRecordWeight: 100 },
  { id: "west-sea", name: "서해5도학생전형", type: "교과", count: 6, studentRecordWeight: 100 }, { id: "essay", name: "논술전형", type: "논술", count: 98 }, { id: "music", name: "실기전형 음악학부", type: "기타", count: 58 },
];
export const sangmyungAdmissions = sangmyungSpecs.map(s => make("sangmyung", sangmyungId, s, sangmyungUrl));

export const seoulSecond2027Departments: Department[] = [...konkukDepartments, ...donggukDepartments, ...kwangwoonDepartments, ...sangmyungDepartments];
export const seoulSecond2027Admissions: Admission[] = [...konkukAdmissions, ...donggukAdmissions, ...kwangwoonAdmissions, ...sangmyungAdmissions];
