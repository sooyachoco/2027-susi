import type { AdmissionRegion, DataSource } from "./types";
import { admissionSources } from "./sources";

/**
 * 2027 수도권 수시 데이터 커버리지 백로그.
 *
 * 대입정보포털 또는 대학 입학처에서 2027 자료가 확인되지만 아직 최종 추천 저장소에
 * 충분한 모집단위/전형 단위로 편입하지 않은 대학을 관리한다.
 * 이 목록 자체는 추천 데이터가 아니며, 검증 완료 전에는 추천 결과에 사용하지 않는다.
 */
export type CoverageStatus = "확장대기" | "부분검증";

export type CoverageTarget = {
  universityId: string;
  name: string;
  region: AdmissionRegion;
  status: CoverageStatus;
  priority: number;
  source: DataSource;
  note: string;
};

const adiga = (url: string): DataSource => ({
  type: "adiga",
  url,
  academicYear: 2027,
  confidence: 0.95,
});

export const coverageTargets2027: CoverageTarget[] = [
  {
    universityId: "anyang",
    name: "안양대학교",
    region: "경기",
    status: "부분검증",
    priority: 1,
    source: adiga("https://www.adiga.kr/ucp/uvt/uni/univDetail.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000147"),
    note: "2027 수시 최종 모집요강을 대조해 자유전공·유아교육·글로벌경영·행정·데이터사이언스·AI·디지털미디어디자인·정보전기전자·환경에너지·스포츠 핵심 모집단위의 아리학생부교과·아리학생부면접·아리학생부종합을 verified로 편입. 전체 모집단위와 특수전형·실기전형은 추가 검증한다.",
  },
  {
    universityId: "sookmyung",
    name: "숙명여자대학교",
    region: "서울",
    status: "부분검증",
    priority: 1,
    source: adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000141"),
    note: "핵심 모집단위·전형을 verified 데이터로 편입. 전체 모집단위/전형별 세부 검증은 계속 진행.",
  },
  {
    universityId: "seoultech",
    name: "서울과학기술대학교",
    region: "서울",
    status: "부분검증",
    priority: 1,
    source: adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000036"),
    note: "23개 모집단위와 학교생활우수자·고교추천을 verified로 편입. 모집단위별 실제 적용 전형과 모집인원 세부 대조 필요.",
  },
  {
    universityId: "sejong",
    name: "세종대학교",
    region: "서울",
    status: "부분검증",
    priority: 1,
    source: admissionSources.sejong2027,
    note: "2026-05-29 세종대학교 입학처가 2027 수시모집요강을 공식 공지함. 법학부·경영학부·컴퓨터공학과 핵심 전형을 우선 대조하고, 전체 모집단위·특수전형·논술은 추가 검증한다.",
  },
  {
    universityId: "hongik",
    name: "홍익대학교",
    region: "서울",
    status: "부분검증",
    priority: 2,
    source: adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000212"),
    note: "경영학부·컴퓨터공학과에 학교생활우수자와 학교장추천자 핵심 전형을 1차 검증·편입. 전체 모집단위 및 논술/고른기회 세부 대조 필요.",
  },
  {
    universityId: "catholic",
    name: "가톨릭대학교",
    region: "경기",
    status: "부분검증",
    priority: 2,
    source: admissionSources.catholic2027,
    note: "2027 공식 수시 자료를 기준으로 성심교정 핵심 모집단위와 성의교정 의예과·간호학과까지 verified 편입. 현재 자유전공·인문사회·자연공학·바이오·AI의공학·정보통신전자·미디어기술콘텐츠·약학 등은 학과 존재는 확인했으나 2027 전형별 모집인원/반영방법을 공식 원문으로 충분히 대조하지 못해 추천 데이터에는 아직 편입하지 않는다. 논술·특수전형 및 나머지 모집단위는 추가 검증한다.",
  },
  {
    universityId: "sungkyul",
    name: "성결대학교",
    region: "경기",
    status: "부분검증",
    priority: 1,
    source: adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000131"),
    note: "2027 성결대 공식 입학처에서 신설·명칭변경 모집단위 12개를 확인해 verified 데이터에 편입했다. 한국어문화학과·영미언어문화학과·중국어문화학과·스마트관광항공학부 2개 전공·국제교류·개발협력학과·컴퓨터AI공학과·ICT공학과·산업시스템공학과·스마트도시공학과·화장품공학과·SK자율전공학부가 확인됐다. 다만 최종 모집요강 기준 학과별 모집인원/전형 배정은 별도 대조가 필요하므로 부분검증을 유지한다.",
  },
  {
    universityId: "hanshin",
    name: "한신대학교",
    region: "경기",
    status: "부분검증",
    priority: 1,
    source: adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000202"),
    note: "2027 수시 총 1,136명 및 논술·참인재·학생부우수자·학교장추천 등 주요 전형을 확인. 계열모집 및 핵심 모집단위별 모집인원·반영방법을 추가 검증한다.",
  },
  {
    universityId: "hyupsung",
    name: "협성대학교",
    region: "경기",
    status: "부분검증",
    priority: 1,
    source: { type: "university", url: "https://hiphak.uhs.ac.kr/ipsi/board/notice/list.do", academicYear: 2027, confidence: 0.95 },
    note: "대학 입학처가 2026-07-01 최종 2027 수시 모집요강과 융합인재Ⅰ·Ⅱ 학생부종합 가이드북을 공지. 모집단위별 교과·학종·실기 세부를 공식 원문 기준으로 추가 편입한다.",
  },
  {
    universityId: "kangnam",
    name: "강남대학교",
    region: "경기",
    status: "부분검증",
    priority: 1,
    source: { type: "university", url: "https://admission.kangnam.ac.kr/ipsi/yogang.htm?ctg_cd=susi1", academicYear: 2027, confidence: 0.95 },
    note: "2027 수시 신입생 모집요강이 2026-05-29 게시됨. 상경·컴퓨터·AI·사회복지 등 핵심 모집단위의 전형별 모집인원과 반영방법을 추가 대조한다.",
  },
  {
    universityId: "yongin",
    name: "용인대학교",
    region: "경기",
    status: "확장대기",
    priority: 2,
    source: adiga("https://www.adiga.kr/ucp/uvt/uni/univDetail.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000156"),
    note: "2027 수시 모집요강이 확인되며 인문사회·AI융합·경영·문화콘텐츠·경찰행정·보건·체육·예체능 등 모집단위가 넓다. 전형별 세부 검증 후 추천 데이터로 편입한다.",
  },
];

export const coverageTargetById = new Map(
  coverageTargets2027.map((target) => [target.universityId, target]),
);
