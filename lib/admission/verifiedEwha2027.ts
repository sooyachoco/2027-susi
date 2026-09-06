import type { Admission, Department, University } from "@/lib/types";

const universityId = "ewha-2027";
const source = { type: "university" as const, url: "https://admission.ewha.ac.kr/upload/GUIDES/20260602125244F7AFE4.pdf", document: "2027학년도 이화여자대학교 수시모집요강", academicYear: 2027, verifiedAt: "2026-09-06", confidence: 0.99 };
export const verifiedEwha2027Universities: University[] = [{ id: universityId, name: "이화여자대학교", region: "서울" }];

const data: Record<string, [number, number, number, number]> = {
"국어국문학과":[10,33,4,10],"중어중문학과":[8,35,5,7],"불어불문학과":[0,21,10,8],"독어독문학과":[0,13,7,5],"사학과":[0,15,3,8],"철학과":[0,16,0,9],"기독교학과":[0,5,6,7],"영어영문학부":[9,49,5,9],
"정치외교학과":[11,12,0,6],"행정학과":[10,12,0,6],"경제학과":[11,22,3,10],"문헌정보학과":[0,11,0,6],"사회학과":[8,10,0,4],"사회복지학과":[0,11,0,6],"심리학과":[11,12,0,6],"소비자학과":[0,11,0,7],"커뮤니케이션·미디어학부":[15,35,0,8],
"교육학과":[6,7,0,0],"유아교육과":[6,6,0,0],"초등교육과":[9,12,0,0],"교육공학과":[5,10,0,0],"특수교육과":[9,9,0,0],"영어교육과":[5,12,0,0],"역사교육전공":[5,6,0,0],"사회교육전공":[5,6,0,0],"지리교육전공":[5,6,0,0],"국어교육과":[5,8,0,0],"과학교육과":[16,19,5,0],"수학교육과":[5,4,3,0],
"경영학부":[18,40,6,19],"의류산업학과":[9,15,3,8],"국제사무학과":[5,6,3,5],
"수학과":[10,15,0,5],"통계학과":[8,18,3,6],"물리학과":[0,15,0,6],"화학·나노과학과":[10,27,7,11],"생명과학과":[10,27,7,11],
"전자전기공학전공":[16,24,0,7],"지능형반도체공학전공":[6,7,3,3],"식품생명공학과":[9,11,0,4],"화공신소재공학과":[13,20,4,6],"건축학과":[6,11,0,6],"건축도시시스템공학과":[7,14,0,4],"환경공학과":[5,19,3,4],"기후에너지시스템공학과":[8,17,0,4],"휴먼기계바이오공학과":[12,28,3,6],
"식품영양학과":[6,16,5,6],"융합보건학과":[0,15,0,7],"간호학부":[16,16,9,4],"뇌·인지과학부":[0,7,3,0],"국제학부":[0,11,43,0],"스크랜튼학부":[0,21,6,13],
"컴퓨터공학과":[14,25,3,6],"사이버보안학과":[6,12,3,4],"인공지능데이터사이언스학부":[9,13,12,4],"의예과":[0,9,9,5],"약학부":[0,9,12,5]
};

const departments = Object.keys(data).map((name, i) => ({ id: `${universityId}-${i + 1}`, universityId, name }));
export const verifiedEwha2027Departments: Department[] = departments;
const byName = new Map(departments.map(d => [d.name, d.id]));
const admissions: Admission[] = [];
const add = (name: string, track: string, type: Admission["type"], count: number, extra: Partial<Admission> = {}) => {
  const departmentId = byName.get(name); if (!departmentId || count <= 0) return;
  const admission = { id: `${departmentId}-${track}`, universityId, departmentId, academicYear: 2027, name: track, type, source, isMock: false, ...extra } as Admission;
  Object.assign(admission, { 모집인원: count }); admissions.push(admission);
};
for (const [name, [recommendation, document, interview, essay]] of Object.entries(data)) {
  if (recommendation) add(name, "학생부교과(고교추천전형)", "교과", recommendation, { studentRecordWeight: 100, csatMinimum: { enabled: true, description: "국어·수학·영어·탐구 중 2개 영역 등급 합 5 이내" } });
  if (document) add(name, "학생부종합(미래인재전형-서류형)", "학종", document, { documentWeight: 100, csatMinimum: { enabled: true, description: "국어·수학·영어·탐구 중 2개 영역 등급 합 5 이내" } });
  if (interview) add(name, "학생부종합(미래인재전형-면접형)", "학종", interview, { documentWeight: 70, interview: true, csatMinimum: { enabled: false } });
  if (essay) add(name, "논술(논술전형)", "논술", essay, { csatMinimum: { enabled: true, description: "국어·수학·영어·탐구 중 3개 영역 등급 합 6 이내" } });
}
export const verifiedEwha2027Admissions: Admission[] = admissions;
