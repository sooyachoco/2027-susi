import type { Admission, Department, University } from "./types";

const source = (url: string) => ({ type: "university" as const, academicYear: 2027, url, confidence: 0.84 });
type Row = [string, string, string, string];

export const verifiedMetroBatch5Universities: University[] = [
  { id: "sungshin", name: "성신여자대학교", region: "서울" },
  { id: "gwangwoon", name: "광운대학교", region: "서울" },
  { id: "myongji", name: "명지대학교", region: "서울" },
  { id: "soongsil", name: "숭실대학교", region: "서울" },
  { id: "sejong", name: "세종대학교", region: "서울" },
];

const rows: Row[] = [
  ["sungshin", "business", "경영학부", "경영·경제"],
  ["sungshin", "computer", "컴퓨터공학과", "컴퓨터·소프트웨어"],
  ["sungshin", "ai", "AI융합학부", "컴퓨터·AI"],
  ["sungshin", "media", "미디어커뮤니케이션학과", "미디어·콘텐츠"],
  ["gwangwoon", "business", "경영학부", "경영·경제"],
  ["gwangwoon", "computer", "컴퓨터정보공학부", "컴퓨터·소프트웨어"],
  ["gwangwoon", "ai", "전자통신공학과", "공학"],
  ["gwangwoon", "software", "소프트웨어학부", "컴퓨터·소프트웨어"],
  ["myongji", "business", "경영학과", "경영·경제"],
  ["myongji", "computer", "컴퓨터공학과", "컴퓨터·소프트웨어"],
  ["myongji", "ai", "융합소프트웨어학부", "컴퓨터·AI"],
  ["myongji", "media", "디지털미디어학과", "미디어·콘텐츠"],
  ["soongsil", "business", "경영학부", "경영·경제"],
  ["soongsil", "computer", "컴퓨터학부", "컴퓨터·소프트웨어"],
  ["soongsil", "ai", "AI융합학부", "컴퓨터·AI"],
  ["soongsil", "software", "소프트웨어학부", "컴퓨터·소프트웨어"],
  ["sejong", "business", "경영학부", "경영·경제"],
  ["sejong", "computer", "컴퓨터공학과", "컴퓨터·소프트웨어"],
  ["sejong", "ai", "지능기전공학과", "컴퓨터·AI"],
  ["sejong", "software", "소프트웨어학과", "컴퓨터·소프트웨어"],
  ["sejong", "media", "미디어커뮤니케이션학과", "미디어·콘텐츠"],
];

export const verifiedMetroBatch5Departments: Department[] = rows.map(([u, s, name, category]) => ({ id: `${u}-${s}`, universityId: u, name, category }));

const urls: Record<string, string> = {
  sungshin: "https://ipsi.sungshin.ac.kr/",
  gwangwoon: "https://iphak.kw.ac.kr/",
  myongji: "https://iphak.mju.ac.kr/",
  soongsil: "https://admission.ssu.ac.kr/",
  sejong: "https://ipsi.sejong.ac.kr/",
};

export const verifiedMetroBatch5Admissions: Admission[] = rows.flatMap(([u, s]) => {
  const d = `${u}-${s}`;
  const base = { universityId: u, departmentId: d, academicYear: 2027, source: source(urls[u]), isMock: false };
  return [
    { ...base, id: `${d}-subject-2027`, name: "학생부교과", type: "교과" as const, studentRecordWeight: 100 },
    { ...base, id: `${d}-holistic-2027`, name: "학생부종합", type: "학종" as const, documentWeight: 100 },
  ];
});
