import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const enginePath = fileURLToPath(new URL("../lib/regular/engine2027.ts", import.meta.url));
const regularAuditSource = readFileSync(new URL("../app/api/regular-audit/route.ts", import.meta.url), "utf8");
const regularDataSource = readFileSync(new URL("../lib/regular/data2027.ts", import.meta.url), "utf8");
assert.match(regularDataSource, /schoolViolencePenaltyRequired: true/);
assert.match(regularDataSource, /\[전공개방\] 창의ICT공과대학/);
assert.match(regularDataSource, /id: "cau-seoul-ga-psychology"[\s\S]*?recruitmentCount: 19/);
assert.match(regularDataSource, /id: "cau-seoul-na-industrial-security"[\s\S]*?recruitmentCount: 28/);
assert.equal((regularDataSource.match(/id: "cau-seoul-/g) ?? []).length, 3);
assert.equal((regularDataSource.match(/id: "uos-seoul-/g) ?? []).length, 6);
assert.match(regularDataSource, /id: "uos-seoul-na-humanities2"[\s\S]*?group: "나"/);
assert.match(regularDataSource, /id: "uos-seoul-ga-natural"[\s\S]*?recruitmentCount: 22/);
assert.match(regularDataSource, /id: "uos-seoul-na-natural"[\s\S]*?recruitmentCount: 54[\s\S]*?schoolViolencePenaltyRequired: true/);
assert.match(regularDataSource, /id: "uos-seoul-na-business"[\s\S]*?recruitmentCount: 67/);
assert.match(regularDataSource, /id: "uos-seoul-na-computer-science"[\s\S]*?recruitmentCount: 20/);
const seoultechSource = readFileSync(new URL("../lib/regular/data2027-seoultech.ts", import.meta.url), "utf8");
assert.match(seoultechSource, /서울과학기술대학교/);
assert.match(seoultechSource, /calculationVerified: false/);
assert.match(seoultechSource, /practicalEvaluationRequired: practical/);
assert.equal((seoultechSource.match(/"(?:ga|na|da)-[a-z-]+"/g) ?? []).length, 49);
assert.match(seoultechSource, /koreanHistoryRequired: true/);
assert.match(seoultechSource, /0\.07/);
const repositorySource = readFileSync(new URL("../lib/regular/repository.ts", import.meta.url), "utf8");
assert.match(repositorySource, /getRegularAdmissionSourceAudit/);
assert.match(repositorySource, /sourceRows\.length/);
assert.match(repositorySource, /duplicateIds: Object\.entries\(counts\)/);
assert.match(regularAuditSource, /getRegularAdmissionSourceAudit/);
const recommendationSource = readFileSync(new URL("../lib/regular/recommend.ts", import.meta.url), "utf8");
assert.match(recommendationSource, /전년도 환산식 변경으로 기준점 비교 불가/);
assert.match(recommendationSource, /seenUniversitiesAcrossGroups/);
assert.match(recommendationSource, /seenPortfolioUniversities/);
const portfolioSource = readFileSync(new URL("../lib/regular/portfolio.ts", import.meta.url), "utf8");
assert.match(portfolioSource, /comparableUniversitiesByGroup\.every\(\(count\) => count >= 3\)/);
assert.match(regularAuditSource, /mode === "weighted-sum-with-additive-bonuses"\) return false/);
assert.match(regularAuditSource, /invalidBenchmarkMetadata/);
assert.match(regularAuditSource, /placeholderDepartments/);
assert.match(regularAuditSource, /\/대표\//);
const source = readFileSync(enginePath, "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const sandbox = { exports: {}, require };
vm.runInNewContext(compiled, sandbox, { filename: "engine2027.cjs" });
const { calculateRegularAdmission } = sandbox.exports;

// Exercise the actual recommendation function with synthetic admissions:
// 6 universities per group, each with 2 departments. Results must retain 5
// distinct universities per group rather than allowing one university to fill all slots.
const strategyPath = fileURLToPath(new URL("../lib/regular/strategy2027.ts", import.meta.url));
const recommendationPath = fileURLToPath(new URL("../lib/regular/recommend.ts", import.meta.url));
function loadTsModule(path, modules = {}) {
  const compiledModule = ts.transpileModule(readFileSync(path, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const moduleSandbox = { exports: {}, require: (name) => modules[name] ?? require(name) };
  vm.runInNewContext(compiledModule, moduleSandbox, { filename: path });
  return moduleSandbox.exports;
}
const strategyModule = loadTsModule(strategyPath, { "./engine2027": sandbox.exports });
const recommendationModule = loadTsModule(recommendationPath, {
  "./engine2027": sandbox.exports,
  "./strategy2027": strategyModule,
});

assert.equal(recommendationModule.majorFit("컴퓨터공학", { department: "컴퓨터공학부", majorGroup: "자연·공학" }), 10);
assert.equal(recommendationModule.majorFit("심리학", { department: "심리학과", majorGroup: "인문·사회" }), 10);
assert.equal(recommendationModule.majorFit("경영학", { department: "경영학부", majorGroup: "경영·경제" }), 10);
assert.equal(recommendationModule.majorFit("심리학", { department: "기계공학과", majorGroup: "자연·공학" }), 0);
assert.equal(recommendationModule.majorFit("AI", { department: "인공지능학과", majorGroup: "자연·공학" }), 9);
const syntheticAdmissions = ["가", "나", "다"].flatMap((group) =>
  Array.from({ length: 6 }, (_, universityIndex) =>
    Array.from({ length: 2 }, (_, departmentIndex) => ({
      id: `synthetic-${group}-${universityIndex}-${departmentIndex}`,
      universityId: `synthetic-university-${group}-${universityIndex}`,
      universityName: `테스트대학 ${group}-${universityIndex}`,
      region: "서울",
      department: `테스트학과 ${departmentIndex}`,
      majorGroup: "전체",
      group,
      recruitmentCount: 10,
      scoreMetric: "백분위",
      koreanWeight: 30,
      mathWeight: 30,
      englishWeight: 20,
      inquiryWeight: 20,
      inquirySubjects: 2,
      calculationVerified: false,
    })),
  ).flat(),
);
const syntheticProfile = {
  desiredMajor: "경영학",
  koreanStandard: 130, koreanPercentile: 90,
  mathStandard: 130, mathPercentile: 90,
  inquiry1Standard: 60, inquiry2Standard: 60,
  inquiry1Percentile: 90, inquiry2Percentile: 90,
  englishGrade: 2, koreanHistoryGrade: 2,
  mathChoice: "미적분", inquiryType: "사탐",
  inquiry1Type: "사탐", inquiry2Type: "사탐",
  inquiry1ScienceLevel: "미선택", inquiry2ScienceLevel: "미선택",
  unexcusedAbsenceDays: null,
};
const syntheticRecommendations = recommendationModule.recommendRegular(syntheticProfile, syntheticAdmissions);
assert.equal(syntheticRecommendations.length, 15);
const placeholderAdmissions = [
  ...syntheticAdmissions,
  { ...syntheticAdmissions[0], id: "synthetic-placeholder", universityId: "placeholder-university", universityName: "임시대학", department: "인문계열 대표" },
];
const placeholderRecommendations = recommendationModule.recommendRegular(syntheticProfile, placeholderAdmissions);
assert.equal(
  placeholderRecommendations.some((item) => item.admissionId === "synthetic-placeholder"),
  false,
  "placeholder department labels must never be shown as real admission recommendations",
);
for (const group of ["가", "나", "다"]) {
  const groupRecommendations = syntheticRecommendations.filter((item) => item.group === group);
  assert.equal(groupRecommendations.length, 5);
  assert.equal(new Set(groupRecommendations.map((item) => item.admissionId.split("-").slice(0, 3).join("-") + "-" + item.admissionId.split("-")[2])).size, 5);
  assert.equal(new Set(groupRecommendations.map((item) => item.universityName)).size, 5);
}

const crossGroupAdmissions = syntheticAdmissions.map((admission) =>
  admission.id.endsWith("-0")
    ? { ...admission, universityId: "shared-university", universityName: "공통대학" }
    : admission,
);
const crossGroupRecommendations = recommendationModule.recommendRegular(syntheticProfile, crossGroupAdmissions);
assert.equal(crossGroupRecommendations.length, 15);
assert.equal(
  crossGroupRecommendations.filter((item) => item.universityName === "공통대학").length,
  1,
  "one university must not occupy recommendation slots in multiple admission groups",
);
assert.equal(
  new Set(crossGroupRecommendations.map((item) => item.universityName)).size,
  crossGroupRecommendations.length,
  "the displayed shortlist must contain globally distinct universities",
);

const cauNatural = {
  id: "cau-engine-smoke",
  universityId: "cau",
  universityName: "중앙대학교",
  region: "서울",
  department: "자연계열 예시",
  majorGroup: "자연·공학",
  group: "가",
  scoreMetric: "표준점수",
  subjectMetrics: { korean: "표준점수", math: "표준점수", inquiry: "백분위" },
  koreanWeight: 30,
  mathWeight: 35,
  englishWeight: 0,
  inquiryWeight: 35,
  inquirySubjects: 2,
  inquiryAggregation: "sum",
  calculationMode: "weighted-sum-with-additive-bonuses",
  subjectScoreMultiplier: 5,
  finalScoreMultiplier: 0.9,
  inquiryConversionRequired: true,
  inquiryConversionTable: { "96": 65.34, "99": 67.24 },
  inquiryTypeBonusRequired: true,
  inquiryTypeBonusRate: { 사탐: 0, 과탐: 0.05, 직탐: 0 },
  englishGradeTable: { 1: 100, 2: 98, 3: 95, 4: 92, 5: 86, 6: 75, 7: 64, 8: 58, 9: 50 },
  koreanHistoryRequired: true,
  koreanHistoryGradePoints: { 1: 10, 2: 10, 3: 10, 4: 10, 5: 9.6, 6: 9.2, 7: 8.8, 8: 8.4, 9: 8 },
  studentRecordWeight: 10,
  attendanceScoreByAbsenceDays: [
    { maxDays: 4, score: 100 },
    { maxDays: 9, score: 99.5 },
    { maxDays: 365, score: 99 },
  ],
  calculationVerified: true,
};

const sampleScore = {
  korean: 134,
  koreanPercentile: 99,
  math: 136,
  mathPercentile: 98,
  englishGrade: 2,
  inquiry1: 64,
  inquiry1Percentile: 96,
  inquiry2: 67,
  inquiry2Percentile: 99,
  koreanHistoryGrade: 5,
  mathType: "미적분",
  inquiryType: "과탐",
  unexcusedAbsenceDays: 4,
};

const result = calculateRegularAdmission(cauNatural, sampleScore);
assert.equal(result.calculationVerified, true);
assert.equal(result.missingRules.length, 0);
assert.ok(Math.abs(result.totalScore - 811.194175) < 0.000001);
assert.ok(result.appliedComponents.includes("미인정 결석 일수 출결 환산"));

const cauWithViolenceRequirement = calculateRegularAdmission(
  { ...cauNatural, schoolViolencePenaltyRequired: true, schoolViolencePenaltyNote: "학교폭력 조치사항 입력 필요" },
  sampleScore,
);
assert.equal(cauWithViolenceRequirement.calculationVerified, false);
assert.ok(cauWithViolenceRequirement.missingRules.some((rule) => rule.includes("학교폭력")));

const missingTable = calculateRegularAdmission(
  { ...cauNatural, inquiryConversionTable: undefined },
  sampleScore,
);
assert.equal(missingTable.calculationVerified, false);
assert.ok(missingTable.missingRules.some((rule) => rule.includes("탐구 변환표준점수표")));

const missingAttendance = calculateRegularAdmission(
  { ...cauNatural, attendanceScoreByAbsenceDays: undefined },
  { ...sampleScore, unexcusedAbsenceDays: undefined },
);
assert.equal(missingAttendance.calculationVerified, false);
assert.ok(missingAttendance.missingRules.some((rule) => rule.includes("출결")));

const mixedInquiry = calculateRegularAdmission(
  cauNatural,
  { ...sampleScore, inquiryType: "혼합" },
);
assert.equal(mixedInquiry.calculationVerified, false);
assert.ok(mixedInquiry.missingRules.some((rule) => rule.includes("과목별")));


const snuGeneral = {
  ...cauNatural,
  id: "snu-engine-smoke",
  universityName: "서울대학교",
  koreanWeight: 100,
  mathWeight: 120,
  inquiryWeight: 80,
  inquiryAggregation: "sum",
  subjectMetrics: { korean: "표준점수", math: "표준점수", inquiry: "표준점수" },
  calculationMode: "weighted-sum-with-additive-bonuses",
  subjectScoreMultiplier: 1,
  finalScoreMultiplier: 1,
  englishGradeTable: { 1: 0, 2: -0.5, 3: -2, 4: -4, 5: -6, 6: -8, 7: -10, 8: -12, 9: -14 },
  koreanHistoryGradePoints: { 1: 0, 2: 0, 3: 0, 4: -0.4, 5: -0.8, 6: -1.2, 7: -1.6, 8: -2, 9: -2.4 },
  inquiryConversionRequired: false,
  inquiryConversionTable: undefined,
  inquiryTypeBonusRequired: false,
  inquiryTypeBonusRate: undefined,
  koreanHistoryRequired: true,
  attendanceScoreByAbsenceDays: undefined,
  studentRecordWeight: 20,
  curriculumEvaluationRequired: true,
  cohortNormalizationRequired: true,
  scienceCombinationAdjustmentRequired: true,
  scienceCombinationBonusPoints: { "I+I": 0, "I+II": 3, "II+II": 5 },
};
const snuResult = calculateRegularAdmission(snuGeneral, sampleScore);
assert.ok(Math.abs(snuResult.baseScore - 402.0) < 0.000001);
assert.equal(snuResult.calculationVerified, false);
assert.ok(snuResult.missingRules.some((rule) => rule.includes("최고·최저점")));
assert.ok(snuResult.missingRules.some((rule) => rule.includes("교과평가")));
assert.ok(snuResult.missingRules.some((rule) => rule.includes("과학탐구")));

const snuWithScienceLevels = calculateRegularAdmission(snuGeneral, {
  ...sampleScore,
  inquiry1ScienceLevel: "I",
  inquiry2ScienceLevel: "II",
});
assert.ok(Math.abs(snuWithScienceLevels.totalScore - 403.7) < 0.000001);
assert.ok(snuWithScienceLevels.appliedComponents.includes("과학탐구 조합별 조정점수"));
assert.ok(!snuWithScienceLevels.missingRules.some((rule) => rule.includes("과학탐구")));


const koreaNatural = {
  ...cauNatural,
  id: "korea-natural-smoke",
  koreanWeight: 100,
  mathWeight: 120,
  inquiryWeight: 100,
  subjectScoreMultiplier: 1,
  finalScoreMultiplier: 1000 / 640,
  englishGradeTable: { 1: 0, 2: -3, 3: -6, 4: -9, 5: -12, 6: -15, 7: -18, 8: -21, 9: -24 },
  koreanHistoryGradePoints: { 1: 0, 2: 0, 3: 0, 4: 0, 5: -0.2, 6: -0.4, 7: -0.6, 8: -0.8, 9: -2 },
  gradeAdjustmentsAfterFinalMultiplier: true,
  studentRecordWeight: undefined,
  curriculumEvaluationRequired: false,
  scienceCombinationAdjustmentRequired: false,
  inquiryTypeBonusRate: { 사탐: 0, 과탐: 0.03, 직탐: 0 },
};
const koreaResult = calculateRegularAdmission(koreaNatural, sampleScore);
const koreaExpectedBase = (134 + 136 * 1.2 + (65.34 + 67.24) * 1.03) * (1000 / 640);
assert.ok(Math.abs(koreaResult.baseScore - koreaExpectedBase) < 0.000001);
assert.ok(Math.abs(koreaResult.totalScore - (koreaExpectedBase - 3.2)) < 0.000001);
assert.ok(koreaResult.appliedComponents.includes("영어 등급 가산점"));

const yonseiType1 = {
  ...koreaNatural,
  id: "yonsei-type1-smoke",
  koreanWeight: 150,
  mathWeight: 100,
  inquiryWeight: 100,
  finalScoreMultiplier: 950 / 800,
  gradeAdjustmentsAfterFinalMultiplier: false,
  inquiryTypeBonusRate: { 사탐: 0.03, 과탐: 0, 직탐: 0 },
  englishGradeTable: { 1: 100, 2: 95, 3: 87.5, 4: 75, 5: 60, 6: 40, 7: 25, 8: 12.5, 9: 5 },
  koreanHistoryGradePoints: { 1: 0, 2: 0, 3: 0, 4: 0, 5: -0.2, 6: -0.4, 7: -0.6, 8: -0.8, 9: -1 },
  curriculumEvaluationRequired: true,
  studentRecordWeight: 50,
  scienceCombinationAdjustmentRequired: false,
};
const yonseiResult = calculateRegularAdmission(yonseiType1, {
  ...sampleScore,
  inquiry1Type: "사탐",
  inquiry2Type: "사탐",
});
const yonseiExpectedRaw = 134 * 1.5 + 136 + (65.34 + 67.24) * 1.03 + 95 - 0.2;
assert.ok(Math.abs(yonseiResult.totalScore - yonseiExpectedRaw * (950 / 800)) < 0.000001);
assert.ok(yonseiResult.missingRules.some((rule) => rule.includes("교과평가")));
assert.equal(yonseiResult.calculationVerified, false);


const sogang = {
  ...cauNatural,
  id: "sogang-engine-smoke",
  koreanWeight: 110,
  mathWeight: 130,
  inquiryWeight: 60,
  englishWeight: 0,
  inquiryAggregation: "sum",
  languageMathMode: "고득점 우선",
  subjectScoreMultiplier: 1,
  finalScoreMultiplier: 1,
  inquiryConversionTable: { "96": 64.3, "99": 67.4 },
  englishGradeTable: { 1: 100, 2: 99.5, 3: 98.5, 4: 97, 5: 95, 6: 92.5, 7: 89.5, 8: 86, 9: 82 },
  koreanHistoryGradePoints: { 1: 10, 2: 10, 3: 10, 4: 10, 5: 9.5, 6: 9, 7: 8.5, 8: 8, 9: 7.5 },
  inquiryTypeBonusRequired: false,
  studentRecordWeight: 0,
  curriculumEvaluationRequired: false,
  scienceCombinationAdjustmentRequired: false,
};
const sogangResult = calculateRegularAdmission(sogang, sampleScore);
const sogangExpected = 136 * 1.3 + 134 * 1.1 + (64.3 + 67.4) * 0.6 + 99.5 + 9.5;
assert.ok(Math.abs(sogangResult.totalScore - sogangExpected) < 0.000001);
assert.equal(sogangResult.calculationVerified, true);

const ewhaPending = calculateRegularAdmission({
  ...sogang,
  id: "ewha-normalized-smoke",
  calculationMode: "normalized-standard-sum",
  koreanWeight: 30,
  mathWeight: 30,
  englishWeight: 20,
  inquiryWeight: 20,
  inquiryConversionRequired: true,
  inquiryConversionTable: undefined,
  subjectMaximumScores: undefined,
  englishGradeTable: { 1: 100, 2: 98, 3: 94, 4: 88, 5: 84, 6: 80, 7: 76, 8: 72, 9: 68 },
}, sampleScore);
assert.equal(ewhaPending.calculationVerified, false);
assert.ok(ewhaPending.missingRules.some((rule) => rule.includes("최고점")));
assert.ok(ewhaPending.missingRules.some((rule) => rule.includes("탐구 변환표준점수표")));


const ewhaComplete = calculateRegularAdmission({
  ...sogang,
  id: "ewha-normalized-complete-smoke",
  calculationMode: "normalized-standard-sum",
  koreanWeight: 30,
  mathWeight: 30,
  englishWeight: 20,
  inquiryWeight: 20,
  inquiryConversionRequired: true,
  inquiryConversionTable: { "96": 64.3, "99": 67.4 },
  inquiryTypeBonusRequired: false,
  subjectMaximumScores: { korean: 150, math: 150, inquiry: 140 },
  finalScoreMultiplier: 1000,
  gradeAdjustmentsAfterFinalMultiplier: true,
  englishGradeTable: { 1: 100, 2: 98, 3: 94, 4: 88, 5: 84, 6: 80, 7: 76, 8: 72, 9: 68 },
  koreanHistoryRequired: true,
  koreanHistoryGradePoints: { 1: 10, 2: 10, 3: 10, 4: 9.8, 5: 9.6, 6: 9.4, 7: 9.2, 8: 9, 9: 8.5 },
  studentRecordWeight: 0,
  curriculumEvaluationRequired: false,
  calculationVerified: true,
}, sampleScore);
const ewhaExpectedBase = (
  (134 / 150 * 30) +
  (136 / 150 * 30) +
  ((64.3 + 67.4) / 140 * 20) +
  (98 / 100 * 20)
) * 10;
assert.ok(Math.abs(ewhaComplete.baseScore - ewhaExpectedBase) < 0.000001);
assert.ok(Math.abs(ewhaComplete.totalScore - (ewhaExpectedBase + 9.6)) < 0.000001);
assert.equal(ewhaComplete.calculationVerified, true);


const khuNatural = {
  ...cauNatural,
  id: "khu-natural-smoke",
  koreanWeight: 25,
  mathWeight: 40,
  inquiryWeight: 35,
  inquiryAggregation: "sum",
  subjectScoreMultiplier: 3,
  finalScoreMultiplier: 1,
  gradeAdjustmentsAfterFinalMultiplier: true,
  inquiryConversionTable: { "96": 65.34, "99": 67.24 },
  inquiryTypeBonusRequired: true,
  inquiryTypeBonusRate: { 사탐: 0, 과탐: 0, 직탐: 0 },
  inquiryTypeBonusPerSubject: { 과탐: 4 },
  englishGradeTable: { 1: 0, 2: 0, 3: -2, 4: -4, 5: -8, 6: -12, 7: -18, 8: -24, 9: -30 },
  koreanHistoryGradePoints: { 1: 0, 2: 0, 3: 0, 4: 0, 5: -2, 6: -4, 7: -8, 8: -14, 9: -20 },
  studentRecordWeight: 0,
  curriculumEvaluationRequired: false,
  scienceCombinationAdjustmentRequired: false,
};
const khuResult = calculateRegularAdmission(khuNatural, sampleScore);
const khuExpected = (134 * 0.25 + 136 * 0.4 + (65.34 + 4 + 67.24 + 4) * 0.35) * 3 - 2;
assert.ok(Math.abs(khuResult.totalScore - khuExpected) < 0.000001);
assert.equal(khuResult.calculationVerified, true);
assert.ok(khuResult.appliedComponents.includes("탐구 과목별 선택유형 가산율·과목별 고정 가산점"));


// Sookmyung 2027 normalized formula, subject-level inquiry bonus, and official history points.
const sookmyung = {
  id: "sookmyung-humanities-smoke",
  universityName: "숙명여자대학교",
  scoreMetric: "표준점수",
  calculationMode: "normalized-standard-sum",
  subjectScoreMultiplier: 1,
  calculationVerified: true,
  koreanWeight: 35,
  mathWeight: 25,
  englishWeight: 15,
  inquiryWeight: 25,
  inquirySubjects: 2,
  inquiryAggregation: "sum",
  inquiryConversionTable: { "96": 64.3, "99": 67.4 },
  subjectMaximumScores: { korean: 150, math: 150, inquiry: 140 },
  inquiryTypeBonusRequired: true,
  inquiryTypeBonusRate: { 사탐: 0.03, 과탐: 0, 직탐: 0 },
  englishGradeTable: { 1: 100, 2: 98, 3: 94, 4: 88, 5: 80, 6: 70, 7: 60, 8: 40, 9: 20 },
  koreanHistoryRequired: true,
  koreanHistoryGradePoints: { 1: 3, 2: 3, 3: 3, 4: 3, 5: 2, 6: 2, 7: 1, 8: 1, 9: 1 },
  finalScoreMultiplier: 1000,
  gradeAdjustmentsAfterFinalMultiplier: true,
  studentRecordWeight: 0,
  curriculumEvaluationRequired: false,
};
const sookmyungResult = calculateRegularAdmission(sookmyung, {
  ...sampleScore, inquiry1Type: "사탐", inquiry2Type: "사탐", englishGrade: 2, koreanHistoryGrade: 5,
});
const sookmyungExpected = (
  (134 / 150 * 35) +
  (136 / 150 * 25) +
  (98 / 100 * 15) +
  ((64.3 * 1.03 + 67.4 * 1.03) / 140 * 25)
) * 10 + 2;
assert.ok(Math.abs(sookmyungResult.totalScore - sookmyungExpected) < 0.000001);
assert.equal(sookmyungResult.calculationVerified, true);
const sookmyungNatural = calculateRegularAdmission({
  ...sookmyung, inquiryTypeBonusRate: { 사탐: 0, 과탐: 0.03, 직탐: 0 },
}, { ...sampleScore, inquiry1Type: "과탐", inquiry2Type: "과탐" });
assert.equal(sookmyungNatural.calculationVerified, true);


// 2027 normalized formulas: Konkuk A/B, Dongguk math/science bonus, Kookmin subject bonuses.
const normFixture = {
  id: "normalized-fixture", universityName: "test", region: "서울", department: "test", majorGroup: "전체", group: "가",
  scoreMetric: "표준점수", calculationMode: "normalized-standard-sum",
  subjectMaximumScores: { korean: 200, math: 200, inquiry: 200 }, finalScoreMultiplier: 1000,
  koreanWeight: 40, mathWeight: 30, englishWeight: 10, inquiryWeight: 20, inquirySubjects: 2, inquiryAggregation: "sum",
  inquiryConversionRequired: false, englishGradeTable: { 1: 100, 2: 98.5, 3: 97, 4: 95, 5: 92.5, 6: 90, 7: 85, 8: 80, 9: 75 },
  koreanHistoryRequired: true, koreanHistoryGradePoints: { 1: 0, 2: 0, 3: 0, 4: 0, 5: -1, 6: -1.75, 7: -3, 8: -4.25, 9: -5 },
  gradeAdjustmentsAfterFinalMultiplier: true, calculationVerified: true,
};
const konkukA = calculateRegularAdmission({ ...normFixture }, { ...sampleScore, englishGrade: 2, koreanHistoryGrade: 5 });
const konkukB = calculateRegularAdmission({ ...normFixture, koreanWeight: 30, mathWeight: 40 }, { ...sampleScore, englishGrade: 2, koreanHistoryGrade: 5 });
const konkukFree = calculateRegularAdmission({ ...normFixture, languageMathMode: "고득점 우선" }, { ...sampleScore, englishGrade: 2, koreanHistoryGrade: 5 });
assert.equal(konkukFree.baseScore, Math.max(konkukA.baseScore, konkukB.baseScore));
assert.equal(konkukFree.calculationVerified, true);

const donggukNatural = calculateRegularAdmission({
  ...normFixture, koreanWeight: 25, mathWeight: 35, englishWeight: 15, inquiryWeight: 25,
  inquiryConversionRequired: true, inquiryConversionTable: { "96": 65, "99": 67 },
  mathChoiceBonusRequired: true, mathChoiceBonusRate: { 미적분: 0.03, 기하: 0.03, 확률과통계: 0 },
  inquiryTypeBonusRequired: true, inquiryTypeBonusRate: { 사탐: 0, 과탐: 0.03, 직탐: 0 },
  englishGradeTable: { 1: 100, 2: 99.5, 3: 98.5, 4: 95, 5: 90, 6: 70, 7: 45, 8: 10, 9: 0 },
  koreanHistoryGradePoints: { 1: 0, 2: 0, 3: 0, 4: 0, 5: -2, 6: -4, 7: -6, 8: -8, 9: -10 },
}, { ...sampleScore, mathType: "미적분", inquiry1Type: "과탐", inquiry2Type: "과탐", englishGrade: 2, koreanHistoryGrade: 5 });
assert.equal(donggukNatural.calculationVerified, true);
assert.ok(donggukNatural.appliedComponents.includes("수학 선택과목 표준점수 가산율"));

const kookminNatural = calculateRegularAdmission({
  ...normFixture, koreanWeight: 30, mathWeight: 40, englishWeight: 10, inquiryWeight: 20,
  mathChoiceBonusRequired: true, mathChoiceBonusRate: { 미적분: 0.05, 기하: 0.05, 확률과통계: 0 },
  inquiryTypeBonusRequired: true, inquiryTypeBonusRate: { 사탐: 0, 과탐: 0.05, 직탐: 0 },
}, { ...sampleScore, mathType: "미적분", inquiry1Type: "과탐", inquiry2Type: "과탐", englishGrade: 2, koreanHistoryGrade: 5 });
assert.equal(kookminNatural.calculationVerified, true);

// UOS inquiry bonus applies only when both inquiry subjects are of the same qualifying type.
const uosSame = calculateRegularAdmission({
  ...normFixture, inquiryTypeBonusRequired: true, inquiryTypeBonusRate: { 사탐: 0.03, 과탐: 0, 직탐: 0 },
  inquiryBonusRequiresSameType: "사탐", subjectMaximumScores: { korean: 200, math: 200, inquiry: 200 },
}, { ...sampleScore, inquiry1Type: "사탐", inquiry2Type: "사탐", englishGrade: 2, koreanHistoryGrade: 5 });
const uosMixed = calculateRegularAdmission({
  ...normFixture, inquiryTypeBonusRequired: true, inquiryTypeBonusRate: { 사탐: 0.03, 과탐: 0, 직탐: 0 },
  inquiryBonusRequiresSameType: "사탐", subjectMaximumScores: { korean: 200, math: 200, inquiry: 200 },
}, { ...sampleScore, inquiry1Type: "사탐", inquiry2Type: "과탐", englishGrade: 2, koreanHistoryGrade: 5 });
assert.ok(uosSame.baseScore > uosMixed.baseScore);
const uosUnknown = calculateRegularAdmission({
  ...normFixture, inquiryTypeBonusRequired: true, inquiryTypeBonusRate: { 사탐: 0.03, 과탐: 0, 직탐: 0 },
  inquiryBonusRequiresSameType: "사탐",
}, { ...sampleScore, inquiryType: "혼합", englishGrade: 2, koreanHistoryGrade: 5 });
assert.equal(uosUnknown.calculationVerified, false);


// 2027 Sejong, Kwangwoon, Soongsil and Dankook formula fixtures.
const sejongNatural = calculateRegularAdmission({
  ...normFixture, koreanWeight: 20, mathWeight: 35, englishWeight: 20, inquiryWeight: 25,
  mathChoiceBonusRequired: true, mathChoiceBonusRate: { 미적분: 0.05, 기하: 0.05, 확률과통계: 0 },
  inquiryTypeBonusRequired: true, inquiryTypeBonusRate: { 사탐: 0, 과탐: 0.05, 직탐: 0 },
  englishGradeTable: { 1: 100, 2: 99, 3: 98, 4: 97, 5: 85, 6: 75, 7: 60, 8: 50, 9: 0 },
  koreanHistoryGradePoints: { 1: 10, 2: 10, 3: 10, 4: 9.8, 5: 9.6, 6: 9.4, 7: 9.2, 8: 9, 9: 8.8 },
}, { ...sampleScore, mathType: "미적분", inquiry1Type: "과탐", inquiry2Type: "과탐", englishGrade: 2, koreanHistoryGrade: 5 });
assert.equal(sejongNatural.calculationVerified, true);

const kwangwoonNatural = calculateRegularAdmission({
  ...normFixture, koreanWeight: 20, mathWeight: 35, englishWeight: 20, inquiryWeight: 25,
  mathChoiceBonusRequired: true, mathChoiceBonusRate: { 미적분: 0.03, 기하: 0.03, 확률과통계: 0 },
  inquiryTypeBonusRequired: true, inquiryTypeBonusRate: { 사탐: 0, 과탐: 0.03, 직탐: 0 },
  englishGradeTable: { 1: 100, 2: 99, 3: 97.5, 4: 95, 5: 91, 6: 85, 7: 79, 8: 73, 9: 0 },
  koreanHistoryGradePoints: { 1: 10, 2: 10, 3: 10, 4: 10, 5: 9.8, 6: 9.6, 7: 9.4, 8: 9.2, 9: 9 },
}, { ...sampleScore, mathType: "기하", inquiry1Type: "과탐", inquiry2Type: "과탐", englishGrade: 2, koreanHistoryGrade: 5 });
assert.equal(kwangwoonNatural.calculationVerified, true);

const soongsilNatural = calculateRegularAdmission({
  ...normFixture, koreanWeight: 20, mathWeight: 35, englishWeight: 15, inquiryWeight: 30,
  mathChoiceBonusRequired: true, mathChoiceBonusRate: { 미적분: 0.07, 기하: 0.07, 확률과통계: 0 },
  inquiryTypeBonusRequired: true, inquiryTypeBonusRate: { 사탐: 0, 과탐: 0.03, 직탐: 0 },
  englishGradeTable: { 1: 100, 2: 100, 3: 98.6667, 4: 96.6667, 5: 80, 6: 72, 7: 60, 8: 36, 9: 0 },
  koreanHistoryGradePoints: { 1: 0, 2: 0, 3: 0, 4: 0, 5: -2, 6: -2.5, 7: -3, 8: -3.5, 9: -4 },
}, { ...sampleScore, mathType: "미적분", inquiry1Type: "과탐", inquiry2Type: "과탐", englishGrade: 2, koreanHistoryGrade: 5 });
assert.equal(soongsilNatural.calculationVerified, true);

const dankookNatural = calculateRegularAdmission({
  ...normFixture, scoreMetric: "백분위", subjectMetrics: { korean: "백분위", math: "백분위", inquiry: "백분위" },
  koreanWeight: 20, mathWeight: 35, englishWeight: 20, inquiryWeight: 25,
  subjectMaximumScores: { korean: 100, math: 100, inquiry: 100 }, inquiryConversionRequired: false,
  inquiryAggregation: "mean",
  mathChoiceBonusRequired: true, mathChoiceBonusRate: { 미적분: 0.05, 기하: 0.05, 확률과통계: 0 },
  inquiryTypeBonusRequired: true, inquiryTypeBonusRate: { 사탐: 0, 과탐: 0.05, 직탐: 0 },
  englishGradeTable: { 1: 100, 2: 98, 3: 95, 4: 85, 5: 70, 6: 40, 7: 15, 8: 5, 9: 0 },
  koreanHistoryGradePoints: { 1: 5, 2: 5, 3: 5, 4: 5, 5: 4, 6: 3, 7: 2, 8: 1, 9: 0 },
}, { ...sampleScore, mathType: "미적분", inquiry1Type: "과탐", inquiry2Type: "과탐", englishGrade: 2, koreanHistoryGrade: 5 });
assert.equal(dankookNatural.calculationVerified, true);


// 2027 Gachon, Kyonggi, Myongji and Sangmyung percentiles and bonus fixtures.
const gachonGeneral = calculateRegularAdmission({
  ...normFixture, scoreMetric: "백분위", subjectMetrics: { korean: "백분위", math: "백분위", inquiry: "백분위" },
  subjectMaximumScores: { korean: 100, math: 100, inquiry: 100 },
  koreanWeight: 40, mathWeight: 30, englishWeight: 20, inquiryWeight: 10, inquirySubjects: 1,
  languageMathMode: "고득점 우선", englishInquiryMode: "고득점 우선",
  englishGradeTable: { 1: 98, 2: 95, 3: 92, 4: 86, 5: 80, 6: 60, 7: 50, 8: 40, 9: 30 },
  koreanHistoryRequired: false,
}, { ...sampleScore, englishGrade: 2 });
assert.equal(gachonGeneral.calculationVerified, true);
assert.ok(gachonGeneral.appliedComponents.includes("영어·탐구 고득점 영역 가중치 선택"));

const kyonggiHumanities = calculateRegularAdmission({
  ...normFixture, scoreMetric: "백분위", subjectMetrics: { korean: "백분위", math: "백분위", inquiry: "백분위" },
  subjectMaximumScores: { korean: 100, math: 100, inquiry: 100 },
  koreanWeight: 35, mathWeight: 30, englishWeight: 20, inquiryWeight: 15, inquirySubjects: 1,
  englishGradeTable: { 1: 100, 2: 100, 3: 96, 4: 92, 5: 80, 6: 70, 7: 60, 8: 50, 9: 0 },
  koreanHistoryGradePoints: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: -0.5, 7: -0.5, 8: -1, 9: -1 },
}, { ...sampleScore, englishGrade: 2, koreanHistoryGrade: 6 });
assert.equal(kyonggiHumanities.calculationVerified, true);

const myongjiNatural = calculateRegularAdmission({
  ...normFixture, scoreMetric: "백분위", subjectMetrics: { korean: "백분위", math: "백분위", inquiry: "백분위" },
  subjectMaximumScores: { korean: 100, math: 100, inquiry: 100 },
  koreanWeight: 25, mathWeight: 35, englishWeight: 20, inquiryWeight: 20, inquirySubjects: 1,
  inquiryTypeBonusRequired: true, inquiryTypeBonusRate: { 사탐: 0, 과탐: 0.1, 직탐: 0 },
  englishGradeTable: { 1: 100, 2: 98, 3: 96, 4: 90, 5: 80, 6: 60, 7: 40, 8: 20, 9: 0 },
  koreanHistoryGradePoints: { 1: 3, 2: 2.8, 3: 2.6, 4: 2.4, 5: 2.2, 6: 2, 7: 1.8, 8: 1.6, 9: 1.4 },
}, { ...sampleScore, inquiry1Type: "과탐", englishGrade: 2, koreanHistoryGrade: 5 });
assert.equal(myongjiNatural.calculationVerified, true);

const sangmyungNatural = calculateRegularAdmission({
  ...normFixture, scoreMetric: "백분위", subjectMetrics: { korean: "백분위", math: "백분위", inquiry: "백분위" },
  subjectMaximumScores: { korean: 100, math: 100, inquiry: 100 },
  koreanWeight: 25, mathWeight: 35, englishWeight: 20, inquiryWeight: 20, inquirySubjects: 1,
  mathChoiceBonusRequired: true, mathChoiceBonusRate: { 미적분: 0.1, 기하: 0.1, 확률과통계: 0 },
  inquiryTypeBonusRequired: true, inquiryTypeBonusRate: { 사탐: 0, 과탐: 0.05, 직탐: 0 },
  englishGradeTable: { 1: 100, 2: 98, 3: 96, 4: 94, 5: 90, 6: 80, 7: 60, 8: 40, 9: 0 },
  koreanHistoryGradePoints: { 1: 10, 2: 10, 3: 10, 4: 10, 5: 9.8, 6: 9.6, 7: 9.4, 8: 9.2, 9: 9 },
}, { ...sampleScore, mathType: "미적분", inquiry1Type: "과탐", englishGrade: 2, koreanHistoryGrade: 5 });
assert.equal(sangmyungNatural.calculationVerified, true);


// 2027 SKKU math/inquiry best weighting, Inha A/B alternatives, Ajou and Hongik.
const bestMathInquiry = calculateRegularAdmission({
  ...normFixture, koreanWeight: 15, mathWeight: 40, englishWeight: 15, inquiryWeight: 30,
  mathInquiryMode: "고득점 우선", subjectMaximumScores: { korean: 200, math: 200, inquiry: 200 },
  inquiryConversionRequired: false,
}, { ...sampleScore, englishGrade: 2, koreanHistoryGrade: 5 });
assert.ok(bestMathInquiry.appliedComponents.includes("수학·탐구 고득점 영역 가중치 선택"));

const inhaAB = calculateRegularAdmission({
  ...normFixture, koreanWeight: 35, mathWeight: 30, englishWeight: 10, inquiryWeight: 25,
  alternateWeighting: { koreanWeight: 30, mathWeight: 30, englishWeight: 10, inquiryWeight: 30 },
  inquiryConversionRequired: false, subjectMaximumScores: { korean: 200, math: 200, inquiry: 200 },
}, { ...sampleScore, englishGrade: 2, koreanHistoryGrade: 5 });
assert.ok(inhaAB.appliedComponents.includes("A/B 유형 고득점 환산 선택"));

const hongikRaw = calculateRegularAdmission({
  ...normFixture, scoreMetric: "표준점수", koreanWeight: 30, mathWeight: 30, englishWeight: 15, inquiryWeight: 25,
  inquirySubjects: 2, inquiryAggregation: "sum", calculationMode: "weighted-sum-with-additive-bonuses",
  subjectScoreMultiplier: 1, finalScoreMultiplier: 1,
  englishGradeTable: { 1: 100, 2: 95, 3: 88, 4: 79, 5: 68, 6: 55, 7: 40, 8: 23, 9: 4 },
  koreanHistoryGradePoints: { 1: 10, 2: 10, 3: 10, 4: 9.9, 5: 9.8, 6: 9.7, 7: 9.6, 8: 9.5, 9: 9.4 },
  gradeAdjustmentsAfterFinalMultiplier: true,
}, { ...sampleScore, englishGrade: 2, koreanHistoryGrade: 4 });
assert.ok(Math.abs(hongikRaw.baseScore - 128) < 0.000001);
assert.ok(Math.abs(hongikRaw.bonus - 9.9) < 0.000001);
assert.ok(Math.abs(hongikRaw.totalScore - 137.9) < 0.000001);
assert.ok(hongikRaw.appliedComponents.includes("영어 등급별 반영점수"));
assert.ok(!hongikRaw.appliedComponents.includes("영어 등급 가산점"));
assert.equal(hongikRaw.missingRules.length, 0);


// 2027 SeoulTech standard-score, Seoul Women's/Duksung ranked-area, Sungshin inquiry bonus.
const seoultechNatural = calculateRegularAdmission({
  ...normFixture, koreanWeight: 20, mathWeight: 35, englishWeight: 20, inquiryWeight: 25,
  inquiryTypeBonusRequired: true, inquiryTypeBonusRate: { 사탐: 0, 과탐: 0.07, 직탐: 0 },
  englishGradeTable: { 1: 100, 2: 97.7778, 3: 94.8148, 4: 88.8889, 5: 74.0741, 6: 59.2593, 7: 44.4444, 8: 22.2222, 9: 0 },
  koreanHistoryGradePoints: { 1: 0, 2: 0, 3: 0, 4: -1, 5: -2, 6: -3, 7: -4, 8: -5, 9: -10 },
}, { ...sampleScore, inquiry1Type: "과탐", inquiry2Type: "과탐", englishGrade: 2, koreanHistoryGrade: 5 });
assert.equal(seoultechNatural.calculationVerified, true);

const swuRanked = calculateRegularAdmission({
  ...normFixture, scoreMetric: "백분위", subjectMetrics: { korean: "백분위", math: "백분위", inquiry: "백분위" },
  subjectMaximumScores: { korean: 100, math: 100, inquiry: 100 }, rankedAreaWeights: [35, 30, 20, 15],
  koreanWeight: 35, mathWeight: 30, englishWeight: 20, inquiryWeight: 15, inquirySubjects: 1, inquiryAggregation: "best",
  finalScoreMultiplier: 4, englishGradeTable: { 1: 100, 2: 97, 3: 93, 4: 85, 5: 70, 6: 50, 7: 35, 8: 20, 9: 0 },
  koreanHistoryGradePoints: { 1: 5, 2: 5, 3: 5, 4: 4.95, 5: 4.8, 6: 4.5, 7: 4, 8: 2, 9: 0 },
}, { ...sampleScore, koreanPercentile: 99, mathPercentile: 97, inquiry1Percentile: 90, englishGrade: 2, koreanHistoryGrade: 4 });
assert.ok(swuRanked.appliedComponents.includes("4개 영역 성적순 가중치 배정"));

const sungshinBonus = calculateRegularAdmission({
  ...normFixture, scoreMetric: "백분위", subjectMetrics: { korean: "백분위", math: "백분위", inquiry: "백분위" },
  subjectMaximumScores: { korean: 100, math: 100, inquiry: 100 },
  koreanWeight: 20, mathWeight: 30, englishWeight: 20, inquiryWeight: 30, inquirySubjects: 2, inquiryAggregation: "mean",
  finalScoreMultiplier: 5, inquiryTopSubjectBonusRate: 0.1, inquiryTopSubjectBonusType: "과탐",
  englishGradeTable: { 1: 100, 2: 97, 3: 94, 4: 85, 5: 60, 6: 40, 7: 25, 8: 10, 9: 0 },
  koreanHistoryGradePoints: { 1: 2, 2: 1.5, 3: 1, 4: 0.5, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
}, { ...sampleScore, inquiry1Percentile: 94, inquiry2Percentile: 99, inquiry1Type: "과탐", inquiry2Type: "과탐", englishGrade: 2, koreanHistoryGrade: 3 });
assert.ok(sungshinBonus.bonus >= 9.9);

const duksungRanked = calculateRegularAdmission({
  ...normFixture, scoreMetric: "백분위", subjectMetrics: { korean: "백분위", math: "백분위", inquiry: "백분위" },
  subjectMaximumScores: { korean: 100, math: 100, inquiry: 100 }, rankedAreaWeights: [30, 25, 25, 20],
  koreanWeight: 30, mathWeight: 25, englishWeight: 25, inquiryWeight: 20, inquirySubjects: 1, inquiryAggregation: "best",
  finalScoreMultiplier: 10, englishGradeTable: { 1: 100, 2: 98, 3: 96, 4: 80, 5: 70, 6: 60, 7: 50, 8: 40, 9: 0 },
  koreanHistoryGradePoints: { 1: 10, 2: 10, 3: 10, 4: 10, 5: 9, 6: 8, 7: 7, 8: 6, 9: 0 },
}, { ...sampleScore, koreanPercentile: 99, mathPercentile: 97, inquiry1Percentile: 92, englishGrade: 2, koreanHistoryGrade: 2 });
assert.ok(duksungRanked.appliedComponents.includes("4개 영역 성적순 가중치 배정"));


// 2027 ERICA, Pusan, Kyungpook and Chungnam formula fixtures.
const ericaPending = calculateRegularAdmission({
  ...normFixture, koreanWeight: 25, mathWeight: 35, englishWeight: 15, inquiryWeight: 25,
  inquiryConversionRequired: true, inquiryConversionTable: undefined,
  englishGradeTable: { 1: 100, 2: 99, 3: 96, 4: 91, 5: 80, 6: 60, 7: 40, 8: 20, 9: 0 },
}, sampleScore);
assert.equal(ericaPending.calculationVerified, false);
assert.ok(ericaPending.missingRules.some((rule) => rule.includes("탐구 변환표준점수표")));

const pusanPending = calculateRegularAdmission({
  ...normFixture, koreanWeight: 20, mathWeight: 30, englishWeight: 20, inquiryWeight: 30,
  subjectMaximumScores: { korean: 200, math: 200 }, inquiryConversionRequired: true,
  inquiryTypeBonusRequired: true, inquiryTypeBonusRate: { 사탐: 0, 과탐: 0.05, 직탐: 0 },
  englishGradeTable: { 1: 100, 2: 99, 3: 97.5, 4: 95, 5: 92.5, 6: 90, 7: 87.5, 8: 85, 9: 82.5 },
}, { ...sampleScore, inquiry1Type: "과탐", inquiry2Type: "과탐", englishGrade: 2, koreanHistoryGrade: 5 });
assert.equal(pusanPending.calculationVerified, false);

const knuPending = calculateRegularAdmission({
  ...normFixture, calculationMode: "weighted-sum-with-additive-bonuses",
  koreanWeight: 150, mathWeight: 100, englishWeight: 100, inquiryWeight: 100,
  subjectScoreMultiplier: 1, finalScoreMultiplier: 1.25, gradeAdjustmentsAfterFinalMultiplier: true,
  inquiryConversionRequired: true, inquiryConversionTable: undefined,
  englishGradeTable: { 1: 100, 2: 97, 3: 92, 4: 87, 5: 82, 6: 77, 7: 72, 8: 67, 9: 62 },
  koreanHistoryGradePoints: { 1: 10, 2: 10, 3: 10, 4: 10, 5: 9.8, 6: 9.6, 7: 9.4, 8: 9.2, 9: 9 },
}, { ...sampleScore, englishGrade: 2, koreanHistoryGrade: 5 });
assert.equal(knuPending.calculationVerified, false);
assert.ok(knuPending.missingRules.some((rule) => rule.includes("탐구 변환표준점수표")));

const chungnamExact = calculateRegularAdmission({
  ...normFixture, calculationMode: "weighted-sum-with-additive-bonuses",
  koreanWeight: 67.5, mathWeight: 37.5, englishWeight: 0, inquiryWeight: 22.5,
  subjectScoreMultiplier: 1, finalScoreMultiplier: 1, gradeAdjustmentsAfterFinalMultiplier: true,
  inquiryConversionRequired: false, inquiryTypeBonusRequired: false,
  englishGradeTable: { 1: 0, 2: -2, 3: -5, 4: -8, 5: -11, 6: -14, 7: -18, 8: -22, 9: -26 },
  koreanHistoryGradePoints: { 1: 0, 2: 0, 3: 0, 4: -1, 5: -1, 6: -1, 7: -2, 8: -2, 9: -2 },
}, { ...sampleScore, englishGrade: 2, koreanHistoryGrade: 4 });
const chungnamExpectedBase = 134 * 0.675 + 136 * 0.375 + (64 + 67) * 0.225;
assert.ok(Math.abs(chungnamExact.baseScore - chungnamExpectedBase) < 0.000001);
assert.equal(chungnamExact.missingRules.length, 0);


// 2027 Jeonbuk, Jeju, Kangwon and Chungbuk formulas.
const jeonbukPending = calculateRegularAdmission({
  ...normFixture, calculationMode: "weighted-sum-with-additive-bonuses",
  koreanWeight: 100, mathWeight: 75, englishWeight: 0, inquiryWeight: 150,
  subjectScoreMultiplier: 1, finalScoreMultiplier: 1, inquiryAggregation: "mean",
  inquiryConversionRequired: true, inquiryConversionTable: undefined,
  englishGradeTable: { 1: 30, 2: 27, 3: 24, 4: 18, 5: 12, 6: 9, 7: 6, 8: 3, 9: 0 },
  koreanHistoryGradePoints: { 1: 5, 2: 5, 3: 5, 4: 5, 5: 5, 6: 4, 7: 3, 8: 2, 9: 1 },
}, { ...sampleScore, englishGrade: 2, koreanHistoryGrade: 5 });
assert.equal(jeonbukPending.calculationVerified, false);

const jejuExact = calculateRegularAdmission({
  ...normFixture, scoreMetric: "백분위", subjectMetrics: { korean: "백분위", math: "백분위", inquiry: "백분위" },
  subjectMaximumScores: { korean: 100, math: 100, inquiry: 100 },
  koreanWeight: 30, mathWeight: 20, englishWeight: 20, inquiryWeight: 30, inquirySubjects: 2, inquiryAggregation: "mean",
  finalScoreMultiplier: 1000, englishGradeTable: { 1: 100, 2: 95, 3: 90, 4: 85, 5: 80, 6: 70, 7: 60, 8: 50, 9: 30 },
  koreanHistoryGradePoints: { 1: 10, 2: 10, 3: 10, 4: 10, 5: 9.8, 6: 9.6, 7: 9.4, 8: 9.2, 9: 9 },
  calculationVerified: true,
}, { ...sampleScore, englishGrade: 2, koreanHistoryGrade: 5 });
assert.equal(jejuExact.calculationVerified, true);

const kangwonExact = calculateRegularAdmission({
  ...normFixture, scoreMetric: "백분위", subjectMetrics: { korean: "백분위", math: "백분위", inquiry: "백분위" },
  subjectMaximumScores: { korean: 100, math: 100, inquiry: 100 },
  koreanWeight: 20, mathWeight: 30, englishWeight: 20, inquiryWeight: 30, inquirySubjects: 2, inquiryAggregation: "mean",
  finalScoreMultiplier: 500, mathChoiceBonusRequired: true, mathChoiceBonusRate: { 미적분: 0.1, 기하: 0.1, 확률과통계: 0 },
  inquiryTypeBonusRequired: true, inquiryTypeBonusRate: { 사탐: 0, 과탐: 0.1, 직탐: 0 },
  englishGradeTable: { 1: 100, 2: 97, 3: 94, 4: 91, 5: 81, 6: 78, 7: 75, 8: 72, 9: 0 },
  koreanHistoryGradePoints: { 1: 1.5, 2: 1, 3: 0.5, 4: 0, 5: -0.5, 6: -1, 7: -1.5, 8: -2, 9: -2.5 },
  calculationVerified: true,
}, { ...sampleScore, mathType: "미적분", inquiry1Type: "과탐", inquiry2Type: "과탐", englishGrade: 2, koreanHistoryGrade: 4 });
assert.equal(kangwonExact.calculationVerified, true);

const chungbukPending = calculateRegularAdmission({
  ...normFixture, koreanWeight: 30, mathWeight: 20, englishWeight: 20, inquiryWeight: 30,
  finalScoreMultiplier: 200, fixedBaseScore: 800, inquiryConversionRequired: false, subjectMaximumScores: {},
  englishGradeTable: { 1: 100, 2: 95, 3: 90, 4: 85, 5: 80, 6: 75, 7: 70, 8: 40, 9: 0 },
}, sampleScore);
assert.equal(chungbukPending.calculationVerified, false);
assert.equal(chungbukPending.baseScore, 838);


// 2027 Gyeongsang, Incheon and KMOU.
const gnuPending = calculateRegularAdmission({
  ...normFixture, subjectMaximumScores: {}, koreanWeight: 25, mathWeight: 30, englishWeight: 20, inquiryWeight: 25,
  inquiryTypeBonusRequired: true, inquiryTypeBonusRate: { 사탐: 0, 과탐: 0.05, 직탐: 0 },
  inquiryBonusRequiresSameType: "과탐",
  englishGradeTable: { 1: 100, 2: 98, 3: 96, 4: 94, 5: 92, 6: 90, 7: 88, 8: 86, 9: 84 },
}, { ...sampleScore, inquiry1Type: "과탐", inquiry2Type: "과탐", englishGrade: 2 });
assert.equal(gnuPending.calculationVerified, false);

const inuExact = calculateRegularAdmission({
  ...normFixture, scoreMetric: "백분위", subjectMetrics: { korean: "백분위", math: "백분위", inquiry: "백분위" },
  subjectMaximumScores: { korean: 100, math: 100, inquiry: 100 },
  koreanWeight: 35, mathWeight: 30, englishWeight: 10, inquiryWeight: 25, inquirySubjects: 2, inquiryAggregation: "mean",
  finalScoreMultiplier: 1000, englishGradeTable: { 1: 100, 2: 98, 3: 95, 4: 80, 5: 70, 6: 60, 7: 30, 8: 10, 9: 0 },
  calculationVerified: true,
}, { ...sampleScore, englishGrade: 2 });
assert.equal(inuExact.calculationVerified, true);

// Incheon 2027: weighted-average engine already produces the official 1,000-point scale.
// Official formula: 99*3.5 + 98*3 + 96*1.25 + 99*1.25 + English(2)=98 => 982.25.
const incheonWeightedAverage = calculateRegularAdmission({
  ...normFixture,
  id: "incheon-weighted-average-smoke",
  scoreMetric: "백분위",
  subjectMetrics: { korean: "백분위", math: "백분위", inquiry: "백분위" },
  calculationMode: "weighted-average",
  koreanWeight: 35,
  mathWeight: 30,
  englishWeight: 10,
  inquiryWeight: 25,
  inquirySubjects: 2,
  inquiryAggregation: "mean",
  finalScoreMultiplier: 1,
  koreanHistoryRequired: false,
  koreanHistoryGradePoints: undefined,
  englishGradeTable: { 1: 100, 2: 98, 3: 95, 4: 80, 5: 70, 6: 60, 7: 30, 8: 10, 9: 0 },
  calculationVerified: true,
}, { ...sampleScore, koreanPercentile: 99, mathPercentile: 98, inquiry1Percentile: 96, inquiry2Percentile: 99, englishGrade: 2 });
assert.ok(Math.abs(incheonWeightedAverage.totalScore - 982.25) < 0.000001);
assert.equal(incheonWeightedAverage.calculationVerified, true);

const kmouExact = calculateRegularAdmission({
  ...normFixture, calculationMode: "weighted-sum-with-additive-bonuses",
  koreanWeight: 130, mathWeight: 90, englishWeight: 0, inquiryWeight: 80, inquirySubjects: 2, inquiryAggregation: "sum",
  subjectScoreMultiplier: 1, finalScoreMultiplier: 1, gradeAdjustmentsAfterFinalMultiplier: true,
  englishGradeTable: { 1: 200, 2: 196, 3: 190, 4: 180, 5: 160, 6: 140, 7: 120, 8: 100, 9: 80 },
  koreanHistoryGradePoints: { 1: 3, 2: 2.5, 3: 2, 4: 1.5, 5: 1, 6: 0.5, 7: 0, 8: 0, 9: 0 },
}, { ...sampleScore, englishGrade: 2, koreanHistoryGrade: 4 });
assert.equal(kmouExact.missingRules.length, 0);
assert.ok(kmouExact.totalScore > kmouExact.baseScore);


// 2027 Daegu and Keimyung.
const daeguPending = calculateRegularAdmission({
  ...normFixture, scoreMetric: "백분위", subjectMetrics: { korean: "백분위", math: "백분위", inquiry: "백분위" },
  subjectMaximumScores: { korean: 100, math: 100, inquiry: 100 },
  koreanWeight: 20, mathWeight: 30, englishWeight: 30, inquiryWeight: 20, inquirySubjects: 1, inquiryAggregation: "best",
  finalScoreMultiplier: 937.5, studentRecordWeight: 6.25,
  englishGradeTable: { 1: 100, 2: 97, 3: 94, 4: 91, 5: 88, 6: 85, 7: 82, 8: 79, 9: 76 },
  koreanHistoryGradePoints: { 1: 5, 2: 5, 3: 4, 4: 4, 5: 3, 6: 2, 7: 1, 8: 0, 9: 0 },
}, { ...sampleScore, englishGrade: 2, koreanHistoryGrade: 5 });
assert.equal(daeguPending.calculationVerified, false);
assert.ok(daeguPending.missingRules.some((rule) => rule.includes("학생부 반영 점수")));

const keimyungExact = calculateRegularAdmission({
  ...normFixture, scoreMetric: "백분위", subjectMetrics: { korean: "백분위", math: "백분위", inquiry: "백분위" },
  subjectMaximumScores: { korean: 100, math: 100, inquiry: 100 },
  koreanWeight: 25, mathWeight: 25, englishWeight: 25, inquiryWeight: 25, inquirySubjects: 2, inquiryAggregation: "mean",
  finalScoreMultiplier: 400, englishGradeTable: { 1: 100, 2: 98, 3: 94, 4: 90, 5: 86, 6: 82, 7: 78, 8: 74, 9: 60 },
  koreanHistoryGradePoints: { 1: 5, 2: 5, 3: 4.5, 4: 4.5, 5: 4, 6: 4, 7: 3.5, 8: 3.5, 9: 3 },
  calculationVerified: true,
}, { ...sampleScore, englishGrade: 2, koreanHistoryGrade: 3 });
assert.equal(keimyungExact.calculationVerified, true);


// 2027 단국대 죽전 수능위주 일반학생 모집단위 및 계열별 산식 검사
const dankookData = readFileSync(new URL("../lib/regular/data2027.ts", import.meta.url), "utf8");
assert.match(dankookData, /DANKOOK_ENGLISH = \{ 1: 100, 2: 98, 3: 95, 4: 85, 5: 70, 6: 40, 7: 15, 8: 5, 9: 0 \}/);
assert.match(dankookData, /DANKOOK_HISTORY = \{ 1: 5, 2: 5, 3: 5, 4: 5, 5: 4, 6: 3, 7: 2, 8: 1, 9: 0 \}/);
const dankookRowsText = dankookData.slice(dankookData.indexOf("const DANKOOK_ROWS = ["), dankookData.indexOf("const dankookAdmissions"));
const dankookRows = [...dankookRowsText.matchAll(/\["[^"]+","[^"]+","[^"]+","([가나다])",(\d+),/g)];
assert.equal(dankookRows.length, 39);
const dankookTotals = dankookRows.reduce((totals, row) => {
  totals[row[1]] += Number(row[2]);
  return totals;
}, { 가: 0, 나: 0, 다: 0 });
assert.deepEqual(dankookTotals, { 가: 220, 나: 280, 다: 267 });
assert.match(dankookData, /\["mobile-systems-da","모바일시스템공학과","자연·공학","다",18,20,35,15,30,"N"\]/);
assert.match(dankookData, /\["business-na","경영학부","경영·경제","나",61,25,35,20,20,"BIZ"\]/);

// 2027 경기대 일반학생Ⅰ 비실기: 모집단위별 군·인원·계열 반영비율 데이터 검사
const kyonggiData = readFileSync(new URL("../lib/regular/data2027-gyeonggi.ts", import.meta.url), "utf8");
assert.match(kyonggiData, /benchmarkComparable: false/);
assert.match(kyonggiData, /영어 등급 환산표가 달라 전년도 환산점수는 비교 기준으로 사용하지 않음/);
assert.match(kyonggiData, /KYONGGI_ENGLISH = \{ 1: 100, 2: 100, 3: 96, 4: 92, 5: 80, 6: 70, 7: 60, 8: 50, 9: 0 \}/);
assert.match(kyonggiData, /KYONGGI_HISTORY = \{ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: -0.05, 7: -0.05, 8: -0.1, 9: -0.1 \}/);
assert.match(kyonggiData, /const KYONGGI_ROWS = \[/);
assert.match(kyonggiData, /\["society-ga","사회과학부","인문·사회","가",52,"B"\]/);
assert.match(kyonggiData, /\["business-da","경영학부","경영·경제","다",82,"A"\]/);
assert.match(kyonggiData, /\["hotel-food-da","호텔외식경영학부","경영·경제","다",21,"B"\]/);
const kyonggiRowsText = kyonggiData.slice(kyonggiData.indexOf("const KYONGGI_ROWS = ["), kyonggiData.indexOf("const kyonggiAdmissions"));
const kyonggiRows = [...kyonggiRowsText.matchAll(/\["[^"]+","[^"]+","[^"]+","([가나다])",(\d+),"[AB]"\]/g)];
assert.equal(kyonggiRows.length, 35);
const kyonggiTotals = kyonggiRows.reduce((totals, row) => {
  totals[row[1]] += Number(row[2]);
  return totals;
}, { 가: 0, 나: 0, 다: 0 });
assert.deepEqual(kyonggiTotals, { 가: 104, 나: 94, 다: 622 });


// 2027 Hanyang ERICA official guide: business belongs to natural/business weights, not humanities.
const ericaData = readFileSync(new URL("../lib/regular/data2027-gyeonggi.ts", import.meta.url), "utf8");
const ericaRow = ericaData.match(/\{ id:"hanyang-erica-na-business"[^\n]+/);
assert.ok(ericaRow, "ERICA business representative row exists");
assert.match(ericaRow[0], /department:"경영학부"/);
assert.match(ericaRow[0], /koreanWeight:25, mathWeight:35, englishWeight:15, inquiryWeight:25/);
assert.match(ericaRow[0], /calculationMode:"normalized-standard-sum"/);
assert.match(ericaRow[0], /inquiryAggregation:"sum"/);
assert.match(ericaRow[0], /finalScoreMultiplier:1000/);
assert.match(ericaRow[0], /inquiryConversionRequired:true/);
assert.match(ericaRow[0], /calculationVerified:false/);
assert.match(ericaRow[0], /group:"나", recruitmentCount:40/);
const lionsRow = ericaData.match(/\{ id:"hanyang-erica-na-lions"[^\n]+/);
assert.ok(lionsRow, "ERICA LIONS general admission row exists");
assert.match(ericaRow[0], /schoolViolencePenaltyRequired:true/);
assert.match(lionsRow[0], /schoolViolencePenaltyRequired:true/);
assert.match(ericaRow[0], /1호 5점[\s\S]*9호 300점/);
assert.match(lionsRow[0], /1호 5점[\s\S]*9호 300점/);
assert.match(lionsRow[0], /group:"나", recruitmentCount:94/);
assert.match(lionsRow[0], /koreanWeight:30, mathWeight:35, englishWeight:10, inquiryWeight:25/);
assert.match(lionsRow[0], /calculationMode:"normalized-standard-sum"/);
assert.match(ericaData, /ERICA_ENGLISH = \{ 1: 100, 2: 99, 3: 96, 4: 91, 5: 80, 6: 60, 7: 40, 8: 20, 9: 0 \}/);
assert.match(ericaData, /ERICA_HISTORY = \{ 1: 10, 2: 9\.9, 3: 9\.8, 4: 9\.7, 5: 9\.6, 6: 9\.0, 7: 9\.0, 8: 9\.0, 9: 9\.0 \}/);

// 2027 Ajou final guide: general admissions 2/3/4, exact group quotas and formula groups.
const ajouData = readFileSync(new URL("../lib/regular/data2027-gyeonggi.ts", import.meta.url), "utf8");
const ajouRowsText = ajouData.slice(ajouData.indexOf("const AJOU_ROWS: AjouRow[] = ["), ajouData.indexOf("const ajouAdmissions"));
const ajouRows = [...ajouRowsText.matchAll(/\{ id: "([^"]+)", department: "([^"]+)", majorGroup: "([^"]+)", group: "([가나다])", recruitmentCount: (\d+), field: "([^"]+)", admissionType: "([^"]+)" \}/g)];
assert.equal(ajouRows.length, 33);
assert.equal(new Set(ajouRows.map((row) => row[1])).size, 33);
const ajouTotals = ajouRows.reduce((totals, row) => {
  totals[row[7]] += Number(row[5]);
  return totals;
}, { 일반전형2: 0, 일반전형3: 0, 일반전형4: 0 });
assert.deepEqual(ajouTotals, { 일반전형2: 121, 일반전형3: 473, 일반전형4: 12 });
assert.match(ajouData, /AJOU_ENGLISH = \{ 1: 100, 2: 98, 3: 96, 4: 84, 5: 60, 6: 40, 7: 20, 8: 10, 9: 0 \}/);
assert.match(ajouData, /AJOU_HISTORY = \{ 1: 0, 2: 0, 3: 0, 4: 0, 5: -5, 6: -10, 7: -20, 8: -30, 9: -40 \}/);
assert.match(ajouData, /mathChoiceBonusRate: natural \? \{ 미적분: 0.03, 기하: 0.03/);
assert.match(ajouData, /inquiryTypeBonusRate: natural \? \{ 사탐: 0, 과탐: 0.03/);
assert.ok(!ajouRows.some((row) => row[2] === "의학과" || row[2] === "국방디지털융합학과"));

// 2027 Incheon official guide: CSAT-100% units only; mixed practical units are excluded.
const incheonData = readFileSync(new URL("../lib/regular/data2027-incheon.ts", import.meta.url), "utf8");
assert.match(incheonData, /finalScoreMultiplier: 1/);
assert.match(incheonData, /benchmarkYear: benchmark \? 2026 : undefined/);
assert.match(incheonData, /benchmarkCutline70: benchmark\?\.cutline70/);
assert.match(incheonData, /benchmarkSourceUrl: benchmark \? BENCHMARK_SOURCE : undefined/);
assert.match(incheonData, /"northeast-asia-trade": \{ department: "동북아국제통상전공", cutline70: 839 \}/);
assert.equal((incheonData.match(/department: "[^"]+", cutline70:/g) ?? []).length, 56);
assert.match(incheonData, /id: "design", department: "디자인학부", group: "가", count: 14, field: "design"/);
assert.match(incheonData, /id: "early-childhood", department: "유아교육과", group: "가", count: 9/);
assert.match(incheonData, /id: "smart-logistics", department: "스마트물류공학전공", group: "다", count: 7, field: "natural"/);
const incheonRows = [...incheonData.matchAll(/\{ id: "([^"]+)", department: "([^"]+)", group: "([가나다])", count: (\d+), field: "([^"]+)" \}/g)];
const incheonTotals = incheonRows.reduce((totals, row) => {
  totals[row[3]] += Number(row[4]);
  return totals;
}, { 가: 0, 나: 0, 다: 0 });
assert.equal(incheonRows.length, 56);
assert.deepEqual(incheonTotals, { 가: 348, 나: 64, 다: 277 });
assert.ok(!incheonRows.some((row) => ["스포츠과학부", "스포츠의학부", "체육교육과", "공연예술학과"].includes(row[2])));

// 2027 Gachon official guide: group assignments are read from the General Admission 1 columns.
const gachonData = readFileSync(new URL("../lib/regular/data2027-gachon.ts", import.meta.url), "utf8");
assert.match(gachonData, /benchmarkComparable: false/);
assert.match(gachonData, /2026학년도는 국어·수학·영어 상위 3개 영역/);
assert.match(gachonData, /id: "tourism"[^\n]*group: "가"[^\n]*recruitmentCount: 15/);
assert.match(gachonData, /id: "accounting"[^\n]*group: "나"[^\n]*recruitmentCount: 15/);
assert.match(gachonData, /id: "business"[^\n]*group: "다"[^\n]*recruitmentCount: 38/);
const gachonRows = [...gachonData.matchAll(/\{ id: "([^"]+)", department: "([^"]+)", majorGroup: "([^"]+)", group: "([가나다])", recruitmentCount: (\d+)/g)];
const gachonTotals = gachonRows.reduce((totals, row) => {
  totals[row[4]] += Number(row[5]);
  return totals;
}, { 가: 0, 나: 0, 다: 0 });
assert.equal(gachonRows.length, 47);
assert.equal(new Set(gachonRows.map((row) => row[1])).size, 47);
assert.match(gachonData, /languageMathMode: undefined/);
assert.match(gachonData, /englishInquiryMode: undefined/);
assert.deepEqual(gachonTotals, { 가: 347, 나: 346, 다: 378 });

const admissionDataFiles = [
  "../lib/regular/data2027.ts",
  "../lib/regular/data2027Batch2.ts",
  "../lib/regular/data2027-extra-seoul.ts",
  "../lib/regular/data2027-gyeonggi.ts",
  "../lib/regular/data2027-gachon.ts",
  "../lib/regular/data2027-incheon.ts",
];
const ids = admissionDataFiles.filter((path) => !path.endsWith("data2027-gachon.ts")).flatMap((path) => {
  const text = readFileSync(new URL(path, import.meta.url), "utf8");
  return [...text.matchAll(/\bid:\s*"([^"]+)"/g)].map((match) => match[1]);
});
const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
assert.deepEqual([...new Set(duplicates)], [], "2027 admission IDs must be unique across source files");

console.log("Regular scoring smoke tests passed: Central, SNU, Korea, Yonsei, Sogang and KHU formula samples, and missing-rule guards.");

const hansungTopTwo = calculateRegularAdmission({
  ...normFixture,
  scoreMetric:"백분위", subjectMetrics:{korean:"백분위",math:"백분위",inquiry:"백분위"},
  subjectMaximumScores:{korean:100,math:100,inquiry:100}, inquirySubjects:1, inquiryAggregation:"best",
  koreanWeight:40, mathWeight:40, englishWeight:20, inquiryWeight:40,
  topAreaWeights:{areas:["korean","math","inquiry"],count:2,weight:40},
  englishGradeTable:{1:100,2:97,3:94,4:80,5:70,6:55,7:40,8:25,9:10},
  koreanHistoryGradePoints:{1:10,2:10,3:10,4:10,5:8,6:6,7:4,8:2,9:0},
}, {...sampleScore,koreanPercentile:90,mathPercentile:80,inquiry1Percentile:70,englishGrade:2,koreanHistoryGrade:5});
assert.equal(hansungTopTwo.calculationVerified,true);
assert.ok(Math.abs(hansungTopTwo.baseScore-(0.9*0.4+0.8*0.4+0.97*0.2)*1000)<0.000001);
assert.ok(hansungTopTwo.appliedComponents.includes("지정 영역 상위 2개 자동 선택 반영"));

const hansungData=readFileSync(new URL("../lib/regular/data2027-extra-seoul.ts",import.meta.url),"utf8");
const hansungRows=[...hansungData.matchAll(/key":"([^"]+)"[^}]*"group":"([가나다])"[^}]*"recruitmentCount":(\d+)/g)];
assert.equal(hansungRows.length,16);
const hansungTotals=hansungRows.reduce((totals,row)=>{totals[row[2]]+=Number(row[3]);return totals;},{가:0,나:0,다:0});
assert.deepEqual(hansungTotals,{가:247,나:75,다:173});


// 서울여대 2027: 상위 3개 영역(영어 포함) 및 20% 수학 가산·누락 입력 방어



const swuTopThree = calculateRegularAdmission({
  ...normFixture, scoreMetric:"백분위", subjectMetrics:{korean:"백분위",math:"백분위",inquiry:"백분위"},
  subjectMaximumScores:{korean:100,math:100,inquiry:100}, inquirySubjects:1, inquiryAggregation:"best",
  koreanWeight:40, mathWeight:40, englishWeight:20, inquiryWeight:0,
  rankedAreaWeights:[40,40,20], finalScoreMultiplier:60,
  englishGradeTable:{1:100,2:97,3:93,4:85,5:70,6:50,7:35,8:20,9:0},
  koreanHistoryGradePoints:{1:5,2:5,3:5,4:5,5:4.95,6:4.8,7:4.5,8:4,9:0},
  schoolViolencePenaltyRequired:true, practicalEvaluationRequired:true,
}, {...sampleScore,koreanPercentile:90,mathPercentile:80,inquiry1Percentile:70,englishGrade:2,koreanHistoryGrade:5});
assert.ok(Math.abs(swuTopThree.baseScore-(0.9*0.4+0.97*0.4+0.8*0.2)*60)<0.000001);
assert.equal(swuTopThree.calculationVerified,false);
assert.ok(swuTopThree.missingRules.some(rule=>rule.includes("실기평가")));
assert.ok(swuTopThree.missingRules.some(rule=>rule.includes("학교폭력")));
const swuData=readFileSync(new URL("../lib/regular/data2027-seoulwomen.ts",import.meta.url),"utf8");
const swuRows=[...swuData.matchAll(/\["([^"]+)","([^"]+)","([^"]+)","([가나다])",(\d+),"([^"]+)"\]/g)];
assert.equal(swuRows.length,44);
const swuTotals=swuRows.reduce((a,r)=>(a[r[4]]+=Number(r[5]),a),{가:0,나:0,다:0});
assert.deepEqual(swuTotals,{가:277,나:190,다:261});
assert.ok(swuData.includes("finalScoreMultiplier:top3?60:400"));
assert.ok(swuData.includes("inquiryWeight:0"), "상위 3개 반영 전형은 탐구 가중치를 별도로 중복 반영하지 않아야 함");
assert.ok(swuData.includes('mathChoiceBonusRate:{미적분:0.2,기하:0.2'));

const duksungData=readFileSync(new URL("../lib/regular/data2027-extra-seoul.ts",import.meta.url),"utf8");
const duksungRows=[...duksungData.matchAll(/id:"dukseong-seoul-[^"]+", universityId:"dukseong-seoul"[^\n]*group:"([가나다])", recruitmentCount:(\d+)/g)];
assert.equal(duksungRows.length,10);
const duksungTotals=duksungRows.reduce((a,r)=>(a[r[1]]+=Number(r[2]),a),{가:0,나:0,다:0});
assert.deepEqual(duksungTotals,{가:159,나:225,다:100});
const duksungPharmacy=calculateRegularAdmission({
  ...normFixture,scoreMetric:"백분위",subjectMetrics:{korean:"백분위",math:"백분위",inquiry:"백분위"},
  subjectMaximumScores:{korean:100,math:100,inquiry:100},koreanWeight:25,mathWeight:30,englishWeight:20,inquiryWeight:25,
  inquirySubjects:2,inquiryAggregation:"mean",finalScoreMultiplier:1000,
  englishGradeTable:{1:100,2:98,3:96,4:80,5:70,6:60,7:50,8:40,9:0},
  inquiryTypeBonusRequired:true,inquiryTypeBonusRate:{사탐:0,과탐:0.2,직탐:0},inquiryBonusRequiresSameType:"과탐",schoolViolencePenaltyRequired:true,schoolViolencePenaltyNote:"덕성 학교폭력 감점 기준 미입력",
},{...sampleScore,englishGrade:2,inquiry1Type:"과탐",inquiry2Type:"과탐"});
assert.ok(duksungPharmacy.appliedComponents.includes("탐구 과목별 선택유형 가산율·과목별 고정 가산점"));
assert.equal(duksungPharmacy.calculationVerified,false);


// 수도권 전용 추천 범위 회귀 테스트: 비수도권 대학만 주어지면 후보를 생성하지 않는다.
const outOfScopeAdmissions = syntheticAdmissions.map((admission) => ({
  ...admission,
  region: "부산",
}));
assert.equal(
  recommendationModule.recommendRegular(syntheticProfile, outOfScopeAdmissions).length,
  0,
  "서울·경기·인천 외 대학은 정시 추천 후보에 포함되면 안 된다",
);
