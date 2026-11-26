import { regularAdmissions2027 } from "./data2027";
import { snuAdmissions2027 } from "./data2027-snu";
import { yonseiAdmissions2027 } from "./data2027-yonsei";
import { koreaAdmissions2027 } from "./data2027-korea";
import { hanyangSeoulAdmissions2027 } from "./data2027-hanyang";
import { uosAdmissions2027 } from "./data2027-uos";
import { skkuAdmissions2027 } from "./data2027-skku";
import { regularAdmissions2027Batch2 } from "./data2027Batch2";
import { regularAdmissions2027SeoulExtra } from "./data2027-extra-seoul";
import { hansungAdmissions2027 } from "./data2027-extra-seoul";
import { duksungAdmissions2027 } from "./data2027-extra-seoul";
import { seoulwomenAdmissions2027 } from "./data2027-seoulwomen";
import { regularAdmissions2027Gyeonggi } from "./data2027-gyeonggi";
import { regularAdmissions2027Gachon } from "./data2027-gachon";
import { regularAdmissions2027Incheon } from "./data2027-incheon";
import { inhaAdmissions2027 } from "./data2027-inha";
import { seoultechAdmissions2027 } from "./data2027-seoultech";
import { donggukAdmissions2027 } from "./data2027-dongguk";
import { konkukAdmissions2027 } from "./data2027-konkuk";
import { khuInternationalAdmissions2027 } from "./data2027-khu-international";
import { snueAdmissions2027 } from "./data2027-snue";
import { seokyeongAdmissions2027 } from "./data2027-seokyeong";
import { samyukAdmissions2027 } from "./data2027-samyuk";
import { hufsAdmissions2027 } from "./data2027-hufs";
import { sookmyungAdmissions2027 } from "./data2027-sookmyung";
import type { RegularAdmission } from "./types";

const TARGET_REGIONS = new Set(["서울", "경기", "인천"]);

const ALL_REGULAR_ADMISSIONS_2027: RegularAdmission[] = [
  ...regularAdmissions2027,
  ...snuAdmissions2027,
  ...yonseiAdmissions2027,
  ...koreaAdmissions2027,
  ...hanyangSeoulAdmissions2027,
  ...uosAdmissions2027,
  ...skkuAdmissions2027,
  ...regularAdmissions2027Batch2,
  ...regularAdmissions2027SeoulExtra,
  ...hansungAdmissions2027,
  ...duksungAdmissions2027,
  ...seoulwomenAdmissions2027,
  ...regularAdmissions2027Gyeonggi,
  ...regularAdmissions2027Gachon,
  ...regularAdmissions2027Incheon,
  ...inhaAdmissions2027,
  ...seoultechAdmissions2027,
  ...donggukAdmissions2027,
  ...konkukAdmissions2027,
  ...khuInternationalAdmissions2027,
  ...snueAdmissions2027,
  ...seokyeongAdmissions2027,
  ...samyukAdmissions2027,
  ...hufsAdmissions2027,
  ...sookmyungAdmissions2027,
];

function isExcludedAdmission(item: RegularAdmission) {
  const text = `${item.universityName} ${item.department} ${item.majorGroup}`.replace(/\s+/g, "");
  return text.includes("신학") || text.includes("신학대");
}

export function getRegularAdmissions(): RegularAdmission[] {
  const seen = new Set<string>();
  return ALL_REGULAR_ADMISSIONS_2027.filter((item) => {
    if (!TARGET_REGIONS.has(item.region) || isExcludedAdmission(item)) return false;
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

export function findRegularAdmission(id: string): RegularAdmission | undefined {
  return getRegularAdmissions().find((item) => item.id === id);
}

/**
 * Audits the raw source rows before getRegularAdmissions() deduplicates them.
 * This keeps cross-file ID collisions visible to the audit API.
 */
export function getRegularAdmissionSourceAudit() {
  const sourceRows = ALL_REGULAR_ADMISSIONS_2027.filter((item) =>
    TARGET_REGIONS.has(item.region) && !isExcludedAdmission(item),
  );
  const counts = sourceRows.reduce<Record<string, number>>((result, item) => {
    result[item.id] = (result[item.id] ?? 0) + 1;
    return result;
  }, {});
  return {
    sourceRows: sourceRows.length,
    uniqueIds: Object.keys(counts).length,
    duplicateIds: Object.entries(counts)
      .filter(([, count]) => count > 1)
      .map(([id, count]) => ({ id, count })),
  };
}
