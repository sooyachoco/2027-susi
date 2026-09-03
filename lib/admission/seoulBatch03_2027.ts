import type { Admission, Department, University } from "./types";

const source = (url: string) => ({ type: "university" as const, url, academicYear: 2027, collectedAt: "2026-09-03", verifiedAt: "2026-09-03", confidence: 0.98 });

export const seoulBatch03_2027Universities: University[] = [
  { id: "catholic-sungshin", name: "가톨릭대학교(성신교정)", region: "서울" },
  { id: "catholic-seongui", name: "가톨릭대학교(성의교정)", region: "서울" },
  { id: "skuniv", name: "서경대학교", region: "서울" },
  { id: "hansung", name: "한성대학교", region: "서울" },
];

const rows: Array<[string,string,string]> = [
  ["catholic-sungshin", "성신교정 모집단위", "인문·신학"],
  ["catholic-seongui", "성의교정 모집단위", "의학·간호"],
  ["skuniv", "2027 수시 전체(모집단위 합계)", "전체"],
  ["hansung", "크리에이티브인문학부", "인문"],
  ["hansung", "미래융합사회과학대학", "사회·경영"],
  ["hansung", "글로벌패션산업학부", "디자인·패션"],
  ["hansung", "문학문화콘텐츠학과", "인문·콘텐츠"],
  ["hansung", "IT공과대학", "컴퓨터·공학"],
  ["hansung", "AI응용학과", "AI·컴퓨터"],
  ["hansung", "융합보안학과", "AI·보안"],
  ["hansung", "AI기계로봇공학과", "AI·공학"],
  ["hansung", "미래모빌리티학과", "AI·공학"],
  ["hansung", "상상력인재학부", "자유전공"],
];
export const seoulBatch03_2027Departments: Department[] = rows.map(([u,n,c], index) => ({ id: `${u}-overall-${index}`, universityId: u, name: n, category: c }));

const methods: Array<[string,string,Admission["type"],number?,number?,boolean?,boolean?]> = [
  ["catholic-sungshin", "학교장추천전형", "교과"],
  ["catholic-sungshin", "잠재능력우수자전형", "학종"],
  ["catholic-seongui", "학교장추천전형", "교과"],
  ["catholic-seongui", "가톨릭지도자추천전형", "학종"],
  ["catholic-seongui", "논술전형", "논술"],
  ["skuniv", "교과성적우수자전형", "교과"],
  ["skuniv", "SKU논술우수자전형", "논술"],
  ["skuniv", "실기우수자전형", "기타"],
  ["hansung", "한성인재전형", "학종", 310, 100, false, false],
  ["hansung", "교과우수전형", "교과", 260, 100, false, true],
  ["hansung", "지역균형전형", "교과", 188, 100, false, false],
  ["hansung", "실기우수자전형", "기타", 128],
];

const urls: Record<string,string> = {
  "catholic-sungshin": "https://ipsi.catholic.ac.kr/",
  "catholic-seongui": "https://ipsi.catholic.ac.kr/",
  skuniv: "https://go.skuniv.ac.kr/",
  hansung: "https://enter.hansung.ac.kr/",
};

export const seoulBatch03_2027Admissions: Admission[] = methods.map(([u,name,type,count,recordWeight,interview,csat]) => ({
  id: `${u}-2027-${name}`,
  universityId: u,
  departmentId: `${u}-overall-0`,
  academicYear: 2027,
  name,
  type,
  ...(count !== undefined ? { recruitmentCount: count } : {}),
  ...(recordWeight !== undefined ? { studentRecordWeight: recordWeight } : {}),
  ...(interview ? { interview: true } : {}),
  ...(csat !== undefined ? { csatMinimum: { enabled: csat } } : {}),
  source: source(urls[u]),
  isMock: false,
}));
