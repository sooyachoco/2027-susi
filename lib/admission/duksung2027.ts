import type { Admission, Department, University } from "./types";

const source = { type: "university" as const, academicYear: 2027, url: "https://enter.duksung.ac.kr/mojib/?m_type=SUSI", confidence: 0.99 };

export const duksung2027Universities: University[] = [
  { id: "duksung", name: "덕성여자대학교", region: "서울" },
];

const departments: Array<[string, string, string]> = [
  ["global", "글로벌융합대학(인문사회)", "인문·사회"],
  ["science", "과학기술대학", "자연·공학"],
  ["pharmacy", "약학대학", "보건·약학"],
  ["art-design", "Art & Design대학", "디자인·예술"],
  ["free", "미래인재대학(자유전공학부)", "자유전공"],
  ["vr", "미래인재대학(가상현실융합학과)", "컴퓨터·AI"],
  ["data", "미래인재대학(데이터사이언스학과)", "컴퓨터·AI"],
  ["ai-drug", "미래인재대학(AI신약학과)", "자연·공학"],
  ["early-childhood", "유아교육과", "교육"],
];

export const duksung2027Departments: Department[] = departments.map(([id, name, category]) => ({ id: `duksung-${id}`, universityId: "duksung", name, category }));

const aggregate: Department = { id: "duksung-overall", universityId: "duksung", name: "2027 수시 전체", category: "전체" };
export const duksung2027DepartmentsWithAggregate: Department[] = [...duksung2027Departments, aggregate];

const admissions: Array<{name:string;type:Admission["type"];count:number;studentRecordWeight?:number;documentWeight?:number;interview?:boolean}> = [
  {name:"고교추천전형",type:"교과",count:145,studentRecordWeight:100},
  {name:"기회균형전형Ⅰ_사회통합",type:"교과",count:25,studentRecordWeight:100},
  {name:"덕성인재전형Ⅰ",type:"학종",count:115,documentWeight:100},
  {name:"덕성인재전형Ⅱ",type:"학종",count:240,documentWeight:60,interview:true},
  {name:"기회균형전형Ⅱ_사회통합",type:"학종",count:15,documentWeight:100},
  {name:"논술전형",type:"논술",count:120},
  {name:"미술실기전형",type:"기타",count:71},
  {name:"기회균형전형Ⅰ_특성화고교",type:"학종",count:6,documentWeight:100},
  {name:"기회균형전형Ⅰ_농어촌학생",type:"학종",count:37,documentWeight:100},
  {name:"기회균형전형Ⅰ_기초생활수급자 등",type:"학종",count:20,documentWeight:100},
  {name:"기회균형전형Ⅰ_장애인 등 대상자",type:"학종",count:5,documentWeight:60,interview:true},
  {name:"기회균형전형Ⅰ_특성화고 등을 졸업한 재직자",type:"학종",count:63,documentWeight:100},
];

export const duksung2027Admissions: Admission[] = admissions.map((m) => ({
  id: `duksung-2027-${m.name}`,
  universityId: "duksung",
  departmentId: aggregate.id,
  academicYear: 2027,
  name: m.name,
  type: m.type,
  recruitmentCount: m.count,
  ...(m.studentRecordWeight !== undefined ? { studentRecordWeight: m.studentRecordWeight } : {}),
  ...(m.documentWeight !== undefined ? { documentWeight: m.documentWeight } : {}),
  ...(m.interview ? { interview: true } : {}),
  csatMinimum: { enabled: ["고교추천전형", "논술전형"].includes(m.name) },
  source,
  isMock: false,
}));

export const duksung2027AggregateDepartment = aggregate;
