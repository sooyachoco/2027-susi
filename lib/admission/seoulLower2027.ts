import type { Admission, Department, University } from "./types";

const source=(url:string,confidence=.95)=>({type:"university" as const,academicYear:2027,url,confidence});

type U={id:string;name:string;region:"서울"};
type D={id:string;name:string;category:string};
type Method={name:string;type:Admission["type"];count:number;studentRecordWeight?:number;documentWeight?:number;interview?:boolean;csat?:boolean};
const universities:U[]=[
 {id:"dongduk",name:"동덕여자대학교",region:"서울"},
 {id:"sahmyook",name:"삼육대학교",region:"서울"},
 {id:"skuniv",name:"서경대학교",region:"서울"},
];

const data:Record<string,{methods:Method[];departments:D[]}>= {
 dongduk:{methods:[
  {name:"동덕창의리더",type:"학종",count:255,documentWeight:60,interview:true},
  {name:"기회균형",type:"학종",count:12,documentWeight:100},
  {name:"특성화고 등 고졸재직자",type:"학종",count:84,documentWeight:100},
  {name:"학생부교과우수자",type:"교과",count:196,studentRecordWeight:100,csat:true},
  {name:"논술우수자",type:"논술",count:266,csat:true},
  {name:"실기우수자",type:"기타",count:361},
  {name:"특기자",type:"기타",count:12}
 ],departments:[
  {id:"overall",name:"2027 수시 전체(모집단위 합계)",category:"전체"},
  {id:"business",name:"경영융합학부",category:"경영·경제"},{id:"computer",name:"컴퓨터학부",category:"컴퓨터·소프트웨어"},{id:"media",name:"커뮤니케이션콘텐츠전공",category:"미디어·콘텐츠"},{id:"economics",name:"금융회계학부",category:"경영·경제"}
 ]},
 sahmyook:{methods:[
  {name:"학교장추천",type:"교과",count:131,studentRecordWeight:100,csat:true},
  {name:"세움인재",type:"학종",count:228,documentWeight:60,interview:true},
  {name:"재림교회목회자추천",type:"학종",count:117,documentWeight:60,interview:true},
  {name:"S/W인재",type:"학종",count:30,documentWeight:60,interview:true},
  {name:"기회균형Ⅰ",type:"학종",count:38,documentWeight:60,interview:true},
  {name:"논술우수자",type:"논술",count:277,csat:true}
 ],departments:[
  {id:"overall",name:"2027 수시 전체(모집단위 합계)",category:"전체"},
  {id:"business",name:"경영학과",category:"경영·경제"},{id:"computer",name:"컴퓨터공학부",category:"컴퓨터·소프트웨어"},{id:"ai",name:"인공지능융합학부",category:"컴퓨터·AI"},{id:"nursing",name:"간호학과",category:"보건·간호"},{id:"pharmacy",name:"약학과",category:"약학"}
 ]},
 skuniv:{methods:[
  {name:"논술우수자",type:"논술",count:214},
  {name:"교과우수자",type:"교과",count:112,studentRecordWeight:100},
  {name:"교과균형",type:"교과",count:204,studentRecordWeight:100,csat:true},
  {name:"사회기여자",type:"교과",count:12,studentRecordWeight:100},
  {name:"실기우수자",type:"기타",count:419},
  {name:"군사학과",type:"기타",count:30},
  {name:"기회균형①",type:"교과",count:22,studentRecordWeight:100,csat:true}
 ],departments:[
  {id:"overall",name:"2027 수시 전체(모집단위 합계)",category:"전체"},
  {id:"business",name:"경영학부",category:"경영·경제"},{id:"software",name:"소프트웨어학과",category:"컴퓨터·소프트웨어"},{id:"ai",name:"AI빅데이터학과",category:"컴퓨터·AI"},{id:"advertising",name:"광고홍보영상학과",category:"미디어·콘텐츠"}
 ]}
};

export const seoulLower2027Universities:University[]=universities;
export const seoulLower2027Departments:Department[]=universities.flatMap(u=>data[u.id].departments.map(d=>({id:`${u.id}-${d.id}`,universityId:u.id,name:d.name,category:d.category})));

export const seoulLower2027Admissions:Admission[]=universities.flatMap(u=>data[u.id].methods.map(m=>({
 id:`${u.id}-2027-${m.name}`,universityId:u.id,departmentId:`${u.id}-overall`,academicYear:2027,name:m.name,type:m.type,recruitmentCount:m.count,
 ...(m.studentRecordWeight!==undefined?{studentRecordWeight:m.studentRecordWeight}:{}),
 ...(m.documentWeight!==undefined?{documentWeight:m.documentWeight}:{}),
 ...(m.interview?{interview:true}:{}),csatMinimum:{enabled:!!m.csat},source:source(
 u.id==="sahmyook"?"https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000116":u.id==="dongduk"?"https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000102":"https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000121"
 ),isMock:false
})));

export const seoulLower2027AggregateDepartments:Department[]=universities.map(u=>({id:`${u.id}-overall`,universityId:u.id,name:"2027 수시 전체(모집단위 합계)",category:"전체"}));
