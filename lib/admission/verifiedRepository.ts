import type { AdmissionRepository, AdmissionQuery, Department, University, Admission } from "./types";
import { verified2027Universities, verified2027Departments, verified2027Admissions } from "./real2027";
import { verifiedKyungHee2027Universities, verifiedKyungHee2027Departments, verifiedKyungHee2027Admissions } from "./verifiedKyungHee2027";
import { verifiedSookmyung2027Universities, verifiedSookmyung2027Departments, verifiedSookmyung2027Admissions } from "./verifiedSookmyung2027";

const universities: University[] = [...verified2027Universities, ...verifiedKyungHee2027Universities, ...verifiedSookmyung2027Universities];
const departments: Department[] = [...verified2027Departments, ...verifiedKyungHee2027Departments, ...verifiedSookmyung2027Departments];
const admissions: Admission[] = [...verified2027Admissions, ...verifiedKyungHee2027Admissions, ...verifiedSookmyung2027Admissions];

export class Verified2027Repository implements AdmissionRepository {
  async getUniversities(): Promise<University[]> { return universities; }
  async getDepartments(universityId?: string): Promise<Department[]> {
    return universityId ? departments.filter((d) => d.universityId === universityId) : departments;
  }
  async getAdmissions(query: AdmissionQuery = {}): Promise<Admission[]> {
    return admissions.filter((a) =>
      (!query.academicYear || a.academicYear === query.academicYear) &&
      (!query.universityId || a.universityId === query.universityId) &&
      (!query.departmentId || a.departmentId === query.departmentId) &&
      (!query.type || a.type === query.type)
    );
  }
  async getAdmissionById(id: string): Promise<Admission | undefined> {
    return admissions.find((a) => a.id === id);
  }
}

export const verified2027Repository = new Verified2027Repository();
