import type { Admission, Department, University } from "./types";

/**
 * Deprecated batch.
 *
 * The previous version generated identical 학생부교과/학생부종합 records
 * for every department, which was not sufficient evidence that the actual
 * 2027 모집요강 used those admissions for every 모집단위.
 *
 * Keep the module temporarily so existing imports remain build-safe, but do
 * not expose unverified records to the recommendation repository. Each
 * university must be promoted here only after its official 2027 수시
 * 모집요강 has been checked at 모집단위 × 전형 level.
 */
export const verifiedMetroBatch4Universities: University[] = [];
export const verifiedMetroBatch4Departments: Department[] = [];
export const verifiedMetroBatch4Admissions: Admission[] = [];
