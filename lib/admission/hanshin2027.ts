import type { Admission, Department, University } from "./types";

export const hanshin2027Universities: University[] = [{ id: "hanshin", name: "한신대학교", region: "경기" }];
const source = { type: "university" as const, academicYear: 2027, url: "https://ent.hs.ac.kr/ipsi/pages/?b=B_1_1&bn=22867&m=read&p=17", confidence: 0.98, verifiedAt: "2026-09-05" };
const units: Array<[string,string,string]> = [
  ["free","자유전공학부","자유전공"], ["theology-humanities","신학·인문융합계열","인문·사회"], ["culture","문화콘텐츠계열","문화·콘텐츠"], ["global","글로벌융합계열","인문·사회"], ["business","경영계열","경영·경제"], ["media","미디어계열","미디어·콘텐츠"], ["human-services","휴먼서비스계열","인문·사회"], ["special-physical","특수체육학계열","체육"], ["advanced","첨단융합계열","공학"], ["ai-sw","AI·SW계열","컴퓨터·AI"], ["ai-semiconductor","AI시스템반도체학","공학"],
];
export const hanshin2027Departments: Department[] = units.map(([id,name,category]) => ({ id:`hanshin-${id}`, universityId:"hanshin", name, category }));
const methods = [
  ["논술전형","논술",20,false], ["참인재전형","교과",60,true], ["학생부우수자전형","교과",100,false], ["학교장추천전형","교과",100,false], ["사회배려자전형","교과",100,false], ["고른기회전형","교과",100,false], ["체육실기전형","기타",45,false], ["기회균형선발전형","교과",100,false], ["농어촌학생전형","교과",100,false], ["특성화고교졸업자전형","교과",100,false],
] as const;
const totals: Record<string,number> = { 논술전형:231, 참인재전형:315, 학생부우수자전형:324, 학교장추천전형:55, 사회배려자전형:63, 고른기회전형:63, 체육실기전형:22, 기회균형선발전형:26, 농어촌학생전형:20, 특성화고교졸업자전형:17 };
const aggregateId = "hanshin-susi-overall";
export const hanshin2027DepartmentsWithAggregate: Department[] = [...hanshin2027Departments, { id:aggregateId, universityId:"hanshin", name:"2027 수시 전체(계열모집 합계)", category:"전체" }];
const makeAdmission = (departmentId:string, name:string, type:"교과"|"논술"|"기타", studentRecordWeight:number, interview:boolean, recruitmentCount?:number): Admission => ({ id:`${departmentId}-${name}-2027`, universityId:"hanshin", departmentId, academicYear:2027, name, type, recruitmentCount, studentRecordWeight, interview, csatMinimum:{enabled:false}, source, isMock:false });
export const hanshin2027Admissions: Admission[] = [
  ...units.flatMap(([id]) => methods.map(([name,type,weight,interview]) => makeAdmission(`hanshin-${id}`, name, type, weight, interview))),
  ...methods.map(([name,type,weight,interview]) => makeAdmission(aggregateId, name, type, weight, interview, totals[name])),
];
