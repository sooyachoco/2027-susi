import type { Department } from "../types";

export type CoveragePriority = {
  departmentId: string;
  departmentName: string;
  universityId: string;
  priority: "high" | "medium" | "low";
  reason: string;
};

const TARGETS = [
  "특수교육",
  "유아교육",
  "미술교육",
  "초등교육",
  "국어교육",
  "영어교육",
  "수학교육",
  "사회교육",
];

const normalize = (value: string) =>
  value.toLowerCase().replace(/[\s·ㆍ\-_/()]/g, "").replace(/학과$|전공$/g, "");

const isTarget = (name: string) => {
  const n = normalize(name);
  return TARGETS.some((target) => n.includes(normalize(target)) || normalize(target).includes(n));
};

export function buildCoveragePriority(
  departments: Department[],
  admissionsByDepartment: Map<string, number>,
): CoveragePriority[] {
  const priorities: Array<CoveragePriority | null> = departments.map((department) => {
    const count = admissionsByDepartment.get(department.id) ?? 0;
    const target = isTarget(department.name);
    const priority: CoveragePriority["priority"] =
      count === 0 ? "high" : target && count < 3 ? "high" : count < 3 ? "medium" : "low";

    if (priority === "low") return null;

    return {
      departmentId: department.id,
      departmentName: department.name,
      universityId: department.universityId,
      priority,
      reason: count === 0 ? "2027 검증 전형 없음" : `2027 검증 전형 ${count}개로 부족`,
    };
  });

  return priorities
    .filter((item): item is CoveragePriority => item !== null)
    .sort((a, b) => {
      const rank = { high: 0, medium: 1, low: 2 };
      return rank[a.priority] - rank[b.priority] || a.departmentName.localeCompare(b.departmentName, "ko");
    });
}
