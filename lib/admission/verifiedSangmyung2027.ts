import type { Admission, Department, University } from "./types";

const source = {
  type: "university" as const,
  academicYear: 2027,
  url: "https://admission.smu.ac.kr/bbs/fileview.php?bbsid=seoul_mojib&file_seq=8579",
  document: "상명대학교 2027학년도 수시모집요강",
  verifiedAt: "2026-09-04",
  confidence: 0.98,
};

export const verifiedSangmyung2027Universities: University[] = [
  { id: "sangmyung", name: "상명대학교", region: "서울" },
];

export const verifiedSangmyung2027Departments: Department[] = [
  { id: "sangmyung-history-content", universityId: "sangmyung", name: "역사콘텐츠전공", category: "인문사회" },
  { id: "sangmyung-computer-science", universityId: "sangmyung", name: "컴퓨터과학전공", category: "컴퓨터·소프트웨어" },
  { id: "sangmyung-electrical", universityId: "sangmyung", name: "전기공학전공", category: "공학" },
  { id: "sangmyung-ai-human", universityId: "sangmyung", name: "휴먼AI공학전공", category: "컴퓨터·AI" },
  { id: "sangmyung-food-nutrition", universityId: "sangmyung", name: "식품영양학전공", category: "자연·생활" },
];

export const verifiedSangmyung2027Admissions: Admission[] = verifiedSangmyung2027Departments.flatMap((d) => [
  {
    id: `${d.id}-school-recommend-2027`,
    universityId: d.universityId,
    departmentId: d.id,
    academicYear: 2027,
    name: "고교추천",
    type: "교과" as const,
    studentRecordWeight: 100,
    csatMinimum: { enabled: false },
    source,
    isMock: false,
  },
  {
    id: `${d.id}-sangmyung-talent-2027`,
    universityId: d.universityId,
    departmentId: d.id,
    academicYear: 2027,
    name: "상명인재",
    type: "학종" as const,
    documentWeight: 100,
    csatMinimum: { enabled: false },
    source,
    isMock: false,
  },
  {
    id: `${d.id}-essay-2027`,
    universityId: d.universityId,
    departmentId: d.id,
    academicYear: 2027,
    name: "논술",
    type: "논술" as const,
    recruitmentCount: 98,
    csatMinimum: { enabled: false },
    source,
    isMock: false,
  },
]);
