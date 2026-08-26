import type { AdmissionRegion, DataSource } from "./types";

/**
 * 2027 수도권 데이터 커버리지 백로그.
 *
 * 대입정보포털에서 2027 자료가 확인되지만 아직 최종 추천 저장소에
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
    source: adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000138"),
    note: "법학부·경영학부·컴퓨터공학과에 대해 세종인재(면접형/서류형)와 지역균형 핵심 전형을 1차 검증·편입. 전체 모집단위 및 특수전형/논술은 추가 대조 필요.",
  },
  {
    universityId: "hongik",
    name: "홍익대학교",
    region: "서울",
    status: "확장대기",
    priority: 2,
    source: adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000212"),
    note: "2027 전형평가기준 및 모집요강 존재 확인.",
  },
  {
    universityId: "catholic",
    name: "가톨릭대학교",
    region: "경기",
    status: "확장대기",
    priority: 2,
    source: adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000046"),
    note: "2027 전형평가기준 및 결과공개 자료 확인.",
  },
];

export const coverageTargetById = new Map(
  coverageTargets2027.map((target) => [target.universityId, target]),
);
