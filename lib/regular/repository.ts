import { regularAdmissions2027 } from "./data2027";
import { regularAdmissions2027Batch2 } from "./data2027Batch2";
import { regularAdmissions2027SeoulExtra } from "./data2027-extra-seoul";
import { seoulwomenAdmissions2027 } from "./data2027-seoulwomen";
import { regularAdmissions2027Gyeonggi } from "./data2027-gyeonggi";
import { regularAdmissions2027Gachon } from "./data2027-gachon";
import { regularAdmissions2027Incheon } from "./data2027-incheon";
import type { RegularAdmission } from "./types";

const TARGET_REGIONS = new Set(["서울", "경기", "인천"]);

const ALL_REGULAR_ADMISSIONS_2027: RegularAdmission[] = [
  ...regularAdmissions2027,
  ...regularAdmissions2027Batch2,
  ...regularAdmissions2027SeoulExtra,
  ...seoulwomenAdmissions2027,
  ...regularAdmissions2027Gyeonggi,
  ...regularAdmissions2027Gachon,
  ...regularAdmissions2027Incheon,
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
