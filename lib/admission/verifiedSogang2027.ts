import type { Admission, Department, University } from "@/lib/types";

const universityId = "sogang-2027";
const source = { type: "university" as const, url: "https://admission.sogang.ac.kr/enter/html/rolling/noticeView.asp?idx=29002", document: "2027학년도 수시모집 모집요강", verifiedAt: "2026-09-06", confidence: 0.99 };

export const verifiedSogang2027Universities: University[] = [{ id: universityId, name: "서강대학교", region: "서울" }];

const names = [
  "국어국문학과","사학과","철학과","종교학과","영문학부","유럽문화학과","중국문화학과","사회학과","정치외교학과","심리학과",
  "경제학과","경영학부","신문방송학과","미디어&엔터테인먼트학과","아트&테크놀로지학과","글로벌한국학부","게페르트국제학부",
  "수학과","물리학과","화학과","생명과학과","전자공학과","화공생명공학과","기계공학과","반도체공학과","컴퓨터공학과","인공지능학과","시스템반도체공학과",
  "인문학기반자유전공학부","SCIENCE기반자유전공학부","AI기반자유전공학부",
  "인문학부","영문학부","사회과학부","지식융합미디어학부"
];
export const verifiedSogang2027Departments: Department[] = names.map((name, i) => ({ id: `${universityId}-${i+1}`, universityId, name }));
const byName = new Map(verifiedSogang2027Departments.map(d => [d.name, d.id]));
const admissions: Admission[] = [];
const add = (name: string, track: string, type: Admission["type"], count: number, extra: Partial<Admission> = {}) => { const departmentId = byName.get(name); if (!departmentId) return; admissions.push({ id: `${departmentId}-${track}`, universityId, departmentId, academicYear: 2027, name: track, type, 모집인원: count, source, isMock: false, ...extra }); };

const region: Record<string,number> = { 인문학부:12, 영문학부:10, 유럽문화학과:5, 중국문화학과:5, 사회과학부:9, 경제학과:20, 경영학부:35, 지식융합미디어학부:10, 수학과:6, 물리학과:6, 화학과:6, 생명과학과:6, 전자공학과:10, 화공생명공학과:11, 기계공학과:9, 반도체공학과:3, 컴퓨터공학과:11, 인공지능학과:3, 시스템반도체공학과:3 };
for (const [n,c] of Object.entries(region)) add(n,"학생부교과(지역균형)","교과",c,{studentRecordWeight:100,csatMinimum:{enabled:true,description:"국어·수학·영어·탐구(1과목) 4개 영역 중 3개 영역 각 3등급 이내, 한국사 4등급 이내"}});

const generalI: Record<string,number> = { 국어국문학과:10,사학과:10,철학과:10,종교학과:8,영문학부:27,유럽문화학과:18,중국문화학과:12,사회학과:10,정치외교학과:10,심리학과:10,경제학과:43,경영학부:72,신문방송학과:11,"미디어&엔터테인먼트학과":11,"아트&테크놀로지학과":11,글로벌한국학부:8,게페르트국제학부:4,수학과:14,물리학과:14,화학과:18,생명과학과:18,전자공학과:23,화공생명공학과:29,기계공학과:25,반도체공학과:13,컴퓨터공학과:29,인공지능학과:12,시스템반도체공학과:14 };
for (const [n,c] of Object.entries(generalI)) add(n,"학생부종합(일반Ⅰ)","학종",c,{documentWeight:100,csatMinimum:{enabled:false}});
const generalII: Record<string,number> = { 인문학부:8,사회과학부:8,지식융합미디어학부:8,인문학기반자유전공학부:20,SCIENCE기반자유전공학부:15,AI기반자유전공학부:15 };
for (const [n,c] of Object.entries(generalII)) add(n,"학생부종합(일반Ⅱ)","학종",c,{documentWeight:100,csatMinimum:{enabled:false}});

const equal: Record<string,number> = { 인문학부:7,영문학부:5,유럽문화학과:4,중국문화학과:3,사회과학부:5,경제학과:8,경영학부:14,지식융합미디어학부:6,수학과:3,물리학과:3,화학과:4,생명과학과:4,전자공학과:5,화공생명공학과:5,기계공학과:4,컴퓨터공학과:5 };
for (const [n,c] of Object.entries(equal)) add(n,"학생부종합(기회균형)","학종",c,{documentWeight:100,csatMinimum:{enabled:false}});
const value: Record<string,number> = { 인문학부:3,영문학부:3,사회과학부:3,경제학과:3,경영학부:3,지식융합미디어학부:3,수학과:2,물리학과:2,화학과:2,생명과학과:2,전자공학과:2,화공생명공학과:2,기계공학과:2 };
for (const [n,c] of Object.entries(value)) add(n,"학생부종합(서강가치)","학종",c,{documentWeight:100,csatMinimum:{enabled:false}});
add("경제학과","학생부종합(특성화고교졸업자)","학종",6,{documentWeight:80,interview:true,csatMinimum:{enabled:false},isAggregate:true});

const essay: Record<string,number> = { 인문학부:15,영문학부:10,사회과학부:13,경제학과:21,경영학부:38,지식융합미디어학부:10,수학과:6,물리학과:6,전자공학과:12,화공생명공학과:12,기계공학과:10,컴퓨터공학과:12,인공지능학과:3,시스템반도체공학과:3 };
for (const [n,c] of Object.entries(essay)) add(n,"논술(일반)","논술",c,{csatMinimum:{enabled:true,description:"국어·수학·영어·탐구(1과목) 4개 영역 중 3개 영역 등급 합 7 이내, 한국사 4등급 이내"}});

export const verifiedSogang2027Admissions = admissions;
