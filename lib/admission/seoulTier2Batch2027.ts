import type { Admission, Department, University } from "./types";

const source = (url: string) => ({ type: "university" as const, url, academicYear: 2027, collectedAt: "2026-09-03", verifiedAt: "2026-09-03", confidence: 0.98 });

export const seoulTier2Batch2027Universities: University[] = [
  { id: "dongguk", name: "동국대학교", region: "서울" },
  { id: "kwangwoon", name: "광운대학교", region: "서울" },
  { id: "sangmyung-seoul", name: "상명대학교", region: "서울" },
  { id: "dongduk", name: "동덕여자대학교", region: "서울" },
  { id: "sahmyook", name: "삼육대학교", region: "서울" },
];

const defs: Array<[string,string,string]> = [
  ["dongguk","경영학과","경영·경제"],["dongguk","전자전기공학부","공학"],["dongguk","컴퓨터·AI학부","공학"],["dongguk","미디어커뮤니케이션학전공","인문사회"],
  ["kwangwoon","전자공학과","공학"],["kwangwoon","컴퓨터정보공학부","공학"],["kwangwoon","소프트웨어학부","공학"],["kwangwoon","경영학부","경영·경제"],
  ["sangmyung-seoul","경영학부","경영·경제"],["sangmyung-seoul","컴퓨터과학전공","공학"],["sangmyung-seoul","디지털콘텐츠전공","예체능·콘텐츠"],["sangmyung-seoul","한일문화콘텐츠전공","인문사회"],
  ["dongduk","경영학전공","경영·경제"],["dongduk","컴퓨터학전공","공학"],["dongduk","미디어디자인전공","예체능·콘텐츠"],["dongduk","경제학전공","경영·경제"],
  ["sahmyook","경영학과","경영·경제"],["sahmyook","컴퓨터공학부","공학"],["sahmyook","인공지능융합학부","공학"],["sahmyook","간호학과","의약·보건"],
];
export const seoulTier2Batch2027Departments: Department[] = defs.map(([u,n,c]) => ({ id: `${u}-${n.replace(/[^가-힣A-Za-z0-9]/g, "-")}`, universityId: u, name: n, category: c }));

const sourceUrls: Record<string,string> = {
  dongguk: "https://ipsi.dongguk.edu/admission/html/rolling/guide.asp",
  kwangwoon: "https://iphak.kw.ac.kr/mojib/mojib.php?m_type=SUSI",
  "sangmyung-seoul": "https://admission.smu.ac.kr/_seoul/iphak/mojip.html?bbsid=seoul_mojib&ctg_cd=susi",
  dongduk: "https://ipsi.dongduk.ac.kr/",
  sahmyook: "https://ipsi.syu.ac.kr/2016_syu/main/main.asp",
};

type Method = { universityId: string; name: string; type: Admission["type"]; studentRecordWeight?: number; documentWeight?: number; interview?: boolean; csatMinimum?: boolean };
const methods: Method[] = [
  { universityId: "dongguk", name: "학교장추천인재", type: "교과", studentRecordWeight: 70, documentWeight: 30, csatMinimum: true },
  { universityId: "dongguk", name: "Do Dream", type: "학종", documentWeight: 100, interview: true },
  { universityId: "dongguk", name: "논술", type: "논술", studentRecordWeight: 20, documentWeight: 0, csatMinimum: true },
  { universityId: "kwangwoon", name: "광운참빛인재전형Ⅰ-면접형", type: "학종", documentWeight: 70, interview: true },
  { universityId: "kwangwoon", name: "광운참빛인재전형Ⅱ-서류형", type: "학종", documentWeight: 100 },
  { universityId: "kwangwoon", name: "논술우수자전형", type: "논술", studentRecordWeight: 30, csatMinimum: false },
  { universityId: "kwangwoon", name: "지역균형전형", type: "교과", studentRecordWeight: 100, csatMinimum: true },
  { universityId: "sangmyung-seoul", name: "학생부교과(고교추천)", type: "교과", studentRecordWeight: 100 },
  { universityId: "sangmyung-seoul", name: "학생부종합(상명인재)", type: "학종", documentWeight: 100, interview: true },
  { universityId: "sangmyung-seoul", name: "논술", type: "논술", studentRecordWeight: 10, csatMinimum: true },
  { universityId: "dongduk", name: "학생부교과우수자", type: "교과", studentRecordWeight: 100, csatMinimum: true },
  { universityId: "dongduk", name: "동덕창의리더", type: "학종", documentWeight: 100, interview: true },
  { universityId: "dongduk", name: "논술우수자", type: "논술", csatMinimum: true },
  { universityId: "sahmyook", name: "학교장추천", type: "교과", studentRecordWeight: 100, csatMinimum: true },
  { universityId: "sahmyook", name: "세움인재", type: "학종", documentWeight: 100 },
  { universityId: "sahmyook", name: "논술우수자", type: "논술", csatMinimum: true },
];

export const seoulTier2Batch2027Admissions: Admission[] = [];
for (const method of methods) {
  const ds = seoulTier2Batch2027Departments.filter(d => d.universityId === method.universityId);
  for (const d of ds) seoulTier2Batch2027Admissions.push({
    id: `${method.universityId}-2027-${method.name}-${d.id}`,
    universityId: method.universityId,
    departmentId: d.id,
    academicYear: 2027,
    name: method.name,
    type: method.type,
    majorGroup: d.category,
    ...(method.studentRecordWeight !== undefined ? { studentRecordWeight: method.studentRecordWeight } : {}),
    ...(method.documentWeight !== undefined && method.documentWeight > 0 ? { documentWeight: method.documentWeight } : {}),
    ...(method.interview !== undefined ? { interview: method.interview } : {}),
    ...(method.csatMinimum !== undefined ? { csatMinimum: { enabled: method.csatMinimum } } : {}),
    source: source(sourceUrls[method.universityId]),
    isMock: false,
  });
}
