import type { Admission, Department, University } from "../types";

const source = { type: "adiga" as const, url: "https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000121", academicYear: 2027, verifiedAt: "2026-08-27", confidence: 0.9 };

export const seokyeong2027University: University = { id: "seokyeong", name: "서경대학교", region: "서울" };
export const seokyeong2027Departments: Department[] = [
  { id: "seokyeong-business", universityId: "seokyeong", name: "경영학부" },
  { id: "seokyeong-computer", universityId: "seokyeong", name: "소프트웨어학과" },
  { id: "seokyeong-finance", universityId: "seokyeong", name: "금융정보공학과" },
  { id: "seokyeong-culture", universityId: "seokyeong", name: "문화콘텐츠학부" },
  { id: "seokyeong-design", universityId: "seokyeong", name: "디자인학부" },
];
export const seokyeong2027Admissions: Admission[] = [
  { id: "seokyeong-business-gyogwa", universityId: "seokyeong", departmentId: "seokyeong-business", academicYear: 2027, name: "학생부교과", type: "교과", studentRecordWeight: 100, source, isMock: false },
];
