import { departments, universities } from "./mockData";
import { expanded2027Departments, expanded2027Universities } from "./expanded2027";
import { verified2027Admissions } from "./verified2027";
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
import { isTargetRegion } from "./regionScope";
import type { Admission, AdmissionQuery, AdmissionRepository, Department, University } from "./types";

export class HybridAdmissionRepository implements AdmissionRepository {
  async getUniversities(region?: AdmissionQuery["region"]): Promise<University[]> {
    const all = dedupeById([
      ...universities, ...expanded2027Universities,
      ...verifiedGyeonggi2027Universities, ...verifiedGachonAllFields2027Universities,
      ...verifiedIncheonAllFields2027Universities, ...verifiedKwangwoon2027Universities,
      ...verifiedUos2027Universities, ...verifiedSeoulTech2027Universities,
      ...verifiedSeoulWomen2027Universities, ...verifiedEwha2027Universities,
      ...verifiedKookmin2027Universities, ...verifiedMyeongji2027Universities,
    ]);
    const scoped: University[] = all.flatMap((university) => {
      if (!isTargetRegion(university.region)) return [];
      return [{ id: university.id, name: university.name, region: university.region }];
    });
    return region ? scoped.filter((university) => university.region === region) : scoped;
  }

  async getDepartments(universityId?: string): Promise<Department[]> {
    const all = dedupeById([
      ...departments, ...expanded2027Departments,
      ...verifiedGyeonggi2027Departments, ...verifiedGachonAllFields2027Departments,
      ...verifiedIncheonAllFields2027Departments, ...verifiedKwangwoon2027Departments,
      ...verifiedUos2027Departments, ...verifiedSeoulTech2027Departments,
      ...verifiedSeoulWomen2027Departments, ...verifiedEwha2027Departments,
      ...verifiedKookmin2027Departments, ...verifiedMyeongji2027Departments,
    ]);
    return universityId ? all.filter((d) => d.universityId === universityId) : all;
  }

  async getAdmissions(query: AdmissionQuery = {}): Promise<Admission[]> {
    const universitiesInScope = await this.getUniversities(query.region);
    const allowedUniversityIds = new Set(universitiesInScope.map((u) => u.id));
    const all: Admission[] = [
      ...verified2027Admissions, ...verifiedAjou2027Admissions,
      ...verifiedGyeonggi2027Admissions, ...verifiedGachonAllFields2027Admissions,
      ...verifiedIncheonAllFields2027Admissions, ...verifiedKwangwoon2027Admissions,
      ...verifiedUos2027Admissions, ...verifiedSeoulTech2027Admissions,
      ...verifiedSeoulWomen2027Admissions, ...verifiedEwha2027Admissions,
      ...verifiedKookmin2027Admissions, ...verifiedMyeongji2027Admissions,
    ].filter((admission) => !admission.isMock);

    return all.filter((a) =>
      allowedUniversityIds.has(a.universityId) &&
      (!query.academicYear || a.academicYear === query.academicYear) &&
      (!query.universityId || a.universityId === query.universityId) &&
      (!query.departmentId || a.departmentId === query.departmentId) &&
      (!query.type || a.type === query.type)
    );
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

export const verifiedAdmissionRepository = new HybridAdmissionRepository();
