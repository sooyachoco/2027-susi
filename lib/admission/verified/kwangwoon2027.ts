import type { Admission, Department, University } from "../types";

const source = { type: "adiga" as const, url: "https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000074", academicYear: 2027, verifiedAt: "2026-08-27", confidence: 0.95 };

export const kwangwoon2027University: University = { id: "kwangwoon", name: "광운대학교", region: "서울" };
export const kwangwoon2027Departments: Department[] = [
  { id: "kwangwoon-electronic", universityId: "kwangwoon", name: "전자공학과" },
  { id: "kwangwoon-computer", universityId: "kwangwoon", name: "컴퓨터정보공학부" },
  { id: "kwangwoon-software", universityId: "kwangwoon", name: "소프트웨어학부" },
  { id: "kwangwoon-business", universityId: "kwangwoon", name: "경영학부" },
  { id: "kwangwoon-media", universityId: "kwangwoon", name: "미디어커뮤니케이션학부" },
];
export const kwangwoon2027Admissions: Admission[] = [
  { id: "kwangwoon-business-chambit-myeon", universityId: "kwangwoon", departmentId: "kwangwoon-business", academicYear: 2027, name: "광운참빛인재전형Ⅰ-면접형", type: "학종", documentWeight: 60, interview: true, csatMinimum: { enabled: false }, source, isMock: false },
  { id: "kwangwoon-business-chambit-seoryu", universityId: "kwangwoon", departmentId: "kwangwoon-business", academicYear: 2027, name: "광운참빛인재전형Ⅱ-서류형", type: "학종", documentWeight: 100, interview: false, csatMinimum: { enabled: false }, source, isMock: false },
  { id: "kwangwoon-business-region", universityId: "kwangwoon", departmentId: "kwangwoon-business", academicYear: 2027, name: "학생부교과(지역균형전형)", type: "교과", studentRecordWeight: 100, csatMinimum: { enabled: false }, source, isMock: false },
];
