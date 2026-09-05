import type { Admission, Department, University } from "./types";

export const sungshin2027Universities: University[] = [{ id: "sungshin", name: "성신여자대학교", region: "서울" }];

const source = {
  type: "university" as const,
  academicYear: 2027,
  url: "https://ipsi.sungshin.ac.kr/guide/dataroom.htm?bbsid=dataroom&bltn_seq=36049&ctg_cd=susi&mode=view",
  confidence: 0.99,
};

type Row = [id: string, name: string, category: string, self: number, opportunity: number, region: number, essay: number, practical: number];

const rows: Row[] = [
  ["korean", "국어국문학과", "인문", 7, 3, 4, 4, 0],
  ["english", "영어영문학과", "인문", 12, 4, 5, 4, 0],
  ["german", "독일어문·문화학과", "인문", 6, 2, 4, 3, 0],
  ["french", "프랑스어문·문화학과", "인문", 5, 2, 4, 3, 0],
  ["japanese", "일본어문·문화학과", "인문", 12, 3, 4, 5, 0],
  ["chinese", "중국어문·문화학과", "인문", 12, 3, 5, 5, 0],
  ["history", "사학과", "인문", 6, 2, 4, 3, 0],
  ["culture-management", "문화예술경영학과", "인문", 5, 2, 4, 3, 0],
  ["politics", "정치외교학과", "인문", 7, 3, 4, 3, 0],
  ["psychology", "심리학과", "인문", 8, 3, 4, 5, 0],
  ["geography", "지리학과", "인문", 7, 2, 4, 4, 0],
  ["economics", "경제학과", "인문", 14, 4, 5, 4, 0],
  ["media", "미디어커뮤니케이션학과", "인문", 12, 3, 5, 4, 0],
  ["business", "경영학과", "인문", 27, 6, 6, 6, 0],
  ["social-welfare", "사회복지학과", "인문", 9, 3, 4, 5, 0],
  ["law", "법학부", "인문", 30, 5, 7, 8, 0],
  ["math-fintech", "수리통계데이터사이언스학부(수학/핀테크전공)", "자연·첨단", 21, 3, 4, 5, 0],
  ["statistics-bigdata", "수리통계데이터사이언스학부(통계학/빅데이터사이언스전공)", "자연·첨단", 20, 4, 4, 6, 0],
  ["chem-energy", "화학·에너지융합학부", "자연·첨단", 22, 4, 4, 6, 0],
  ["biohealth", "바이오헬스융합학부", "자연·첨단", 24, 2, 4, 4, 0],
  ["clean-material", "청정신소재공학과", "공학", 17, 4, 7, 5, 0],
  ["biofood", "바이오식품공학과", "공학", 12, 2, 4, 4, 0],
  ["biodrug", "바이오신약의과학부", "공학·첨단", 27, 7, 10, 8, 0],
  ["ai", "AI융합학과", "공학·AI", 27, 4, 8, 6, 0],
  ["ai-semiconductor", "융합AI반도체공학과", "공학·AI", 17, 4, 7, 5, 0],
  ["computer", "컴퓨터공학과", "공학·AI", 17, 4, 7, 5, 0],
  ["security", "융합보안공학과", "공학·AI", 21, 6, 4, 10, 0],
  ["service-design", "서비스디자인공학과", "공학·AI", 20, 4, 4, 5, 0],
  ["nursing", "간호학과", "보건", 30, 6, 16, 0, 0],
  ["nursing-humanities", "간호학과(인문)", "보건", 0, 0, 0, 5, 0],
  ["nursing-natural", "간호학과(자연)", "보건", 0, 0, 0, 6, 0],
  ["clothing", "의류산업학과", "인문", 12, 3, 4, 5, 0],
  ["consumer", "소비자산업학과", "인문", 9, 3, 4, 5, 0],
  ["beauty", "뷰티산업학과", "예체능", 5, 2, 0, 0, 13],
  ["education", "교육학과", "사범", 10, 0, 4, 0, 0],
  ["social-education", "사회교육과", "사범", 10, 0, 4, 0, 0],
  ["ethics-education", "윤리교육과", "사범", 10, 0, 4, 0, 0],
  ["hanmun-education", "한문교육과", "사범", 10, 0, 4, 0, 0],
  ["early-childhood", "유아교육과", "사범", 13, 0, 5, 0, 0],
  ["media-acting", "미디어영상연기학과", "예체능", 0, 0, 0, 0, 13],
  ["practical-music", "현대실용음악학과", "예체능", 0, 0, 0, 0, 11],
  ["dance", "무용예술학과", "예체능", 0, 0, 0, 0, 18],
  ["oriental-painting", "동양화과", "미술", 0, 0, 0, 0, 21],
  ["western-painting", "서양화과", "미술", 0, 0, 0, 0, 22],
  ["sculpture", "조소과", "미술", 0, 0, 0, 0, 24],
  ["craft", "공예과", "미술", 0, 0, 0, 0, 31],
  ["design", "디자인과", "미술", 0, 0, 0, 0, 16],
  ["vocal", "성악과", "음악", 0, 0, 0, 0, 13],
  ["instrumental", "기악과", "음악", 0, 0, 0, 0, 31],
  ["composition", "작곡과", "음악", 0, 0, 0, 0, 13],
  ["free-major", "창의융합학부(자유전공)", "자유전공", 0, 0, 0, 54, 0],
  ["advanced-major", "창의융합학부(첨단분야전공)", "자유전공", 0, 0, 0, 0, 0],
];

export const sungshin2027Departments: Department[] = [
  { id: "sungshin-susi-overall", universityId: "sungshin", name: "2027 수시 전체(모집단위 합계)", category: "전체" },
  ...rows.map(([id, name, category]) => ({ id: `sungshin-${id}`, universityId: "sungshin", name, category })),
];

const makeAdmission = (departmentId: string, name: string, type: string, recruitmentCount: number, studentRecordWeight?: number, documentWeight?: number, interview = false): Admission => ({
  id: `${departmentId}-${name}-2027`,
  universityId: "sungshin",
  departmentId,
  academicYear: 2027,
  name,
  type,
  recruitmentCount,
  studentRecordWeight,
  documentWeight,
  interview,
  csatMinimum: { enabled: type === "교과" || type === "논술" },
  source,
  isMock: false,
});

export const sungshin2027Admissions: Admission[] = rows.flatMap(([id, , , self, opportunity, region, essay, practical]) => {
  const departmentId = `sungshin-${id}`;
  const admissions: Admission[] = [];
  if (self) admissions.push(makeAdmission(departmentId, "자기주도인재전형", "학종", self, undefined, 60, true));
  if (opportunity) admissions.push(makeAdmission(departmentId, "기회균형Ⅰ전형", "학종", opportunity, undefined, 100));
  if (region) admissions.push(makeAdmission(departmentId, "지역균형전형", "교과", region, 90));
  if (essay) admissions.push(makeAdmission(departmentId, "논술우수자전형", "논술", essay));
  if (practical) admissions.push(makeAdmission(departmentId, "일반학생전형", "기타", practical));
  return admissions;
});
