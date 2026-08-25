import type { Admission } from "./types";
import { admissionSources } from "./sources";

/** 아주대학교 2027 수시 공식 자료에서 확인한 경영학과 전형 데이터. */
export const verifiedAjou2027Admissions: Admission[] = [
  {
    id: "a-ajou-business-highschool-2027",
    universityId: "ajou",
    departmentId: "ajou-business",
    academicYear: 2027,
    name: "고교추천전형",
    type: "교과",
    studentRecordWeight: 100,
    source: admissionSources.ajou2027,
    isMock: false,
  },
  {
    id: "a-ajou-business-ace-2027",
    universityId: "ajou",
    departmentId: "ajou-business",
    academicYear: 2027,
    name: "ACE전형",
    type: "학종",
    documentWeight: 70,
    interview: true,
    csatMinimum: { enabled: false },
    source: admissionSources.ajou2027,
    isMock: false,
  },
  {
    id: "a-ajou-business-essay-2027",
    universityId: "ajou",
    departmentId: "ajou-business",
    academicYear: 2027,
    name: "논술우수자전형",
    type: "논술",
    studentRecordWeight: 20,
    source: admissionSources.ajou2027,
    isMock: false,
  },
];
