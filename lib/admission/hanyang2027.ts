import type { Admission, Department, University } from "./types";

export const hanyang2027Universities: University[] = [{ id: "hanyang", name: "한양대학교", region: "서울" }];

const source = { type: "university" as const, academicYear: 2027, url: "https://go.hanyang.ac.kr/web/mojib/mojib.do?m_type=SUSI&m_year=2027", confidence: 0.99, verifiedAt: "2026-09-06" };

type Row = [string, string, number, number, number, number, number, number, number, number];
// [id, name, 교과추천, 종합추천, 서류형, 면접형, 고른기회, 사회통합, 논술, 실기]
const rows: Row[] = [
  ["arch5", "건축학부(5년제)", 5,0,10,0,2,0,4,0], ["archeng", "건축공학부", 5,0,9,0,3,0,4,0], ["civil", "건설환경공학과", 6,0,11,0,4,0,4,0], ["urban", "도시공학과", 5,0,8,0,3,0,4,0], ["resource", "자원환경공학과", 3,0,10,0,2,0,0,0],
  ["electronic", "융합전자공학부",17,10,28,10,4,0,10,0], ["computer", "컴퓨터소프트웨어학부",13,11,13,13,4,0,10,0], ["infosys", "정보시스템학과(상경)",5,0,6,0,2,0,4,0], ["electric", "전기·생체공학부(전기공학전공)",5,5,7,6,4,0,5,0], ["biomedical", "전기·생체공학부(바이오메디컬공학전공)",0,4,4,4,0,0,0,0], ["materials", "신소재공학부",8,5,7,7,4,0,7,0], ["chemical", "화학공학과",5,5,4,4,4,0,4,0], ["bioeng", "생명공학과",3,0,9,0,0,0,0,0], ["nano", "유기나노공학과",4,0,8,0,2,0,0,0], ["energy", "에너지공학과",4,0,5,5,2,0,0,0], ["mechanical", "기계공학부",17,11,14,14,4,0,9,0], ["nuclear", "원자력공학과",5,0,9,0,2,0,0,0], ["industrial", "산업공학과",5,0,7,0,2,0,5,0], ["automotive", "미래자동차공학과",6,0,14,4,2,0,5,0], ["data", "데이터사이언스학부",9,12,14,6,0,0,0,0], ["semiconductor", "반도체공학과",6,0,22,0,0,0,4,0],
  ["medicine", "의예과",0,40,0,16,2,0,8,0], ["nursing", "간호학과",4,6,7,0,3,0,5,0],
  ["korean", "국어국문학과",4,0,7,0,2,0,4,0], ["chinese", "중어중문학과",6,7,7,0,2,0,0,0], ["english", "영어영문학과",7,8,8,0,2,0,0,0], ["german", "독어독문학과",4,6,7,0,0,0,0,0], ["history", "사학과",3,0,6,0,0,0,4,0], ["philosophy", "철학과",3,0,4,0,0,0,3,0],
  ["political", "정치외교학과",4,0,8,0,0,0,4,0], ["sociology", "사회학과",4,0,8,0,0,0,4,0], ["media", "미디어커뮤니케이션학과",5,7,6,0,2,0,5,0], ["tourism", "관광학부",5,4,5,0,2,0,4,0],
  ["math", "수학과",5,0,9,0,3,0,8,0], ["physics", "물리학과",4,0,11,0,2,0,5,0], ["chemistry", "화학과",6,0,14,0,3,0,5,0], ["life", "생명과학과",6,0,13,0,3,0,5,0],
  ["policy", "정책학과",9,17,17,0,4,0,4,0], ["public", "행정학과",5,6,6,0,2,0,0,0], ["economics", "경제금융학부",9,17,10,0,4,0,9,0], ["business", "경영학부",26,30,50,0,4,0,12,0], ["finance", "파이낸스경영학과",5,7,7,0,2,0,4,0],
  ["education", "교육학과",3,0,0,6,2,0,0,0], ["edutech", "교육공학과",3,0,0,6,2,0,0,0], ["kor-edu", "국어교육과",4,0,0,8,2,0,0,0], ["eng-edu", "영어교육과",4,0,0,6,2,0,0,0], ["math-edu", "수학교육과",3,0,0,3,2,0,3,0], ["applied-art-edu", "응용미술교육과",0,0,0,0,0,0,0,22],
  ["fashion", "의류학과",9,6,6,0,2,0,0,0], ["food-nutrition", "식품영양학과",8,5,6,0,2,0,4,0], ["interior", "실내건축디자인학과",10,6,6,0,2,0,0,0],
  ["orchestra", "관현악과",0,0,0,0,0,0,0,10], ["korean-music", "국악과",0,0,0,0,0,0,0,32], ["sports-mgmt", "스포츠산업과학부(스포츠매니지먼트전공)",0,0,7,0,0,0,0,6], ["sports-science", "스포츠산업과학부(스포츠사이언스전공)",0,0,6,0,0,0,0,6], ["film", "연극영화학과(영화)",0,0,7,0,0,0,4,0], ["acting", "연극영화학과(연기)",0,0,0,0,0,0,0,2], ["dance", "무용학과",0,0,0,0,0,0,0,32], ["international", "국제학부",0,20,16,0,0,0,0,0],
  // 총괄표에서 인문·자연 모집인원이 병합되어 교과추천 42로 인쇄된 한양인터칼리지학부는 합계 보존을 위해 단일 모집단위로 저장.
  ["intercollege", "한양인터칼리지학부",42,45,35,20,5,5,50,0],
  ["employment", "산업융합학부",0,0,0,0,0,0,0,0],
];

export const hanyang2027Departments: Department[] = rows.map(([id,name]) => ({ id:`hanyang-${id}`, universityId:"hanyang", name, category:"2027수시" }));

const admissions: Admission[] = [];
const add = (id:string, name:string, track:string, type:Admission["type"], count:number, extra:Partial<Admission>={}) => {
  if (!count) return;
  const departmentId = `hanyang-${id}`;
  const a = { id:`hanyang-${id}-${track}-2027`, universityId:"hanyang", departmentId, academicYear:2027, name:track, type, source, isMock:false, recruitmentCount:count, ...extra } as Admission;
  admissions.push(a);
};

for (const [id,name,regional,recommended,document,interview,opportunity,social,essay,practical] of rows) {
  add(id,name,"학생부교과(추천형)","교과",regional,{studentRecordWeight:90, csatMinimum:{enabled:true,description:"자연·인문·상경: 국어·수학·영어·탐구(상위1) 중 3개 영역 등급합 7 이내. 필수 응시: 국어·수학·영어·사탐 또는 과탐 2과목·한국사."}});
  add(id,name,"학생부종합(추천형)","학종",recommended,{documentWeight:100,csatMinimum:{enabled:true,description:"자연·인문·상경: 국어·수학·영어·탐구(상위1) 중 3개 영역 등급합 7 이내. 필수 응시: 국어·수학·영어·사탐 또는 과탐 2과목·한국사."}});
  add(id,name,"학생부종합(서류형)","학종",document,{documentWeight:100,csatMinimum:{enabled:false}});
  add(id,name,"학생부종합(면접형)","학종",interview,{documentWeight:70,interview:true,csatMinimum:{enabled:false}});
  add(id,name,"학생부종합(고른기회)","학종",opportunity,{documentWeight:100,csatMinimum:{enabled:false}});
  add(id,name,"학생부종합(사회통합)","학종",social,{documentWeight:100,csatMinimum:{enabled:false}});
  add(id,name,"논술", "논술",essay,{csatMinimum:{enabled:true,description:"국어·수학·영어·탐구(상위1) 중 3개 영역 등급합 7 이내. 의예과 포함 동일 기준."}});
  add(id,name,"실기/실적", "기타",practical);
}
add("employment","산업융합학부","학생부종합(특성화고졸재직자·정원외)","학종",158,{documentWeight:100,csatMinimum:{enabled:false}});

export const hanyang2027Admissions = admissions;
