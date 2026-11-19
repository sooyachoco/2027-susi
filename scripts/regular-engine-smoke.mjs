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

console.log("Regular scoring smoke tests passed: Central, SNU, Korea, Yonsei, Sogang and KHU formula samples, and missing-rule guards.");
