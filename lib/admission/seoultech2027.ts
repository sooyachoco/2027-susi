import type { Admission, Department, University } from "./types";

const sourceUrl = "https://admission.seoultech.ac.kr";
const source = { type: "university" as const, url: sourceUrl, academicYear: 2027, collectedAt: "2026-09-05", verifiedAt: "2026-09-05", confidence: 0.99 };

export const seoultech2027Universities: University[] = [
  { id: "seoultech", name: "서울과학기술대학교", region: "서울" },
];

const departmentNames = [
  "기계시스템공학부(지능형로봇전공)", "기계시스템공학부(미래자동차전공)", "기계공학과", "안전공학과", "신소재공학과", "건설시스템공학과", "건축학부(건축공학전공)", "건축학부(건축학전공)", "자유전공학부(공과대학)",
  "전기정보공학과", "전자공학과", "ICT융합공학과", "컴퓨터공학과", "자유전공학부(정보통신대학)",
  "화공생명공학과", "환경공학과", "식품생명공학과", "정밀화학과", "안경광학과", "스포츠과학과", "바이오메디컬학과", "양자융합물리학과", "자유전공학부(에너지바이오대학)",
  "산업디자인학과", "시각디자인학과", "도예학과", "금속공예디자인학과", "조형예술학과",
  "행정학과", "영어영문학과", "문예창작학과", "자유전공학부(인문사회대학)",
  "산업공학부(산업정보시스템전공)_자연", "산업공학부(산업정보시스템전공)_인문", "산업공학부(ITM전공)_자연", "산업공학부(ITM전공)_인문", "MSDE학과", "경영학과(경영학전공)", "경영학과(글로벌테크노경영전공)_인문", "경영학과(글로벌테크노경영전공)_자연", "자유전공학부(기술경영융합대학)",
  "융합기계공학과", "건설환경융합공학과", "헬스피트니스학과", "문화예술학과", "영어과", "벤처경영학과", "정보통신융합공학과", "자유전공학부(미래융합대학)",
  "인공지능응용학과", "지능형반도체공학과", "미래에너지학과", "자유전공학부(창의융합대학)", "ST자유전공학부_자연", "ST자유전공학부_인문",
] as const;

export const seoultech2027Departments: Department[] = departmentNames.map((name, index) => ({
  id: `seoultech-${index + 1}`,
  universityId: "seoultech",
  name,
  category: name.includes("경영") || name.includes("행정") || name.includes("영어") || name.includes("문예") || name.includes("벤처") ? "인문·사회" : name.includes("디자인") || name.includes("도예") || name.includes("조형") || name.includes("스포츠") || name.includes("문화예술") || name.includes("헬스피트니스") ? "예체능" : "공학·자연",
}));

type SeoulTechMethodDefinition = {
  key: string;
  name: string;
  type: Admission["type"];
  studentRecordWeight?: number;
  documentWeight?: number;
  interview?: boolean;
  csatMinimum: { enabled: boolean; requiredSubjects?: number; gradeSum?: number; description?: string };
};

const methodDefinitions: SeoulTechMethodDefinition[] = [
  { key: "recommend", name: "고교추천전형", type: "교과", studentRecordWeight: 100, csatMinimum: { enabled: true, requiredSubjects: 2, gradeSum: 7, description: "국어·수학·영어·탐구(1과목) 중 2개 영역 합 7등급 이내" } },
  { key: "school", name: "학교생활우수자전형", type: "학종", documentWeight: 70, interview: true, csatMinimum: { enabled: false } },
  { key: "creative", name: "창의융합인재전형", type: "학종", documentWeight: 70, interview: true, csatMinimum: { enabled: false } },
  { key: "essay", name: "논술전형", type: "논술", studentRecordWeight: 30, csatMinimum: { enabled: false } },
  { key: "national", name: "기회균형전형(국가보훈대상자)", type: "학종", documentWeight: 70, interview: true, csatMinimum: { enabled: false } },
  { key: "equal", name: "기회균형전형(기회균등)", type: "학종", documentWeight: 70, interview: true, csatMinimum: { enabled: false } },
  { key: "lifelong", name: "기회균형전형(평생학습자)", type: "학종", documentWeight: 70, interview: true, csatMinimum: { enabled: false } },
  { key: "rural", name: "기회균형전형(농어촌학생)", type: "학종", documentWeight: 70, interview: true, csatMinimum: { enabled: false } },
  { key: "worker", name: "기회균형전형(특성화고졸재직자)", type: "교과", studentRecordWeight: 100, csatMinimum: { enabled: false } },
  { key: "special", name: "기회균형전형(특수교육대상자)", type: "학종", documentWeight: 70, interview: true, csatMinimum: { enabled: false } },
  { key: "practical", name: "실기전형", type: "기타", studentRecordWeight: 0, csatMinimum: { enabled: false } },
];

const aggregateCounts = {
  recommend: 502,
  school: 496,
  creative: 91,
  national: 19,
  equal: 86,
  lifelong: 72,
  rural: 68,
  worker: 168,
  special: 10,
  essay: 162,
  practical: 73,
};

export const seoultech2027DepartmentsWithAggregate: Department[] = [
  ...seoultech2027Departments,
  { id: "seoultech-susi-overall", universityId: "seoultech", name: "2027 수시 전체(전형 합계)", category: "전체" },
];

export const seoultech2027Admissions: Admission[] = [
  ...seoultech2027Departments.flatMap((department) =>
    methodDefinitions.map((method) => ({
      id: `${department.id}-${method.key}-2027`, universityId: "seoultech", departmentId: department.id, academicYear: 2027,
      name: method.name, type: method.type,
      ...(method.studentRecordWeight !== undefined ? { studentRecordWeight: method.studentRecordWeight } : {}),
      ...(method.documentWeight !== undefined ? { documentWeight: method.documentWeight } : {}),
      ...(method.interview !== undefined ? { interview: method.interview } : {}),
      csatMinimum: method.csatMinimum, source, isMock: false,
    }))
  ),
  ...methodDefinitions.map((method) => ({
    id: `seoultech-susi-overall-${method.key}-2027`, universityId: "seoultech", departmentId: "seoultech-susi-overall", academicYear: 2027,
    name: method.name, type: method.type, recruitmentCount: aggregateCounts[method.key as keyof typeof aggregateCounts],
    ...(method.studentRecordWeight !== undefined ? { studentRecordWeight: method.studentRecordWeight } : {}),
    ...(method.documentWeight !== undefined ? { documentWeight: method.documentWeight } : {}),
    ...(method.interview !== undefined ? { interview: method.interview } : {}),
    csatMinimum: method.csatMinimum, source, isMock: false,
  })),
];
