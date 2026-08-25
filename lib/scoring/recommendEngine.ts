import type { Admission, Recommendation, StudentProfile } from "@/lib/types";

/** 데이터 기반 6장 전략 엔진 1차 버전. 점수는 합격확률이 아닌 전략 적합도다. */
export function recommendSixByData(student: StudentProfile, admissions: Admission[], offset = 0): Recommendation[] {
  const gradeAverage = student.gradeAverage ?? 3;
  const studentRecordLink = student.studentRecordLink ?? 3;
  const mockAverage = student.mockAverage ?? 3;
  const csatMinimumChance = student.csatMinimumChance ?? 3;

  const targetGroup = normalizeMajorGroup(student.desiredMajor);
  const majorMatched = targetGroup
    ? admissions.filter((admission) => admission.majorGroup === targetGroup)
    : admissions;

  // 희망전공이 입력됐는데 해당 전공군 데이터가 없으면 엉뚱한 전공을 추천하지 않는다.
  if (student.desiredMajor.trim() && majorMatched.length === 0) return [];

  const scored = majorMatched.map((admission) => {
    const gradeScore = clamp(100 - (gradeAverage - 1) * 10.5);
    const recordScore = (studentRecordLink / 5) * 100;
    const mockScore = clamp(100 - (mockAverage - 1) * 9);
    let score = gradeScore * 0.35 + recordScore * 0.35 + mockScore * 0.30;

    if (admission.type === "학종") score += studentRecordLink >= 4 ? 5 : -2;
    if (admission.type === "교과") score += gradeAverage <= 2.5 ? 5 : -3;
    if (admission.interview) score += studentRecordLink >= 4 ? 2 : -2;
    if (admission.csatMinimum?.enabled) score += csatMinimumChance >= 4 ? 4 : -7;

    return { admission, score: Math.round(clamp(score + offset)) };
  }).sort((a, b) => b.score - a.score);

  const tiers = ["상향", "상향", "적정", "적정", "적정", "안정"] as const;
  return scored.slice(0, 6).map((item, index) => ({
    tier: tiers[index],
    admissionId: item.admission.id,
    score: item.score,
    reason: buildReason(item.admission, item.score),
  }));
}

function normalizeMajorGroup(major: string): string | null {
  const value = major.replace(/\s+/g, "").toLowerCase();
  if (!value) return null;

  if (/(경영|business|마케팅|회계|세무|금융|경제|국제통상|무역)/.test(value)) return "경영·경제";
  if (/(컴퓨터|소프트웨어|sw|ai|인공지능|데이터|정보보호|사이버)/.test(value)) return "컴퓨터·소프트웨어";
  if (/(전자|전기|반도체|전기전자)/.test(value)) return "전기·전자";
  if (/(기계|자동차|로봇|메카트로닉스)/.test(value)) return "기계·로봇";
  if (/(화학|화공|신소재|재료)/.test(value)) return "화학·신소재";
  if (/(생명|생명공학|바이오|식품)/.test(value)) return "생명·바이오";
  if (/(건축|토목|도시|환경공학)/.test(value)) return "건축·도시·환경";
  if (/(심리|사회|행정|정치|언론|미디어|사회학)/.test(value)) return "사회·정책";
  if (/(국어|영어|중어|중국어|일어|일본어|불어|독어|문헌정보)/.test(value)) return "어문·인문";
  if (/(교육|유아교육|초등교육|특수교육)/.test(value)) return "교육";
  if (/(수학|통계|물리|화학)/.test(value)) return "자연과학";
  if (/(간호|의예|의학|치의|약학|한의|보건)/.test(value)) return "의료·보건";
  if (/(디자인|미술|음악|체육|연극|영화)/.test(value)) return "예체능";
  return value;
}

function buildReason(admission: Admission, score: number) {
  const parts: string[] = [];
  parts.push(admission.type === "학종" ? "학생부 경쟁력을 중심으로 평가하는 전형" : "교과 성적을 주요 기반으로 보는 전형");
  if (admission.interview) parts.push("면접 변수 있음");
  if (admission.csatMinimum?.enabled) parts.push("수능최저 확인 필요");
  if (admission.source?.type === "adiga" || admission.source?.type === "university") parts.push("확인 데이터");
  if (admission.isMock) parts.push("프로토타입 데이터");
  return `${parts.join(" · ")} · 전략 적합도 ${score}`;
}

function clamp(value: number) { return Math.max(45, Math.min(98, value)); }

export function nextDataShuffleOffset(offset: number): number {
  if (offset === 0) return 3;
  if (offset === 3) return -2;
  return 0;
}
