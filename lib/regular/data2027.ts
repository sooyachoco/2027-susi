import type { RegularAdmission } from "./types";

const HANYANG_SOURCE = "https://go.hanyang.ac.kr/web/mojib/mojib.do?m_type=JEONGSI";
const SNU_SOURCE = "https://admission.snu.ac.kr/undergraduate/regular/guide";
const YONSEI_SOURCE = "https://admission.yonsei.ac.kr/seoul/admission/html/main/main.asp";
const KOREA_SOURCE = "https://oku.korea.ac.kr/";
const UOS_SOURCE = "https://admission.uos.ac.kr/admissionNew/html/jungsi/info.do?menuid=2002002001000000000";
const HUFS_SOURCE = "https://admission.hufs.ac.kr/";
const CAU_SOURCE = "https://admission.cau.ac.kr/";
const KHU_SOURCE = "https://iphak.khu.ac.kr/";
const EWHA_SOURCE = "https://admission.ewha.ac.kr/admission/html/regular/guide.asp";
const KONKUK_SOURCE = "https://enter.konkuk.ac.kr/";
const DONGGUK_SOURCE = "https://ipsi.dongguk.edu/";
const SOOKMYUNG_SOURCE = "https://admission.sookmyung.ac.kr/";
const KOOKMIN_SOURCE = "https://admission.kookmin.ac.kr/";

// 2027 정시 확인 데이터. 9월 공개 최종 모집요강/입학처 자료를 기준으로 순차 검증한다.
// 현재 엔진은 모의지원 지수 단계이며, 대학별 변환표준점수·영어/한국사 세부 환산식은 별도 엔진으로 확장한다.
export const regularAdmissions2027: RegularAdmission[] = [
  ...(["가", "나"] as const).flatMap((group) => [
    {
      id: `hanyang-seoul-${group}-humanities`, universityId: "hanyang-seoul", universityName: "한양대학교", region: "서울",
      department: "인문계열", majorGroup: "인문·어문", group, scoreMetric: "표준점수" as const, koreanWeight: 35, mathWeight: 30, englishWeight: 10, inquiryWeight: 25, inquirySubjects: 2 as const,
      note: "수능 100%. 국어 35 / 수학 30 / 영어 10 / 탐구 25", sourceUrl: HANYANG_SOURCE, verifiedAt: "2026-09-14",
    },
    {
      id: `hanyang-seoul-${group}-natural`, universityId: "hanyang-seoul", universityName: "한양대학교", region: "서울",
      department: "자연계열", majorGroup: "자연·공학", group, scoreMetric: "표준점수" as const, koreanWeight: 25, mathWeight: 40, englishWeight: 10, inquiryWeight: 25, inquirySubjects: 2 as const,
      recruitmentCount: 18, benchmarkYear: 2025, benchmarkCutline70: 941.99, benchmarkDepartment: "건축학부", note: "수능 100%. 국어 25 / 수학 40 / 영어 10 / 탐구 25. 전년도 건축학부 70%컷 941.99/1,000 벤치마크.", sourceUrl: HANYANG_SOURCE, verifiedAt: "2026-09-29",
    },
    {
      id: `hanyang-seoul-${group}-business`, universityId: "hanyang-seoul", universityName: "한양대학교", region: "서울",
      department: "상경계열", majorGroup: "경영·경제", group, scoreMetric: "표준점수" as const, koreanWeight: 35, mathWeight: 35, englishWeight: 10, inquiryWeight: 20, inquirySubjects: 2 as const,
      note: "수능 100%. 국어 35 / 수학 35 / 영어 10 / 탐구 20", sourceUrl: HANYANG_SOURCE, verifiedAt: "2026-09-14",
    },
  ]),
  {
    id: "hanyang-seoul-da-intercollege", universityId: "hanyang-seoul", universityName: "한양대학교", region: "서울",
    department: "한양인터칼리지학부", majorGroup: "전체", group: "다", scoreMetric: "표준점수", koreanWeight: 35, mathWeight: 35, englishWeight: 10, inquiryWeight: 20,
    inquirySubjects: 2, studentRecordWeight: 10, recruitmentCount: 60, note: "수능 90% + 학생부종합평가 10%", sourceUrl: HANYANG_SOURCE, verifiedAt: "2026-09-14",
  },
  {
    id: "snu-seoul-na-general", universityId: "snu-seoul", universityName: "서울대학교", region: "서울",
    department: "일반전형 모집단위", majorGroup: "전체", group: "나", scoreMetric: "표준점수", koreanWeight: 33.3, mathWeight: 40, englishWeight: 0, inquiryWeight: 26.7,
    inquirySubjects: 2, studentRecordWeight: 20, note: "일반전형 2단계 기준 수능 80% + 교과평가 20%. 수능 표준점수 기반, 영어·한국사 반영은 별도. 모집단위별 지원조건 확인 필요.", sourceUrl: SNU_SOURCE, verifiedAt: "2026-09-29",
  },
  {
    id: "yonsei-seoul-ga-general", universityId: "yonsei-seoul", universityName: "연세대학교", region: "서울",
    department: "일반전형 모집단위", majorGroup: "전체", group: "가", scoreMetric: "표준점수", koreanWeight: 22.2, mathWeight: 33.3, englishWeight: 11.1, inquiryWeight: 33.3,
    inquirySubjects: 2, benchmarkYear: 2025, benchmarkCutline70: 695.0553, benchmarkTotalScore: 1000, benchmarkDepartment: "사학과", recruitmentCount: 22, note: "일반전형 기준. 2025학년도 사학과 정시 70%컷 695.0553/1,000 벤치마크. 모집단위별 가산점·지원조건은 최종 요강 확인.", sourceUrl: YONSEI_SOURCE, verifiedAt: "2026-09-29",
  },
  {
    id: "korea-seoul-ga-general", universityId: "korea-seoul", universityName: "고려대학교", region: "서울",
    department: "일반전형 모집단위", majorGroup: "전체", group: "가", scoreMetric: "표준점수", koreanWeight: 31.25, mathWeight: 37.5, englishWeight: 0, inquiryWeight: 31.25,
    inquirySubjects: 2, note: "수능 100% 일반전형 기준. 영어·한국사 등급별 감점 별도.", sourceUrl: KOREA_SOURCE, verifiedAt: "2026-09-21",
  },
  {
    id: "uos-seoul-ga-humanities", universityId: "uos-seoul", universityName: "서울시립대학교", region: "서울",
    department: "인문계열", majorGroup: "인문·어문", group: "가", scoreMetric: "표준점수", koreanWeight: 35, mathWeight: 25, englishWeight: 20, inquiryWeight: 20,
    inquirySubjects: 2, note: "인문계열 적용 비율. 모집단위별 인문Ⅰ·Ⅱ 구분과 지원조건 확인.", sourceUrl: UOS_SOURCE, verifiedAt: "2026-09-21",
  },
  {
    id: "uos-seoul-ga-natural", universityId: "uos-seoul", universityName: "서울시립대학교", region: "서울",
    department: "자연계열", majorGroup: "자연·공학", group: "가", scoreMetric: "표준점수", koreanWeight: 30, mathWeight: 40, englishWeight: 10, inquiryWeight: 20,
    inquirySubjects: 2, note: "자연계열 적용 비율. 과탐 2과목 선택 시 탐구 가산점 별도.", sourceUrl: UOS_SOURCE, verifiedAt: "2026-09-21",
  },
  {
    id: "hufs-seoul-ga-humanities", universityId: "hufs-seoul", universityName: "한국외국어대학교", region: "서울",
    department: "인문A", majorGroup: "인문·어문", group: "가", scoreMetric: "표준점수", koreanWeight: 30, mathWeight: 30, englishWeight: 20, inquiryWeight: 20,
    inquirySubjects: 2, benchmarkYear: 2025, benchmarkCutline70: 651.1, benchmarkTotalScore: 710, benchmarkDepartment: "ELLT학과", recruitmentCount: 21, note: "인문A 기준. 2025학년도 ELLT학과 정시 70%컷 651.1/710 벤치마크. 모집단위별 인문A/B 등 세부 적용 확인.", sourceUrl: HUFS_SOURCE, verifiedAt: "2026-09-29",
  },
  {
    id: "cau-seoul-da-changict", universityId: "cau-seoul", universityName: "중앙대학교", region: "서울",
    department: "창의ICT공과대학", majorGroup: "컴퓨터·소프트웨어", group: "다", scoreMetric: "표준점수", koreanWeight: 30, mathWeight: 35, englishWeight: 0, inquiryWeight: 35,
    inquirySubjects: 2, recruitmentCount: 150, note: "수능 100%. 국어 30 / 수학 35 / 탐구 35. 영어·한국사는 등급별 가산점. 탐구 변환표준점수 및 가산점 적용.", sourceUrl: CAU_SOURCE, verifiedAt: "2026-09-27",
  },
  {
    id: "khu-seoul-ga-humanities", universityId: "khu-seoul", universityName: "경희대학교", region: "서울",
    department: "인문계열 대표", majorGroup: "인문·어문", group: "가", scoreMetric: "표준점수", koreanWeight: 35, mathWeight: 25, englishWeight: 15, inquiryWeight: 25,
    inquirySubjects: 2, note: "대표 인문계열 기준. 모집단위별 세부 반영식은 최종 요강 확인.", sourceUrl: KHU_SOURCE, verifiedAt: "2026-09-27",
  },
  {
    id: "khu-international-na-natural", universityId: "khu-international", universityName: "경희대학교(국제)", region: "경기",
    department: "자연계열 대표", majorGroup: "자연·공학", group: "나", scoreMetric: "표준점수", koreanWeight: 25, mathWeight: 40, englishWeight: 0, inquiryWeight: 35,
    inquirySubjects: 2, note: "수능 100%. 국어 25 / 수학 40 / 탐구 35. 영어는 등급별 가산, 한국사는 감점. 탐구 과목당 가산점 적용.", sourceUrl: KHU_SOURCE, verifiedAt: "2026-09-27",
  },
  {
    id: "ewha-seoul-ga-humanities", universityId: "ewha-seoul", universityName: "이화여자대학교", region: "서울",
    department: "인문계열", majorGroup: "인문·어문", group: "가", scoreMetric: "표준점수", koreanWeight: 30, mathWeight: 30, englishWeight: 20, inquiryWeight: 20,
    inquirySubjects: 2, note: "수능전형 인문계열. 국어 30 / 수학 30 / 영어 20 / 탐구 20. 한국사 등급별 점수.", sourceUrl: EWHA_SOURCE, verifiedAt: "2026-09-27",
  },
  {
    id: "ewha-seoul-na-natural", universityId: "ewha-seoul", universityName: "이화여자대학교", region: "서울",
    department: "자연계열", majorGroup: "자연·공학", group: "나", scoreMetric: "표준점수", koreanWeight: 25, mathWeight: 30, englishWeight: 20, inquiryWeight: 25,
    inquirySubjects: 2, note: "수능전형 자연계열. 국어 25 / 수학 30 / 영어 20 / 탐구 25. 한국사 등급별 점수.", sourceUrl: EWHA_SOURCE, verifiedAt: "2026-09-27",
  },
  {
    id: "konkuk-seoul-ga-natural", universityId: "konkuk-seoul", universityName: "건국대학교", region: "서울",
    department: "자연계열 대표", majorGroup: "자연·공학", group: "가", scoreMetric: "표준점수", koreanWeight: 30, mathWeight: 40, englishWeight: 10, inquiryWeight: 20,
    inquirySubjects: 2, benchmarkYear: 2025, benchmarkCutline70: 662.57, benchmarkTotalScore: 1000, benchmarkDepartment: "건축학부", recruitmentCount: 39, note: "자연계 대표. 2025학년도 건축학부 정시 70%컷 662.57/1,000 벤치마크. 수리중심(B) 적용 모집단위 대표. 한국사 감점.", sourceUrl: KONKUK_SOURCE, verifiedAt: "2026-09-29",
  },
  {
    id: "dongguk-seoul-ga-humanities", universityId: "dongguk-seoul", universityName: "동국대학교", region: "서울",
    department: "인문계열 대표", majorGroup: "인문·어문", group: "가", scoreMetric: "표준점수", koreanWeight: 35, mathWeight: 25, englishWeight: 15, inquiryWeight: 25,
    inquirySubjects: 2, benchmarkYear: 2025, benchmarkCutline70: 681.175, benchmarkTotalScore: 1000, benchmarkDepartment: "미디어커뮤니케이션학전공", recruitmentCount: 19, note: "인문계열 대표. 2025학년도 미디어커뮤니케이션학전공 정시 70%컷 681.175/1,000 벤치마크. 영어 등급환산, 한국사 등급별 감점.", sourceUrl: DONGGUK_SOURCE, verifiedAt: "2026-09-29",
  },
  {
    id: "sookmyung-seoul-ga-humanities", universityId: "sookmyung-seoul", universityName: "숙명여자대학교", region: "서울",
    department: "인문계열", majorGroup: "인문·어문", group: "가", scoreMetric: "표준점수", koreanWeight: 35, mathWeight: 25, englishWeight: 15, inquiryWeight: 25,
    inquirySubjects: 2, note: "인문계열 대표. 국어 35 / 수학 25 / 영어 15 / 탐구 25. 한국사 가점.", sourceUrl: SOOKMYUNG_SOURCE, verifiedAt: "2026-09-27",
  },
  {
    id: "sookmyung-seoul-ga-natural", universityId: "sookmyung-seoul", universityName: "숙명여자대학교", region: "서울",
    department: "자연계열", majorGroup: "자연·공학", group: "가", scoreMetric: "표준점수", koreanWeight: 25, mathWeight: 35, englishWeight: 15, inquiryWeight: 25,
    inquirySubjects: 2, note: "자연계열 대표. 국어 25 / 수학 35 / 영어 15 / 탐구 25. 과탐 가산점, 한국사 가점.", sourceUrl: SOOKMYUNG_SOURCE, verifiedAt: "2026-09-27",
  },
  {
    id: "kookmin-seoul-da-humanities", universityId: "kookmin-seoul", universityName: "국민대학교", region: "서울",
    department: "인문계열", majorGroup: "인문·어문", group: "다", scoreMetric: "표준점수", koreanWeight: 40, mathWeight: 30, englishWeight: 10, inquiryWeight: 20,
    inquirySubjects: 2, note: "인문계 전체 일반학생전형. 국어 40 / 수학 30 / 영어 10 / 탐구 20. 한국사 감점.", sourceUrl: KOOKMIN_SOURCE, verifiedAt: "2026-09-27",
  },
  {
    id: "kookmin-seoul-da-natural", universityId: "kookmin-seoul", universityName: "국민대학교", region: "서울",
    department: "자연계열", majorGroup: "자연·공학", group: "다", scoreMetric: "표준점수", koreanWeight: 30, mathWeight: 40, englishWeight: 10, inquiryWeight: 20,
    inquirySubjects: 2, note: "자연계 전체 일반학생전형. 국어 30 / 수학 40 / 영어 10 / 탐구 20. 과목별 표준점수 가산점 및 한국사 감점.", sourceUrl: KOOKMIN_SOURCE, verifiedAt: "2026-09-27",
  },
];
