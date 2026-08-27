import type { Admission, Department, University } from "../types";

const source = { type: "adiga" as const, url: "https://www.adiga.kr/ucp/uvt/uni/univDetail.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000126", academicYear: 2027, verifiedAt: "2026-08-27", confidence: 0.95 };

export const seoulwomen2027University: University = { id: "seoulwomen", name: "서울여자대학교", region: "서울" };

export const seoulwomen2027Departments: Department[] = [
  { id: "seoulwomen-business", universityId: "seoulwomen", name: "경영학과" },
  { id: "seoulwomen-economics", universityId: "seoulwomen", name: "경제학과" },
  { id: "seoulwomen-computer", universityId: "seoulwomen", name: "소프트웨어융합학과" },
  { id: "seoulwomen-media", universityId: "seoulwomen", name: "언론영상학부" },
  { id: "seoulwomen-psychology", universityId: "seoulwomen", name: "교육심리학과" },
];

export const seoulwomen2027Admissions: Admission[] = [
  { id: "seoulwomen-business-gyogwa", universityId: "seoulwomen", departmentId: "seoulwomen-business", academicYear: 2027, name: "학생부교과(교과우수자전형)", type: "교과", studentRecordWeight: 100, csatMinimum: { enabled: true, description: "국어·수학·영어·탐구(1과목) 중 2개 합 7등급 이내" }, source, isMock: false },
  { id: "seoulwomen-business-hakjong-baron", universityId: "seoulwomen", departmentId: "seoulwomen-business", academicYear: 2027, name: "학생부종합(바롬인재서류전형)", type: "학종", documentWeight: 100, interview: false, csatMinimum: { enabled: false }, source, isMock: false },
];
