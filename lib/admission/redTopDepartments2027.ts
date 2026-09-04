import type { Admission, Department } from "./types";

const source = {
  type: "university" as const,
  academicYear: 2027,
  collectedAt: "2026-09-04",
  verifiedAt: "2026-09-04",
  confidence: 0.99,
};

type Row = [string, string, number];
type AdmissionRow = [string, string, number, Admission["type"], string];

const sogangGeneralI: Row[] = [
  ["sogang-2027-korean", "국어국문학과", 10], ["sogang-2027-history", "사학과", 10], ["sogang-2027-philosophy", "철학과", 10], ["sogang-2027-religious", "종교학과", 8],
  ["sogang-2027-english", "영문학부", 27], ["sogang-2027-europe", "유럽문화학과", 18], ["sogang-2027-china", "중국문화학과", 12], ["sogang-2027-sociology", "사회학과", 10],
  ["sogang-2027-politics", "정치외교학과", 10], ["sogang-2027-psychology", "심리학과", 10], ["sogang-2027-economics", "경제학과", 43], ["sogang-2027-business", "경영학부", 72],
  ["sogang-2027-broadcast", "신문방송학과", 11], ["sogang-2027-media", "미디어&엔터테인먼트학과", 11], ["sogang-2027-arttech", "아트&테크놀로지학과", 11], ["sogang-2027-global-korean", "글로벌한국학부", 8],
  ["sogang-2027-geppert", "게페르트국제학부", 4], ["sogang-2027-math", "수학과", 14], ["sogang-2027-physics", "물리학과", 14], ["sogang-2027-chemistry", "화학과", 18],
  ["sogang-2027-life", "생명과학과", 18], ["sogang-2027-electronics", "전자공학과", 23], ["sogang-2027-chemical", "화공생명공학과", 29], ["sogang-2027-mechanical", "기계공학과", 25],
  ["sogang-2027-semiconductor", "반도체공학과", 13], ["sogang-2027-system-semiconductor", "시스템반도체공학과", 14], ["sogang-2027-computer", "컴퓨터공학과", 29], ["sogang-2027-ai", "인공지능학과", 12],
];
const sogangGeneralII: Row[] = [
  ["sogang-2027-humanities", "인문학부", 8], ["sogang-2027-social", "사회과학부", 8], ["sogang-2027-media-wide", "지식융합미디어학부", 8],
  ["sogang-2027-humanities-free", "인문학기반자유전공학부", 20], ["sogang-2027-science-free", "SCIENCE기반자유전공학부", 15], ["sogang-2027-ai-free", "AI기반자유전공학부", 15],
];

const sogangOpportunity: AdmissionRow[] = [
  ["sogang-2027-humanities", "인문학부", 7, "학종", "학생부종합(기회균형)"], ["sogang-2027-english", "영문학부", 5, "학종", "학생부종합(기회균형)"],
  ["sogang-2027-europe", "유럽문화학과", 4, "학종", "학생부종합(기회균형)"], ["sogang-2027-china", "중국문화학과", 3, "학종", "학생부종합(기회균형)"],
  ["sogang-2027-social", "사회과학부", 5, "학종", "학생부종합(기회균형)"], ["sogang-2027-economics", "경제학과", 8, "학종", "학생부종합(기회균형)"],
  ["sogang-2027-business", "경영학부", 14, "학종", "학생부종합(기회균형)"], ["sogang-2027-media-wide", "지식융합미디어학부", 6, "학종", "학생부종합(기회균형)"],
  ["sogang-2027-math", "수학과", 3, "학종", "학생부종합(기회균형)"], ["sogang-2027-physics", "물리학과", 3, "학종", "학생부종합(기회균형)"],
  ["sogang-2027-chemistry", "화학과", 4, "학종", "학생부종합(기회균형)"], ["sogang-2027-life", "생명과학과", 4, "학종", "학생부종합(기회균형)"],
  ["sogang-2027-electronics", "전자공학과", 5, "학종", "학생부종합(기회균형)"], ["sogang-2027-chemical", "화공생명공학과", 5, "학종", "학생부종합(기회균형)"],
  ["sogang-2027-mechanical", "기계공학과", 4, "학종", "학생부종합(기회균형)"], ["sogang-2027-computer", "컴퓨터공학과", 5, "학종", "학생부종합(기회균형)"],
];
const sogangValue: AdmissionRow[] = [
  ["sogang-2027-humanities", "인문학부", 3, "학종", "학생부종합(서강가치)"], ["sogang-2027-english", "영문학부", 3, "학종", "학생부종합(서강가치)"],
  ["sogang-2027-social", "사회과학부", 3, "학종", "학생부종합(서강가치)"], ["sogang-2027-economics", "경제학과", 3, "학종", "학생부종합(서강가치)"],
  ["sogang-2027-business", "경영학부", 3, "학종", "학생부종합(서강가치)"], ["sogang-2027-media-wide", "지식융합미디어학부", 3, "학종", "학생부종합(서강가치)"],
  ["sogang-2027-math", "수학과", 2, "학종", "학생부종합(서강가치)"], ["sogang-2027-physics", "물리학과", 2, "학종", "학생부종합(서강가치)"],
  ["sogang-2027-chemistry", "화학과", 2, "학종", "학생부종합(서강가치)"], ["sogang-2027-life", "생명과학과", 2, "학종", "학생부종합(서강가치)"],
  ["sogang-2027-electronics", "전자공학과", 2, "학종", "학생부종합(서강가치)"], ["sogang-2027-chemical", "화공생명공학과", 2, "학종", "학생부종합(서강가치)"],
  ["sogang-2027-mechanical", "기계공학과", 2, "학종", "학생부종합(서강가치)"], ["sogang-2027-computer", "컴퓨터공학과", 2, "학종", "학생부종합(서강가치)"],
];
const sogangEssay: AdmissionRow[] = [
  ["sogang-2027-humanities", "인문학부", 15, "논술", "논술(일반)"], ["sogang-2027-english", "영문학부", 10, "논술", "논술(일반)"], ["sogang-2027-social", "사회과학부", 13, "논술", "논술(일반)"],
  ["sogang-2027-economics", "경제학과", 21, "논술", "논술(일반)"], ["sogang-2027-business", "경영학부", 38, "논술", "논술(일반)"], ["sogang-2027-media-wide", "지식융합미디어학부", 10, "논술", "논술(일반)"],
  ["sogang-2027-math", "수학과", 6, "논술", "논술(일반)"], ["sogang-2027-physics", "물리학과", 6, "논술", "논술(일반)"], ["sogang-2027-electronics", "전자공학과", 12, "논술", "논술(일반)"],
  ["sogang-2027-chemical", "화공생명공학과", 12, "논술", "논술(일반)"], ["sogang-2027-mechanical", "기계공학과", 10, "논술", "논술(일반)"], ["sogang-2027-computer", "컴퓨터공학과", 12, "논술", "논술(일반)"],
  ["sogang-2027-ai", "인공지능학과", 3, "논술", "논술(일반)"], ["sogang-2027-system-semiconductor", "시스템반도체공학과", 3, "논술", "논술(일반)"],
];
const sogangSpecialized: AdmissionRow[] = [
  ["sogang-2027-economics", "경제학과", 3, "학종", "학생부종합(특성화고교졸업자)"],
  ["sogang-2027-business", "경영학부", 3, "학종", "학생부종합(특성화고교졸업자)"],
];
const sogangRegionAggregate: Admission[] = [{
  id: "sogang-region-balance-2027", universityId: "sogang", departmentId: "sogang-2027-region-balance", academicYear: 2027,
  name: "학생부교과(지역균형)", type: "교과", recruitmentCount: 180,
  source: { ...source, url: "https://admission.sogang.ac.kr/" }, isMock: false, isAggregate: true,
} as Admission];

const snuRows: Row[] = [
  ["snu-2027-free-major", "자유전공학부", 123], ["snu-2027-wide", "광역", 36], ["snu-2027-humanities-wide", "인문계열", 132], ["snu-2027-engineering-wide", "공과대학 광역", 36],
  ["snu-2027-advanced-convergence", "첨단융합학부", 219], ["snu-2027-materials", "재료공학부", 68], ["snu-2027-chemical-bio", "화학생물공학부", 67], ["snu-2027-biomaterials", "바이오시스템·소재학부", 33],
];

const sogangExtraRows = [...sogangOpportunity, ...sogangValue, ...sogangEssay, ...sogangSpecialized];
const allRows = [...sogangGeneralI, ...sogangGeneralII, ...snuRows];
const sogangExtraDepartments = sogangExtraRows.map(([id, name]) => ({ id, universityId: "sogang", name, category: "수시모집단위" }));

export const redTopDepartment2027Departments: Department[] = [
  ...allRows.map(([id, name]) => ({ id, universityId: id.startsWith("snu-") ? "snu" : "sogang", name, category: id.startsWith("snu-") ? "수시모집단위·전공자율선택" : "수시모집단위" })),
  ...sogangExtraDepartments,
  { id: "sogang-2027-region-balance", universityId: "sogang", name: "지역균형(집계)", category: "수시모집·집계" },
];

const generalAdmissions: Admission[] = allRows.map(([departmentId, name, recruitmentCount]) => ({
  id: `redtop-dept-general-${departmentId}-2027`, universityId: departmentId.startsWith("snu-") ? "snu" : "sogang", departmentId, academicYear: 2027,
  name: departmentId.startsWith("snu-") ? "2027 모집단위 심화정보" : `학생부종합 일반${sogangGeneralI.some(([id]) => id === departmentId) ? "Ⅰ" : "Ⅱ"}`,
  type: "학종", recruitmentCount,
  source: { ...source, url: departmentId.startsWith("snu-") ? "https://admission.snu.ac.kr/undergraduate/notice?bbsidx=154588&md=v" : "https://admission.sogang.ac.kr/" },
  isMock: false,
}));
const extraAdmissions: Admission[] = sogangExtraRows.map(([departmentId, _name, recruitmentCount, type, name]) => ({
  id: `sogang-${name}-${departmentId}-2027`, universityId: "sogang", departmentId, academicYear: 2027, name, type, recruitmentCount,
  source: { ...source, url: "https://admission.sogang.ac.kr/" }, isMock: false,
  ...(type === "논술" ? { csatMinimum: { enabled: true } } : {}),
} as Admission));

export const redTopDepartment2027Admissions: Admission[] = [...generalAdmissions, ...extraAdmissions, ...sogangRegionAggregate];
