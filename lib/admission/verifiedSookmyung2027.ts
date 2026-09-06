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

const departmentNames = [
  ["sookmyung-korean", "한국어문학부", "인문"], ["sookmyung-history", "역사문화학과", "인문"], ["sookmyung-french", "프랑스언어·문화학과", "인문"], ["sookmyung-chinese", "중어중문학부", "인문"], ["sookmyung-german", "독일언어·문화학과", "인문"],
  ["sookmyung-literature", "문헌정보학과", "인문"], ["sookmyung-tesl", "TESL전공", "인문"], ["sookmyung-family", "가족자원경영학과", "사회"], ["sookmyung-political", "정치외교학과", "사회"], ["sookmyung-public", "행정학과", "사회"], ["sookmyung-economics", "경제학부", "경영·경제"], ["sookmyung-business", "경영학부", "경영·경제"], ["sookmyung-consumer", "소비자경제학과", "경영·경제"],
  ["sookmyung-social", "사회심리학과", "사회"], ["sookmyung-media", "홍보광고학과", "사회"], ["sookmyung-law", "법학부", "사회"], ["sookmyung-child", "아동복지학부", "사회"], ["sookmyung-education", "교육학부", "교육"], ["sookmyung-math", "수학과", "자연"], ["sookmyung-stat", "통계학과", "자연"], ["sookmyung-chem", "화학과", "자연"], ["sookmyung-life", "생명시스템학부", "자연"], ["sookmyung-food", "식품영양학과", "자연"], ["sookmyung-clothing", "의류학과", "자연"], ["sookmyung-pharmacy", "약학부", "약학"],
  ["sookmyung-ai", "인공지능공학부", "컴퓨터·소프트웨어"], ["sookmyung-cs", "컴퓨터과학전공", "컴퓨터·소프트웨어"], ["sookmyung-data", "데이터사이언스전공", "컴퓨터·소프트웨어"], ["sookmyung-free", "순헌칼리지 자유전공학부", "자율전공"], ["sookmyung-entrepreneur", "앙트러프러너십전공", "경영·경제"],
  ["sookmyung-physical", "체육교육과", "예체능"], ["sookmyung-dance", "무용과", "예체능"], ["sookmyung-music", "음악대학", "예체능"], ["sookmyung-design1", "시각·영상디자인과", "예체능"], ["sookmyung-design2", "산업디자인과", "예체능"], ["sookmyung-design3", "환경디자인과", "예체능"], ["sookmyung-craft", "공예과", "예체능"], ["sookmyung-painting", "회화과", "예체능"],
] as const;
export const verifiedSookmyung2027Departments: Department[] = departmentNames.map(([id, name, category]) => ({ id, universityId: "sookmyung", name, category }));

const noCsat = { enabled: false };
const regionalCsat = { enabled: false, description: "약학부 제외 수능최저 폐지" };
const essayCsat = { enabled: true, requiredSubjects: 2, gradeSum: 5, description: "국어·수학·영어·탐구 중 2개 영역 등급합 5 이내" };
const pharmacyCsat = { enabled: true, requiredSubjects: 3, gradeSum: 5, description: "약학부: 수학 포함 국어·수학·영어·탐구 중 3개 영역 등급합 5 이내" };
const pharmacyEssayCsat = { enabled: true, requiredSubjects: 3, gradeSum: 4, description: "약학부 논술: 수학 포함 3개 영역 등급합 4 이내" };

export const verifiedSookmyung2027Admissions: Admission[] = [
  { id: "sookmyung-total-hakjong-2027", universityId: "sookmyung", departmentId: "sookmyung-free", academicYear: 2027, name: "학생부종합(정원내외 합계)", type: "학종", recruitmentCount: 682, documentWeight: 100, csatMinimum: noCsat, source, isMock: false, isAggregate: true },
  { id: "sookmyung-hakjong-2027", universityId: "sookmyung", departmentId: "sookmyung-free", academicYear: 2027, name: "숙명인재(면접형)", type: "학종", recruitmentCount: 361, documentWeight: 70, interview: true, csatMinimum: noCsat, source, isMock: false, isAggregate: true },
  { id: "sookmyung-software-2027", universityId: "sookmyung", departmentId: "sookmyung-ai", academicYear: 2027, name: "소프트웨어인재", type: "학종", recruitmentCount: 35, documentWeight: 70, interview: true, csatMinimum: noCsat, source, isMock: false, isAggregate: true },
  { id: "sookmyung-opportunity-2027", universityId: "sookmyung", departmentId: "sookmyung-free", academicYear: 2027, name: "기회균형", type: "학종", recruitmentCount: 71, documentWeight: 100, csatMinimum: noCsat, source, isMock: false, isAggregate: true },
  { id: "sookmyung-regional-2027", universityId: "sookmyung", departmentId: "sookmyung-free", academicYear: 2027, name: "지역균형선발", type: "교과", recruitmentCount: 287, studentRecordWeight: 70, documentWeight: 30, csatMinimum: regionalCsat, source, isMock: false, isAggregate: true },
  { id: "sookmyung-regional-pharmacy-2027", universityId: "sookmyung", departmentId: "sookmyung-pharmacy", academicYear: 2027, name: "지역균형선발", type: "교과", recruitmentCount: 15, studentRecordWeight: 70, documentWeight: 30, csatMinimum: pharmacyCsat, source, isMock: false },
  { id: "sookmyung-essay-2027", universityId: "sookmyung", departmentId: "sookmyung-free", academicYear: 2027, name: "논술우수자", type: "논술", recruitmentCount: 214, csatMinimum: essayCsat, source, isMock: false, isAggregate: true },
  { id: "sookmyung-essay-pharmacy-2027", universityId: "sookmyung", departmentId: "sookmyung-pharmacy", academicYear: 2027, name: "논술우수자", type: "논술", recruitmentCount: 4, csatMinimum: pharmacyEssayCsat, source, isMock: false },
  { id: "sookmyung-practical-2027", universityId: "sookmyung", departmentId: "sookmyung-free", academicYear: 2027, name: "예능창의인재", type: "기타", recruitmentCount: 127, csatMinimum: noCsat, source, isMock: false, isAggregate: true },
  { id: "sookmyung-farmland-2027", universityId: "sookmyung", departmentId: "sookmyung-free", academicYear: 2027, name: "농어촌학생", type: "학종", recruitmentCount: 63, documentWeight: 100, csatMinimum: noCsat, source, isMock: false, isAggregate: true },
  { id: "sookmyung-specialized-2027", universityId: "sookmyung", departmentId: "sookmyung-free", academicYear: 2027, name: "특성화고교출신자", type: "학종", recruitmentCount: 24, documentWeight: 100, csatMinimum: noCsat, source, isMock: false, isAggregate: true },
  { id: "sookmyung-employee-2027", universityId: "sookmyung", departmentId: "sookmyung-free", academicYear: 2027, name: "특성화고졸재직자", type: "학종", recruitmentCount: 118, documentWeight: 100, csatMinimum: noCsat, source, isMock: false, isAggregate: true },
  { id: "sookmyung-special-education-2027", universityId: "sookmyung", departmentId: "sookmyung-free", academicYear: 2027, name: "특수교육대상자", type: "학종", recruitmentCount: 10, documentWeight: 70, interview: true, csatMinimum: noCsat, source, isMock: false, isAggregate: true },
];
