import type { Admission } from "./types";

/** 아주대학교 2027 수시 공식 자료에서 확인한 경영학과 전형 데이터.
 *
 * 경영학과 전형은 verifiedMetroCore2027.ts에서 동일 공식 자료 기준으로
 * 관리하므로 이 배치에서는 중복 생성을 하지 않는다.
 */
export const verifiedAjou2027Admissions: Admission[] = [];
