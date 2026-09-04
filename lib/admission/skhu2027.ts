import type { Admission, Department, University } from "./types";

const source = { type: "university" as const, academicYear: 2027, url: "https://enter.skhu.ac.kr/enter/3065/subview.do", document: "2027학년도 수시 모집요강", confidence: 0.99 };

export const skhu2027Universities: University[] = [{ id: "skhu", name: "성공회대학교", region: "서울" }];

const departments = [
  ["humanities", "인문융합콘텐츠학부", "인문·사회"], ["business", "경영학부", "경영·경제"], ["social", "사회융합학부", "인문·사회"],
  ["media", "미디어콘텐츠융합학부", "미디어·콘텐츠"], ["future", "미래융합학부", "컴퓨터·AI"], ["software", "소프트웨어융합학부", "컴퓨터·소프트웨어"],
  ["free-major", "자유전공학부", "자유전공"],
] as const;

export const skhu2027Departments: Department[] = departments.map(([id, name, category]) => ({ id: `skhu-${id}`, universityId: "skhu", name, category }));
export const skhu2027DepartmentsWithAggregate: Department[] = skhu2027Departments;

const counts: Record<string, Record<string, number>> = {
  humanities: { 열린인재: 36, 교과성적: 14, 국가보훈대상자: 1, 사회기여자및배려대상자: 1, 기회균형선발: 3, 농어촌학생: 1, 북한이탈주민: 2 },
  business: { 열린인재: 22, 교과성적: 7, 국가보훈대상자: 1, 사회기여자및배려대상자: 1, 기회균형선발: 2, 농어촌학생: 1, 북한이탈주민: 1 },
  social: { 열린인재: 33, 대안학교출신자: 10, 교과성적: 15, 국가보훈대상자: 1, 사회기여자및배려대상자: 4, 기회균형선발: 3, 농어촌학생: 1, 북한이탈주민: 2 },
  media: { 열린인재: 33, 대안학교출신자: 5, 교과성적: 11, 국가보훈대상자: 2, 사회기여자및배려대상자: 2, 특성화고교교과성적: 4, 기회균형선발: 3, 농어촌학생: 1, 특성화고교졸업자: 2, 북한이탈주민: 2 },
  future: { 열린인재: 20, 교과성적: 7, 국가보훈대상자: 1, 사회기여자및배려대상자: 1, 특성화고교교과성적: 1, 기회균형선발: 2, 농어촌학생: 1, 특성화고교졸업자: 1, 북한이탈주민: 1 },
  software: { 열린인재: 52, 교과성적: 22, 국가보훈대상자: 2, 사회기여자및배려대상자: 1, 특성화고교교과성적: 6, 기회균형선발: 2, 농어촌학생: 1, 특성화고교졸업자: 3, 북한이탈주민: 2 },
  "free-major": { 교과성적: 109 },
};

const meta: Record<string, { type: Admission["type"]; studentRecordWeight?: number; documentWeight?: number; interview?: boolean }> = {
  열린인재: { type: "학종", documentWeight: 60, interview: true }, 대안학교출신자: { type: "학종", documentWeight: 60, interview: true },
  교과성적: { type: "교과", studentRecordWeight: 100 }, 국가보훈대상자: { type: "교과", studentRecordWeight: 100 }, 사회기여자및배려대상자: { type: "교과", studentRecordWeight: 100 },
  특성화고교교과성적: { type: "교과", studentRecordWeight: 100 }, 기회균형선발: { type: "교과", studentRecordWeight: 100 }, 농어촌학생: { type: "교과", studentRecordWeight: 100 },
  특성화고교졸업자: { type: "교과", studentRecordWeight: 100 }, 북한이탈주민: { type: "기타", studentRecordWeight: 100 },
};

export const skhu2027Admissions: Admission[] = Object.entries(counts).flatMap(([deptId, methods]) => Object.entries(methods).map(([name, recruitmentCount]) => ({
  id: `skhu-2027-${deptId}-${name}`, universityId: "skhu", departmentId: `skhu-${deptId}`, academicYear: 2027, name,
  type: meta[name].type, recruitmentCount, ...(meta[name].studentRecordWeight ? { studentRecordWeight: meta[name].studentRecordWeight } : {}),
  ...(meta[name].documentWeight ? { documentWeight: meta[name].documentWeight } : {}), ...(meta[name].interview ? { interview: true } : {}),
  csatMinimum: { enabled: false }, source, isMock: false,
})));
