import { regularAdmissions2027 } from "./data2027";
import { regularAdmissions2027Batch2 } from "./data2027Batch2";
import { regularAdmissions2027SeoulExtra } from "./data2027-extra-seoul";
import { regularAdmissions2027Gyeonggi } from "./data2027-gyeonggi";
import type { RegularAdmission } from "./types";

const ALL_REGULAR_ADMISSIONS_2027: RegularAdmission[] = [
  ...regularAdmissions2027,
  ...regularAdmissions2027Batch2,
  ...regularAdmissions2027SeoulExtra,
  ...regularAdmissions2027Gyeonggi,
];

const TARGET_REGIONS = new Set(["서울", "경기", "인천"]);

function isExcludedAdmission(item: RegularAdmission) {
  const text = `${item.universityName} ${item.department} ${item.majorGroup}`.replace(/\s+/g, "");
  return text.includes("신학") || text.includes("신학대");
}

export function getRegularAdmissions(): RegularAdmission[] {
  return ALL_REGULAR_ADMISSIONS_2027.filter(
    (item) => TARGET_REGIONS.has(item.region) && !isExcludedAdmission(item),
  );
}

export function findRegularAdmission(id: string): RegularAdmission | undefined {
  return getRegularAdmissions().find((item) => item.id === id);
}
