import type { Admission, Recommendation, StudentProfile } from "@/lib/types";
import { verified2027Departments } from "@/lib/admission/real2027";
import { expanded2027Departments } from "@/lib/admission/expanded2027";
import { convertStudentToAdmissionScore, csatFit } from "./conversion";

/** 2027 전형 속성을 반영하는 전략 적합도 엔진. 합격확률이 아니다. */
export function recommendSix(student: StudentProfile, admissions: Admission[], offset = 0): Recommendation[] {
  const targetGroup = normalizeMajorGroup(student.desiredMajor);
  const majorMatched = targetGroup
    ? admissions.filter((admission) => getAdmissionMajorGroup(admission) === targetGroup)
    : admissions;

  // 희망전공이 입력됐는데 해당 전공군 데이터가 없으면 엉뚱한 학과를 추천하지 않는다.
  if (student.desiredMajor.trim() && majorMatched.length === 0) return [];

  const scored = majorMatched.map((admission) => {
    const converted = convertStudentToAdmissionScore(student, admission);
    const minimumFit = csatFit(student, admission);
    let score = converted.score;

    if (admission.csatMinimum?.enabled) score = score * 0.85 + minimumFit * 0.15;
    score += strategicAdjustment(student, admission);

    return { admission, score: Math.round(clamp(score + offset)) };
  }).sort((a, b) => b.score - a.score);

  // 1차: 서로 다른 대학을 우선 배치해 추천 대학이 한 곳에 몰리지 않게 한다.
  // 2차: 대학 수가 부족하면 같은 대학의 다른 전형으로 6장을 채운다.
  const diversified = diversifyUniversities(scored, 6);
  const tiers = ["상향", "상향", "적정", "적정", "적정", "안정"] as const;

  return diversified.map((item, index) => ({
    tier: tiers[index],
    admissionId: item.admission.id,
    score: item.score,
    reason: buildReason(item.admission, item.score),
  }));
}

function diversifyUniversities(items: Array<{ admission: Admission; score: number }>, limit: number) {
  const selected: Array<{ admission: Admission; score: number }> = [];
  const usedUniversities = new Set<string>();

  // 최고점부터 보되 대학 중복을 먼저 피한다.
  for (const item of items) {
    if (selected.length >= limit) break;
    if (!usedUniversities.has(item.admission.universityId)) {
      selected.push(item);
      usedUniversities.add(item.admission.universityId);
    }
  }

  // 후보 대학이 부족한 경우 남은 전형으로 보충한다.
  if (selected.length < limit) {
    const selectedIds = new Set(selected.map((item) => item.admission.id));
    for (const item of items) {
      if (selected.length >= limit) break;
      if (!selectedIds.has(item.admission.id)) {
        selected.push(item);
        selectedIds.add(item.admission.id);
      }
    }
  }

  return selected;
}

function getAdmissionMajorGroup(admission: Admission): string | null {
  if (admission.majorGroup) return admission.majorGroup;

  const department = [...verified2027Departments, ...expanded2027Departments].find(
    (item) => item.id === admission.departmentId,
  );
  return department?.category ?? null;
}

function normalizeMajorGroup(major: string): string | null {
  const value = major.replace(/\s+/g, "").toLowerCase();
  if (!value) return null;
  if (/(경영|business|마케팅|회계|세무|금융|경제|국제통상|무역)/.test(value)) return "경영·경제";
  if (/(법학|법률|law|법무)/.test(value)) return "법·행정";
  if (/(컴퓨터|소프트웨어|sw|ai|인공지능|데이터|정보보호|사이버)/.test(value)) return "컴퓨터·소프트웨어";
  if (/(전자|전기|반도체|전기전자)/.test(value)) return "전기·전자";
  if (/(기계|자동차|로봇|메카트로닉스)/.test(value)) return "기계·로봇";
  if (/(화학|화공|신소재|재료)/.test(value)) return "화학·신소재";
  if (/(생명|생명공학|바이오|식품)/.test(value)) return "생명·바이오";
  if (/(건축|토목|도시|환경공학)/.test(value)) return "건축·도시·환경";
  if (/(심리|사회|행정|정치|언론|미디어|사회학|공공정책|정책학)/.test(value)) return "사회·정책";
  if (/(국어|영어|중어|중국어|일어|일본어|불어|독어|문헌정보)/.test(value)) return "어문·인문";
  if (/(교육|유아교육|초등교육|특수교육)/.test(value)) return "교육";
  if (/(수학|통계|물리|화학)/.test(value)) return "자연과학";
  if (/(간호|의예|의학|치의|약학|한의|보건)/.test(value)) return "의료·보건";
  if (/(디자인|미술|음악|체육|연극|영화)/.test(value)) return "예체능";
  return value;
}

function strategicAdjustment(student: StudentProfile, admission: Admission) {
  const gradeAverage = student.gradeAverage ?? 3;
  const studentRecordLink = student.studentRecordLink ?? 3;
  const csatMinimumChance = student.csatMinimumChance ?? 3;

  let adjustment = 0;
  if (admission.type === "학종") adjustment += studentRecordLink >= 4 ? 4 : -2;
  if (admission.type === "교과") adjustment += gradeAverage <= 2.5 ? 4 : -3;
  if (admission.interview) adjustment += studentRecordLink >= 4 ? 2 : -2;
  if (admission.csatMinimum?.enabled) adjustment += csatMinimumChance >= 4 ? 2 : -5;
  return adjustment;
}

function buildReason(admission: Admission, score: number) {
  const parts = [admission.type === "학종" ? "학생부 중심" : admission.type === "논술" ? "논술 중심" : "교과 중심"];
  if (admission.interview) parts.push("면접 변수 있음");
  if (admission.csatMinimum?.enabled) parts.push("수능최저 반영");
  if (admission.source?.type === "adiga" || admission.source?.type === "university") parts.push("2027 전형 데이터");
  if (admission.isMock) parts.push("프로토타입 데이터");
  return `${parts.join(" · ")} · 전략 적합도 ${score}`;
}

function clamp(value: number) { return Math.max(45, Math.min(98, value)); }

export function nextShuffleOffset(offset: number): number {
  if (offset === 0) return 3;
  if (offset === 3) return -2;
  return 0;
}
