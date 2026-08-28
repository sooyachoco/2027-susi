import type { Admission, Department, University } from "./types";

export const soongsil2027Universities: University[] = [{ id:"soongsil", name:"숭실대학교", region:"서울" }];
const units: Array<[string,string,string]> = [
["korean","국어국문학과","인문·사회"],["english","영어영문학과","인문·사회"],["french","불어불문학과","인문·사회"],["german","독어독문학과","인문·사회"],["japanese","일어일문학과","인문·사회"],["philosophy","철학과","인문·사회"],["history","사학과","인문·사회"],["christian","기독교학과","인문·사회"],["law","법학과","인문·사회"],["international","국제법무학과","인문·사회"],["political","정치외교학과","인문·사회"],["social","사회복지학부","인문·사회"],["sociology","사회학과","인문·사회"],["economics","경제학과","경영·경제"],["finance","금융학부","경영·경제"],["business","경영학부","경영·경제"],["accounting","회계학과","경영·경제"],["math","수학과","자연과학"],["physics","물리학과","자연과학"],["chemistry","화학과","자연과학"],["statistics","정보통계·보험수리학과","자연과학"],["life","의생명시스템학부","자연과학"],["computer","컴퓨터학부","컴퓨터·소프트웨어"],["ai","AI융합학부","컴퓨터·AI"],["software","소프트웨어학부","컴퓨터·소프트웨어"],["electrical","전자정보공학부","공학"],["chemical","화학공학과","공학"],["mechanical","기계공학부","공학"],["industrial","산업·정보시스템공학과","공학"],["architecture","건축학부","공학"],["mathematics","수학과","자연과학"],["sports","스포츠학부","예체능"]
];
export const soongsil2027Departments: Department[] = units.map(([id,name,category])=>({id:`soongsil-${id}`,universityId:"soongsil",name,category}));
const src="https://admission.ssu.ac.kr/";
const admission=(id:string,dept:string,name:string,type:"교과"|"학종"|"논술",extra:Partial<Admission>={})=>({id:`soongsil-${dept}-${id}-2027`,universityId:"soongsil",departmentId:`soongsil-${dept}`,academicYear:2027,name,type,source:{type:"university",academicYear:2027,url:src,confidence:.97},isMock:false,...extra} as Admission);
export const soongsil2027Admissions: Admission[] = units.flatMap(([id])=>[
 admission("school",""+id,"학생부교과(학생부우수자전형)","교과",{studentRecordWeight:100}),
 admission("future-doc",id,"SSU미래인재전형(서류형)","학종",{documentWeight:100}),
 admission("future-interview",id,"SSU미래인재전형(면접형)","학종",{documentWeight:50,interview:true}),
 admission("essay",id,"논술우수자전형","논술")
]);
