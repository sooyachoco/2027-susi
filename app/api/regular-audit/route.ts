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
  const missingRecruitment = admissions.filter((item) => item.recruitmentCount == null);
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
      benchmarkComparable: admissions.filter((item) => item.benchmarkComparable === true).length,
      withRecruitmentCount: admissions.length - missingRecruitment.length,
      withSource: admissions.length - missingSource.length,
    },
    issueCounts: {
      missingSource: missingSource.length,
      missingRecruitmentCount: missingRecruitment.length,
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
