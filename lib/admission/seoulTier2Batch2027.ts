import type { Admission, Department, University } from "./types";

const source = (url: string) => ({ type: "university" as const, url, academicYear: 2027, collectedAt: "2026-09-03", verifiedAt: "2026-09-03", confidence: 0.97 });

export const seoulTier2Batch2027Universities: University[] = [
  { id: "dongguk", name: "동국대학교", region: "서울" },
  { id: "kwangwoon", name: "광운대학교", region: "서울" },
  { id: "sangmyung-seoul", name: "상명대학교", region: "서울" },
  { id: "dongduk", name: "동덕여자대학교", region: "서울" },
  { id: "sahmyook", name: "삼육대학교", region: "서울" },
];

const defs: Array<[string,string,string,string]> = [
  ["dongguk","경영학과","경영·경제","동국대 수시"],["dongguk","전자전기공학부","공학","동국대 수시"],["dongguk","컴퓨터·AI학부","공학","동국대 수시"],["dongguk","미디어커뮤니케이션학전공","인문사회","동국대 수시"],
  ["kwangwoon","전자공학과","공학","광운대 수시"],["kwangwoon","컴퓨터정보공학부","공학","광운대 수시"],["kwangwoon","소프트웨어학부","공학","광운대 수시"],["kwangwoon","경영학부","경영·경제","광운대 수시"],
  ["sangmyung-seoul","경영학부","경영·경제","상명대 서울 수시"],["sangmyung-seoul","컴퓨터과학전공","공학","상명대 서울 수시"],["sangmyung-seoul","디지털콘텐츠전공","예체능·콘텐츠","상명대 서울 수시"],["sangmyung-seoul","한일문화콘텐츠전공","인문사회","상명대 서울 수시"],
  ["dongduk","경영학전공","경영·경제","동덕여대 수시"],["dongduk","컴퓨터학전공","공학","동덕여대 수시"],["dongduk","미디어디자인전공","예체능·콘텐츠","동덕여대 수시"],["dongduk","경제학전공","경영·경제","동덕여대 수시"],
  ["sahmyook","경영학과","경영·경제","삼육대 수시"],["sahmyook","컴퓨터공학부","공학","삼육대 수시"],["sahmyook","인공지능융합학부","공학","삼육대 수시"],["sahmyook","간호학과","의약·보건","삼육대 수시"],
];
export const seoulTier2Batch2027Departments: Department[] = defs.map(([u,n,c]) => ({ id: `${u}-${n.replace(/[^가-힣A-Za-z0-9]/g, "-")}`, universityId: u, name: n, category: c }));

const admissionDefs: Array<[string,string,string,string]> = [
  ["dongguk","학생부교과","교과","동국대 수시"],["dongguk","Do Dream","학종","동국대 수시"],["dongguk","논술","논술","동국대 수시"],
  ["kwangwoon","광운참빛인재전형Ⅰ-면접형","학종","광운대 수시"],["kwangwoon","광운참빛인재전형Ⅱ-서류형","학종","광운대 수시"],["kwangwoon","논술우수자전형","논술","광운대 수시"],["kwangwoon","지역균형전형","교과","광운대 수시"],
  ["sangmyung-seoul","학생부교과","교과","상명대 서울 수시"],["sangmyung-seoul","학생부종합","학종","상명대 서울 수시"],["sangmyung-seoul","논술","논술","상명대 서울 수시"],
  ["dongduk","학생부교과우수자","교과","동덕여대 수시"],["dongduk","동덕창의리더","학종","동덕여대 수시"],["dongduk","논술우수자","논술","동덕여대 수시"],
  ["sahmyook","학교장추천","교과","삼육대 수시"],["sahmyook","세움인재","학종","삼육대 수시"],["sahmyook","논술우수자","논술","삼육대 수시"],
];
export const seoulTier2Batch2027Admissions: Admission[] = [];
for (const [u,an,t,label] of admissionDefs) {
  const ds = seoulTier2Batch2027Departments.filter(d => d.universityId === u);
  for (const d of ds) seoulTier2Batch2027Admissions.push({ id: `${u}-2027-${an}-${d.id}`, universityId: u, departmentId: d.id, academicYear: 2027, name: an, type: t as Admission["type"], majorGroup: d.category, source: source(u === "dongguk" ? "https://ipsi.dongguk.edu/admission/html/rolling/guide.asp" : u === "kwangwoon" ? "https://iphak.kw.ac.kr/mojib/mojib.php?m_type=SUSI" : u === "sangmyung-seoul" ? "https://admission.smu.ac.kr/_seoul/iphak/mojip.html?bbsid=seoul_mojib&ctg_cd=susi" : u === "dongduk" ? "https://ipsi.dongduk.ac.kr/ipsi/contents/nontime-viewer.do?gotoMenuNo=nontime-viewer" : "https://ipsi.syu.ac.kr/2016_syu/pages/index.asp?mj=01&p=8") });
}
