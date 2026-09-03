import type { Admission, Department, University } from "./types";

const source = { type: "other" as const, academicYear: 2027, collectedAt: "2026-09-03", verifiedAt: "2026-09-03", confidence: 0.94 };
const defs = [
  ["hansung", "한성대학교", "농어촌학생", "교과", 54, 100, false, "https://www.hansung.ac.kr/futureplus/728/subview.do"],
  ["skuniv", "서경대학교", "기회균형② 농어촌학생", "교과", 50, 100, false, "https://go.skuniv.ac.kr/"],
  ["swu", "서울여자대학교", "기회균형 농어촌학생", "학종", 63, undefined, false, "https://admission.swu.ac.kr/"],
  ["seoultech", "서울과학기술대학교", "기회균형(농어촌학생)", "학종", 64, 70, true, "https://admission.seoultech.ac.kr/"],
  ["skhu", "성공회대학교", "농어촌학생", "교과", 6, 100, false, "https://www.skhu.ac.kr/"],
] as const;
export const seoulSpecial2027Universities: University[] = defs.map(([id, name]) => ({ id, name, region: "서울" }));
export const seoulSpecial2027Departments: Department[] = defs.map(([id, , admission]) => ({ id: `${id}-2027-special-aggregate`, universityId: id, name: `2027 수시 ${admission}(모집단위 합계)`, category: "특별전형" }));
export const seoulSpecial2027Admissions: Admission[] = defs.map(([id, , admission, type, count, recordWeight, interview, url]) => ({
  id: `${id}-2027-${admission.replace(/[^가-힣A-Za-z0-9]/g, "-")}`,
  universityId: id, departmentId: `${id}-2027-special-aggregate`, academicYear: 2027, name: admission, type,
  recruitmentCount: count,
  ...(recordWeight !== undefined ? { studentRecordWeight: recordWeight } : {}),
  ...(interview ? { interview: true } : {}), source: { ...source, url }, isMock: false,
}));
