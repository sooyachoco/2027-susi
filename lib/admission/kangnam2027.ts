import type { Admission, Department, University } from "./types";

const source = {
  type: "university" as const,
  url: "https://admission.kangnam.ac.kr/ipsi/yogang.htm?ctg_cd=susi1",
  document: "강남대학교 2027학년도 수시 신입생 모집요강",
  academicYear: 2027,
  confidence: 0.99,
};

export const kangnam2027Universities: University[] = [
  { id: "kangnam", name: "강남대학교", region: "경기" },
];

const catalog: Array<[string, string, string]> = [
  ["free", "자유전공학부", "자유전공"],
  ["welfare", "복지융합대학", "인문·사회"],
  ["business", "상경학부", "경영·경제"],
  ["law-admin-tax", "법행정세무학부", "법·행정"],
  ["global-culture", "글로벌문화콘텐츠대학", "문화·콘텐츠"],
  ["computer", "컴퓨터공학부", "컴퓨터·소프트웨어"],
  ["ai-engineering", "인공지능융합공학부", "컴퓨터·AI"],
  ["semiconductor", "전자반도체공학부", "전기·전자"],
  ["real-estate-construction", "부동산건설학부", "공학"],
  ["design", "디자인학과", "예체능"],
  ["sports", "체육학과", "예체능"],
  ["music-piano", "음악학과(피아노)", "예체능"],
  ["music-vocal", "음악학과(성악)", "예체능"],
  ["music-orchestral", "음악학과(관현악)", "예체능"],
  ["education", "교육학과(사)", "사범"],
  ["early-childhood", "유아교육과(사)", "사범"],
  ["elementary-special", "초등특수교육과(사)", "사범"],
  ["secondary-special", "중등특수교육과(사)", "사범"],
  ["social-welfare-night", "사회복지학부(야)", "인문·사회"],
  ["business-night", "상경학부(야)", "경영·경제"],
  ["law-admin-tax-night", "법행정세무학부(야)", "법·행정"],
];

export const kangnam2027Departments: Department[] = catalog.map(([id, name, category]) => ({
  id: `kangnam-${id}`,
  universityId: "kangnam",
  name,
  category,
}));

const admission = (
  dept: string,
  key: string,
  name: string,
  type: Admission["type"],
  recruitmentCount: number,
  extra: Partial<Admission> = {},
): Admission => ({
  id: `kangnam-${dept}-${key}-2027`,
  universityId: "kangnam",
  departmentId: `kangnam-${dept}`,
  academicYear: 2027,
  name,
  type,
  recruitmentCount,
  source,
  isMock: false,
  ...extra,
});

// 2027 최종 수시 모집인원. 총 정원내 959명(논술 309, 지역균형 185,
// 농어촌 40, 국가보훈 19, 만학도 26, 학교생활우수자1 239,
// 학교생활우수자2 55, 실기 86)과 정원외 94명으로 확인.
const rows: Array<[string, number, number, number, number, number, number, number, number]> = [
  ["free", 29, 14, 5, 2, 0, 24, 0, 0],
  ["welfare", 28, 14, 5, 2, 0, 21, 0, 0],
  ["business", 32, 19, 5, 2, 0, 24, 0, 0],
  ["law-admin-tax", 25, 10, 3, 3, 0, 14, 0, 0],
  ["global-culture", 30, 22, 5, 2, 0, 37, 0, 0],
  ["computer", 15, 13, 3, 2, 0, 19, 0, 0],
  ["ai-engineering", 19, 16, 4, 2, 0, 16, 0, 0],
  ["semiconductor", 21, 16, 2, 2, 0, 16, 0, 0],
  ["real-estate-construction", 24, 13, 4, 2, 0, 19, 0, 0],
  ["design", 0, 0, 0, 0, 0, 0, 3, 42],
  ["sports", 0, 0, 0, 0, 0, 0, 0, 25],
  ["music-piano", 0, 0, 0, 0, 0, 0, 0, 10],
  ["music-vocal", 0, 0, 0, 0, 0, 0, 0, 3],
  ["music-orchestral", 0, 0, 0, 0, 0, 0, 0, 6],
  ["education", 7, 0, 2, 0, 0, 0, 16, 0],
  ["early-childhood", 11, 0, 2, 0, 0, 0, 20, 0],
  ["elementary-special", 4, 0, 0, 0, 0, 0, 8, 0],
  ["secondary-special", 4, 0, 0, 0, 0, 0, 8, 0],
  ["social-welfare-night", 11, 10, 0, 0, 6, 11, 0, 0],
  ["business-night", 27, 23, 0, 0, 8, 19, 0, 0],
  ["law-admin-tax-night", 22, 15, 0, 0, 12, 19, 0, 0],
];

export const kangnam2027Admissions: Admission[] = rows.flatMap(([dept, essay, balance, rural, veterans, adult, school1, school2, practical]) => {
  const result: Admission[] = [];
  if (essay) result.push(admission(dept, "essay", "논술전형", "논술", essay, { studentRecordWeight: 20, csatMinimum: { enabled: false } }));
  if (balance) result.push(admission(dept, "regional", "지역균형전형", "교과", balance, { studentRecordWeight: 100, csatMinimum: { enabled: false } }));
  if (rural) result.push(admission(dept, "rural", "농어촌학생전형", "교과", rural, { studentRecordWeight: 100, csatMinimum: { enabled: false } }));
  if (veterans) result.push(admission(dept, "veterans", "국가보훈대상자전형", "교과", veterans, { studentRecordWeight: 100, csatMinimum: { enabled: false } }));
  if (adult) result.push(admission(dept, "adult", "만학도전형", "교과", adult, { studentRecordWeight: 100, csatMinimum: { enabled: false } }));
  if (school1) result.push(admission(dept, "school1", "학교생활우수자전형1", "학종", school1, { documentWeight: 100, csatMinimum: { enabled: false } }));
  if (school2) result.push(admission(dept, "school2", "학교생활우수자전형2", "학종", school2, { documentWeight: 70, interview: true, csatMinimum: { enabled: false } }));
  if (practical) result.push(admission(dept, "practical", "실기전형", "기타", practical, { csatMinimum: { enabled: false } }));
  return result;
});

export const kangnam2027VerifiedTotals = {
  essay: 309,
  regional: 185,
  rural: 40,
  veterans: 19,
  adult: 26,
  school1: 239,
  school2: 55,
  practical: 86,
  inQuota: 959,
  outOfQuota: 94,
};
