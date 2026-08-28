import type { Admission, Department, University } from "./types";

export const dankookCheonan2027Universities: University[] = [{ id: "dankook-cheonan", name: "단국대학교 천안캠퍼스", region: "충남" }];

const units: Array<[string,string,string]> = [
  ["korean", "국어국문학과", "인문·사회"], ["english", "영어과", "인문·사회"], ["history", "역사학과", "인문·사회"], ["publicadmin", "공공정책학과", "인문·사회"], ["psychology", "심리치료학과", "인문·사회"], ["business", "경영학부", "경영·경제"], ["law", "법학과", "인문·사회"], ["nursing", "간호학과", "보건·의료"], ["pharmacy", "약학과", "보건·의료"], ["medicine", "의예과", "보건·의료"], ["dentistry", "치의예과", "보건·의료"], ["publichealth", "보건행정학과", "보건·의료"], ["physicaltherapy", "물리치료학과", "보건·의료"], ["occupational", "작업치료학과", "보건·의료"], ["radiology", "방사선학과", "보건·의료"], ["biomedical", "생명과학부", "자연과학"], ["chemistry", "화학과", "자연과학"], ["food", "식품영양학과", "자연과학"], ["computer", "컴퓨터공학과", "컴퓨터·소프트웨어"], ["software", "소프트웨어학과", "컴퓨터·소프트웨어"], ["ai", "인공지능학과", "컴퓨터·소프트웨어"], ["mechanical", "기계공학과", "공학"], ["materials", "신소재공학과", "공학"], ["architecture", "건축학과", "공학"], ["sports", "생활체육학과", "예체능"]
];

export const dankookCheonan2027Departments: Department[] = units.map(([id,name,category]) => ({ id:`dankook-cheonan-${id}`, universityId:"dankook-cheonan", name, category }));
const src = "https://ipsi.dankook.ac.kr/cheonan/dataroom/list.html?bbsid=juk_info&bltn_seq=50954";
const admission = (id:string, dept:string, name:string, type:"교과"|"학종"|"논술", extra:Partial<Admission> = {}): Admission => ({ id:`dankook-cheonan-${dept}-${id}-2027`, universityId:"dankook-cheonan", departmentId:`dankook-cheonan-${dept}`, academicYear:2027, name, type, source:{ type:"university", academicYear:2027, url:src, confidence:.95 }, isMock:false, ...extra });

export const dankookCheonan2027Admissions: Admission[] = units.flatMap(([id]) => [
  admission("regional", id, "학생부교과우수자전형", "교과"),
  admission("holistic", id, "학생부종합전형", "학종"),
  admission("essay", id, "논술우수자전형", "논술")
]);
