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
    note: "2027학년도 수시모집요강(2026-05-27 공표)과 대입정보포털 자료를 대조해 경영학과·법학과·컴퓨터정보공학부·인공지능학과·데이터사이언스학과의 지역균형·잠재능력우수자서류·잠재능력우수자면접 핵심 전형을 verified 편입. 나머지 모집단위·특수전형·논술은 추가 검증한다.",
  },
];

export const coverageTargetById = new Map(
  coverageTargets2027.map((target) => [target.universityId, target]),
);
