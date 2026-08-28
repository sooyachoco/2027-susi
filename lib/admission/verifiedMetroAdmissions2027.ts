import type { Admission } from "./types";

const source = (url: string) => ({ type: "university" as const, academicYear: 2027, url, confidence: 0.95 });

const admissionsFor = (
  universityId: string,
  departments: string[],
  specs: Array<{ id: string; name: string; type: Admission["type"]; studentRecordWeight?: number; documentWeight?: number; interview?: boolean }>,
  url: string,
): Admission[] => departments.flatMap((department) => specs.map((spec) => ({
  id: `${universityId}-${department}-${spec.id}-2027`,
  universityId,
  departmentId: `${universityId}-${department}`,
  academicYear: 2027,
  name: spec.name,
  type: spec.type,
  ...(spec.studentRecordWeight === undefined ? {} : { studentRecordWeight: spec.studentRecordWeight }),
  ...(spec.documentWeight === undefined ? {} : { documentWeight: spec.documentWeight }),
  ...(spec.interview === undefined ? {} : { interview: spec.interview }),
  csatMinimum: { enabled: false },
  source: source(url),
  isMock: false,
})));

const hanshinDepartments = ["business", "software", "computer", "media"];
const hyupsungDepartments = ["business", "computer", "media", "writing"];
const kangnamDepartments = ["business", "computer", "ai", "social"];

// 2027 최종 수시요강에 공개된 전형 체계를 우선 반영한다.
// 모집인원은 모집단위별 최종 요강 표를 별도 대조한 뒤 추가한다.
export const verifiedMetroAdmissions2027: Admission[] = [
  ...admissionsFor("hanshin", hanshinDepartments, [
    { id: "student-record", name: "학생부우수자", type: "교과", studentRecordWeight: 100 },
    { id: "school-recommend", name: "학교장추천", type: "교과", studentRecordWeight: 100 },
    { id: "cham-injae", name: "참인재", type: "학종", documentWeight: 100 },
    { id: "essay", name: "논술", type: "논술" },
  ], "https://ent.hs.ac.kr/ipsi/pages/?b=B_1_1&bn=22867&m=read&p=17"),

  ...admissionsFor("hyupsung", hyupsungDepartments, [
    { id: "subject-excellence", name: "학생부교과성적우수자", type: "교과", studentRecordWeight: 100 },
    { id: "future-creative", name: "미래창의인재", type: "학종", studentRecordWeight: 50, interview: true },
    { id: "wesley", name: "웨슬리", type: "학종", documentWeight: 100 },
    { id: "creative-convergence-1", name: "창의융합인재Ⅰ", type: "학종", documentWeight: 100 },
    { id: "creative-convergence-2", name: "창의융합인재Ⅱ", type: "학종", documentWeight: 50, interview: true },
  ], "https://iphak.uhs.ac.kr/susi/mojip.do"),

  ...admissionsFor("kangnam", kangnamDepartments, [
    { id: "regional-balance", name: "지역균형", type: "교과", studentRecordWeight: 100 },
    { id: "school-life-1", name: "학교생활우수자1", type: "학종", documentWeight: 100 },
    { id: "school-life-2", name: "학교생활우수자2", type: "학종", documentWeight: 100, interview: true },
    { id: "essay", name: "논술", type: "논술" },
  ], "https://admission.kangnam.ac.kr/iphak/mojib.htm?bbsid=paper&bltn_seq=39537&mode=view&page=1"),
];
