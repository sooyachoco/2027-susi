import type { AdmissionSource } from "../types";

/**
 * 2027학년도 수시 공식 원문 수집 대상.
 * 전형 행을 만들 때 이 출처를 우선 사용한다.
 */
export const REGION_2027_OFFICIAL_SOURCES: Record<string, AdmissionSource> = {
  snu: {
    type: "university",
    url: "https://admission.snu.ac.kr/undergraduate/early/guide",
    document: "2027학년도 수시모집 안내",
    verifiedAt: "2026-08-26",
    confidence: 1,
  },
  yonsei: {
    type: "university",
    url: "https://admission.yonsei.ac.kr/seoul/admission/html/rolling/guide.asp",
    document: "2027학년도 신입학 수시모집요강",
    verifiedAt: "2026-08-26",
    confidence: 1,
  },
  korea: {
    type: "university",
    url: "https://oku.korea.ac.kr/oku/index.do",
    document: "2027학년도 수시모집요강",
    verifiedAt: "2026-08-26",
    confidence: 1,
  },
  uos: {
    type: "university",
    url: "https://www.uos.ac.kr/admissionNew/main.do",
    document: "2027학년도 수시 모집요강",
    verifiedAt: "2026-08-26",
    confidence: 1,
  },
  kookmin: {
    type: "university",
    url: "https://admission.kookmin.ac.kr/onschedule/notice.php?ctype=view&no=1081&page=1",
    document: "2027학년도 수시 주요사항 안내",
    verifiedAt: "2026-08-26",
    confidence: 1,
  },
  adiga: {
    type: "adiga",
    url: "https://www.adiga.kr/",
    document: "2027학년도 대학별 전형평가기준 및 주요사항",
    verifiedAt: "2026-08-26",
    confidence: 0.95,
  },
};
