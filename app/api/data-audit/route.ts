import { verifiedAdmissionRepository } from "@/lib/admission/hybridRepository";
import { coverageTargets2027 } from "@/lib/admission/coverage2027";
import { buildCoveragePriority } from "@/lib/audit/coveragePriority";
import { auditEducationCoverage } from "@/lib/audit/educationCoverage";

export async function GET() {
  const [universities, departments, admissions] = await Promise.all([
    verifiedAdmissionRepository.getUniversities(),
    verifiedAdmissionRepository.getDepartments(),
    verifiedAdmissionRepository.getAdmissions({ academicYear: 2027 }),
  ]);

  const universityIds = new Set(universities.map((university) => university.id));
  const departmentIds = new Set(departments.map((department) => department.id));

  const orphanDepartments = departments
    .filter((department) => !universityIds.has(department.universityId))
    .map((department) => ({ id: department.id, name: department.name, universityId: department.universityId }));

  const orphanAdmissions = admissions
    .filter((admission) => !universityIds.has(admission.universityId) || !departmentIds.has(admission.departmentId))
    .map((admission) => ({
      id: admission.id,
      name: admission.name,
      universityId: admission.universityId,
      departmentId: admission.departmentId,
    }));

  const non2027Admissions = admissions
    .filter((admission) => admission.academicYear !== 2027)
    .map((admission) => ({ id: admission.id, academicYear: admission.academicYear, name: admission.name }));

  const admissionsMissingSource = admissions
    .filter((admission) => !admission.source?.type)
    .map((admission) => ({ id: admission.id, name: admission.name }));

  const admissionsMissingRecruitmentCount = admissions
    .filter((admission) => admission.recruitmentCount == null)
    .map((admission) => ({
      id: admission.id,
      universityId: admission.universityId,
      departmentId: admission.departmentId,
      name: admission.name,
      type: admission.type,
    }));

  const admissionsMissingMethodDetail = admissions
    .filter((admission) =>
      admission.studentRecordWeight == null &&
      admission.documentWeight == null &&
      admission.interview == null &&
      admission.csatMinimum == null,
    )
    .map((admission) => ({
      id: admission.id,
      universityId: admission.universityId,
      departmentId: admission.departmentId,
      name: admission.name,
      type: admission.type,
    }));

  const lowConfidenceAdmissions = admissions
    .filter((admission) => (admission.source?.confidence ?? 0) < 0.9)
    .map((admission) => ({
      id: admission.id,
      universityId: admission.universityId,
      departmentId: admission.departmentId,
      name: admission.name,
      confidence: admission.source?.confidence ?? 0,
      sourceType: admission.source?.type ?? "unknown",
    }))
    .sort((a, b) => a.confidence - b.confidence);

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

  const duplicateAdmissionMap = admissions.reduce<Record<string, { count: number; universityId: string; departmentId: string; type: string; name: string }>>((acc, admission) => {
    const key = [admission.universityId, admission.departmentId, admission.type, admission.name]
      .join("|")
      .toLowerCase();
    const current = acc[key];
    acc[key] = {
      count: (current?.count ?? 0) + 1,
      universityId: admission.universityId,
      departmentId: admission.departmentId,
      type: admission.type,
      name: admission.name,
    };
    return acc;
  }, {});

  const duplicateAdmissionDetails = Object.values(duplicateAdmissionMap)
    .filter((item) => item.count > 1)
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  const sparseUniversities = universityDepartmentCounts
    .filter((item) => item.departmentCount < 3 || item.admissionCount < 3)
    .sort((a, b) => (a.admissionCount - b.admissionCount) || (a.departmentCount - b.departmentCount));

  const educationCoverage = auditEducationCoverage(departments, admissionsByDepartment);
  const coveragePriority = buildCoveragePriority(departments, admissionsByDepartment);

  const activeCoverageTargetIds = new Set(universities.map((university) => university.id));
  const coverageBacklog = coverageTargets2027
    .filter((target) => !activeCoverageTargetIds.has(target.universityId))
    .sort((a, b) => a.priority - b.priority || a.name.localeCompare(b.name));

  const coverageStatusSummary = coverageTargets2027.reduce<Record<string, number>>((acc, target) => {
    acc[target.status] = (acc[target.status] ?? 0) + 1;
    return acc;
  }, {});

  const completeness = {
    admissionsMissingSourceCount: admissionsMissingSource.length,
    admissionsMissingRecruitmentCount: admissionsMissingRecruitmentCount.length,
    admissionsMissingMethodDetailCount: admissionsMissingMethodDetail.length,
    lowConfidenceAdmissionsCount: lowConfidenceAdmissions.length,
    lowConfidenceThreshold: 0.9,
  };

  const integrityErrors = orphanDepartments.length + orphanAdmissions.length + non2027Admissions.length;

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
    duplicateAdmissionGroups: duplicateAdmissionDetails.length,
    duplicateAdmissionDetails,
    sparseUniversities,
    educationCoverage,
    coveragePriority,
    coveragePriorityCount: coveragePriority.length,
    coverageBacklog,
    coverageBacklogCount: coverageBacklog.length,
    coverageStatusSummary,
    completeness,
    admissionsMissingRecruitmentCount,
    admissionsMissingMethodDetail,
    lowConfidenceAdmissions,
    universitiesDetail: universityDepartmentCounts,
    integrity: {
      errorCount: integrityErrors,
      orphanDepartments,
      orphanAdmissions,
      non2027Admissions,
      admissionsMissingSource,
    },
  });
}
