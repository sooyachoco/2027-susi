import type { Admission, Department, University } from "@/lib/types";
import { MOCK_ADMISSIONS, MOCK_DEPARTMENTS, MOCK_UNIVERSITIES } from "@/lib/data/mock";
import { verified2027Admissions, verified2027Departments, verified2027Universities } from "@/lib/admission/real2027";
import { verifiedHanyang2027Admissions, verifiedHanyang2027Departments, verifiedHanyang2027Universities } from "@/lib/admission/verifiedHanyang2027";
import { verifiedMetroTop2027Admissions, verifiedMetroTop2027Departments, verifiedMetroTop2027Universities } from "@/lib/admission/verifiedMetroTop2027";
import { verifiedMajorMetro2027Admissions, verifiedMajorMetro2027Departments, verifiedMajorMetro2027Universities } from "@/lib/admission/verifiedMajorMetro2027";
import { verifiedSejong2027Admissions, verifiedSejong2027Departments, verifiedSejong2027Universities } from "@/lib/admission/verifiedSejong2027";
import { expanded2027Admissions, expanded2027Departments, expanded2027Universities } from "@/lib/admission/expanded2027";
import { remainingMetro2027Admissions, remainingMetro2027Departments, remainingMetro2027Universities } from "@/lib/admission/remainingMetro2027";
import { capital2027Admissions, capital2027Departments, capital2027Universities } from "@/lib/admission/capital2027";
import { seoulNext2027Admissions, seoulNext2027Departments, seoulNext2027Universities } from "@/lib/admission/seoulNext2027";
import { konkuk2027Admissions, konkuk2027Departments, konkuk2027Universities } from "@/lib/admission/konkuk2027";
import { verifiedDongguk2027Admissions, verifiedDongguk2027Departments, verifiedDongguk2027Universities } from "@/lib/admission/verifiedDongguk2027";
import { verifiedKwangwoon2027Admissions, verifiedKwangwoon2027Departments, verifiedKwangwoon2027Universities } from "@/lib/admission/verifiedKwangwoon2027";
import { verifiedSangmyung2027Admissions, verifiedSangmyung2027Departments, verifiedSangmyung2027Universities } from "@/lib/admission/verifiedSangmyung2027";
import { verifiedDongduk2027Admissions, verifiedDongduk2027Departments, verifiedDongduk2027Universities } from "@/lib/admission/verifiedDongduk2027";
import { verifiedSamyook2027Admissions, verifiedSamyook2027Departments, verifiedSamyook2027Universities } from "@/lib/admission/verifiedSamyook2027";
import { verifiedDuksung2027Admissions, verifiedDuksung2027Departments, verifiedDuksung2027Universities } from "@/lib/admission/verifiedDuksung2027";
import { verifiedSungshin2027Admissions, verifiedSungshin2027Departments, verifiedSungshin2027Universities } from "@/lib/admission/verifiedSungshin2027";
import { verifiedSeoulWomen2027Admissions, verifiedSeoulWomen2027Departments, verifiedSeoulWomen2027Universities } from "@/lib/admission/verifiedSeoulWomen2027";
import { verifiedUos2027Admissions, verifiedUos2027Departments, verifiedUos2027Universities } from "@/lib/admission/verifiedUos2027";
import { verifiedHongik2027Admissions, verifiedHongik2027Departments, verifiedHongik2027Universities } from "@/lib/admission/verifiedHongik2027";
import { verifiedSeoulTech2027Admissions, verifiedSeoulTech2027Departments, verifiedSeoulTech2027Universities } from "@/lib/admission/verifiedSeoulTech2027";
import { verifiedKorea2027Admissions, verifiedKorea2027Departments, verifiedKorea2027Universities } from "@/lib/admission/verifiedKorea2027";
import type { AdmissionRepository } from "./AdmissionRepository";

const METRO_REGIONS = new Set(["서울", "경기", "인천"]);
const withoutUos = <T extends object>(items: T[]) => items.filter((item) => !("universityId" in item) || item.universityId !== "uos");

const verified: Admission[] = [
  ...withoutUos(verified2027Admissions), ...verifiedHanyang2027Admissions, ...verifiedMetroTop2027Admissions,
  ...verifiedMajorMetro2027Admissions, ...verifiedSejong2027Admissions, ...expanded2027Admissions,
  ...remainingMetro2027Admissions, ...capital2027Admissions, ...seoulNext2027Admissions, ...konkuk2027Admissions,
  ...verifiedDongguk2027Admissions, ...verifiedKwangwoon2027Admissions, ...verifiedSangmyung2027Admissions,
  ...verifiedDongduk2027Admissions, ...verifiedSamyook2027Admissions, ...verifiedDuksung2027Admissions,
  ...verifiedSungshin2027Admissions, ...verifiedSeoulWomen2027Admissions, ...verifiedUos2027Admissions,
  ...verifiedHongik2027Admissions, ...verifiedSeoulTech2027Admissions, ...verifiedKorea2027Admissions,
].map((a) => ({ ...a }));

const verifiedUniversities: University[] = [
  ...withoutUos(verified2027Universities), ...verifiedHanyang2027Universities, ...verifiedMetroTop2027Universities,
  ...verifiedMajorMetro2027Universities, ...verifiedSejong2027Universities, ...expanded2027Universities,
  ...remainingMetro2027Universities, ...capital2027Universities, ...seoulNext2027Universities, ...konkuk2027Universities,
  ...verifiedDongguk2027Universities, ...verifiedKwangwoon2027Universities, ...verifiedSangmyung2027Universities,
  ...verifiedDongduk2027Universities, ...verifiedSamyook2027Universities, ...verifiedDuksung2027Universities,
  ...verifiedSungshin2027Universities, ...verifiedSeoulWomen2027Universities, ...verifiedUos2027Universities,
  ...verifiedHongik2027Universities, ...verifiedSeoulTech2027Universities, ...verifiedKorea2027Universities,
];

const verifiedDepartments: Department[] = [
  ...withoutUos(verified2027Departments), ...verifiedHanyang2027Departments, ...verifiedMetroTop2027Departments,
  ...verifiedMajorMetro2027Departments, ...verifiedSejong2027Departments, ...expanded2027Departments,
  ...remainingMetro2027Departments, ...capital2027Departments, ...seoulNext2027Departments, ...konkuk2027Departments,
  ...verifiedDongguk2027Departments, ...verifiedKwangwoon2027Departments, ...verifiedSangmyung2027Departments,
  ...verifiedDongduk2027Departments, ...verifiedSamyook2027Departments, ...verifiedDuksung2027Departments,
  ...verifiedSungshin2027Departments, ...verifiedSeoulWomen2027Departments, ...verifiedUos2027Departments,
  ...verifiedHongik2027Departments, ...verifiedSeoulTech2027Departments, ...verifiedKorea2027Departments,
];

const mergedUniversities: University[] = [
  ...MOCK_UNIVERSITIES.filter((mock) => !verifiedUniversities.some((real) => real.id === mock.id)),
  ...verifiedUniversities.filter((university, index, all) => all.findIndex((item) => item.id === university.id) === index),
];
const metroUniversityIds = new Set(mergedUniversities.filter((university) => METRO_REGIONS.has(university.region ?? "")).map((university) => university.id));
const mergedAdmissions: Admission[] = [
  ...MOCK_ADMISSIONS.filter((mock) => metroUniversityIds.has(mock.universityId) && !verified.some((real) => real.universityId === mock.universityId && real.departmentId === mock.departmentId)),
  ...verified.filter((admission) => metroUniversityIds.has(admission.universityId)),
];
const mergedDepartments: Department[] = [
  ...MOCK_DEPARTMENTS.filter((mock) => metroUniversityIds.has(mock.universityId) && !verifiedDepartments.some((real) => real.id === mock.id)),
  ...verifiedDepartments.filter((department, index, all) => metroUniversityIds.has(department.universityId) && all.findIndex((item) => item.id === department.id) === index),
];

export class VerifiedHybridAdmissionRepository implements AdmissionRepository {
  async getUniversities(): Promise<University[]> { return mergedUniversities.filter((university) => METRO_REGIONS.has(university.region ?? "")); }
  async getDepartments(universityId?: string): Promise<Department[]> { return universityId ? mergedDepartments.filter((d) => d.universityId === universityId) : mergedDepartments; }
  async getAdmissions(params?: { academicYear?: number; universityId?: string; departmentId?: string; type?: Admission["type"] }): Promise<Admission[]> {
    return mergedAdmissions.filter((a) => {
      if (params?.academicYear && a.academicYear !== params.academicYear) return false;
      if (params?.universityId && a.universityId !== params.universityId) return false;
      if (params?.departmentId && a.departmentId !== params.departmentId) return false;
      if (params?.type && a.type !== params.type) return false;
      return true;
    });
  }
}

export const admissionRepository: AdmissionRepository = new VerifiedHybridAdmissionRepository();
