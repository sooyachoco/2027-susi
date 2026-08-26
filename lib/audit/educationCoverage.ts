import type { Department } from "../types";

export const EDUCATION_TARGETS = [
  "유아교육", "초등교육", "특수교육", "국어교육", "영어교육", "수학교육",
  "사회교육", "역사교육", "지리교육", "윤리교육", "미술교육", "체육교육",
  "음악교육", "컴퓨터교육",
];

const normalize = (value: string) => value.toLowerCase().replace(/[\s·ㆍ\-_/()]/g, "");

const matches = (name: string, target: string) => {
  const n = normalize(name);
  const t = normalize(target);
  if (n.includes(t) || t.includes(n)) return true;
  const aliases: Record<string, string[]> = {
    사회교육: ["사회과교육", "사회교육전공"],
    역사교육: ["역사교육전공"],
    지리교육: ["지리교육전공"],
    윤리교육: ["윤리교육전공"],
    미술교육: ["미술교육전공"],
    음악교육: ["음악교육전공"],
  };
  return (aliases[target] ?? []).some((alias) => n.includes(normalize(alias)));
};

export function auditEducationCoverage(
  departments: Department[],
  admissionsByDepartment: Map<string, number>,
) {
  return EDUCATION_TARGETS.map((target) => {
    const matchesForTarget = departments.filter((d) => matches(d.name, target));
    const admissionCount = matchesForTarget.reduce(
      (sum, d) => sum + (admissionsByDepartment.get(d.id) ?? 0),
      0,
    );
    return {
      target,
      departmentCount: matchesForTarget.length,
      admissionCount,
      status: admissionCount === 0 ? "missing" : admissionCount < 3 ? "thin" : "covered",
      departments: matchesForTarget.map((d) => ({ id: d.id, name: d.name, universityId: d.universityId })),
    };
  });
}
