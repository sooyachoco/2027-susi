import type { Admission, Department, University } from "./types";

export const skku2027Universities: University[] = [
  { id: "skku", name: "성균관대학교", region: "서울" },
];

const units: Array<[string,string,string]> = [
  ["humanities","인문과학계열","인문·사회"],
  ["social","사회과학계열","인문·사회"],
  ["economics","경제학과","경영·경제"],
  ["business","경영학과","경영·경제"],
  ["education","교육학과","교육"],
  ["korean","국어국문학과","인문·사회"],
  ["english","영어영문학과","인문·사회"],
  ["psychology","심리학과","인문·사회"],
  ["media","미디어커뮤니케이션학과","미디어·콘텐츠"],
  ["natural","자연과학계열","자연과학"],
  ["mathematics","수학과","자연과학"],
  ["physics","물리학과","자연과학"],
  ["chemistry","화학과","자연과학"],
  ["life","생명과학과","자연과학"],
  ["engineering","공학계열","공학"],
  ["chemical","화학공학/고분자공학부","공학"],
  ["mechanical","기계공학부","공학"],
  ["electrical","전자전기공학부","공학"],
  ["software","소프트웨어학과","컴퓨터·소프트웨어"],
  ["computer","컴퓨터교육과","컴퓨터·소프트웨어"],
  ["architecture","건축학과","공학"],
  ["pharmacy","약학과","보건·의료"],
  ["medicine","의예과","보건·의료"],
  ["globalbusiness","글로벌경영학과","경영·경제"],
  ["globaleco","글로벌경제학과","경영·경제"],
  ["bio","바이오의약융합전공","자연과학"],
];

export const skku2027Departments: Department[] = units.map(([id,name,category]) => ({ id:`skku-${id}`, universityId:"skku", name, category }));
const src = "https://admission.skku.edu/admission/html/rolling/noticeView.html?idx=59468";
const admission = (id:string, dept:string, name:string, type:"교과"|"학종"|"논술", extra:Partial<Admission> = {}): Admission => ({ id:`skku-${dept}-${id}-2027`, universityId:"skku", departmentId:`skku-${dept}`, academicYear:2027, name, type, source:{type:"university",academicYear:2027,url:src,confidence:.95}, isMock:false, ...extra });

export const skku2027Admissions: Admission[] = units.flatMap(([id]) => [
  admission("recommend",id,"학생부교과(추천인재)전형","교과",{studentRecordWeight:100}),
  admission("student",id,"학생부종합(성균인재)전형","학종",{documentWeight:100}),
  admission("explore",id,"학생부종합(탐구형)전형","학종",{documentWeight:100}),
  admission("fusion",id,"학생부종합(융합인재)전형","학종",{documentWeight:100}),
  admission("essay",id,"논술우수전형","논술"),
]);
