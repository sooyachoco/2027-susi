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

  // 4단계 구성: 대학 중복을 먼저 줄이고, 부족할 때만 같은 대학의 다른 전형으로 보충한다.
  const diversified = diversifyUniversities(scored, 6);

  // 적합도 점수가 높을수록 안정에 가깝다.
  // 추천 카드의 전략적 의미가 뒤집히지 않도록 점수순으로 안정→상향 순으로 배치한다.
  return diversified.map((item, index) => ({
    tier: tierForIndex(index, diversified.length),
    admissionId: item.admission.id,
    score: item.score,
    reason: buildReason(item.admission, item.score),
  }));
}

function diversifyUniversities(items: Array<{ admission: Admission; score: number }>, limit: number) {
  const selected: Array<{ admission: Admission; score: number }> = [];
  const usedUniversities = new Set<string>();

  // 최고 적합도부터 보되 대학 중복을 먼저 피한다.
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

function tierForIndex(index: number, length: number): "상향" | "적정" | "안정" {
  if (length <= 1) return "적정";
  if (length <= 3) return index === 0 ? "안정" : "상향";
  if (length <= 5) return index === 0 ? "안정" : index <= 2 ? "적정" : "상향";
  return index === 0 ? "안정" : index <= 3 ? "적정" : "상향";
}

function getAdmissionMajorGroup(admission: Admission): string | null {
  if (admission.majorGroup) return admission.majorGroup;

  const department = [...verified2027Departments, ...expanded2027Departments].find(
    (item) => item.id === admission.departmentId,
  );
  return department?.majorGroup ?? department?.category ?? null;
}

function normalizeMajorGroup(major: string): string | null {
  const value = major.replace(/\s+/g, "").toLowerCase();
  if (!value) return null;
  if (/(경영|business|마케팅|회계|세무|금융|경제|국제통상|무역|유통|호텔경영)/.test(value)) return "경영·경제";
  if (/(법학|법률|law|법무|법조)/.test(value)) return "법·행정";
  if (/(컴퓨터|소프트웨어|sw|ai|인공지능|데이터|정보보호|사이버|빅데이터)/.test(value)) return "컴퓨터·소프트웨어";
  if (/(전자|전기|반도체|전기전자|전자공학|통신|임베디드)/.test(value)) return "전기·전자";
  if (/(기계|자동차|로봇|메카트로닉스|스마트모빌리티|항공우주)/.test(value)) return "기계·로봇";
  if (/(화학|화공|신소재|재료|고분자|에너지공학)/.test(value)) return "화학·신소재";
  if (/(생명|생명공학|바이오|식품|생명과학|환경생명)/.test(value)) return "생명·바이오";
  if (/(건축|토목|도시|환경공학|건설|조경)/.test(value)) return "건축·도시·환경";
  if (/(심리|사회|행정|정치|언론|미디어|사회학|공공정책|정책학|국제관계|외교)/.test(value)) return "사회·정책";
  if (/(국어|영어|중어|중국어|일어|일본어|불어|독어|문헌정보|철학|사학|역사|문화)/.test(value)) return "어문·인문";
  if (/(교육|유아교육|초등교육|특수교육|교육학|상담교육)/.test(value)) return "교육";
  if (/(수학|통계|물리|천문|지구과학|화학과학)/.test(value)) return "자연과학";
  if (/(간호|의예|의학|치의|약학|한의|보건|방사선|임상병리|물리치료|작업치료)/.test(value)) return "의료·보건";
  if (/(디자인|미술|음악|체육|연극|영화|공연|조형)/.test(value)) return "예체능";
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
