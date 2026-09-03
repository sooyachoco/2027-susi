import type { Admission, Department, University } from "./types";

const source=(url:string,confidence=.95)=>({type:"university" as const,academicYear:2027,url,confidence});

type U={id:string;name:string;region:"서울"};
type D={id:string;name:string;category:string};
const universities:U[]=[
 {id:"dongduk",name:"동덕여자대학교",region:"서울"},
 {id:"sahmyook",name:"삼육대학교",region:"서울"},
 {id:"skuniv",name:"서경대학교",region:"서울"},
];

const data:Record<string,{methods:Array<[string,Admission["type"],number,number?,boolean?,boolean?]>;departments:D[]}>= {
 dongduk:{methods:[
  ["동덕창의리더", "학종",255,40,true,false],
  ["기회균형", "학종",12,100,false,false],
  ["특성화고 등 고졸재직자", "학종",84,100,false,false],
  ["학생부교과우수자", "교과",196,100,false,true],
  ["논술우수자", "논술",266,100,false,true],
  ["실기우수자", "기타",361],
  ["특기자", "기타",12]
 ],departments:[
  {id:"overall",name:"2027 수시 전체(모집단위 합계)",category:"전체"},
  {id:"business",name:"경영융합학부",category:"경영·경제"},{id:"computer",name:"컴퓨터학부",category:"컴퓨터·소프트웨어"},{id:"media",name:"커뮤니케이션콘텐츠전공",category:"미디어·콘텐츠"},{id:"economics",name:"금융회계학부",category:"경영·경제"}
 ]},
 sahmyook:{methods:[
  ["학교장추천", "교과",131,100,false,true],
  ["세움인재", "학종",228,60,true,false],
  ["재림교회목회자추천", "학종",117,60,true,false],
  ["S/W인재", "학종",30,60,true,false],
  ["기회균형Ⅰ", "학종",38,60,true,false],
  ["논술우수자", "논술",277,100,false,true]
 ],departments:[
  {id:"overall",name:"2027 수시 전체(모집단위 합계)",category:"전체"},
  {id:"business",name:"경영학과",category:"경영·경제"},{id:"computer",name:"컴퓨터공학부",category:"컴퓨터·소프트웨어"},{id:"ai",name:"인공지능융합학부",category:"컴퓨터·AI"},{id:"nursing",name:"간호학과",category:"보건·간호"},{id:"pharmacy",name:"약학과",category:"약학"}
 ]},
 skuniv:{methods:[
  ["논술우수자", "논술",214,100,false,false],
  ["교과우수자", "교과",112,100,false,false],
  ["교과균형", "교과",204,100,false,true],
  ["사회기여자", "교과",12,100,false,false],
  ["실기우수자", "기타",419],
  ["군사학과", "기타",30],
  ["기회균형①", "교과",22,100,false,true]
 ],departments:[
  {id:"overall",name:"2027 수시 전체(모집단위 합계)",category:"전체"},
  {id:"business",name:"경영학부",category:"경영·경제"},{id:"software",name:"소프트웨어학과",category:"컴퓨터·소프트웨어"},{id:"ai",name:"AI빅데이터학과",category:"컴퓨터·AI"},{id:"advertising",name:"광고홍보영상학과",category:"미디어·콘텐츠"}
 ]}
};

export const seoulLower2027Universities:University[]=universities;
export const seoulLower2027Departments:Department[]=universities.flatMap(u=>data[u.id].departments.map(d=>({id:`${u.id}-${d.id}`,universityId:u.id,name:d.name,category:d.category})));

export const seoulLower2027Admissions:Admission[]=universities.flatMap(u=>data[u.id].methods.map(([name,type,count,studentRecordWeight,interview,csat])=>({
 id:`${u.id}-2027-${name}`,universityId:u.id,departmentId:`${u.id}-overall`,academicYear:2027,name,type,recruitmentCount:count,studentRecordWeight,interview:!!interview,csatMinimum:{enabled:!!csat},source:source(
 u.id==="sahmyook"?"https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000116":u.id==="dongduk"?"https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000102":"https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000121"
 ),isMock:false
})));

export const seoulLower2027AggregateDepartments:Department[]=universities.map(u=>({id:`${u.id}-overall`,universityId:u.id,name:"2027 수시 전체(모집단위 합계)",category:"전체"}));
