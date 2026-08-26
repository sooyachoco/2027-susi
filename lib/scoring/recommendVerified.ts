import type { Admission, Department, Recommendation, StudentProfile } from "@/lib/types";
import { verified2027Departments } from "@/lib/admission/real2027";
import { expanded2027Departments } from "@/lib/admission/expanded2027";
import { remainingMetro2027Departments } from "@/lib/admission/remainingMetro2027";
import { convertStudentToAdmissionScore, csatFit } from "./conversion";

/** 2027 전형 속성을 반영하는 전략 적합도 엔진. 합격확률이 아니다. */
export function recommendSix(student: StudentProfile, admissions: Admission[], offset = 0): Recommendation[] {
  const targetGroup = normalizeMajorGroup(student.desiredMajor);
  const majorMatched = targetGroup
    ? admissions.filter((admission) => normalizeAdmissionMajorGroup(getAdmissionMajorGroup(admission)) === targetGroup)
    : admissions;

  if (student.desiredMajor.trim() && majorMatched.length === 0) return [];

  const scored = majorMatched.map((admission) => {
    const converted = convertStudentToAdmissionScore(student, admission);
    const minimumFit = csatFit(student, admission);
    let score = converted.score;

    if (admission.csatMinimum?.enabled) score = score * 0.85 + minimumFit * 0.15;
    score += strategicAdjustment(student, admission);

    return { admission, score: Math.round(clamp(score + offset)) };
  }).sort((a, b) => b.score - a.score);

  const diversified = diversifyUniversities(scored, 6);

  return diversified.map((item) => ({
    tier: tierForScore(item.score),
    admissionId: item.admission.id,
    score: item.score,
    reason: buildReason(item.admission, item.score),
  }));
}

function diversifyUniversities(items: Array<{ admission: Admission; score: number }>, limit: number) {
  const selected: Array<{ admission: Admission; score: number }> = [];
  const usedUniversities = new Set<string>();

  for (const item of items) {
    if (selected.length >= limit) break;
    if (!usedUniversities.has(item.admission.universityId)) {
      selected.push(item);
      usedUniversities.add(item.admission.universityId);
    }
  }

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

function tierForScore(score: number): "상향" | "적정" | "안정" {
  if (score >= 86) return "안정";
  if (score >= 70) return "적정";
  return "상향";
}

function getAdmissionMajorGroup(admission: Admission): string | null {
  if (admission.majorGroup) return admission.majorGroup;

  const department = [...verified2027Departments, ...expanded2027Departments, ...remainingMetro2027Departments].find(
    (item) => item.id === admission.departmentId,
  );
  return getDepartmentMajorGroup(department);
}

function getDepartmentMajorGroup(department: Department | undefined): string | null {
  if (!department) return null;
  // Department의 표준 필드는 category이며, 일부 확장 데이터가 majorGroup을 가질 수 있으므로
  // 런타임에서는 안전하게 읽어 기존/확장 데이터 모두 지원한다.
  const candidate = department as Department & { majorGroup?: string | null };
  return candidate.majorGroup ?? department.category ?? null;
}

/**
 * 대학마다 사용하는 전공군 명칭이 달라도 하나의 표준 전공군으로 매칭한다.
 * 예: 사회 / 사회학 / 사회과학 / 인문·사회 / 정치·행정 → 사회·정책
 */
function normalizeMajorGroup(major: string): string | null {
  const value = major.replace(/[\s·•ㆍ\-_/()]/g, "").toLowerCase();
  if (!value) return null;

  if (/(경영|business|마케팅|회계|세무|금융|경제|국제통상|무역|유통|호텔경영|관광경영|경영정보|산업경영)/.test(value)) return "경영·경제";
  if (/(법학|법률|law|법무|법조|법정|법정계열)/.test(value)) return "법·행정";
  if (/(컴퓨터|소프트웨어|software|sw|ai|인공지능|데이터|정보보호|사이버|빅데이터|컴퓨터공학|정보통신|정보시스템|it)/.test(value)) return "컴퓨터·소프트웨어";
  if (/(전자|전기|반도체|전기전자|전자공학|통신|임베디드|전력|제어계측)/.test(value)) return "전기·전자";
  if (/(기계|자동차|로봇|메카트로닉스|스마트모빌리티|항공우주|기계공학|모빌리티)/.test(value)) return "기계·로봇";
  if (/(화학|화공|신소재|재료|고분자|에너지공학|화학공학|소재)/.test(value)) return "화학·신소재";
  if (/(생명|생명공학|바이오|식품|생명과학|환경생명|생물|유전공학|식품공학)/.test(value)) return "생명·바이오";
  if (/(건축|토목|도시|환경공학|건설|조경|건축공학|도시공학|인프라)/.test(value)) return "건축·도시·환경";
  if (/(사회|사회학|사회과학|인문사회|인문학사회|정치|정치외교|행정|행정학|언론|미디어|신문방송|커뮤니케이션|공공정책|정책학|국제관계|외교|심리|복지|사회복지|아동|청소년|경찰|소방|공공인재|지역개발)/.test(value)) return "사회·정책";
  if (/(국어|영어|중어|중국어|일어|일본어|불어|독어|문헌정보|철학|사학|역사|문화|문학|언어|어문|인문|인문학)/.test(value)) return "어문·인문";
  if (/(교육|유아교육|초등교육|특수교육|교육학|상담교육|청소년교육|평생교육)/.test(value)) return "교육";
  if (/(수학|통계|물리|천문|지구과학|화학과학|수리|과학)/.test(value)) return "자연과학";
  if (/(간호|의예|의학|치의|약학|한의|보건|방사선|임상병리|물리치료|작업치료|치위생|응급구조|재활|의료|보건의료)/.test(value)) return "의료·보건";
  if (/(디자인|미술|음악|체육|연극|영화|공연|조형|예술|콘텐츠|애니메이션|사진|뷰티|무용)/.test(value)) return "예체능";
  return value;
}

function normalizeAdmissionMajorGroup(group: string | null): string | null {
  if (!group) return null;
  return normalizeMajorGroup(group);
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
