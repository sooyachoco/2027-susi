import type { Admission, Department, University } from "./types";

/** 2027 경희대학교 수시 공식 모집요강에서 확인한 핵심 모집단위. */
export const verifiedKyunghee2027Universities: University[] = [
  { id: "kyunghee-2027", name: "경희대학교", region: "서울" },
];

const names = [
  "경영학과",
  "경제학과",
  "미디어학과",
  "전자공학과",
  "컴퓨터공학과",
  "인공지능학과",
  "소프트웨어융합학과",
  "약학과",
];

export const verifiedKyunghee2027Departments: Department[] = names.map((name, i) => ({
  id: `kyunghee-2027-${i + 1}`,
  universityId: "kyunghee-2027",
  name,
}));

const source = {
  type: "university" as const,
  url: "https://iphak.khu.ac.kr/detail.do?board_seq=17324&categoryid=1",
  document: "2027학년도 경희대학교 수시 모집요강-최종_20260811(공지).pdf",
  academicYear: 2027,
  confidence: 0.98,
};

/**
 * 전형명은 최종 모집요강의 전형 체계를 기준으로 등록한다.
 * 모집인원은 별도 검증 전까지 넣지 않아 숫자 오기입을 방지한다.
 */
export const verifiedKyunghee2027Admissions: Admission[] = verifiedKyunghee2027Departments.flatMap((department) => [
  {
    id: `${department.id}-regional`, universityId: "kyunghee-2027", departmentId: department.id,
    academicYear: 2027, type: "교과" as const, name: "학생부교과(지역균형전형)", isMock: false, source,
  },
  {
    id: `${department.id}-neo`, universityId: "kyunghee-2027", departmentId: department.id,
    academicYear: 2027, type: "학종" as const, name: "학생부종합(네오르네상스전형)", isMock: false, source,
  },
  {
    id: `${department.id}-essay`, universityId: "kyunghee-2027", departmentId: department.id,
    academicYear: 2027, type: "논술" as const, name: "논술우수자전형", isMock: false, source,
  },
]);
