import { admissions, departments, universities } from "./mockData";
import { seoulRealNext2027Admissions, seoulRealNext2027Departments, seoulRealNext2027Universities } from "./verified/seoul_real_next2027";
import { seoulRealBatch3Admissions, seoulRealBatch3Departments, seoulRealBatch3Universities } from "./verified/seoul_real_batch3_2027";
import { seoulRealBatch4Admissions, seoulRealBatch4Departments, seoulRealBatch4Universities } from "./verified/seoul_real_batch4_2027";
import { seoulRealBatch5Admissions, seoulRealBatch5Departments, seoulRealBatch5Universities } from "./verified/seoul_real_batch5_2027";
import { seoulRealBatch6Admissions, seoulRealBatch6Departments, seoulRealBatch6Universities } from "./verified/seoul_real_batch6_2027";
import { seoulRealBatch7Admissions, seoulRealBatch7Departments, seoulRealBatch7Universities } from "./verified/seoul_real_batch7_2027";
import { seoulRealBatch8Admissions, seoulRealBatch8Departments, seoulRealBatch8Universities } from "./verified/seoul_real_batch8_2027";
import { seoulRealBatch9Admissions, seoulRealBatch9Departments, seoulRealBatch9Universities } from "./verified/seoul_real_batch9_2027";
import { seoulRealBatch10Admissions, seoulRealBatch10Departments, seoulRealBatch10Universities } from "./verified/seoul_real_batch10_2027";
import { seoulRealBatch11Admissions, seoulRealBatch11Departments, seoulRealBatch11Universities } from "./verified/seoul_real_batch11_2027";
import { seoulRealBatch12Admissions, seoulRealBatch12Departments, seoulRealBatch12Universities } from "./verified/seoul_real_batch12_2027";
import { seoulRealBatch13Admissions, seoulRealBatch13Departments, seoulRealBatch13Universities } from "./verified/seoul_real_batch13_2027";
import { seoulRealBatch14Admissions, seoulRealBatch14Departments, seoulRealBatch14Universities } from "./verified/seoul_real_batch14_2027";
import type { Admission, AdmissionQuery, AdmissionRegion, AdmissionRepository, Department, University } from "./types";

const TARGET_REGIONS: AdmissionRegion[] = ["서울", "경기", "인천", "충남"];
const rawUniversities: University[] = [...universities, ...seoulRealNext2027Universities, ...seoulRealBatch3Universities, ...seoulRealBatch4Universities, ...seoulRealBatch5Universities, ...seoulRealBatch6Universities, ...seoulRealBatch7Universities, ...seoulRealBatch8Universities, ...seoulRealBatch9Universities, ...seoulRealBatch10Universities, ...seoulRealBatch11Universities, ...seoulRealBatch12Universities, ...seoulRealBatch13Universities, ...seoulRealBatch14Universities];
const rawDepartments: Department[] = [...departments, ...seoulRealNext2027Departments, ...seoulRealBatch3Departments, ...seoulRealBatch4Departments, ...seoulRealBatch5Departments, ...seoulRealBatch6Departments, ...seoulRealBatch7Departments, ...seoulRealBatch8Departments, ...seoulRealBatch9Departments, ...seoulRealBatch10Departments, ...seoulRealBatch11Departments, ...seoulRealBatch12Departments, ...seoulRealBatch13Departments, ...seoulRealBatch14Departments];
const rawAdmissions: Admission[] = [...admissions, ...seoulRealNext2027Admissions, ...seoulRealBatch3Admissions, ...seoulRealBatch4Admissions, ...seoulRealBatch5Admissions, ...seoulRealBatch6Admissions, ...seoulRealBatch7Admissions, ...seoulRealBatch8Admissions, ...seoulRealBatch9Admissions, ...seoulRealBatch10Admissions, ...seoulRealBatch11Admissions, ...seoulRealBatch12Admissions, ...seoulRealBatch13Admissions, ...seoulRealBatch14Admissions];

const normalize = (value: string) => value.replace(/\s+/g, "").replace(/[()·,.-]/g, "").toLowerCase();
const canonicalUniversities = Array.from(new Map(rawUniversities.map((u) => [`${normalize(u.name)}|${u.region}`, u])).values());
const universityIdMap = new Map(rawUniversities.map((u) => [u.id, canonicalUniversities.find((c) => normalize(c.name) === normalize(u.name) && c.region === u.region)?.id ?? u.id]));
const canonicalDepartments = Array.from(new Map(rawDepartments.map((d) => { const universityId = universityIdMap.get(d.universityId) ?? d.universityId; return [`${universityId}|${normalize(d.name)}`, { ...d, universityId }]; })).values());
const departmentIdMap = new Map(rawDepartments.map((d) => { const universityId = universityIdMap.get(d.universityId) ?? d.universityId; const canonical = canonicalDepartments.find((c) => c.universityId === universityId && normalize(c.name) === normalize(d.name)); return [d.id, canonical?.id ?? d.id]; }));
const canonicalAdmissions = Array.from(new Map(rawAdmissions.map((a) => { const universityId = universityIdMap.get(a.universityId) ?? a.universityId; const departmentId = departmentIdMap.get(a.departmentId) ?? a.departmentId; return [`${a.academicYear}|${universityId}|${departmentId}|${normalize(a.name)}|${a.type}`, { ...a, universityId, departmentId }]; })).values());

export class MockAdmissionRepository implements AdmissionRepository {
  async getUniversities(region?: AdmissionRegion) {
    const scope = region ? [region] : TARGET_REGIONS;
    return canonicalUniversities.filter((u) => scope.includes(u.region));
  }
  async getDepartments(universityId?: string) {
    const id = universityIdMap.get(universityId ?? "") ?? universityId;
    return id ? canonicalDepartments.filter((d) => d.universityId === id) : canonicalDepartments;
  }
  async getAdmissions(query: AdmissionQuery = {}) {
    const scope = query.region ? [query.region] : TARGET_REGIONS;
    const universityId = query.universityId ? (universityIdMap.get(query.universityId) ?? query.universityId) : undefined;
    const departmentId = query.departmentId ? (departmentIdMap.get(query.departmentId) ?? query.departmentId) : undefined;
    const allowed = new Set(canonicalUniversities.filter((u) => scope.includes(u.region)).map((u) => u.id));
    return canonicalAdmissions.filter((a) => (!query.academicYear || a.academicYear === query.academicYear) && allowed.has(a.universityId) && (!universityId || a.universityId === universityId) && (!departmentId || a.departmentId === departmentId) && (!query.type || a.type === query.type));
  }
  async getAdmissionById(id: string): Promise<Admission | undefined> {
    return canonicalAdmissions.find((a) => a.id === id);
  }
}
export const admissionRepository = new MockAdmissionRepository();
