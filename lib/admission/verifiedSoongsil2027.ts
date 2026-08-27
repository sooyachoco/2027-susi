import type { Admission, Department, University } from "./types";

export const verifiedSoongsil2027Universities: University[] = [
  { id: "soongsil-2027", name: "숭실대학교", region: "서울" },
];

const rows = [
  ["기독교학과", 24, 0, 1, 0, 1, 0, 0], ["국어국문학과", 7, 0, 3, 0, 1, 5, 4], ["영어영문학과", 21, 0, 5, 0, 2, 14, 8], ["독어독문학과", 10, 0, 3, 0, 1, 4, 2], ["불어불문학과", 9, 0, 2, 0, 1, 5, 4], ["중어중문학과", 7, 0, 2, 0, 1, 3, 3], ["일어일문학과", 10, 0, 2, 0, 1, 8, 2], ["철학과", 16, 0, 3, 0, 1, 5, 3], ["사학과", 8, 0, 3, 0, 1, 4, 3], ["예술창작학부(영화예술전공)", 0, 0, 0, 0, 0, 0, 0], ["스포츠학부", 0, 0, 0, 0, 0, 0, 0], ["법학과", 12, 4, 3, 0, 1, 11, 4], ["국제법무학과", 7, 0, 2, 0, 1, 6, 2], ["사회복지학부", 8, 3, 3, 0, 1, 9, 4], ["행정학부", 6, 2, 5, 0, 2, 9, 6], ["정치외교학과", 5, 2, 2, 0, 1, 4, 5], ["정보사회학과", 4, 2, 1, 0, 1, 4, 4], ["언론홍보학과", 4, 2, 0, 0, 1, 4, 4], ["평생교육학과", 9, 3, 1, 0, 1, 2, 3], ["경제학과", 14, 5, 2, 0, 5, 15, 5], ["글로벌통상학과", 17, 6, 3, 0, 8, 14, 10], ["금융경제학과", 0, 0, 0, 0, 0, 0, 0], ["국제무역학과", 0, 0, 0, 0, 0, 0, 0], ["경영학부", 15, 15, 4, 0, 3, 27, 16], ["회계학과", 9, 3, 3, 0, 1, 10, 2], ["벤처중소기업학과", 8, 3, 2, 0, 2, 11, 7], ["금융학부", 14, 5, 2, 0, 0, 8, 2], ["수학과", 8, 3, 2, 0, 0, 8, 5], ["물리학과", 21, 2, 3, 0, 0, 3, 3], ["화학과", 14, 3, 3, 0, 0, 6, 4], ["정보통계·보험수리학과", 12, 5, 0, 0, 0, 8, 4], ["의생명시스템학부", 13, 3, 3, 0, 0, 9, 5], ["화학공학과", 19, 7, 4, 0, 0, 26, 12], ["신소재공학과", 18, 6, 4, 0, 0, 20, 12], ["전기공학부", 24, 2, 4, 0, 0, 25, 12], ["기계공학부", 20, 5, 7, 0, 0, 18, 12], ["산업·정보시스템공학과", 21, 7, 5, 0, 0, 20, 8], ["건축학부(건축학·건축공학전공)", 15, 4, 4, 0, 0, 18, 7], ["건축학부(실내건축전공)", 11, 2, 3, 0, 0, 3, 0], ["컴퓨터학부", 9, 11, 6, 4, 0, 15, 10], ["지능전자공학부", 30, 9, 8, 0, 0, 43, 24], ["글로벌미디어학부", 17, 5, 7, 4, 0, 14, 8], ["디지털미디어학과", 0, 0, 0, 0, 0, 0, 0], ["AI소프트웨어학부", 18, 16, 10, 9, 0, 22, 19], ["정보보호학과", 8, 0, 0, 0, 0, 0, 0], ["자유전공학부(인문)", 0, 8, 0, 0, 0, 10, 0], ["자유전공학부(자연)", 0, 10, 0, 0, 0, 14, 0],
] as const;

export const verifiedSoongsil2027Departments: Department[] = rows.map(([name], i) => ({ id: `soongsil-2027-${i + 1}`, universityId: "soongsil-2027", name }));

const source = { type: "university" as const, url: "https://admission.ssu.ac.kr/mojip/req.asp?flag=1&page_no=1_2_2", document: "숭실대학교 2027학년도 수시 모집요강", academicYear: 2027, confidence: 0.99 };
const makeId = (departmentId: string, name: string) => `${departmentId}-${name.replace(/[^0-9A-Za-z가-힣]+/g, "-")}`;

const humanitiesCsat = { enabled: true, description: "국어·수학·영어·사회/과학탐구(상위 1과목) 중 2개 영역 등급 합 6등급 이내" };
const naturalCsat = { enabled: true, description: "국어·수학·영어·사회/과학탐구(상위 1과목) 중 2개 영역 등급 합 6등급 이내" };
const essayCsat = { enabled: true, description: "국어·수학·영어·사회/과학탐구(상위 1과목) 중 2개 영역 등급 합 6등급 이내" };

export const verifiedSoongsil2027Admissions: Admission[] = verifiedSoongsil2027Departments.flatMap((department, i) => {
  const [, interview, document, opportunity, sw, special, subject, essay] = rows[i];
  const result: Admission[] = [];
  if (interview) result.push({ id: makeId(department.id, "미래인재-면접형"), universityId: department.universityId, departmentId: department.id, academicYear: 2027, name: "SSU미래인재(면접형)", type: "학종", recruitmentCount: interview, documentWeight: 50, interview: true, source, isMock: false });
  if (document) result.push({ id: makeId(department.id, "미래인재-서류형"), universityId: department.universityId, departmentId: department.id, academicYear: 2027, name: "SSU미래인재(서류형)", type: "학종", recruitmentCount: document, documentWeight: 100, source, isMock: false });
  if (opportunity) result.push({ id: makeId(department.id, "기회균형"), universityId: department.universityId, departmentId: department.id, academicYear: 2027, name: "기회균형", type: "학종", recruitmentCount: opportunity, documentWeight: 50, interview: true, source, isMock: false });
  if (sw) result.push({ id: makeId(department.id, "SW우수자"), universityId: department.universityId, departmentId: department.id, academicYear: 2027, name: "SW우수자", type: "학종", recruitmentCount: sw, documentWeight: 50, interview: true, source, isMock: false });
  if (special) result.push({ id: makeId(department.id, "특수교육대상자"), universityId: department.universityId, departmentId: department.id, academicYear: 2027, name: "특수교육대상자", type: "학종", recruitmentCount: special, documentWeight: 50, interview: true, source, isMock: false });
  if (subject) result.push({ id: makeId(department.id, "교과우수자"), universityId: department.universityId, departmentId: department.id, academicYear: 2027, name: "교과우수자", type: "교과", recruitmentCount: subject, studentRecordWeight: 100, csatMinimum: (department.name.includes("자유전공학부(자연)") || ["수학과","물리학과","화학과","정보통계·보험수리학과","의생명시스템학부","화학공학과","신소재공학과","전기공학부","기계공학부","산업·정보시스템공학과","건축학부(건축학·건축공학전공)","건축학부(실내건축전공)","컴퓨터학부","지능전자공학부","AI소프트웨어학부","정보보호학과"].includes(department.name)) ? naturalCsat : humanitiesCsat, source, isMock: false });
  if (essay) result.push({ id: makeId(department.id, "논술우수자"), universityId: department.universityId, departmentId: department.id, academicYear: 2027, name: "논술우수자", type: "논술", recruitmentCount: essay, studentRecordWeight: 10, csatMinimum: essayCsat, source, isMock: false });
  return result;
});
