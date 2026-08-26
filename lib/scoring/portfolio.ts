import type { Competitiveness, Recommendation } from "@/lib/types";

/**
 * 포트폴리오/전략 코멘트 문구 로직.
 * 숫자를 임의로 만들지 않고 실제 추천 6장의 구성 상태를 설명한다.
 */
export function calcBalance(total: number): number {
  return Math.max(60, Math.min(94, total + 6));
}

export function aiSummaryText(c: Competitiveness, desiredMajor: string): string {
  if (c.holistic >= 85) {
    return `학생부가 강점이에요. ${desiredMajor || "희망 전공"} 학종에서 한 단계 높은 대학을 노려볼 수 있습니다.`;
  }
  return "교과와 학생부를 균형 있게 보는 전략이 좋아요.";
}

export function strategyCommentText(c: Competitiveness): string {
  if (c.holistic > c.subject) {
    return "학생부 경쟁력이 내신보다 높습니다. 학종에서 상향 카드를 확보하고 교과전형으로 안전장치를 두는 전략이 좋습니다.";
  }
  return "교과 경쟁력이 비교적 좋습니다. 교과 중심으로 적정·안정 카드를 확보하고 학종에서 상향을 노려보세요.";
}

export function balanceAlertText(recommendations: Recommendation[]): string {
  const stableCount = recommendations.filter((recommendation) => recommendation.tier === "안정").length;
  const total = recommendations.length;

  if (total === 0) return "💡 아직 추천 조합이 없어 포트폴리오 리스크를 계산할 수 없어요.";
  if (stableCount === 0) return "⚠️ 현재 안정 카드가 없어 전체 리스크가 높은 편이에요. 안정 카드를 1장 이상 확보하는 것을 권해요.";
  if (stableCount === 1) return "💡 안정 카드가 1장 있어 전체 리스크를 낮춰주고 있어요.";
  if (stableCount === 2) return "💡 안정 카드가 2장 있어 전체 조합의 균형이 좋아요.";
  return `💡 안정 카드가 ${stableCount}장 있어 전체 리스크가 비교적 낮아요.`;
}

export type StudentDerived = {
  competitiveness: Competitiveness;
  balance: number;
  aiSummary: string;
  strategyComment: string;
};
