import type { Admission, Department, University } from "@/lib/types";
import { MOCK_ADMISSIONS, MOCK_DEPARTMENTS, MOCK_UNIVERSITIES } from "@/lib/data/mock";
import { verified2027Admissions, verified2027Departments, verified2027Universities } from "@/lib/admission/real2027";
import { verifiedHanyang2027Admissions, verifiedHanyang2027Departments, verifiedHanyang2027Universities } from "@/lib/admission/verifiedHanyang2027";
import { expanded2027Admissions, expanded2027Departments, expanded2027Universities } from "@/lib/admission/expanded2027";
import { remainingMetro2027Admissions, remainingMetro2027Departments, remainingMetro2027Universities } from "@/lib/admission/remainingMetro2027";
import type { AdmissionRepository } from "./AdmissionRepository";

const verified: Admission[] = [
  ...verified2027Admissions,
  ...verifiedHanyang2027Admissions,
  ...expanded2027Admissions,
  ...remainingMetro2027Admissions,
].map((a) => ({ ...a }));
const verifiedUniversities: University[] = [
  ...verified2027Universities,
  ...verifiedHanyang2027Universities,
  ...expanded2027Universities,
  ...remainingMetro2027Universities,
];
const verifiedDepartments: Department[] = [
  ...verified2027Departments,
  ...verifiedHanyang2027Departments,
  ...expanded2027Departments,
  ...remainingMetro2027Departments,
];

const mergedAdmissions: Admission[] = [
  ...MOCK_ADMISSIONS.filter((mock) => !verified.some((real) => real.universityId === mock.universityId && real.departmentId === mock.departmentId)),
  ...verified,
];

const mergedUniversities: University[] = [
  ...MOCK_UNIVERSITIES.filter((mock) => !verifiedUniversities.some((real) => real.id === mock.id)),
  ...verifiedUniversities.filter((university, index, all) => all.findIndex((item) => item.id === university.id) === index),
];

const mergedDepartments: Department[] = [
  ...MOCK_DEPARTMENTS.filter((mock) => !verifiedDepartments.some((real) => real.id === mock.id)),
  ...verifiedDepartments.filter((department, index, all) => all.findIndex((item) => item.id === department.id) === index),
];

export class VerifiedHybridAdmissionRepository implements AdmissionRepository {
  async getUniversities(): Promise<University[]> { return mergedUniversities; }
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
