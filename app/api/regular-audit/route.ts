import { getRegularAdmissions, getRegularAdmissionSourceAudit } from "@/lib/regular/repository";

const TARGET_REGIONS = ["서울", "경기", "인천"] as const;
const GROUPS = ["가", "나", "다"] as const;

export async function GET() {
  const admissions = getRegularAdmissions();
  const sourceAudit = getRegularAdmissionSourceAudit();
  const byRegion = Object.fromEntries(
    TARGET_REGIONS.map((region) => [region, admissions.filter((item) => item.region === region).length]),
  );
  const byGroup = Object.fromEntries(
    GROUPS.map((group) => [group, admissions.filter((item) => item.group === group).length]),
  );

  const missingSource = admissions.filter((item) => !item.sourceUrl?.trim());
  const invalidRecruitmentCount = admissions.filter((item) =>
    item.recruitmentCount != null && (!Number.isInteger(item.recruitmentCount) || item.recruitmentCount < 0),
  );
  const invalidWeights = admissions.filter((item) => {
    const weights = [item.koreanWeight, item.mathWeight, item.englishWeight, item.inquiryWeight];
    return weights.some((weight) => !Number.isFinite(weight) || weight < 0) ||
      (item.alternateWeighting != null &&
        [item.alternateWeighting.koreanWeight, item.alternateWeighting.mathWeight,
          item.alternateWeighting.englishWeight, item.alternateWeighting.inquiryWeight]
          .some((weight) => !Number.isFinite(weight) || weight < 0)) ||
      (item.topAreaWeights != null &&
        (!Number.isInteger(item.topAreaWeights.count) || item.topAreaWeights.count < 1 ||
          item.topAreaWeights.count > item.topAreaWeights.areas.length ||
          !Number.isFinite(item.topAreaWeights.weight) || item.topAreaWeights.weight < 0)) ||
      (item.rankedAreaWeights != null &&
        (item.rankedAreaWeights.some((weight) => !Number.isFinite(weight) || weight < 0) ||
          item.rankedAreaWeights.length === 0));
  });
  const invalidWeightTotals = admissions.filter((item) => {
    // Weighted-sum formulas use raw score weights (e.g. 100/120/80), not percentages.
    // Only percentage-based modes must total 100 across subject areas.
    const mode = item.calculationMode ?? "weighted-average";
    if (mode === "weighted-sum-with-additive-bonuses") return false;
    // topAreaWeights replaces the ordinary area weights: only the selected
    // top N areas receive config.weight each; English is added separately
    // unless English itself belongs to the selectable set.
    if (item.topAreaWeights) {
      const config = item.topAreaWeights;
      const effectiveTotal = config.count * config.weight +
        (config.areas.includes("english") ? 0 : item.englishWeight) +
        (config.areas.includes("inquiry") ? 0 : item.inquiryWeight);
      return Number.isFinite(effectiveTotal) && Math.abs(effectiveTotal - 100) > 0.1;
    }
    const groups = [
      [item.koreanWeight, item.mathWeight, item.englishWeight, item.inquiryWeight],
      item.alternateWeighting
        ? [item.alternateWeighting.koreanWeight, item.alternateWeighting.mathWeight,
            item.alternateWeighting.englishWeight, item.alternateWeighting.inquiryWeight]
        : null,
    ].filter((weights): weights is number[] => weights != null);
    return groups.some((weights) =>
      weights.every((weight) => Number.isFinite(weight)) &&
      Math.abs(weights.reduce((sum, weight) => sum + weight, 0) - 100) > 0.1,
    );
  });
  const invalidMultipliers = admissions.filter((item) =>
    [item.subjectScoreMultiplier, item.finalScoreMultiplier].some((value) =>
      value != null && (!Number.isFinite(value) || value <= 0),
    ),
  );
  const invalidConversionTables = admissions.filter((item) => {
    const tables = [item.inquiryConversionTable, item.englishGradeTable, item.koreanHistoryGradePoints];
    return tables.some((table) => table != null &&
      Object.values(table).some((value) => !Number.isFinite(value)));
  });
  const invalidSourceMetadata = admissions.filter((item) =>
    !item.sourceUrl?.trim() || !/^https?:\/\//i.test(item.sourceUrl) ||
    !item.verifiedAt?.trim() || !Number.isFinite(Date.parse(item.verifiedAt)),
  );
  // A university homepage is not a precise source for 2027 regular admissions data.
  const genericSourceUrl = admissions.filter((item) => {
    if (!item.sourceUrl?.trim()) return false;
    try {
      const url = new URL(item.sourceUrl);
      return url.protocol.startsWith("http") && url.pathname === "/" && !url.search;
    } catch {
      return false;
    }
  });
  const genericSourceUniversitySummary = [...new Map(genericSourceUrl.map((item) => [item.universityId, item.universityName])).entries()]
    .map(([universityId, universityName]) => {
      const rows = genericSourceUrl.filter((item) => item.universityId === universityId);
      return {
        universityId,
        universityName,
        region: rows[0]?.region ?? "",
        count: rows.length,
        sourceUrl: rows[0]?.sourceUrl ?? "",
        departments: [...new Set(rows.map((item) => item.department))],
      };
    })
    .sort((a, b) => b.count - a.count || a.universityName.localeCompare(b.universityName, "ko"));
  // University admissions sources should resolve to a university-controlled academic domain.
  // Third-party mirrors may help discovery, but are not accepted as the primary source of record.
  const nonUniversitySourceDomain = admissions.filter((item) => {
    if (!item.sourceUrl?.trim()) return false;
    try {
      const hostname = new URL(item.sourceUrl).hostname.toLowerCase();
      return !hostname.endsWith(".ac.kr") && !hostname.endsWith(".edu");
    } catch {
      return false;
    }
  });
  const missingRecruitment = admissions.filter((item) => item.recruitmentCount == null);
  const zeroRecruitment = admissions.filter((item) => item.recruitmentCount === 0);
  const missingEnglishTable = admissions.filter(
    (item) => item.englishWeight > 0 && !item.englishGradeTable && item.englishConversionPending !== true,
  );
  const pendingEnglishTable = admissions.filter(
    (item) => item.englishWeight > 0 && !item.englishGradeTable && item.englishConversionPending === true,
  );
  const missingHistoryTable = admissions.filter(
    (item) => item.koreanHistoryRequired && !item.koreanHistoryGradePoints,
  );
  const missingInquiryConversion = admissions.filter(
    (item) => item.inquiryConversionRequired && !item.inquiryConversionTable && item.inquiryConversionPending !== true,
  );
  const pendingInquiryConversion = admissions.filter(
    (item) => item.inquiryConversionRequired && !item.inquiryConversionTable && item.inquiryConversionPending === true,
  );
  const maximumScoresNeeded = admissions.filter((item) => {
    if ((item.calculationMode ?? "weighted-average") !== "normalized-standard-sum") return false;
    const metrics = item.subjectMetrics;
    const maxima = item.subjectMaximumScores;
    const koreanNeedsMaximum = (metrics?.korean ?? item.scoreMetric) === "표준점수";
    const mathNeedsMaximum = (metrics?.math ?? item.scoreMetric) === "표준점수";
    const inquiryNeedsMaximum = (item.inquiryWeight > 0 || Boolean(item.rankedAreaWeights?.length)) &&
      (item.inquiryConversionRequired || (metrics?.inquiry ?? item.scoreMetric) === "표준점수");
    return (koreanNeedsMaximum && !(maxima?.korean && maxima.korean > 0)) ||
      (mathNeedsMaximum && !(maxima?.math && maxima.math > 0)) ||
      (inquiryNeedsMaximum && !(maxima?.inquiry && maxima.inquiry > 0));
  });
  // 2027 수능 성적 통지일: 2026-12-11. 그 전에는 당해 연도 최고점이 공식 확정되지 않는다.
  const scoreResultsReleased = Date.now() >= Date.parse("2026-12-11T00:00:00+09:00");
  const pendingMaximumScores = scoreResultsReleased ? [] : maximumScoresNeeded;
  const missingMaximumScores = scoreResultsReleased ? maximumScoresNeeded : [];
  const invalidBenchmarkMetadata = admissions.filter((item) => {
    if (item.benchmarkComparable !== true) return false;
    const cutlines = [item.benchmarkCutline70, item.benchmarkCutline95, item.expectedCutline, item.expectedCutline70, item.expectedCutline95]
      .filter((value): value is number => typeof value === "number");
    return !Number.isInteger(item.benchmarkYear) || !item.benchmarkSourceUrl?.trim() ||
      !/^https?:\/\//i.test(item.benchmarkSourceUrl) ||
      !(typeof item.benchmarkTotalScore === "number" && Number.isFinite(item.benchmarkTotalScore) && item.benchmarkTotalScore > 0) ||
      cutlines.length === 0 ||
      cutlines.some((value) => !Number.isFinite(value) || value < 0 || value > (item.benchmarkTotalScore ?? 0));
  });
  // A 70% cutoff is required for the current tier thresholds. 95% cutoffs remain visible as source data,
  // but are never treated as equivalent and cannot increase comparable-benchmark coverage.
  const hasComparableBenchmark70 = (item: typeof admissions[number]) => {
    const cutline = item.benchmarkCutline70 ?? item.expectedCutline70 ?? item.expectedCutline;
    const total = item.benchmarkTotalScore;
    return item.benchmarkComparable === true &&
      item.calculationVerified === true &&
      Number.isInteger(item.benchmarkYear) &&
      Boolean(item.benchmarkSourceUrl?.trim()) &&
      /^https?:\/\//i.test(item.benchmarkSourceUrl ?? "") &&
      typeof total === "number" && Number.isFinite(total) && total > 0 &&
      typeof cutline === "number" && Number.isFinite(cutline) && cutline >= 0 && cutline <= total;
  };
  const missingBenchmark = admissions.filter((item) => !hasComparableBenchmark70(item));
  const unverifiedCalculation = admissions.filter((item) => item.calculationVerified !== true);
  // Every 2027 admission row must explicitly record whether school-violence rules apply.
  // "false" is an explicit reviewed decision; undefined is an unreviewed policy state.
  const untrackedSchoolViolencePolicy = admissions.filter((item) => item.schoolViolencePenaltyRequired == null);
  const missingMethodNotes = admissions.filter((item) => !item.note?.trim());
  const placeholderDepartments = admissions.filter((item) => /대표/.test(item.department));
  // Check raw source rows, not the deduplicated recommendation repository.
  const duplicateIds = sourceAudit.duplicateIds;

  const summarize = (items: typeof admissions) => items.map((item) => ({
    id: item.id,
    university: item.universityName,
    region: item.region,
    department: item.department,
    group: item.group,
  }));

  const integrityErrors = admissions.filter((item) =>
    !item.id || !item.universityId || !item.universityName || !item.department ||
    !TARGET_REGIONS.includes(item.region as (typeof TARGET_REGIONS)[number]) ||
    !GROUPS.includes(item.group),
  );

  const recruitmentTotalsByGroup = Object.fromEntries(
    GROUPS.map((group) => [group, admissions
      .filter((item) => item.group === group)
      .reduce((sum, item) => sum + (item.recruitmentCount ?? 0), 0)]),
  );
  const recruitmentTotal = admissions.reduce((sum, item) => sum + (item.recruitmentCount ?? 0), 0);
  // Evaluation categories are independent flags, not mutually exclusive buckets.
  // Keep them separate so practical/interview recruitment is visible without
  // double-counting it into a fabricated exclusive total.
  const recruitmentByEvaluation = {
    practical: admissions.filter((item) => item.practicalEvaluationRequired === true)
      .reduce((sum, item) => sum + (item.recruitmentCount ?? 0), 0),
    interview: admissions.filter((item) => item.interviewEvaluationRequired === true)
      .reduce((sum, item) => sum + (item.recruitmentCount ?? 0), 0),
    additionalEligibility: admissions.filter((item) => item.additionalEligibilityRequired === true)
      .reduce((sum, item) => sum + (item.recruitmentCount ?? 0), 0),
  };
  const universityCoverage = [...new Map(admissions.map((item) => [item.universityId, item.universityName])).entries()]
    .map(([universityId, universityName]) => {
      const rows = admissions.filter((item) => item.universityId === universityId);
      const recruitmentByGroup = Object.fromEntries(
        GROUPS.map((group) => [group, rows
          .filter((item) => item.group === group)
          .reduce((sum, item) => sum + (item.recruitmentCount ?? 0), 0)]),
      );
      const recruitmentByEvaluation = {
        practical: rows.filter((item) => item.practicalEvaluationRequired === true)
          .reduce((sum, item) => sum + (item.recruitmentCount ?? 0), 0),
        interview: rows.filter((item) => item.interviewEvaluationRequired === true)
          .reduce((sum, item) => sum + (item.recruitmentCount ?? 0), 0),
        additionalEligibility: rows.filter((item) => item.additionalEligibilityRequired === true)
          .reduce((sum, item) => sum + (item.recruitmentCount ?? 0), 0),
      };
      return {
        universityId, universityName, region: rows[0]?.region ?? "", admissions: rows.length,
        departments: new Set(rows.map((item) => item.department)).size,
        withRecruitmentCount: rows.filter((item) => item.recruitmentCount != null).length,
        recruitmentTotal: rows.reduce((sum, item) => sum + (item.recruitmentCount ?? 0), 0),
        recruitmentByGroup,
        recruitmentByEvaluation,
        calculationVerified: rows.filter((item) => item.calculationVerified === true).length,
        benchmarkComparable: rows.filter(hasComparableBenchmark70).length,
      };
    })
    .sort((a, b) => a.region.localeCompare(b.region, "ko") || a.universityName.localeCompare(b.universityName, "ko"));

  return Response.json({
    generatedAt: new Date().toISOString(),
    scope: "2027 정시 / 서울·경기·인천",
    totals: {
      admissions: admissions.length,
      sourceRows: sourceAudit.sourceRows,
      uniqueSourceIds: sourceAudit.uniqueIds,
      universities: new Set(admissions.map((item) => item.universityId)).size,
      byRegion,
      byGroup,
      recruitmentTotal,
      recruitmentTotalsByGroup,
      recruitmentByEvaluation,
    },
    universityCoverage,
    genericSourceUniversitySummary,
    quality: {
      calculationVerified: admissions.length - unverifiedCalculation.length,
      calculationUnverified: unverifiedCalculation.length,
      benchmarkComparable: admissions.filter(hasComparableBenchmark70).length,
      withRecruitmentCount: admissions.length - missingRecruitment.length,
      withSource: admissions.length - missingSource.length,
      requiresPracticalEvaluation: admissions.filter((item) => item.practicalEvaluationRequired === true).length,
      requiresInterviewEvaluation: admissions.filter((item) => item.interviewEvaluationRequired === true).length,
      requiresSchoolViolenceInput: admissions.filter((item) => item.schoolViolencePenaltyRequired === true).length,
      requiresAdditionalEligibilityInput: admissions.filter((item) => item.additionalEligibilityRequired === true).length,
    },
    issueCounts: {
      missingSource: missingSource.length,
      missingRecruitmentCount: missingRecruitment.length,
      zeroRecruitmentCount: zeroRecruitment.length,
      invalidRecruitmentCount: invalidRecruitmentCount.length,
      invalidWeights: invalidWeights.length,
      invalidWeightTotals: invalidWeightTotals.length,
      invalidMultipliers: invalidMultipliers.length,
      invalidConversionTables: invalidConversionTables.length,
      invalidSourceMetadata: invalidSourceMetadata.length,
      genericSourceUrl: genericSourceUrl.length,
      nonUniversitySourceDomain: nonUniversitySourceDomain.length,
      invalidBenchmarkMetadata: invalidBenchmarkMetadata.length,
      missingEnglishGradeTable: missingEnglishTable.length,
      pendingEnglishGradeTable: pendingEnglishTable.length,
      missingKoreanHistoryTable: missingHistoryTable.length,
      missingInquiryConversionTable: missingInquiryConversion.length,
      pendingInquiryConversionTable: pendingInquiryConversion.length,
      missingSubjectMaximumScores: missingMaximumScores.length,
      pendingSubjectMaximumScores: pendingMaximumScores.length,
      missingComparableBenchmark: missingBenchmark.length,
      untrackedSchoolViolencePolicy: untrackedSchoolViolencePolicy.length,
      missingMethodNotes: missingMethodNotes.length,
      placeholderDepartments: placeholderDepartments.length,
      duplicateIds: duplicateIds.length,
      integrityErrors: integrityErrors.length,
    },
    issues: {
      missingSource: summarize(missingSource),
      missingRecruitmentCount: summarize(missingRecruitment),
      zeroRecruitmentCount: summarize(zeroRecruitment),
      invalidRecruitmentCount: summarize(invalidRecruitmentCount),
      invalidWeights: summarize(invalidWeights),
      invalidWeightTotals: summarize(invalidWeightTotals),
      invalidMultipliers: summarize(invalidMultipliers),
      invalidConversionTables: summarize(invalidConversionTables),
      invalidSourceMetadata: summarize(invalidSourceMetadata),
      genericSourceUrl: genericSourceUrl.map((item) => ({ ...summarize([item])[0], sourceUrl: item.sourceUrl })),
      nonUniversitySourceDomain: nonUniversitySourceDomain.map((item) => ({ ...summarize([item])[0], sourceUrl: item.sourceUrl })),
      invalidBenchmarkMetadata: summarize(invalidBenchmarkMetadata),
      missingEnglishGradeTable: summarize(missingEnglishTable),
      pendingEnglishGradeTable: summarize(pendingEnglishTable),
      missingKoreanHistoryTable: summarize(missingHistoryTable),
      missingInquiryConversionTable: summarize(missingInquiryConversion),
      pendingInquiryConversionTable: summarize(pendingInquiryConversion),
      missingSubjectMaximumScores: summarize(missingMaximumScores),
      pendingSubjectMaximumScores: summarize(pendingMaximumScores),
      missingComparableBenchmark: summarize(missingBenchmark),
      untrackedSchoolViolencePolicy: summarize(untrackedSchoolViolencePolicy),
      missingMethodNotes: summarize(missingMethodNotes),
      placeholderDepartments: summarize(placeholderDepartments),
      duplicateIds,
      integrityErrors: summarize(integrityErrors),
    },
  });
}
