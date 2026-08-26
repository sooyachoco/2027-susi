import type { Admission, Department, Recommendation, StudentProfile, University } from "@/lib/types";
import { convertStudentToAdmissionScore, csatFit } from "./conversion";

export function recommendSix(
  student: StudentProfile,
  admissions: Admission[],
  offset = 0,
  universities: University[] = [],
  departments: Department[] = [],
): Recommendation[] {
  const desired = student.desiredMajor.trim();
  const exactMatched = desired ? admissions.filter((a) => majorNameMatches(desired, a, departments)) : admissions;
  const exactIds = new Set(exactMatched.map((a) => a.id));

  // 특정 세부전공의 2027 검증 데이터가 6장보다 적을 수 있다.
  // 이 경우 바로 전체 풀로 점프하지 않고, 같은 전공군의 인접 전공을 먼저 보완한다.
  const relatedMatched = desired
    ? admissions.filter((a) => !exactIds.has(a.id) && relatedMajorMatches(desired, a, departments))
    : [];
  const relatedIds = new Set(relatedMatched.map((a) => a.id));

  let candidateAdmissions = exactMatched;
  if (candidateAdmissions.length < 6) candidateAdmissions = [...candidateAdmissions, ...relatedMatched];

  // 인접 전공까지 부족하면 마지막으로 검증된 전체 풀에서 보완해 항상 6장을 만들 수 있게 한다.
  if (candidateAdmissions.length < 6) {
    candidateAdmissions = [
      ...candidateAdmissions,
      ...admissions.filter((a) => !exactIds.has(a.id) && !relatedIds.has(a.id)),
    ];
  }

  const scored = candidateAdmissions.map((admission) => {
    const converted = convertStudentToAdmissionScore(student, admission);
    const minimumFit = csatFit(student, admission);
    let score = converted.score;
    if (admission.csatMinimum?.enabled) score = score * 0.85 + minimumFit * 0.15;
    score += strategicAdjustment(student, admission);
    if (desired && !exactIds.has(admission.id)) score -= relatedIds.has(admission.id) ? 4 : 8;
    return { admission, score: Math.round(clamp(score)) };
  });

  const ranked = [...scored].sort((a, b) => b.score - a.score || a.admission.id.localeCompare(b.admission.id));
  const seed = Math.abs(offset);
  const rotated = rotateBySeed(ranked, seed);
  const diversified = diversifyUniversities(rotated, 6, universities);

  return diversified.map((item) => {
    const score = Math.round(clamp(item.score + scoreVariation(seed, item.admission.id)));
    const relationNote = desired && !exactIds.has(item.admission.id)
      ? relatedIds.has(item.admission.id) ? " · 전공 연계 추천" : " · 전공 데이터 부족으로 범위 확장"
      : "";
    return { tier: tierForScore(score), admissionId: item.admission.id, score, reason: `${buildReason(item.admission, score)}${relationNote}` };
  });
}

function rotateBySeed<T>(items: T[], seed: number): T[] { if (items.length <= 1 || seed === 0) return items; const step = (seed * 3 + 1) % items.length; return items.slice(step).concat(items.slice(0, step)); }
function scoreVariation(seed: number, id: string): number { if (seed === 0) return 0; let hash = seed * 31; for (const char of id) hash = (hash * 33 + char.charCodeAt(0)) | 0; return (Math.abs(hash) % 7) - 3; }

function majorNameMatches(query: string, admission: Admission, departments: Department[]): boolean {
  const q = normalizeText(query);
  if (!q) return true;
  const department = departments.find((item) => item.id === admission.departmentId);
  const names = [department?.name, admission.name, admission.majorGroup].filter((value): value is string => Boolean(value));
  if (names.some((name) => {
    const normalized = normalizeText(name);
    return normalized === q || normalized.includes(q) || q.includes(normalized);
  })) return true;

  const exactAliases = majorAliases(q);
  if (exactAliases.length > 0) return names.some((name) => exactAliases.some((alias) => normalizeText(name).includes(alias)));
  if (isBroadMajor(q)) {
    const queryGroups = majorTags(q);
    return queryGroups.length > 0 && names.some((name) => majorTags(name).some((group) => queryGroups.includes(group)));
  }
  return false;
}

function relatedMajorMatches(query: string, admission: Admission, departments: Department[]): boolean {
  const queryGroups = majorTags(query);
  if (queryGroups.length === 0) return false;
  const department = departments.find((item) => item.id === admission.departmentId);
  const names = [department?.name, admission.name, admission.majorGroup].filter((value): value is string => Boolean(value));
  return names.some((name) => majorTags(name).some((group) => queryGroups.includes(group)));
}

function normalizeText(value: string): string { return value.replace(/[\s·•ㆍ\-_/()]/g, "").toLowerCase(); }
function isBroadMajor(q: string): boolean { return ["교육", "인문", "어문", "사회", "사회과학", "경영", "경제", "법", "행정", "공학", "자연과학", "의료", "보건", "예체능", "디자인", "미술", "음악", "체육", "컴퓨터", "소프트웨어", "ai", "인공지능"].includes(q); }
function majorAliases(query: string): string[] {
  const q = normalizeText(query);
  const aliases: Record<string, string[]> = {
    "유아교육": ["유아교육", "유아교육학", "유아교육과"], "미술교육": ["미술교육", "미술교육학", "미술교육과", "조형교육"], "음악교육": ["음악교육", "음악교육학", "음악교육과"], "체육교육": ["체육교육", "체육교육학", "체육교육과"], "국어교육": ["국어교육", "국어교육학", "국어교육과"], "영어교육": ["영어교육", "영어교육학", "영어교육과"], "수학교육": ["수학교육", "수학교육학", "수학교육과"], "특수교육": ["특수교육", "특수교육학", "특수교육과"], "컴퓨터교육": ["컴퓨터교육", "정보교육", "소프트웨어교육"], "사회교육": ["사회교육", "사회교육학", "사회교육과"], "역사교육": ["역사교육", "역사교육학", "역사교육과"], "지리교육": ["지리교육", "지리교육학", "지리교육과"], "윤리교육": ["윤리교육", "윤리교육학", "윤리교육과"], "가정교육": ["가정교육", "가정교육학", "가정교육과"], "교육학": ["교육학", "교육학과"]
  };
  return (aliases[q] ?? []).map(normalizeText);
}
function majorTags(value: string): string[] {
  const v = normalizeText(value); const tags: string[] = []; const add = (tag: string, patterns: RegExp) => { if (patterns.test(v)) tags.push(tag); };
  add("교육", /교육|교직|교원|사범/); add("유아교육", /유아|아동교육/); add("초등교육", /초등/); add("특수교육", /특수교육/); add("미술교육", /미술교육|조형교육/); add("음악교육", /음악교육/); add("체육교육", /체육교육/); add("국어교육", /국어교육/); add("영어교육", /영어교육/); add("수학교육", /수학교육/); add("컴퓨터교육", /컴퓨터교육|정보교육|소프트웨어교육/);
  add("경영·경제", /경영|경제|회계|세무|금융|마케팅|무역|통상|관광경영/); add("법·행정", /법학|법무|법률|행정|정치|정책|경찰|공공인재/); add("사회·정책", /사회|사회학|사회과학|정치외교|행정|미디어|언론|심리|복지|국제관계|외교/); add("어문·인문", /국어|영어|중국어|중어|일본어|일어|불어|독어|어문|문학|철학|사학|역사|인문/);
  add("컴퓨터·소프트웨어", /컴퓨터|소프트웨어|인공지능|ai|데이터|정보보호|사이버|빅데이터|정보통신|it/); add("전기·전자", /전기|전자|반도체|통신|임베디드|전력|제어/); add("기계·로봇", /기계|자동차|로봇|메카트로닉스|모빌리티|항공우주/); add("화학·신소재", /화학|화공|신소재|재료|고분자|에너지|소재/); add("생명·바이오", /생명|바이오|식품|생물|유전|환경생명/); add("건축·도시·환경", /건축|토목|도시|환경|건설|조경|인프라/); add("자연과학", /수학|통계|물리|천문|지구과학|과학/); add("의료·보건", /간호|의예|의학|치의|약학|한의|보건|방사선|임상병리|물리치료|작업치료|치위생|응급구조|재활|의료/); add("예체능", /디자인|미술|음악|체육|연극|영화|공연|조형|예술|콘텐츠|애니메이션|사진|뷰티|무용/);
  return [...new Set(tags)];
}
function diversifyUniversities(items: Array<{ admission: Admission; score: number }>, limit: number, universities: University[]) { const universityNameById = new Map(universities.map((u) => [u.id, normalizeText(u.name)])); const selected: Array<{ admission: Admission; score: number }> = []; const used = new Set<string>(); for (const item of items) { if (selected.length >= limit) break; const universityKey = universityNameById.get(item.admission.universityId) || item.admission.universityId; if (!used.has(universityKey)) { selected.push(item); used.add(universityKey); } } if (selected.length < limit) { const ids = new Set(selected.map((x) => x.admission.id)); for (const item of items) { if (selected.length >= limit) break; if (!ids.has(item.admission.id)) { selected.push(item); ids.add(item.admission.id); } } } return selected; }
function tierForScore(score: number): "상향" | "적정" | "안정" { return score >= 86 ? "안정" : score >= 70 ? "적정" : "상향"; }
function strategicAdjustment(student: StudentProfile, admission: Admission) { const gradeAverage = student.gradeAverage ?? 3, recordLink = student.studentRecordLink ?? 3, csatChance = student.csatMinimumChance ?? 3; let adjustment = 0; if (admission.type === "학종") adjustment += recordLink >= 4 ? 4 : -2; if (admission.type === "교과") adjustment += gradeAverage <= 2.5 ? 4 : -3; if (admission.interview) adjustment += recordLink >= 4 ? 2 : -2; if (admission.csatMinimum?.enabled) adjustment += csatChance >= 4 ? 2 : -5; return adjustment; }
function buildReason(admission: Admission, score: number) { const parts = [admission.type === "학종" ? "학생부 중심" : admission.type === "논술" ? "논술 중심" : "교과 중심"]; if (admission.interview) parts.push("면접 변수 있음"); if (admission.csatMinimum?.enabled) parts.push("수능최저 반영"); if (admission.source?.type === "adiga" || admission.source?.type === "university") parts.push("2027 전형 데이터"); if (admission.isMock) parts.push("프로토타입 데이터"); return `${parts.join(" · ")} · 전략 적합도 ${score}`; }
function clamp(value: number) { return Math.max(45, Math.min(98, value)); }
export function nextShuffleOffset(offset: number): number { return offset === 0 ? 1 : offset + 1; }
