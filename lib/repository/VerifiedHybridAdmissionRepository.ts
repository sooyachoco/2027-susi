import type { Admission, Department, University } from "@/lib/types";
import { MOCK_ADMISSIONS, MOCK_DEPARTMENTS, MOCK_UNIVERSITIES } from "@/lib/data/mock";
import { verified2027Admissions, verified2027Departments, verified2027Universities } from "@/lib/admission/real2027";
import { verifiedHanyang2027Admissions, verifiedHanyang2027Departments, verifiedHanyang2027Universities } from "@/lib/admission/verifiedHanyang2027";
import { verifiedMetroTop2027Admissions, verifiedMetroTop2027Departments, verifiedMetroTop2027Universities } from "@/lib/admission/verifiedMetroTop2027";
import { expanded2027Admissions, expanded2027Departments, expanded2027Universities } from "@/lib/admission/expanded2027";
import { remainingMetro2027Admissions, remainingMetro2027Departments, remainingMetro2027Universities } from "@/lib/admission/remainingMetro2027";
import { capital2027Admissions, capital2027Departments, capital2027Universities } from "@/lib/admission/capital2027";
import type { AdmissionRepository } from "./AdmissionRepository";

const METRO_REGIONS = new Set(["서울", "경기", "인천"]);

const verified: Admission[] = [
  ...verified2027Admissions,
  ...verifiedHanyang2027Admissions,
  ...verifiedMetroTop2027Admissions,
  ...expanded2027Admissions,
  ...remainingMetro2027Admissions,
  ...capital2027Admissions,
].map((a) => ({ ...a }));
const verifiedUniversities: University[] = [
  ...verified2027Universities,
  ...verifiedHanyang2027Universities,
  ...verifiedMetroTop2027Universities,
  ...expanded2027Universities,
  ...remainingMetro2027Universities,
  ...capital2027Universities,
];
const verifiedDepartments: Department[] = [
  ...verified2027Departments,
  ...verifiedHanyang2027Departments,
  ...verifiedMetroTop2027Departments,
  ...expanded2027Departments,
  ...remainingMetro2027Departments,
  ...capital2027Departments,
];

const mergedUniversities: University[] = [
  ...MOCK_UNIVERSITIES.filter((mock) => !verifiedUniversities.some((real) => real.id === mock.id)),
  ...verifiedUniversities.filter((university, index, all) => all.findIndex((item) => item.id === university.id) === index),
];

// 서비스의 추천/검색 범위는 현재 단계에서 서울·경기·인천 대학에 집중한다.
const metroUniversityIds = new Set(
  mergedUniversities
    .filter((university) => METRO_REGIONS.has(university.region ?? ""))
    .map((university) => university.id),
);

const mergedAdmissions: Admission[] = [
  ...MOCK_ADMISSIONS.filter((mock) =>
    metroUniversityIds.has(mock.universityId) &&
    !verified.some((real) => real.universityId === mock.universityId && real.departmentId === mock.departmentId),
  ),
  ...verified.filter((admission) => metroUniversityIds.has(admission.universityId)),
];

const mergedDepartments: Department[] = [
  ...MOCK_DEPARTMENTS.filter((mock) => metroUniversityIds.has(mock.universityId) && !verifiedDepartments.some((real) => real.id === mock.id)),
  ...verifiedDepartments.filter((department, index, all) =>
    metroUniversityIds.has(department.universityId) &&
    all.findIndex((item) => item.id === department.id) === index,
  ),
];

export class VerifiedHybridAdmissionRepository implements AdmissionRepository {
  async getUniversities(): Promise<University[]> {
    return mergedUniversities.filter((university) => METRO_REGIONS.has(university.region ?? ""));
  }
  async getDepartments(universityId?: string): Promise<Department[]> {
    return universityId ? mergedDepartments.filter((d) => d.universityId === universityId) : mergedDepartments;
  }
  async getAdmissions(params?: { academicYear?: number; universityId?: string; departmentId?: string; type?: Admission["type"] }): Promise<Admission[]> {
    return mergedAdmissions.filter((a) => {
      if (params?.academicYear && a.academicYear !== params.academicYear) return false;
      if (params?.universityId && a.universityId !== params.universityId) return false;
      if (params?.departmentId && a.departmentId !== params.departmentId) return false;
      if (params?.type && a.type !== params.type) return false;
      return true;
    });
  }
}

export const admissionRepository: AdmissionRepository = new VerifiedHybridAdmissionRepository();
