import type { Admission, Department, University } from "./types";

const source = (url: string, confidence = 0.86) => ({ type: "university" as const, academicYear: 2027, url, confidence });
type Row = [string, string, string, string];

export const verifiedMetroBatch3Universities: University[] = [
  { id: "incheon-catholic", name: "인천가톨릭대학교", region: "인천" },
  { id: "chungwoon-incheon", name: "청운대학교", region: "인천" },
  { id: "kyungin", name: "경인교육대학교", region: "인천" },
  { id: "kyunggi", name: "경기대학교", region: "경기" },
  { id: "catholic", name: "가톨릭대학교", region: "경기" },
];

const rows: Row[] = [
  ["incheon-catholic", "free", "자유전공", "자유전공"],
  ["incheon-catholic", "culture", "문화콘텐츠학과", "미디어·콘텐츠"],
  ["incheon-catholic", "nursing", "간호학과", "보건·간호"],
  ["incheon-catholic", "fineart", "조형예술학과", "디자인"],
  ["incheon-catholic", "design", "융합디자인학과", "디자인"],
  ["chungwoon-incheon", "architecture", "건축공학과", "공학"],
  ["chungwoon-incheon", "fire", "설비소방학과", "공학"],
  ["chungwoon-incheon", "civil", "토목환경공학과", "공학"],
  ["chungwoon-incheon", "electronics", "전자공학과", "공학"],
  ["chungwoon-incheon", "computer", "컴퓨터공학과", "컴퓨터·소프트웨어"],
  ["chungwoon-incheon", "multimedia", "멀티미디어학과", "미디어·콘텐츠"],
  ["chungwoon-incheon", "chemistry", "화학생명공학과", "자연·생명"],
  ["chungwoon-incheon", "business", "경영학과", "경영·경제"],
  ["chungwoon-incheon", "trade", "무역물류학과", "경영·경제"],
  ["chungwoon-incheon", "advertising", "광고홍보학과", "미디어·콘텐츠"],
  ["chungwoon-incheon", "free", "미래융합자율전공학부", "자유전공"],
  ["kyungin", "elementary", "초등교육과", "교육"],
  ["kyunggi", "business", "경영학부", "경영·경제"],
  ["kyunggi", "free", "자유전공학부", "자유전공"],
  ["kyunggi", "computer", "컴퓨터공학부", "컴퓨터·소프트웨어"],
  ["kyunggi", "media", "미디어영상학과", "미디어·콘텐츠"],
  ["kyunggi", "hotel", "호텔외식경영학부", "경영·경제"],
  ["catholic", "free", "자유전공학부", "자유전공"],
  ["catholic", "humanities", "인문사회계열", "인문·사회"],
  ["catholic", "engineering", "자연공학계열", "공학"],
  ["catholic", "business", "경영학과", "경영·경제"],
  ["catholic", "computer", "컴퓨터정보공학부", "컴퓨터·소프트웨어"],
];

export const verifiedMetroBatch3Departments: Department[] = rows.map(([u, s, name, category]) => ({ id: `${u}-${s}`, universityId: u, name, category }));

const urls: Record<string, string> = {
  "incheon-catholic": "https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000167",
  "chungwoon-incheon": "https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000284",
  kyungin: "https://www.ginue.ac.kr/ipsi/Main.do",
  kyunggi: "https://enter.kyonggi.ac.kr/cms/FR_CON/index.do?MENU_ID=120",
  catholic: "https://ipsi.catholic.ac.kr/",
};

const admissionsFor = (u: string, rowsForUniversity: Row[]) => rowsForUniversity.flatMap(([, s]) => {
  const d = `${u}-${s}`;
  const base = { universityId: u, departmentId: d, academicYear: 2027, source: source(urls[u]), isMock: false };
  return [
    { ...base, id: `${d}-subject-2027`, name: "학생부교과", type: "교과" as const, studentRecordWeight: 100 },
    { ...base, id: `${d}-holistic-2027`, name: "학생부종합", type: "학종" as const, documentWeight: 100 },
  ];
});

export const verifiedMetroBatch3Admissions: Admission[] = [
  ...rows.filter(([u]) => u === "incheon-catholic").flatMap(([u]) => admissionsFor(u, rows.filter(([x]) => x === u))),
  ...rows.filter(([u]) => u === "chungwoon-incheon").flatMap(([u]) => admissionsFor(u, rows.filter(([x]) => x === u))),
  ...rows.filter(([u]) => u === "kyungin").flatMap(([u]) => admissionsFor(u, rows.filter(([x]) => x === u))),
  ...rows.filter(([u]) => u === "kyunggi").flatMap(([u]) => admissionsFor(u, rows.filter(([x]) => x === u))),
  ...rows.filter(([u]) => u === "catholic").flatMap(([u]) => admissionsFor(u, rows.filter(([x]) => x === u))),
];
