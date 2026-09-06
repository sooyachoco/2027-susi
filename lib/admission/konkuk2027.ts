import type { Admission, Department, University } from "./types";

const source = {
  type: "university" as const,
  url: "https://enter.konkuk.ac.kr/",
  academicYear: 2027,
  collectedAt: "2026-09-06",
  confidence: 0.99,
};

export const konkuk2027Universities: University[] = [{ id: "konkuk", name: "건국대학교", region: "서울" }];

const defs: Array<[string, string, string]> = [
  ["korean","국어국문학과","인문·사회"],["english","영어영문학과","인문·사회"],["chinese","중어중문학과","인문·사회"],["philosophy","철학과","인문·사회"],["history","사학과","인문·사회"],["geography","지리학과","인문·사회"],["media","미디어커뮤니케이션학과","인문·사회"],["culture","문화콘텐츠학과","인문·사회"],["liberal-science","문과대학자유전공학부","인문·사회"],
  ["math","수학과","자연과학"],["physics","물리학과","자연과학"],["chemistry","화학과","자연과학"],["liberal-science-natural","이과대학자유전공학부","자연과학"],
  ["architecture","건축학부","공학"],["civil","사회환경공학부","공학"],["mechanical","기계·로봇·자동차공학부","공학"],["electrical","전기전자공학부","공학"],["chemical","화공·생명·에너지공학부","공학"],["ai","인공지능학과","컴퓨터·소프트웨어"],["computer","컴퓨터공학과","컴퓨터·소프트웨어"],["materials","재료공학과","공학"],["aerospace","항공우주·모빌리티공학과","공학"],["bioengineering","생물공학과","공학"],["industrial","산업공학과","공학"],["engineering-liberal","공과대학자유전공학부","공학"],
  ["political","정치외교학과","인문·사회"],["economics","경제학과","경영·경제"],["public-admin","행정학과","인문·사회"],["trade","국제무역학과","경영·경제"],["applied-stat","응용통계학과","자연과학"],["social-convergence","사회과학대학융합전공학부","인문·사회"],["business","경영학과","경영·경제"],["tech-management","기술경영학과","경영·경제"],["realestate","부동산학과","경영·경제"],
  ["advanced-bio","첨단바이오공학부","생명·바이오"],["life-bio","생명공학부","생명·바이오"],["food","식품융합학부","생명·식품"],["environment","환경생태과학부","생명·환경"],["animal","동물자원과학과","생명·식품"],["life-science","생명과학과","생명·바이오"],["food-resource","식량자원과학과","생명·식품"],["bio-liberal","융합생명과학대학자유전공학부","생명·바이오"],["vet","수의예과","의학"],
  ["japanese-edu","일어교육과","사범"],["math-edu","수학교육과","사범"],["physical-edu","체육교육과","사범"],["music-edu","음악교육과","사범"],["edu-tech","교육공학과","사범"],["english-edu","영어교육과","사범"],["ku-free","KU자유전공학부","자유전공"],["employment","산업경영융합학부","재직자"],["film-art","영화예술학과","예체능"],
];

export const konkuk2027Departments: Department[] = defs.map(([id, name, category]) => ({ id: `konkuk-${id}`, universityId: "konkuk", name, category }));
const universityId = "konkuk";
const byName = new Map(konkuk2027Departments.map(d => [d.name, d.id]));
const admissions: Admission[] = [];

const add = (name: string, track: string, type: Admission["type"], count: number, extra: Partial<Admission> = {}) => {
  if (!count) return;
  const departmentId = byName.get(name);
  if (!departmentId) return;
  const admission = { id: `${departmentId}-${track}`, universityId, departmentId, academicYear: 2027, name: track, type, source, isMock: false, ...extra } as Admission;
  Object.assign(admission, { 모집인원: count });
  admissions.push(admission);
};

// 최종 모집요강 모집단위별 표를 기준으로 재작성: [KU지역균형, KU자기추천, 기회균형, KU논술우수자]
const rows: Array<[string, number, number, number, number]> = [
  ["국어국문학과",9,15,1,5],["영어영문학과",10,30,2,3],["중어중문학과",8,16,2,3],["철학과",6,15,1,3],["사학과",7,14,1,3],["지리학과",4,17,1,3],["미디어커뮤니케이션학과",6,13,1,6],["문화콘텐츠학과",4,14,1,3],["문과대학자유전공학부",15,0,0,14],
  ["수학과",5,7,1,4],["물리학과",8,13,1,7],["화학과",3,8,1,4],["이과대학자유전공학부",0,0,0,11],
  ["건축학부",8,20,3,6],["사회환경공학부",7,40,4,7],["기계·로봇·자동차공학부",19,8,3,5],["전기전자공학부",8,38,4,7],["화공·생명·에너지공학부",6,20,3,3],["인공지능학과",0,20,0,3],["컴퓨터공학과",6,24,3,5],["재료공학과",4,22,3,0],["항공우주·모빌리티공학과",3,9,3,5],["생물공학과",3,15,2,7],["산업공학과",3,8,2,3],["공과대학자유전공학부",100,0,0,35],
  ["정치외교학과",3,9,1,4],["경제학과",7,23,3,7],["행정학과",6,14,2,5],["국제무역학과",4,14,2,7],["응용통계학과",4,13,2,3],["사회과학대학융합전공학부",0,0,0,8],["경영학과",15,47,4,15],["기술경영학과",3,10,2,4],["부동산학과",4,15,2,5],
  ["첨단바이오공학부",3,18,2,3],["생명공학부",6,16,2,6],["식품융합학부",3,24,3,3],["환경생태과학부",3,20,3,3],["동물자원과학과",3,16,1,3],["생명과학과",6,14,2,4],["식량자원과학과",3,10,2,3],["융합생명과학대학자유전공학부",0,0,0,14],["수의예과",5,24,3,6],
  ["일어교육과",3,19,0,0],["수학교육과",6,6,0,5],["영어교육과",6,10,0,0],["KU자유전공학부",0,183,0,65],
];

for (const [name, regional, self, opportunity, essay] of rows) {
  add(name, "KU지역균형-2027", "교과", regional, { studentRecordWeight: 70, documentWeight: 30, csatMinimum: { enabled: false } });
  add(name, "KU자기추천-2027", "학종", self, { documentWeight: 70, interview: true, csatMinimum: { enabled: false } });
  add(name, "기회균형-2027", "기타", opportunity, { documentWeight: 70, studentRecordWeight: 30, csatMinimum: { enabled: false } });
  add(name, "KU논술우수자-2027", "논술", essay, { csatMinimum: { enabled: true, description: "인문·자연·KU자유전공: 국어·수학·영어·탐구(1) 중 2개 합 5, 한국사 5 / 수의예과: 3개 합 4, 한국사 5" } });
}

for (const name of ["건축학부","사회환경공학부","기계·로봇·자동차공학부","전기전자공학부","화공·생명·에너지공학부","인공지능학과","컴퓨터공학과","재료공학과","항공우주·모빌리티공학과","생물공학과","식품융합학부","환경생태과학부","동물자원과학과","정치외교학과","경제학과","행정학과","국제무역학과","응용통계학과","경영학과","기술경영학과","부동산학과","식량자원과학과"]) add(name, "특성화고교졸업자-2027", "기타", 1, { documentWeight: 70, studentRecordWeight: 30 });

const aggregateDepartment: Department = { id: "konkuk-aggregate", universityId: "konkuk", name: "건국대학교 수시 전체" };
const aggregateAdmission = (id: string, name: string, count: number, extra: Partial<Admission> = {}) => {
  const admission = { id: `konkuk-aggregate-${id}`, universityId, departmentId: aggregateDepartment.id, academicYear: 2027, name, type: "기타" as Admission["type"], source, isMock: false, isAggregate: true, ...extra } as Admission;
  Object.assign(admission, { 모집인원: count });
  admissions.push(admission);
};
aggregateAdmission("special-education", "학생부종합(특수교육대상자) 전체", 20, { documentWeight: 70, interview: true });
aggregateAdmission("employee", "학생부종합(특성화고졸재직자) 전체", 165, { documentWeight: 100 });
aggregateAdmission("acting", "실기/실적(연기우수자) 전체", 15, { studentRecordWeight: 100 });
aggregateAdmission("directing", "실기/실적(연출우수자) 전체", 10, { documentWeight: 100 });
aggregateAdmission("sports", "실기/실적(체육특기자) 전체", 13);

export const konkuk2027Admissions = admissions;
