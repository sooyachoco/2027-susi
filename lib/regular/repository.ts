import { regularAdmissions2027 } from "./data2027";
import { regularAdmissions2027Batch2 } from "./data2027Batch2";
import { regularAdmissions2027SeoulExtra } from "./data2027-extra-seoul";
import type { RegularAdmission } from "./types";

const ALL_REGULAR_ADMISSIONS_2027: RegularAdmission[] = [
  ...regularAdmissions2027,
  ...regularAdmissions2027Batch2,
  ...regularAdmissions2027SeoulExtra,
];

export function getRegularAdmissions(): RegularAdmission[] {
  return ALL_REGULAR_ADMISSIONS_2027;
}

export function findRegularAdmission(id: string): RegularAdmission | undefined {
  return ALL_REGULAR_ADMISSIONS_2027.find((item) => item.id === id);
}
