import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const enginePath = fileURLToPath(new URL("../lib/regular/engine2027.ts", import.meta.url));
const engineSource = readFileSync(enginePath, "utf8");
const regularAuditSource = readFileSync(new URL("../app/api/regular-audit/route.ts", import.meta.url), "utf8");
const regularAuditPageSource = readFileSync(new URL("../app/regular-audit/page.tsx", import.meta.url), "utf8");
const regularRecommendationSource = readFileSync(new URL("../lib/regular/recommend.ts", import.meta.url), "utf8");
const cutlineFunctionSource = regularRecommendationSource.match(/function getCutline\([\s\S]*?\n\}/)?.[0] ?? "";
assert.match(cutlineFunctionSource, /benchmarkCutline70 \?\? admission\.expectedCutline70 \?\? admission\.expectedCutline/);
assert.doesNotMatch(cutlineFunctionSource, /benchmarkCutline95|expectedCutline95/);
assert.match(regularRecommendationSource, /keywords: \["체육", "스포츠", "운동"\], groups: \["예체능·체육"\]/);
assert.match(regularRecommendationSource, /keywords: \["공연", "연극", "영화", "연기", "뮤지컬"\], groups: \["예체능·공연"\]/);
assert.match(regularAuditSource, /const effectiveTotal = config\.count \* config\.weight/);
assert.match(regularAuditSource, /config\.areas\.includes\("english"\) \? 0 : item\.englishWeight/);
assert.match(regularAuditSource, /config\.areas\.includes\("inquiry"\) \? 0 : item\.inquiryWeight/);
assert.match(engineSource, /config\.areas\.includes\("inquiry"\) \? 0 : \(inquiryNormalized \?\? 0\) \* admission\.inquiryWeight/);
assert.match(regularAuditPageSource, /requiresAdditionalEligibilityInput/);
assert.match(regularAuditPageSource, /recruitmentByGroup/);
assert.match(regularAuditPageSource, /recruitmentByEvaluation/);
assert.match(regularAuditPageSource, /확인된 총 모집인원/);
assert.match(regularAuditPageSource, /universityQuery/);
assert.match(regularAuditPageSource, /universityRegion/);
assert.match(regularAuditPageSource, /recruitmentTotalsByRegion/);
assert.match(regularAuditPageSource, /sourceCoverage/);
assert.match(regularAuditPageSource, /formulaCoverage/);
assert.match(regularAuditPageSource, /학교폭력 규칙 미검토/);
assert.match(regularAuditPageSource, /탐구표 확인 대기/);
assert.match(regularAuditPageSource, /placeholderDepartments/);
assert.match(regularAuditSource, /pendingEnglishTable/);
assert.match(regularAuditSource, /pendingInquiryConversion/);
assert.match(regularAuditSource, /2026-12-11T00:00:00\+09:00/);
assert.match(regularAuditSource, /pendingMaximumScores/);
assert.match(regularAuditSource, /pendingSubjectMaximumScores/);
assert.match(regularAuditSource, /untrackedSchoolViolencePolicy/);
assert.match(regularAuditSource, /schoolViolencePenaltyRequired == null/);
assert.match(regularAuditSource, /const hasComparableBenchmark70/);
assert.match(regularAuditSource, /benchmarkCutline70 \?\? item\.expectedCutline70 \?\? item\.expectedCutline/);
assert.match(regularAuditSource, /benchmarkComparable: admissions\.filter\(hasComparableBenchmark70\)\.length/);
assert.match(regularAuditSource, /requiresInterviewEvaluation/);
const sookmyungSource = readFileSync(new URL("../lib/regular/data2027-sookmyung.ts", import.meta.url), "utf8");
assert.match(sookmyungSource, /recruitmentCount/);
assert.ok(sookmyungSource.includes("activeRows.length !== 52 || totals.가 !== 648 || totals.나 !== 408 || totals.다 !== 0"));
assert.match(sookmyungSource, /학교폭력 정량감점/);
assert.match(sookmyungSource, /inquiryConversionPending: inquirySubjects === 2/);
assert.match(sookmyungSource, /수능 성적 발표 후 공개 예정/);
assert.match(sookmyungSource, /practicalEvaluationNote: practical/);
assert.ok(sookmyungSource.includes('const csatShare = field === "sports" ? 60 : field === "design" ? 60 : field === "painting" ? 30 : field === "music" ? 20 : field === "composition" ? 40 : field === "dance" ? 30 : 100;'), "숙명여대 실기계열별 수능 반영비율이 유지되어야 함");
assert.match(sookmyungSource, /sookmyungAdmissions2027/);
const sookmyungRepositorySource = readFileSync(new URL("../lib/regular/repository.ts", import.meta.url), "utf8");
assert.ok(sookmyungRepositorySource.includes("...sookmyungAdmissions2027"), "숙명여대 정시 데이터가 전체 정시 데이터에 포함되어야 함");

const snueSource = readFileSync(new URL("../lib/regular/data2027-snue.ts", import.meta.url), "utf8");
assert.match(snueSource, /recruitmentCount: 108/);
assert.ok(snueSource.includes("https://admission.snue.ac.kr/pdfjs-2.12.313-dist/web/viewer.html?file=2027%ED%95%99%EB%85%84%EB%8F%84_%EC%84%9C%EC%9A%B8%EA%B5%90%EC%9C%A1%EB%8C%80%ED%95%99%EA%B5%90_%EC%A0%95%EC%8B%9C%EB%AA%A8%EC%A7%91_%EC%8B%A0%EC%9E%85%EC%83%9D_%EB%AA%A8%EC%A7%91%EC%9A%94%EA%B0%95.pdf"), "서울교대 source URL must open the official 2027 regular-guide PDF viewer");
assert.match(snueSource, /interviewEvaluationRequired: true/);
assert.match(snueSource, /additionalEligibilityRequired: true/);
const seokyeongSource = readFileSync(new URL("../lib/regular/data2027-seokyeong.ts", import.meta.url), "utf8");
assert.match(seokyeongSource, /recruitmentCount: 16/);
assert.match(seokyeongSource, /recruitmentCount: 60/);
assert.match(seokyeongSource, /topAreaWeights: \{ areas: \["korean", "math", "inquiry"\], count: 2, weight: 40 \}/);
assert.match(seokyeongSource, /englishGradeTable: SEOKYEONG_ENGLISH/);
assert.match(seokyeongSource, /koreanHistoryGradePoints: SEOKYEONG_HISTORY/);
assert.match(seokyeongSource, /schoolViolencePenaltyRequired: true/);
assert.match(seokyeongSource, /calculationVerified: false/);
const samyukSource = readFileSync(new URL("../lib/regular/data2027-samyuk.ts", import.meta.url), "utf8");
const samyukRows = [...samyukSource.matchAll(/\{ key: "([^"]+)", department: "([^"]+)", group: "([가나다])", count: (\d+), field: "([^"]+)" \}/g)];
assert.equal(samyukRows.length, 23);
assert.equal(new Set(samyukRows.map((row) => row[1])).size, 23);
assert.equal(samyukRows.reduce((sum, row) => sum + Number(row[4]), 0), 245);
assert.deepEqual(samyukRows.reduce((totals, row) => { totals[row[3]] += Number(row[4]); return totals; }, { 가: 0, 나: 0, 다: 0 }), { 가: 105, 나: 85, 다: 55 });
assert.match(samyukSource, /rankedAreaWeights: \[35, 25, 25, 15\]/);
assert.match(samyukSource, /englishGradeTable: SAMYUK_ENGLISH/);
assert.match(samyukSource, /mathChoiceBonusRate: \{ 미적분: 0\.03, 기하: 0\.03, 확률과통계: 0 \}/);
assert.match(samyukSource, /inquiryBonusRequiresSameType: "과탐"/);
assert.match(samyukSource, /practicalEvaluationRequired: true/);
assert.match(samyukSource, /학교폭력 조치사항 입력 필요/);
assert.match(samyukSource, /calculationVerified: false/);
assert.match(samyukSource, /음악학과·아트앤디자인학과 27명/);

const gyeonggiSource = readFileSync(new URL("../lib/regular/data2027-gyeonggi.ts", import.meta.url), "utf8");
assert.match(gyeonggiSource, /schoolViolencePenaltyRequired: true/);
assert.match(gyeonggiSource, /calculationVerified: false/);
assert.match(gyeonggiSource, /경기대 2027 정시 학교폭력 조치사항별 감점/);
const gachonSource = readFileSync(new URL("../lib/regular/data2027-gachon.ts", import.meta.url), "utf8");
assert.match(gachonSource, /schoolViolencePenaltyRequired: true/);
assert.match(gachonSource, /calculationVerified: false/);
assert.match(gachonSource, /4~5호 각 10점, 6~7호 각 20점/);
const incheonSource = readFileSync(new URL("../lib/regular/data2027-incheon.ts", import.meta.url), "utf8");
assert.match(incheonSource, /schoolViolencePenaltyRequired: true/);
assert.match(incheonSource, /calculationVerified: false/);
assert.match(incheonSource, /2~3호 5% 감점, 4~5호 10% 감점, 6~9호 부적격/);

const hufsSource = readFileSync(new URL("../lib/regular/data2027-hufs.ts", import.meta.url), "utf8");
const hufsRows = [...hufsSource.matchAll(/\{ campus:"(seoul|global|songdo)", group:"([가나다])", key:"([^"]+)", department:"[^"]+", count:(\d+), field:"([ABN])"(?:, majorGroup:"[^"]+")? \}/g)];
assert.equal(hufsRows.length, 90);
assert.equal(new Set(hufsRows.map((row) => row[3])).size, 90);
const hufsTotals = hufsRows.reduce((totals, row) => {
  totals[row[1]][row[2]] += Number(row[4]);
  totals[row[1]].total += Number(row[4]);
  totals.groups[row[2]] += Number(row[4]);
  totals.total += Number(row[4]);
  return totals;
}, { seoul:{가:0,나:0,다:0,total:0}, global:{가:0,나:0,다:0,total:0}, songdo:{가:0,나:0,다:0,total:0}, groups:{가:0,나:0,다:0}, total:0 });
assert.deepEqual(hufsTotals, {
  seoul:{가:160,나:312,다:75,total:547},
  global:{가:37,나:336,다:337,total:710},
  songdo:{가:0,나:0,다:20,total:20},
  groups:{가:197,나:648,다:432},
  total:1277,
});
assert.equal(hufsRows.some((row) => row[2] === "다" && row[3] === "global-bio-business-songdo" && Number(row[4]) === 20 && row[5] === "B"), true);
assert.match(hufsSource, /majorGroup: row\.majorGroup \?\? \(row\.field === "N"/);
assert.match(hufsSource, /inquiryConversionRequired: true/);
assert.match(hufsSource, /inquiryConversionPending: true/);
assert.match(hufsSource, /HUFS_ENGLISH_20 = \{ 1:200, 2:198, 3:194, 4:188, 5:180, 6:170, 7:150, 8:120, 9:0 \}/);
assert.match(hufsSource, /HUFS_ENGLISH_15 = \{ 1:150, 2:148\.5, 3:145\.5, 4:141, 5:135, 6:127\.5, 7:112\.5, 8:90, 9:0 \}/);
assert.match(hufsSource, /HUFS_HISTORY = \{ 1:0, 2:0, 3:0, 4:-0\.02, 5:-0\.04, 6:-0\.06, 7:-0\.08, 8:-0\.1, 9:-0\.2 \}/);
assert.match(hufsSource, /schoolViolencePenaltyRequired: true/);
assert.match(hufsSource, /calculationVerified: false/);

assert.match(regularAuditSource, /englishConversionPending !== true/);
assert.match(regularAuditSource, /inquiryConversionPending !== true/);
const yonseiPendingSource = readFileSync(new URL("../lib/regular/data2027-yonsei.ts", import.meta.url), "utf8");
const koreaPendingSource = readFileSync(new URL("../lib/regular/data2027-korea.ts", import.meta.url), "utf8");
const skkuPendingSource = readFileSync(new URL("../lib/regular/data2027-skku.ts", import.meta.url), "utf8");
for (const source of [yonseiPendingSource, koreaPendingSource, skkuPendingSource]) {
  assert.match(source, /inquiryConversionPending: true/);
}
assert.match(skkuPendingSource, /englishConversionPending: true/);
const regularDataSource = readFileSync(new URL("../lib/regular/data2027.ts", import.meta.url), "utf8");
assert.match(regularDataSource, /schoolViolencePenaltyRequired: true/);
assert.equal((regularDataSource.match(/id: "hongik-seoul-da-(?:humanities|natural)"[\s\S]*?schoolViolencePenaltyRequired: true/g) ?? []).length, 2);
assert.equal((regularDataSource.match(/id: "hongik-seoul-da-(?:humanities|natural)"[\s\S]*?calculationVerified: false/g) ?? []).length, 2);
// Legacy representative rows must not coexist with dedicated university datasets.
for (const legacyUniversityId of ["hufs-seoul-ga-humanities", "snu-seoul", "yonsei-seoul", "korea-seoul", "hanyang-seoul", "uos-seoul", "skku-seoul", "kwangwoon-seoul", "sangmyung-seoul", "sungshin-seoul", "myongji-seoul", "duksung-seoul", "ajou-suwon", "kyonggi-suwon", "hanyang-erica", "inu-incheon"]) {
  assert.equal(regularDataSource.includes(legacyUniversityId), false, `legacy representative data remains: ${legacyUniversityId}`);
}
const batch2Source = readFileSync(new URL("../lib/regular/data2027Batch2.ts", import.meta.url), "utf8");
assert.match(batch2Source, /regularAdmissions2027Batch2: RegularAdmission\[\] = \[\]/);

assert.match(regularDataSource, /\[전공개방\] 창의ICT공과대학/);
assert.match(regularDataSource, /id: "cau-seoul-ga-psychology"[\s\S]*?recruitmentCount: 19/);
assert.match(regularDataSource, /id: "cau-seoul-na-industrial-security"[\s\S]*?recruitmentCount: 28/);
assert.equal((regularDataSource.match(/id: "cau-seoul-/g) ?? []).length, 3);
const khuInternationalSource = readFileSync(new URL("../lib/regular/data2027-khu-international.ts", import.meta.url), "utf8");
assert.match(khuInternationalSource, /schoolViolencePenaltyRequired: true/);
assert.match(khuInternationalSource, /1~3호 전형 총점의 1%, 4~5호 5%, 6~7호 20%, 8호 40% 감점, 9호 결격/);
assert.match(khuInternationalSource, /calculationVerified: false/);
const khuInternationalRowsMatch = khuInternationalSource.match(/const KHU_INTERNATIONAL_ROWS = (\[[\s\S]*?\]) as const;/);
assert.ok(khuInternationalRowsMatch);
const khuInternationalRows = JSON.parse(khuInternationalRowsMatch[1]);
assert.equal(khuInternationalRows.length, 43);
assert.deepEqual(khuInternationalRows.reduce((totals, row) => {
  totals[row.group] += row.recruitmentCount;
  totals.total += row.recruitmentCount;
  return totals;
}, { 가: 0, 나: 0, 다: 0, total: 0 }), { 가: 252, 나: 614, 다: 0, total: 866 });
assert.equal(khuInternationalRows.some((row) => /대표/.test(row.department)), false);
assert.match(khuInternationalSource, /inquiryTypeBonusPerSubject: natural \? \{ "과탐":4 \}/);
const konkukSource = readFileSync(new URL("../lib/regular/data2027-konkuk.ts", import.meta.url), "utf8");
const donggukSource = readFileSync(new URL("../lib/regular/data2027-dongguk.ts", import.meta.url), "utf8");
const seoultechSource = readFileSync(new URL("../lib/regular/data2027-seoultech.ts", import.meta.url), "utf8");
const konkukRowsMatch = konkukSource.match(/const KONKUK_ROWS = (\[[\s\S]*?\]) as const;/);
assert.ok(konkukRowsMatch);
const konkukRows = JSON.parse(konkukRowsMatch[1]);
assert.equal(konkukRows.length, 54);
assert.deepEqual(konkukRows.reduce((totals, row) => {
  totals[row.group] += row.recruitmentCount;
  totals.total += row.recruitmentCount;
  return totals;
}, { 가: 0, 나: 0, 다: 0, total: 0 }), { 가: 545, 나: 467, 다: 318, total: 1330 });
assert.equal(konkukRows.filter((row) => row.field === "practical").reduce((sum,row)=>sum+row.recruitmentCount,0), 247);
assert.match(konkukSource, /englishMaximumScore: 200/);
assert.match(konkukSource, /alternateWeighting: free/);
assert.match(konkukSource, /topAreaWeights: arts/);
assert.equal(konkukSource.includes("대표"), false);
const donggukRowsMatch = donggukSource.match(/const DONGGUK_ROWS = (\[[\s\S]*?\]) as const;/);
assert.ok(donggukRowsMatch);
const donggukRows = JSON.parse(donggukRowsMatch[1]);
assert.equal(donggukRows.length, 55);
assert.deepEqual(donggukRows.reduce((totals, row) => {
  totals[row.group] += row.recruitmentCount;
  totals.total += row.recruitmentCount;
  return totals;
}, { 가: 0, 나: 0, 다: 0, total: 0 }), { 가: 439, 나: 418, 다: 309, total: 1166 });
assert.equal(donggukRows.filter((row) => row.group === "다").length, 10);
assert.match(donggukSource, /studentRecordWeight: row.group === "다" \? 10/);
assert.match(donggukSource, /practicalEvaluationRequired: practical/);
assert.match(donggukSource, /inquiryConversionRequired: true/);
assert.equal(donggukSource.includes("대표"), false);
assert.match(seoultechSource, /서울과학기술대학교/);
assert.match(seoultechSource, /SEOULTECH_ENGLISH = \{ 1:135, 2:132, 3:128, 4:120, 5:100, 6:80, 7:60, 8:30, 9:0 \}/);
assert.match(seoultechSource, /SEOULTECH_HISTORY = \{ 1:0, 2:0, 3:0, 4:-1, 5:-2, 6:-3, 7:-4, 8:-5, 9:-10 \}/);
assert.match(seoultechSource, /englishMaximumScore: 135/);
assert.match(seoultechSource, /koreanHistoryGradePoints: SEOULTECH_HISTORY/);
assert.match(seoultechSource, /calculationVerified: false/);
assert.match(seoultechSource, /practicalEvaluationRequired: practical/);
assert.ok(seoultechSource.includes("2단계는 1단계 성적 80%+실기 20%"), "스포츠과학 실기 반영비율 80:20 누락");
assert.ok(seoultechSource.includes("2단계는 1단계 성적 50%+실기 50%"), "도예·조형예술 실기 반영비율 50:50 누락");
assert.ok(seoultechSource.includes("2단계는 1단계 성적 60%+실기 40%"), "산업·시각·금속공예디자인 실기 반영비율 60:40 누락");
assert.match(seoultechSource, /학교폭력 조치사항별 감점 입력 필요: 1~3호 5점, 4~7호 10점, 8~9호 30점/);
assert.match(seoultechSource, /복수 조치는 조치별 감점 적용/);
const seoultechRows = [...seoultechSource.matchAll(/\[\s*"(?:ga|na|da)-[^"]+",\s*"[^"]+",\s*"([가나다])",\s*(\d+),\s*"([^"]+)"\s*\]/g)];
assert.equal(seoultechRows.length, 49);
const seoultechPracticalRows = seoultechRows.filter((row) => row[3].endsWith("Practical"));
assert.equal(seoultechPracticalRows.length, 6);
assert.deepEqual(seoultechPracticalRows.reduce((totals, row) => {
  totals[row[3]] += Number(row[2]);
  return totals;
}, { sportsPractical: 0, artsPractical: 0 }), { sportsPractical: 14, artsPractical: 112 });
assert.ok(seoultechSource.includes('type === "sportsPractical"'), "스포츠 실기 트랙 누락");
assert.ok(seoultechSource.includes("2단계는 1단계 성적 80%+실기 20%"), "스포츠과학 80:20 반영비율 누락");
assert.ok(seoultechSource.includes('department === "도예학과" || department === "조형예술학과"'), "도예·조형예술 학과별 조건 누락");
assert.ok(seoultechSource.includes("2단계는 1단계 성적 50%+실기 50%"), "도예·조형예술 50:50 반영비율 누락");
assert.ok(seoultechSource.includes("2단계는 1단계 성적 60%+실기 40%"), "디자인 실기 60:40 반영비율 누락");
const seoultechTotals = seoultechRows.reduce((totals, row) => {
  const group = row[1];
  const count = Number(row[2]);
  const type = row[3];
  if (type.endsWith("Practical")) totals.practical += count;
  else totals[group] += count;
  return totals;
}, { 가: 0, 나: 0, 다: 0, practical: 0 });
assert.deepEqual(seoultechTotals, { 가: 304, 나: 277, 다: 61, practical: 126 });
assert.equal(seoultechRows.filter((row) => row[3] === "natural").reduce((sum, row) => sum + Number(row[2]), 0), 565, "서울과기대 자연계열 모집인원 교차검증");
assert.match(seoultechSource, /koreanHistoryRequired: true/);
assert.match(seoultechSource, /0\.07/);
const seoulExtraSource = readFileSync(new URL("../lib/regular/data2027-extra-seoul.ts", import.meta.url), "utf8");
const sangmyungRowsMatch = seoulExtraSource.match(/const SANGMYUNG_ROWS = (\[[\s\S]*?\]) as const;/);
const sungshinRowsMatch = seoulExtraSource.match(/const SUNGSHIN_ROWS = (\[[\s\S]*?\]) as const;/);
const dongdukRowsMatch = seoulExtraSource.match(/const DONGDUK_ROWS = (\[[\s\S]*?\]) as const;/);
const myongjiRowsMatch = seoulExtraSource.match(/const MYONGJI_ROWS = (\[[\s\S]*?\]) as const;/);
const sogangSource = readFileSync(new URL("../lib/regular/data2027.ts", import.meta.url), "utf8");
const sogangAdmissionsRows2027Match = sogangSource.match(/const SOGANG_ROWS = (\[[\s\S]*?\]) as const;/);
assert.ok(sogangAdmissionsRows2027Match);
const sogangAdmissionsRows2027 = JSON.parse(sogangAdmissionsRows2027Match[1]);
assert.equal(sogangAdmissionsRows2027.length, 23);
assert.deepEqual(sogangAdmissionsRows2027.reduce((totals, row) => {
  totals[row.group] += row.recruitmentCount;
  totals.total += row.recruitmentCount;
  return totals;
}, { 가: 0, 나: 0, 다: 0, total: 0 }), { 가: 0, 나: 513, 다: 110, total: 623 });
assert.match(sogangSource, /SOGANG_ENGLISH = \{ 1:100, 2:99\.5, 3:98\.5, 4:97, 5:95, 6:92\.5, 7:89\.5, 8:86, 9:82 \}/);
assert.match(sogangSource, /inquiryConversionRequired: true/);
assert.ok(myongjiRowsMatch);
const myongjiRows = JSON.parse(myongjiRowsMatch[1]);
assert.equal(myongjiRows.length, 6);
assert.deepEqual(myongjiRows.reduce((totals, row) => {
  totals[row.group] += row.recruitmentCount;
  totals.total += row.recruitmentCount;
  return totals;
}, { 가: 0, 나: 0, 다: 0, total: 0 }), { 가: 150, 나: 196, 다: 82, total: 428 });
assert.equal(myongjiRows.some((row) => /대표/.test(row.department)), false);
assert.match(seoulExtraSource, /MYONGJI_ENGLISH = \{ 1:100, 2:98, 3:96, 4:90, 5:80, 6:60, 7:40, 8:20, 9:0 \}/);
assert.ok(dongdukRowsMatch);
const dongdukRows = JSON.parse(dongdukRowsMatch[1]);
assert.equal(dongdukRows.length, 7);
assert.deepEqual(dongdukRows.reduce((totals, row) => {
  totals[row.group] += row.recruitmentCount;
  totals.total += row.recruitmentCount;
  return totals;
}, { 가: 0, 나: 0, 다: 0, total: 0 }), { 가: 160, 나: 168, 다: 0, total: 328 });
assert.equal(dongdukRows.find((row) => row.field === "pharmacy").recruitmentCount, 20);
assert.match(seoulExtraSource, /DONGDUK_ENGLISH = \{ 1:100, 2:99, 3:96, 4:85, 5:70, 6:55, 7:40, 8:20, 9:0 \}/);
assert.ok(sungshinRowsMatch);
const sungshinRows = JSON.parse(sungshinRowsMatch[1]);
assert.equal(sungshinRows.length, 51);
const sungshinTotals = sungshinRows.reduce((totals, row) => {
  totals[row.group] += row.recruitmentCount;
  totals.total += row.recruitmentCount;
  if (row.field.startsWith("p")) totals.practical += row.recruitmentCount;
  return totals;
}, { 가: 0, 나: 0, 다: 0, total: 0, practical: 0 });
assert.deepEqual(sungshinTotals, { 가: 411, 나: 274, 다: 36, total: 721, practical: 182 });
assert.equal(sungshinRows.some((row) => /대표/.test(row.department)), false);
assert.match(seoulExtraSource, /SUNGSHIN_ENGLISH = \{ 1:100, 2:97, 3:94, 4:85, 5:60, 6:40, 7:25, 8:10, 9:0 \}/);
assert.match(seoulExtraSource, /실기평가 점수 미입력\(수능/);
assert.ok(sangmyungRowsMatch);
const sangmyungRows = JSON.parse(sangmyungRowsMatch[1]);
assert.equal(sangmyungRows.length, 28);
assert.equal(sangmyungRows.reduce((sum, row) => sum + row.recruitmentCount, 0), 489);
assert.equal(sangmyungRows.every((row) => row.group === "나"), true);
assert.equal(sangmyungRows.some((row) => /대표/.test(row.department)), false);
assert.match(seoulExtraSource, /SANGMYUNG_ENGLISH = \{ 1:100, 2:98, 3:96, 4:94, 5:90, 6:80, 7:60, 8:40, 9:0 \}/);
const kwangwoonRowsMatch = seoulExtraSource.match(/const KWANGWOON_ROWS = (\[[\s\S]*?\]) as const;/);
assert.ok(kwangwoonRowsMatch, "Kwangwoon source rows must be present as a literal audit-friendly table");
const kwangwoonRows = JSON.parse(kwangwoonRowsMatch[1]);
assert.equal(kwangwoonRows.length, 31);
const kwangwoonTotals = kwangwoonRows.reduce((totals, row) => {
  totals[row.group] += row.recruitmentCount;
  return totals;
}, { 가: 0, 나: 0, 다: 0 });
assert.deepEqual(kwangwoonTotals, { 가: 164, 나: 111, 다: 425 });
assert.equal(kwangwoonRows.some((row) => /대표/.test(row.department)), false);
assert.match(seoulExtraSource, /KWANGWOON_ENGLISH = \{ 1:200, 2:198, 3:195, 4:190, 5:182, 6:170, 7:158, 8:146, 9:0 \}/);
assert.match(seoulExtraSource, /englishMaximumScore: 200/);
assert.match(seoulExtraSource, /schoolViolencePenaltyRequired: true/);
assert.match(seoulExtraSource, /calculationVerified: false/);
assert.equal(seoulExtraSource.includes('department:"자연·공학계열 대표"'), false);
assert.equal(seoulExtraSource.includes('서울과학기술대학교", region:"서울", department:"자연·공학계열 대표"'), false);

const ericaRowsMatch = gyeonggiSource.match(/const HANYANG_ERICA_ROWS = (\[[\s\S]*?\n\]) as const;/);
assert.ok(ericaRowsMatch, "Hanyang ERICA 2027 regular rows must be a literal audit-friendly table");
const ericaRows = JSON.parse(ericaRowsMatch[1].replace(/,\s*\]$/, "]"));
assert.equal(ericaRows.length, 34);
assert.deepEqual(ericaRows.reduce((totals, row) => {
  totals[row[3]] += row[4];
  totals.total += row[4];
  return totals;
}, { 가: 0, 나: 0, 다: 0, total: 0 }), { 가: 404, 나: 319, 다: 0, total: 723 });
assert.equal(ericaRows.some((row) => /대표/.test(row[1])), false);
assert.equal(ericaRows.some((row) => row[0] === "business-na" && row[4] === 40), true);
assert.equal(ericaRows.some((row) => row[0] === "lions-free-major-na" && row[4] === 94), true);
assert.match(gyeonggiSource, /HANYANG_ERICA_ENGLISH = \{ 1: 100, 2: 99, 3: 96, 4: 91, 5: 80, 6: 60, 7: 40, 8: 20, 9: 0 \}/);
assert.match(gyeonggiSource, /HANYANG_ERICA_HISTORY = \{ 1: 10, 2: 9\.9, 3: 9\.8, 4: 9\.7, 5: 9\.6, 6: 9\.0 \}/);
assert.match(gyeonggiSource, /inquiryConversionRequired: true/);
assert.match(gyeonggiSource, /calculationVerified: false/);
assert.match(gyeonggiSource, /학교폭력 조치사항은 총점 1,000점에서 감점/);

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
assert.match(regularAuditSource, /genericSourceUrl/);
assert.match(regularAuditPageSource, /genericSourceUrl/);
assert.match(regularAuditSource, /nonUniversitySourceDomain/);
assert.match(regularAuditPageSource, /nonUniversitySourceDomain/);
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

const portfolioPath = fileURLToPath(new URL("../lib/regular/portfolio.ts", import.meta.url));
const portfolioModule = loadTsModule(portfolioPath, { "./recommend": recommendationModule });
const repeatedUniversityPortfolioAdmissions = ["가", "나", "다"].flatMap((group) =>
  Array.from({ length: 6 }, (_, universityIndex) => ({
    id: `portfolio-${group}-${universityIndex}`,
    universityId: `portfolio-university-${universityIndex}`,
    universityName: `포트폴리오 테스트대학 ${universityIndex}`,
    region: "서울",
    department: "경영학부",
    majorGroup: "경영·경제",
    group,
    recruitmentCount: 10,
    scoreMetric: "백분위",
    subjectMetrics: { korean: "백분위", math: "백분위", inquiry: "백분위" },
    subjectMaximumScores: { korean: 100, math: 100, inquiry: 100 },
    calculationMode: "normalized-standard-sum",
    koreanWeight: 30,
    mathWeight: 30,
    englishWeight: 20,
    inquiryWeight: 20,
    inquirySubjects: 2,
    inquiryAggregation: "mean",
    englishGradeTable: { 1: 100, 2: 98, 3: 95, 4: 90, 5: 80, 6: 70, 7: 50, 8: 30, 9: 0 },
    finalScoreMultiplier: 1000,
    schoolViolencePenaltyRequired: false,
    calculationVerified: true,
    benchmarkComparable: true,
    benchmarkYear: 2026,
    benchmarkCutline70: 800,
    benchmarkTotalScore: 1000,
    benchmarkSourceUrl: "https://example.org/2026-regular-benchmark",
  })),
);
const optimizedSyntheticPortfolio = portfolioModule.recommendRegularPortfolio(
  syntheticProfile,
  repeatedUniversityPortfolioAdmissions,
);
assert.equal(optimizedSyntheticPortfolio.length, 1);
assert.equal(optimizedSyntheticPortfolio[0].recommendations.length, 3);
assert.equal(
  new Set(optimizedSyntheticPortfolio[0].recommendations.map((item) => item.universityName)).size,
  3,
  "the optimized 가·나·다 portfolio must use three distinct universities",
);

// A 95% cutoff cannot be substituted into thresholds calibrated to the 70% cutoff.
const ninetyFiveOnlyAdmission = {
  ...repeatedUniversityPortfolioAdmissions[0],
  id: "benchmark-95-only",
  universityId: "benchmark-95-only-university",
  universityName: "95% 기준점 테스트대학",
  benchmarkCutline70: undefined,
  benchmarkCutline95: 800,
};
const ninetyFiveOnlyRecommendation = recommendationModule.recommendRegular(
  syntheticProfile,
  [ninetyFiveOnlyAdmission],
);
assert.equal(ninetyFiveOnlyRecommendation.length, 1);
assert.equal(ninetyFiveOnlyRecommendation[0].calculationVerified, true);
assert.equal(ninetyFiveOnlyRecommendation[0].hasComparableBenchmark, false);
assert.equal(ninetyFiveOnlyRecommendation[0].tier, "판정 보류");
assert.match(ninetyFiveOnlyRecommendation[0].reason, /비교 가능한 전년도 기준점 없음/);

const incompleteBenchmarkAdmission = {
  ...repeatedUniversityPortfolioAdmissions[0],
  id: "benchmark-missing-source",
  universityId: "benchmark-missing-source-university",
  universityName: "출처 누락 기준점 테스트대학",
  benchmarkSourceUrl: undefined,
};
const incompleteBenchmarkRecommendation = recommendationModule.recommendRegular(
  syntheticProfile,
  [incompleteBenchmarkAdmission],
);
assert.equal(incompleteBenchmarkRecommendation[0].calculationVerified, true);
assert.equal(incompleteBenchmarkRecommendation[0].hasComparableBenchmark, false);
assert.equal(incompleteBenchmarkRecommendation[0].tier, "판정 보류");

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
  schoolViolencePenaltyRequired: false,
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

const englishScale200Point = calculateRegularAdmission({
  id: "english-200-point-scale",
  universityId: "scale-test",
  universityName: "영어 200점 환산 테스트",
  region: "서울",
  department: "테스트학과",
  majorGroup: "전체",
  group: "가",
  scoreMetric: "백분위",
  subjectMetrics: { korean: "백분위", math: "백분위", inquiry: "백분위" },
  koreanWeight: 25,
  mathWeight: 25,
  englishWeight: 25,
  inquiryWeight: 25,
  inquirySubjects: 1,
  calculationMode: "normalized-standard-sum",
  subjectMaximumScores: { korean: 100, math: 100, inquiry: 100 },
  englishGradeTable: { 1: 200, 2: 180, 3: 160 },
  englishMaximumScore: 200,
  finalScoreMultiplier: 1000,
  schoolViolencePenaltyRequired: false,
  calculationVerified: true,
  sourceUrl: "https://example.invalid",
  verifiedAt: "2026-11-24",
}, {
  korean: 100, koreanPercentile: 100,
  math: 100, mathPercentile: 100,
  englishGrade: 1,
  inquiry1: 100, inquiry1Percentile: 100,
});
assert.equal(englishScale200Point.baseScore, 1000, "200-point English conversion must be normalized against 200, not 100");
assert.equal(englishScale200Point.calculationVerified, true);
const wrongInquiryCombination = calculateRegularAdmission({
  id: "science-inquiry-eligibility",
  universityId: "eligibility-test",
  universityName: "탐구 응시유형 테스트",
  region: "서울",
  department: "약학과",
  majorGroup: "의약·보건",
  group: "가",
  scoreMetric: "백분위",
  subjectMetrics: { korean:"백분위", math:"백분위", inquiry:"백분위" },
  koreanWeight:25, mathWeight:35, englishWeight:20, inquiryWeight:20,
  inquirySubjects:2, inquiryAggregation:"mean",
  inquiryTypeBonusRequired:true,
  inquiryTypeBonusRate: { "사탐":0, "과탐":0, "직탐":0 },
  inquiryBonusRequiresSameType:"과탐",
  calculationMode:"normalized-standard-sum",
  subjectMaximumScores:{korean:100,math:100,inquiry:100},
  englishGradeTable:{1:100},
  finalScoreMultiplier:1000,
  calculationVerified:false,
  sourceUrl:"https://example.invalid",
  verifiedAt:"2026-11-24",
}, {
  korean:90,koreanPercentile:90,math:90,mathPercentile:90,mathType:"미적분",
  englishGrade:1,inquiry1:90,inquiry1Percentile:90,inquiry1Type:"사탐",
  inquiry2:90,inquiry2Percentile:90,inquiry2Type:"과탐",
});
assert.ok(wrongInquiryCombination.missingRules.some((rule) => rule.includes("과탐 2과목 응시 필수")));
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
  schoolViolencePenaltyRequired: false,
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
  gradeAdjustmentsAfterFinalMultiplier: true, schoolViolencePenaltyRequired: false, calculationVerified: true,
};
const konkukA = calculateRegularAdmission({ ...normFixture }, { ...sampleScore, englishGrade: 2, koreanHistoryGrade: 5 });
const konkukB = calculateRegularAdmission({ ...normFixture, koreanWeight: 30, mathWeight: 40 }, { ...sampleScore, englishGrade: 2, koreanHistoryGrade: 5 });
const konkukFree = calculateRegularAdmission({ ...normFixture, languageMathMode: "고득점 우선" }, { ...sampleScore, englishGrade: 2, koreanHistoryGrade: 5 });
assert.equal(konkukFree.baseScore, Math.max(konkukA.baseScore, konkukB.baseScore));
assert.equal(konkukFree.calculationVerified, true);

const untrackedSchoolViolence = calculateRegularAdmission({ ...normFixture, schoolViolencePenaltyRequired: undefined }, { ...sampleScore, englishGrade: 2, koreanHistoryGrade: 5 });
assert.equal(untrackedSchoolViolence.calculationVerified, false);
assert.ok(untrackedSchoolViolence.missingRules.includes("2027 정시 학교폭력 반영 규칙 검토 상태 미기록"));

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

const gachonGeneral2 = calculateRegularAdmission({
  ...normFixture,
  scoreMetric: "등급",
  subjectMetrics: { korean: "등급", math: "등급", inquiry: "등급" },
  subjectGradeTables: {
    korean: { 1: 100, 2: 96, 3: 89, 4: 77, 5: 60, 6: 40, 7: 23, 8: 11, 9: 4 },
    math: { 1: 100, 2: 96, 3: 89, 4: 77, 5: 60, 6: 40, 7: 23, 8: 11, 9: 4 },
    inquiry: { 1: 100, 2: 96, 3: 89, 4: 77, 5: 60, 6: 40, 7: 23, 8: 11, 9: 4 },
  },
  subjectMaximumScores: { korean: 100, math: 100, inquiry: 100 },
  koreanWeight: 40, mathWeight: 30, englishWeight: 20, inquiryWeight: 10,
  inquirySubjects: 1, inquiryAggregation: "best",
  languageMathMode: "고득점 우선", englishInquiryMode: "고득점 우선",
  englishGradeTable: { 1: 98, 2: 95, 3: 92, 4: 86, 5: 80, 6: 60, 7: 50, 8: 40, 9: 30 },
  koreanHistoryRequired: false, schoolViolencePenaltyRequired: false,
  calculationVerified: true,
}, { ...sampleScore, koreanGrade: 2, mathGrade: 1, inquiry1Grade: 2, englishGrade: 3 });
assert.equal(gachonGeneral2.baseScore, 972);
assert.equal(gachonGeneral2.calculationVerified, true);
assert.ok(gachonGeneral2.appliedComponents.includes("국어·수학 A/B 고득점 조합 선택"));
assert.ok(gachonGeneral2.appliedComponents.includes("영어·탐구 고득점 영역 가중치 선택"));

const gachonGeneral2Missing = calculateRegularAdmission({
  ...normFixture, scoreMetric: "등급",
  subjectMetrics: { korean: "등급", math: "등급", inquiry: "등급" },
  subjectGradeTables: { korean: { 1: 100 }, math: { 1: 100 }, inquiry: { 1: 100 } },
  subjectMaximumScores: { korean: 100, math: 100, inquiry: 100 },
  koreanWeight: 40, mathWeight: 30, englishWeight: 20, inquiryWeight: 10,
  inquirySubjects: 1, inquiryAggregation: "best",
  englishGradeTable: { 1: 98, 2: 95, 3: 92, 4: 86, 5: 80, 6: 60, 7: 50, 8: 40, 9: 30 },
  koreanHistoryRequired: false, schoolViolencePenaltyRequired: false,
}, { ...sampleScore, englishGrade: 3 });
assert.equal(gachonGeneral2Missing.calculationVerified, false);
assert.ok(gachonGeneral2Missing.missingRules.some((rule) => rule.includes("국어 등급 입력")));

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
  schoolViolencePenaltyRequired: false,
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
assert.match(dankookData, /schoolViolencePenaltyRequired: true/);
assert.match(dankookData, /calculationVerified: true,\s*benchmarkComparable: false/);
assert.match(dankookData, /inquirySubjects: 2, inquiryAggregation: "mean"/);
assert.match(dankookData, /schoolViolencePenaltyNote: "2027 정시 모집요강 p\.29의 학교폭력 조치사항 반영표\(총점 1,000점 기준\): 1~3호 감점 없음, 4~5호 10점 감점, 6~7호 30점 감점, 8~9호 50점 감점\./);
assert.match(dankookData, /2027학년도 정시 모집요강 배포본\(2026\.09\.04\) pp\.28-30 대조 완료/);
assert.match(dankookData, /sourceUrl: DANKOOK_SOURCE, verifiedAt: "2026-11-25"/);
const dankookRowsText = dankookData.slice(dankookData.indexOf("const DANKOOK_ROWS = ["), dankookData.indexOf("const dankookAdmissions"));
const dankookRows = [...dankookRowsText.matchAll(/\["[^"]+","[^"]+","[^"]+","([가나다])",(\d+),/g)];
assert.equal(dankookRows.length, 40);
const dankookTotals = dankookRows.reduce((totals, row) => {
  totals[row[1]] += Number(row[2]);
  return totals;
}, { 가: 0, 나: 0, 다: 0 });
assert.deepEqual(dankookTotals, { 가: 220, 나: 280, 다: 297 });
assert.match(dankookData, /\["mobile-systems-da","모바일시스템공학과","자연·공학","다",18,20,35,15,30,"N"\]/);
assert.match(dankookData, /\["business-na","경영학부","경영·경제","나",61,25,35,20,20,"BIZ"\]/);
assert.match(dankookData, /\["physical-education-da","체육교육과","교육·체육","다",30,40,10,20,30,"N"\]/);
assert.match(dankookData, /finalScoreMultiplier: department === "체육교육과" \? 700 : 1000/);
assert.match(dankookData, /체육교육과는 수능 700점 \+ 실기 300점 반영/);
assert.match(dankookData, /practicalEvaluationRequired: true/);

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
const ericaBusinessRow = ericaRows.find((row) => row[0] === "business-na");
assert.ok(ericaBusinessRow, "ERICA business row exists");
assert.equal(ericaBusinessRow[1], "경영학부");
assert.equal(ericaBusinessRow[2], "경영·경제");
assert.equal(ericaBusinessRow[3], "나");
assert.equal(ericaBusinessRow[4], 40);
const ericaLionsRow = ericaRows.find((row) => row[0] === "lions-free-major-na");
assert.ok(ericaLionsRow, "ERICA LIONS row exists");
assert.equal(ericaLionsRow[4], 94);
assert.match(ericaData, /const HANYANG_ERICA_ENGLISH = \{ 1: 100, 2: 99, 3: 96, 4: 91, 5: 80, 6: 60, 7: 40, 8: 20, 9: 0 \}/);
assert.match(ericaData, /const HANYANG_ERICA_HISTORY = \{ 1: 10, 2: 9\.9, 3: 9\.8, 4: 9\.7, 5: 9\.6, 6: 9\.0 \}/);
assert.match(ericaData, /inquiryConversionRequired: true/);
assert.match(ericaData, /calculationMode: "normalized-standard-sum"/);
assert.match(ericaData, /schoolViolencePenaltyRequired: true/);
assert.match(ericaData, /1호 5점[\s\S]*9호 300점/);

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

// 2027 한국항공대 정시 일반학생전형: 군별 인원·표준점수 산식·별도 자격 확인
const kauData = readFileSync(new URL("../lib/regular/data2027-gyeonggi.ts", import.meta.url), "utf8");
const kauRowsText = kauData.slice(kauData.indexOf("const KAU_ROWS = ["), kauData.indexOf("const kauAdmissions"));
const kauRows = [...kauRowsText.matchAll(/\["([^"]+)","([^"]+)","([^"]+)","([가나다])",(\d+),"([^"]+)"\]/g)];
assert.equal(kauRows.length, 8);
const kauTotals = kauRows.reduce((totals, row) => {
  totals[row[4]] += Number(row[5]);
  return totals;
}, { 가: 0, 나: 0, 다: 0 });
assert.deepEqual(kauTotals, { 가: 99, 나: 67, 다: 55 });
assert.equal(kauRows.reduce((sum, row) => sum + Number(row[5]), 0), 221);
assert.match(kauData, /KAU_ENGLISH = \{ 1: 136, 2: 134, 3: 132, 4: 127, 5: 122, 6: 117, 7: 112, 8: 107, 9: 102 \}/);
assert.match(kauData, /KAU_HISTORY = \{ 1: 10, 2: 10, 3: 10, 4: 10, 5: 9\.9, 6: 9\.8, 7: 9\.7, 8: 9\.6, 9: 9\.5 \}/);
assert.match(kauData, /subjectScoreMultiplier: 5/);
assert.match(kauData, /inquiryAggregation: "best"/);
assert.match(kauData, /inquiryTypeBonusRate: scienceBonus/);
assert.match(kauData, /schoolViolencePenaltyRequired: true/);
assert.match(kauData, /학교폭력 조치 4~7호는 환산총점의 10% 감점, 8~9호는 불합격 처리/);
assert.match(kauData, /additionalEligibilityRequired: id === "flight-operation-na"/);
assert.match(kauData, /항공신체검사 1종 합격 여부/);
assert.match(readFileSync(new URL("../lib/regular/types.ts", import.meta.url), "utf8"), /additionalEligibilityRequired\?: boolean/);
assert.match(readFileSync(new URL("../lib/regular/engine2027.ts", import.meta.url), "utf8"), /if \(admission\.additionalEligibilityRequired\) missingRules\.push/);

// 2027 한국공학대: 일반학생1·2 전형별 모집인원 및 수학 필수 상위 3개 영역 산식
const kutData = readFileSync(new URL("../lib/regular/data2027-gyeonggi.ts", import.meta.url), "utf8");
const kutRowsText = kutData.slice(kutData.indexOf("const KUT_ROWS = ["), kutData.indexOf("const KUT_SCHOOL_VIOLENCE_NOTE"));
const kutRows = [...kutRowsText.matchAll(/\["([^"]+)","([^"]+)","([^"]+)","([가나다])",(\d+),(\d+),"([^"]+)"\]/g)];
assert.equal(kutRows.length, 27);
const kutGeneral1 = kutRows.reduce((totals, row) => (totals[row[4]] += Number(row[5]), totals.total += Number(row[5]), totals), { 가: 0, 나: 0, 다: 0, total: 0 });
const kutGeneral2 = kutRows.reduce((totals, row) => (totals[row[4]] += Number(row[6]), totals.total += Number(row[6]), totals), { 가: 0, 나: 0, 다: 0, total: 0 });
assert.deepEqual(kutGeneral1, { 가: 66, 나: 128, 다: 86, total: 280 });
assert.deepEqual(kutGeneral2, { 가: 0, 나: 98, 다: 71, total: 169 });
assert.match(kutData, /KUT_ENGLISH = \{ 1: 100, 2: 96, 3: 92, 4: 88, 5: 80, 6: 60, 7: 30, 8: 20, 9: 10 \}/);
assert.match(kutData, /KUT_MATH_BONUS = \{ 미적분: 0\.1, 기하: 0\.1, 확률과통계: 0 \}/);
assert.match(kutData, /rankedAreaWeights: \[45, 35, 20\]/);
assert.match(kutData, /rankedAreaRequired: \["math"\]/);
assert.match(kutData, /학교폭력 조치사항은 500점 환산총점에서 1호 10점/);

const mandatoryMathResult = calculateRegularAdmission({
  ...normFixture,
  scoreMetric: "백분위",
  subjectMetrics: { korean: "백분위", math: "백분위", inquiry: "백분위" },
  subjectMaximumScores: { korean: 100, math: 100, inquiry: 100 },
  calculationMode: "normalized-standard-sum",
  koreanWeight: 25, mathWeight: 25, englishWeight: 25, inquiryWeight: 25,
  inquirySubjects: 2, inquiryAggregation: "best",
  englishGradeTable: { 1: 100, 2: 96, 3: 92, 4: 88, 5: 80, 6: 60, 7: 30, 8: 20, 9: 10 },
  englishMaximumScore: 100,
  koreanHistoryRequired: false,
  rankedAreaWeights: [45, 35, 20],
  rankedAreaRequired: ["math"],
  finalScoreMultiplier: 500,
  mathChoiceBonusRequired: true,
  mathChoiceBonusRate: { 미적분: 0.1, 기하: 0.1, 확률과통계: 0 },
  calculationVerified: true,
}, {
  ...sampleScore,
  koreanPercentile: 99, mathPercentile: 50,
  inquiry1Percentile: 95, inquiry2Percentile: 80,
  englishGrade: 2, mathType: "확률과통계",
});
assert.equal(mandatoryMathResult.calculationVerified, true);
assert.ok(Math.abs(mandatoryMathResult.totalScore - ((0.99 * 0.45) + (0.96 * 0.35) + (0.5 * 0.2)) * 500) < 0.000001);
assert.ok(mandatoryMathResult.appliedComponents.includes("필수 영역 포함 4개 영역 성적순 가중치 배정"));

// 2027 Incheon official guide: CSAT-100% units only; mixed practical units are excluded.
const incheonData = readFileSync(new URL("../lib/regular/data2027-incheon.ts", import.meta.url), "utf8");
assert.match(incheonData, /finalScoreMultiplier: \(row\.csatMaximum \?\? 1000\) \/ 1000/);
assert.match(incheonData, /benchmarkYear: benchmark \? 2026 : undefined/);
assert.match(incheonData, /benchmarkCutline70: benchmark\?\.cutline70/);
assert.match(incheonData, /benchmarkSourceUrl: benchmark \? BENCHMARK_SOURCE : undefined/);
assert.match(incheonData, /"northeast-asia-trade": \{ department: "동북아국제통상전공", cutline70: 839 \}/);
assert.equal((incheonData.match(/department: "[^"]+", cutline70:/g) ?? []).length, 56);
assert.match(incheonData, /id: "design", department: "디자인학부", group: "가", count: 14, field: "design"/);
assert.match(incheonData, /id: "early-childhood", department: "유아교육과", group: "가", count: 9/);
assert.match(incheonData, /id: "smart-logistics", department: "스마트물류공학전공", group: "다", count: 7, field: "natural"/);
const incheonRows = [...incheonData.matchAll(/\{ id: "([^"]+)", department: "([^"]+)", group: "([가나다])", count: (\d+), field: "([^"]+)"(?:, [^}]+)? \}/g)];
const incheonTotals = incheonRows.reduce((totals, row) => {
  totals[row[3]] += Number(row[4]);
  return totals;
}, { 가: 0, 나: 0, 다: 0 });
assert.equal(incheonRows.length, 60);
assert.equal(new Set(incheonRows.map((row) => row[1])).size, 60);
assert.deepEqual(incheonTotals, { 가: 405, 나: 64, 다: 285 });
assert.match(incheonData, /id: "sports-science", department: "스포츠과학부", group: "가", count: 27, field: "natural", majorGroup: "예체능·체육", koreanWeight: 45, mathWeight: 0, englishWeight: 10, inquiryWeight: 45, csatMaximum: 400, practicalMaximum: 600/);
assert.match(incheonData, /id: "sports-medicine", department: "스포츠의학부", group: "가", count: 23, field: "natural", majorGroup: "예체능·체육", koreanWeight: 40, mathWeight: 0, englishWeight: 20, inquiryWeight: 40, csatMaximum: 600, practicalMaximum: 400/);
assert.match(incheonData, /id: "physical-education", department: "체육교육과", group: "가", count: 7, field: "natural", majorGroup: "예체능·체육", koreanWeight: 45, mathWeight: 0, englishWeight: 10, inquiryWeight: 45, csatMaximum: 500, practicalMaximum: 500/);
assert.match(incheonData, /id: "performing-arts", department: "공연예술학과", group: "다", count: 8, field: "humanities", majorGroup: "예체능·공연", koreanWeight: 45, mathWeight: 0, englishWeight: 10, inquiryWeight: 45, csatMaximum: 300, practicalMaximum: 700/);
assert.match(incheonData, /finalScoreMultiplier: \(row.csatMaximum \?\? 1000\) \/ 1000/);
assert.match(incheonData, /practicalEvaluationRequired: row.practicalMaximum != null/);
assert.match(incheonData, /practicalEvaluationNote: row.practicalNote/);

// 2027 Gachon official guide: group assignments are read from the General Admission 1 columns.
const gachonData = readFileSync(new URL("../lib/regular/data2027-gachon.ts", import.meta.url), "utf8");
assert.match(gachonData, /benchmarkComparable: false/);
assert.match(gachonData, /2026학년도는 국어·수학·영어 상위 3개 영역/);
assert.match(gachonData, /id: "tourism"[^\n]*group: "가"[^\n]*recruitmentCount: 15/);
assert.match(gachonData, /id: "accounting"[^\n]*group: "나"[^\n]*recruitmentCount: 15/);
assert.match(gachonData, /id: "business"[^\n]*group: "다"[^\n]*recruitmentCount: 38/);
const gachonGeneral1Text = gachonData.slice(
  gachonData.indexOf("const rows: Row[] = ["),
  gachonData.indexOf("];", gachonData.indexOf("const rows: Row[] = [")) + 2,
);
const gachonRows = [...gachonGeneral1Text.matchAll(/\{ id: "([^"]+)", department: "([^"]+)", majorGroup: "([^"]+)", group: "([가나다])", recruitmentCount: (\d+)/g)];
const gachonTotals = gachonRows.reduce((totals, row) => {
  totals[row[4]] += Number(row[5]);
  return totals;
}, { 가: 0, 나: 0, 다: 0 });
assert.equal(gachonRows.length, 47);
assert.equal(new Set(gachonRows.map((row) => row[1])).size, 47);
assert.match(gachonData, /languageMathMode: undefined/);
assert.match(gachonData, /englishInquiryMode: undefined/);
assert.deepEqual(gachonTotals, { 가: 347, 나: 346, 다: 378 });

const gachonGeneral2Text = gachonData.slice(
  gachonData.indexOf("const GENERAL2_ROWS: Row[] = ["),
  gachonData.indexOf("];", gachonData.indexOf("const GENERAL2_ROWS: Row[] = [")) + 2,
);
const gachonGeneral2Rows = [...gachonGeneral2Text.matchAll(/\{ id: "([^"]+)", department: "([^"]+)", majorGroup: "([^"]+)", group: "([가나다])", recruitmentCount: (\d+) \}/g)];
assert.equal(gachonGeneral2Rows.length, 11);
assert.equal(new Set(gachonGeneral2Rows.map((row) => row[1])).size, 11);
const gachonGeneral2Totals = gachonGeneral2Rows.reduce((totals, row) => { totals[row[4]] += Number(row[5]); return totals; }, { 가: 0, 나: 0, 다: 0 });
assert.deepEqual(gachonGeneral2Totals, { 가: 75, 나: 82, 다: 73 });
assert.match(gachonData, /scoreMetric: "등급"/);
assert.match(gachonData, /subjectGradeTables:/);
assert.match(gachonData, /calculationVerified: false/);

// 2027 서울대 정시 일반전형: 공식 요강의 모집단위별 일반전형 인원과 군·환산 보류 조건 검증
const snuData = readFileSync(new URL("../lib/regular/data2027-snu.ts", import.meta.url), "utf8");
const snuRowsText = snuData.slice(snuData.indexOf("const SNU_ROWS = ["), snuData.indexOf("] as const;"));
const snuRows = [...snuRowsText.matchAll(/\{ id: "([^"]+)", department: "([^"]+)", majorGroup: "([^"]+)", recruitmentCount: (\d+), additionalEligibilityRequired: (true|false)/g)];
assert.equal(snuRows.length, 59);
assert.equal(new Set(snuRows.map((row) => row[1])).size, 59);
assert.equal(snuRows.reduce((sum, row) => sum + Number(row[4]), 0), 1056);
assert.ok(snuRows.every((row) => row[5] === "true" || row[5] === "false"));
assert.match(snuData, /koreanWeight: 100,[\s\S]*mathWeight: 120,[\s\S]*inquiryWeight: 80/);
assert.match(snuData, /studentRecordWeight: 40/);
assert.match(snuData, /cohortNormalizationRequired: true/);
assert.match(snuData, /scienceCombinationBonusPoints: \{ "I\+I": 0, "I\+II": 3, "II\+II": 5 \}/);
assert.match(snuData, /calculationVerified: false/);
assert.match(snuData, /additionalEligibilityRequired: row.additionalEligibilityRequired/);

// 2027 연세대 서울캠퍼스 정시 일반전형: 모집단위별 가군 정원·유형 검증
const yonseiData = readFileSync(new URL("../lib/regular/data2027-yonsei.ts", import.meta.url), "utf8");
const yonseiRowsText = yonseiData.slice(yonseiData.indexOf("const YONSEI_ROWS = ["), yonseiData.indexOf("] as const;"));
const yonseiRows = [...yonseiRowsText.matchAll(/\{ id: "([^"]+)", department: "([^"]+)", majorGroup: "([^"]+)", kind: "([^"]+)", recruitmentCount: (\d+) \}/g)];
assert.equal(yonseiRows.length, 64);
assert.equal(new Set(yonseiRows.map((row) => row[1])).size, 64);
assert.equal(yonseiRows.reduce((sum, row) => sum + Number(row[5]), 0), 1373);
assert.deepEqual(yonseiRows.reduce((totals, row) => { totals[row[4]] = (totals[row[4]] ?? 0) + Number(row[5]); return totals; }, {}), { I: 473, II: 548, II_MED: 47, III: 206, III_INT: 48, SPORT_PE: 27, SPORT_APP: 24 });
assert.match(yonseiData, /inquiryConversionRequired: true/);
assert.match(yonseiData, /inquiryTypeBonusRate: inquiryBonus/);
assert.match(yonseiData, /inquiryBonusRequiresSameType: typeI \? "사탐" : typeII \? "과탐"/);
assert.match(yonseiData, /studentRecordWeight: sports \? 0 : 50/);
assert.match(yonseiData, /practicalEvaluationRequired: sports/);
assert.match(yonseiData, /additionalEligibilityRequired: interview \|\| contract/);
assert.match(yonseiData, /calculationVerified: false/);
assert.match(yonseiData, /2026-12-11/);

// 2027 고려대 서울캠퍼스 정시 일반전형: 가군 모집단위별 정원·계열 산식 검증
const koreaData = readFileSync(new URL("../lib/regular/data2027-korea.ts", import.meta.url), "utf8");
const koreaRowsText = koreaData.slice(koreaData.indexOf("const KOREA_ROWS = ["), koreaData.indexOf("] as const;"));
const koreaRows = [...koreaRowsText.matchAll(/\{ id: "([^"]+)", department: "([^"]+)", majorGroup: "([^"]+)", recruitmentCount: (\d+), kind: "([^"]+)" \}/g)];
assert.equal(koreaRows.length, 64);
assert.equal(new Set(koreaRows.map((row) => row[1])).size, 64);
assert.equal(koreaRows.reduce((sum, row) => sum + Number(row[4]), 0), 1030);
assert.deepEqual(koreaRows.reduce((totals, row) => { totals[row[5]] = (totals[row[5]] ?? 0) + Number(row[4]); return totals; }, {}), { humanities: 451, natural: 442, "contract-natural": 22, medical: 20, physical: 40, design: 35, cyber: 20 });
assert.match(koreaData, /finalScoreMultiplier: multiplier/);
assert.match(koreaData, /inquiryConversionRequired: true/);
assert.match(koreaData, /inquiryTypeBonusRate: scienceBonus/);
assert.match(koreaData, /gradeAdjustmentsAfterFinalMultiplier: true/);
assert.match(koreaData, /practicalEvaluationRequired: practical/);
assert.match(koreaData, /additionalEligibilityRequired: medicine \|\| cyber \|\| contract/);
assert.match(koreaData, /학교폭력 조치사항은 2027 정시 최종 요강의 전형별 적용 기준/);
assert.match(koreaData, /calculationVerified: false/);

// 2027 한양대 서울캠퍼스 정시 일반전형: 모집단위별 가·나·다군 인원 및 실기 구분 검증
const hanyangData = readFileSync(new URL("../lib/regular/data2027-hanyang.ts", import.meta.url), "utf8");
const hanyangRowsText = hanyangData.slice(hanyangData.indexOf("const HANYANG_ROWS = ["), hanyangData.indexOf("] as const;"));
const hanyangRows = [...hanyangRowsText.matchAll(/\{ id: "([^"]+)", department: "([^"]+)", majorGroup: "([^"]+)", recruitmentCount: (\d+), kind: "([^"]+)", group: "([^"]+)" \}/g)];
assert.equal(hanyangRows.length, 60);
assert.equal(new Set(hanyangRows.map((row) => row[1])).size, 60);
assert.equal(hanyangRows.reduce((sum, row) => sum + Number(row[4]), 0), 1297);
assert.deepEqual(hanyangRows.reduce((totals, row) => { totals[row[6]] = (totals[row[6]] ?? 0) + Number(row[4]); return totals; }, {}), { 가: 628, 나: 619, 다: 50 });
assert.match(hanyangData, /studentRecordWeight: standard \? 10 : 0/);
assert.match(hanyangData, /curriculumEvaluationRequired: standard/);
assert.match(hanyangData, /inquiryConversionRequired: inquiryRequired/);
assert.match(hanyangData, /practicalEvaluationRequired: practical/);
assert.match(hanyangData, /additionalEligibilityRequired: contract/);
assert.match(hanyangData, /학교폭력 조치사항: 1호 30점, 2·3호 100점, 4·5호 200점, 6·7호 300점 감점/);
assert.match(hanyangData, /calculationVerified: false/);

// 2027 서울시립대 정시 일반전형: 모집단위별 가·나군 인원 및 예체능 별도요소 검증
const uosData = readFileSync(new URL("../lib/regular/data2027-uos.ts", import.meta.url), "utf8");
const uosRowsText = uosData.slice(uosData.indexOf("const UOS_ROWS = ["), uosData.indexOf("] as const;"));
const uosRows = [...uosRowsText.matchAll(/\{ id: "([^"]+)", department: "([^"]+)", majorGroup: "([^"]+)", recruitmentCount: (\d+), kind: "([^"]+)", group: "([^"]+)" \}/g)];
assert.equal(uosRows.length, 45);
assert.equal(new Set(uosRows.map((row) => row[1])).size, 45);
assert.equal(uosRows.reduce((sum, row) => sum + Number(row[4]), 0), 785);
assert.deepEqual(uosRows.reduce((totals, row) => { totals[row[6]] = (totals[row[6]] ?? 0) + Number(row[4]); return totals; }, {}), { 가: 219, 나: 566 });
assert.deepEqual(uosRows.reduce((totals, row) => { totals[row[5]] = (totals[row[5]] ?? 0) + Number(row[4]); return totals; }, {}), { humanities1: 217, natural: 356, humanities2: 95, sports: 30, design: 29, sculpture: 36, music: 22 });
assert.match(uosData, /inquiryBonusRequiresSameType: typeI \? "사탐" : natural \? "과탐"/);
assert.match(uosData, /practicalEvaluationRequired: practical/);
assert.match(uosData, /additionalEligibilityRequired: interview/);
assert.match(uosData, /studentRecordWeight/);
assert.match(uosData, /학교폭력 조치사항 감점: 1~3호 1점, 4~5호 10점, 6~7호 20점, 8~9호 30점/);
assert.match(uosData, /calculationVerified: false/);

// 2027 성균관대 정시 수능위주 일반전형: 모집단위별 가·나·다군 정원 검증
const skkuData = readFileSync(new URL("../lib/regular/data2027-skku.ts", import.meta.url), "utf8");
const skkuRowsText = skkuData.slice(skkuData.indexOf("const SKKU_ROWS = ["), skkuData.indexOf("] as const;"));
const skkuRows = [...skkuRowsText.matchAll(/\{ id: "([^"]+)", department: "([^"]+)", majorGroup: "([^"]+)", recruitmentCount: (\d+), kind: "([^"]+)", group: "([^"]+)" \}/g)];
assert.equal(skkuRows.length, 30);
assert.equal(new Set(skkuRows.map((row) => row[1])).size, 30);
assert.equal(skkuRows.reduce((sum, row) => sum + Number(row[4]), 0), 1463);
assert.deepEqual(skkuRows.reduce((totals, row) => { totals[row[6]] = (totals[row[6]] ?? 0) + Number(row[4]); return totals; }, {}), { 가: 615, 나: 673, 다: 175 });
assert.deepEqual(skkuRows.reduce((totals, row) => { totals[row[5]] = (totals[row[5]] ?? 0) + Number(row[4]); return totals; }, {}), { a45: 306, a40: 190, n35: 288, n45: 385, d45: 90, d35: 85, aMed: 16, art: 75, sport: 28 });
assert.match(skkuData, /inquiryConversionRequired: true/);
assert.match(skkuData, /inquiryTypeBonusRate: scienceBonus/);
assert.match(skkuData, /mathChoiceBonusRate: mathBonus/);
assert.match(skkuData, /additionalEligibilityRequired: additionalEligibility/);
assert.match(skkuData, /practicalEvaluationRequired: hasPractical/);
assert.match(skkuData, /학교폭력 조치사항: 1호 100점 감점, 2~9호는 전형 총점 0점 처리/);
assert.match(skkuData, /calculationVerified: false/);

const admissionDataFiles = [
  "../lib/regular/data2027.ts",
  "../lib/regular/data2027-snu.ts",
  "../lib/regular/data2027-yonsei.ts",
  "../lib/regular/data2027-korea.ts",
  "../lib/regular/data2027-hanyang.ts",
  "../lib/regular/data2027-uos.ts",
  "../lib/regular/data2027-skku.ts",
  "../lib/regular/data2027Batch2.ts",
  "../lib/regular/data2027-extra-seoul.ts",
  "../lib/regular/data2027-seoulwomen.ts",
  "../lib/regular/data2027-gyeonggi.ts",
  "../lib/regular/data2027-gachon.ts",
  "../lib/regular/data2027-incheon.ts",
  "../lib/regular/data2027-seoultech.ts",
  "../lib/regular/data2027-dongguk.ts",
  "../lib/regular/data2027-konkuk.ts",
  "../lib/regular/data2027-khu-international.ts",
  "../lib/regular/data2027-sookmyung.ts",
  "../lib/regular/data2027-snue.ts",
  "../lib/regular/data2027-seokyeong.ts",
  "../lib/regular/data2027-samyuk.ts",
  "../lib/regular/data2027-hufs.ts",
];
const repositoryRegistrationSource = readFileSync(new URL("../lib/regular/repository.ts", import.meta.url), "utf8");
const registeredDataFiles = [...new Set(
  [...repositoryRegistrationSource.matchAll(/from "\.\/(data2027[^"]*)"/g)]
    .map((match) => `../lib/regular/${match[1]}.ts`)
    .filter((path) => !path.endsWith("types.ts")),
)];
assert.deepEqual(
  [...registeredDataFiles].sort(),
  [...admissionDataFiles].sort(),
  "every repository data source must be covered by the cross-file ID audit",
);
// Every exported 2027 admission dataset array must be imported and spread into
// the active repository. This prevents source-only datasets from silently
// disappearing from recommendation results.
for (const path of admissionDataFiles) {
  const source = readFileSync(new URL(path, import.meta.url), "utf8");
  const datasetExports = [...source.matchAll(/export\s+const\s+(\w*Admissions2027\w*)\b/g)].map((match) => match[1]);
  for (const datasetName of datasetExports) {
    const sourceFile = path.split("/").pop().replace(/\.ts$/, "");
    const expectedImport = `import { ${datasetName} } from "./${sourceFile}"`;
    assert.ok(
      repositoryRegistrationSource.includes(expectedImport),
      `${datasetName} must be imported into the active repository`,
    );
    assert.ok(
      repositoryRegistrationSource.includes(`...${datasetName}`),
      `${datasetName} must be spread into ALL_REGULAR_ADMISSIONS_2027`,
    );
  }
}
const ids = admissionDataFiles.filter((path) => !path.endsWith("data2027-gachon.ts")).flatMap((path) => {
  const source = readFileSync(new URL(path, import.meta.url), "utf8");
  // SNU/Yonsei/Korea use local row keys inside mapping tables; audit their final
  // globally-prefixed admission IDs instead of those intentionally repeated keys.
  const generatedIds = [...source.matchAll(/\bid:\s*`([^\`]*\$\{[^}]+\}[^\`]*)`/g)]
    .map((match) => match[1]);
  if (generatedIds.length > 0) return generatedIds;
  return [...source.matchAll(/\bid:\s*"([^"]+)"/g)].map((match) => match[1]);
});
const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
assert.deepEqual([...new Set(duplicates)], [], "2027 admission IDs must be unique across source files");

// Audit API must expose group totals and non-exclusive practical/interview recruitment totals.
const regularAuditRoute = readFileSync(new URL("../app/api/regular-audit/route.ts", import.meta.url), "utf8");
assert.match(regularAuditRoute, /recruitmentTotalsByGroup/);
assert.match(regularAuditRoute, /recruitmentTotalsByRegion/);
assert.match(regularAuditRoute, /sourceCoverage/);
assert.match(regularAuditRoute, /formulaCoverage/);
assert.match(regularAuditRoute, /pendingMaximumScores: rows\.filter/);
assert.match(regularAuditRoute, /missingInquiryConversion: rows\.filter/);
assert.match(regularAuditRoute, /missingRecruitmentCount/);
assert.match(regularAuditRoute, /recruitmentByEvaluation/);
assert.match(regularAuditRoute, /practical: admissions\.filter\(\(item\) => item\.practicalEvaluationRequired === true\)/);
assert.match(regularAuditRoute, /interview: admissions\.filter\(\(item\) => item\.interviewEvaluationRequired === true\)/);
assert.match(regularAuditRoute, /additionalEligibility: admissions\.filter\(\(item\) => item\.additionalEligibilityRequired === true\)/);

console.log("Regular scoring smoke tests passed: Seoul SNU, Yonsei, Korea, Hanyang, UOS, SKKU, SNUE, Seokyeong, Samyook and HUFS coverage, including campus/group recruitment totals, scoring weights, pending conversion guards and missing-rule checks.");

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
assert.equal(hansungTopTwo.bonus, 8);

const hansungPainting = calculateRegularAdmission({
  ...normFixture, scoreMetric:"백분위",
  subjectMetrics:{korean:"백분위",math:"백분위",inquiry:"백분위"},
  subjectMaximumScores:{korean:100,math:100,inquiry:100}, inquirySubjects:1, inquiryAggregation:"best",
  koreanWeight:40, mathWeight:40, englishWeight:40, inquiryWeight:20,
  topAreaWeights:{areas:["korean","math"],count:1,weight:40},
  finalScoreMultiplier:300, englishGradeTable:{1:100,2:97,3:94,4:80,5:70,6:55,7:40,8:25,9:10},
  koreanHistoryGradePoints:{1:1,2:1,3:1,4:1,5:0.8,6:0.6,7:0.4,8:0.2,9:0},
  schoolViolencePenaltyRequired:true, practicalEvaluationRequired:true,
}, {...sampleScore,koreanPercentile:90,mathPercentile:80,inquiry1Percentile:70,englishGrade:2,koreanHistoryGrade:5});
assert.ok(Math.abs(hansungPainting.baseScore-(0.9*0.4+0.97*0.4+0.7*0.2)*300)<0.000001);
assert.equal(hansungPainting.bonus,0.8);
assert.equal(hansungPainting.calculationVerified,false);
assert.ok(hansungPainting.missingRules.some(rule=>rule.includes("실기")));

const hansungRepository=readFileSync(new URL("../lib/regular/repository.ts",import.meta.url),"utf8");
assert.match(hansungRepository, /import \{ hansungAdmissions2027 \} from "\.\/data2027-extra-seoul"/);
assert.match(hansungRepository, /\.\.\.hansungAdmissions2027/);
const hansungData=readFileSync(new URL("../lib/regular/data2027-extra-seoul.ts",import.meta.url),"utf8");
const hansungRows=[...hansungData.matchAll(/key":"([^"]+)"[^}]*"group":"([가나다])"[^}]*"recruitmentCount":(\d+)/g)];
assert.equal(hansungRows.length,18);
assert.match(hansungData, /schoolViolencePenaltyRequired: true/);
assert.match(hansungData, /1~3호 0점, 4호 100점, 5호 200점, 6호 300점, 7호 400점 감점, 8~9호 불합격/);
assert.match(hansungData, /calculationVerified: false/);
const hansungTotals=hansungRows.reduce((totals,row)=>{totals[row[2]]+=Number(row[3]);return totals;},{가:0,나:0,다:0});
assert.deepEqual(hansungTotals,{가:247,나:75,다:185});
const hansungPracticalRows=[...hansungData.matchAll(/"field":"practical"/g)];
assert.equal(hansungPracticalRows.length,2);
assert.match(hansungData, /finalScoreMultiplier:300/);
assert.match(hansungData, /practicalEvaluationRequired:true/);
assert.match(hansungData, /const HANSUNG_HISTORY = \{ 1:1, 2:1, 3:1, 4:1, 5:0\.8, 6:0\.6, 7:0\.4, 8:0\.2, 9:0 \}/);


// 서울여대 2027: 상위 3개 영역(영어 포함) 및 20% 수학 가산·누락 입력 방어



const interviewGuard = calculateRegularAdmission({
  ...normFixture,
  interviewEvaluationRequired: true,
  interviewEvaluationNote: "면접평가 점수 입력 필요",
}, sampleScore);
assert.equal(interviewGuard.calculationVerified, false);
assert.ok(interviewGuard.missingRules.includes("면접평가 점수 입력 필요"));

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
const duksungRows=[...duksungData.matchAll(/id:"duksung-seoul-[^"]+", universityId:"duksung-seoul"[^\n]*group:"([가나다])", recruitmentCount:(\d+)/g)];
const duksungRepositorySource=readFileSync(new URL("../lib/regular/repository.ts",import.meta.url),"utf8");
assert.ok(duksungRepositorySource.includes("...duksungAdmissions2027"), "덕성여대 정시 데이터가 전체 정시 데이터에 포함되어야 함");
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

const samyukRanked = calculateRegularAdmission({
  ...normFixture,
  scoreMetric: "백분위",
  subjectMetrics: { korean: "백분위", math: "백분위", inquiry: "백분위" },
  subjectMaximumScores: { korean: 100, math: 100, inquiry: 100 },
  koreanWeight: 35, mathWeight: 25, englishWeight: 25, inquiryWeight: 15,
  inquirySubjects: 1, inquiryAggregation: "mean",
  calculationMode: "normalized-standard-sum",
  rankedAreaWeights: [35, 25, 25, 15],
  englishGradeTable: {1:98,2:95,3:92,4:87,5:82,6:70,7:50,8:40,9:30},
  finalScoreMultiplier: 1000,
}, {...sampleScore,koreanPercentile:90,mathPercentile:80,inquiry1Percentile:70,englishGrade:2});
assert.ok(samyukRanked.appliedComponents.includes("4개 영역 성적순 가중치 배정"));
assert.equal(samyukRanked.calculationVerified, true, "complete synthetic inputs should verify the ranked-area engine calculation");
const samyukNaturalBonus = calculateRegularAdmission({
  ...normFixture,
  scoreMetric: "백분위",
  subjectMetrics: { korean: "백분위", math: "백분위", inquiry: "백분위" },
  subjectMaximumScores: { korean: 100, math: 100, inquiry: 100 },
  koreanWeight: 35, mathWeight: 25, englishWeight: 25, inquiryWeight: 15,
  inquirySubjects: 1, calculationMode: "normalized-standard-sum",
  rankedAreaWeights: [35,25,25,15], englishGradeTable: {1:98,2:95,3:92,4:87,5:82,6:70,7:50,8:40,9:30},
  mathChoiceBonusRequired: true, mathChoiceBonusRate: { 미적분: 0.03, 기하: 0.03, 확률과통계: 0 },
}, {...sampleScore,mathPercentile:80,mathType:"미적분",englishGrade:2});
assert.ok(samyukNaturalBonus.appliedComponents.includes("수학 선택과목 표준점수 가산율"));
const samyukPharmacy = calculateRegularAdmission({
  ...normFixture,
  scoreMetric: "백분위",
  subjectMetrics: { korean: "백분위", math: "백분위", inquiry: "백분위" },
  subjectMaximumScores: { korean: 100, math: 100, inquiry: 100 },
  koreanWeight: 25, mathWeight: 30, englishWeight: 25, inquiryWeight: 20,
  inquirySubjects: 2, inquiryAggregation: "mean", calculationMode: "normalized-standard-sum",
  englishGradeTable: {1:98,2:95,3:92,4:87,5:82,6:70,7:50,8:40,9:30},
  mathChoiceBonusRequired: true, mathChoiceBonusRate: { 미적분: 0.05, 기하: 0.05, 확률과통계: 0 },
  inquiryTypeBonusRequired: true, inquiryTypeBonusRate: { 사탐: 0, 과탐: 0.03, 직탐: 0 },
  inquiryBonusRequiresSameType: "과탐",
}, {...sampleScore,mathType:"기하",inquiry1Type:"과탐",inquiry2Type:"과탐",englishGrade:2});
assert.ok(samyukPharmacy.appliedComponents.includes("수학 선택과목 표준점수 가산율"));
assert.ok(samyukPharmacy.appliedComponents.includes("탐구 과목별 선택유형 가산율·과목별 고정 가산점"));
