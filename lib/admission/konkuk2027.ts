import type { Admission, Department, University } from "./types";

const source = {
  type: "university" as const,
  url: "https://enter.konkuk.ac.kr/",
  academicYear: 2027,
  collectedAt: "2026-09-03",
  confidence: 0.98,
};

export const konkuk2027Universities: University[] = [
  { id: "konkuk", name: "건국대학교", region: "서울" },
];

const defs: Array<[string, string, string, string]> = [
  ["konkuk-liberal", "문과대학", "인문·사회", "인문"],
  ["konkuk-political", "정치외교학과", "인문·사회", "인문"],
  ["konkuk-economics", "경제학과", "경영·경제", "인문"],
  ["konkuk-business", "경영학과", "경영·경제", "인문"],
  ["konkuk-realestate", "부동산학과", "경영·경제", "인문"],
  ["konkuk-masscommunication", "미디어커뮤니케이션학과", "인문·사회", "인문"],
  ["konkuk-culture", "문화콘텐츠학과", "인문·사회", "인문"],
  ["konkuk-math", "수학과", "자연과학", "자연"],
  ["konkuk-physics", "물리학과", "자연과학", "자연"],
  ["konkuk-chemistry", "화학과", "자연과학", "자연"],
  ["konkuk-life", "생명과학특성학과", "자연과학", "자연"],
  ["konkuk-civil", "사회환경공학부", "공학", "자연"],
  ["konkuk-mechanical", "기계·로봇·자동차공학부", "공학", "자연"],
  ["konkuk-electrical", "전기전자공학부", "공학", "자연"],
  ["konkuk-chemical", "화공학부", "공학", "자연"],
  ["konkuk-materials", "재료공학과", "공학", "자연"],
  ["konkuk-computer", "컴퓨터공학부", "컴퓨터·소프트웨어", "자연"],
  ["konkuk-industrial", "산업공학과", "공학", "자연"],
  ["konkuk-biological", "생물공학과", "공학", "자연"],
  ["konkuk-architecture", "건축학부", "건축", "자연"],
  ["konkuk-animal-food", "동물자원·식품과학·유통학부", "생명·식품", "자연"],
  ["konkuk-vet", "수의예과", "의학", "자연"],
  ["konkuk-biotech", "첨단바이오공학부", "생명·바이오", "자연"],
  ["konkuk-design", "예술디자인대학", "예체능", "예체능"],
  ["konkuk-media", "영상학과", "예체능", "예체능"],
  ["konkuk-acting", "매체연기학과", "예체능", "예체능"],
];

export const konkuk2027Departments: Department[] = defs.map(([id, name, category]) => ({
  id,
  universityId: "konkuk",
  name,
  category,
}));

export const konkuk2027Admissions: Admission[] = defs.flatMap(([departmentId, _name, majorGroup]) => [
  {
    id: `${departmentId}-regional-2027`,
    universityId: "konkuk",
    departmentId,
    academicYear: 2027,
    name: "KU지역균형",
    type: "교과",
    majorGroup,
    studentRecordWeight: 100,
    csatMinimum: { enabled: false },
    source,
  },
  {
    id: `${departmentId}-self-recommend-2027`,
    universityId: "konkuk",
    departmentId,
    academicYear: 2027,
    name: "KU자기추천",
    type: "학종",
    majorGroup,
    documentWeight: 70,
    interview: true,
    csatMinimum: { enabled: false },
    source,
  },
  {
    id: `${departmentId}-essay-2027`,
    universityId: "konkuk",
    departmentId,
    academicYear: 2027,
    name: "KU논술우수자",
    type: "논술",
    majorGroup,
    csatMinimum: { enabled: true, description: "수능최저학력기준 적용" },
    source,
  },
]);
