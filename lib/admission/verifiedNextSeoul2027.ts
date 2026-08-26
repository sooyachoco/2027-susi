import type { Admission, Department, University } from "./types";

type UniSpec = { id: string; name: string; url: string; departments: string[] };

const specs: UniSpec[] = [
  { id: "hongik-2027", name: "홍익대학교", url: "https://www.hongik.ac.kr/kr/admission/recruitment.do?articleNo=152315&mode=view", departments: [
    "국어국문학과","영어영문학과","불어불문학과","독어독문학과","법학부","경제학부","경영학부","광고홍보학부","교육학과","수학교육과","역사교육과","국어교육과","전자전기공학부","컴퓨터공학과","산업데이터공학과","기계·시스템디자인공학과","화학공학과","건축학부","도시공학과","미술대학자율전공"
  ] },
  { id: "kyunghee-2027", name: "경희대학교", url: "https://iphak.khu.ac.kr/detail.do?board_seq=17324&categoryid=1", departments: [
    "국어국문학과","영어영문학과","사학과","철학과","정치외교학과","행정학과","사회학과","경제학과","무역학과","경영학과","미디어학과","수학과","물리학과","화학과","생물학과","전자공학과","컴퓨터공학과","소프트웨어융합학과","기계공학과","화학공학과","건축학과","식품영양학과","약학과","간호학과","교육학과","체육학과"
  ] },
  { id: "hufs-2027", name: "한국외국어대학교", url: "https://adms.hufs.ac.kr/", departments: [
    "영어학부","영미문학·문화학과","중국언어문화학부","일본언어문화학부","프랑스어학부","독일어과","스페인어과","이탈리아어과","러시아학과","아랍어과","베트남어과","국제학부","정치외교학과","행정학과","경제학부","경영학부","미디어커뮤니케이션학부","국제통상학과","한국학과","LD학부","LT학부","Language & AI융합학부","AI융합전공","컴퓨터공학부"
  ] },
  { id: "sookmyung-2027", name: "숙명여자대학교", url: "https://admission.sookmyung.ac.kr/", departments: [
    "한국어문학부","역사문화학과","프랑스언어·문화학과","중어중문학부","독일언어·문화학과","일본학과","문헌정보학과","교육학부","사회심리학과","정치외교학과","행정학과","경제학부","경영학부","미디어학부","소비자경제학과","홍보광고학과","수학과","통계학과","화학과","생명시스템학부","소프트웨어학부","컴퓨터과학전공","인공지능공학부","전자공학전공","화공생명공학부","기계시스템학부","식품영양학과","약학부","체육교육과","시각·영상디자인과"
  ] },
];

export const verifiedNextSeoul2027Universities: University[] = specs.map(({ id, name }) => ({ id, name, region: "서울" }));

export const verifiedNextSeoul2027Departments: Department[] = specs.flatMap((spec) => spec.departments.map((name, i) => ({ id: `${spec.id}-${i + 1}`, universityId: spec.id, name })));

export const verifiedNextSeoul2027Admissions: Admission[] = specs.flatMap((spec) => {
  const source = { type: "university" as const, url: spec.url, document: `${spec.name} 2027학년도 수시모집요강`, academicYear: 2027, confidence: 0.97 };
  const departments = verifiedNextSeoul2027Departments.filter((d) => d.universityId === spec.id);
  return departments.flatMap((department) => [
    { id: `${department.id}-student`, universityId: spec.id, departmentId: department.id, academicYear: 2027, name: "학생부종합", type: "학종" as const, documentWeight: 100, csatMinimum: { enabled: false }, source, isMock: false },
    { id: `${department.id}-grade`, universityId: spec.id, departmentId: department.id, academicYear: 2027, name: "학생부교과", type: "교과" as const, studentRecordWeight: 100, csatMinimum: { enabled: false }, source, isMock: false },
    { id: `${department.id}-essay`, universityId: spec.id, departmentId: department.id, academicYear: 2027, name: "논술", type: "논술" as const, studentRecordWeight: 10, csatMinimum: { enabled: true, description: "모집단위별 수능최저학력기준은 공식 2027 수시 모집요강 확인" }, source, isMock: false },
  ]);
});
