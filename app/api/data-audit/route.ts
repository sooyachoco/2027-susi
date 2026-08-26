import { verifiedAdmissionRepository } from "@/lib/admission/hybridRepository";
import { buildCoveragePriority } from "@/lib/audit/coveragePriority";

export async function GET() {
  const [universities, departments, admissions] = await Promise.all([
    verifiedAdmissionRepository.getUniversities(),
    verifiedAdmissionRepository.getDepartments(),
    verifiedAdmissionRepository.getAdmissions({ academicYear: 2027 }),
  ]);

  const byRegion = universities.reduce<Record<string, number>>((acc, university) => {
    const region = university.region ?? "미지정";
    acc[region] = (acc[region] ?? 0) + 1;
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

  const byCategory = departments.reduce<Record<string, number>>((acc, department) => {
    const category = department.category ?? "미분류";
    acc[category] = (acc[category] ?? 0) + 1;
    return acc;
  }, {});

  const admissionsByDepartment = admissions.reduce<Map<string, number>>((map, admission) => {
    map.set(admission.departmentId, (map.get(admission.departmentId) ?? 0) + 1);
    return map;
  }, new Map());

  const universityDepartmentCounts = universities.map((university) => {
    const universityDepartments = departments.filter((department) => department.universityId === university.id);
    const universityAdmissions = admissions.filter((admission) => admission.universityId === university.id);
    return {
      universityId: university.id,
      universityName: university.name,
      region: university.region,
      departmentCount: universityDepartments.length,
      admissionCount: universityAdmissions.length,
      departmentsWithoutAdmissions: universityDepartments
        .filter((department) => !universityAdmissions.some((admission) => admission.departmentId === department.id))
        .map((department) => department.name),
    };
  });

  const duplicateAdmissionGroups = Object.values(
    admissions.reduce<Record<string, number>>((acc, admission) => {
      const key = [admission.universityId, admission.departmentId, admission.type, admission.name]
        .join("|")
        .toLowerCase();
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {}),
  ).filter((count) => count > 1).length;

  const sparseUniversities = universityDepartmentCounts
    .filter((item) => item.departmentCount < 3 || item.admissionCount < 3)
    .sort((a, b) => (a.admissionCount - b.admissionCount) || (a.departmentCount - b.departmentCount));

  const targetEducationNames = ["교육", "유아교육", "특수교육", "초등교육", "국어교육", "영어교육", "수학교육", "사회교육", "미술교육"];
  const educationCoverage = targetEducationNames.map((target) => {
    const matches = departments.filter((department) => {
      const text = `${department.name} ${department.category ?? ""}`;
      return text.includes(target);
    });
    const matchIds = new Set(matches.map((department) => department.id));
    return {
      target,
      departmentCount: matches.length,
      universityCount: new Set(matches.map((department) => department.universityId)).size,
      admissionCount: admissions.filter((admission) => matchIds.has(admission.departmentId)).length,
    };
  });

  const coveragePriority = buildCoveragePriority(departments, admissionsByDepartment);

  return Response.json({
    generatedAt: new Date().toISOString(),
    scope: "서울·경기·인천 / 2027 / 최종 추천 저장소",
    universities: universities.length,
    departments: departments.length,
    admissions: admissions.length,
    byRegion,
    byType,
    bySource,
    byCategory,
    duplicateAdmissionGroups,
    sparseUniversities,
    educationCoverage,
    coveragePriority,
    coveragePriorityCount: coveragePriority.length,
    universitiesDetail: universityDepartmentCounts,
  });
}