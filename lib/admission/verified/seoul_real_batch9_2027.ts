import type { Admission, Department, University } from "../types";

// 2027학년도 서울시립대학교 공식 수시모집요강 기준.
// 모집단위/모집인원: 요강 p.2~3, 전형방법: p.11~16.
export const seoulRealBatch9Universities: University[] = [
  { id: "uos-real", name: "서울시립대학교", region: "서울" },
];

const rows = [
  ["행정학과", 14, 21, 0, 5, 2],
  ["국제관계학과", 6, 17, 0, 3, 2],
  ["경제학부", 9, 10, 19, 8, 2],
  ["사회복지학과", 5, 12, 0, 3, 2],
  ["세무학과", 9, 7, 0, 6, 1],
  ["경영학부", 23, 0, 80, 20, 2],
  ["영어영문학과", 4, 18, 0, 2, 1],
  ["국어국문학과", 3, 11, 0, 1, 1],
  ["국사학과", 3, 11, 0, 1, 1],
  ["철학과", 3, 10, 0, 1, 1],
  ["중국어문화학과", 3, 10, 0, 1, 1],
  ["도시행정학과", 5, 12, 0, 2, 2],
  ["도시사회학과", 5, 12, 0, 2, 2],
  ["자유전공학부(인문)", 15, 0, 0, 8, 2],
  ["전자전기컴퓨터공학부", 21, 25, 0, 12, 2],
  ["화학공학과", 9, 16, 0, 4, 1],
  ["기계정보공학과", 5, 11, 0, 3, 1],
  ["신소재공학과", 7, 12, 0, 3, 1],
  ["토목공학과", 5, 9, 0, 3, 1],
  ["수학과", 5, 7, 0, 3, 1],
  ["통계학과", 3, 10, 0, 2, 1],
  ["물리학과", 3, 7, 0, 2, 1],
  ["생명과학과", 5, 10, 0, 2, 2],
  ["환경원예학과", 5, 10, 0, 2, 1],
  ["융합응용화학과", 3, 7, 0, 1, 1],
  ["건축학부(건축공학전공)", 5, 11, 0, 3, 1],
  ["건축학부(건축학전공)", 3, 20, 0, 3, 1],
  ["도시공학과", 3, 12, 0, 2, 1],
  ["교통공학과", 4, 7, 0, 1, 1],
  ["조경학과", 3, 13, 0, 2, 1],
  ["환경공학부", 10, 15, 0, 6, 1],
  ["공간정보공학과", 5, 11, 0, 2, 1],
  ["자유전공학부(자연)", 15, 0, 0, 8, 2],
  ["융합바이오헬스전공", 2, 2, 0, 0, 0],
  ["첨단인공지능전공", 2, 0, 0, 0, 0],
  ["지능형반도체전공", 6, 10, 0, 0, 0],
  ["컴퓨터과학부", 8, 12, 0, 4, 1],
  ["인공지능학과", 10, 14, 0, 1, 1],
  ["스포츠과학과", 0, 8, 0, 0, 0],
] as const;

export const seoulRealBatch9Departments: Department[] = rows.map(([name]) => ({
  id: `uos-real-${String(name).replace(/[()\s]/g, "-")}`,
  universityId: "uos-real",
  name,
}));

const source = {
  type: "university" as const,
  academicYear: 2027,
  document: "2027학년도 수시모집 신입생 모집요강",
  page: 2,
  confidence: 1,
};

const departmentId = (name: string) => `uos-real-${name.replace(/[()\s]/g, "-")}`;

export const seoulRealBatch9Admissions: Admission[] = rows.flatMap(([name, essay, student, interview, opportunity, social]) => {
  const id = departmentId(name);
  const result: Admission[] = [];
  if (essay) result.push({ id: `${id}-essay`, universityId: "uos-real", departmentId: id, academicYear: 2027, name: "논술전형", type: "논술", recruitmentCount: essay, studentRecordWeight: 20, source: { ...source, page: 11 }, isMock: false });
  if (student) result.push({ id: `${id}-recommend`, universityId: "uos-real", departmentId: id, academicYear: 2027, name: "고교추천전형", type: "교과", recruitmentCount: student, studentRecordWeight: 80, csatMinimum: { enabled: true, description: "국어·수학·영어·탐구 중 3개 영역 등급합 8 이내 및 한국사 4등급 이내" }, source: { ...source, page: 13 }, isMock: false });
  if (interview) result.push({ id: `${id}-comprehensive1`, universityId: "uos-real", departmentId: id, academicYear: 2027, name: "학생부종합전형Ⅰ(면접형)", type: "학종", recruitmentCount: interview, documentWeight: 50, interview: true, csatMinimum: { enabled: false }, source: { ...source, page: 15 }, isMock: false });
  if (opportunity) result.push({ id: `${id}-comprehensive2`, universityId: "uos-real", departmentId: id, academicYear: 2027, name: "학생부종합전형Ⅱ(서류형)", type: "학종", recruitmentCount: opportunity, documentWeight: 100, interview: false, csatMinimum: { enabled: false }, source: { ...source, page: 17 }, isMock: false });
  if (social) result.push({ id: `${id}-social`, universityId: "uos-real", departmentId: id, academicYear: 2027, name: "사회공헌·통합전형", type: "학종", recruitmentCount: social, documentWeight: 50, interview: true, csatMinimum: { enabled: false }, source: { ...source, page: 25 }, isMock: false });
  return result;
});
