import type { Admission, Department, University } from "./types";

const source = { type: "university" as const, url: "https://www.hongik.ac.kr/kr/admission/recruitment.do?articleNo=152315", academicYear: 2027, confidence: 0.99 };

export const hongik2027Universities: University[] = [
  { id: "hongik", name: "홍익대학교", region: "서울" },
];

const seoulRows = [
  ["서울캠퍼스자율전공(자연·예능)",161,[41,67,0,0,0,0,0,53,0,0,0]],
  ["서울캠퍼스자율전공(인문·예능)",116,[29,49,0,0,0,0,0,38,0,0,0]],
  ["전자·전기공학부",127,[30,48,1,1,3,5,0,39,0,0,0]],
  ["신소재·화공시스템공학부",81,[19,30,1,1,2,3,0,25,0,0,0]],
  ["컴퓨터공학과",93,[22,34,1,1,2,4,0,29,0,0,0]],
  ["산업·데이터공학과",45,[11,16,1,0,1,2,0,14,0,0,0]],
  ["기계·시스템디자인공학과",93,[22,34,1,1,2,4,0,29,0,0,0]],
  ["건설환경공학과",31,[8,11,1,0,1,1,0,9,0,0,0]],
  ["건축학부 건축학전공(5년제)",30,[7,11,1,0,1,1,0,9,0,0,0]],
  ["건축학부 실내건축학전공",14,[3,5,0,0,1,1,0,4,0,0,0]],
  ["도시공학과",32,[8,12,1,0,1,1,0,9,0,0,0]],
  ["수학교육과",18,[5,6,1,0,1,0,0,5,0,0,0]],
  ["국어교육과",18,[5,6,0,1,1,0,0,5,0,0,0]],
  ["영어교육과",18,[5,6,1,0,1,0,0,5,0,0,0]],
  ["역사교육과",14,[4,4,0,1,1,0,0,4,0,0,0]],
  ["교육학과",18,[5,6,1,0,1,0,0,5,0,0,0]],
  ["경영학부",156,[37,58,2,2,4,5,0,48,0,0,0]],
  ["영어영문학과",20,[5,6,0,1,1,1,0,6,0,0,0]],
  ["독어독문학과",16,[4,6,0,0,1,1,0,4,0,0,0]],
  ["불어불문학과",15,[4,5,0,0,1,1,0,4,0,0,0]],
  ["국어국문학과",14,[3,5,0,0,1,1,0,4,0,0,0]],
  ["법학부",79,[19,28,1,1,2,4,0,24,0,0,0]],
  ["경제학부",27,[7,9,1,0,1,1,0,8,0,0,0]],
  ["예술학과",20,[4,5,0,0,0,1,0,4,6,0,0]],
  ["동양화과",20,[0,0,0,0,0,0,0,0,19,1,0]],
  ["회화과",39,[0,0,0,0,0,0,0,0,37,2,0]],
  ["판화과",19,[0,0,0,0,0,0,0,0,18,1,0]],
  ["조소과",19,[0,0,0,0,0,0,0,0,18,1,0]],
  ["디자인학부",70,[0,0,0,0,0,0,0,0,68,2,0]],
  ["금속조형디자인과",16,[0,0,0,0,0,0,0,0,15,1,0]],
  ["도예·유리과",16,[0,0,0,0,0,0,0,0,15,1,0]],
  ["목조형가구학과",16,[0,0,0,0,0,0,0,0,15,1,0]],
  ["섬유미술·패션디자인과",16,[0,0,0,0,0,0,0,0,15,1,0]],
  ["미술대학자율전공",63,[0,0,0,0,0,0,0,0,63,0,0]],
  ["공연예술학부 뮤지컬전공",20,[0,0,0,0,0,0,0,0,0,0,20]],
  ["공연예술학부 실용음악전공",28,[0,0,0,0,0,0,0,0,0,0,28]],
  ["디자인·예술경영학부",185,[0,0,0,0,0,0,185,0,0,0,0]],
] as const;

const sejongRows = [
  ["세종캠퍼스자율전공(자연·예능)",122,[54,37,0,0,0,0,31,0,0,0]],
  ["세종캠퍼스자율전공(인문·예능)",122,[54,37,0,0,0,0,31,0,0,0]],
  ["AID융합과학기술대학자율전공",35,[15,10,0,0,0,0,10,0,0,0]],
  ["전자전기융합공학과",39,[16,9,1,0,1,1,11,0,0,0]],
  ["소프트웨어융합학과",50,[19,10,2,1,2,2,14,0,0,0]],
  ["나노반도체공학과",34,[13,8,1,0,1,2,9,0,0,0]],
  ["건축공학부",42,[16,9,1,1,1,2,12,0,0,0]],
  ["AI기계융합공학과",35,[14,8,1,0,1,1,10,0,0,0]],
  ["조선해양모빌리티공학과",26,[10,6,0,1,1,1,7,0,0,0]],
  ["바이오화학융합공학과",34,[13,8,0,1,1,2,9,0,0,0]],
  ["게임학부 게임소프트웨어전공(공학계)",27,[10,6,1,0,1,2,7,0,0,0]],
  ["상경학부",126,[52,33,2,1,3,5,30,0,0,0]],
  ["광고홍보학부",68,[29,18,1,1,2,3,14,0,0,0]],
  ["디자인컨버전스학부",104,[0,0,0,0,0,0,0,100,4,0]],
  ["영상·애니메이션학부",55,[0,0,0,0,0,0,0,53,2,0]],
  ["게임학부 게임그래픽디자인전공(미술계)",30,[0,0,0,0,0,0,0,29,1,0]],
  ["스포츠지도학과",25,[0,0,0,0,0,0,0,0,0,25]],
] as const;

type Method = { key:string; name:string; type:Admission["type"]; studentRecordWeight?:number; documentWeight?:number; interview?:boolean; csatMinimum: Admission["csatMinimum"] };

const seoulMethods: Method[] = [
  {key:"recommend",name:"학교장추천자전형",type:"교과",studentRecordWeight:100,csatMinimum:{enabled:true,requiredSubjects:2,gradeSum:5,description:"국어·수학·영어·탐구(사회/과학) 중 2개 영역 등급 합 5 이내, 한국사 4등급 이내"}},
  {key:"school",name:"학교생활우수자전형",type:"학종",documentWeight:100,csatMinimum:{enabled:true,requiredSubjects:2,gradeSum:5,description:"국어·수학·영어·탐구(사회/과학) 중 2개 영역 등급 합 5 이내, 한국사 4등급 이내"}},
  {key:"g1",name:"고른기회Ⅰ전형",type:"학종",documentWeight:100,csatMinimum:{enabled:false}},
  {key:"g2",name:"고른기회Ⅱ전형",type:"학종",documentWeight:100,csatMinimum:{enabled:false}},
  {key:"basic",name:"기초생활수급자·차상위계층전형",type:"학종",documentWeight:100,csatMinimum:{enabled:false}},
  {key:"rural",name:"농어촌학생전형",type:"교과",studentRecordWeight:100,csatMinimum:{enabled:false}},
  {key:"worker",name:"특성화고등을졸업한재직자전형",type:"학종",documentWeight:100,csatMinimum:{enabled:false}},
  {key:"essay",name:"논술전형",type:"논술",studentRecordWeight:10,csatMinimum:{enabled:true,requiredSubjects:2,gradeSum:5,description:"국어·수학·영어·탐구(사회/과학) 중 2개 영역 등급 합 5 이내, 한국사 4등급 이내"}},
  {key:"art",name:"미술우수자전형",type:"기타",studentRecordWeight:20,documentWeight:80,interview:true,csatMinimum:{enabled:false}},
  {key:"artRural",name:"농어촌학생전형(미술계열)",type:"기타",studentRecordWeight:20,documentWeight:80,interview:true,csatMinimum:{enabled:false}},
  {key:"performance",name:"공연예술우수자전형",type:"기타",studentRecordWeight:20,csatMinimum:{enabled:false}},
];
const sejongMethods: Method[] = [
  {key:"recommend",name:"교과우수자전형",type:"교과",studentRecordWeight:100,csatMinimum:{enabled:true,requiredSubjects:2,gradeSum:5,description:"국어·수학·영어·탐구(사회/과학) 중 2개 영역 등급 합 5 이내, 한국사 4등급 이내"}},
  {key:"school",name:"학교생활우수자전형",type:"학종",documentWeight:100,csatMinimum:{enabled:false}},
  {key:"g1",name:"고른기회Ⅰ전형",type:"학종",documentWeight:100,csatMinimum:{enabled:false}},
  {key:"g2",name:"고른기회Ⅱ전형",type:"학종",documentWeight:100,csatMinimum:{enabled:false}},
  {key:"basic",name:"기초생활수급자·차상위계층전형",type:"학종",documentWeight:100,csatMinimum:{enabled:false}},
  {key:"rural",name:"농어촌학생전형",type:"교과",studentRecordWeight:100,csatMinimum:{enabled:false}},
  {key:"essay",name:"논술전형",type:"논술",studentRecordWeight:10,csatMinimum:{enabled:true,requiredSubjects:2,gradeSum:5,description:"국어·수학·영어·탐구(사회/과학) 중 2개 영역 등급 합 5 이내, 한국사 4등급 이내"}},
  {key:"art",name:"미술우수자전형",type:"기타",studentRecordWeight:20,documentWeight:80,interview:true,csatMinimum:{enabled:false}},
  {key:"artRural",name:"농어촌학생전형(미술계열)",type:"기타",studentRecordWeight:20,documentWeight:80,interview:true,csatMinimum:{enabled:false}},
  {key:"sports",name:"체육우수자전형",type:"기타",studentRecordWeight:80,csatMinimum:{enabled:false}},
];

function makeDepartments(rows: readonly (readonly [string, number, readonly number[]])[], prefix: string): Department[] {
  return rows.map(([name], index) => ({id:`${prefix}-${index+1}`,universityId:"hongik",name,category:name.includes("미술")||name.includes("디자인")||name.includes("예술")||name.includes("공연")||name.includes("체육")||name.includes("화과")||name.includes("조소")||name.includes("도예")||name.includes("판화")||name.includes("회화")||name.includes("금속")||name.includes("목조")||name.includes("섬유")?"예체능":name.includes("경영")||name.includes("경제")||name.includes("법학")||name.includes("국어")||name.includes("영어")||name.includes("독어")||name.includes("불어")||name.includes("역사")||name.includes("교육")||name.includes("광고")||name.includes("상경")?"인문·사회":"공학·자연"}));
}
export const hongikSeoul2027Departments = makeDepartments(seoulRows,"hongik-seoul");
export const hongikSejong2027Departments = makeDepartments(sejongRows,"hongik-sejong");

function makeAdmissions(rows: readonly (readonly [string, number, readonly number[]])[], methods: Method[], prefix: string): Admission[] {
  return rows.flatMap(([name, _total, counts], index) => {
    const departmentId = `${prefix}-${index+1}`;
    return methods.flatMap((method, methodIndex) => {
      const recruitmentCount = counts[methodIndex];
      if (!recruitmentCount) return [];
      return [{id:`${departmentId}-${method.key}-2027`,universityId:"hongik",departmentId,academicYear:2027,name:method.name,type:method.type,recruitmentCount,studentRecordWeight:method.studentRecordWeight,documentWeight:method.documentWeight,interview:method.interview,csatMinimum:method.csatMinimum,source,isMock:false}];
    });
  });
}
export const hongikSeoul2027Admissions = makeAdmissions(seoulRows,seoulMethods,"hongik-seoul");
export const hongikSejong2027Admissions = makeAdmissions(sejongRows,sejongMethods,"hongik-sejong");

export const hongik2027DepartmentsWithAggregate: Department[] = [
  ...hongikSeoul2027Departments,...hongikSejong2027Departments,
  {id:"hongik-susi-seoul-overall",universityId:"hongik",name:"서울캠퍼스 2027 수시 전체(전형 합계)",category:"전체"},
  {id:"hongik-susi-sejong-overall",universityId:"hongik",name:"세종캠퍼스 2027 수시 전체(전형 합계)",category:"전체"},
];

const aggregate = [
  ["서울","학교장추천자전형","교과",307],["서울","학교생활우수자전형","학종",467],["서울","고른기회Ⅰ전형","학종",15],["서울","고른기회Ⅱ전형","학종",10],["서울","기초생활수급자·차상위계층전형","학종",30],["서울","농어촌학생전형","교과",37],["서울","특성화고등을졸업한재직자전형","학종",185],["서울","논술전형","논술",384],["서울","미술우수자전형","기타",289],["서울","농어촌학생전형(미술계열)","기타",11],["서울","공연예술우수자전형","기타",48],
  ["세종","교과우수자전형","교과",315],["세종","학교생활우수자전형","학종",199],["세종","고른기회Ⅰ전형","학종",10],["세종","고른기회Ⅱ전형","학종",6],["세종","기초생활수급자·차상위계층전형","학종",14],["세종","농어촌학생전형","교과",21],["세종","논술전형","논술",195],["세종","미술우수자전형","기타",182],["세종","농어촌학생전형(미술계열)","기타",7],["세종","체육우수자전형","기타",25],
] as const;

export const hongik2027AggregateAdmissions: Admission[] = aggregate.map(([campus,name,type,recruitmentCount],index) => ({id:`hongik-susi-${campus}-${index+1}-2027`,universityId:"hongik",departmentId:`hongik-susi-${campus.toLowerCase()}-overall`,academicYear:2027,name,type:type as Admission["type"],recruitmentCount,csatMinimum:{enabled:["학교장추천자전형","논술전형","교과우수자전형"].includes(name)},source,isMock:false}));

export const hongik2027Admissions: Admission[] = [...hongikSeoul2027Admissions,...hongikSejong2027Admissions,...hongik2027AggregateAdmissions];
