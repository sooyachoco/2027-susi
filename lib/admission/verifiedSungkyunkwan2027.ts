import type { Admission, Department, University } from "@/lib/types";

export const verifiedSungkyunkwan2027Universities: University[] = [{ id: "skku-2027", name: "성균관대학교", region: "서울" }];

const source = { type: "university" as const, url: "https://admission.skku.edu/upload/guide/20260813104526BBPE44.pdf", document: "성균관대학교 2027학년도 수시모집요강", verifiedAt: "2026-09-06", confidence: 0.99, academicYear: 2027 };

const rows: Array<[string, number, number, number, number, number, number, number, number]> = [
["자유전공계열",20,30,0,70,0,20,20,0],["인문과학계열",30,25,0,0,0,20,38,0],["사회과학계열",30,25,0,0,0,20,40,5],["경영학과",35,25,0,20,0,20,5,0],["글로벌리더학부",10,10,0,10,0,10,5,0],["글로벌경제학과",18,18,0,10,0,10,5,0],["글로벌경영학과",17,16,0,10,0,10,5,0],
["교육학과",0,0,0,15,0,10,0,0],["한문교육과",0,0,0,15,0,10,0,0],["유학·동양학과",0,15,0,15,0,0,0,0],["국어국문학과",0,6,0,6,0,0,0,0],["프랑스어문학과",0,12,0,12,0,0,0,0],["독어독문학과",0,12,0,12,0,0,0,0],["러시아어문학과",0,12,0,12,0,0,0,0],["한문학과",0,10,0,10,0,0,0,0],["사학과",0,6,0,6,0,0,0,0],["철학과",0,6,0,6,0,0,0,0],["사회학과",0,8,0,8,0,0,0,0],["사회복지학과",0,8,0,8,0,0,0,0],["심리학과",0,6,0,6,0,0,0,0],["아동·청소년학과",0,8,0,8,0,0,0,0],["통계학과",0,6,0,6,0,0,0,0],
["자연과학계열",35,25,0,0,0,20,20,5],["전자전기정보공학부",30,25,0,0,0,10,10,5],["공학계열",64,40,0,0,0,25,54,10],["컴퓨터공학과",10,10,0,0,0,10,5,5],["반도체시스템공학과",5,15,0,0,0,25,10,0],["지능형소프트웨어학과",5,10,0,0,0,15,5,0],["배터리학과",10,10,0,0,0,0,0,0],["글로벌바이오메디컬공학과",10,15,0,0,0,6,10,0],["반도체융합공학과",0,15,0,0,0,10,5,0],["에너지학과",0,15,0,0,0,10,5,0],["양자정보공학과",0,13,0,0,0,5,0,0],["바이오신약·규제과학과",0,12,0,0,0,5,0,0],["인공지능학과",0,15,0,0,0,5,0,0],["건축학과(5년제)",10,17,0,0,0,15,0,0],["약학과",10,20,0,0,0,5,0,0],["의예과",0,0,0,20,3,5,0,0],["수학교육과",0,0,0,16,0,10,0,0],["컴퓨터교육과",0,0,0,15,0,10,0,0],["생명과학과",0,6,0,0,0,6,0,0],["수학과",0,6,0,0,0,6,0,0],["물리학과",0,6,0,0,0,6,0,0],["화학과",0,6,0,0,0,6,0,0],["건설환경공학부",0,0,0,0,0,15,5,0],["글로벌AI융합학부",0,0,0,24,0,4,4,0],["연기예술학과(연출)",0,0,0,9,0,0,0,0],["스포츠과학과",0,0,0,12,0,16,18,0]
];

const extraDepartments = ["무용학과(한국무용)","무용학과(발레)","무용학과(컨템포러리댄스)","연기예술학과(연기)","응용AI융합학부(AI융합운영)","응용AI융합학부(산업인공지능)"];

export const verifiedSungkyunkwan2027Departments: Department[] = [
  ...rows.map(([name], i) => ({ id: `skku-2027-${i+1}`, universityId: "skku-2027", name })),
  ...extraDepartments.map((name, i) => ({ id: `skku-2027-extra-${i+1}`, universityId: "skku-2027", name }))
];

const names = ["학생부종합(융합인재)","학생부종합(탐구인재)","학생부종합(기회균형)","학생부종합(성균인재)","학생부종합(성균인재-지역인재)","학생부종합(과학인재)","학생부교과(추천인재)","논술위주"];
const kinds: Admission["type"][] = ["학종","학종","학종","학종","학종","학종","교과","논술"];

const strictRecommendation = new Set(["자유전공계열","글로벌리더학부","글로벌경제학과","글로벌경영학과","전자전기정보공학부","컴퓨터공학과","반도체융합공학과","에너지학과","글로벌바이오메디컬공학과","바이오신약·규제과학과"]);
const strictEssay = new Set(["자유전공계열","글로벌리더학부","글로벌경제학과","글로벌경영학과","전자전기정보공학부","컴퓨터공학과","반도체시스템공학과","지능형소프트웨어학과","글로벌바이오메디컬공학과","약학과","반도체융합공학과","에너지학과","인공지능학과"]);

const csatDescription = (department: string, j: number): string | undefined => {
  if (j === 0) return "국어·수학·영어·탐구(2개 과목 평균) 중 3개 영역 등급합 6 이내";
  if (j === 6) return `${strictRecommendation.has(department) ? "국어·수학·영어·탐구(2개 과목 평균) 중 3개 영역 등급합 6" : "국어·수학·영어·탐구(2개 과목 평균) 중 3개 영역 등급합 7"} 이내`;
  if (j === 7) {
    if (department === "의예과") return "국어·수학·영어·탐구(2개 과목 평균) 4개 영역 등급합 5 이내";
    return `${strictEssay.has(department) ? "국어·수학·영어·탐구(2개 과목 평균) 중 3개 영역 등급합 5" : "국어·수학·영어·탐구(2개 과목 평균) 중 3개 영역 등급합 6"} 이내`;
  }
  return undefined;
};

const baseAdmissions: Admission[] = rows.flatMap((row, i) => row.slice(1).flatMap((rawCount, j) => {
  const count = Number(rawCount);
  if (count <= 0) return [];
  const department = verifiedSungkyunkwan2027Departments[i];
  const admission = {
    id: `skku-2027-${i+1}-${j+1}`,
    universityId: "skku-2027",
    departmentId: department.id,
    academicYear: 2027,
    name: names[j],
    type: kinds[j],
    documentWeight: j < 6 ? 100 : undefined,
    studentRecordWeight: j === 6 ? 100 : undefined,
    interview: [3,4,5].includes(j),
    csatMinimum: { enabled: [0,6,7].includes(j), description: csatDescription(department.name, j) },
    source,
    isMock: false,
  } as Admission;
  Object.assign(admission, { 모집인원: count });
  return [admission];
}));

const extraAdmission = (departmentId: string, name: string, type: Admission["type"], count: number, extra: Partial<Admission> = {}) => {
  const admission = { id: `skku-2027-extra-${departmentId}-${name}`, universityId: "skku-2027", departmentId, academicYear: 2027, name, type, source, isMock: false, ...extra } as Admission;
  Object.assign(admission, { 모집인원: count });
  return admission;
};

const practicalAdmissions: Admission[] = [
  extraAdmission("skku-2027-extra-1", "실기/실적(예체능 실기우수자)", "기타", 13, { studentRecordWeight: 40 }),
  extraAdmission("skku-2027-extra-2", "실기/실적(예체능 실기우수자)", "기타", 12, { studentRecordWeight: 40 }),
  extraAdmission("skku-2027-extra-3", "실기/실적(예체능 실기우수자)", "기타", 12, { studentRecordWeight: 40 }),
  extraAdmission("skku-2027-extra-4", "실기/실적(예체능 실기우수자)", "기타", 20, { studentRecordWeight: 40, interview: true }),
  extraAdmission("skku-2027-48", "실기/실적(예체능 특기자)", "기타", 16, { documentWeight: 70, interview: true }),
  extraAdmission("skku-2027-28", "실기/실적(예체능 특기자)", "기타", 5, { documentWeight: 40, interview: true }),
  extraAdmission("skku-2027-48", "실기/실적(예체능 실기우수자)", "기타", 18, { studentRecordWeight: 20, interview: true })
];

const employeeAdmissions: Admission[] = [
  extraAdmission("skku-2027-extra-5", "학생부종합(특성화고졸재직자)", "학종", 94, { documentWeight: 100 }),
  extraAdmission("skku-2027-extra-6", "학생부종합(특성화고졸재직자)", "학종", 93, { documentWeight: 100 })
];

export const verifiedSungkyunkwan2027Admissions: Admission[] = [...baseAdmissions, ...practicalAdmissions, ...employeeAdmissions];
