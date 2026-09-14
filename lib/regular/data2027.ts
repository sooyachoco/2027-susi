import type { RegularAdmission } from "./types";

const HANYANG_SOURCE = "https://go.hanyang.ac.kr/main.do";

// 2027 정시 확인 데이터. 한양대는 계열별 반영비율이 달라 계열 단위 후보로 분리한다.
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
      note: "수능 100%. 국어 25 / 수학 40 / 영어 10 / 탐구 25", sourceUrl: HANYANG_SOURCE, verifiedAt: "2026-09-14",
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
    inquirySubjects: 2, studentRecordWeight: 10, recruitmentCount: 60, note: "수능 90% + 학생부종합평가 10%. 상경계열과 동일한 수능 반영비율", sourceUrl: HANYANG_SOURCE,
    verifiedAt: "2026-09-14",
  },
];
