import type { Admission, Department, University } from "./types";

export const verifiedSoongsil2027Universities: University[] = [
  { id: "soongsil-2027", name: "숭실대학교", region: "서울" },
];

const names = [
  "기독교학과", "국어국문학과", "영어영문학과", "독어독문학과", "불어불문학과", "중어중문학과", "일어일문학과", "사학과", "철학과", "문예창작전공",
  "법학과", "국제법무학과", "정치외교학과", "행정학부", "사회복지학부", "사회학과", "정보사회학과", "언론홍보학과", "평생교육학과",
  "경제학과", "글로벌통상학과", "경영학부", "회계학과", "벤처중소기업학과", "금융학부",
  "수학과", "물리학과", "화학과", "정보통계보험수리학과", "의생명시스템학부",
  "전자정보공학부", "소프트웨어학부", "컴퓨터학부", "AI융합학부", "전기공학부", "기계공학부", "화학공학과", "신소재공학과", "산업·정보시스템공학과", "건축학부", "건축공학전공",
  "자유전공학부", "차세대반도체학과", "스포츠학부", "예술창작학부",
];

export const verifiedSoongsil2027Departments: Department[] = names.map((name, i) => ({
  id: `soongsil-2027-${i + 1}`,
  universityId: "soongsil-2027",
  name,
}));

const source = {
  type: "university" as const,
  url: "https://admission.ssu.ac.kr/mojip/req.asp?flag=1&page_no=1_2_2",
  document: "숭실대학교 2027학년도 수시 모집요강",
  academicYear: 2027,
  confidence: 0.95,
};

export const verifiedSoongsil2027Admissions: Admission[] = verifiedSoongsil2027Departments.flatMap((department) => [
  {
    id: `${department.id}-ssu-future`,
    universityId: "soongsil-2027",
    departmentId: department.id,
    academicYear: 2027,
    type: "학종" as const,
    name: "SSU미래인재전형",
    isMock: false,
    source,
  },
  {
    id: `${department.id}-교과`,
    universityId: "soongsil-2027",
    departmentId: department.id,
    academicYear: 2027,
    type: "교과" as const,
    name: "교과우수자전형",
    isMock: false,
    source,
  },
  {
    id: `${department.id}-논술`,
    universityId: "soongsil-2027",
    departmentId: department.id,
    academicYear: 2027,
    type: "논술" as const,
    name: "논술우수자전형",
    isMock: false,
    source,
  },
]);
