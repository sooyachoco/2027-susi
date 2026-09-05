import type { Admission, Department, University } from "./types";

export const uos2027Universities: University[] = [
  { id: "uos", name: "서울시립대학교", region: "서울" },
];

type Row = {
  id: string;
  name: string;
  category: string;
  regional: number;
  holistic1: number;
  holistic2: number;
  opportunity: number;
  social: number;
  essay: number;
  practical: number;
};

const rows: Row[] = [
  { id: "publicadmin", name: "행정학과", category: "인문·사회", regional: 14, holistic1: 21, holistic2: 0, opportunity: 5, social: 2, essay: 0, practical: 0 },
  { id: "international", name: "국제관계학과", category: "인문·사회", regional: 6, holistic1: 17, holistic2: 0, opportunity: 3, social: 2, essay: 0, practical: 0 },
  { id: "economics", name: "경제학부", category: "경영·경제", regional: 9, holistic1: 10, holistic2: 19, opportunity: 8, social: 2, essay: 0, practical: 0 },
  { id: "socialwelfare", name: "사회복지학과", category: "인문·사회", regional: 5, holistic1: 12, holistic2: 0, opportunity: 3, social: 2, essay: 0, practical: 0 },
  { id: "tax", name: "세무학과", category: "경영·경제", regional: 9, holistic1: 7, holistic2: 0, opportunity: 6, social: 1, essay: 0, practical: 0 },
  { id: "business", name: "경영학부", category: "경영·경제", regional: 23, holistic1: 0, holistic2: 80, opportunity: 20, social: 2, essay: 0, practical: 0 },
  { id: "english", name: "영어영문학과", category: "인문·사회", regional: 4, holistic1: 18, holistic2: 0, opportunity: 2, social: 1, essay: 0, practical: 0 },
  { id: "korean", name: "국어국문학과", category: "인문·사회", regional: 3, holistic1: 11, holistic2: 0, opportunity: 1, social: 1, essay: 0, practical: 0 },
  { id: "history", name: "국사학과", category: "인문·사회", regional: 3, holistic1: 11, holistic2: 0, opportunity: 1, social: 1, essay: 0, practical: 0 },
  { id: "philosophy", name: "철학과", category: "인문·사회", regional: 3, holistic1: 10, holistic2: 0, opportunity: 1, social: 1, essay: 0, practical: 0 },
  { id: "chinese", name: "중국어문화학과", category: "인문·사회", regional: 3, holistic1: 10, holistic2: 0, opportunity: 1, social: 1, essay: 0, practical: 0 },
  { id: "urbanadmin", name: "도시행정학과", category: "인문·사회", regional: 5, holistic1: 12, holistic2: 0, opportunity: 2, social: 2, essay: 0, practical: 0 },
  { id: "urbansociology", name: "도시사회학과", category: "인문·사회", regional: 5, holistic1: 12, holistic2: 0, opportunity: 2, social: 2, essay: 0, practical: 0 },
  { id: "free-humanities", name: "자유전공학부(인문)", category: "인문·사회", regional: 15, holistic1: 0, holistic2: 0, opportunity: 8, social: 2, essay: 0, practical: 0 },
  { id: "electrical", name: "전자전기컴퓨터공학부", category: "공학", regional: 21, holistic1: 25, holistic2: 0, opportunity: 12, social: 2, essay: 18, practical: 0 },
  { id: "chemical", name: "화학공학과", category: "공학", regional: 9, holistic1: 16, holistic2: 0, opportunity: 4, social: 1, essay: 0, practical: 0 },
  { id: "mechanical", name: "기계정보공학과", category: "공학", regional: 5, holistic1: 11, holistic2: 0, opportunity: 3, social: 1, essay: 4, practical: 0 },
  { id: "materials", name: "신소재공학과", category: "공학", regional: 7, holistic1: 12, holistic2: 0, opportunity: 3, social: 1, essay: 10, practical: 0 },
  { id: "civil", name: "토목공학과", category: "공학", regional: 5, holistic1: 9, holistic2: 0, opportunity: 3, social: 1, essay: 5, practical: 0 },
  { id: "mathematics", name: "수학과", category: "자연과학", regional: 5, holistic1: 7, holistic2: 0, opportunity: 3, social: 1, essay: 8, practical: 0 },
  { id: "statistics", name: "통계학과", category: "자연과학", regional: 3, holistic1: 10, holistic2: 0, opportunity: 2, social: 1, essay: 3, practical: 0 },
  { id: "physics", name: "물리학과", category: "자연과학", regional: 3, holistic1: 7, holistic2: 0, opportunity: 2, social: 1, essay: 6, practical: 0 },
  { id: "life", name: "생명과학과", category: "자연과학", regional: 5, holistic1: 10, holistic2: 0, opportunity: 2, social: 2, essay: 4, practical: 0 },
  { id: "environmentalplanning", name: "환경원예학과", category: "자연과학", regional: 5, holistic1: 10, holistic2: 0, opportunity: 2, social: 1, essay: 0, practical: 0 },
  { id: "appliedchemistry", name: "융합응용화학과", category: "자연과학", regional: 3, holistic1: 7, holistic2: 0, opportunity: 1, social: 1, essay: 0, practical: 0 },
  { id: "architecture-engineering", name: "건축학부(건축공학전공)", category: "공학", regional: 5, holistic1: 11, holistic2: 0, opportunity: 3, social: 1, essay: 3, practical: 0 },
  { id: "architecture", name: "건축학부(건축학전공)", category: "공학", regional: 3, holistic1: 20, holistic2: 0, opportunity: 3, social: 1, essay: 0, practical: 0 },
  { id: "urbanengineering", name: "도시공학과", category: "공학", regional: 3, holistic1: 12, holistic2: 0, opportunity: 2, social: 1, essay: 0, practical: 0 },
  { id: "transportation", name: "교통공학과", category: "공학", regional: 4, holistic1: 7, holistic2: 0, opportunity: 1, social: 1, essay: 4, practical: 0 },
  { id: "landscape", name: "조경학과", category: "공학", regional: 3, holistic1: 13, holistic2: 0, opportunity: 2, social: 1, essay: 0, practical: 0 },
  { id: "environment", name: "환경공학부", category: "공학", regional: 10, holistic1: 15, holistic2: 0, opportunity: 6, social: 1, essay: 10, practical: 0 },
  { id: "spatial", name: "공간정보공학과", category: "공학", regional: 5, holistic1: 11, holistic2: 0, opportunity: 2, social: 1, essay: 0, practical: 0 },
  { id: "free-natural", name: "자유전공학부(자연)", category: "자연과학", regional: 15, holistic1: 0, holistic2: 0, opportunity: 8, social: 2, essay: 0, practical: 0 },
  { id: "biohealth", name: "첨단융합학부(융합바이오헬스전공)", category: "첨단융합", regional: 2, holistic1: 2, holistic2: 0, opportunity: 0, social: 0, essay: 0, practical: 0 },
  { id: "advanced-ai", name: "첨단융합학부(첨단인공지능전공)", category: "첨단융합", regional: 2, holistic1: 0, holistic2: 0, opportunity: 0, social: 0, essay: 0, practical: 0 },
  { id: "semiconductor", name: "첨단융합학부(지능형반도체전공)", category: "첨단융합", regional: 6, holistic1: 10, holistic2: 0, opportunity: 0, social: 0, essay: 0, practical: 0 },
  { id: "computer", name: "컴퓨터과학부", category: "컴퓨터·소프트웨어", regional: 8, holistic1: 12, holistic2: 0, opportunity: 4, social: 1, essay: 8, practical: 0 },
  { id: "ai", name: "인공지능학과", category: "컴퓨터·소프트웨어", regional: 10, holistic1: 14, holistic2: 0, opportunity: 1, social: 1, essay: 5, practical: 0 },
  { id: "music", name: "음악학과", category: "예체능", regional: 0, holistic1: 0, holistic2: 0, opportunity: 0, social: 0, essay: 0, practical: 7 },
  { id: "visual-design", name: "디자인학과(시각디자인전공)", category: "예체능", regional: 0, holistic1: 0, holistic2: 0, opportunity: 0, social: 0, essay: 0, practical: 0 },
  { id: "industrial-design", name: "디자인학과(산업디자인전공)", category: "예체능", regional: 0, holistic1: 0, holistic2: 0, opportunity: 0, social: 0, essay: 0, practical: 0 },
  { id: "sculpture", name: "조각학과", category: "예체능", regional: 0, holistic1: 0, holistic2: 0, opportunity: 0, social: 0, essay: 0, practical: 0 },
  { id: "sports", name: "스포츠과학과", category: "예체능", regional: 0, holistic1: 8, holistic2: 0, opportunity: 0, social: 0, essay: 0, practical: 0 },
];

export const uos2027Departments: Department[] = rows.map(({ id, name, category }) => ({ id: `uos-${id}`, universityId: "uos", name, category }));
const aggregate: Department = { id: "uos-2027-overall", universityId: "uos", name: "2027 수시 전체(전형 합계)", category: "전체" };
export const uos2027DepartmentsWithAggregate: Department[] = [...uos2027Departments, aggregate];

const src = "https://file.uos.ac.kr/upload/admission/2027학년도 수시모집 신입생 모집요강.pdf";

const admission = (
  id: string,
  dept: string,
  name: string,
  type: "교과" | "학종" | "논술" | "기타",
  recruitmentCount: number,
  extra: Partial<Admission> = {},
): Admission => ({
  id: `uos-${dept}-${id}-2027`,
  universityId: "uos",
  departmentId: dept,
  academicYear: 2027,
  name,
  type,
  recruitmentCount,
  source: { type: "university", academicYear: 2027, url: src, confidence: 0.99 },
  isMock: false,
  ...extra,
});

export const uos2027Admissions: Admission[] = rows.flatMap((row) => {
  const dept = `uos-${row.id}`;
  const result: Admission[] = [];
  if (row.regional > 0) result.push(admission("regional", dept, "고교추천전형", "교과", row.regional, { studentRecordWeight: 80, csatMinimum: { enabled: true, description: "국어·수학·영어·탐구 중 3개 영역 등급합 8 이내 + 한국사 4등급 이내" } }));
  if (row.holistic1 > 0) result.push(admission("holistic1", dept, "학생부종합전형Ⅰ(면접형)", "학종", row.holistic1, { documentWeight: 50, interview: true, csatMinimum: { enabled: false } }));
  if (row.holistic2 > 0) result.push(admission("holistic2", dept, "학생부종합전형Ⅱ(서류형)", "학종", row.holistic2, { documentWeight: 100, csatMinimum: { enabled: false } }));
  if (row.opportunity > 0) result.push(admission("opportunity", dept, "기회균형전형Ⅰ", "학종", row.opportunity, { documentWeight: 50, interview: true, csatMinimum: { enabled: false } }));
  if (row.social > 0) result.push(admission("social", dept, "사회공헌·통합전형", "학종", row.social, { documentWeight: 50, interview: true, csatMinimum: { enabled: false } }));
  if (row.essay > 0) result.push(admission("essay", dept, "논술전형", "논술", row.essay, { csatMinimum: { enabled: false } }));
  if (row.practical > 0) result.push(admission("practical", dept, "실기전형", "기타", row.practical));
  return result;
});

export const uos2027VerifiedTotals = {
  essay: 88,
  regional: 254,
  holistic1: 410,
  holistic2: 99,
  opportunity: 132,
  social: 46,
  practical: 7,
  total: 1036,
};

export const uos2027AggregateAdmissions: Admission[] = [
  { id: "uos-2027-overall-essay", universityId: "uos", departmentId: aggregate.id, academicYear: 2027, name: "논술전형", type: "논술", recruitmentCount: 88, csatMinimum: { enabled: false }, source: { type: "university", academicYear: 2027, url: src, confidence: 0.99 }, isMock: false, isAggregate: true },
  { id: "uos-2027-overall-regional", universityId: "uos", departmentId: aggregate.id, academicYear: 2027, name: "고교추천전형", type: "교과", recruitmentCount: 254, studentRecordWeight: 80, csatMinimum: { enabled: true, description: "국어·수학·영어·탐구 중 3개 영역 등급합 8 이내 + 한국사 4등급 이내" }, source: { type: "university", academicYear: 2027, url: src, confidence: 0.99 }, isMock: false, isAggregate: true },
  { id: "uos-2027-overall-holistic1", universityId: "uos", departmentId: aggregate.id, academicYear: 2027, name: "학생부종합전형Ⅰ(면접형)", type: "학종", recruitmentCount: 410, documentWeight: 50, interview: true, csatMinimum: { enabled: false }, source: { type: "university", academicYear: 2027, url: src, confidence: 0.99 }, isMock: false, isAggregate: true },
  { id: "uos-2027-overall-holistic2", universityId: "uos", departmentId: aggregate.id, academicYear: 2027, name: "학생부종합전형Ⅱ(서류형)", type: "학종", recruitmentCount: 99, documentWeight: 100, csatMinimum: { enabled: false }, source: { type: "university", academicYear: 2027, url: src, confidence: 0.99 }, isMock: false, isAggregate: true },
  { id: "uos-2027-overall-opportunity", universityId: "uos", departmentId: aggregate.id, academicYear: 2027, name: "기회균형전형Ⅰ", type: "학종", recruitmentCount: 132, documentWeight: 50, interview: true, csatMinimum: { enabled: false }, source: { type: "university", academicYear: 2027, url: src, confidence: 0.99 }, isMock: false, isAggregate: true },
  { id: "uos-2027-overall-social", universityId: "uos", departmentId: aggregate.id, academicYear: 2027, name: "사회공헌·통합전형", type: "학종", recruitmentCount: 46, documentWeight: 50, interview: true, csatMinimum: { enabled: false }, source: { type: "university", academicYear: 2027, url: src, confidence: 0.99 }, isMock: false, isAggregate: true },
  { id: "uos-2027-overall-practical", universityId: "uos", departmentId: aggregate.id, academicYear: 2027, name: "실기전형", type: "기타", recruitmentCount: 7, source: { type: "university", academicYear: 2027, url: src, confidence: 0.99 }, isMock: false, isAggregate: true },
];