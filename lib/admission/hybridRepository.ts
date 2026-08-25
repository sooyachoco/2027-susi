import { departments, universities } from "./mockData";
import { expanded2027Admissions, expanded2027Departments, expanded2027Universities } from "./expanded2027";
import { verified2027Admissions } from "./verified2027";
import { isTargetRegion } from "./regionScope";
import type { Admission as LegacyAdmission } from "../types";
import type { Admission, AdmissionQuery, AdmissionRepository, University } from "./types";

/**
 * 서울·경기·인천을 1차 수집 범위로 사용하는 통합 저장소.
 * 검증 데이터와 확장(프로토타입) 데이터를 함께 제공하되,
 * 확장 데이터는 Admission.isMock으로 구분한다.
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
    const all: Admission[] = [
      ...verified2027Admissions,
      ...expanded2027Admissions.map(normalizeLegacyAdmission),
    ];

    return all.filter((a) =>
      allowedUniversityIds.has(a.universityId) &&
      (!query.academicYear || a.academicYear === query.academicYear) &&
      (!query.universityId || a.universityId === query.universityId) &&
      (!query.departmentId || a.departmentId === query.departmentId) &&
      (!query.type || a.type === query.type)
    );
  }
}

function normalizeLegacyAdmission(admission: LegacyAdmission): Admission {
  const source = admission.source
    ? {
        type: admission.source.type,
        url: admission.source.url,
        document: admission.source.document,
        page: admission.source.page,
        academicYear: admission.academicYear,
        collectedAt: admission.source.collectedAt,
        verifiedAt: admission.source.verifiedAt,
        confidence: admission.source.confidence,
      }
    : undefined;

  return {
    id: admission.id,
    universityId: admission.universityId,
    departmentId: admission.departmentId,
    academicYear: admission.academicYear,
    name: admission.name,
    type: admission.type,
    majorGroup: admission.majorGroup,
    recruitmentCount: admission.모집인원,
    studentRecordWeight: admission.studentRecordWeight,
    interview: admission.interview,
    csatMinimum: admission.csatMinimum,
    source,
    isMock: admission.isMock,
  };
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
