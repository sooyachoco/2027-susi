import type { Admission, Department } from "./types";
import { admissionSources } from "./sources";

const source = admissionSources.sejong2027;
const noCsat = { enabled: false };
const regionalMinimum = { enabled: true, requiredSubjects: 2, gradeSum: 6, description: "국어·수학·영어·탐구(사회/과학 중 1과목) 중 2개 영역 등급 합 6 이내" };
const aviationMinimum = { enabled: true, requiredSubjects: 3, gradeSum: 10, description: "국어·수학·영어·탐구(사회/과학 중 1과목) 중 3개 영역 등급 합 10 이내" };

/**
 * 2027 세종대 수시 최종 모집요강의 전형별 공식 총 모집인원.
 * 모집단위별 세부 배정이 불명확한 경우 임의 재분배하지 않고 전체 합계로 보존한다.
 */
const counts = [
  ["지역균형", "교과", 398, { studentRecordWeight: 100, csatMinimum: regionalMinimum }],
  ["항공시스템공학 특별전형", "교과", 23, { studentRecordWeight: 100, csatMinimum: aviationMinimum }],
  ["세종인재 전형(면접형)", "학종", 364, { documentWeight: 60, interview: true, csatMinimum: noCsat }],
  ["세종인재 전형(서류형)", "학종", 260, { documentWeight: 100, csatMinimum: noCsat }],
  ["기회균형 전형", "학종", 99, { documentWeight: 100, csatMinimum: noCsat }],
  ["사회기여 및 배려자 전형", "학종", 42, { documentWeight: 100, csatMinimum: noCsat }],
  ["서해5도학생 특별전형", "학종", 3, { documentWeight: 100, csatMinimum: noCsat }],
  ["특성화고교졸 재직자 특별전형", "학종", 120, { documentWeight: 100, csatMinimum: noCsat }],
  ["사이버국방 특별전형", "학종", 16, { documentWeight: 100, csatMinimum: noCsat }],
  ["국방AI융합시스템공학 특별전형", "학종", 32, { documentWeight: 80, interview: true, csatMinimum: noCsat }],
  ["국방AI로봇융합공학 특별전형", "학종", 24, { documentWeight: 80, interview: true, csatMinimum: noCsat }],
  ["논술우수자 전형", "논술", 344, { studentRecordWeight: 20, csatMinimum: { enabled: true, requiredSubjects: 2, gradeSum: 5, description: "인문·자연계열별 지정 영역 중 2개 영역 등급 합 5 이내" } }],
  ["실기우수자 전형", "기타", 119, { csatMinimum: noCsat }],
  ["예체능특기자 전형", "기타", 13, { csatMinimum: noCsat }],
] as const;

export const sejong2027AggregateDepartment: Department = {
  id: "sejong-susi-overall",
  universityId: "sejong",
  name: "2027 수시 전체(전형 합계)",
  category: "전체",
};

export const sejong2027AggregateAdmissions: Admission[] = counts.map(([name, type, recruitmentCount, extra], index) => ({
  id: `sejong-susi-overall-${index + 1}-2027`,
  universityId: "sejong",
  departmentId: sejong2027AggregateDepartment.id,
  academicYear: 2027,
  name,
  type,
  recruitmentCount,
  ...extra,
  source,
  isMock: false,
}));
