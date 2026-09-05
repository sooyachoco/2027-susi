import type { Admission, Department, University } from "./types";

const source = {
  type: "university" as const,
  url: "https://admission.uos.ac.kr/admissionNew/main.do",
  document: "2027학년도 서울시립대학교 수시모집 신입생 모집요강",
  academicYear: 2027,
  verifiedAt: "2026-09-05",
  confidence: 0.99,
};

export const verifiedUos2027Universities: University[] = [
  { id: "uos", name: "서울시립대학교", region: "서울" },
];

type Row = [string, string, string, number, number, number, number, number, number, number];
// [id, name, category, 논술, 고교추천, 종합Ⅰ, 종합Ⅱ, 기회균형Ⅰ, 사회공헌·통합, 실기]
const rows: Row[] = [
  ["admin", "행정학과", "사회과학", 0,14,21,0,5,2,0], ["ir", "국제관계학과", "사회과학", 0,6,17,0,3,2,0],
  ["econ", "경제학부", "상경", 0,9,10,19,8,2,0], ["welfare", "사회복지학과", "사회과학", 0,5,12,0,3,2,0],
  ["tax", "세무학과", "상경", 0,9,7,0,6,1,0], ["business", "경영학부", "상경", 0,23,0,80,20,2,0],
  ["english", "영어영문학과", "인문", 0,4,18,0,2,1,0], ["korean", "국어국문학과", "인문", 0,3,11,0,1,1,0],
  ["history", "국사학과", "인문", 0,3,11,0,1,1,0], ["philosophy", "철학과", "인문", 0,3,10,0,1,1,0],
  ["chinese", "중국어문화학과", "인문", 0,3,10,0,1,1,0], ["urban-admin", "도시행정학과", "사회과학", 0,5,12,0,2,2,0],
  ["urban-soc", "도시사회학과", "사회과학", 0,5,12,0,2,2,0], ["free-human", "자유전공학부(인문)", "자유전공", 0,15,0,0,8,2,0],
  ["eece", "전자전기컴퓨터공학부", "공학", 18,21,25,0,12,2,0], ["chemical", "화학공학과", "공학", 0,9,16,0,4,1,0],
  ["mech-info", "기계정보공학과", "공학", 4,5,11,0,3,1,0], ["materials", "신소재공학과", "공학", 10,7,12,0,3,1,0],
  ["civil", "토목공학과", "공학", 5,5,9,0,3,1,0], ["math", "수학과", "자연과학", 8,5,7,0,3,1,0],
  ["statistics", "통계학과", "자연과학", 3,3,10,0,2,1,0], ["physics", "물리학과", "자연과학", 6,3,7,0,2,1,0],
  ["life", "생명과학과", "자연과학", 4,5,10,0,2,2,0], ["hort", "환경원예학과", "생명·환경", 0,5,10,0,2,1,0],
  ["applied-chem", "융합응용화학과", "자연과학", 0,3,7,0,1,1,0], ["arch-eng", "건축학부(건축공학전공)", "건축·공학", 3,5,11,0,3,1,0],
  ["arch", "건축학부(건축학전공)", "건축·공학", 0,3,20,0,3,1,0], ["urban-eng", "도시공학과", "공학", 0,3,12,0,2,1,0],
  ["transport", "교통공학과", "공학", 4,4,7,0,1,1,0], ["landscape", "조경학과", "생명·환경", 0,3,13,0,2,1,0],
  ["env-eng", "환경공학부", "공학", 10,10,15,0,6,1,0], ["geo", "공간정보공학과", "공학", 0,5,11,0,2,1,0],
  ["free-natural", "자유전공학부(자연)", "자유전공", 0,15,0,0,8,2,0], ["biohealth", "첨단융합학부(융합바이오헬스전공)", "융합", 0,2,2,0,0,0,0],
  ["ai", "첨단융합학부(첨단인공지능전공)", "융합·AI", 0,2,0,0,0,0,0], ["semiconductor", "첨단융합학부(지능형반도체전공)", "융합·반도체", 0,6,10,0,0,0,0],
  ["cs", "컴퓨터과학부", "컴퓨터·소프트웨어", 8,8,12,0,4,1,0], ["ai-dept", "인공지능학과", "컴퓨터·AI", 5,10,14,0,1,1,0],
  ["music", "음악학과", "예체능", 0,0,0,0,0,0,7], ["sports", "스포츠과학과", "체육", 0,0,8,0,0,0,0],
];

export const verifiedUos2027Departments: Department[] = rows.map(([id, name, category]) => ({
  id: `uos-${id}`, universityId: "uos", name, category,
}));

const admissions: Admission[] = [];
const add = (id: string, name: string, type: Admission["type"], count: number, opts: Partial<Admission> = {}) => {
  if (!count) return;
  admissions.push({
    id, universityId: "uos", academicYear: 2027, type, recruitmentCount: count,
    source, isMock: false, ...opts,
  } as Admission);
};

for (const [id, _name, _category, essay, school, interview, document, opportunity, social, practical] of rows) {
  const departmentId = `uos-${id}`;
  add(`${departmentId}-essay-2027`, "논술전형", "논술", essay, { departmentId, csatMinimum: { enabled: false } });
  add(`${departmentId}-recommend-2027`, "고교추천전형", "교과", school, { departmentId, studentRecordWeight: 80, csatMinimum: { enabled: true, description: "국어·수학·영어·탐구(상위 1과목) 중 3개 영역 등급합 8 이내 및 한국사 4등급 이내" } });
  add(`${departmentId}-holistic-interview-2027`, "학생부종합전형Ⅰ(면접형)", "학종", interview, { departmentId, documentWeight: 50, interview: true, csatMinimum: { enabled: false } });
  add(`${departmentId}-holistic-document-2027`, "학생부종합전형Ⅱ(서류형)", "학종", document, { departmentId, documentWeight: 100, interview: false, csatMinimum: { enabled: false } });
  add(`${departmentId}-opportunity-2027`, "기회균형전형Ⅰ", "학종", opportunity, { departmentId, documentWeight: 50, interview: true, csatMinimum: { enabled: false } });
  add(`${departmentId}-social-2027`, "사회공헌·통합전형", "학종", social, { departmentId, documentWeight: 50, interview: true, csatMinimum: { enabled: false } });
  add(`${departmentId}-practical-2027`, "실기전형", "논술", practical, { departmentId, csatMinimum: { enabled: false } });
}

export const verifiedUos2027Admissions: Admission[] = admissions;

// 2027 최종 정원내 수시: 논술 88 + 고교추천 254 + 종합Ⅰ 410 + 종합Ⅱ 99 + 기회균형Ⅰ 132 + 사회공헌·통합 46 + 실기 7 = 1,036명.
