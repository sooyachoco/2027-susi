import type { Admission, Department, University } from "../types";

const source = { type: "adiga" as const, url: "https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000111", academicYear: 2027, verifiedAt: "2026-08-27", confidence: 0.95 };

export const myongji2027University: University = {
  id: "myongji",
  name: "명지대학교",
  region: "서울",
};

export const myongji2027Departments: Department[] = [
  { id: "myongji-business", universityId: "myongji", name: "경영학과" },
  { id: "myongji-computer", universityId: "myongji", name: "컴퓨터공학과" },
  { id: "myongji-software", universityId: "myongji", name: "융합소프트웨어학부" },
  { id: "myongji-media", universityId: "myongji", name: "디지털미디어학과" },
  { id: "myongji-design", universityId: "myongji", name: "디자인학부" },
];

export const myongji2027Admissions: Admission[] = [
  { id: "myongji-business-gyogwa", universityId: "myongji", departmentId: "myongji-business", academicYear: 2027, name: "학생부교과(학교장추천전형)", type: "교과", studentRecordWeight: 100, csatMinimum: { enabled: false }, source, isMock: false },
  { id: "myongji-business-hakjong-myeongjiin-myeon", universityId: "myongji", departmentId: "myongji-business", academicYear: 2027, name: "학생부종합(명지인재면접전형)", type: "학종", documentWeight: 70, interview: true, source, isMock: false },
  { id: "myongji-business-hakjong-myeongjiin-seoryu", universityId: "myongji", departmentId: "myongji-business", academicYear: 2027, name: "학생부종합(명지인재서류전형)", type: "학종", documentWeight: 100, interview: false, source, isMock: false },
];
