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
  { id: "duksung", name: "덕성여자대학교", region: "서울" },
  { id: "dongduk", name: "동덕여자대학교", region: "서울" },
  { id: "sahmyook", name: "삼육대학교", region: "서울" },
  { id: "skuniv", name: "서경대학교", region: "서울" },
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

const verifiedSeoultechDepartments: Array<[string, string, string]> = [
  ["business", "경영학과", "경영·경제"],
  ["computer", "컴퓨터공학과", "컴퓨터·소프트웨어"],
  ["ai", "인공지능응용학과", "컴퓨터·AI"],
  ["electrical", "전기정보공학과", "공학"],
];

const verifiedDuksungDepartments: Array<[string, string, string]> = [
  ["business", "경영학전공", "경영·경제"],
  ["computer", "컴퓨터공학전공", "컴퓨터·소프트웨어"],
  ["ai", "디지털소프트웨어공학부", "컴퓨터·AI"],
  ["psychology", "심리학전공", "인문·사회"],
];

const verifiedDongdukDepartments: Array<[string, string, string]> = [
  ["business", "경영학전공", "경영·경제"],
  ["computer", "컴퓨터학전공", "컴퓨터·소프트웨어"],
  ["media", "미디어디자인전공", "미디어·콘텐츠"],
  ["economics", "경제학전공", "경영·경제"],
];

export const remainingMetro2027Universities: University[] = [
  ...universities,
  { id: "sungshin", name: "성신여자대학교", region: "서울" },
];

const verifiedDepartmentIds = new Set([
  ...verifiedHansungDepartments.map(([suffix]) => `hansung-${suffix}`),
  ...verifiedSkhUDepartments.map(([suffix]) => `skhu-${suffix}`),
  ...verifiedSeoultechDepartments.map(([suffix]) => `seoultech-${suffix}`),
  ...verifiedDuksungDepartments.map(([suffix]) => `duksung-${suffix}`),
  ...verifiedDongdukDepartments.map(([suffix]) => `dongduk-${suffix}`),
]);

export const remainingMetro2027Departments: Department[] = [
  ...verifiedHansungDepartments.map(([suffix, name, category]) => ({ id: `hansung-${suffix}`, universityId: "hansung", name, category })),
  ...verifiedSkhUDepartments.map(([suffix, name, category]) => ({ id: `skhu-${suffix}`, universityId: "skhu", name, category })),
  ...verifiedSeoultechDepartments.map(([suffix, name, category]) => ({ id: `seoultech-${suffix}`, universityId: "seoultech", name, category })),
  ...verifiedDuksungDepartments.map(([suffix, name, category]) => ({ id: `duksung-${suffix}`, universityId: "duksung", name, category })),
  ...verifiedDongdukDepartments.map(([suffix, name, category]) => ({ id: `dongduk-${suffix}`, universityId: "dongduk", name, category })),
];

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

const verifiedSeoultechAdmissions: Admission[] = verifiedSeoultechDepartments.flatMap(([suffix]) => {
  const departmentId = `seoultech-${suffix}`;
  return [
    { id: `${departmentId}-recommend-2027`, universityId: "seoultech", departmentId, academicYear: 2027, name: "고교추천", type: "교과" as const, studentRecordWeight: 100, source: { type: "university" as const, academicYear: 2027, url: "https://admission.seoultech.ac.kr/", confidence: 0.9 }, isMock: false },
    { id: `${departmentId}-holistic-2027`, universityId: "seoultech", departmentId, academicYear: 2027, name: "학교생활우수자", type: "학종" as const, documentWeight: 100, source: { type: "university" as const, academicYear: 2027, url: "https://admission.seoultech.ac.kr/", confidence: 0.9 }, isMock: false },
  ];
});

const verifiedDuksungAdmissions: Admission[] = verifiedDuksungDepartments.flatMap(([suffix]) => {
  const departmentId = `duksung-${suffix}`;
  return [
    { id: `${departmentId}-recommend-2027`, universityId: "duksung", departmentId, academicYear: 2027, name: "고교추천", type: "교과" as const, source: { type: "university" as const, academicYear: 2027, url: "https://www.ds.ac.kr/notice/view.php?bn=7205", confidence: 0.9 }, isMock: false },
    { id: `${departmentId}-holistic-2027`, universityId: "duksung", departmentId, academicYear: 2027, name: "덕성인재", type: "학종" as const, documentWeight: 100, source: { type: "university" as const, academicYear: 2027, url: "https://www.ds.ac.kr/notice/view.php?bn=7205", confidence: 0.9 }, isMock: false },
    { id: `${departmentId}-essay-2027`, universityId: "duksung", departmentId, academicYear: 2027, name: "논술", type: "논술" as const, source: { type: "university" as const, academicYear: 2027, url: "https://www.ds.ac.kr/notice/view.php?bn=7205", confidence: 0.9 }, isMock: false },
  ];
});

const verifiedDongdukAdmissions: Admission[] = verifiedDongdukDepartments.flatMap(([suffix]) => {
  const departmentId = `dongduk-${suffix}`;
  return [
    { id: `${departmentId}-subject-2027`, universityId: "dongduk", departmentId, academicYear: 2027, name: "학생부교과우수자", type: "교과" as const, studentRecordWeight: 100, source: { type: "university" as const, academicYear: 2027, url: "https://ipsi.dongduk.ac.kr/ipsi/contents/nontime-viewer.do", confidence: 0.9 }, isMock: false },
    { id: `${departmentId}-creative-2027`, universityId: "dongduk", departmentId, academicYear: 2027, name: "동덕창의리더", type: "학종" as const, documentWeight: 40, interview: true, source: { type: "university" as const, academicYear: 2027, url: "https://ipsi.dongduk.ac.kr/ipsi/contents/nontime-viewer.do", confidence: 0.9 }, isMock: false },
    { id: `${departmentId}-essay-2027`, universityId: "dongduk", departmentId, academicYear: 2027, name: "논술우수자", type: "논술" as const, source: { type: "university" as const, academicYear: 2027, url: "https://ipsi.dongduk.ac.kr/ipsi/contents/nontime-viewer.do", confidence: 0.9 }, isMock: false },
  ];
});

export const remainingMetro2027Admissions: Admission[] = [
  ...verifiedHansungAdmissions,
  ...verifiedSkhUAdmissions,
  ...verifiedSeoultechAdmissions,
  ...verifiedDuksungAdmissions,
  ...verifiedDongdukAdmissions,
];
