import type { DataSource } from "./types";

/**
 * 2027학년도 입시 데이터 출처 카탈로그.
 * 실제 수치/전형정보를 저장할 때는 반드시 이와 같은 source 메타데이터를 함께 보존한다.
 */
export const admissionSources: Record<string, DataSource> = {
  adiga2027General: {
    type: "adiga",
    url: "https://www.adiga.kr/ucp/prc/uni/admssUnivView.do?menuId=PCPRCINF2000",
    document: "2027학년도 전형정보",
    academicYear: 2027,
    confidence: 0.9,
  },
  adiga2027ScoreService: {
    type: "adiga",
    url: "https://www.adiga.kr/cct/pbf/noticeDetail.do?menuId=PCCCTPBF1000&prtlBbsId=27317",
    document: "2027학년도 수시 대학별 점수산출 서비스 오픈 안내",
    academicYear: 2027,
    confidence: 0.95,
  },
  konkuk2027: {
    type: "adiga",
    url: "https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000052",
    document: "건국대학교 2027학년도 전형평가기준 및 결과공개",
    academicYear: 2027,
    confidence: 0.95,
  },
  uos2027: {
    type: "adiga",
    url: "https://www.adiga.kr/ucp/uvt/uni/univDetail.do?menuId=PCUVTINF2000&searchSyr=2027&searchUnvCodeAllYn=true&sortNm=&sortOrder=true&unvCd=0000040&unvLink=on",
    document: "서울시립대학교 2027학년도 대학정보",
    academicYear: 2027,
    confidence: 0.9,
  },
  snu2027: {
    type: "university",
    url: "https://admission.snu.ac.kr/undergraduate/early/guide",
    document: "2027학년도 대학 신입학생 수시모집 안내",
    academicYear: 2027,
    confidence: 0.99,
  },
  snu2027Plan: {
    type: "university",
    url: "https://admission.snu.ac.kr/undergraduate/notice?bbsidx=154588&md=v",
    document: "2027학년도 대학 신입학생 입학전형 시행계획(수정)",
    academicYear: 2027,
    confidence: 0.99,
  },
  yonsei2027: {
    type: "university",
    url: "https://admission.yonsei.ac.kr/seoul/admission/html/rolling/guide.asp",
    document: "2027학년도 신입학 수시모집요강",
    academicYear: 2027,
    confidence: 0.99,
  },
};
