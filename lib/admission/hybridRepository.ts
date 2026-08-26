import { departments, universities } from "./mockData";
import { expanded2027Departments, expanded2027Universities } from "./expanded2027";
import { remainingMetro2027Departments, remainingMetro2027Universities } from "./remainingMetro2027";
import { verified2027Admissions } from "./verified2027";
import { verified2027Admissions as verifiedCore2027Admissions, verified2027Departments as verifiedCore2027Departments, verified2027Universities as verifiedCore2027Universities } from "./real2027";
import { verifiedSookmyung2027Admissions, verifiedSookmyung2027Departments, verifiedSookmyung2027Universities } from "./verifiedSookmyung2027";
import { verifiedAjou2027Admissions } from "./verifiedAjou2027";
import { verifiedGyeonggi2027Admissions, verifiedGyeonggi2027Departments, verifiedGyeonggi2027Universities } from "./verifiedGyeonggi2027";
import { verifiedGachonAllFields2027Admissions, verifiedGachonAllFields2027Departments, verifiedGachonAllFields2027Universities } from "./verifiedGachonAllFields2027";
import { verifiedIncheonAllFields2027Admissions, verifiedIncheonAllFields2027Departments, verifiedIncheonAllFields2027Universities } from "./verifiedIncheonAllFields2027";
import { verifiedKwangwoon2027Admissions, verifiedKwangwoon2027Departments, verifiedKwangwoon2027Universities } from "./verifiedKwangwoon2027";
import { verifiedUos2027Admissions, verifiedUos2027Departments, verifiedUos2027Universities } from "./verifiedUos2027";
import { verifiedSeoulTech2027Admissions, verifiedSeoulTech2027Departments, verifiedSeoulTech2027Universities } from "./verifiedSeoulTech2027";
import { verifiedSeoulWomen2027Admissions, verifiedSeoulWomen2027Departments, verifiedSeoulWomen2027Universities } from "./verifiedSeoulWomen2027";
import { verifiedEwha2027Admissions, verifiedEwha2027Departments, verifiedEwha2027Universities } from "./verifiedEwha2027";
import { verifiedKookmin2027Admissions, verifiedKookmin2027Departments, verifiedKookmin2027Universities } from "./verifiedKookmin2027";
import { verifiedMyeongji2027Admissions, verifiedMyeongji2027Departments, verifiedMyeongji2027Universities } from "./verifiedMyeongji2027";
import { verifiedMetroCore2027Admissions, verifiedMetroCore2027Departments, verifiedMetroCore2027Universities } from "./verifiedMetroCore2027";
import { verifiedSoongsil2027Admissions, verifiedSoongsil2027Departments, verifiedSoongsil2027Universities } from "./verifiedSoongsil2027";
import { verifiedDongguk2027Admissions, verifiedDongguk2027Departments, verifiedDongguk2027Universities } from "./verifiedDongguk2027";
import { verifiedChungAng2027Admissions, verifiedChungAng2027Departments, verifiedChungAng2027Universities } from "./verifiedChungAng2027";
import { verifiedSkku2027Admissions, verifiedSkku2027Departments, verifiedSkku2027Universities, verifiedHanyang2027Admissions, verifiedHanyang2027Departments, verifiedHanyang2027Universities } from "./verifiedTopSeoul2027";
import { verifiedSogang2027Admissions, verifiedSogang2027Departments, verifiedSogang2027Universities } from "./verifiedSogang2027";
import { verifiedNextSeoul2027Admissions, verifiedNextSeoul2027Departments, verifiedNextSeoul2027Universities } from "./verifiedNextSeoul2027";
import { verifiedSungshin2027Admissions, verifiedSungshin2027Departments, verifiedSungshin2027Universities } from "./verifiedSungshin2027";
import { verifiedHanyangErica2027Admissions, verifiedHanyangErica2027Departments, verifiedHanyangErica2027Universities } from "./verifiedHanyangErica2027";
import { verifiedKyunghee2027Admissions, verifiedKyunghee2027Departments, verifiedKyunghee2027Universities } from "./verifiedKyunghee2027";
import { verifiedHufs2027Admissions, verifiedHufs2027Departments, verifiedHufs2027Universities } from "./verifiedHufs2027";
import { verifiedSejong2027Admissions, verifiedSejong2027Departments, verifiedSejong2027Universities } from "./verifiedSejong2027";
import { verifiedHongik2027Admissions, verifiedHongik2027Departments, verifiedHongik2027Universities } from "./verifiedHongik2027";
import { verifiedCatholic2027Admissions, verifiedCatholic2027Departments, verifiedCatholic2027Universities } from "./verifiedCatholic2027";
import { verifiedAnyang2027Admissions, verifiedAnyang2027Departments, verifiedAnyang2027Universities } from "./verifiedAnyang2027";
import { isTargetRegion } from "./regionScope";
import type { Admission, AdmissionQuery, AdmissionRepository, Department, University, AdmissionRegion } from "./types";

export class HybridAdmissionRepository implements AdmissionRepository {
  private getVerifiedAdmissions(): Admission[] {
    return dedupeById([
      ...verified2027Admissions, ...verifiedCore2027Admissions, ...verifiedSookmyung2027Admissions, ...verifiedAjou2027Admissions,
      ...verifiedGyeonggi2027Admissions, ...verifiedGachonAllFields2027Admissions, ...verifiedIncheonAllFields2027Admissions,
      ...verifiedKwangwoon2027Admissions, ...verifiedUos2027Admissions, ...verifiedSeoulTech2027Admissions,
      ...verifiedSeoulWomen2027Admissions, ...verifiedEwha2027Admissions, ...verifiedKookmin2027Admissions,
      ...verifiedMyeongji2027Admissions, ...verifiedMetroCore2027Admissions, ...verifiedSoongsil2027Admissions,
      ...verifiedDongguk2027Admissions, ...verifiedChungAng2027Admissions, ...verifiedSkku2027Admissions,
      ...verifiedHanyang2027Admissions, ...verifiedSogang2027Admissions, ...verifiedNextSeoul2027Admissions,
      ...verifiedSungshin2027Admissions, ...verifiedHanyangErica2027Admissions, ...verifiedKyunghee2027Admissions,
      ...verifiedHufs2027Admissions, ...verifiedSejong2027Admissions, ...verifiedHongik2027Admissions,
      ...verifiedCatholic2027Admissions, ...verifiedAnyang2027Admissions,
    ].filter((admission) => admission.academicYear === 2027 && !admission.isMock));
  }

  async getUniversities(region?: AdmissionQuery["region"]): Promise<University[]> {
    const verifiedAdmissions = this.getVerifiedAdmissions();
    const verifiedUniversityIds = new Set(verifiedAdmissions.map((admission) => admission.universityId));
    const all = dedupeById([
      ...universities, ...expanded2027Universities, ...remainingMetro2027Universities,
      ...verifiedCore2027Universities, ...verifiedSookmyung2027Universities, ...verifiedGyeonggi2027Universities, ...verifiedGachonAllFields2027Universities,
      ...verifiedIncheonAllFields2027Universities, ...verifiedKwangwoon2027Universities, ...verifiedUos2027Universities,
      ...verifiedSeoulTech2027Universities, ...verifiedSeoulWomen2027Universities, ...verifiedEwha2027Universities,
      ...verifiedKookmin2027Universities, ...verifiedMyeongji2027Universities, ...verifiedMetroCore2027Universities,
      ...verifiedSoongsil2027Universities, ...verifiedDongguk2027Universities, ...verifiedChungAng2027Universities,
      ...verifiedSkku2027Universities, ...verifiedHanyang2027Universities, ...verifiedSogang2027Universities,
      ...verifiedNextSeoul2027Universities, ...verifiedSungshin2027Universities, ...verifiedHanyangErica2027Universities,
      ...verifiedKyunghee2027Universities, ...verifiedHufs2027Universities, ...verifiedSejong2027Universities, ...verifiedHongik2027Universities,
      ...verifiedCatholic2027Universities, ...verifiedAnyang2027Universities,
    ]);
    const scoped = all.filter((university) => isTargetRegion(university.region) && verifiedUniversityIds.has(university.id));
    const normalized: University[] = scoped.map((university) => ({ id: university.id, name: university.name, region: university.region as AdmissionRegion }));
    const uniqueByName = dedupeUniversityNames(normalized);
    return region ? uniqueByName.filter((university) => university.region === region) : uniqueByName;
  }

  async getDepartments(universityId?: string): Promise<Department[]> {
    const verifiedAdmissions = this.getVerifiedAdmissions();
    const verifiedDepartmentIds = new Set(verifiedAdmissions.map((admission) => admission.departmentId));
    const all = dedupeById([
      ...departments, ...expanded2027Departments, ...remainingMetro2027Departments,
      ...verifiedCore2027Departments, ...verifiedSookmyung2027Departments, ...verifiedGyeonggi2027Departments, ...verifiedGachonAllFields2027Departments,
      ...verifiedIncheonAllFields2027Departments, ...verifiedKwangwoon2027Departments, ...verifiedUos2027Departments,
      ...verifiedSeoulTech2027Departments, ...verifiedSeoulWomen2027Departments, ...verifiedEwha2027Departments,
      ...verifiedKookmin2027Departments, ...verifiedMyeongji2027Departments, ...verifiedMetroCore2027Departments,
      ...verifiedSoongsil2027Departments, ...verifiedDongguk2027Departments, ...verifiedChungAng2027Departments,
      ...verifiedSkku2027Departments, ...verifiedHanyang2027Departments, ...verifiedSogang2027Departments,
      ...verifiedNextSeoul2027Departments, ...verifiedSungshin2027Departments, ...verifiedHanyangErica2027Departments,
      ...verifiedKyunghee2027Departments, ...verifiedHufs2027Departments, ...verifiedSejong2027Departments, ...verifiedHongik2027Departments,
      ...verifiedCatholic2027Departments, ...verifiedAnyang2027Departments,
    ]);
    const verifiedOnly = all.filter((department) => verifiedDepartmentIds.has(department.id));
    return universityId ? verifiedOnly.filter((d) => d.universityId === universityId) : verifiedOnly;
  }

  async getAdmissions(query: AdmissionQuery = {}): Promise<Admission[]> {
    const universitiesInScope = await this.getUniversities(query.region);
    const allowedUniversityIds = new Set(universitiesInScope.map((u) => u.id));
    const all = this.getVerifiedAdmissions();
    return all.filter((a) => allowedUniversityIds.has(a.universityId) && (!query.academicYear || a.academicYear === query.academicYear) && (!query.universityId || a.universityId === query.universityId) && (!query.departmentId || a.departmentId === query.departmentId) && (!query.type || a.type === query.type));
  }
}

function dedupeById<T extends { id: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

function dedupeUniversityNames(items: University[]): University[] {
  const map = new Map<string, University>();
  for (const item of items) {
    const key = normalizeUniversityName(item.name);
    const current = map.get(key);
    if (!current || isVerifiedUniversity(item)) map.set(key, item);
  }
  return [...map.values()];
}

function isVerifiedUniversity(university: University): boolean {
  return /2027|verified|ajou|inha|incheon|dankook|kau|uos|gachon|kwangwoon|ewha|kookmin|myeongji|soongsil|dongguk|cau|skku|hanyang|sogang|hongik|kyunghee|hufs|sookmyung|sejong|catholic|korea|yonsei|snu|anyang/i.test(university.id);
}

function normalizeUniversityName(name: string): string {
  return name.replace(/[\s·•ㆍ\-_/()]/g, "").toLowerCase();
}

export const verifiedAdmissionRepository = new HybridAdmissionRepository();
