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
    universityId: "kyunghee",
    name: "경희대학교",
    region: "서울",
    status: "확장대기",
    priority: 1,
    source: adiga("https://m.adiga.kr/mob/ucp/uvt/uni/univDetailSelection.do?menuId=MOUVTINF1001&searchSyr=2027&unvCd=0000066"),
    note: "2027 전형평가기준 확인. 서울 주요 대학 우선 확장 대상.",
  },
  {
    universityId: "hufs",
    name: "한국외국어대학교",
    region: "서울",
    status: "확장대기",
    priority: 1,
    source: adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000192"),
    note: "면접형·SW인재·서류형·학교장추천 등 2027 전형 구조 확인.",
  },
  {
    universityId: "sookmyung",
    name: "숙명여자대학교",
    region: "서울",
    status: "확장대기",
    priority: 1,
    source: adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000141"),
    note: "숙명인재·소프트웨어인재·지역균형 등 2027 변경사항 확인.",
  },
  {
    universityId: "seoultech",
    name: "서울과학기술대학교",
    region: "서울",
    status: "확장대기",
    priority: 1,
    source: adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000036"),
    note: "학교생활우수자·창의융합인재 등 2027 학생부종합 구조 확인.",
  },
  {
    universityId: "sejong",
    name: "세종대학교",
    region: "서울",
    status: "확장대기",
    priority: 1,
    source: adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000138"),
    note: "세종인재 면접형·서류형·기회균형 등 2027 구조 확인.",
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
    universityId: "hanyang-erica",
    name: "한양대학교(ERICA)",
    region: "경기",
    status: "확장대기",
    priority: 1,
    source: adiga("https://www.adiga.kr/ucp/uvt/uni/univDetail.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000204"),
    note: "ERICA 2027 모집요강 및 전형평가기준 확인.",
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
