import type { Admission, Department, University } from "./types";

/** 2027 한국외국어대학교 수시 공식 자료에서 확인한 서울캠퍼스 핵심 모집단위. */
export const verifiedHufs2027Universities: University[] = [
  { id: "hufs-2027", name: "한국외국어대학교", region: "서울" },
];

const names = [
  "경영학부",
  "경제학부",
  "국제통상학과",
  "미디어커뮤니케이션학부",
  "컴퓨터공학부",
  "AI융합대학(서울)",
];

export const verifiedHufs2027Departments: Department[] = names.map((name, i) => ({
  id: `hufs-2027-${i + 1}`,
  universityId: "hufs-2027",
  name,
}));

const source = {
  type: "adiga" as const,
  url: "https://www.adiga.kr/ucp/uvt/uni/univDetail.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000192",
  document: "한국외국어대학교 2027학년도 수시모집요강",
  academicYear: 2027,
  confidence: 0.96,
};

export const verifiedHufs2027Admissions: Admission[] = verifiedHufs2027Departments.flatMap((department) => [
  {
    id: `${department.id}-recommendation`, universityId: "hufs-2027", departmentId: department.id,
    academicYear: 2027, type: "교과" as const, name: "학생부교과(학교장추천전형)", isMock: false, source,
  },
  {
    id: `${department.id}-interview`, universityId: "hufs-2027", departmentId: department.id,
    academicYear: 2027, type: "학종" as const, name: "학생부종합(면접형)", interview: true, isMock: false, source,
  },
  {
    id: `${department.id}-document`, universityId: "hufs-2027", departmentId: department.id,
    academicYear: 2027, type: "학종" as const, name: "학생부종합(서류형)", isMock: false, source,
  },
  {
    id: `${department.id}-essay`, universityId: "hufs-2027", departmentId: department.id,
    academicYear: 2027, type: "논술" as const, name: "논술전형", isMock: false, source,
  },
]);
