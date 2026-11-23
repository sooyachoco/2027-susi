import type { RegularAdmission } from "./types";

const SKKU_SOURCE = "https://admission.skku.edu/admission/html/regular/guide.html";
const SOGANG_SOURCE = "https://admission.sogang.ac.kr/";
const HONGIK_SOURCE = "https://admission.hongik.ac.kr/";

// 2027 정시 2차 배치. 대표 모집단위 기준으로 먼저 연결하고, 세부 모집단위는 후속 배치에서 확장한다.
export const regularAdmissions2027Batch2: RegularAdmission[] = [
  {
    id: "skku-seoul-ga-social",
    universityId: "skku-seoul",
    universityName: "성균관대학교",
    region: "서울",
    department: "사회과학계열",
    majorGroup: "사회·정책",
    group: "가",
    scoreMetric: "표준점수",
    koreanWeight: 45,
    mathWeight: 35,
    englishWeight: 10,
    inquiryWeight: 10,
    inquirySubjects: 2,
    note: "2027 정시 일반계열 대표 기준. 국어·수학 중 우수 영역 45%, 나머지 35%, 탐구 10%, 영어 10% 구조. 모집단위별 세부사항 확인.",
    sourceUrl: SKKU_SOURCE,
    verifiedAt: "2026-09-27",
  },
  {
  {
    id: "sogang-seoul-na-general",
    universityId: "sogang-seoul",
    universityName: "서강대학교",
    region: "서울",
    department: "일반전형 모집단위",
    majorGroup: "전체",
    group: "나",
    scoreMetric: "표준점수",
    koreanWeight: 36.7,
    mathWeight: 43.3,
    englishWeight: 0,
    inquiryWeight: 20,
    inquirySubjects: 2,
    note: "국어·수학 중 우수 영역 43.3%, 나머지 36.7%, 탐구 20%를 각각 계산한 뒤 높은 유형을 반영. 영어·한국사는 별도 등급환산/가점.",
    sourceUrl: SOGANG_SOURCE,
    verifiedAt: "2026-09-27",
  },
  {
  {
];
