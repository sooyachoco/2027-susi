import type { Admission, Department, University } from "./types";

export const hanyang2027Universities: University[] = [{ id: "hanyang", name: "한양대학교", region: "서울" }];

type Unit = {
  id: string;
  name: string;
  category: string;
  recommended?: number;
  holisticRecommended?: number;
  document?: number;
  interview?: number;
  essay?: number;
};

const units: Unit[] = [
  { id: "korean", name: "국어국문학과", category: "인문·사회", recommended: 4, holisticRecommended: 7, document: 2 },
  { id: "english", name: "영어영문학과", category: "인문·사회", recommended: 7, holisticRecommended: 8, document: 8 },
  { id: "history", name: "사학과", category: "인문·사회", recommended: 3, holisticRecommended: 6, document: 4 },
  { id: "political", name: "정치외교학과", category: "인문·사회", recommended: 4, holisticRecommended: 8, document: 4 },
  { id: "sociology", name: "사회학과", category: "인문·사회", recommended: 4, holisticRecommended: 8, document: 4 },
  { id: "media", name: "미디어커뮤니케이션학과", category: "미디어·콘텐츠", recommended: 5, holisticRecommended: 7, document: 6, interview: 2, essay: 5 },
  { id: "economics", name: "경제금융학부", category: "경영·경제", recommended: 9, holisticRecommended: 17, document: 10, interview: 4, essay: 9 },
  { id: "business", name: "경영학부", category: "경영·경제", recommended: 26, holisticRecommended: 30, document: 50, interview: 4, essay: 12 },
  { id: "policy", name: "정책학과", category: "인문·사회", recommended: 9, holisticRecommended: 17, document: 17, interview: 4, essay: 4 },
  { id: "publicadmin", name: "행정학과", category: "인문·사회", recommended: 5, holisticRecommended: 6, document: 6, interview: 2 },
  { id: "computer", name: "컴퓨터소프트웨어학부", category: "컴퓨터·소프트웨어", recommended: 13, holisticRecommended: 11, document: 13, interview: 13, essay: 10 },
  { id: "data", name: "데이터사이언스학부", category: "컴퓨터·AI", recommended: 9, holisticRecommended: 12, document: 14, interview: 0, essay: 6 },
  { id: "electrical", name: "전기·생체공학부(전기공학)", category: "공학", recommended: 5, holisticRecommended: 5, document: 7, interview: 6, essay: 5 },
  { id: "electronic", name: "융합전자공학부", category: "공학", recommended: 17, holisticRecommended: 10, document: 28, interview: 10, essay: 10 },
  { id: "mechanical", name: "기계공학부", category: "공학", recommended: 17, holisticRecommended: 11, document: 14, interview: 14, essay: 9 },
  { id: "materials", name: "신소재공학부", category: "공학", recommended: 8, holisticRecommended: 5, document: 7, interview: 7, essay: 7 },
  { id: "chemical", name: "화학공학과", category: "공학", recommended: 5, holisticRecommended: 5, document: 4, interview: 4, essay: 4 },
  { id: "civil", name: "건설환경공학과", category: "공학", recommended: 6, holisticRecommended: 11, document: 4, interview: 4 },
  { id: "urban", name: "도시공학과", category: "공학", recommended: 5, holisticRecommended: 8, document: 3, interview: 4 },
  { id: "architecture", name: "건축학부(5년제)", category: "공학", recommended: 5, holisticRecommended: 10, document: 2, interview: 4 },
  { id: "math", name: "수학과", category: "자연과학", recommended: 5, holisticRecommended: 9, document: 3, essay: 8 },
  { id: "physics", name: "물리학과", category: "자연과학", recommended: 4, holisticRecommended: 11, document: 2, essay: 5 },
  { id: "chemistry", name: "화학과", category: "자연과학", recommended: 6, holisticRecommended: 14, document: 3, essay: 5 },
  { id: "life", name: "생명과학과", category: "자연과학", recommended: 6, holisticRecommended: 13, document: 3, essay: 5 },
  { id: "nursing", name: "간호학과", category: "보건·간호", recommended: 4, holisticRecommended: 6, document: 7, interview: 3, essay: 5 },
  { id: "medicine", name: "의예과", category: "의학", document: 16, interview: 2, essay: 40 },
];

export const hanyang2027Departments: Department[] = units.map(({ id, name, category }) => ({
  id: `hanyang-${id}`,
  universityId: "hanyang",
  name,
  category,
}));

const src = "https://go.hanyang.ac.kr/web/mojib/mojib.do?m_type=SUSI&m_year=2027";

const admission = (
  id: string,
  dept: string,
  name: string,
  type: "교과" | "학종" | "논술",
  extra: Partial<Admission> = {},
): Admission => ({
  id: `hanyang-${dept}-${id}-2027`,
  universityId: "hanyang",
  departmentId: `hanyang-${dept}`,
  academicYear: 2027,
  name,
  type,
  source: { type: "university", academicYear: 2027, url: src, confidence: 0.99, verifiedAt: "2026-09-05" },
  isMock: false,
  ...extra,
});

export const hanyang2027Admissions: Admission[] = units.flatMap((unit) => {
  const admissions: Admission[] = [];
  if (unit.recommended) admissions.push(admission("recommended", unit.id, "학생부교과(추천형)", "교과", { recruitmentCount: unit.recommended, studentRecordWeight: 90 }));
  if (unit.holisticRecommended) admissions.push(admission("holistic-recommended", unit.id, "학생부종합(추천형)", "학종", { recruitmentCount: unit.holisticRecommended, documentWeight: 100 }));
  if (unit.document) admissions.push(admission("holistic-document", unit.id, "학생부종합(서류형)", "학종", { recruitmentCount: unit.document, documentWeight: 100 }));
  if (unit.interview) admissions.push(admission("holistic-interview", unit.id, "학생부종합(면접형)", "학종", { recruitmentCount: unit.interview, documentWeight: 70, interview: true }));
  if (unit.essay) admissions.push(admission("essay", unit.id, "논술전형", "논술", { recruitmentCount: unit.essay }));
  return admissions;
});
