import { getRegularAdmissions } from "@/lib/regular/repository";

const TARGET_REGIONS = ["서울", "경기", "인천"] as const;
const GROUPS = ["가", "나", "다"] as const;

export async function GET() {
  const admissions = getRegularAdmissions();
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
  const missingRecruitment = admissions.filter((item) => item.recruitmentCount == null);
  const zeroRecruitment = admissions.filter((item) => item.recruitmentCount === 0);
  const missingEnglishTable = admissions.filter(
    (item) => item.englishWeight > 0 && !item.englishGradeTable,
  );
  const missingHistoryTable = admissions.filter(
    (item) => item.koreanHistoryRequired && !item.koreanHistoryGradePoints,
  );
  const missingInquiryConversion = admissions.filter(
    (item) => item.inquiryConversionRequired && !item.inquiryConversionTable,
  );
  const missingMaximumScores = admissions.filter((item) => {
    if ((item.calculationMode ?? "weighted-average") !== "normalized-standard-sum") return false;
    const metrics = item.subjectMetrics;
    const maxima = item.subjectMaximumScores;
    const koreanNeedsMaximum = (metrics?.korean ?? item.scoreMetric) === "표준점수";
    const mathNeedsMaximum = (metrics?.math ?? item.scoreMetric) === "표준점수";
    const inquiryNeedsMaximum = item.inquiryWeight > 0 &&
      (item.inquiryConversionRequired || (metrics?.inquiry ?? item.scoreMetric) === "표준점수");
    return (koreanNeedsMaximum && !(maxima?.korean && maxima.korean > 0)) ||
      (mathNeedsMaximum && !(maxima?.math && maxima.math > 0)) ||
      (inquiryNeedsMaximum && !(maxima?.inquiry && maxima.inquiry > 0));
  });
  const missingBenchmark = admissions.filter(
    (item) => item.benchmarkComparable !== true ||
      item.calculationVerified !== true ||
      (item.benchmarkCutline70 == null && item.benchmarkCutline95 == null &&
        item.expectedCutline == null && item.expectedCutline70 == null && item.expectedCutline95 == null),
  );
  const unverifiedCalculation = admissions.filter((item) => item.calculationVerified !== true);
  const missingMethodNotes = admissions.filter((item) => !item.note?.trim());
  const duplicateIds = Object.entries(
    admissions.reduce<Record<string, number>>((counts, item) => {
      counts[item.id] = (counts[item.id] ?? 0) + 1;
      return counts;
    }, {}),
  ).filter(([, count]) => count > 1).map(([id, count]) => ({ id, count }));

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

  return Response.json({
    generatedAt: new Date().toISOString(),
    scope: "2027 정시 / 서울·경기·인천",
    totals: {
      admissions: admissions.length,
      universities: new Set(admissions.map((item) => item.universityId)).size,
      byRegion,
      byGroup,
    },
    quality: {
      calculationVerified: admissions.length - unverifiedCalculation.length,
      calculationUnverified: unverifiedCalculation.length,
      benchmarkComparable: admissions.filter((item) =>
        item.benchmarkComparable === true && item.calculationVerified === true &&
        (item.benchmarkCutline70 != null || item.benchmarkCutline95 != null ||
          item.expectedCutline != null || item.expectedCutline70 != null || item.expectedCutline95 != null),
      ).length,
      withRecruitmentCount: admissions.length - missingRecruitment.length,
      withSource: admissions.length - missingSource.length,
    },
    issueCounts: {
      missingSource: missingSource.length,
      missingRecruitmentCount: missingRecruitment.length,
      zeroRecruitmentCount: zeroRecruitment.length,
      invalidRecruitmentCount: invalidRecruitmentCount.length,
      invalidWeights: invalidWeights.length,\n      invalidWeightTotals: invalidWeightTotals.length,
      invalidMultipliers: invalidMultipliers.length,
      invalidConversionTables: invalidConversionTables.length,
      invalidSourceMetadata: invalidSourceMetadata.length,
      missingEnglishGradeTable: missingEnglishTable.length,
      missingKoreanHistoryTable: missingHistoryTable.length,
      missingInquiryConversionTable: missingInquiryConversion.length,
      missingSubjectMaximumScores: missingMaximumScores.length,
      missingComparableBenchmark: missingBenchmark.length,
      missingMethodNotes: missingMethodNotes.length,
      duplicateIds: duplicateIds.length,
      integrityErrors: integrityErrors.length,
    },
    issues: {
      missingSource: summarize(missingSource),
      missingRecruitmentCount: summarize(missingRecruitment),
      zeroRecruitmentCount: summarize(zeroRecruitment),
      invalidRecruitmentCount: summarize(invalidRecruitmentCount),
      invalidWeights: summarize(invalidWeights),\n      invalidWeightTotals: summarize(invalidWeightTotals),
      invalidMultipliers: summarize(invalidMultipliers),
      invalidConversionTables: summarize(invalidConversionTables),
      invalidSourceMetadata: summarize(invalidSourceMetadata),
      missingEnglishGradeTable: summarize(missingEnglishTable),
      missingKoreanHistoryTable: summarize(missingHistoryTable),
      missingInquiryConversionTable: summarize(missingInquiryConversion),
      missingSubjectMaximumScores: summarize(missingMaximumScores),
      missingComparableBenchmark: summarize(missingBenchmark),
      missingMethodNotes: summarize(missingMethodNotes),
      duplicateIds,
      integrityErrors: summarize(integrityErrors),
    },
  });
}
