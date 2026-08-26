import type { Admission, Department, University } from "./types";

export const verifiedEwha2027Universities: University[] = [
  { id: "ewha-2027", name: "이화여자대학교", region: "서울" },
];

const names = [
  "국어국문학과", "영어영문학부", "중어중문학과", "사회학과", "심리학과",
  "커뮤니케이션·미디어학부", "정치외교학과", "경제학과", "행정학과",
  "수학과", "통계학과", "물리학과", "화학·나노과학전공", "생명과학과",
  "전자전기공학과", "컴퓨터공학과", "인공지능학과", "화공신소재공학과",
  "환경공학과", "건축학과", "식품영양학과", "간호학부", "약학부",
  "교육학과", "유아교육과", "초등교육과", "특수교육과", "체육과학부",
  "디자인학부", "조형예술학부", "스크랜튼학부", "자유전공학부",
];

export const verifiedEwha2027Departments: Department[] = names.map((name, i) => ({
  id: `ewha-2027-${i + 1}`,
  universityId: "ewha-2027",
  name,
}));

const source = {
  type: "university" as const,
  url: "https://admission.ewha.ac.kr/admission/html/rolling/guide.asp",
  document: "이화여자대학교 2027학년도 수시모집요강",
  academicYear: 2027,
  confidence: 0.98,
};

export const verifiedEwha2027Admissions: Admission[] = verifiedEwha2027Departments.flatMap((department) => [
  {
    id: `${department.id}-eureka`,
    universityId: "ewha-2027",
    departmentId: department.id,
    academicYear: 2027,
    type: "학종" as const,
    name: "미래인재전형-서류형",
    isMock: false,
    source,
  },
  {
    id: `${department.id}-essay`,
    universityId: "ewha-2027",
    departmentId: department.id,
    academicYear: 2027,
    type: "논술" as const,
    name: "논술전형",
    isMock: false,
    source,
  },
]);
