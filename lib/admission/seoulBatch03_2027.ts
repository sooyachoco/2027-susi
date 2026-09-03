import type { Admission, Department, University } from "./types";

// Legacy compatibility module.
// This batch is intentionally quarantined to prevent stale duplicate data
// from entering the runtime dataset.
// Superseded by dedicated verified modules:
// - Catholic Seongui -> catholicSeongui2027.ts
// - Seokyeong -> seokyeong2027.ts
// - Hansung -> verifiedHansung2027.ts
// Catholic Seongsin is intentionally excluded (theology).
export const seoulBatch03_2027Universities: University[] = [];
export const seoulBatch03_2027Departments: Department[] = [];
export const seoulBatch03_2027Admissions: Admission[] = [];
