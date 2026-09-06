import type { Admission, Department, University } from "../types";

// 2027학년도 서울권 검증 데이터 - 경희대학교 서울캠퍼스
// 최종 모집요강 기준으로 서울캠퍼스 자율전공학부부터 학과 단위로 반영.
// 국제캠퍼스(경기) 모집단위는 포함하지 않는다.
export const seoulRealBatch17Universities: University[] = [
  { id: "khu-seoul-2027", name: "경희대학교", region: "서울" },
];

export const seoulRealBatch17Departments: Department[] = [
  { id: "khu-seoul-autonomous-2027", universityId: "khu-seoul-2027", name: "자율전공학부", category: "자율전공" },
];

const source = {
  type: "university" as const,
  academicYear: 2027,
  document: "2027학년도 경희대학교 수시 모집요강_최종_20260811",
  verifiedAt: "2026-09-07",
  confidence: 0.98,
  url: "https://iphak.khu.ac.kr/detail.do?board_seq=17324&categoryid=1",
};

export const seoulRealBatch17Admissions: Admission[] = [
  {
    id: "khu-2027-autonomous-regional",
    universityId: "khu-seoul-2027",
    departmentId: "khu-seoul-autonomous-2027",
    academicYear: 2027,
    name: "학생부교과(지역균형전형)",
    type: "교과",
    recruitmentCount: 54,
    studentRecordWeight: 70,
    csatMinimum: { enabled: true },
    source,
    isMock: false,
    isAggregate: false,
  },
  {
    id: "khu-2027-autonomous-neo",
    universityId: "khu-seoul-2027",
    departmentId: "khu-seoul-autonomous-2027",
    academicYear: 2027,
    name: "학생부종합(네오르네상스전형)",
    type: "학종",
    recruitmentCount: 32,
    interview: true,
    documentWeight: 70,
    source,
    isMock: false,
    isAggregate: false,
  },
  {
    id: "khu-2027-autonomous-opportunity1",
    universityId: "khu-seoul-2027",
    departmentId: "khu-seoul-autonomous-2027",
    academicYear: 2027,
    name: "학생부종합(기회균형전형Ⅰ)",
    type: "학종",
    recruitmentCount: 3,
    documentWeight: 70,
    source,
    isMock: false,
    isAggregate: false,
  },
  {
    id: "khu-2027-autonomous-opportunity2",
    universityId: "khu-seoul-2027",
    departmentId: "khu-seoul-autonomous-2027",
    academicYear: 2027,
    name: "학생부종합(기회균형전형Ⅱ)",
    type: "학종",
    recruitmentCount: 2,
    documentWeight: 70,
    source,
    isMock: false,
    isAggregate: false,
  },
  {
    id: "khu-2027-autonomous-essay",
    universityId: "khu-seoul-2027",
    departmentId: "khu-seoul-autonomous-2027",
    academicYear: 2027,
    name: "논술(논술우수자전형)",
    type: "논술",
    recruitmentCount: 8,
    csatMinimum: { enabled: true },
    source,
    isMock: false,
    isAggregate: false,
  },
];
