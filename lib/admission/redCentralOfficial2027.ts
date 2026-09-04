import type { Admission, Department } from "./types";

const source = {
  type: "university" as const,
  academicYear: 2027,
  collectedAt: "2026-09-04",
  verifiedAt: "2026-09-04",
  confidence: 0.99,
  url: "https://admission.cau.ac.kr/file/pdfDown.pdf?ofn=%EC%A4%91%EC%95%99%EB%8C%80%ED%95%99%EA%B5%90_2027%ED%95%99%EB%85%84%EB%8F%84+%EC%88%98%EC%8B%9C%EB%AA%A8%EC%A7%91%EC%9A%94%EA%B0%95%28%EB%8B%A8%EB%A9%B4%29_%EA%B3%B5%EA%B3%A0%EC%9A%A9.pdf&sfn=20260609111455769_c6144e06ef38475d8ce9563f87b7f3b4.pdf",
};

// 중앙대 2027 수시 최종 모집요강의 전형별 공식 총원.
// 모집단위 표의 세부 배정은 기존 redCentralDepartments2027 계층에서 관리하며,
// 이 파일은 공식 합계 검산용 aggregate 행으로만 사용한다.
const rows: [string, string, number, "교과" | "학종" | "논술"][] = [
  ["region-balance", "학생부교과(지역균형)", 508, "교과"],
  ["inquiry", "학생부종합(탐구형인재)", 512, "학종"],
  ["fusion", "학생부종합(융합형인재)", 378, "학종"],
  ["growth", "학생부종합(성장형인재)", 108, "학종"],
  ["essay-general", "논술(일반형)", 403, "논술"],
  ["essay-creative", "논술(창의형)", 86, "논술"],
];

export const redCentralOfficial2027Departments: Department[] = rows.map(([id, name]) => ({
  id: `cau-2027-official-${id}`,
  universityId: "cau",
  name,
  category: "수시공식합계",
}));

export const redCentralOfficial2027Admissions: Admission[] = rows.map(([id, name, recruitmentCount, type]) => ({
  id: `cau-2027-official-${id}-aggregate`,
  universityId: "cau",
  departmentId: `cau-2027-official-${id}`,
  academicYear: 2027,
  name,
  type,
  recruitmentCount,
  source,
  isMock: false,
  isAggregate: true,
}));
