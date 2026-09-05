import type { Admission, Department, University } from "./types";

export const dankook2027Universities: University[] = [
  { id: "dankook-jukjeon", name: "단국대학교(죽전)", region: "경기" },
];

const units: Array<[string, string, string]> = [
  ["korean", "국어국문학과", "인문·사회"],
  ["history", "사학과", "인문·사회"],
  ["philosophy", "철학과", "인문·사회"],
  ["englishHumanities", "영미인문학과", "인문·사회"],
  ["law", "법학과", "인문·사회"],
  ["politics", "정치외교학과", "인문·사회"],
  ["publicadmin", "행정학과", "인문·사회"],
  ["urbanRealEstate", "도시계획·부동산학부", "인문·사회"],
  ["media", "미디어커뮤니케이션학부", "미디어·콘텐츠"],
  ["counseling", "상담학과", "인문·사회"],
  ["economics", "경제학과", "경영·경제"],
  ["international", "무역학과", "경영·경제"],
  ["business", "경영학부", "경영·경제"],
  ["internationalBusiness", "국제경영학과", "경영·경제"],
  ["mobileSystems", "모바일시스템공학과", "컴퓨터·소프트웨어"],
  ["electrical", "전자전기공학과", "공학"],
  ["semiconductor", "융합반도체공학과", "공학"],
  ["polymer", "고분자공학전공", "공학"],
  ["fiber", "파이버융합소재공학전공", "공학"],
  ["civil", "토목환경공학과", "공학"],
  ["mechanical", "기계공학과", "공학"],
  ["chemical", "화학공학과", "공학"],
  ["architecture5", "건축학전공(5년제)", "공학"],
  ["architecturalEngineering", "건축공학전공", "공학"],
  ["software", "소프트웨어학과", "컴퓨터·소프트웨어"],
  ["computer", "컴퓨터공학과", "컴퓨터·소프트웨어"],
  ["data", "통계데이터사이언스학과", "컴퓨터·AI"],
  ["cyberSecurity", "사이버보안학과", "컴퓨터·소프트웨어"],
  ["hanmunEducation", "한문교육과", "교육"],
  ["specialEducation", "특수교육과", "교육"],
  ["mathEducation", "수학교육과", "교육"],
  ["scienceEducation", "과학교육과", "교육"],
  ["physicalEducation", "체육교육과", "교육·체육"],
];

export const dankook2027Departments: Department[] = units.map(([id, name, category]) => ({
  id: `dankook-jukjeon-${id}`,
  universityId: "dankook-jukjeon",
  name,
  category,
}));

const src = "https://ipsi.dankook.ac.kr/jukjeon/dataroom/list.html?bbsid=juk_info&bltn_seq=50954&mode=view&page=1";

const source = {
  type: "university" as const,
  academicYear: 2027,
  url: src,
  confidence: 0.99,
  verifiedAt: "2026-09-05",
};

type Recruitment = {
  document: number;
  interview: number;
  sw: number;
  opportunity: number;
  social: number;
  startup: number;
  regional: number;
  essay: number;
};

const recruitment: Record<string, Recruitment> = {
  korean: { document: 4, interview: 4, sw: 2, opportunity: 4, social: 4, startup: 2, regional: 2, essay: 1 },
  history: { document: 4, interview: 4, sw: 2, opportunity: 4, social: 4, startup: 2, regional: 2, essay: 1 },
  philosophy: { document: 3, interview: 3, sw: 2, opportunity: 2, social: 2, startup: 2, regional: 1, essay: 1 },
  englishHumanities: { document: 3, interview: 3, sw: 2, opportunity: 4, social: 4, startup: 3, regional: 2, essay: 1 },
  law: { document: 10, interview: 10, sw: 3, opportunity: 6, social: 10, startup: 3, regional: 3, essay: 1 },
  politics: { document: 5, interview: 5, sw: 2, opportunity: 3, social: 4, startup: 3, regional: 2, essay: 1 },
  publicadmin: { document: 6, interview: 6, sw: 2, opportunity: 3, social: 4, startup: 3, regional: 2, essay: 1 },
  urbanRealEstate: { document: 6, interview: 6, sw: 3, opportunity: 5, social: 5, startup: 3, regional: 2, essay: 1 },
  media: { document: 6, interview: 6, sw: 3, opportunity: 5, social: 7, startup: 3, regional: 2, essay: 1 },
  counseling: { document: 6, interview: 5, sw: 2, opportunity: 3, social: 6, startup: 3, regional: 2, essay: 1 },
  economics: { document: 8, interview: 8, sw: 3, opportunity: 5, social: 7, startup: 4, regional: 2, essay: 1 },
  international: { document: 8, interview: 8, sw: 3, opportunity: 4, social: 7, startup: 4, regional: 2, essay: 1 },
  business: { document: 12, interview: 12, sw: 3, opportunity: 6, social: 13, startup: 17, regional: 4, essay: 4 },
  internationalBusiness: { document: 5, interview: 5, sw: 3, opportunity: 5, social: 5, startup: 0, regional: 0, essay: 0 },
  mobileSystems: { document: 3, interview: 3, sw: 2, opportunity: 1, social: 0, startup: 0, regional: 0, essay: 0 },
  electrical: { document: 6, interview: 6, sw: 3, opportunity: 3, social: 3, startup: 8, regional: 7, essay: 2 },
  semiconductor: { document: 5, interview: 5, sw: 3, opportunity: 2, social: 3, startup: 5, regional: 4, essay: 2 },
  polymer: { document: 6, interview: 6, sw: 2, opportunity: 2, social: 5, startup: 4, regional: 3, essay: 2 },
  fiber: { document: 4, interview: 4, sw: 2, opportunity: 2, social: 5, startup: 4, regional: 2, essay: 2 },
  civil: { document: 5, interview: 5, sw: 3, opportunity: 3, social: 7, startup: 6, regional: 3, essay: 2 },
  mechanical: { document: 6, interview: 6, sw: 2, opportunity: 2, social: 6, startup: 5, regional: 4, essay: 2 },
  chemical: { document: 6, interview: 6, sw: 3, opportunity: 3, social: 7, startup: 7, regional: 4, essay: 2 },
  architecture5: { document: 9, interview: 9, sw: 3, opportunity: 3, social: 5, startup: 5, regional: 2, essay: 0 },
  architecturalEngineering: { document: 4, interview: 4, sw: 2, opportunity: 2, social: 4, startup: 3, regional: 2, essay: 2 },
  software: { document: 7, interview: 4, sw: 3, opportunity: 10, social: 4, startup: 4, regional: 2, essay: 1 },
  computer: { document: 6, interview: 3, sw: 2, opportunity: 5, social: 3, startup: 3, regional: 2, essay: 1 },
  data: { document: 3, interview: 2, sw: 2, opportunity: 4, social: 3, startup: 3, regional: 2, essay: 1 },
  cyberSecurity: { document: 3, interview: 2, sw: 2, opportunity: 4, social: 3, startup: 1, regional: 1, essay: 1 },
  hanmunEducation: { document: 3, interview: 3, sw: 0, opportunity: 3, social: 4, startup: 1, regional: 0, essay: 0 },
  specialEducation: { document: 4, interview: 10, sw: 0, opportunity: 4, social: 4, startup: 1, regional: 0, essay: 0 },
  mathEducation: { document: 6, interview: 6, sw: 0, opportunity: 5, social: 3, startup: 1, regional: 0, essay: 0 },
  scienceEducation: { document: 4, interview: 4, sw: 0, opportunity: 5, social: 4, startup: 1, regional: 0, essay: 0 },
  physicalEducation: { document: 0, interview: 0, sw: 0, opportunity: 0, social: 0, startup: 0, regional: 10, essay: 0 },
};

const admission = (
  id: string,
  dept: string,
  name: string,
  type: "교과" | "학종" | "논술",
  recruitmentCount: number,
  extra: Partial<Admission> = {},
): Admission => ({
  id: `dankook-jukjeon-${dept}-${id}-2027`,
  universityId: "dankook-jukjeon",
  departmentId: `dankook-jukjeon-${dept}`,
  academicYear: 2027,
  name,
  type,
  recruitmentCount,
  source,
  isMock: false,
  ...extra,
});

export const dankook2027Admissions: Admission[] = units.flatMap(([id]) => {
  const r = recruitment[id];
  const admissions: Admission[] = [];
  if (r.document > 0) admissions.push(admission("dku-document", id, "학생부종합(DKU인재_서류형)", "학종", r.document, { documentWeight: 100 }));
  if (r.interview > 0) admissions.push(admission("dku-interview", id, "학생부종합(DKU인재_면접형)", "학종", r.interview, { documentWeight: 70, interview: true }));
  if (r.sw > 0) admissions.push(admission("sw", id, "학생부종합(SW인재)", "학종", r.sw, { documentWeight: 70, interview: true }));
  if (r.opportunity > 0) admissions.push(admission("opportunity", id, "학생부종합(기회균형선발)", "학종", r.opportunity, { documentWeight: 100 }));
  if (r.social > 0) admissions.push(admission("social", id, "학생부종합(사회적배려대상자)", "학종", r.social, { documentWeight: 100 }));
  if (r.startup > 0) admissions.push(admission("startup", id, "학생부종합(창업인재)", "학종", r.startup, { documentWeight: 70, interview: true }));
  if (r.regional > 0) admissions.push(admission("regional", id, "학생부교과(지역균형선발)", "교과", r.regional, { studentRecordWeight: 95 }));
  if (r.essay > 0) admissions.push(admission("essay", id, "논술우수자전형", "논술", r.essay));
  return admissions;
});
