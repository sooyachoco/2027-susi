import type { RegularAdmission } from "./types";

const SOURCES = {
  gachon: "https://admission.gachon.ac.kr/admission/html/regular/guide.asp",
  ajou: "https://www.iajou.ac.kr/",
  kyonggi: "https://enter.kyonggi.ac.kr/",
  dankook: "https://ipsi.dankook.ac.kr/jukjeon/",
  erica: "https://goerica.hanyang.ac.kr/admission/html/regular/guide.asp",
  kau: "https://ibhak.kau.ac.kr/",
  koreatech: "https://www.kpu.ac.kr/",
};

// 2027 정시 경기권 1차 데이터. 대표 모집단위 기준이며 세부 학과별 예외는 note에 표시.
export const regularAdmissions2027Gyeonggi: RegularAdmission[] = [
  { id:"gachon-ga-humanities", universityId:"gachon", universityName:"가천대학교", region:"경기", department:"인문계열 대표", majorGroup:"인문·어문", group:"가", scoreMetric:"백분위", koreanWeight:40, mathWeight:30, englishWeight:20, inquiryWeight:10, inquirySubjects:1, note:"일반전형 대표 인문계열. 탐구 1과목.", sourceUrl:SOURCES.gachon, verifiedAt:"2026-09-27" },
  { id:"ajou-na-humanities", universityId:"ajou", universityName:"아주대학교", region:"경기", department:"인문계열 대표", majorGroup:"인문·어문", group:"나", scoreMetric:"표준점수", koreanWeight:35, mathWeight:25, englishWeight:15, inquiryWeight:25, inquirySubjects:2, note:"인문2 기준. 인문대·사회과학대·자유전공(인문).", sourceUrl:SOURCES.ajou, verifiedAt:"2026-09-27" },
  { id:"ajou-na-natural", universityId:"ajou", universityName:"아주대학교", region:"경기", department:"자연·공학계열 대표", majorGroup:"자연·공학", group:"나", scoreMetric:"표준점수", koreanWeight:20, mathWeight:35, englishWeight:15, inquiryWeight:30, inquirySubjects:2, note:"자연1 기준. 일부 선택과목 가산점 별도.", sourceUrl:SOURCES.ajou, verifiedAt:"2026-09-27" },
  { id:"kyonggi-ga-humanities", universityId:"kyonggi-suwon", universityName:"경기대학교", region:"경기", department:"인문계열 대표", majorGroup:"인문·어문", group:"가", scoreMetric:"백분위", koreanWeight:35, mathWeight:30, englishWeight:20, inquiryWeight:15, inquirySubjects:1, note:"일반학생Ⅰ B형. 탐구 상위 1과목.", sourceUrl:SOURCES.kyonggi, verifiedAt:"2026-09-27" },
  { id:"kyonggi-ga-natural", universityId:"kyonggi-suwon", universityName:"경기대학교", region:"경기", department:"자연·공학계열 대표", majorGroup:"자연·공학", group:"가", scoreMetric:"백분위", koreanWeight:30, mathWeight:35, englishWeight:20, inquiryWeight:15, inquirySubjects:1, note:"일반학생Ⅰ A형. 탐구 상위 1과목.", sourceUrl:SOURCES.kyonggi, verifiedAt:"2026-09-27" },
  { id:"dankook-jukjeon-ga-humanities", universityId:"dankook-jukjeon", universityName:"단국대학교(죽전)", region:"경기", department:"인문계열 대표", majorGroup:"인문·어문", group:"가", scoreMetric:"백분위", koreanWeight:35, mathWeight:25, englishWeight:20, inquiryWeight:20, inquirySubjects:2, note:"2027 정시 모집요강 공개본 기준 대표 계열.", sourceUrl:SOURCES.dankook, verifiedAt:"2026-09-27" },
  { id:"dankook-jukjeon-na-natural", universityId:"dankook-jukjeon", universityName:"단국대학교(죽전)", region:"경기", department:"자연·공학계열 대표", majorGroup:"자연·공학", group:"나", scoreMetric:"백분위", koreanWeight:25, mathWeight:35, englishWeight:15, inquiryWeight:25, inquirySubjects:2, note:"자연계 대표. 모집단위별 가산점·환산식 확인.", sourceUrl:SOURCES.dankook, verifiedAt:"2026-09-27" },
  { id:"hanyang-erica-ga-natural", universityId:"hanyang-erica", universityName:"한양대학교 ERICA", region:"경기", department:"자연1·공학계열 대표", majorGroup:"자연·공학", group:"가", scoreMetric:"표준점수", koreanWeight:25, mathWeight:35, englishWeight:15, inquiryWeight:25, inquirySubjects:2, note:"자연1 기준. 탐구 변환표준점수, 한국사 가점.", sourceUrl:SOURCES.erica, verifiedAt:"2026-09-27" },
  { id:"hanyang-erica-ga-business", universityId:"hanyang-erica", universityName:"한양대학교 ERICA", region:"경기", department:"상경·인문계열 대표", majorGroup:"경영·경제", group:"가", scoreMetric:"표준점수", koreanWeight:35, mathWeight:30, englishWeight:15, inquiryWeight:20, inquirySubjects:2, note:"인문·상경 대표. 세부 모집단위별 최종요강 확인.", sourceUrl:SOURCES.erica, verifiedAt:"2026-09-27" },
  { id:"kau-ga-engineering", universityId:"kau", universityName:"한국항공대학교", region:"경기", department:"공과대학 대표", majorGroup:"자연·공학", group:"가", scoreMetric:"표준점수", koreanWeight:20, mathWeight:35, englishWeight:20, inquiryWeight:25, inquirySubjects:1, note:"탐구 1과목, 영어 등급환산, 한국사 가점.", sourceUrl:SOURCES.kau, verifiedAt:"2026-09-27" },
  { id:"kau-ga-business", universityId:"kau", universityName:"한국항공대학교", region:"경기", department:"항공·경영대학 대표", majorGroup:"경영·경제", group:"가", scoreMetric:"표준점수", koreanWeight:25, mathWeight:30, englishWeight:20, inquiryWeight:25, inquirySubjects:1, note:"사회적성 기준. 탐구 1과목.", sourceUrl:SOURCES.kau, verifiedAt:"2026-09-27" },
  { id:"koreatech-ga-engineering", universityId:"koreatech", universityName:"한국공학대학교", region:"경기", department:"공학계열 대표", majorGroup:"자연·공학", group:"가", scoreMetric:"백분위", koreanWeight:25, mathWeight:35, englishWeight:20, inquiryWeight:20, inquirySubjects:1, note:"대표 공학계열. 학과별 반영유형이 다름.", sourceUrl:SOURCES.koreatech, verifiedAt:"2026-09-27" },
];
