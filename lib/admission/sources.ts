import type { DataSource } from "./types";

/**
 * 2027학년도 입시 데이터 출처 카탈로그.
 * 실제 수치/전형정보를 저장할 때는 반드시 이와 같은 source 메타데이터를 함께 보존한다.
 */
export const admissionSources: Record<string, DataSource> = {
  adiga2027General: { type: "adiga", url: "https://www.adiga.kr/ucp/prc/uni/admssUnivView.do?menuId=PCPRCINF2000", document: "2027학년도 전형정보", academicYear: 2027, confidence: 0.9 },
  adiga2027ScoreService: { type: "adiga", url: "https://www.adiga.kr/cct/pbf/noticeDetail.do?menuId=PCCCTPBF1000&prtlBbsId=27317", document: "2027학년도 수시 대학별 점수산출 서비스 오픈 안내", academicYear: 2027, confidence: 0.95 },
  konkuk2027: { type: "adiga", url: "https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000052", document: "건국대학교 2027학년도 전형평가기준 및 결과공개", academicYear: 2027, confidence: 0.95 },
  uos2027: { type: "university", url: "https://admission.uos.ac.kr/admissionNew/main.do", document: "2027학년도 서울시립대학교 수시모집 신입생 모집요강", academicYear: 2027, confidence: 0.99, verifiedAt: "2026-09-05" },
  snu2027: { type: "university", url: "https://admission.snu.ac.kr/undergraduate/early/guide", document: "2027학년도 대학 신입학생 수시모집 안내", academicYear: 2027, confidence: 0.99 },
  snu2027Plan: { type: "university", url: "https://admission.snu.ac.kr/undergraduate/notice?bbsidx=154588&md=v", document: "2027학년도 대학 신입학생 입학전형 시행계획(수정)", academicYear: 2027, confidence: 0.99 },
  yonsei2027: { type: "university", url: "https://admission.yonsei.ac.kr/seoul/admission/html/rolling/guide.asp", document: "2027학년도 신입학 수시모집요강", academicYear: 2027, confidence: 0.99 },
  gachon2027: { type: "university", url: "https://admission.gachon.ac.kr/admission/html/rolling/noticeView.asp?BOARD_IDX=30228", document: "2027학년도 가천대학교 수시 모집요강", academicYear: 2027, confidence: 0.99 },
  dankook2027: { type: "university", url: "https://ipsi.dankook.ac.kr/jukjeon/notice/list.html?bbsid=juk_info&bltn_seq=50954&ctg_cd=01&mode=view", document: "2027학년도 단국대학교 수시 신입생 모집요강", academicYear: 2027, confidence: 0.99 },
  ajou2027: { type: "university", url: "https://www.iajou.ac.kr/notice/?f=&m_type=SUSI&nPage=&s=", document: "2027학년도 아주대학교 수시 모집요강 공고/수정 공고", academicYear: 2027, confidence: 0.99 },
  inha2027: { type: "adiga", url: "https://www.adiga.kr/ucp/uvt/uni/univDetail.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000169", document: "인하대학교 2027학년도 대학정보 및 수시 모집요강", academicYear: 2027, confidence: 0.95 },
  incheon2027: { type: "university", url: "https://admission.inu.ac.kr/submenu.do?menuurl=7dcKmGI5ZvQB9F1mAEBAGg%3D%3D", document: "2027학년도 인천대학교 수시모집요강", academicYear: 2027, confidence: 0.99 },
  sejong2027: { type: "university", url: "https://ipsi.sejong.ac.kr/sub_page/sub6/0101_view.asp?B_CATEGORY=1&B_CODE=BOARD_1455878015&IDX=1128&gotopage=78&search_category=&searchstring=&tab1=6", document: "2027학년도 세종대학교 수시모집 모집요강 공지(2026-05-29)", academicYear: 2027, confidence: 0.99 },
  catholic2027: { type: "adiga", url: "https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000049", document: "가톨릭대학교 2027학년도 전형평가기준 및 결과공개", academicYear: 2027, confidence: 0.95 },
  hanshin2027: { type: "university", url: "https://ent.hs.ac.kr/ipsi/pages/?b=B_1_1&bn=22867&m=read&p=17", document: "2027학년도 한신대학교 신입학 수시모집요강_최종", academicYear: 2027, confidence: 0.99, verifiedAt: "2026-08-26" },
  hongik2027: { type: "university", url: "https://www.hongik.ac.kr/kr/admission/recruitment.do?articleNo=152315", document: "2027학년도 수시모집 모집요강", academicYear: 2027, confidence: 0.99, verifiedAt: "2026-09-05" },
  sookmyung2027: { type: "university", url: "https://www.sookmyung.ac.kr/kr/admission/admission-guide.do", document: "2027학년도 숙명여자대학교 수시모집 모집요강", academicYear: 2027, confidence: 0.99, verifiedAt: "2026-09-05" },
  sungshin2027: { type: "university", url: "https://ipsi.sungshin.ac.kr/guide/dataroom.htm?bbsid=dataroom&bltn_seq=36049&ctg_cd=susi&mode=view", document: "2027학년도 수시 성신여자대학교 신입생 모집요강", academicYear: 2027, confidence: 0.99, verifiedAt: "2026-09-05" },
  myeongji2027: { type: "university", url: "https://iphak.mju.ac.kr/pages/?b=B_1_1&bn=30136&cate=%EC%88%98%EC%8B%9C&f=ALL&m=read&nPage=1&p=9", document: "2027학년도 신입학 수시 모집요강(수정 v2)", academicYear: 2027, confidence: 0.99, verifiedAt: "2026-09-05" },
  anyang2027: { type: "university", url: "https://enter.anyang.ac.kr/10000012?bbs_seq=8824&mode=view", document: "2027학년도 안양대학교 수시 모집요강(최종본)", academicYear: 2027, confidence: 0.99, verifiedAt: "2026-09-05" },
  sungkyul2027: { type: "university", url: "https://www.sungkyul.ac.kr/ipsi/101/subview.do", document: "2027학년도 성결대학교 수시모집요강", academicYear: 2027, confidence: 0.99, verifiedAt: "2026-09-05" },
  dongduk2027: { type: "university", url: "https://ipsi.dongduk.ac.kr/ipsi/contents/nontime-notice.do?id=91994&schBdcode=_ipsi_noti01&schM=view", document: "2027학년도 동덕여자대학교 신입학 수시모집요강(2026-07-13 변경공고)", academicYear: 2027, confidence: 0.99, verifiedAt: "2026-09-05" },
};