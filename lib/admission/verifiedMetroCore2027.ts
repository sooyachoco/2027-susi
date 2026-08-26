import type { Admission, Department, University } from "./types";
import { admissionSources } from "./sources";

/**
 * 2027 수도권 핵심 대학 확장 데이터.
 * 모집요강/대입정보포털에서 확인된 대학·모집단위와 전형 구조만 기록한다.
 */
export const verifiedMetroCore2027Universities: University[] = [
  { id: "ajou", name: "아주대학교", region: "경기" },
  { id: "inha", name: "인하대학교", region: "인천" },
  { id: "incheon", name: "인천대학교", region: "인천" },
  { id: "dankook-jukjeon", name: "단국대학교", region: "경기" },
  { id: "kau", name: "한국항공대학교", region: "경기" },
];

export const verifiedMetroCore2027Departments: Department[] = [
  { id: "ajou-business", universityId: "ajou", name: "경영학과", category: "경영·경제" },
  { id: "ajou-economics", universityId: "ajou", name: "경제학과", category: "경영·경제" },
  { id: "ajou-law", universityId: "ajou", name: "법학과", category: "법·행정" },
  { id: "ajou-psychology", universityId: "ajou", name: "심리학과", category: "사회과학" },
  { id: "ajou-media", universityId: "ajou", name: "문화콘텐츠학과", category: "미디어·콘텐츠" },
  { id: "ajou-ai", universityId: "ajou", name: "AI컴퓨터공학부", category: "컴퓨터·AI" },
  { id: "ajou-electrical", universityId: "ajou", name: "전자공학과", category: "전자·전기" },
  { id: "ajou-software", universityId: "ajou", name: "소프트웨어학과", category: "컴퓨터·소프트웨어" },
  { id: "ajou-mechanical", universityId: "ajou", name: "기계공학과", category: "기계·자동차" },
  { id: "ajou-smart-industry", universityId: "ajou", name: "첨단스마트산업공학과", category: "산업공학" },
  { id: "ajou-eco-energy", universityId: "ajou", name: "첨단에코에너지공학과", category: "화학·에너지" },
  { id: "ajou-medicine", universityId: "ajou", name: "의학과", category: "의학" },
  { id: "ajou-nursing", universityId: "ajou", name: "간호학과", category: "간호·보건" },

  { id: "inha-business", universityId: "inha", name: "경영학과", category: "경영·경제" },
  { id: "inha-economics", universityId: "inha", name: "경제학과", category: "경영·경제" },
  { id: "inha-law", universityId: "inha", name: "법학부", category: "법·행정" },
  { id: "inha-media", universityId: "inha", name: "미디어커뮤니케이션학과", category: "미디어·커뮤니케이션" },
  { id: "inha-ai", universityId: "inha", name: "인공지능공학과", category: "컴퓨터·AI" },
  { id: "inha-computer", universityId: "inha", name: "컴퓨터공학과", category: "컴퓨터·소프트웨어" },
  { id: "inha-electrical", universityId: "inha", name: "전기전자공학부", category: "전자·전기" },
  { id: "inha-mechanical", universityId: "inha", name: "기계공학과", category: "기계·자동차" },
  { id: "inha-chemical", universityId: "inha", name: "화학공학과", category: "화학·에너지" },
  { id: "inha-biological", universityId: "inha", name: "생명공학과", category: "생명·바이오" },
  { id: "inha-nursing", universityId: "inha", name: "간호학과", category: "간호·보건" },

  { id: "incheon-law", universityId: "incheon", name: "법학부", category: "법·행정" },
  { id: "incheon-business", universityId: "incheon", name: "경영학부", category: "경영·경제" },
  { id: "incheon-economics", universityId: "incheon", name: "경제학과", category: "경영·경제" },
  { id: "incheon-media", universityId: "incheon", name: "미디어커뮤니케이션학과", category: "미디어·커뮤니케이션" },
  { id: "incheon-computer", universityId: "incheon", name: "컴퓨터공학부", category: "컴퓨터·소프트웨어" },
  { id: "incheon-ai", universityId: "incheon", name: "인공지능학과", category: "컴퓨터·AI" },
  { id: "incheon-electrical", universityId: "incheon", name: "전기공학과", category: "전자·전기" },
  { id: "incheon-mechanical", universityId: "incheon", name: "기계공학과", category: "기계·자동차" },
  { id: "incheon-chemistry", universityId: "incheon", name: "화학과", category: "자연과학" },
  { id: "incheon-math", universityId: "incheon", name: "수학과", category: "자연과학" },
  { id: "incheon-design", universityId: "incheon", name: "디자인학부", category: "디자인·예술" },
  { id: "incheon-sports", universityId: "incheon", name: "운동건강학부", category: "체육·스포츠" },

  { id: "dankook-law", universityId: "dankook-jukjeon", name: "법학과", category: "법·행정" },
  { id: "dankook-business", universityId: "dankook-jukjeon", name: "경영학부", category: "경영·경제" },
  { id: "dankook-economics", universityId: "dankook-jukjeon", name: "경제학과", category: "경영·경제" },
  { id: "dankook-media", universityId: "dankook-jukjeon", name: "커뮤니케이션학부", category: "미디어·커뮤니케이션" },
  { id: "dankook-ai", universityId: "dankook-jukjeon", name: "AI융합학부", category: "컴퓨터·AI" },
  { id: "dankook-computer", universityId: "dankook-jukjeon", name: "소프트웨어학과", category: "컴퓨터·소프트웨어" },
  { id: "dankook-electrical", universityId: "dankook-jukjeon", name: "전자전기공학부", category: "전자·전기" },
  { id: "dankook-mechanical", universityId: "dankook-jukjeon", name: "기계공학과", category: "기계·자동차" },
  { id: "dankook-architecture", universityId: "dankook-jukjeon", name: "건축학부", category: "건축·도시" },
  { id: "dankook-design", universityId: "dankook-jukjeon", name: "공연영화학부", category: "예술·공연" },

  { id: "kau-air-transport", universityId: "kau", name: "항공운항학과", category: "항공·교통" },
  { id: "kau-ai", universityId: "kau", name: "AI융합학부", category: "컴퓨터·AI" },
  { id: "kau-software", universityId: "kau", name: "소프트웨어학과", category: "컴퓨터·소프트웨어" },
  { id: "kau-electrical", universityId: "kau", name: "항공전자정보공학부", category: "전자·전기" },
  { id: "kau-mechanical", universityId: "kau", name: "항공우주및기계공학부", category: "기계·항공우주" },
  { id: "kau-materials", universityId: "kau", name: "신소재공학과", category: "신소재·공학" },
  { id: "kau-business", universityId: "kau", name: "항공·경영학부", category: "경영·경제" },
  { id: "kau-transport", universityId: "kau", name: "항공교통물류학부", category: "항공·물류" },
  { id: "kau-free", universityId: "kau", name: "자유전공학부", category: "자유전공" },
];

const ajou = admissionSources.ajou2027;
const incheon = admissionSources.incheon2027;
const dankook = admissionSources.dankook2027;
const inha = admissionSources.inha2027;
const kau = {
  type: "adiga" as const,
  url: "https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000194",
  document: "한국항공대학교 2027학년도 전형평가기준 및 결과공개",
  academicYear: 2027,
  confidence: 0.95,
};

export const verifiedMetroCore2027Admissions: Admission[] = [
  ...verifiedMetroCore2027Departments.filter((d) => d.universityId === "ajou" && d.id !== "ajou-medicine").flatMap((d) => [
    { id: `${d.id}-ace-2027`, universityId: d.universityId, departmentId: d.id, academicYear: 2027, name: "학생부종합(ACE 전형)", type: "학종" as const, documentWeight: 70, interview: true, csatMinimum: { enabled: false }, source: ajou, isMock: false },
    { id: `${d.id}-recommend-2027`, universityId: d.universityId, departmentId: d.id, academicYear: 2027, name: "학생부교과(고교추천전형)", type: "교과" as const, studentRecordWeight: 100, csatMinimum: { enabled: true, description: "국어·수학·영어·탐구 중 2개 영역 등급 합 5 이내(의학과 제외 기준)" }, source: ajou, isMock: false },
    { id: `${d.id}-essay-2027`, universityId: d.universityId, departmentId: d.id, academicYear: 2027, name: "논술우수자전형", type: "논술" as const, studentRecordWeight: 20, source: ajou, isMock: false },
  ]),
  ...verifiedMetroCore2027Departments.filter((d) => d.universityId === "incheon").flatMap((d) => [
    { id: `${d.id}-self-2027`, universityId: d.universityId, departmentId: d.id, academicYear: 2027, name: "학생부종합(자기추천전형)", type: "학종" as const, documentWeight: 70, interview: true, csatMinimum: { enabled: false }, source: incheon, isMock: false },
    { id: `${d.id}-balance-2027`, universityId: d.universityId, departmentId: d.id, academicYear: 2027, name: "학생부종합(기회균형전형)", type: "학종" as const, documentWeight: 100, csatMinimum: { enabled: false }, source: incheon, isMock: false },
  ]),
  ...verifiedMetroCore2027Departments.filter((d) => d.universityId === "dankook-jukjeon").flatMap((d) => [
    { id: `${d.id}-region-2027`, universityId: d.universityId, departmentId: d.id, academicYear: 2027, name: "학생부교과(지역균형선발)", type: "교과" as const, studentRecordWeight: 95, csatMinimum: { enabled: false }, source: dankook, isMock: false },
  ]),
  ...verifiedMetroCore2027Departments.filter((d) => d.universityId === "kau").flatMap((d) => [
    { id: `${d.id}-future-2027`, universityId: d.universityId, departmentId: d.id, academicYear: 2027, name: "학생부종합(미래인재전형)", type: "학종" as const, documentWeight: 70, interview: true, csatMinimum: { enabled: false }, source: kau, isMock: false },
    { id: `${d.id}-equal-2027`, universityId: d.universityId, departmentId: d.id, academicYear: 2027, name: "학생부종합(고른기회전형)", type: "학종" as const, documentWeight: 70, interview: true, csatMinimum: { enabled: false }, source: kau, isMock: false },
    { id: `${d.id}-grade-2027`, universityId: d.universityId, departmentId: d.id, academicYear: 2027, name: "학생부교과(교과성적우수자전형)", type: "교과" as const, studentRecordWeight: 100, csatMinimum: { enabled: true }, source: kau, isMock: false },
    { id: `${d.id}-recommend-2027`, universityId: d.universityId, departmentId: d.id, academicYear: 2027, name: "학생부교과(학교장추천전형)", type: "교과" as const, studentRecordWeight: 100, csatMinimum: { enabled: false }, source: kau, isMock: false },
  ]),
];
