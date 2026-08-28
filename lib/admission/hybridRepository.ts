import { departments, universities } from "./mockData";
import { expanded2027Departments, expanded2027Universities } from "./expanded2027";
import { remainingMetro2027Admissions, remainingMetro2027Departments, remainingMetro2027Universities } from "./remainingMetro2027";
import { sungkyul2027Admissions, sungkyul2027Departments } from "./sungkyul2027";
import { uos2027Admissions, uos2027Departments, uos2027Universities } from "./uos2027";
import { skku2027Admissions, skku2027Departments, skku2027Universities } from "./skku2027";
import { hanyang2027Admissions, hanyang2027Departments, hanyang2027Universities } from "./hanyang2027";
import { soongsil2027Admissions, soongsil2027Departments, soongsil2027Universities } from "./soongsil2027";
import { kookmin2027Admissions, kookmin2027Departments, kookmin2027Universities } from "./kookmin2027";
import { isTargetRegion } from "./regionScope";
import type { Admission, AdmissionQuery, AdmissionRepository, Department, University, AdmissionRegion } from "./types";
import type { University as RootUniversity } from "../types";
export class HybridAdmissionRepository implements AdmissionRepository {
  private getVerifiedAdmissions(): Admission[] { return dedupeByKey([...remainingMetro2027Admissions,...sungkyul2027Admissions,...uos2027Admissions,...skku2027Admissions,...hanyang2027Admissions,...soongsil2027Admissions,...kookmin2027Admissions].filter(a=>a.academicYear===2027&&!a.isMock)); }
  async getUniversities(region?: AdmissionRegion): Promise<University[]> { const allowed=new Set(this.getVerifiedAdmissions().map(a=>a.universityId)); const all=dedupeByKey([...universities,...expanded2027Universities,...remainingMetro2027Universities,...uos2027Universities,...skku2027Universities,...hanyang2027Universities,...soongsil2027Universities,...kookmin2027Universities]); const scoped=all.filter(u=>isTargetRegion(u.region)&&allowed.has(u.id)); const map=new Map<string,RootUniversity>(); for(const u of scoped){const key=`${normalize(u.name)}|${u.region}`;if(!map.has(key))map.set(key,{id:u.id,name:u.name,region:u.region});} const result=[...map.values()].filter(u=>!region||u.region===region); return result.map(u=>({id:u.id,name:u.name,region:u.region as AdmissionRegion})); }
  async getDepartments(universityId?: string): Promise<Department[]> { const allowed=new Set(this.getVerifiedAdmissions().map(a=>a.departmentId)); const all=dedupeByKey([...departments,...expanded2027Departments,...remainingMetro2027Departments,...sungkyul2027Departments,...uos2027Departments,...skku2027Departments,...hanyang2027Departments,...soongsil2027Departments,...kookmin2027Departments]); const verifiedOnly=all.filter(d=>allowed.has(d.id)); return universityId?verifiedOnly.filter(d=>d.universityId===universityId):verifiedOnly; }
  async getAdmissions(query: AdmissionQuery = {}): Promise<Admission[]> { const allowed=new Set((await this.getUniversities(query.region)).map(u=>u.id)); return this.getVerifiedAdmissions().filter(a=>allowed.has(a.universityId)&&(!query.academicYear||a.academicYear===query.academicYear)&&(!query.universityId||a.universityId===query.universityId)&&(!query.departmentId||a.departmentId===query.departmentId)&&(!query.type||a.type===query.type)); }
}
export const verifiedAdmissionRepository: AdmissionRepository = new HybridAdmissionRepository();
function normalize(value:string):string{return value.replace(/[\s·•ㆍ\-_/()]/g,"").toLowerCase();}
function dedupeByKey<T extends {id:string}>(items:T[]):T[]{const map=new Map<string,T>();for(const item of items)map.set(item.id,item);return [...map.values()];}
