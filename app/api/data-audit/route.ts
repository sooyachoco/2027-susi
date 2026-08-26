import { verifiedAdmissionRepository } from "@/lib/admission/hybridRepository";

export async function GET() {
  const [universities, departments, admissions] = await Promise.all([
    verifiedAdmissionRepository.getUniversities(),
    verifiedAdmissionRepository.getDepartments(),
    verifiedAdmissionRepository.getAdmissions({ academicYear: 2027 }),
  ]);

  const byRegion = universities.reduce<Record<string, number>>((acc, university) => {
    acc[university.region] = (acc[university.region] ?? 0) + 1;
    return acc;
  }, {});

  const byType = admissions.reduce<Record<string, number>>((acc, admission) => {
    acc[admission.type] = (acc[admission.type] ?? 0) + 1;
    return acc;
  }, {});

  const bySource = admissions.reduce<Record<string, number>>((acc, admission) => {
    const source = admission.source?.type ?? "unknown";
    acc[source] = (acc[source] ?? 0) + 1;
    return acc;
  }, {});

  const universityDepartmentCounts = universities.map((university) => ({
    universityId: university.id,
    universityName: university.name,
    region: university.region,
    departmentCount: departments.filter((department) => department.universityId === university.id).length,
    admissionCount: admissions.filter((admission) => admission.universityId === university.id).length,
  }));

  const duplicateAdmissionGroups = Object.values(
    admissions.reduce<Record<string, number>>((acc, admission) => {
      const key = [admission.universityId, admission.departmentId, admission.type, admission.name]
        .join("|")
        .toLowerCase();
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {}),
  ).filter((count) => count > 1).length;

  return Response.json({
    generatedAt: new Date().toISOString(),
    scope: "서울·경기·인천 / 2027 / isMock=false",
    universities: universities.length,
    departments: departments.length,
    admissions: admissions.length,
    byRegion,
    byType,
    bySource,
    duplicateAdmissionGroups,
    universitiesDetail: universityDepartmentCounts,
  });
}
