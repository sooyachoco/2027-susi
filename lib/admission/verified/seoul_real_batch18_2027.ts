import type { Admission, Department, University } from "../types";

/**
 * 2027학년도 서울대학교 수시모집 검증 데이터
 * - 정원내 수시 전체 2,233명
 * - 지역균형 523명 / 일반전형 1,529명 / 기회균형특별전형(사회통합) 181명
 *
 * 학과별 세부 인원은 최종 수시모집 안내 원문 표를 추가 대조한 뒤 별도 배치에서 확장한다.
 * 현재 배치는 대학 전체 전형 합계만 기록하여 추정 학과별 데이터를 만들지 않는다.
 */

export const seoulRealBatch18Universities: University[] = [
  {
    id: "snu-2027",
    name: "서울대학교",
    region: "서울",
  },
];

export const seoulRealBatch18Departments: Department[] = [
  {
    id: "snu-all-2027",
    universityId: "snu-2027",
    name: "서울대학교 전체",
    category: "전체",
  },
];

const source = {
  type: "university" as const,
  academicYear: 2027,
  document: "2027학년도 대학 신입학생 수시모집 안내",
  verifiedAt: "2026-09-07",
  confidence: 1,
  url: "https://admission.snu.ac.kr/undergraduate/early/guide",
};

export const seoulRealBatch18Admissions: Admission[] = [
  {
    id: "snu-2027-regional",
    universityId: "snu-2027",
    departmentId: "snu-all-2027",
    academicYear: 2027,
    name: "지역균형전형",
    type: "학종",
    recruitmentCount: 523,
    studentRecordWeight: 70,
    interview: true,
    documentWeight: 70,
    csatMinimum: { enabled: true },
    source,
    isAggregate: true,
  },
  {
    id: "snu-2027-general",
    universityId: "snu-2027",
    departmentId: "snu-all-2027",
    academicYear: 2027,
    name: "일반전형",
    type: "학종",
    recruitmentCount: 1529,
    interview: true,
    documentWeight: 100,
    source,
    isAggregate: true,
  },
  {
    id: "snu-2027-social-integration",
    universityId: "snu-2027",
    departmentId: "snu-all-2027",
    academicYear: 2027,
    name: "기회균형특별전형(사회통합)",
    type: "학종",
    recruitmentCount: 181,
    interview: true,
    documentWeight: 60,
    source,
    isAggregate: true,
  },
];
