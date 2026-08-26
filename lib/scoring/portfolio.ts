import type { Competitiveness, Recommendation } from "@/lib/types";

export function calcBalance(total: number): number {
  return Math.max(60, Math.min(94, total + 6));
}

export function aiSummaryText(c: Competitiveness, desiredMajor: string): string {
  const major = desiredMajor || "희망 전공";
  const options = c.holistic >= 85
    ? [
        `학생부 흐름이 좋아요. ${major} 학종에서는 상향 카드도 충분히 검토할 만합니다.`,
        `${major} 전공연계 스토리를 잘 살리면 학종에서 강점을 만들 수 있는 프로필이에요.`,
        `학생부 경쟁력이 돋보여요. ${major} 관련 활동을 중심으로 상향 지원을 섞어볼 수 있습니다.`,
      ]
    : c.subject >= 85
      ? [
          `내신 경쟁력이 강한 편이에요. ${major} 교과전형을 중심으로 적정·안정 카드를 잡아보세요.`,
          `교과 성적이 좋은 편이라 ${major} 관련 교과전형 활용도가 높습니다.`,
          `내신 강점을 활용하면 ${major} 교과전형에서 안정적인 포트폴리오를 만들기 좋아요.`,
        ]
      : c.csatMinimum >= 80
        ? [
            `수능최저 대응력이 좋아요. ${major} 논술·교과전형까지 선택지를 넓혀볼 수 있습니다.`,
            `모의고사 흐름이 좋아 수능최저가 있는 전형도 적극적으로 비교해볼 만해요.`,
            `수능최저 가능성이 강점이에요. 학생부 전형과 논술을 함께 섞으면 선택지가 넓어집니다.`,
          ]
        : [
            `${major}를 중심으로 학종과 교과를 균형 있게 배치하는 전략이 좋아요.`,
            `현재는 한 전형에 몰기보다 적정·안정 카드를 함께 확보하는 게 유리해 보여요.`,
            `성적과 학생부를 함께 고려하면 무리한 상향보다 균형형 6장 구성이 잘 맞습니다.`,
          ];
  return options[Math.abs(Math.round(c.total)) % options.length];
}

export function strategyCommentText(c: Competitiveness): string {
  if (c.holistic > c.subject) return "학생부 경쟁력이 내신보다 높습니다. 학종에서 상향 카드를 확보하고 교과전형으로 안전장치를 두는 전략이 좋습니다.";
  if (c.subject > c.holistic) return "교과 경쟁력이 비교적 좋습니다. 교과 중심으로 적정·안정 카드를 확보하고 학종에서 상향을 노려보세요.";
  return "교과와 학생부 경쟁력이 비슷합니다. 전형별 장점을 나눠 6장을 구성하면 리스크를 낮출 수 있어요.";
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

export type StudentDerived = { competitiveness: Competitiveness; balance: number; aiSummary: string; strategyComment: string };
