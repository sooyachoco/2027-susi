import type { Admission, Department, University } from "./types";

const source = {
  type: "adiga" as const,
  url: "https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000141",
  document: "숙명여자대학교 2027학년도 전형평가기준 및 결과공개",
  academicYear: 2027,
  confidence: 0.95,
};

export const verifiedSookmyung2027Universities: University[] = [
  { id: "sookmyung", name: "숙명여자대학교", region: "서울" },
];

export const verifiedSookmyung2027Departments: Department[] = [
  { id: "sookmyung-ai", universityId: "sookmyung", name: "인공지능공학부", category: "컴퓨터·소프트웨어" },
  { id: "sookmyung-cs", universityId: "sookmyung", name: "컴퓨터과학전공", category: "컴퓨터·소프트웨어" },
  { id: "sookmyung-data", universityId: "sookmyung", name: "데이터사이언스전공", category: "컴퓨터·소프트웨어" },
  { id: "sookmyung-free", universityId: "sookmyung", name: "자유전공학부", category: "자율전공" },
  { id: "sookmyung-business", universityId: "sookmyung", name: "경영학부", category: "경영·경제" },
  { id: "sookmyung-economics", universityId: "sookmyung", name: "경제학부", category: "경영·경제" },
  { id: "sookmyung-consumer-economics", universityId: "sookmyung", name: "소비자경제학과", category: "경영·경제" },
  { id: "sookmyung-korean", universityId: "sookmyung", name: "한국어문학부", category: "인문" },
  { id: "sookmyung-history", universityId: "sookmyung", name: "역사문화학과", category: "인문" },
  { id: "sookmyung-french", universityId: "sookmyung", name: "프랑스언어·문화학과", category: "인문" },
  { id: "sookmyung-chinese", universityId: "sookmyung", name: "중어중문학부", category: "인문" },
  { id: "sookmyung-german", universityId: "sookmyung", name: "독일언어·문화학과", category: "인문" },
];

const regionalCsat = { enabled: true, requiredSubjects: 2, gradeSum: 6, description: "국어·수학·영어·탐구 중 2개 영역 합 6등급 이내" };

export const verifiedSookmyung2027Admissions: Admission[] = [
  { id: "sookmyung-software-ai-2027", universityId: "sookmyung", departmentId: "sookmyung-ai", academicYear: 2027, name: "소프트웨어인재", type: "학종", recruitmentCount: 14, documentWeight: 70, interview: true, csatMinimum: { enabled: false }, source, isMock: false },
  { id: "sookmyung-software-cs-2027", universityId: "sookmyung", departmentId: "sookmyung-cs", academicYear: 2027, name: "소프트웨어인재", type: "학종", recruitmentCount: 12, documentWeight: 70, interview: true, csatMinimum: { enabled: false }, source, isMock: false },
  { id: "sookmyung-software-data-2027", universityId: "sookmyung", departmentId: "sookmyung-data", academicYear: 2027, name: "소프트웨어인재", type: "학종", recruitmentCount: 9, documentWeight: 70, interview: true, csatMinimum: { enabled: false }, source, isMock: false },
  { id: "sookmyung-ai-region-2027", universityId: "sookmyung", departmentId: "sookmyung-ai", academicYear: 2027, name: "지역균형선발", type: "교과", recruitmentCount: 10, studentRecordWeight: 100, csatMinimum: regionalCsat, source, isMock: false },
  { id: "sookmyung-cs-region-2027", universityId: "sookmyung", departmentId: "sookmyung-cs", academicYear: 2027, name: "지역균형선발", type: "교과", recruitmentCount: 9, studentRecordWeight: 100, csatMinimum: regionalCsat, source, isMock: false },
  { id: "sookmyung-data-region-2027", universityId: "sookmyung", departmentId: "sookmyung-data", academicYear: 2027, name: "지역균형선발", type: "교과", recruitmentCount: 5, studentRecordWeight: 100, csatMinimum: regionalCsat, source, isMock: false },
  { id: "sookmyung-free-region-2027", universityId: "sookmyung", departmentId: "sookmyung-free", academicYear: 2027, name: "지역균형선발", type: "교과", recruitmentCount: 29, studentRecordWeight: 100, csatMinimum: regionalCsat, source, isMock: false },
  { id: "sookmyung-business-hakjong-2027", universityId: "sookmyung", departmentId: "sookmyung-business", academicYear: 2027, name: "숙명인재(면접형)", type: "학종", recruitmentCount: 24, documentWeight: 70, interview: true, csatMinimum: { enabled: false }, source, isMock: false },
  { id: "sookmyung-business-region-2027", universityId: "sookmyung", departmentId: "sookmyung-business", academicYear: 2027, name: "지역균형선발", type: "교과", recruitmentCount: 30, studentRecordWeight: 100, csatMinimum: regionalCsat, source, isMock: false },
  { id: "sookmyung-business-essay-2027", universityId: "sookmyung", departmentId: "sookmyung-business", academicYear: 2027, name: "논술우수자", type: "논술", recruitmentCount: 10, csatMinimum: { enabled: true }, source, isMock: false },
  { id: "sookmyung-economics-hakjong-2027", universityId: "sookmyung", departmentId: "sookmyung-economics", academicYear: 2027, name: "숙명인재(면접형)", type: "학종", recruitmentCount: 6, documentWeight: 70, interview: true, csatMinimum: { enabled: false }, source, isMock: false },
  { id: "sookmyung-economics-region-2027", universityId: "sookmyung", departmentId: "sookmyung-economics", academicYear: 2027, name: "지역균형선발", type: "교과", recruitmentCount: 16, studentRecordWeight: 100, csatMinimum: regionalCsat, source, isMock: false },
  { id: "sookmyung-economics-essay-2027", universityId: "sookmyung", departmentId: "sookmyung-economics", academicYear: 2027, name: "논술우수자", type: "논술", recruitmentCount: 4, csatMinimum: { enabled: true }, source, isMock: false },
  { id: "sookmyung-consumer-economics-hakjong-2027", universityId: "sookmyung", departmentId: "sookmyung-consumer-economics", academicYear: 2027, name: "숙명인재(면접형)", type: "학종", recruitmentCount: 6, documentWeight: 70, interview: true, csatMinimum: { enabled: false }, source, isMock: false },
  { id: "sookmyung-consumer-economics-region-2027", universityId: "sookmyung", departmentId: "sookmyung-consumer-economics", academicYear: 2027, name: "지역균형선발", type: "교과", recruitmentCount: 3, studentRecordWeight: 100, csatMinimum: regionalCsat, source, isMock: false },
  { id: "sookmyung-consumer-economics-essay-2027", universityId: "sookmyung", departmentId: "sookmyung-consumer-economics", academicYear: 2027, name: "논술우수자", type: "논술", recruitmentCount: 3, csatMinimum: { enabled: true }, source, isMock: false },
  { id: "sookmyung-korean-hakjong-2027", universityId: "sookmyung", departmentId: "sookmyung-korean", academicYear: 2027, name: "숙명인재(면접형)", type: "학종", recruitmentCount: 12, documentWeight: 70, interview: true, csatMinimum: { enabled: false }, source, isMock: false },
  { id: "sookmyung-korean-balance-2027", universityId: "sookmyung", departmentId: "sookmyung-korean", academicYear: 2027, name: "지역균형선발", type: "교과", recruitmentCount: 8, studentRecordWeight: 100, csatMinimum: regionalCsat, source, isMock: false },
  { id: "sookmyung-korean-essay-2027", universityId: "sookmyung", departmentId: "sookmyung-korean", academicYear: 2027, name: "논술우수자", type: "논술", recruitmentCount: 12, csatMinimum: { enabled: true }, source, isMock: false },
  { id: "sookmyung-history-hakjong-2027", universityId: "sookmyung", departmentId: "sookmyung-history", academicYear: 2027, name: "숙명인재(면접형)", type: "학종", recruitmentCount: 6, documentWeight: 70, interview: true, csatMinimum: { enabled: false }, source, isMock: false },
  { id: "sookmyung-history-balance-2027", universityId: "sookmyung", departmentId: "sookmyung-history", academicYear: 2027, name: "지역균형선발", type: "교과", recruitmentCount: 5, studentRecordWeight: 100, csatMinimum: regionalCsat, source, isMock: false },
  { id: "sookmyung-history-essay-2027", universityId: "sookmyung", departmentId: "sookmyung-history", academicYear: 2027, name: "논술우수자", type: "논술", recruitmentCount: 5, csatMinimum: { enabled: true }, source, isMock: false },
  { id: "sookmyung-french-hakjong-2027", universityId: "sookmyung", departmentId: "sookmyung-french", academicYear: 2027, name: "숙명인재(면접형)", type: "학종", recruitmentCount: 10, documentWeight: 70, interview: true, csatMinimum: { enabled: false }, source, isMock: false },
  { id: "sookmyung-french-balance-2027", universityId: "sookmyung", departmentId: "sookmyung-french", academicYear: 2027, name: "지역균형선발", type: "교과", recruitmentCount: 3, studentRecordWeight: 100, csatMinimum: regionalCsat, source, isMock: false },
  { id: "sookmyung-french-essay-2027", universityId: "sookmyung", departmentId: "sookmyung-french", academicYear: 2027, name: "논술우수자", type: "논술", recruitmentCount: 4, csatMinimum: { enabled: true }, source, isMock: false },
  { id: "sookmyung-chinese-hakjong-2027", universityId: "sookmyung", departmentId: "sookmyung-chinese", academicYear: 2027, name: "숙명인재(면접형)", type: "학종", recruitmentCount: 15, documentWeight: 70, interview: true, csatMinimum: { enabled: false }, source, isMock: false },
  { id: "sookmyung-chinese-balance-2027", universityId: "sookmyung", departmentId: "sookmyung-chinese", academicYear: 2027, name: "지역균형선발", type: "교과", recruitmentCount: 9, studentRecordWeight: 100, csatMinimum: regionalCsat, source, isMock: false },
  { id: "sookmyung-chinese-essay-2027", universityId: "sookmyung", departmentId: "sookmyung-chinese", academicYear: 2027, name: "논술우수자", type: "논술", recruitmentCount: 12, csatMinimum: { enabled: true }, source, isMock: false },
  { id: "sookmyung-german-hakjong-2027", universityId: "sookmyung", departmentId: "sookmyung-german", academicYear: 2027, name: "숙명인재(면접형)", type: "학종", recruitmentCount: 9, documentWeight: 70, interview: true, csatMinimum: { enabled: false }, source, isMock: false },
  { id: "sookmyung-german-balance-2027", universityId: "sookmyung", departmentId: "sookmyung-german", academicYear: 2027, name: "지역균형선발", type: "교과", recruitmentCount: 2, studentRecordWeight: 100, csatMinimum: regionalCsat, source, isMock: false },
  { id: "sookmyung-german-essay-2027", universityId: "sookmyung", departmentId: "sookmyung-german", academicYear: 2027, name: "논술우수자", type: "논술", recruitmentCount: 3, csatMinimum: { enabled: true }, source, isMock: false },
];
