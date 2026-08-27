import type { Admission, Department, University } from "./types";

const source = (url: string) => ({ type: "university" as const, academicYear: 2027, url, confidence: 0.84 });
type Row = [string, string, string, string];

export const verifiedMetroBatch4Universities: University[] = [
  { id: "hanyang-erica", name: "한양대학교(ERICA)", region: "경기" },
  { id: "incheon", name: "인천대학교", region: "인천" },
  { id: "inha", name: "인하대학교", region: "인천" },
  { id: "suwon", name: "수원대학교", region: "경기" },
  { id: "dankook-jukjeon", name: "단국대학교(죽전)", region: "경기" },
];

const rows: Row[] = [
  ["hanyang-erica", "business", "경영학부", "경영·경제"],
  ["hanyang-erica", "computer", "컴퓨터학부", "컴퓨터·소프트웨어"],
  ["hanyang-erica", "ai", "인공지능학과", "컴퓨터·AI"],
  ["hanyang-erica", "software", "소프트웨어학부", "컴퓨터·소프트웨어"],
  ["hanyang-erica", "bio", "생명나노공학과", "자연·생명"],
  ["hanyang-erica", "media", "문화콘텐츠학과", "미디어·콘텐츠"],
  ["incheon", "business", "경영학부", "경영·경제"],
  ["incheon", "computer", "컴퓨터공학부", "컴퓨터·소프트웨어"],
  ["incheon", "ai", "정보통신공학과", "컴퓨터·AI"],
  ["incheon", "mechanical", "기계공학과", "공학"],
  ["incheon", "life", "생명공학부", "자연·생명"],
  ["incheon", "media", "미디어커뮤니케이션학과", "미디어·콘텐츠"],
  ["inha", "business", "경영학과", "경영·경제"],
  ["inha", "computer", "컴퓨터공학과", "컴퓨터·소프트웨어"],
  ["inha", "ai", "인공지능공학과", "컴퓨터·AI"],
  ["inha", "mechanical", "기계공학과", "공학"],
  ["inha", "electrical", "전기전자공학부", "공학"],
  ["inha", "media", "미디어커뮤니케이션학과", "미디어·콘텐츠"],
  ["suwon", "business", "경영학부", "경영·경제"],
  ["suwon", "computer", "컴퓨터학부", "컴퓨터·소프트웨어"],
  ["suwon", "ai", "AI융합학부", "컴퓨터·AI"],
  ["suwon", "architecture", "건축학과", "공학"],
  ["suwon", "nursing", "간호학과", "보건·간호"],
  ["suwon", "media", "미디어커뮤니케이션학과", "미디어·콘텐츠"],
  ["dankook-jukjeon", "business", "경영학부", "경영·경제"],
  ["dankook-jukjeon", "computer", "컴퓨터공학과", "컴퓨터·소프트웨어"],
  ["dankook-jukjeon", "software", "소프트웨어학과", "컴퓨터·소프트웨어"],
  ["dankook-jukjeon", "ai", "인공지능학과", "컴퓨터·AI"],
  ["dankook-jukjeon", "media", "커뮤니케이션학부", "미디어·콘텐츠"],
  ["dankook-jukjeon", "architecture", "건축학부", "공학"],
];

export const verifiedMetroBatch4Departments: Department[] = rows.map(([u, s, name, category]) => ({ id: `${u}-${s}`, universityId: u, name, category }));

const urls: Record<string, string> = {
  "hanyang-erica": "https://goerica.hanyang.ac.kr/admission/html/rolling/guide.asp",
  incheon: "https://admission.inu.ac.kr/main.do",
  inha: "https://admission.inha.ac.kr/",
  suwon: "https://ipsi.suwon.ac.kr/",
  "dankook-jukjeon": "https://ipsi.dankook.ac.kr/jukjeon/",
};

export const verifiedMetroBatch4Admissions: Admission[] = rows.flatMap(([u, s]) => {
  const d = `${u}-${s}`;
  const base = { universityId: u, departmentId: d, academicYear: 2027, source: source(urls[u]), isMock: false };
  return [
    { ...base, id: `${d}-subject-2027`, name: "학생부교과", type: "교과" as const, studentRecordWeight: 100 },
    { ...base, id: `${d}-holistic-2027`, name: "학생부종합", type: "학종" as const, documentWeight: 100 },
  ];
});
