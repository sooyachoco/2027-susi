import type { Admission, Department, University } from "./types";
export const kookmin2027Universities: University[] = [{id:"kookmin",name:"국민대학교",region:"서울"}];
const units:Array<[string,string,string]>=[
["korean","한국어문학부","인문·사회"],["english","영어영문학부","인문·사회"],["history","한국역사학과","인문·사회"],["publicadmin","행정학과","인문·사회"],["politics","정치외교학과","인문·사회"],["economics","경제학과","경영·경제"],["business","경영학부","경영·경제"],["accounting","회계학전공","경영·경제"],["international","국제통상학과","경영·경제"],["law","법학부","인문·사회"],["architecture","건축학부","공학"],["civil","건설시스템공학부","공학"],["mechanical","기계공학부","공학"],["automotive","자동차공학과","공학"],["electrical","전자공학부","공학"],["software","소프트웨어학부","컴퓨터·소프트웨어"],["ai","인공지능학부","컴퓨터·소프트웨어"],["data","데이터사이언스학부","컴퓨터·소프트웨어"],["chemistry","나노소재전공","자연과학"],["math","수학과","자연과학"],["physics","물리학과","자연과학"],["food","식품영양학과","자연과학"],["biomedical","바이오발효융합학과","자연과학"],["bio","바이오의약학과","자연과학"],["design","시각디자인학과","예체능"],["media","미디어전공","예체능"],["sports","스포츠교육학과","예체능"],["film","공연예술학부","예체능"],["free","자유전공","융합"],["future","미래융합전공","융합"];
export const kookmin2027Departments:Department[]=units.map(([id,name,category])=>({id:`kookmin-${id}`,universityId:"kookmin",name,category}));
const src="https://admission.kookmin.ac.kr/onschedule/notice.php?ctype=view&no=1081";
const admission=(id:string,dept:string,name:string,type:"교과"|"학종"|"논술",extra:Partial<Admission>={}):Admission=>({id:`kookmin-${dept}-${id}-2027`,universityId:"kookmin",departmentId:`kookmin-${dept}`,academicYear:2027,name,type,source:{type:"university",academicYear:2027,url:src,confidence:.95},isMock:false,...extra});
export const kookmin2027Admissions:Admission[]=units.flatMap(([id])=>[
admission("kyogwa",id,"교과우수자(학교장추천)전형","교과",{studentRecordWeight:100}),
admission("frontier",id,"국민프런티어전형","학종",{interview:true}),
admission("essay",id,"논술전형","논술")
]);
export const kookmin2027VerifiedTotals={kyogwa:586,frontier:724};
