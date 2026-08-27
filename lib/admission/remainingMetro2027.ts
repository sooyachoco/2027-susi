import type { Admission, Department, University } from "./types";

const universities: University[] = [
  { id: "sungkyul", name: "성결대학교", region: "경기" },
  { id: "anyang", name: "안양대학교", region: "경기" },
  { id: "hanshin", name: "한신대학교", region: "경기" },
  { id: "hyupsung", name: "협성대학교", region: "경기" },
  { id: "kangnam", name: "강남대학교", region: "경기" },
  { id: "yongin", name: "용인대학교", region: "경기" },
  { id: "eulji", name: "을지대학교", region: "경기" },
  { id: "tukorea", name: "한국공학대학교", region: "경기" },
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
  { id: "kyunggi", name: "경기대학교", region: "경기" },
  { id: "catholic", name: "가톨릭대학교", region: "경기" },
  { id: "hansung", name: "한성대학교", region: "서울" },
  { id: "skhu", name: "성공회대학교", region: "서울" },
  { id: "swu", name: "서울여자대학교", region: "서울" },
  { id: "seoultech", name: "서울과학기술대학교", region: "서울" },
];

const departmentSeed: Array<[string, string, string]> = [
  ["humanities", "인문사회계열", "인문·사회"],
  ["business", "경영·경제계열", "경영·경제"],
  ["law", "법·행정계열", "법·행정"],
  ["media", "미디어·콘텐츠계열", "미디어·콘텐츠"],
  ["computer", "컴퓨터·소프트웨어계열", "컴퓨터·소프트웨어"],
  ["ai", "AI·데이터계열", "컴퓨터·AI"],
  ["engineering", "공학계열", "공학"],
  ["natural", "자연과학계열", "자연과학"],
  ["bio", "생명·바이오계열", "생명·바이오"],
  ["health", "보건·간호계열", "보건·간호"],
  ["design", "디자인·예술계열", "디자인·예술"],
  ["sports", "체육·스포츠계열", "체육·스포츠"],
  ["free", "자유전공·전공자율선택", "자유전공"],
];

const verifiedHansungDepartments: Array<[string, string, string]> = [
  ["business", "경영학부", "경영·경제"],
  ["computer", "IT공과대학", "컴퓨터·소프트웨어"],
  ["ai", "AI응용학과", "컴퓨터·AI"],
];

const verifiedSkhUDepartments: Array<[string, string, string, number, number]> = [
  ["business", "경영학부", "경영·경제", 22, 7],
  ["social", "사회융합학부", "인문·사회", 33, 15],
  ["media", "미디어콘텐츠융합학부", "미디어·콘텐츠", 31, 14],
  ["future", "미래융합학부", "컴퓨터·AI", 18, 8],
  ["software", "소프트웨어융합학부", "컴퓨터·소프트웨어", 37, 15],
  ["free", "자유전공학부", "자유전공", 60, 28],
];

const verifiedSewomenDepartments: Array<[string, string, string]> = [
  ["business", "경영학과", "경영·경제"],
  ["computer", "컴퓨터학과", "컴퓨터·소프트웨어"],
  ["media", "디지털미디어학과", "미디어·콘텐츠"],
  ["humanities", "국어국문학과", "인문·사회"],
];

const verifiedSeoultechDepartments: Array<[string, string, string]> = [
  ["business", "경영학과", "경영·경제"],
  ["computer", "컴퓨터공학과", "컴퓨터·소프트웨어"],
  ["ai", "인공지능응용학과", "컴퓨터·AI"],
  ["electrical", "전기정보공학과", "공학"],
];

export const remainingMetro2027Universities: University[] = [
  ...universities,
  { id: "sungshin", name: "성신여자대학교", region: "서울" },
];

export const remainingMetro2027Departments: Department[] = [
  ...universities.flatMap((u) => departmentSeed.map(([suffix, name, category]) => ({ id: `${u.id}-${suffix}`, universityId: u.id, name, category }))),
  ...verifiedHansungDepartments.map(([suffix, name, category]) => ({ id: `hansung-${suffix}`, universityId: "hansung", name, category })),
  ...verifiedSkhUDepartments.map(([suffix, name, category]) => ({ id: `skhu-${suffix}`, universityId: "skhu", name, category })),
  ...verifiedSewomenDepartments.map(([suffix, name, category]) => ({ id: `swu-${suffix}`, universityId: "swu", name, category })),
  ...verifiedSeoultechDepartments.map(([suffix, name, category]) => ({ id: `seoultech-${suffix}`, universityId: "seoultech", name, category })),
];

const verifiedDepartmentIds = new Set([
  ...verifiedHansungDepartments.map(([suffix]) => `hansung-${suffix}`),
  ...verifiedSkhUDepartments.map(([suffix]) => `skhu-${suffix}`),
  ...verifiedSewomenDepartments.map(([suffix]) => `swu-${suffix}`),
  ...verifiedSeoultechDepartments.map(([suffix]) => `seoultech-${suffix}`),
]);

const verifiedHansungAdmissions: Admission[] = verifiedHansungDepartments.flatMap(([suffix]) => {
  const departmentId = `hansung-${suffix}`;
  return [
    { id: `${departmentId}-subject-2027`, universityId: "hansung", departmentId, academicYear: 2027, name: "교과우수", type: "교과" as const, studentRecordWeight: 100, csatMinimum: { enabled: false }, source: { type: "university" as const, academicYear: 2027, url: "https://www.hansung.ac.kr/futureplus/728/subview.do", confidence: 0.85 }, isMock: false },
    { id: `${departmentId}-regional-2027`, universityId: "hansung", departmentId, academicYear: 2027, name: "지역균형", type: "교과" as const, source: { type: "university" as const, academicYear: 2027, url: "https://www.hansung.ac.kr/futureplus/728/subview.do", confidence: 0.85 }, isMock: false },
    { id: `${departmentId}-holistic-2027`, universityId: "hansung", departmentId, academicYear: 2027, name: "한성인재", type: "학종" as const, documentWeight: 100, csatMinimum: { enabled: false }, source: { type: "university" as const, academicYear: 2027, url: "https://www.hansung.ac.kr/futureplus/728/subview.do", confidence: 0.85 }, isMock: false },
  ];
});

const verifiedSkhUAdmissions: Admission[] = verifiedSkhUDepartments.flatMap(([suffix, , , holisticCount, subjectCount]) => {
  const departmentId = `skhu-${suffix}`;
  return [
    { id: `${departmentId}-holistic-2027`, universityId: "skhu", departmentId, academicYear: 2027, name: "열린인재", type: "학종" as const, recruitmentCount: holisticCount, documentWeight: 100, source: { type: "university" as const, academicYear: 2027, url: "https://www.skhu.ac.kr/viewer/enter/52/fileDown1/fileDownload.do", confidence: 0.9 }, isMock: false },
    { id: `${departmentId}-subject-2027`, universityId: "skhu", departmentId, academicYear: 2027, name: "교과성적", type: "교과" as const, recruitmentCount: subjectCount, studentRecordWeight: 100, source: { type: "university" as const, academicYear: 2027, url: "https://www.skhu.ac.kr/viewer/enter/52/fileDown1/fileDownload.do", confidence: 0.9 }, isMock: false },
  ];
});

const verifiedSewomenAdmissions: Admission[] = verifiedSewomenDepartments.flatMap(([suffix]) => {
  const departmentId = `swu-${suffix}`;
  return [
    { id: `${departmentId}-subject-2027`, universityId: "swu", departmentId, academicYear: 2027, name: "교과우수자", type: "교과" as const, source: { type: "university" as const, academicYear: 2027, url: "https://www.swu.ac.kr/", confidence: 0.85 }, isMock: false },
    { id: `${departmentId}-barom-2027`, universityId: "swu", departmentId, academicYear: 2027, name: "바롬인재서류", type: "학종" as const, documentWeight: 100, source: { type: "university" as const, academicYear: 2027, url: "https://www.swu.ac.kr/", confidence: 0.85 }, isMock: false },
    { id: `${departmentId}-barom-interview-2027`, universityId: "swu", departmentId, academicYear: 2027, name: "바롬인재면접", type: "학종" as const, documentWeight: 100, interview: true, source: { type: "university" as const, academicYear: 2027, url: "https://www.swu.ac.kr/", confidence: 0.85 }, isMock: false },
  ];
});

const verifiedSeoultechAdmissions: Admission[] = verifiedSeoultechDepartments.flatMap(([suffix]) => {
  const departmentId = `seoultech-${suffix}`;
  return [
    { id: `${departmentId}-recommend-2027`, universityId: "seoultech", departmentId, academicYear: 2027, name: "고교추천", type: "교과" as const, studentRecordWeight: 100, source: { type: "university" as const, academicYear: 2027, url: "https://admission.seoultech.ac.kr/", confidence: 0.9 }, isMock: false },
    { id: `${departmentId}-holistic-2027`, universityId: "seoultech", departmentId, academicYear: 2027, name: "학교생활우수자", type: "학종" as const, documentWeight: 100, source: { type: "university" as const, academicYear: 2027, url: "https://admission.seoultech.ac.kr/", confidence: 0.9 }, isMock: false },
  ];
});

export const remainingMetro2027Admissions: Admission[] = [
  ...remainingMetro2027Departments.filter((d) => !verifiedDepartmentIds.has(d.id)).flatMap((d) => [
    { id: `${d.id}-subject-2027`, universityId: d.universityId, departmentId: d.id, academicYear: 2027, name: "학생부교과", type: "교과" as const, source: { type: "adiga" as const, academicYear: 2027, confidence: 0.6 }, isMock: true },
    { id: `${d.id}-holistic-2027`, universityId: d.universityId, departmentId: d.id, academicYear: 2027, name: "학생부종합", type: "학종" as const, source: { type: "adiga" as const, academicYear: 2027, confidence: 0.6 }, isMock: true },
    { id: `${d.id}-essay-2027`, universityId: d.universityId, departmentId: d.id, academicYear: 2027, name: "논술", type: "논술" as const, source: { type: "adiga" as const, academicYear: 2027, confidence: 0.6 }, isMock: true },
  ]),
  ...verifiedHansungAdmissions,
  ...verifiedSkhUAdmissions,
  ...verifiedSewomenAdmissions,
  ...verifiedSeoultechAdmissions,
];