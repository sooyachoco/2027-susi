import { regularAdmissions2027 } from "./data2027";
import type { RegularAdmission } from "./types";

export function getRegularAdmissions(): RegularAdmission[] {
  return regularAdmissions2027;
}

export function findRegularAdmission(id: string): RegularAdmission | undefined {
  return regularAdmissions2027.find((item) => item.id === id);
}
