import { departments, universities } from "./mockData";
import { expanded2027Departments, expanded2027Universities } from "./expanded2027";
import { remainingMetro2027Admissions, remainingMetro2027Departments, remainingMetro2027Universities } from "./remainingMetro2027";
import { seoulMid2027Admissions, seoulMid2027Departments, seoulMid2027Universities } from "./seoulMid2027";
import { seoulLower2027Admissions, seoulLower2027Departments, seoulLower2027Universities } from "./seoulLower2027";
import { gangseo2027Admissions, gangseo2027DepartmentsWithAggregate, gangseo2027Universities } from "./gangseo2027";
import { skhu2027Admissions, skhu2027DepartmentsWithAggregate, skhu2027Universities } from "./skhu2027";
import { duksung2027Admissions, duksung2027DepartmentsWithAggregate, duksung2027Universities } from "./duksung2027";
import { seoulwomen2027Admissions, seoulwomen2027Departments, seoulwomen2027DepartmentsWithAggregate, seoulwomen2027Universities } from "./seoulwomen2027";
import { sungkyul2027Admissions, sungkyul2027Departments } from "./sungkyul2027";
import { uos2027Admissions, uos2027Departments, uos2027Universities } from "./uos2027";
import { skku2027Admissions, skku2027Departments, skku2027Universities } from "./skku2027";
import { hanyang2027Admissions, hanyang2027Departments, hanyang2027Universities } from "./hanyang2027";
import { soongsil2027Admissions, soongsil2027Departments, soongsil2027Universities } from "./soongsil2027";
import { kookmin2027Admissions, kookmin2027Departments, kookmin2027Universities } from "./kookmin2027";
import { dankook2027Admissions, dankook2027Departments, dankook2027Universities } from "./dankook2027";
import { verifiedSookmyung2027Admissions, verifiedSookmyung2027Departments, verifiedSookmyung2027Universities } from "./verifiedSookmyung2027";
import { hyupsung2027Admissions, hyupsung2027Departments, hyupsung2027Universities } from "./hyupsung2027";
import { kangnam2027Admissions, kangnam2027Departments, kangnam2027Universities } from "./kangnam2027";
import { yongin2027Admissions, yongin2027Departments, yongin2027Universities } from "./yongin2027";
import { hanshin2027Admissions, hanshin2027DepartmentsWithAggregate, hanshin2027Universities } from "./hanshin2027";
import { seoultech2027Admissions, seoultech2027DepartmentsWithAggregate, seoultech2027Universities } from "./seoultech2027";
import { verifiedSejong2027Admissions, verifiedSejong2027Departments, verifiedSejong2027Universities } from "./verifiedSejong2027";
import { sejong2027AggregateAdmissions, sejong2027AggregateDepartment } from "./sejong2027Aggregate";
import { hongik2027Admissions, hongik2027DepartmentsWithAggregate, hongik2027Universities } from "./hongik2027";
import { myeongji2027Admissions, myeongji2027Departments, myeongji2027Universities } from "./myeongji2027";
import { sungshin2027Admissions, sungshin2027Departments, sungshin2027Universities } from "./sungshin2027";
import { snue2027Admissions, snue2027Departments, snue2027Universities } from "./snue2027";
import { isTargetRegion } from "./regionScope";
import type { Admission, AdmissionQuery, AdmissionRepository, Department, University, AdmissionRegion } from "./types";
import type { University as RootUniversity } from "../types";

export class HybridAdmissionRepository implements AdmissionRepository {
  private getVerifiedAdmissions(): Admission[] {
    return dedupeByKey([
      ...remainingMetro2027Admissions.filter((a) => !["hanshin","seoultech","sejong","hongik","myeongji","sungshin","snue","dongduk","sahmyook","skuniv","gangseo","skhu","duksung","swu"].includes(a.universityId)),
      ...seoulMid2027Admissions, ...seoulLower2027Admissions, ...gangseo2027Admissions, ...skhu2027Admissions, ...duksung2027Admissions, ...seoulwomen2027Admissions,
      ...sungkyul2027Admissions, ...uos2027Admissions, ...skku2027Admissions, ...hanyang2027Admissions, ...soongsil2027Admissions,
      ...kookmin2027Admissions, ...dankook2027Admissions, ...verifiedSookmyung2027Admissions, ...hyupsung2027Admissions, ...kangnam2027Admissions,
      ...yongin2027Admissions, ...hanshin2027Admissions, ...seoultech2027Admissions, ...verifiedSejong2027Admissions, ...sejong2027AggregateAdmissions,
      ...hongik2027Admissions, ...myeongji2027Admissions, ...sungshin2027Admissions, ...snue2027Admissions,
    ].filter((a) => a.academicYear === 2027 && !a.isMock));
  }
  async getUniversities(region?: AdmissionRegion): Promise<University[]> {
    const allowed = new Set(this.getVerifiedAdmissions().map((a) => a.universityId));
    const all = dedupeByKey([...universities, ...expanded2027Universities, ...remainingMetro2027Universities, ...seoulMid2027Universities, ...seoulLower2027Universities, ...gangseo2027Universities, ...skhu2027Universities, ...duksung2027Universities, ...seoulwomen2027Universities,
      ...uos2027Universities, ...skku2027Universities, ...hanyang2027Universities, ...soongsil2027Universities, ...kookmin2027Universities,
      ...dankook2027Universities, ...verifiedSookmyung2027Universities, ...hyupsung2027Universities, ...kangnam2027Universities, ...yongin2027Universities,
      ...hanshin2027Universities, ...seoultech2027Universities, ...verifiedSejong2027Universities, ...hongik2027Universities, ...myeongji2027Universities,
      ...sungshin2027Universities, ...snue2027Universities]);
    const scoped = all.filter((u) => isTargetRegion(u.region) && allowed.has(u.id));
    const map = new Map<string, RootUniversity>(); for (const u of scoped) { const key = `${normalize(u.name)}|${u.region}`; if (!map.has(key)) map.set(key, { id: u.id, name: u.name, region: u.region }); }
    return [...map.values()].filter((u) => !region || u.region === region).map((u) => ({ id: u.id, name: u.name, region: u.region as AdmissionRegion }));
  }
  async getDepartments(universityId?: string): Promise<Department[]> {
    const allowed = new Set(this.getVerifiedAdmissions().map((a) => a.departmentId));
    const all = dedupeByKey([...departments, ...expanded2027Departments, ...remainingMetro2027Departments.filter((d) => !["seoultech","sejong","hongik","myeongji","sungshin","snue","dongduk","sahmyook","skuniv","gangseo","skhu","duksung","swu"].includes(d.universityId)),
      ...seoulMid2027Departments, ...seoulLower2027Departments, ...gangseo2027DepartmentsWithAggregate, ...skhu2027DepartmentsWithAggregate, ...duksung2027DepartmentsWithAggregate, ...seoulwomen2027DepartmentsWithAggregate, ...sungkyul2027Departments, ...uos2027Departments, ...skku2027Departments, ...hanyang2027Departments, ...soongsil2027Departments,
      ...kookmin2027Departments, ...dankook2027Departments, ...verifiedSookmyung2027Departments, ...hyupsung2027Departments, ...kangnam2027Departments,
      ...yongin2027Departments, ...hanshin2027DepartmentsWithAggregate, ...seoultech2027DepartmentsWithAggregate, ...verifiedSejong2027Departments,
      sejong2027AggregateDepartment, ...hongik2027DepartmentsWithAggregate, ...myeongji2027Departments, ...sungshin2027Departments, ...snue2027Departments]);
    const verifiedOnly = all.filter((d) => allowed.has(d.id)); return universityId ? verifiedOnly.filter((d) => d.universityId === universityId) : verifiedOnly;
  }
  async getAdmissions(query: AdmissionQuery = {}): Promise<Admission[]> {
    const allowed = new Set((await this.getUniversities(query.region)).map((u) => u.id));
    return this.getVerifiedAdmissions().filter((a) => allowed.has(a.universityId) && (!query.academicYear || a.academicYear === query.academicYear) && (!query.universityId || a.universityId === query.universityId) && (!query.departmentId || a.departmentId === query.departmentId) && (!query.type || a.type === query.type));
  }
  async getAdmissionById(id: string): Promise<Admission | undefined> { return this.getVerifiedAdmissions().find((a) => a.id === id); }
}
export const verifiedAdmissionRepository: AdmissionRepository = new HybridAdmissionRepository();
function normalize(value: string): string { return value.replace(/[\s·•ㆍ\-_/()]/g, "").toLowerCase(); }
function dedupeByKey<T extends { id: string }>(items: T[]): T[] { const map = new Map<string, T>(); for (const item of items) map.set(item.id, item); return [...map.values()]; }
