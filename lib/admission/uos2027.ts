import type { Admission, Department, University } from "./types";

export const uos2027Universities: University[] = [
  { id: "uos", name: "서울시립대학교", region: "서울" },
];

const units: Array<[string,string,string]> = [
  ["publicadmin","행정학과","인문·사회"],["international","국제관계학과","인문·사회"],["economics","경제학부","경영·경제"],["socialwelfare","사회복지학과","인문·사회"],["business","경영학부","경영·경제"],["english","영어영문학과","인문·사회"],["urbanadmin","도시행정학과","인문·사회"],["urbanengineering","도시공학과","공학"],["architecture","건축학부","공학"],["transportation","교통공학과","공학"],["environment","환경공학부","공학"],["computer","컴퓨터과학부","컴퓨터·소프트웨어"],["electrical","전자전기컴퓨터공학부","공학"],["mechanical","기계정보공학과","공학"],["materials","신소재공학과","공학"],["statistics","통계학과","자연과학"],["mathematics","수학과","자연과학"],["life","생명과학과","자연과학"],["environmentalplanning","환경원예학과","자연과학"],["sports","스포츠과학과","예체능"],
];

export const uos2027Departments: Department[] = units.map(([id,name,category]) => ({ id:`uos-${id}`, universityId:"uos", name, category }));
const aggregate: Department = { id:"uos-2027-overall", universityId:"uos", name:"2027 수시 전체(전형 합계)", category:"전체" };
export const uos2027DepartmentsWithAggregate: Department[] = [...uos2027Departments, aggregate];

const src = "https://science.uos.ac.kr/admissionNew/main.do?identified=anonymous";
const admission = (id:string, dept:string, name:string, type:"교과"|"학종"|"논술", extra:Partial<Admission> = {}): Admission => ({ id:`uos-${dept}-${id}-2027`, universityId:"uos", departmentId:dept, academicYear:2027, name, type, source:{ type:"university", academicYear:2027, url:src, confidence:.99 }, isMock:false, ...extra });

export const uos2027Admissions: Admission[] = units.flatMap(([id]) => [
  admission("regional",id,"지역균형선발전형","교과",{studentRecordWeight:100}),
  admission("holistic1",id,"학생부종합전형Ⅰ(면접형)","학종",{documentWeight:50}),
  admission("holistic2",id,"학생부종합전형Ⅱ(서류형)","학종",{documentWeight:100}),
  admission("essay",id,"논술전형","논술"),
]);

export const uos2027VerifiedTotals = { regional:391, holistic1:410, holistic2:99, essay:80 };

export const uos2027AggregateAdmissions: Admission[] = [
  { id:"uos-2027-overall-regional", universityId:"uos", departmentId:aggregate.id, academicYear:2027, name:"지역균형선발전형", type:"교과", recruitmentCount:391, studentRecordWeight:100, csatMinimum:{enabled:true}, source:{type:"university",academicYear:2027,url:src,confidence:.99}, isMock:false },
  { id:"uos-2027-overall-holistic1", universityId:"uos", departmentId:aggregate.id, academicYear:2027, name:"학생부종합전형Ⅰ(면접형)", type:"학종", recruitmentCount:410, documentWeight:50, interview:true, csatMinimum:{enabled:false}, source:{type:"university",academicYear:2027,url:src,confidence:.99}, isMock:false },
  { id:"uos-2027-overall-holistic2", universityId:"uos", departmentId:aggregate.id, academicYear:2027, name:"학생부종합전형Ⅱ(서류형)", type:"학종", recruitmentCount:99, documentWeight:100, csatMinimum:{enabled:false}, source:{type:"university",academicYear:2027,url:src,confidence:.99}, isMock:false },
  { id:"uos-2027-overall-essay", universityId:"uos", departmentId:aggregate.id, academicYear:2027, name:"논술전형", type:"논술", recruitmentCount:80, csatMinimum:{enabled:true}, source:{type:"university",academicYear:2027,url:src,confidence:.99}, isMock:false },
];
