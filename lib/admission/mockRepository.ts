import { admissions, departments, universities } from "./mockData";
import { seoulRealBatch2Admissions, seoulRealBatch2Departments, seoulRealBatch2Universities } from "./verified/seoul_real_batch2_2027";
import { seoulRealBatch3Admissions, seoulRealBatch3Departments, seoulRealBatch3Universities } from "./verified/seoul_real_batch3_2027";
import { seoulRealBatch4Admissions, seoulRealBatch4Departments, seoulRealBatch4Universities } from "./verified/seoul_real_batch4_2027";
import { seoulRealBatch5Admissions, seoulRealBatch5Departments, seoulRealBatch5Universities } from "./verified/seoul_real_batch5_2027";
import { seoulRealBatch6Admissions, seoulRealBatch6Departments, seoulRealBatch6Universities } from "./verified/seoul_real_batch6_2027";
import { seoulRealBatch7Admissions, seoulRealBatch7Departments, seoulRealBatch7Universities } from "./verified/seoul_real_batch7_2027";
import type { AdmissionQuery, AdmissionRegion, AdmissionRepository } from "./types";
const TARGET_REGIONS: AdmissionRegion[] = ["서울", "경기", "인천"];
const verifiedUniversities = [...seoulRealBatch2Universities, ...seoulRealBatch3Universities, ...seoulRealBatch4Universities, ...seoulRealBatch5Universities, ...seoulRealBatch6Universities, ...seoulRealBatch7Universities];
const verifiedDepartments = [...seoulRealBatch2Departments, ...seoulRealBatch3Departments, ...seoulRealBatch4Departments, ...seoulRealBatch5Departments, ...seoulRealBatch6Departments, ...seoulRealBatch7Departments];
const verifiedAdmissions = [...seoulRealBatch2Admissions, ...seoulRealBatch3Admissions, ...seoulRealBatch4Admissions, ...seoulRealBatch5Admissions, ...seoulRealBatch6Admissions, ...seoulRealBatch7Admissions];
const uniqueById = <T extends { id: string }>(items: T[]) => Array.from(new Map(items.map((item) => [item.id, item])).values());
export class MockAdmissionRepository implements AdmissionRepository {
  async getUniversities(region?: AdmissionRegion) { const scope = region ? [region] : TARGET_REGIONS; return uniqueById([...universities, ...verifiedUniversities]).filter((u) => scope.includes(u.region)); }
  async getDepartments(universityId?: string) { const all = uniqueById([...departments, ...verifiedDepartments]); return universityId ? all.filter((d) => d.universityId === universityId) : all; }
  async getAdmissions(query: AdmissionQuery = {}) { const scope = query.region ? [query.region] : TARGET_REGIONS; const allAdmissions = uniqueById([...admissions, ...verifiedAdmissions]); const allUniversities = uniqueById([...universities, ...verifiedUniversities]); const allowedUniversityIds = new Set(allUniversities.filter((u) => scope.includes(u.region)).map((u) => u.id)); return allAdmissions.filter((a) => (!query.academicYear || a.academicYear === query.academicYear) && allowedUniversityIds.has(a.universityId) && (!query.universityId || a.universityId === query.universityId) && (!query.departmentId || a.departmentId === query.departmentId) && (!query.type || a.type === query.type)); }
}
export const admissionRepository = new MockAdmissionRepository();
