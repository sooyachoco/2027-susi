import type { University } from "./types";

/**
 * 2027 수시 서비스의 1차 실제 데이터 수집 범위.
 * 서울·경기·인천만 대상으로 하며, 그 외 지역은 추천 데이터에서 제외한다.
 */
export const ADMISSION_REGIONS = ["서울", "경기", "인천"] as const;
export type AdmissionRegion = (typeof ADMISSION_REGIONS)[number];

export function isTargetRegion(region?: string): region is AdmissionRegion {
  return region === "서울" || region === "경기" || region === "인천";
}

export function filterTargetRegionUniversities(universities: University[]) {
  return universities.filter((university) => isTargetRegion(university.region));
}
