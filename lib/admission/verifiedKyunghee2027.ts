import type { Admission, Department, University } from "@/lib/types";

const universityId = "kyunghee-2027";
const source = { type: "university" as const, url: "https://iphak.khu.ac.kr/submenu.do?board_seq=4443&categoryid=&menuurl=RnNfVbLHUGrJz9kJgEyRDQ%3D%3D", document: "2027학년도 경희대학교 수시모집요강", academicYear: 2027, verifiedAt: "2026-09-06", confidence: 0.99 };

export const verifiedKyunghee2027Universities: University[] = [{ id: universityId, name: "경희대학교", region: "서울" }];

type Row = [string, string, number, number, number, number];
const rows: Row[] = [
["자율전공학부","인문·자연",54,32,3,2],["국어국문학과","인문",6,20,2,2],["영어영문학과","인문",4,11,2,1],["응용영어통번역학과","인문",4,12,2,1],["사학과","인문",5,14,2,2],["철학과","인문",3,10,2,0],["프랑스어학과","인문",3,14,2,3],["스페인어학과","인문",3,14,2,3],["러시아어학과","인문",3,13,2,4],["중국어학과","인문",3,18,2,4],["일본어학과","인문",3,16,2,3],["한국어학과","인문",3,8,2,2],["글로벌커뮤니케이션학부","인문",4,23,2,3],["정치외교학과","인문",5,14,2,2],["행정학과","인문",12,14,3,2],["사회학과","인문",6,8,2,2],["경제학과","인문",12,20,3,2],["무역학과","인문",10,16,3,2],["미디어학과","인문",10,25,3,2],["국제학과","인문",10,55,3,4],["경영학과","인문",23,43,6,4],["회계학과","인문",2,8,3,2],["빅데이터응용학과","자연",2,6,4,0],["Hospitality경영학과","인문",13,28,2,2],["조리&푸드디자인학과","인문",3,22,2,2],["관광·엔터테인먼트학부","인문",8,21,2,2],["아동가족학과","인문",6,6,2,2],["주거환경학과","자연",4,3,2,0],["의상학과","인문",4,10,2,0],["지리학과(인문)","인문",4,5,2,2],["한의예과(인문)","인문·의학",3,9,5,0],["식품영양학과","자연",4,9,3,0],["수학과","자연",6,8,3,0],["물리학과","자연",7,13,2,0],["화학과","자연",8,13,3,2],["생물학과","자연",10,16,3,2],["의예과","의학",11,25,19,55],["치의예과","의학",8,19,13,40],["약학과","약학",4,9,7,20],["한약학과","약학",3,9,2,6],["약과학과","자연",6,9,3,2],["간호학과","자연",14,18,4,4],
];

export const verifiedKyunghee2027Departments: Department[] = rows.map(([name, category]) => ({ id: `${universityId}-${name}`, universityId, name, category }));
const dept = (name: string) => `${universityId}-${name}`;
const make = (name: string, key: string, track: string, type: Admission["type"], count: number, extra: Partial<Admission> = {}): Admission => ({ id: `${dept(name)}-${key}`, universityId, departmentId: dept(name), academicYear: 2027, name: track, type, recruitmentCount: count, source, isMock: false, ...extra });

const admissions: Admission[] = [];
for (const [name, category, regional, neo, opportunity, essay] of rows) {
  if (regional) admissions.push(make(name,"regional","학생부교과(지역균형전형)","교과",regional,{studentRecordWeight:70,csatMinimum:{enabled:true,description:"인문·자연: 국어·수학·영어·사/과탐 중 2개 합 5 이내, 한국사 5등급 이내; 의·한·치·약: 3개 합 4 이내"}}));
  if (neo) admissions.push(make(name,"neo","학생부종합(네오르네상스전형)","학종",neo,{documentWeight:70,interview:true,csatMinimum:{enabled:false}}));
  if (opportunity) admissions.push(make(name,"opportunity","학생부종합(기회균형전형Ⅰ)","학종",opportunity,{documentWeight:70,csatMinimum:{enabled:false}}));
  if (essay) admissions.push(make(name,"essay","논술(논술우수자전형)","논술",essay,{csatMinimum:{enabled:true,description:"인문·자연: 국어·수학·영어·사/과탐 중 2개 합 5 이내, 한국사 5등급 이내; 의·한·치·약: 3개 합 4 이내"}}));
}
const aggregate = (name: string, key: string, track: string, type: Admission["type"], count: number, extra: Partial<Admission> = {}) => admissions.push({id:`${universityId}-${key}`,universityId,departmentId:dept(name),academicYear:2027,name:track,type,recruitmentCount:count,source,isMock:false,isAggregate:true,...extra});
aggregate("기회균형Ⅱ(통합)","opportunity2","학생부종합(기회균형전형Ⅱ)","학종",90,{documentWeight:70});
aggregate("장애인 등 대상자(서울 통합)","disabled","학생부종합(기회균형전형Ⅰ-장애인 등 대상자)","학종",10,{documentWeight:70,interview:true});
aggregate("특성화고 등을 졸업한 재직자(서울)","employee","학생부교과(기회균형전형Ⅰ-특성화고 등을 졸업한 재직자)","교과",223,{studentRecordWeight:30,documentWeight:70});

export const verifiedKyunghee2027Admissions: Admission[] = admissions;
