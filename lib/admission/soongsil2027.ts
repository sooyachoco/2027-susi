import type { Admission, Department, University } from "./types";

export const soongsil2027Universities: University[] = [{ id:"soongsil", name:"숭실대학교", region:"서울" }];
const units: Array<[string,string,string]> = [
["christian","기독교학과","인문·사회"],["korean","국어국문학과","인문·사회"],["english","영어영문학과","인문·사회"],["german","독어독문학과","인문·사회"],["french","불어불문학과","인문·사회"],["chinese","중어중문학과","인문·사회"],["japanese","일어일문학과","인문·사회"],["philosophy","철학과","인문·사회"],["history","사학과","인문·사회"],["law","법학과","인문·사회"],["international-law","국제법무학과","인문·사회"],["social-welfare","사회복지학부","인문·사회"],["public-admin","행정학부","인문·사회"],["political","정치외교학과","인문·사회"],["sociology","사회학과","인문·사회"],["economics","경제학과","경영·경제"],["finance","금융학부","경영·경제"],["business","경영학부","경영·경제"],["accounting","회계학과","경영·경제"],["math","수학과","자연과학"],["physics","물리학과","자연과학"],["chemistry","화학과","자연과학"],["statistics","정보통계·보험수리학과","자연과학"],["life","의생명시스템학부","자연과학"],["chemical","화학공학과","공학"],["materials","신소재공학과","공학"],["electrical","전기공학부","공학"],["mechanical","기계공학부","공학"],["industrial","산업·정보시스템공학과","공학"],["architecture","건축학부","공학"],["computer","컴퓨터학부","컴퓨터·AI"],["ai-software","AI소프트웨어학부","컴퓨터·AI"],["intelligent-electronics","지능전자공학부","컴퓨터·AI"],["global-media","글로벌미디어학부","컴퓨터·AI"],["information-security","정보보호학과","컴퓨터·AI"],["free-humanities","자유전공학부(인문)","융합"],["free-natural","자유전공학부(자연)","융합"],["sports","스포츠학부","예체능"]
];
export const soongsil2027Departments: Department[] = units.map(([id,name,category])=>({id:`soongsil-${id}`,universityId:"soongsil",name,category}));
const aggregate: Department={id:"soongsil-2027-overall",universityId:"soongsil",name:"2027 수시 전체(정원내·외)",category:"전체"};
export const soongsil2027DepartmentsWithAggregate: Department[]=[...soongsil2027Departments,aggregate];
const src="https://admission.ssu.ac.kr/mojip/req.asp?flag=1&page_no=1_2_2";
const source={type:"university" as const,academicYear:2027,url:src,confidence:.99,verifiedAt:"2026-09-06"};
const admission=(id:string,dept:string,name:string,type:"교과"|"학종"|"논술"|"기타",extra:Partial<Admission>={})=>({id:`soongsil-${dept}-${id}-2027`,universityId:"soongsil",departmentId:`soongsil-${dept}`,academicYear:2027,name,type,source,isMock:false,...extra} as Admission);
const csat={enabled:true,description:"국어·수학·영어·사회/과학탐구(1과목) 중 2개 영역 등급 합 6 이내"};
export const soongsil2027Admissions: Admission[] = units.flatMap(([id])=>[
 admission("school",id,"교과우수자전형(학교장 추천)","교과",{studentRecordWeight:100,csatMinimum:csat}),
 admission("future-doc",id,"SSU미래인재전형(서류형)","학종",{documentWeight:100,csatMinimum:{enabled:false}}),
 admission("future-interview",id,"SSU미래인재전형(면접형)","학종",{documentWeight:50,interview:true,csatMinimum:{enabled:false}}),
 admission("essay",id,"논술우수자전형","논술",{studentRecordWeight:10,csatMinimum:csat})
]);
export const soongsil2027AggregateAdmissions: Admission[]=[
 admission("overall-future-interview",aggregate.id,"SSU미래인재전형(면접형)","학종",{recruitmentCount:522,documentWeight:50,interview:true}),
 admission("overall-future-doc",aggregate.id,"SSU미래인재전형(서류형)","학종",{recruitmentCount:163,documentWeight:100}),
 admission("overall-opportunity",aggregate.id,"기회균형전형","학종",{recruitmentCount:130,documentWeight:50,interview:true}),
 admission("overall-sw",aggregate.id,"SW우수자전형","학종",{recruitmentCount:17,documentWeight:50,interview:true}),
 admission("overall-special-ed",aggregate.id,"특수교육대상자전형","학종",{recruitmentCount:38,documentWeight:50,interview:true}),
 admission("overall-school",aggregate.id,"교과우수자전형(학교장 추천)","교과",{recruitmentCount:464,studentRecordWeight:100,csatMinimum:csat}),
 admission("overall-essay",aggregate.id,"논술우수자전형","논술",{recruitmentCount:248,studentRecordWeight:10,csatMinimum:csat}),
 admission("overall-info-security",aggregate.id,"정보보호특기자전형","기타",{recruitmentCount:4,documentWeight:50,interview:true}),
 admission("overall-arts",aggregate.id,"예체능우수인재전형","기타",{recruitmentCount:51}),
 admission("overall-employee",aggregate.id,"특성화고등을졸업한재직자전형","기타",{recruitmentCount:147,documentWeight:100}),
];
export const soongsil2027VerifiedTotals={futureInterview:522,futureDocument:163,opportunity:130,sw:17,specialEducation:38,school:464,essay:248,informationSecurity:4,arts:51,employee:147,regularAndSpecial:1740};
