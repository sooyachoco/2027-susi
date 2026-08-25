import { departments, universities } from "./mockData";
import { expanded2027Departments, expanded2027Universities } from "./expanded2027";
import { verified2027Admissions } from "./verified2027";
import { verifiedAjou2027Admissions } from "./verifiedAjou2027";
import { isTargetRegion } from "./regionScope";
import type { Admission, AdmissionQuery, AdmissionRepository, University } from "./types";

/**
 * 서울·경기·인천을 1차 수집 범위로 사용하는 통합 저장소.
 * 대학/학과 탐색에는 확장 목록을 사용할 수 있지만,
 * 실제 추천 전형은 검증 데이터만 반환한다.
 */
export class HybridAdmissionRepository implements AdmissionRepository {
  async getUniversities(region?: AdmissionQuery["region"]): Promise<University[]> {
    const all = dedupeById([...universities, ...expanded2027Universities]);
    const scoped: University[] = all.flatMap((university) => {
      if (!isTargetRegion(university.region)) return [];
      return [{
        id: university.id,
        name: university.name,
        region: university.region,
      }];
    });
    return region ? scoped.filter((university) => university.region === region) : scoped;
  }

  async getDepartments(universityId?: string) {
    const all = dedupeById([...departments, ...expanded2027Departments]);
    return universityId ? all.filter((d) => d.universityId === universityId) : all;
  }

  async getAdmissions(query: AdmissionQuery = {}): Promise<Admission[]> {
    const universitiesInScope = await this.getUniversities(query.region);
    const allowedUniversityIds = new Set(universitiesInScope.map((u) => u.id));

    // 확장/프로토타입 전형은 탐색용으로만 유지하고 실제 추천에서는 제외한다.
    const all: Admission[] = [
      ...verified2027Admissions,
      ...verifiedAjou2027Admissions,
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
