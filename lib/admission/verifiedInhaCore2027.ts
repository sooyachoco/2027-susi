import type { Admission, Department, University } from "./types";

const inhaSource = {
  type: "university" as const,
  academicYear: 2027,
  url: "https://admission.inha.ac.kr/",
  confidence: 0.98,
};

export const verifiedInhaCore2027Universities: University[] = [
  { id: "inha", name: "인하대학교", region: "인천" },
];

const departments: Array<[string, string, string]> = [
  ["mechanical", "기계공학과", "공학"],
  ["electrical", "전기전자공학부", "공학"],
  ["semiconductor", "반도체시스템공학과", "공학"],
  ["ai", "인공지능공학과", "컴퓨터·AI"],
  ["data", "데이터사이언스학과", "컴퓨터·AI"],
  ["computer", "컴퓨터공학과", "컴퓨터·소프트웨어"],
  ["business", "경영학부", "경영·경제"],
  ["nursing", "간호학과", "보건·의료"],
];

export const verifiedInhaCore2027Departments: Department[] = departments.map(([id, name, category]) => ({
  id: `inha-${id}`,
  universityId: "inha",
  name,
  category,
}));

const recruitment: Record<string, { interview: number; document: number; subject: number; essay: number }> = {
  "inha-mechanical": { interview: 34, document: 9, subject: 17, essay: 23 },
  "inha-electrical": { interview: 0, document: 0, subject: 0, essay: 34 },
  "inha-semiconductor": { interview: 0, document: 0, subject: 0, essay: 14 },
  "inha-ai": { interview: 0, document: 0, subject: 0, essay: 17 },
  "inha-data": { interview: 0, document: 0, subject: 0, essay: 9 },
  "inha-computer": { interview: 0, document: 0, subject: 0, essay: 29 },
  "inha-business": { interview: 0, document: 0, subject: 0, essay: 0 },
  "inha-nursing": { interview: 0, document: 0, subject: 0, essay: 0 },
};

export const verifiedInhaCore2027Admissions: Admission[] = departments.flatMap(([id]) => {
  const d = `inha-${id}`;
  const r = recruitment[d];
  const admissions: Admission[] = [];
  if (r.interview) admissions.push({ id: `${d}-future-interview`, universityId: "inha", departmentId: d, academicYear: 2027, name: "학생부종합(인하미래인재(면접형))", type: "학종", recruitmentCount: r.interview, documentWeight: 70, interview: true, source: inhaSource, isMock: false });
  if (r.document) admissions.push({ id: `${d}-future-document`, universityId: "inha", departmentId: d, academicYear: 2027, name: "학생부종합(인하미래인재(서류형))", type: "학종", recruitmentCount: r.document, documentWeight: 100, source: inhaSource, isMock: false });
  if (r.subject) admissions.push({ id: `${d}-regional`, universityId: "inha", departmentId: d, academicYear: 2027, name: "학생부교과(지역균형)", type: "교과", recruitmentCount: r.subject, studentRecordWeight: 100, source: inhaSource, isMock: false });
  if (r.essay) admissions.push({ id: `${d}-essay`, universityId: "inha", departmentId: d, academicYear: 2027, name: "논술(논술우수자)", type: "논술", recruitmentCount: r.essay, source: inhaSource, isMock: false });
  return admissions;
});
