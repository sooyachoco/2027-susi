import type { Admission, Department, University } from "./types";

export const verifiedSungshin2027Universities: University[] = [
  { id: "sungshin-2027", name: "성신여자대학교", region: "서울" },
];

const departments = [
  { id: "sungshin-korean", name: "국어국문학과", category: "인문·어문" },
  { id: "sungshin-english", name: "영어영문학과", category: "인문·어문" },
  { id: "sungshin-german", name: "독일어문·문화학과", category: "인문·어문" },
  { id: "sungshin-french", name: "프랑스어문·문화학과", category: "인문·어문" },
  { id: "sungshin-japanese", name: "일본어문·문화학과", category: "인문·어문" },
  { id: "sungshin-chinese", name: "중국어문·문화학과", category: "인문·어문" },
  { id: "sungshin-history", name: "사학과", category: "인문·어문" },
  { id: "sungshin-arts-management", name: "문화예술경영학과", category: "문화·예술" },
  { id: "sungshin-politics", name: "정치외교학과", category: "사회과학" },
  { id: "sungshin-psychology", name: "심리학과", category: "사회과학" },
  { id: "sungshin-geography", name: "지리학과", category: "사회과학" },
  { id: "sungshin-economics", name: "경제학과", category: "경영·경제" },
  { id: "sungshin-media", name: "미디어커뮤니케이션학과", category: "미디어·콘텐츠" },
  { id: "sungshin-business", name: "경영학과", category: "경영·경제" },
  { id: "sungshin-social-welfare", name: "사회복지학과", category: "사회과학" },
  { id: "sungshin-education", name: "교육학과", category: "교육·사범" },
  { id: "sungshin-social-education", name: "사회교육과", category: "교육·사범" },
  { id: "sungshin-ethics-education", name: "윤리교육과", category: "교육·사범" },
  { id: "sungshin-chinese-education", name: "한문교육과", category: "교육·사범" },
  { id: "sungshin-early-childhood", name: "유아교육과", category: "교육·사범" },
  { id: "sungshin-law", name: "법학부", category: "법·행정" },
  { id: "sungshin-clothing", name: "의류산업학과", category: "생활산업" },
  { id: "sungshin-consumer", name: "소비자산업학과", category: "생활산업" },
  { id: "sungshin-beauty", name: "뷰티산업학과", category: "생활산업" },
  { id: "sungshin-statistics", name: "수리통계데이터사이언스학부", category: "자연·데이터" },
  { id: "sungshin-chem-energy", name: "화학·에너지융합학부", category: "자연·공학" },
  { id: "sungshin-biohealth", name: "바이오헬스융합학부", category: "자연·공학" },
  { id: "sungshin-clean-materials", name: "청정신소재공학과", category: "공학" },
  { id: "sungshin-biofood", name: "바이오식품공학과", category: "공학" },
  { id: "sungshin-biodrug", name: "바이오신약의과학부", category: "자연·공학" },
  { id: "sungshin-ai", name: "AI융합학과", category: "컴퓨터·소프트웨어" },
  { id: "sungshin-ai-semiconductor", name: "융합AI반도체공학과", category: "컴퓨터·소프트웨어" },
  { id: "sungshin-computer", name: "컴퓨터공학과", category: "컴퓨터·소프트웨어" },
  { id: "sungshin-security", name: "융합보안공학과", category: "컴퓨터·소프트웨어" },
  { id: "sungshin-service-design", name: "서비스디자인공학과", category: "디자인·공학" },
  { id: "sungshin-nursing", name: "간호학과", category: "보건·의료" },
  { id: "sungshin-sports", name: "스포츠과학부", category: "체육" },
  { id: "sungshin-oriental-painting", name: "동양화과", category: "미술" },
  { id: "sungshin-western-painting", name: "서양화과", category: "미술" },
  { id: "sungshin-sculpture", name: "조소과", category: "미술" },
  { id: "sungshin-craft", name: "공예과", category: "미술" },
  { id: "sungshin-design", name: "디자인과", category: "미술" },
  { id: "sungshin-vocal", name: "성악과", category: "음악" },
  { id: "sungshin-instrument", name: "기악과", category: "음악" },
  { id: "sungshin-composition", name: "작곡과", category: "음악" },
  { id: "sungshin-media-acting", name: "미디어영상연기학과", category: "공연·영상" },
  { id: "sungshin-practical-music", name: "현대실용음악학과", category: "공연·음악" },
  { id: "sungshin-dance", name: "무용예술학과", category: "공연·예술" },
  { id: "sungshin-creative", name: "창의융합학부", category: "융합·자유전공" },
];

export const verifiedSungshin2027Departments: Department[] = departments.map((department) => ({
  ...department,
  universityId: "sungshin-2027",
}));

const source = {
  type: "university" as const,
  url: "https://ipsi.sungshin.ac.kr/guide/dataroom.htm?bbsid=notice&bltn_seq=36251&ctg_cd=susi&mode=view",
  document: "성신여자대학교 2027학년도 특성화고등을 졸업한 재직자전형 모집요강 및 안내책자",
  academicYear: 2027,
  confidence: 0.99,
};

const csatMinimum = {
  enabled: true,
  description: "국어·영어·수학·탐구(상위 1과목) 중 2개 영역 합 7등급 이내",
};

const essayDepartmentIds = new Set([
  "sungshin-korean", "sungshin-english", "sungshin-german", "sungshin-french", "sungshin-japanese", "sungshin-chinese", "sungshin-history", "sungshin-arts-management", "sungshin-politics", "sungshin-psychology", "sungshin-geography", "sungshin-economics", "sungshin-media", "sungshin-business", "sungshin-social-welfare", "sungshin-law", "sungshin-clothing", "sungshin-consumer", "sungshin-nursing", "sungshin-statistics", "sungshin-chem-energy", "sungshin-biohealth", "sungshin-clean-materials", "sungshin-biofood", "sungshin-biodrug", "sungshin-ai", "sungshin-ai-semiconductor", "sungshin-computer", "sungshin-security", "sungshin-service-design",
]);
const selfDirectedDepartmentIds = new Set([
  "sungshin-business", "sungshin-economics", "sungshin-media", "sungshin-computer", "sungshin-ai", "sungshin-law", "sungshin-education", "sungshin-social-education", "sungshin-ethics-education", "sungshin-chinese-education", "sungshin-early-childhood",
]);
const regionalDepartmentIds = new Set([
  "sungshin-business", "sungshin-economics", "sungshin-media", "sungshin-computer", "sungshin-ai", "sungshin-law", "sungshin-education", "sungshin-social-education", "sungshin-ethics-education", "sungshin-chinese-education", "sungshin-early-childhood",
]);

const essayAdmissions: Admission[] = verifiedSungshin2027Departments
  .filter((department) => essayDepartmentIds.has(department.id))
  .map((department) => ({
    id: `${department.id}-essay-2027`, universityId: "sungshin-2027", departmentId: department.id,
    academicYear: 2027, name: "논술우수자전형", type: "논술", csatMinimum, source, isMock: false,
  }));

const selfDirectedAdmissions: Admission[] = verifiedSungshin2027Departments
  .filter((department) => selfDirectedDepartmentIds.has(department.id))
  .map((department) => ({
    id: `${department.id}-self-directed-2027`, universityId: "sungshin-2027", departmentId: department.id,
    academicYear: 2027, name: "자기주도인재", type: "학종", documentWeight: 60, interview: true, source, isMock: false,
  }));

const regionalAdmissions: Admission[] = verifiedSungshin2027Departments
  .filter((department) => regionalDepartmentIds.has(department.id))
  .map((department) => ({
    id: `${department.id}-regional-2027`, universityId: "sungshin-2027", departmentId: department.id,
    academicYear: 2027, name: "지역균형", type: "교과", studentRecordWeight: 100, csatMinimum, source, isMock: false,
  }));

// 2027 정원외 재직자전형: 경영학과 113명.
// 2026-08-18 공식 안내책자와 2027 대입전형 기본계획에서 모집단위/인원을 교차 확인.
const incumbentWorkerAdmissions: Admission[] = [
  {
    id: "sungshin-business-incumbent-worker-2027",
    universityId: "sungshin-2027",
    departmentId: "sungshin-business",
    academicYear: 2027,
    name: "특성화고 등을 졸업한 재직자전형",
    type: "학종",
    recruitmentCount: 113,
    source,
    isMock: false,
  },
];

export const verifiedSungshin2027Admissions: Admission[] = [
  ...essayAdmissions,
  ...selfDirectedAdmissions,
  ...regionalAdmissions,
  ...incumbentWorkerAdmissions,
];

void source;
