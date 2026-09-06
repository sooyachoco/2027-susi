import type { Admission, Department, University } from "./types";

export const verifiedSnu2027Universities: University[] = [
  { id: "snu-2027", name: "서울대학교", region: "서울" },
];

const source = {
  type: "university" as const,
  url: "https://admission.snu.ac.kr/webdata/admission/files/2027susi.pdf",
  document: "2027학년도 대학 신입학생 수시모집 안내",
  academicYear: 2027,
  verifiedAt: "2026-09-06",
  confidence: 1,
};

const rows: Array<[string, number, number, number]> = [
  ["자유전공학부",20,48,6], ["인문계열",27,0,14],["국어국문학과",0,9,0],["중어중문학과",0,9,0],["영어영문학과",0,8,0],["불어불문학과",0,9,0],["독어독문학과",0,9,0],["노어노문학과",0,9,0],["서어서문학과",0,9,0],["언어학과",0,9,0],["아시아언어문명학부",0,9,0],["역사학부",9,9,0],["고고미술사학과",0,9,0],["철학과",0,9,0],["종교학과",0,9,0],["미학과",0,9,0],
  ["정치외교학부",17,25,4],["경제학부",7,60,8],["사회학과",6,10,1],["인류학과",0,12,1],["심리학과",6,8,1],["지리학과",6,9,1],["사회복지학과",6,7,1],["언론정보학과",5,8,1],
  ["수리과학부",7,16,2],["통계학과",6,13,2],["물리학전공",8,20,2],["천문학전공",0,6,0],["화학부",7,21,2],["생명과학부",7,27,3],["지구환경과학부",5,20,2],
  ["간호대학",10,27,3],["경영대학",26,47,7], ["건설환경도시공학부",8,26,2],["기계공학부",16,54,6],["재료공학부",18,44,6],["전기·정보공학부",11,80,8],["컴퓨터공학부",9,36,4],["화학생물공학부",15,47,5],["건축학과",8,25,2],["산업공학과",4,18,2],["에너지자원공학과",5,15,1],["원자핵공학과",9,15,2],["조선해양공학과",6,22,1],["항공우주공학과",4,18,2],
  ["농경제사회학부",11,15,2],["식물생산과학부",6,24,3],["산림과학부",5,19,2],["식품·동물생명공학부",6,16,2],["응용생물화학부",9,15,2],["조경·지역시스템공학부",5,14,2],["바이오시스템·소재학부",10,20,3],["스마트시스템과학과",4,10,1],
  ["동양화과",0,0,1],["서양화과",0,0,1],["조소과",0,0,1],["공예과",0,0,1],["디자인과",0,7,1], ["교육학과",0,11,1],["국어교육과",5,9,1],["영어교육과",4,12,1],["독어교육과",4,10,1],["불어교육과",4,10,1],["사회교육과",5,6,1],["역사교육과",5,6,1],["지리교육과",5,6,1],["윤리교육과",3,9,1],["수학교육과",4,11,1],["물리교육과",3,7,1],["화학교육과",6,7,1],["생물교육과",5,7,1],["지구과학교육과",3,9,1],["체육교육과",4,0,2],
  ["소비자학전공",6,8,1],["아동가족학전공",5,10,1],["식품영양학과",4,12,2],["의류학과",8,12,1],["수의예과",6,17,2],["약학계열",11,29,3],["성악과",0,0,1],["작곡과",0,0,1],["음악학과",0,0,0],["피아노과",0,23,1],["관현악과",0,48,1],["국악과",0,28,0],["의학과",39,50,7],["첨단융합학부",30,98,20],["치의학과",0,25,0],
];

export const verifiedSnu2027Departments: Department[] = rows.map(([name], i) => ({ id: `snu-2027-${i + 1}`, universityId: "snu-2027", name }));

export const verifiedSnu2027Admissions: Admission[] = verifiedSnu2027Departments.flatMap((department, i) => {
  const [, region, general, social] = rows[i];
  const admissions: Admission[] = [];
  if (region > 0) {
    const admission = { id: `${department.id}-region`, universityId: "snu-2027", departmentId: department.id, academicYear: 2027, name: "학생부종합(지역균형전형)", type: "학종", documentWeight: 100, interview: true, csatMinimum: { enabled: true, description: "전 모집단위 수능최저 적용. 모집단위별 응시영역기준 별도 적용." }, source, isMock: false } as Admission;
    Object.assign(admission, { 모집인원: region });
    admissions.push(admission);
  }
  if (general > 0) {
    const admission = { id: `${department.id}-general`, universityId: "snu-2027", departmentId: department.id, academicYear: 2027, name: "학생부종합(일반전형)", type: "학종", documentWeight: 100, interview: true, csatMinimum: { enabled: department.name === "디자인과", description: department.name === "디자인과" ? "미술대학 디자인과에 한하여 수능 응시영역기준 및 최저학력기준 적용." : "수능최저 없음" }, source, isMock: false } as Admission;
    Object.assign(admission, { 모집인원: general });
    admissions.push(admission);
  }
  if (social > 0) {
    const admission = { id: `${department.id}-social`, universityId: "snu-2027", departmentId: department.id, academicYear: 2027, name: "학생부종합(기회균형특별전형(사회통합))", type: "학종", documentWeight: 100, interview: true, csatMinimum: { enabled: false }, source, isMock: false } as Admission;
    Object.assign(admission, { 모집인원: social });
    admissions.push(admission);
  }
  return admissions;
});

export const verifiedSnu2027Total = { region: 523, general: 1529, social: 181, total: 2233 };
