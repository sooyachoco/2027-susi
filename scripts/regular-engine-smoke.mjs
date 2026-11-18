import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const enginePath = fileURLToPath(new URL("../lib/regular/engine2027.ts", import.meta.url));
const source = readFileSync(enginePath, "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const sandbox = { exports: {}, require };
vm.runInNewContext(compiled, sandbox, { filename: "engine2027.cjs" });
const { calculateRegularAdmission } = sandbox.exports;

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

console.log("Regular scoring smoke tests passed: Central, SNU, Korea, Yonsei formula samples, and missing-rule guards.");
