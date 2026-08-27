import type { Admission, Department, University } from "./types";

const source = { type: "university" as const, academicYear: 2027, url: "https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000200", confidence: 0.94 };

export const verifiedHansung2027Universities: University[] = [
  { id: "hansung", name: "한성대학교", region: "서울" },
];

export const verifiedHansung2027Departments: Department[] = [
  { id: "hansung-creative-humanities", universityId: "hansung", name: "크리에이티브인문학부", category: "인문사회" },
  { id: "hansung-future-social", universityId: "hansung", name: "미래융합사회과학대학", category: "사회과학" },
  { id: "hansung-it-engineering", universityId: "hansung", name: "IT공과대학", category: "컴퓨터·소프트웨어" },
  { id: "hansung-ai-application", universityId: "hansung", name: "AI응용학과", category: "컴퓨터·AI" },
  { id: "hansung-ai-robot", universityId: "hansung", name: "AI기계로봇공학과", category: "공학" },
  { id: "hansung-future-mobility", universityId: "hansung", name: "미래모빌리티학과", category: "공학" },
  { id: "hansung-imagination", universityId: "hansung", name: "상상력인재학부", category: "자유전공" },
];

export const verifiedHansung2027Admissions: Admission[] = verifiedHansung2027Departments.flatMap((d) => {
  const admissions: Admission[] = [];
  const schoolTrackIds = new Set(["hansung-creative-humanities", "hansung-future-social", "hansung-it-engineering", "hansung-ai-application", "hansung-future-mobility", "hansung-imagination"]);
  if (schoolTrackIds.has(d.id)) {
    admissions.push({ id: `${d.id}-local-balance-2027`, universityId: d.universityId, departmentId: d.id, academicYear: 2027, name: "지역균형", type: "교과", studentRecordWeight: 100, source, isMock: false });
    admissions.push({ id: `${d.id}-hanseong-talent-2027`, universityId: d.universityId, departmentId: d.id, academicYear: 2027, name: "한성인재", type: "학종", documentWeight: 100, source, isMock: false });
  }
  if (["hansung-creative-humanities", "hansung-future-social", "hansung-it-engineering", "hansung-ai-application", "hansung-future-mobility", "hansung-imagination"].includes(d.id)) {
    admissions.push({ id: `${d.id}-subject-excellence-2027`, universityId: d.universityId, departmentId: d.id, academicYear: 2027, name: "교과우수", type: "교과", studentRecordWeight: 100, csatMinimum: { enabled: true, description: "주간 모집단위 수능 2개 영역 등급 합 7 이내" }, source, isMock: false });
  }
  return admissions;
});
