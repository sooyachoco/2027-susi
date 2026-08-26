import type { Admission, Department, University } from "./types";

/**
 * 2027 수도권 수시 확장 후보군.
 * 대학/모집단위 범위를 넓히기 위한 탐색 데이터이며, 최종 모집요강 세부값을 검증하기 전까지
 * 추천 로직의 실데이터로 사용하지 않는다.
 */
const universities: University[] = [
  { id: "sungkyul", name: "성결대학교", region: "경기" },
  { id: "anyang", name: "안양대학교", region: "경기" },
  { id: "hanshin", name: "한신대학교", region: "경기" },
  { id: "hyupsung", name: "협성대학교", region: "경기" },
  { id: "kangnam", name: "강남대학교", region: "경기" },
  { id: "yongin", name: "용인대학교", region: "경기" },
  { id: "eulji", name: "을지대학교", region: "경기" },
  { id: "tech-univ-korea", name: "한국공학대학교", region: "경기" },
  { id: "cha", name: "차의과학대학교", region: "경기" },
  { id: "pyeongtaek", name: "평택대학교", region: "경기" },
  { id: "hansei", name: "한세대학교", region: "경기" },
  { id: "shinhan", name: "신한대학교", region: "경기" },
  { id: "daejin", name: "대진대학교", region: "경기" },
  { id: "hankyong", name: "한경국립대학교", region: "경기" },
  { id: "hsmu", name: "화성의과학대학교", region: "경기" },
  { id: "incheon-catholic", name: "인천가톨릭대학교", region: "인천" },
  { id: "chungwoon-incheon", name: "청운대학교", region: "인천" },
  { id: "kyungin", name: "경인교육대학교", region: "인천" },
  { id: "hanyang-erica", name: "한양대학교(ERICA)", region: "경기" },
  { id: "kyonggi", name: "경기대학교", region: "경기" },
  { id: "catholic", name: "가톨릭대학교", region: "경기" },
];

const departmentSeed: Array<[string, string, string, string]> = [
  ["humanities", "인문사회계열", "인문·사회", "인문사회"],
  ["business", "경영·경제계열", "경영·경제", "상경"],
  ["law", "법·행정계열", "법·행정", "법행정"],
  ["media", "미디어·콘텐츠계열", "미디어·콘텐츠", "미디어"],
  ["computer", "컴퓨터·소프트웨어계열", "컴퓨터·소프트웨어", "컴퓨터"],
  ["ai", "AI·데이터계열", "컴퓨터·AI", "AI"],
  ["engineering", "공학계열", "공학", "공학"],
  ["natural", "자연과학계열", "자연과학", "자연"],
  ["bio", "생명·바이오계열", "생명·바이오", "바이오"],
  ["health", "보건·간호계열", "보건·간호", "보건"],
  ["design", "디자인·예술계열", "디자인·예술", "디자인"],
  ["sports", "체육·스포츠계열", "체육·스포츠", "체육"],
  ["free", "자유전공·전공자율선택", "자유전공", "자유전공"],
];

// 공식 2027 모집요강에서 확인된 교육계열 모집단위만 별도로 추가한다.
// 안양대학교 2027 수시 모집요강에는 유아교육과가 명시되어 있다.
// 성신여자대학교 2027 수시 모집요강에는 교육학과·사회교육과·윤리교육과·한문교육과·유아교육과가 명시되어 있다.
const verifiedEducationDepartments: Array<[string, string, string, string]> = [
  ["anyang", "early-childhood-education", "유아교육과", "교육"],
  ["sungshin", "education", "교육학과", "교육"],
  ["sungshin", "social-education", "사회교육과", "교육"],
  ["sungshin", "ethics-education", "윤리교육과", "교육"],
  ["sungshin", "classical-chinese-education", "한문교육과", "교육"],
  ["sungshin", "early-childhood-education", "유아교육과", "교육"],
];

export const remainingMetro2027Universities = [
  ...universities,
  { id: "sungshin", name: "성신여자대학교", region: "서울" },
];

export const remainingMetro2027Departments: Department[] = [
  ...universities.flatMap((u) => departmentSeed.map(([suffix, name, category]) => ({
    id: `${u.id}-${suffix}`, universityId: u.id, name, category,
  }))),
  ...verifiedEducationDepartments.map(([universityId, suffix, name, category]) => ({
    id: `${universityId}-${suffix}`, universityId, name, category, majorGroup: "교육",
  })),
];

export const remainingMetro2027Admissions: Admission[] = remainingMetro2027Departments.flatMap((d) => [
  { id: `${d.id}-subject-2027`, universityId: d.universityId, departmentId: d.id, academicYear: 2027, name: "학생부교과", type: "교과" as const, source: { type: "adiga" as const, academicYear: 2027, confidence: 0.6 }, isMock: true },
  { id: `${d.id}-holistic-2027`, universityId: d.universityId, departmentId: d.id, academicYear: 2027, name: "학생부종합", type: "학종" as const, source: { type: "adiga" as const, academicYear: 2027, confidence: 0.6 }, isMock: true },
  { id: `${d.id}-essay-2027`, universityId: d.universityId, departmentId: d.id, academicYear: 2027, name: "논술", type: "논술" as const, source: { type: "adiga" as const, academicYear: 2027, confidence: 0.6 }, isMock: true },
]);
