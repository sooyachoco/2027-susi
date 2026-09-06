import type { Admission, Department, University } from "./types";

const universityId = "konkuk";
const source = { type: "university" as const, url: "https://enter.konkuk.ac.kr/", document: "2027학년도 건국대학교 서울캠퍼스 수시모집요강", academicYear: 2027, collectedAt: "2026-09-06", confidence: 0.99 };

export const konkuk2027Universities: University[] = [{ id: universityId, name: "건국대학교", region: "서울" }];

type Row = [string, string, number, number, number, number, number];
const rows: Row[] = [
  ["국어국문학과","인문",9,15,1,0,5],["영어영문학과","인문",10,30,2,0,3],["중어중문학과","인문",8,16,2,0,3],["철학과","인문",6,15,1,0,3],["사학과","인문",7,14,1,0,3],["지리학과","인문",4,17,1,0,3],["미디어커뮤니케이션학과","인문",6,13,1,0,6],["문화콘텐츠학과","인문",4,14,1,0,3],["문과대학자유전공학부","인문",15,14,0,0,0],
  ["수학과","자연",5,7,1,0,4],["물리학과","자연",8,13,1,0,7],["화학과","자연",3,8,1,0,4],["이과대학자유전공학부","자연",11,0,0,0,0],
  ["건축학부","자연",8,20,3,1,6],["사회환경공학부","자연",7,40,4,1,7],["기계·로봇·자동차공학부","자연",19,8,3,1,5],["전기전자공학부","자연",8,38,4,1,7],["화공·생명·에너지공학부","자연",6,20,3,1,3],["인공지능학과","자연",20,0,1,0,3],["컴퓨터공학과","자연",6,24,3,1,5],["재료공학과","자연",4,22,3,1,0],["항공우주·모빌리티공학과","자연",3,9,3,1,5],["생물공학과","자연",3,15,2,1,7],["산업공학과","자연",3,8,2,0,3],["공과대학자유전공학부","자연",100,35,0,0,0],
  ["정치외교학과","인문",3,9,1,1,4],["경제학과","인문",7,23,3,1,7],["행정학과","인문",6,14,2,1,8],["국제무역학과","인문",4,14,2,1,7],["응용통계학과","인문",4,13,2,1,3],["사회과학대학융합전공학부","인문",0,8,0,0,0],["경영학과","인문",15,47,4,1,15],["기술경영학과","인문",3,10,2,1,4],["부동산학과","인문",4,15,2,1,5],
  ["첨단바이오공학부","자연",3,18,2,0,3],["생명공학부","자연",6,16,2,0,6],["식품융합학부","자연",3,24,3,1,3],["환경생태과학부","자연",3,20,3,1,3],["동물자원과학과","자연",3,16,1,1,3],["생명과학과","자연",6,14,2,0,4],["식량자원과학과","자연",3,10,2,1,3],["융합생명과학대학자유전공학부","자연",14,0,0,0,0],["수의예과","자연",5,24,3,0,6],
  ["일어교육과","인문",3,19,0,0,0],["수학교육과","자연",6,6,0,0,5],["체육교육과","예체능",0,0,0,0,0],["교육공학과","인문",0,12,0,0,0],["영어교육과","인문",6,10,0,0,0],["KU자유전공학부","인문/자연",183,65,0,0,0],
];

export const konkuk2027Departments: Department[] = rows.map(([name, category], i) => ({ id: `${universityId}-${i + 1}`, universityId, name, category }));
const byName = new Map(konkuk2027Departments.map(d => [d.name, d.id]));
const admissions: Admission[] = [];
const add = (name: string, track: string, type: Admission["type"], count: number, extra: Partial<Admission> = {}) => { if (!count) return; const departmentId = byName.get(name); if (!departmentId) return; admissions.push({ id: `${departmentId}-${track}`, universityId, departmentId, academicYear: 2027, name: track, type, 모집인원: count, source, isMock: false, ...extra }); };

for (const [name, , regional, self, opportunity, special, essay] of rows) {
  add(name, "KU지역균형", "교과", regional, { studentRecordWeight: 70, documentWeight: 30, csatMinimum: { enabled: false } });
  add(name, "KU자기추천", "학종", self, { documentWeight: 70, interview: true, csatMinimum: { enabled: false } });
  add(name, "학생부종합(기회균형)", "학종", opportunity, { documentWeight: 70, studentRecordWeight: 30, csatMinimum: { enabled: false } });
  add(name, "학생부종합(특성화고교졸업자)", "학종", special, { documentWeight: 70, studentRecordWeight: 30, csatMinimum: { enabled: false } });
  add(name, "KU논술우수자", "논술", essay, { csatMinimum: { enabled: true, description: "국어·수학·영어·탐구(1과목) 중 2개 영역 등급 합 5 이내, 한국사 5등급 이내. 수의예과는 3개 영역 합 4 이내." } });
}

add("영화예술학과", "실기(영화예술)", "기타", 25, { isAggregate: true });
add("체육교육과", "실기/실적(체육특기자)", "기타", 13, { isAggregate: true });

export const konkuk2027Admissions = admissions;
