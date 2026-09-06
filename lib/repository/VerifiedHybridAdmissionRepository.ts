import type { Admission, Department, University } from "@/lib/types";
import { MOCK_ADMISSIONS, MOCK_DEPARTMENTS, MOCK_UNIVERSITIES } from "@/lib/data/mock";
import { verified2027Admissions, verified2027Departments, verified2027Universities } from "@/lib/admission/real2027";
import { verifiedSejong2027Admissions, verifiedSejong2027Departments, verifiedSejong2027Universities } from "@/lib/admission/verifiedSejong2027";
import { verifiedHufs2027Admissions, verifiedHufs2027Departments, verifiedHufs2027Universities } from "@/lib/admission/verifiedHufs2027";
import type { AdmissionRepository } from "./AdmissionRepository";

const METRO_REGIONS = new Set(["서울", "경기", "인천"]);
const withoutUos = <T extends object>(items: T[]) => items.filter((item) => !("universityId" in item) || item.universityId !== "uos");
const verified: Admission[] = [
  ...withoutUos(verified2027Admissions),
  ...verifiedSejong2027Admissions,
  ...verifiedHufs2027Admissions,
].map((a) => ({ ...a }));
const verifiedUniversities: University[] = [
  ...withoutUos(verified2027Universities),
  ...verifiedSejong2027Universities,
  ...verifiedHufs2027Universities,
];
const verifiedDepartments: Department[] = [
  ...withoutUos(verified2027Departments),
  ...verifiedSejong2027Departments,
  ...verifiedHufs2027Departments,
];
const mergedUniversities: University[] = [...MOCK_UNIVERSITIES.filter((m) => !verifiedUniversities.some((r) => r.id === m.id)), ...verifiedUniversities.filter((u, i, a) => a.findIndex((x) => x.id === u.id) === i)];
const metroUniversityIds = new Set(mergedUniversities.filter((u) => METRO_REGIONS.has(u.region ?? "")).map((u) => u.id));
const mergedAdmissions: Admission[] = [...MOCK_ADMISSIONS.filter((m) => metroUniversityIds.has(m.universityId) && !verified.some((r) => r.universityId === m.universityId && r.departmentId === m.departmentId)), ...verified.filter((a) => metroUniversityIds.has(a.universityId))];
const mergedDepartments: Department[] = [...MOCK_DEPARTMENTS.filter((m) => metroUniversityIds.has(m.universityId) && !verifiedDepartments.some((r) => r.id === m.id)), ...verifiedDepartments.filter((d, i, a) => metroUniversityIds.has(d.universityId) && a.findIndex((x) => x.id === d.id) === i)];
export class VerifiedHybridAdmissionRepository implements AdmissionRepository {
  async getUniversities(): Promise<University[]> { return mergedUniversities.filter((u) => METRO_REGIONS.has(u.region ?? "")); }
  async getDepartments(universityId?: string): Promise<Department[]> { return universityId ? mergedDepartments.filter((d) => d.universityId === universityId) : mergedDepartments; }
  async getAdmissions(params?: { academicYear?: number; universityId?: string; departmentId?: string; type?: Admission["type"] }): Promise<Admission[]> { return mergedAdmissions.filter((a) => (!params?.academicYear || a.academicYear === params.academicYear) && (!params?.universityId || a.universityId === params.universityId) && (!params?.departmentId || a.departmentId === params.departmentId) && (!params?.type || a.type === params.type)); }
}
export const admissionRepository: AdmissionRepository = new VerifiedHybridAdmissionRepository();
