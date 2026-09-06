import type { Admission, Department, University } from "../types";

// 2027학년도 서울권 검증 데이터 - 강서대학교 / 서울교육대학교
// 최종 모집요강 및 대입정보포털에서 확인 가능한 수치만 반영.
export const seoulRealBatch13Universities: University[] = [
  { id: "gangseo-2027", name: "강서대학교", region: "서울" },
  { id: "snue-2027", name: "서울교육대학교", region: "서울" },
];

export const seoulRealBatch13Departments: Department[] = [
  { id: "gangseo-all-2027", universityId: "gangseo-2027", name: "전체모집단위", category: "전체" },
  { id: "snue-elementary-2027", universityId: "snue-2027", name: "초등교육과", category: "교육" },
];

const gangseoSource = {
  type: "university" as const,
  academicYear: 2027,
  document: "2027학년도 수시 신입생 모집요강",
  verifiedAt: "2026-09-07",
  confidence: 0.99,
  url: "https://entrance.gangseo.ac.kr/kcui/mainService",
};

const snueSource = {
  type: "university" as const,
  academicYear: 2027,
  document: "2027학년도 수시모집 신입생 모집요강",
  verifiedAt: "2026-09-07",
  confidence: 0.99,
  url: "https://www.edu.snue.ac.kr/admission/na/ntt/selectNttList.do?bbsId=3068&mi=3366",
};

export const seoulRealBatch13Admissions: Admission[] = [
  // 강서대학교: 정원내 249명, 정원외 17명. 전형별 총 모집인원만 반영.
  { id: "gangseo-2027-general", universityId: "gangseo-2027", departmentId: "gangseo-all-2027", academicYear: 2027, name: "일반학생전형", type: "교과", recruitmentCount: 107, interview: true, studentRecordWeight: 80, csatMinimum: { enabled: true }, source: gangseoSource, isMock: false, isAggregate: true },
  { id: "gangseo-2027-top-grade", universityId: "gangseo-2027", departmentId: "gangseo-all-2027", academicYear: 2027, name: "교과우수자전형", type: "교과", recruitmentCount: 106, interview: true, studentRecordWeight: 80, csatMinimum: { enabled: true }, source: gangseoSource, isMock: false, isAggregate: true },
  { id: "gangseo-2027-social", universityId: "gangseo-2027", departmentId: "gangseo-all-2027", academicYear: 2027, name: "사회통합전형", type: "교과", recruitmentCount: 11, interview: true, studentRecordWeight: 80, csatMinimum: { enabled: true }, source: gangseoSource, isMock: false, isAggregate: true },
  { id: "gangseo-2027-practical", universityId: "gangseo-2027", departmentId: "gangseo-all-2027", academicYear: 2027, name: "실기·실적위주 일반학생전형", type: "기타", recruitmentCount: 23, source: gangseoSource, isMock: false, isAggregate: true },
  { id: "gangseo-2027-practical-social", universityId: "gangseo-2027", departmentId: "gangseo-all-2027", academicYear: 2027, name: "실기·실적위주 사회통합전형", type: "기타", recruitmentCount: 2, source: gangseoSource, isMock: false, isAggregate: true },
  { id: "gangseo-2027-rural", universityId: "gangseo-2027", departmentId: "gangseo-all-2027", academicYear: 2027, name: "농어촌학생전형", type: "교과", recruitmentCount: 5, studentRecordWeight: 80, source: gangseoSource, isMock: false, isAggregate: true },
  { id: "gangseo-2027-opportunity", universityId: "gangseo-2027", departmentId: "gangseo-all-2027", academicYear: 2027, name: "기회균등할당제전형", type: "교과", recruitmentCount: 10, studentRecordWeight: 80, source: gangseoSource, isMock: false, isAggregate: true },
  { id: "gangseo-2027-special-education", universityId: "gangseo-2027", departmentId: "gangseo-all-2027", academicYear: 2027, name: "특수교육대상자전형", type: "교과", recruitmentCount: 2, studentRecordWeight: 80, source: gangseoSource, isMock: false, isAggregate: true },

  // 서울교육대학교: 초등교육과 단일 모집단위. 2027 수시 합계 245명.
  { id: "snue-2027-school-recommend", universityId: "snue-2027", departmentId: "snue-elementary-2027", academicYear: 2027, name: "학교장추천전형", type: "교과", recruitmentCount: 40, studentRecordWeight: 80, interview: true, csatMinimum: { enabled: true }, source: snueSource, isMock: false, isAggregate: false },
  { id: "snue-2027-teaching-personality", universityId: "snue-2027", departmentId: "snue-elementary-2027", academicYear: 2027, name: "교직인성우수자전형", type: "학종", recruitmentCount: 150, documentWeight: 50, interview: true, csatMinimum: { enabled: true }, source: snueSource, isMock: false, isAggregate: false },
  { id: "snue-2027-national-merit", universityId: "snue-2027", departmentId: "snue-elementary-2027", academicYear: 2027, name: "국가보훈대상자전형", type: "학종", recruitmentCount: 5, documentWeight: 50, interview: true, csatMinimum: { enabled: true }, source: snueSource, isMock: false, isAggregate: false },
  { id: "snue-2027-rural", universityId: "snue-2027", departmentId: "snue-elementary-2027", academicYear: 2027, name: "농어촌학생전형", type: "학종", recruitmentCount: 10, documentWeight: 50, interview: true, csatMinimum: { enabled: true }, source: snueSource, isMock: false, isAggregate: false },
  { id: "snue-2027-basic-living", universityId: "snue-2027", departmentId: "snue-elementary-2027", academicYear: 2027, name: "기초생활수급자등전형", type: "학종", recruitmentCount: 19, documentWeight: 50, interview: true, csatMinimum: { enabled: true }, source: snueSource, isMock: false, isAggregate: false },
  { id: "snue-2027-disabled", universityId: "snue-2027", departmentId: "snue-elementary-2027", academicYear: 2027, name: "장애인등대상자전형", type: "학종", recruitmentCount: 11, documentWeight: 50, interview: true, csatMinimum: { enabled: true }, source: snueSource, isMock: false, isAggregate: false },
  { id: "snue-2027-overseas", universityId: "snue-2027", departmentId: "snue-elementary-2027", academicYear: 2027, name: "재외국민특별전형", type: "기타", recruitmentCount: 7, source: snueSource, isMock: false, isAggregate: false },
  { id: "snue-2027-north-korean", universityId: "snue-2027", departmentId: "snue-elementary-2027", academicYear: 2027, name: "북한이탈학생전형", type: "기타", recruitmentCount: 3, source: snueSource, isMock: false, isAggregate: false },
];
