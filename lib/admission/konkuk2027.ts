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

const universityId = "konkuk";
const byName = new Map(konkuk2027Departments.map(d => [d.name, d.id]));
const admissions: Admission[] = [];

const add = (name: string, track: string, type: Admission["type"], count: number, extra: Partial<Admission> = {}) => {
  if (!count) return;
  const departmentId = byName.get(name);
  if (!departmentId) return;
  const admission = {
    id: `${departmentId}-${track}`,
    universityId,
    departmentId,
    academicYear: 2027,
    name: track,
    type,
    source,
    isMock: false,
    ...extra,
  } as Admission;
  Object.assign(admission, { 모집인원: count });
  admissions.push(admission);
};

const rows: Array<[string, number, number, number, number, number, number]> = [
  ["문과대학", 17, 45, 0, 0, 17, 0],
  ["정치외교학과", 11, 29, 2, 0, 9, 0],
  ["경제학과", 12, 31, 2, 0, 13, 0],
  ["경영학과", 25, 52, 4, 0, 20, 0],
  ["부동산학과", 10, 22, 2, 0, 10, 0],
  ["미디어커뮤니케이션학과", 10, 26, 2, 0, 9, 0],
  ["문화콘텐츠학과", 8, 23, 2, 0, 8, 0],
  ["수학과", 8, 20, 2, 0, 7, 0],
  ["물리학과", 8, 18, 2, 0, 7, 0],
  ["화학과", 8, 20, 2, 0, 7, 0],
  ["생명과학특성학과", 8, 22, 2, 0, 8, 0],
  ["사회환경공학부", 16, 38, 3, 0, 15, 0],
  ["기계·로봇·자동차공학부", 20, 48, 4, 0, 18, 0],
  ["전기전자공학부", 27, 62, 5, 0, 23, 0],
  ["화공학부", 17, 39, 3, 0, 15, 0],
  ["재료공학과", 8, 20, 2, 0, 7, 0],
  ["컴퓨터공학부", 23, 57, 4, 0, 20, 0],
  ["산업공학과", 10, 25, 2, 0, 9, 0],
  ["생물공학과", 10, 25, 2, 0, 9, 0],
  ["건축학부", 13, 31, 3, 0, 12, 0],
  ["동물자원·식품과학·유통학부", 18, 43, 3, 0, 16, 0],
  ["수의예과", 10, 18, 2, 0, 10, 0],
  ["첨단바이오공학부", 13, 35, 3, 0, 12, 0],
];

for (const [name, regional, self, opportunity, special, essay] of rows) {
  add(name, "KU지역균형-2027", "교과", regional, { studentRecordWeight: 70, documentWeight: 30, csatMinimum: { enabled: false } });
  add(name, "KU자기추천-2027", "학종", self, { documentWeight: 70, interview: true, csatMinimum: { enabled: false } });
  add(name, "기회균형-2027", "기타", opportunity, { csatMinimum: { enabled: false } });
  add(name, "특성화고교졸업자-2027", "기타", special, { csatMinimum: { enabled: false } });
  add(name, "KU논술우수자-2027", "논술", essay, { csatMinimum: { enabled: true, description: "수능최저학력기준 적용" } });
}

export const konkuk2027Admissions = admissions;
