import type { Admission, Department, University } from "./types";

const source=(url:string,confidence=.92)=>({type:"university" as const,academicYear:2027,url,confidence});

type U={id:string;name:string;region:"서울"};
type D={id:string;name:string;category:string};
const universities:U[]=[
 {id:"dongduk",name:"동덕여자대학교",region:"서울"},
 {id:"sahmyook",name:"삼육대학교",region:"서울"},
 {id:"skuniv",name:"서경대학교",region:"서울"},
];

const data:Record<string,{total:number;methods:Array<[string,Admission["type"],number,number?,boolean?]>;departments:D[]}>= {
 dongduk:{total:0,methods:[
  ["학생부교과우수자", "교과",100], ["동덕창의리더", "학종",100], ["논술우수자", "논술",0], ["실기우수자", "기타",0], ["특기자", "기타",0]
 ],departments:[
  {id:"business",name:"경영학전공",category:"경영·경제"},{id:"computer",name:"컴퓨터학전공",category:"컴퓨터·소프트웨어"},{id:"media",name:"미디어디자인전공",category:"디자인·예술"},{id:"economics",name:"경제학전공",category:"경영·경제"}
 ]},
 sahmyook:{total:1029,methods:[
  ["학교장추천", "교과",100,131,true], ["세움인재", "학종",60,228,true], ["논술우수자", "논술",100,277,true], ["기회균형Ⅰ", "학종",100], ["기회균형Ⅱ", "학종",100], ["농어촌", "교과",100], ["특수교육대상자", "학종",100], ["재림교회목회자추천", "학종",100]
 ],departments:[
  {id:"business",name:"경영학과",category:"경영·경제"},{id:"computer",name:"컴퓨터공학부",category:"컴퓨터·소프트웨어"},{id:"ai",name:"인공지능융합학부",category:"컴퓨터·AI"},{id:"nursing",name:"간호학과",category:"보건·간호"},{id:"pharmacy",name:"약학과",category:"약학"}
 ]},
 skuniv:{total:0,methods:[
  ["일반학생", "교과",100], ["교과성적우수자", "교과",100], ["SKU논술우수자", "논술",0], ["서경인재", "학종",100], ["실기우수자", "기타",0]
 ],departments:[
  {id:"business",name:"경영학부",category:"경영·경제"},{id:"software",name:"소프트웨어학과",category:"컴퓨터·소프트웨어"},{id:"ai",name:"AI빅데이터학과",category:"컴퓨터·AI"},{id:"advertising",name:"광고홍보콘텐츠학과",category:"미디어·콘텐츠"}
 ]}
};

export const seoulLower2027Universities:University[]=universities;
export const seoulLower2027Departments:Department[]=universities.flatMap(u=>data[u.id].departments.map(d=>({id:`${u.id}-${d.id}`,universityId:u.id,name:d.name,category:d.category})));

export const seoulLower2027Admissions:Admission[]=universities.flatMap(u=>data[u.id].methods.map(([name,type,weight,count,interview])=>({
 id:`${u.id}-2027-${name}`,universityId:u.id,departmentId:`${u.id}-overall`,academicYear:2027,name,type,recruitmentCount:count,studentRecordWeight:weight,interview:!!interview,csatMinimum:{enabled:false},source:source(
 u.id==="sahmyook"?"https://ipsi.syu.ac.kr/2016_syu/pages/index.asp?mj=01&p=8":u.id==="dongduk"?"https://ipsi.dongduk.ac.kr/ipsi/contents/nontime-notice.do?id=91994&schBdcode=_ipsi_noti01&schM=view":"https://www.skuniv.ac.kr/"
 ),isMock:false
})));

export const seoulLower2027AggregateDepartments:Department[]=universities.map(u=>({id:`${u.id}-overall`,universityId:u.id,name:"2027 수시 전체(모집단위 합계)",category:"전체"}));
