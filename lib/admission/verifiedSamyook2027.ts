import type { Admission, Department, University } from "./types";

const source = { type: "university" as const, academicYear: 2027, url: "https://ipsi.syu.ac.kr/2016_syu/pages/index.asp?mj=01&p=8", document: "2027학년도 수시 모집요강", verifiedAt: "2026-09-04", confidence: 0.99 };

export const verifiedSamyook2027Universities: University[] = [
  { id: "samyook", name: "삼육대학교", region: "서울" },
];

const rows: Array<[string, string, string]> = [
  ["english", "영어영문학과", "인문사회"], ["aviation-tourism", "항공관광외국어학부", "인문사회"], ["global-korean", "글로벌한국학과", "인문사회"], ["business", "경영학과", "경영"], ["social-welfare", "사회복지학과", "인문사회"], ["counseling", "상담심리학과", "인문사회"], ["early-childhood", "유아교육과", "교육"], ["nursing", "간호학과", "보건·의료"], ["physical-therapy", "물리치료학과", "보건·의료"], ["health", "보건관리학과", "보건"], ["food-nutrition", "식품영양학과", "자연·생활"], ["pharmacy", "약학과", "약학"], ["computer", "컴퓨터공학부", "컴퓨터·소프트웨어"], ["ai", "인공지능융합학부", "컴퓨터·AI"], ["bio-convergence", "바이오융합공학과", "공학"], ["chem-life", "화학생명과학과", "자연과학"], ["animal", "동물자원과학과", "자연과학"], ["environment-horticulture", "환경디자인원예학과", "자연·생활"], ["data-cloud", "데이터클라우드공학과", "컴퓨터·데이터"], ["architecture", "건축학과(5년제)", "건축"], ["music", "음악학과", "예체능"], ["art-design", "아트앤디자인학과", "디자인"], ["physical-education", "체육학과", "예체능"],
];

export const verifiedSamyook2027Departments: Department[] = rows.map(([id, name, category]) => ({ id: `samyook-${id}`, universityId: "samyook", name, category }));

const essayExcluded = new Set(["art-design", "physical-education", "music"]);
const practical = new Set(["art-design", "physical-education"]);
const sw = new Set(["computer", "ai", "data-cloud"]);

export const verifiedSamyook2027Admissions: Admission[] = verifiedSamyook2027Departments.flatMap((d) => {
  const key = d.id.replace("samyook-", "");
  const out: Admission[] = [];
  out.push({ id: `${d.id}-school-recommend-2027`, universityId: d.universityId, departmentId: d.id, academicYear: 2027, name: "학교장추천", type: "교과", studentRecordWeight: 100, source, isMock: false, csatMinimum: { enabled: key === "pharmacy", description: key === "pharmacy" ? "국어·영어·수학(미적분 또는 기하)·과학탐구(1과목) 중 3개 영역 합 5등급 이내" : "일반학과 수능최저 없음" } });
  out.push({ id: `${d.id}-seum-2027`, universityId: d.universityId, departmentId: d.id, academicYear: 2027, name: "세움인재", type: "학종", interview: true, documentWeight: 60, source, isMock: false, csatMinimum: { enabled: key === "pharmacy", description: key === "pharmacy" ? "국어·영어·수학(미적분 또는 기하)·과학탐구(1과목) 중 3개 영역 합 5등급 이내" : "수능최저 없음" } });
  if (sw.has(key)) out.push({ id: `${d.id}-sw-talent-2027`, universityId: d.universityId, departmentId: d.id, academicYear: 2027, name: "S/W인재", type: "학종", interview: true, documentWeight: 60, source, isMock: false, csatMinimum: { enabled: false, description: "수능최저 없음" } });
  if (!essayExcluded.has(key)) out.push({ id: `${d.id}-essay-2027`, universityId: d.universityId, departmentId: d.id, academicYear: 2027, name: "논술우수자", type: "논술", source, isMock: false, csatMinimum: { enabled: true, description: "국어·영어·수학·탐구 중 1개 영역 3등급 이내" } });
  if (practical.has(key)) out.push({ id: `${d.id}-practical-2027`, universityId: d.universityId, departmentId: d.id, academicYear: 2027, name: "실기우수자", type: "기타", source, isMock: false });
  return out;
});

export const verifiedSamyook2027AggregateDepartment: Department = { id: "samyook-2027-overall", universityId: "samyook", name: "2027 수시 전체", category: "전체" };

export const verifiedSamyook2027AggregateAdmissions: Admission[] = [
  { id: "samyook-2027-overall-school-recommend", universityId: "samyook", departmentId: verifiedSamyook2027AggregateDepartment.id, academicYear: 2027, name: "학교장추천(전체)", type: "교과", recruitmentCount: 131, studentRecordWeight: 100, source, isMock: false },
  { id: "samyook-2027-overall-seum", universityId: "samyook", departmentId: verifiedSamyook2027AggregateDepartment.id, academicYear: 2027, name: "세움인재(전체)", type: "학종", recruitmentCount: 228, documentWeight: 60, interview: true, csatMinimum: { enabled: true, description: "약학과만 해당: 국어·영어·수학(미적분 또는 기하)·과학탐구(1과목) 중 3개 영역 합 5등급 이내" }, source, isMock: false },
  { id: "samyook-2027-overall-essay", universityId: "samyook", departmentId: verifiedSamyook2027AggregateDepartment.id, academicYear: 2027, name: "논술우수자(전체)", type: "논술", recruitmentCount: 277, csatMinimum: { enabled: true, description: "국어·영어·수학·탐구 중 1개 영역 3등급 이내; 약학과는 별도 기준" }, source, isMock: false },
];

export const verifiedSamyook2027DepartmentsWithAggregate: Department[] = [verifiedSamyook2027AggregateDepartment, ...verifiedSamyook2027Departments];