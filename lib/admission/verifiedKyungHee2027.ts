import type { Admission, Department, University } from "./types";

const source = {
  type: "university" as const,
  url: "https://iphak.khu.ac.kr/detail.do?board_seq=17324&categoryid=1",
  document: "2027학년도 경희대학교 수시 모집요강",
  academicYear: 2027,
  confidence: 0.99,
};

export const verifiedKyungHee2027Universities: University[] = [
  { id: "kyunghee", name: "경희대학교", region: "서울" },
];

// 2027 수시 모집요강에서 확인 가능한 주요 모집단위를 우선 반영한다.
// 전체 모집단위 확장은 공식 모집단위별 표 대조 후 순차적으로 진행한다.
const names: Array<[string, string, string]> = [
  ["kyunghee-business", "경영학과", "경영·경제"],
  ["kyunghee-economics", "경제학과", "경영·경제"],
  ["kyunghee-media", "미디어학과", "미디어·콘텐츠"],
  ["kyunghee-political", "정치외교학과", "법·행정"],
  ["kyunghee-social", "사회학과", "사회·복지"],
  ["kyunghee-psychology", "심리학과", "사회·복지"],
  ["kyunghee-english", "영어영문학과", "인문"],
  ["kyunghee-korean", "국어국문학과", "인문"],
  ["kyunghee-computer", "컴퓨터공학과", "컴퓨터·소프트웨어"],
  ["kyunghee-ai", "인공지능학과", "컴퓨터·소프트웨어"],
  ["kyunghee-software", "소프트웨어융합학과", "컴퓨터·소프트웨어"],
  ["kyunghee-electronics", "전자정보공학과", "전기·전자"],
  ["kyunghee-mechanical", "기계공학과", "기계·로봇"],
  ["kyunghee-chemical", "화학공학과", "화학·소재"],
  ["kyunghee-pharmacy", "약학과", "의약학"],
  ["kyunghee-nursing", "간호학과", "간호"],
  ["kyunghee-biomedical", "생명과학과", "생명·자연"],
  ["kyunghee-math", "수학과", "수학·통계"],
];

export const verifiedKyungHee2027Departments: Department[] = names.map(([id, name, category]) => ({
  id,
  universityId: "kyunghee",
  name,
  category,
}));

export const verifiedKyungHee2027Admissions: Admission[] = verifiedKyungHee2027Departments.flatMap((department) => [
  {
    id: `${department.id}-regional`,
    universityId: "kyunghee",
    departmentId: department.id,
    academicYear: 2027,
    name: "학생부교과(지역균형전형)",
    type: "교과" as const,
    studentRecordWeight: 70,
    source,
    isMock: false,
  },
  {
    id: `${department.id}-neo`,
    universityId: "kyunghee",
    departmentId: department.id,
    academicYear: 2027,
    name: "학생부종합(네오르네상스전형)",
    type: "학종" as const,
    documentWeight: 100,
    interview: true,
    source,
    isMock: false,
  },
  {
    id: `${department.id}-essay`,
    universityId: "kyunghee",
    departmentId: department.id,
    academicYear: 2027,
    name: "논술(논술우수자전형)",
    type: "논술" as const,
    studentRecordWeight: 30,
    source,
    isMock: false,
  },
]);

export const verifiedKyungHee2027Summary = {
  source,
  totalRecruitmentByMainType: {
    regional: 604,
    neoRenaissance: 1076,
    opportunityI: 165,
    opportunityII: 90,
    essay: 471,
    practical: 337,
  },
  notes: [
    "2027학년도 지역균형전형 604명",
    "2027학년도 네오르네상스전형 1,076명",
    "2027학년도 논술우수자전형 471명",
    "2027학년도 기회균형전형Ⅰ 165명",
    "2027학년도 기회균형전형Ⅱ 90명",
    "2027학년도 실기우수자전형 337명",
    "지역균형은 교과종합평가 30% + 학교생활기록부 70% 일괄합산",
    "네오르네상스는 1단계 서류평가 후 2단계 1단계 성적 70% + 면접 30%",
    "논술우수자전형은 논술고사 100%",
  ],
};
