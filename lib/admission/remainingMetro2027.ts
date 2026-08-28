import type { Admission, Department, University } from "./types";

const universities: University[] = [
  { id: "sungkyul", name: "성결대학교", region: "경기" }, { id: "anyang", name: "안양대학교", region: "경기" },
  { id: "hanshin", name: "한신대학교", region: "경기" }, { id: "hyupsung", name: "협성대학교", region: "경기" },
  { id: "kangnam", name: "강남대학교", region: "경기" }, { id: "yongin", name: "용인대학교", region: "경기" },
  { id: "eulji", name: "을지대학교", region: "경기" }, { id: "tukorea", name: "한국공학대학교", region: "경기" },
  { id: "cha", name: "차의과학대학교", region: "경기" }, { id: "pyeongtaek", name: "평택대학교", region: "경기" },
  { id: "hansei", name: "한세대학교", region: "경기" }, { id: "shinhan", name: "신한대학교", region: "경기" },
  { id: "daejin", name: "대진대학교", region: "경기" }, { id: "hankyong", name: "한경국립대학교", region: "경기" },
  { id: "hsmu", name: "화성의과학대학교", region: "경기" }, { id: "incheon-catholic", name: "인천가톨릭대학교", region: "인천" },
  { id: "chungwoon-incheon", name: "청운대학교", region: "인천" }, { id: "kyungin", name: "경인교육대학교", region: "인천" },
  { id: "hanyang-erica", name: "한양대학교(ERICA)", region: "경기" }, { id: "kyunggi", name: "경기대학교", region: "경기" },
  { id: "catholic", name: "가톨릭대학교", region: "경기" }, { id: "hansung", name: "한성대학교", region: "서울" },
  { id: "skhu", name: "성공회대학교", region: "서울" }, { id: "swu", name: "서울여자대학교", region: "서울" },
  { id: "seoultech", name: "서울과학기술대학교", region: "서울" }, { id: "duksung", name: "덕성여자대학교", region: "서울" },
  { id: "dongduk", name: "동덕여자대학교", region: "서울" }, { id: "sahmyook", name: "삼육대학교", region: "서울" },
  { id: "skuniv", name: "서경대학교", region: "서울" },
];

const verifiedHansungDepartments: Array<[string, string, string]> = [["business","경영학부","경영·경제"],["computer","IT공과대학","컴퓨터·소프트웨어"],["ai","AI응용학과","컴퓨터·AI"]];
const verifiedSkhUDepartments: Array<[string,string,string,number,number]> = [["business","경영학부","경영·경제",22,7],["social","사회융합학부","인문·사회",33,15],["media","미디어콘텐츠융합학부","미디어·콘텐츠",31,14],["future","미래융합학부","컴퓨터·AI",18,8],["software","소프트웨어융합학부","컴퓨터·소프트웨어",37,15],["free","자유전공학부","자유전공",60,28]];
const verifiedSeoultechDepartments: Array<[string,string,string]> = [["business","경영학과","경영·경제"],["computer","컴퓨터공학과","컴퓨터·소프트웨어"],["ai","인공지능응용학과","컴퓨터·AI"],["electrical","전기정보공학과","공학"]];
const verifiedDuksungDepartments: Array<[string,string,string]> = [["business","경영학전공","경영·경제"],["computer","컴퓨터공학전공","컴퓨터·소프트웨어"],["ai","디지털소프트웨어공학부","컴퓨터·AI"],["psychology","심리학전공","인문·사회"]];
const verifiedDongdukDepartments: Array<[string,string,string]> = [["business","경영학전공","경영·경제"],["computer","컴퓨터학전공","컴퓨터·소프트웨어"],["media","미디어디자인전공","미디어·콘텐츠"],["economics","경제학전공","경영·경제"]];
const verifiedSewomenDepartments: Array<[string,string,string]> = [["business","경영학과","경영·경제"],["computer","컴퓨터학과","컴퓨터·소프트웨어"],["media","디지털미디어학과","미디어·콘텐츠"],["humanities","국어국문학과","인문·사회"]];
const verifiedSahmyookDepartments: Array<[string,string,string]> = [["business","경영학과","경영·경제"],["computer","컴퓨터공학부","컴퓨터·소프트웨어"],["ai","인공지능융합학부","컴퓨터·AI"],["health","간호학과","보건·간호"]];
const verifiedSkuDepartments: Array<[string,string,string]> = [["business","경영학부","경영·경제"],["software","소프트웨어학과","컴퓨터·소프트웨어"],["ai","AI빅데이터학과","컴퓨터·AI"],["media","광고홍보콘텐츠학과","미디어·콘텐츠"]];

const verifiedSungkyulDepartments: Array<[string,string,string]> = [["business","경영학과","경영·경제"],["logistics","글로벌물류학과","경영·경제"],["computer","컴퓨터AI공학과","컴퓨터·AI"],["media","미디어소프트웨어학과","컴퓨터·소프트웨어"]];
const verifiedAnyangDepartments: Array<[string,string,string]> = [["business","글로벌경영학과","경영·경제"],["computer","컴퓨터공학과","컴퓨터·소프트웨어"],["software","소프트웨어학과","컴퓨터·소프트웨어"],["ai","AI융합학과","컴퓨터·AI"]];
const verifiedHanshinDepartments: Array<[string,string,string]> = [["business","경영학과","경영·경제"],["software","소프트웨어학과","컴퓨터·소프트웨어"],["computer","컴퓨터공학부","컴퓨터·소프트웨어"],["media","미디어영상광고학과","미디어·콘텐츠"]];
const verifiedHyupsungDepartments: Array<[string,string,string]> = [["business","경영학과","경영·경제"],["computer","컴퓨터공학과","컴퓨터·소프트웨어"],["media","미디어영상광고학과","미디어·콘텐츠"],["writing","문예창작학과","인문·사회"]];
const verifiedKangnamDepartments: Array<[string,string,string]> = [["business","상경학부","경영·경제"],["computer","컴퓨터공학부","컴퓨터·소프트웨어"],["ai","인공지능융합공학부","컴퓨터·AI"],["social","사회복지학부","인문·사회"]];

export const remainingMetro2027Universities: University[] = [...universities,{id:"sungshin",name:"성신여자대학교",region:"서울"}];

const toDepartments = (items:Array<[string,string,string]>, universityId:string):Department[] => items.map(([id,name,category])=>({id:`${universityId}-${id}`,universityId,name,category}));
export const remainingMetro2027Departments: Department[] = [
  ...toDepartments(verifiedHansungDepartments,"hansung"),...verifiedSkhUDepartments.map(([id,name,category])=>({id:`skhu-${id}`,universityId:"skhu",name,category})),
  ...toDepartments(verifiedSeoultechDepartments,"seoultech"),...toDepartments(verifiedDuksungDepartments,"duksung"),...toDepartments(verifiedDongdukDepartments,"dongduk"),
  ...toDepartments(verifiedSewomenDepartments,"swu"),...toDepartments(verifiedSahmyookDepartments,"sahmyook"),...toDepartments(verifiedSkuDepartments,"skuniv"),
  ...toDepartments(verifiedSungkyulDepartments,"sungkyul"),...toDepartments(verifiedAnyangDepartments,"anyang"),...toDepartments(verifiedHanshinDepartments,"hanshin"),
  ...toDepartments(verifiedHyupsungDepartments,"hyupsung"),...toDepartments(verifiedKangnamDepartments,"kangnam")
];

const source=(url:string,confidence=.9)=>({type:"university" as const,academicYear:2027,url,confidence});
const basic=(items:Array<[string,string,string]>,universityId:string,url:string):Admission[]=>items.flatMap(([id])=>{const d=`${universityId}-${id}`;return[
 {id:`${d}-subject-2027`,universityId,departmentId:d,academicYear:2027,name:"학생부교과",type:"교과" as const,studentRecordWeight:100,source:source(url,.82),isMock:false},
 {id:`${d}-holistic-2027`,universityId,departmentId:d,academicYear:2027,name:"학생부종합",type:"학종" as const,documentWeight:100,source:source(url,.82),isMock:false}
]});

const verifiedHansungAdmissions:Admission[]=verifiedHansungDepartments.flatMap(([id])=>{const d=`hansung-${id}`;return[
 {id:`${d}-subject-2027`,universityId:"hansung",departmentId:d,academicYear:2027,name:"교과우수",type:"교과" as const,studentRecordWeight:100,csatMinimum:{enabled:false},source:source("https://www.hansung.ac.kr/futureplus/728/subview.do",.85),isMock:false},
 {id:`${d}-regional-2027`,universityId:"hansung",departmentId:d,academicYear:2027,name:"지역균형",type:"교과" as const,source:source("https://www.hansung.ac.kr/futureplus/728/subview.do",.85),isMock:false},
 {id:`${d}-holistic-2027`,universityId:"hansung",departmentId:d,academicYear:2027,name:"한성인재",type:"학종" as const,documentWeight:100,csatMinimum:{enabled:false},source:source("https://www.hansung.ac.kr/futureplus/728/subview.do",.85),isMock:false}
]});
const verifiedSkhUAdmissions:Admission[]=verifiedSkhUDepartments.flatMap(([id,,,holisticCount,subjectCount])=>{const d=`skhu-${id}`;return[
 {id:`${d}-holistic-2027`,universityId:"skhu",departmentId:d,academicYear:2027,name:"열린인재",type:"학종" as const,recruitmentCount:holisticCount,documentWeight:100,source:source("https://www.skhu.ac.kr/viewer/enter/52/fileDown1/fileDownload.do"),isMock:false},
 {id:`${d}-subject-2027`,universityId:"skhu",departmentId:d,academicYear:2027,name:"교과성적",type:"교과" as const,recruitmentCount:subjectCount,studentRecordWeight:100,source:source("https://www.skhu.ac.kr/viewer/enter/52/fileDown1/fileDownload.do"),isMock:false}
]});
const verifiedSeoultechAdmissions:Admission[]=verifiedSeoultechDepartments.flatMap(([id])=>{const d=`seoultech-${id}`;return[
 {id:`${d}-recommend-2027`,universityId:"seoultech",departmentId:d,academicYear:2027,name:"고교추천",type:"교과" as const,studentRecordWeight:100,source:source("https://admission.seoultech.ac.kr"),isMock:false},
 {id:`${d}-holistic-2027`,universityId:"seoultech",departmentId:d,academicYear:2027,name:"학교생활우수자",type:"학종" as const,documentWeight:100,source:source("https://admission.seoultech.ac.kr"),isMock:false}
]});
const verifiedDuksungAdmissions:Admission[]=verifiedDuksungDepartments.flatMap(([id])=>{const d=`duksung-${id}`;return[
 {id:`${d}-recommend-2027`,universityId:"duksung",departmentId:d,academicYear:2027,name:"고교추천",type:"교과" as const,source:source("https://www.ds.ac.kr/notice/view.php?bn=7205"),isMock:false},
 {id:`${d}-holistic-2027`,universityId:"duksung",departmentId:d,academicYear:2027,name:"덕성인재",type:"학종" as const,documentWeight:100,source:source("https://www.ds.ac.kr/notice/view.php?bn=7205"),isMock:false},
 {id:`${d}-essay-2027`,universityId:"duksung",departmentId:d,academicYear:2027,name:"논술",type:"논술" as const,source:source("https://www.ds.ac.kr/notice/view.php?bn=7205"),isMock:false}
]});
const verifiedDongdukAdmissions:Admission[]=verifiedDongdukDepartments.flatMap(([id])=>{const d=`dongduk-${id}`;return[
 {id:`${d}-subject-2027`,universityId:"dongduk",departmentId:d,academicYear:2027,name:"학생부교과우수자",type:"교과" as const,studentRecordWeight:100,source:source("https://ipsi.dongduk.ac.kr/ipsi/contents/nontime-viewer.do"),isMock:false},
 {id:`${d}-creative-2027`,universityId:"dongduk",departmentId:d,academicYear:2027,name:"동덕창의리더",type:"학종" as const,documentWeight:40,interview:true,source:source("https://ipsi.dongduk.ac.kr/ipsi/contents/nontime-viewer.do"),isMock:false},
 {id:`${d}-essay-2027`,universityId:"dongduk",departmentId:d,academicYear:2027,name:"논술우수자",type:"논술" as const,source:source("https://ipsi.dongduk.ac.kr/ipsi/contents/nontime-viewer.do"),isMock:false}
]});
const verifiedSewomenAdmissions:Admission[]=verifiedSewomenDepartments.flatMap(([id])=>{const d=`swu-${id}`;return[
 {id:`${d}-subject-2027`,universityId:"swu",departmentId:d,academicYear:2027,name:"교과우수자",type:"교과" as const,source:source("https://www.swu.ac.kr",.82),isMock:false},
 {id:`${d}-barom-2027`,universityId:"swu",departmentId:d,academicYear:2027,name:"바롬인재서류",type:"학종" as const,documentWeight:100,source:source("https://www.swu.ac.kr",.82),isMock:false},
 {id:`${d}-barom-interview-2027`,universityId:"swu",departmentId:d,academicYear:2027,name:"바롬인재면접",type:"학종" as const,documentWeight:100,interview:true,source:source("https://www.swu.ac.kr",.82),isMock:false}
]});
const verifiedSahmyookAdmissions:Admission[]=verifiedSahmyookDepartments.flatMap(([id])=>{const d=`sahmyook-${id}`;return[
 {id:`${d}-subject-2027`,universityId:"sahmyook",departmentId:d,academicYear:2027,name:"학생부교과",type:"교과" as const,studentRecordWeight:100,source:source("https://ipsi.syu.ac.kr/2016_syu/pages/index.asp?mj=01&p=8",.88),isMock:false},
 {id:`${d}-holistic-2027`,universityId:"sahmyook",departmentId:d,academicYear:2027,name:"학생부종합",type:"학종" as const,documentWeight:100,source:source("https://ipsi.syu.ac.kr/2016_syu/pages/index.asp?mj=01&p=8",.88),isMock:false}
]});
const verifiedSkuAdmissions:Admission[]=verifiedSkuDepartments.flatMap(([id])=>{const d=`skuniv-${id}`;return[
 {id:`${d}-subject-2027`,universityId:"skuniv",departmentId:d,academicYear:2027,name:"학생부교과",type:"교과" as const,studentRecordWeight:100,source:source("https://www.skuniv.ac.kr",.84),isMock:false},
 {id:`${d}-holistic-2027`,universityId:"skuniv",departmentId:d,academicYear:2027,name:"학생부종합",type:"학종" as const,documentWeight:100,source:source("https://www.skuniv.ac.kr",.84),isMock:false}
]});

const sungkyulAdmissions:Admission[]=verifiedSungkyulDepartments.flatMap(([id])=>{const d=`sungkyul-${id}`;const u="https://ipsi.sungkyul.ac.kr/main";return[
 {id:`${d}-subject-2027`,universityId:"sungkyul",departmentId:d,academicYear:2027,name:"교과성적우수자",type:"교과" as const,studentRecordWeight:100,source:source(u),isMock:false},
 {id:`${d}-pastor-2027`,universityId:"sungkyul",departmentId:d,academicYear:2027,name:"목회자추천자",type:"교과" as const,studentRecordWeight:70,interview:true,source:source(u),isMock:false},
 {id:`${d}-future-2027`,universityId:"sungkyul",departmentId:d,academicYear:2027,name:"미래인재",type:"교과" as const,studentRecordWeight:70,interview:true,source:source(u),isMock:false},
 {id:`${d}-sku-creative-2027`,universityId:"sungkyul",departmentId:d,academicYear:2027,name:"SKU창의",type:"교과" as const,interview:true,documentWeight:40,source:source(u),isMock:false},
 {id:`${d}-yeongam-2027`,universityId:"sungkyul",departmentId:d,academicYear:2027,name:"영암인재",type:"학종" as const,documentWeight:100,source:source(u),isMock:false}
]});
const hyupsungAdmissions:Admission[]=verifiedHyupsungDepartments.flatMap(([id])=>{const d=`hyupsung-${id}`;const u="https://iphak.uhs.ac.kr/susi/mojip.do";return[
 {id:`${d}-subject-2027`,universityId:"hyupsung",departmentId:d,academicYear:2027,name:"교과성적우수자",type:"교과" as const,studentRecordWeight:100,csatMinimum:{enabled:false},source:source(u),isMock:false},
 {id:`${d}-future-2027`,universityId:"hyupsung",departmentId:d,academicYear:2027,name:"미래창의인재",type:"교과" as const,studentRecordWeight:50,interview:true,source:source(u),isMock:false},
 {id:`${d}-wesley-2027`,universityId:"hyupsung",departmentId:d,academicYear:2027,name:"웨슬리",type:"교과" as const,studentRecordWeight:50,interview:true,source:source(u),isMock:false},
 {id:`${d}-fusion1-2027`,universityId:"hyupsung",departmentId:d,academicYear:2027,name:"융합인재Ⅰ",type:"학종" as const,documentWeight:100,source:source(u),isMock:false},
 {id:`${d}-fusion2-2027`,universityId:"hyupsung",departmentId:d,academicYear:2027,name:"융합인재Ⅱ",type:"학종" as const,documentWeight:50,interview:true,source:source(u),isMock:false}
]});
const kangnamAdmissions:Admission[]=verifiedKangnamDepartments.flatMap(([id])=>{const d=`kangnam-${id}`;const u="https://admission.kangnam.ac.kr/ipsi/yogang.htm?ctg_cd=susi1";return[
 {id:`${d}-regional-2027`,universityId:"kangnam",departmentId:d,academicYear:2027,name:"지역균형전형",type:"교과" as const,studentRecordWeight:100,source:source(u),isMock:false},
 {id:`${d}-school1-2027`,universityId:"kangnam",departmentId:d,academicYear:2027,name:"학교생활우수자전형1",type:"학종" as const,documentWeight:100,source:source(u),isMock:false},
 {id:`${d}-school2-2027`,universityId:"kangnam",departmentId:d,academicYear:2027,name:"학교생활우수자전형2",type:"학종" as const,documentWeight:70,interview:true,source:source(u),isMock:false},
 {id:`${d}-essay-2027`,universityId:"kangnam",departmentId:d,academicYear:2027,name:"논술전형",type:"논술" as const,studentRecordWeight:20,source:source(u),isMock:false}
]});

export const remainingMetro2027Admissions:Admission[]=[
 ...verifiedHansungAdmissions,...verifiedSkhUAdmissions,...verifiedSeoultechAdmissions,...verifiedDuksungAdmissions,...verifiedDongdukAdmissions,...verifiedSewomenAdmissions,...verifiedSahmyookAdmissions,...verifiedSkuAdmissions,
 ...sungkyulAdmissions,...hyupsungAdmissions,...kangnamAdmissions,
];
