import type { Admission, Department, University } from "./types";

const inhaSource = "https://admission.inha.ac.kr/";
const suwonSource = "https://ipsi.suwon.ac.kr/";
const dankookSource = "https://ipsi.dankook.ac.kr/";

const source = (url: string) => ({ type: "university" as const, academicYear: 2027, url, confidence: 0.95 });

export const verifiedInhaSuwonDankook2027Universities: University[] = [
  { id: "inha", name: "인하대학교", region: "인천" },
  { id: "suwon", name: "수원대학교", region: "경기" },
  { id: "dankook-jukjeon", name: "단국대학교", region: "경기" },
];

const rows = [
  ["inha", "mechanical", "기계공학과", "공학"],
  ["inha", "electrical", "전기전자공학부", "공학"],
  ["inha", "semiconductor", "반도체시스템공학과", "공학"],
  ["inha", "ai", "인공지능공학과", "컴퓨터·AI"],
  ["inha", "computer", "컴퓨터공학과", "컴퓨터·소프트웨어"],
  ["inha", "business", "경영학과", "경영·경제"],
  ["inha", "nursing", "간호학과", "보건·의료"],
  ["suwon", "free", "자유전공학부", "자유전공"],
  ["suwon", "management", "경영공학대학", "경영·공학"],
  ["suwon", "ai-data", "AI데이터과학부", "컴퓨터·AI"],
  ["suwon", "nursing", "간호학과", "보건·의료"],
  ["suwon", "fire", "소방재난공학과", "공학"],
  ["dankook-jukjeon", "korean", "국어국문학과", "인문"],
  ["dankook-jukjeon", "business", "경영학부", "경영·경제"],
  ["dankook-jukjeon", "software", "소프트웨어학과", "컴퓨터·소프트웨어"],
  ["dankook-jukjeon", "computer", "컴퓨터공학과", "컴퓨터·소프트웨어"],
  ["dankook-jukjeon", "ai-architecture", "AI건축융합학과", "공학"],
] as const;

export const verifiedInhaSuwonDankook2027Departments: Department[] = rows.map(([u, key, name, category]) => ({
  id: `${u}-${key}`,
  universityId: u,
  name,
  category,
}));

const byUniversity: Record<string, string> = { inha: inhaSource, suwon: suwonSource, "dankook-jukjeon": dankookSource };

export const verifiedInhaSuwonDankook2027Admissions: Admission[] = rows.flatMap(([u, key]) => {
  const departmentId = `${u}-${key}`;
  const base = {
    universityId: u,
    departmentId,
    academicYear: 2027,
    source: source(byUniversity[u]),
    isMock: false,
  };

  if (u === "inha") {
    return [
      { ...base, id: `${departmentId}-future-interview`, name: "인하미래인재(면접형)", type: "학종" as const, interview: true, documentWeight: 70 },
      { ...base, id: `${departmentId}-future-document`, name: "인하미래인재(서류형)", type: "학종" as const, documentWeight: 100 },
      { ...base, id: `${departmentId}-regional-balance`, name: "지역균형", type: "교과" as const, studentRecordWeight: 100 },
    ];
  }

  if (u === "suwon") {
    return [
      { ...base, id: `${departmentId}-highschool-recommend`, name: "고교추천전형", type: "교과" as const, studentRecordWeight: 51.7, interview: true },
      { ...base, id: `${departmentId}-subject-excellence`, name: "교과우수전형", type: "교과" as const, studentRecordWeight: 100 },
      { ...base, id: `${departmentId}-interview-subject`, name: "면접위주교과전형", type: "교과" as const, studentRecordWeight: 60, interview: true },
      { ...base, id: `${departmentId}-essay`, name: "교과논술전형", type: "논술" as const, studentRecordWeight: 25 },
    ];
  }

  return [
    { ...base, id: `${departmentId}-dku-document`, name: "DKU인재(서류형)", type: "학종" as const, documentWeight: 100 },
    { ...base, id: `${departmentId}-regional`, name: "지역균형선발", type: "교과" as const, studentRecordWeight: 100 },
    { ...base, id: `${departmentId}-essay`, name: "논술우수자", type: "논술" as const },
  ];
});
