import type { Admission, Department, University } from "./types";

export const myeongji2027Universities: University[] = [{ id: "myeongji", name: "명지대학교", region: "서울" }];

const source = {
  type: "university" as const,
  academicYear: 2027,
  url: "https://iphak.mju.ac.kr/pages/?b=B_1_1&bn=30136&cate=%EC%88%98%EC%8B%9C&f=ALL&m=read&nPage=1&p=9",
  document: "2027학년도 신입학 수시 모집요강(명지대학교)_수정(v2)",
  collectedAt: "2026-09-05",
  verifiedAt: "2026-09-05",
  confidence: 0.99,
};

type Row = {
  id: string;
  name: string;
  category: string;
  school: number;
  interview: number;
  opportunity: number;
  specialized: number;
  adult: number;
  worker: number;
  specialEd: number;
  talentInterview: number;
  talentDocument: number;
  christian: number;
  social: number;
  rural: number;
};

// 2027 최종 수시 모집요강의 모집단위별 주요 학생부 전형 모집인원.
const rows: Row[] = [
  { id: "korean", name: "국어국문학전공", category: "인문", school: 4, interview: 5, opportunity: 0, specialized: 0, adult: 0, worker: 0, specialEd: 0, talentInterview: 6, talentDocument: 5, christian: 0, social: 0, rural: 0 },
  { id: "english", name: "영어영문학전공", category: "인문", school: 6, interview: 9, opportunity: 0, specialized: 0, adult: 0, worker: 0, specialEd: 0, talentInterview: 14, talentDocument: 14, christian: 0, social: 0, rural: 0 },
  { id: "history", name: "미술사·역사학전공", category: "인문", school: 5, interview: 5, opportunity: 0, specialized: 0, adult: 0, worker: 0, specialEd: 0, talentInterview: 6, talentDocument: 6, christian: 0, social: 0, rural: 0 },
  { id: "library", name: "문헌정보학전공", category: "인문", school: 3, interview: 5, opportunity: 0, specialized: 0, adult: 0, worker: 0, specialEd: 0, talentInterview: 6, talentDocument: 6, christian: 0, social: 0, rural: 0 },
  { id: "chinese", name: "중어중문학전공", category: "인문", school: 5, interview: 5, opportunity: 0, specialized: 0, adult: 0, worker: 0, specialEd: 0, talentInterview: 6, talentDocument: 6, christian: 0, social: 0, rural: 0 },
  { id: "japanese", name: "일어일문학전공", category: "인문", school: 4, interview: 5, opportunity: 0, specialized: 0, adult: 0, worker: 0, specialEd: 0, talentInterview: 6, talentDocument: 5, christian: 0, social: 0, rural: 0 },
  { id: "arab", name: "아랍지역학전공", category: "인문", school: 4, interview: 5, opportunity: 0, specialized: 0, adult: 0, worker: 0, specialEd: 0, talentInterview: 6, talentDocument: 3, christian: 0, social: 0, rural: 0 },
  { id: "creative-writing", name: "문예창작학과", category: "인문", school: 12, interview: 8, opportunity: 0, specialized: 0, adult: 0, worker: 0, specialEd: 0, talentInterview: 0, talentDocument: 0, christian: 0, social: 0, rural: 0 },
  { id: "public-admin", name: "행정학전공", category: "사회과학", school: 6, interview: 9, opportunity: 0, specialized: 0, adult: 0, worker: 0, specialEd: 0, talentInterview: 14, talentDocument: 14, christian: 0, social: 0, rural: 0 },
  { id: "politics", name: "정치외교학전공", category: "사회과학", school: 6, interview: 9, opportunity: 0, specialized: 0, adult: 0, worker: 0, specialEd: 0, talentInterview: 14, talentDocument: 14, christian: 0, social: 0, rural: 0 },
  { id: "economics", name: "경제학전공", category: "사회과학", school: 6, interview: 5, opportunity: 0, specialized: 0, adult: 0, worker: 0, specialEd: 0, talentInterview: 14, talentDocument: 11, christian: 0, social: 0, rural: 0 },
  { id: "international-trade", name: "국제통상학전공", category: "사회과학", school: 4, interview: 5, opportunity: 0, specialized: 0, adult: 0, worker: 0, specialEd: 0, talentInterview: 6, talentDocument: 4, christian: 0, social: 0, rural: 0 },
  { id: "applied-statistics", name: "응용통계학전공", category: "사회과학", school: 3, interview: 5, opportunity: 0, specialized: 0, adult: 0, worker: 0, specialEd: 0, talentInterview: 6, talentDocument: 3, christian: 0, social: 0, rural: 0 },
  { id: "law", name: "법학과", category: "사회과학", school: 6, interview: 9, opportunity: 0, specialized: 0, adult: 0, worker: 0, specialEd: 0, talentInterview: 14, talentDocument: 10, christian: 0, social: 0, rural: 0 },
  { id: "business", name: "경영학전공", category: "경상", school: 18, interview: 18, opportunity: 0, specialized: 2, adult: 0, worker: 0, specialEd: 0, talentInterview: 28, talentDocument: 32, christian: 6, social: 0, rural: 0 },
  { id: "ai-business", name: "AI경영정보학과", category: "경상", school: 5, interview: 5, opportunity: 0, specialized: 2, adult: 0, worker: 0, specialEd: 0, talentInterview: 6, talentDocument: 6, christian: 3, social: 0, rural: 0 },
  { id: "digital-media", name: "디지털미디어학부", category: "미디어·휴먼라이프", school: 5, interview: 5, opportunity: 0, specialized: 2, adult: 0, worker: 0, specialEd: 0, talentInterview: 6, talentDocument: 6, christian: 3, social: 0, rural: 0 },
  { id: "youth", name: "청소년지도학전공", category: "미디어·휴먼라이프", school: 3, interview: 5, opportunity: 0, specialized: 7, adult: 0, worker: 0, specialEd: 0, talentInterview: 6, talentDocument: 23, christian: 0, social: 4, rural: 3 },
  { id: "ai-computer", name: "AI컴퓨터공학전공", category: "ICT", school: 10, interview: 9, opportunity: 0, specialized: 3, adult: 0, worker: 0, specialEd: 2, talentInterview: 14, talentDocument: 18, christian: 2, social: 0, rural: 0 },
  { id: "ai-system", name: "AI응용시스템전공", category: "ICT", school: 9, interview: 9, opportunity: 0, specialized: 3, adult: 0, worker: 0, specialEd: 2, talentInterview: 14, talentDocument: 16, christian: 2, social: 0, rural: 0 },
  { id: "industrial-engineering", name: "산업경영공학과", category: "ICT", school: 6, interview: 5, opportunity: 0, specialized: 2, adult: 0, worker: 0, specialEd: 2, talentInterview: 14, talentDocument: 7, christian: 2, social: 0, rural: 0 },
  { id: "semiconductor", name: "반도체공학부", category: "공학", school: 6, interview: 5, opportunity: 0, specialized: 0, adult: 0, worker: 0, specialEd: 0, talentInterview: 6, talentDocument: 5, christian: 0, social: 0, rural: 2 },
  { id: "electrical", name: "전기정보공학전공", category: "공학", school: 6, interview: 8, opportunity: 0, specialized: 2, adult: 0, worker: 0, specialEd: 1, talentInterview: 8, talentDocument: 10, christian: 1, social: 0, rural: 1 },
  { id: "electronics", name: "전자공학전공", category: "공학", school: 7, interview: 10, opportunity: 0, specialized: 2, adult: 0, worker: 0, specialEd: 1, talentInterview: 13, talentDocument: 15, christian: 1, social: 0, rural: 1 },
  { id: "mechanical", name: "기계공학전공", category: "공학", school: 8, interview: 9, opportunity: 0, specialized: 2, adult: 0, worker: 0, specialEd: 0, talentInterview: 14, talentDocument: 9, christian: 2, social: 0, rural: 0 },
  { id: "robotics", name: "로봇공학전공", category: "공학", school: 8, interview: 9, opportunity: 0, specialized: 2, adult: 0, worker: 0, specialEd: 0, talentInterview: 14, talentDocument: 9, christian: 2, social: 0, rural: 0 },
  { id: "chemical", name: "화학공학전공", category: "공학", school: 6, interview: 5, opportunity: 0, specialized: 0, adult: 0, worker: 0, specialEd: 0, talentInterview: 6, talentDocument: 8, christian: 2, social: 0, rural: 0 },
  { id: "materials", name: "신소재공학전공", category: "공학", school: 6, interview: 5, opportunity: 0, specialized: 0, adult: 0, worker: 0, specialEd: 0, talentInterview: 6, talentDocument: 7, christian: 2, social: 0, rural: 0 },
  { id: "architecture", name: "건축학전공", category: "건축", school: 4, interview: 5, opportunity: 0, specialized: 1, adult: 0, worker: 0, specialEd: 0, talentInterview: 6, talentDocument: 11, christian: 2, social: 0, rural: 0 },
  { id: "traditional-architecture", name: "전통건축학전공", category: "건축", school: 2, interview: 5, opportunity: 0, specialized: 1, adult: 0, worker: 0, specialEd: 0, talentInterview: 6, talentDocument: 2, christian: 2, social: 0, rural: 0 },
  { id: "spatial-design", name: "공간디자인학과", category: "건축·디자인", school: 2, interview: 5, opportunity: 0, specialized: 0, adult: 0, worker: 0, specialEd: 0, talentInterview: 6, talentDocument: 2, christian: 2, social: 0, rural: 0 },
  { id: "free-natural", name: "자율전공학부(자연)", category: "아너칼리지", school: 22, interview: 10, opportunity: 0, specialized: 0, adult: 0, worker: 0, specialEd: 0, talentInterview: 5, talentDocument: 19, christian: 0, social: 0, rural: 0 },
  { id: "free-humanities", name: "자율전공학부(인문)", category: "아너칼리지", school: 65, interview: 10, opportunity: 0, specialized: 0, adult: 0, worker: 0, specialEd: 0, talentInterview: 5, talentDocument: 52, christian: 0, social: 0, rural: 0 },
  { id: "real-estate", name: "부동산학전공", category: "미래전략학부", school: 0, interview: 0, opportunity: 0, specialized: 0, adult: 6, worker: 19, specialEd: 0, talentInterview: 0, talentDocument: 0, christian: 0, social: 0, rural: 0 },
  { id: "law-admin", name: "법무행정학전공", category: "미래전략학부", school: 0, interview: 0, opportunity: 0, specialized: 0, adult: 2, worker: 15, specialEd: 0, talentInterview: 0, talentDocument: 0, christian: 0, social: 0, rural: 0 },
  { id: "convergence-business", name: "융합경영학전공", category: "미래전략학부", school: 0, interview: 0, opportunity: 0, specialized: 0, adult: 2, worker: 32, specialEd: 0, talentInterview: 0, talentDocument: 0, christian: 0, social: 0, rural: 0 },
  { id: "accounting", name: "회계세무학전공", category: "미래전략학부", school: 0, interview: 0, opportunity: 0, specialized: 0, adult: 1, worker: 22, specialEd: 0, talentInterview: 0, talentDocument: 0, christian: 0, social: 0, rural: 0 },
  { id: "social-welfare", name: "사회복지학전공", category: "융합인재학부", school: 0, interview: 0, opportunity: 0, specialized: 0, adult: 8, worker: 18, specialEd: 0, talentInterview: 0, talentDocument: 0, christian: 0, social: 0, rural: 0 },
  { id: "psychotherapy", name: "심리치료학전공", category: "융합인재학부", school: 0, interview: 0, opportunity: 0, specialized: 0, adult: 5, worker: 18, specialEd: 0, talentInterview: 0, talentDocument: 0, christian: 0, social: 0, rural: 0 },
  { id: "multidesign", name: "멀티디자인전공", category: "융합인재학부", school: 0, interview: 0, opportunity: 0, specialized: 0, adult: 1, worker: 23, specialEd: 0, talentInterview: 0, talentDocument: 0, christian: 0, social: 0, rural: 0 },
];

export const myeongji2027Departments: Department[] = [
  { id: "myeongji-susi-overall", universityId: "myeongji", name: "2027 수시 전체(모집단위 합계)", category: "전체" },
  ...rows.map(({ id, name, category }) => ({ id: `myeongji-${id}`, universityId: "myeongji", name, category })),
];

const makeAdmission = (departmentId: string, name: string, type: "교과" | "학종" | "기타", recruitmentCount: number, studentRecordWeight?: number, documentWeight?: number, interview = false): Admission => ({
  id: `${departmentId}-${name}-2027`,
  universityId: "myeongji",
  departmentId,
  academicYear: 2027,
  name,
  type,
  recruitmentCount,
  studentRecordWeight,
  documentWeight,
  interview,
  csatMinimum: { enabled: false, description: "2027학년도 명지대학교 수시 전 전형 수능최저학력기준 미적용" },
  source,
  isMock: false,
});

export const myeongji2027Admissions: Admission[] = rows.flatMap((row) => {
  const departmentId = `myeongji-${row.id}`;
  const admissions: Admission[] = [];
  if (row.school) admissions.push(makeAdmission(departmentId, "학교장추천전형", "교과", row.school, 100));
  if (row.interview) admissions.push(makeAdmission(departmentId, "교과면접전형", "교과", row.interview, 70, undefined, true));
  if (row.opportunity) admissions.push(makeAdmission(departmentId, "기회균형전형", "교과", row.opportunity, 100));
  if (row.specialized) admissions.push(makeAdmission(departmentId, "특성화고교전형", "교과", row.specialized, 100));
  if (row.adult) admissions.push(makeAdmission(departmentId, "만학도전형", "교과", row.adult, 100));
  if (row.worker) admissions.push(makeAdmission(departmentId, "특성화고등졸재직자전형", "교과", row.worker, 100));
  if (row.specialEd) admissions.push(makeAdmission(departmentId, "특수교육대상자전형", "교과", row.specialEd, 70, undefined, true));
  if (row.talentInterview) admissions.push(makeAdmission(departmentId, "명지인재면접전형", "학종", row.talentInterview, undefined, 100, true));
  if (row.talentDocument) admissions.push(makeAdmission(departmentId, "명지인재서류전형", "학종", row.talentDocument, undefined, 100));
  if (row.christian) admissions.push(makeAdmission(departmentId, "크리스천리더전형", "학종", row.christian, undefined, 70, true));
  if (row.social) admissions.push(makeAdmission(departmentId, "사회적배려대상자전형", "학종", row.social, undefined, 100));
  if (row.rural) admissions.push(makeAdmission(departmentId, "농어촌학생전형", "학종", row.rural, undefined, 100));
  return admissions;
});
