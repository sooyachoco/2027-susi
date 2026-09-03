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
  ["hansung", "2027 수시 전체(모집단위 합계)", "전체"],
];
export const seoulBatch03_2027Departments: Department[] = rows.map(([u,n,c]) => ({ id: `${u}-overall`, universityId: u, name: n, category: c }));

const methods: Array<[string,string,string,string]> = [
  ["catholic-sungshin", "학교장추천전형", "교과", "가톨릭대 2027 수시"],
  ["catholic-sungshin", "잠재능력우수자전형", "학종", "가톨릭대 2027 수시"],
  ["catholic-seongui", "학교장추천전형", "교과", "가톨릭대 2027 수시"],
  ["catholic-seongui", "가톨릭지도자추천전형", "학종", "가톨릭대 2027 수시"],
  ["catholic-seongui", "논술전형", "논술", "가톨릭대 2027 수시"],
  ["skuniv", "교과성적우수자전형", "교과", "서경대 2027 수시"],
  ["skuniv", "SKU논술우수자전형", "논술", "서경대 2027 수시"],
  ["skuniv", "실기우수자전형", "기타", "서경대 2027 수시"],
  ["hansung", "한성인재전형", "학종", "한성대 2027 수시"],
  ["hansung", "교과우수전형", "교과", "한성대 2027 수시"],
  ["hansung", "논술우수전형", "논술", "한성대 2027 수시"],
];

const urls: Record<string,string> = {
  "catholic-sungshin": "https://ipsi.catholic.ac.kr/",
  "catholic-seongui": "https://ipsi.catholic.ac.kr/",
  skuniv: "https://go.skuniv.ac.kr/",
  hansung: "https://enter.hansung.ac.kr/",
};

export const seoulBatch03_2027Admissions: Admission[] = methods.map(([u,name,type]) => ({
  id: `${u}-2027-${name}`,
  universityId: u,
  departmentId: `${u}-overall`,
  academicYear: 2027,
  name,
  type: type as Admission["type"],
  source: source(urls[u]),
  isMock: false,
}));
