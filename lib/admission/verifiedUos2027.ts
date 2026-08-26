import type { Admission, Department, University } from "./types";

const source = {
  type: "university" as const,
  url: "https://www.uos.ac.kr/admissionNew/main.do",
  document: "2027학년도 서울시립대학교 입학전형 기본계획 및 전공안내",
  academicYear: 2027,
  verifiedAt: "2026-08-26",
  confidence: 0.98,
};

export const verifiedUos2027Universities: University[] = [
  { id: "uos", name: "서울시립대학교", region: "서울" },
];

const rows = [
  ["행정학과", "uos-admin", 14, 21], ["국제관계학과", "uos-ir", 6, 17],
  ["경제학부", "uos-econ", 9, 10], ["사회복지학과", "uos-welfare", 5, 12],
  ["세무학과", "uos-tax", 9, 7], ["영어영문학과", "uos-english", 4, 18],
  ["국어국문학과", "uos-korean", 3, 11], ["국사학과", "uos-history", 3, 11],
  ["철학과", "uos-philosophy", 3, 10], ["중국어문화학과", "uos-chinese", 3, 10],
  ["도시행정학과", "uos-urban-admin", 5, 12], ["도시사회학과", "uos-urban-soc", 5, 12],
  ["전자전기컴퓨터공학부", "uos-eece", 21, 25], ["화학공학과", "uos-chem-eng", 9, 15],
  ["기계정보공학과", "uos-mech-info", 5, 10], ["신소재공학과", "uos-materials", 5, 10],
  ["토목공학과", "uos-civil", 5, 9], ["컴퓨터과학부", "uos-cs", 8, 12],
  ["인공지능학과", "uos-ai", 3, 6], ["수학과", "uos-math", 5, 7],
  ["통계학과", "uos-stat", 3, 10], ["물리학과", "uos-physics", 3, 7],
  ["생명과학과", "uos-life", 5, 10], ["환경원예학과", "uos-hort", 5, 10],
  ["융합응용화학과", "uos-applied-chem", 3, 7], ["건축학부(건축공학전공)", "uos-arch-eng", 5, 11],
  ["건축학부(건축학전공)", "uos-arch", 3, 20], ["도시공학과", "uos-urban-eng", 3, 12],
  ["교통공학과", "uos-transport", 4, 7], ["조경학과", "uos-landscape", 3, 13],
  ["환경공학부", "uos-env-eng", 10, 15], ["공간정보공학과", "uos-geo", 5, 11],
  ["자유전공학부(인문)", "uos-free-human", 15, 0], ["자유전공학부(자연)", "uos-free-natural", 15, 0],
];

export const verifiedUos2027Departments: Department[] = rows.map(([name, id]) => ({
  id: id as string,
  universityId: "uos",
  name: name as string,
}));

export const verifiedUos2027Admissions: Admission[] = rows.flatMap(([name, id, regional, interview]) => {
  const departmentId = id as string;
  const departmentName = name as string;
  const regionalCount = regional as number;
  const interviewCount = interview as number;
  const result: Admission[] = [];

  if (regionalCount > 0) result.push({
    id: `${departmentId}-highschool-recommendation`, universityId: "uos", departmentId,
    academicYear: 2027, name: "고교추천전형", type: "교과", recruitmentCount: regionalCount,
    studentRecordWeight: 80, source, isMock: false,
    csatMinimum: { enabled: true, description: "국어·수학·영어·탐구(상위 1과목) 중 3개 영역 등급합 8 이내 및 한국사 4등급 이내" },
  });

  if (interviewCount > 0) result.push({
    id: `${departmentId}-comprehensive-interview`, universityId: "uos", departmentId,
    academicYear: 2027, name: "학생부종합전형Ⅰ(면접형)", type: "학종", recruitmentCount: interviewCount,
    documentWeight: 50, interview: true, source, isMock: false,
    csatMinimum: { enabled: false },
  });

  return result;
});

// 2027학년도 학생부종합Ⅱ(서류형)는 경제학부·경영학부에서만 선발.
verifiedUos2027Admissions.push({
  id: "uos-econ-comprehensive-document", universityId: "uos", departmentId: "uos-econ",
  academicYear: 2027, name: "학생부종합전형Ⅱ(서류형)", type: "학종", recruitmentCount: 19,
  documentWeight: 100, interview: false, source, isMock: false,
  csatMinimum: { enabled: false },
});
