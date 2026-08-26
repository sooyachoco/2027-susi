import type { Admission, Department, University } from "./types";

const source = {
  type: "adiga" as const,
  url: "https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000126",
  document: "대입정보포털 서울여자대학교 2027학년도 전형평가기준 및 결과공개",
  academicYear: 2027,
  confidence: 0.97,
};

export const verifiedSeoulWomen2027Universities: University[] = [
  { id: "seoul-women", name: "서울여자대학교", region: "서울" },
];

const departmentSeed = [
  ["free-humanities", "자유전공학부(인문)", "인문"],
  ["free-social", "자유전공학부(사회과학)", "사회과학"],
  ["free-scitech", "자유전공학부(과학기술융합)", "자연·융합"],
  ["free-future", "자유전공학부(미래산업융합)", "융합"],
  ["free-wide", "자유전공학부(광역)", "자유전공"],
  ["ai", "AI 융합학부(인공지능전공)", "AI·소프트웨어"],
  ["software", "AI 융합학부(소프트웨어전공)", "AI·소프트웨어"],
  ["data-science", "AI 융합학부(데이터사이언스전공)", "데이터·AI"],
  ["ai-content", "글로벌 ICT 인문융합학부(AI 융합콘텐츠전공)", "인문·ICT융합"],
  ["ai-brain", "심리·인지과학학부(AI 뇌융합학습전공)", "심리·AI융합"],
  ["ai-real-content", "첨단융합학부(AI 실감콘텐츠전공)", "첨단융합"],
  ["new-media-design", "첨단융합학부(뉴미디어디자인전공)", "디자인·첨단융합"],
  ["business-convergence", "첨단융합학부(기업경영전공)", "경영·첨단융합"],
  ["digital-media", "디지털미디어학과", "미디어·ICT"],
  ["information-security", "지능정보보호학부", "정보보호"],
  ["social-welfare", "사회복지학과", "사회복지"],
  ["child", "아동학과", "사회과학"],
  ["psychology", "심리·인지과학학부", "심리"],
  ["food-bio", "식품생명공학과", "생명·바이오"],
  ["food-nutrition", "식품영양학과", "식품·보건"],
  ["business", "경영학과", "상경"],
  ["fashion", "패션산업학과", "디자인·생활"],
  ["korean", "국어국문학과", "인문·어문"],
  ["english", "영어영문학과", "인문·어문"],
  ["chinese", "중어중문학과", "인문·어문"],
  ["japanese", "일어일문학과", "인문·어문"],
  ["history", "사학과", "인문·역사"],
  ["economics", "경제학과", "사회·경제"],
  ["library", "문헌정보학과", "인문·정보"],
  ["public-admin", "행정학과", "사회과학"],
  ["chemistry", "화학과", "자연과학"],
  ["bioenvironment", "생명환경공학과", "생명·환경"],
  ["biohealth", "바이오헬스융합학과", "바이오·보건"],
  ["horticulture", "원예생명조경학과", "생명·환경"],
  ["industrial-design", "산업디자인학과", "디자인"],
  ["craft", "공예·컬렉터블디자인전공", "디자인·예술"],
  ["sports", "스포츠운동과학과", "체육"],
  ["modern-art", "현대미술전공", "미술"],
  ["visual-design", "시각디자인전공", "디자인"],
] as const;

export const verifiedSeoulWomen2027Departments: Department[] = departmentSeed.map(
  ([id, name, category]) => ({ id: `seoul-women-${id}`, universityId: "seoul-women", name, category })
);

const departments = verifiedSeoulWomen2027Departments;

export const verifiedSeoulWomen2027Admissions: Admission[] = departments.flatMap((department) => {
  const general = [
    {
      id: `${department.id}-barom-doc-2027`, universityId: "seoul-women", departmentId: department.id,
      academicYear: 2027, name: "바롬인재서류전형", type: "학종" as const,
      documentWeight: 100, interview: false, csatMinimum: { enabled: false }, source, isMock: false,
    },
    {
      id: `${department.id}-barom-interview-2027`, universityId: "seoul-women", departmentId: department.id,
      academicYear: 2027, name: "바롬인재면접전형", type: "학종" as const,
      documentWeight: 50, interview: true, csatMinimum: { enabled: false }, source, isMock: false,
    },
    {
      id: `${department.id}-school-record-2027`, universityId: "seoul-women", departmentId: department.id,
      academicYear: 2027, name: "교과우수자전형", type: "교과" as const,
      studentRecordWeight: 100, interview: false,
      csatMinimum: { enabled: true, description: "국어·수학·영어·탐구(1과목) 중 2개 영역 합 7등급 이내" }, source, isMock: false,
    },
  ];

  const isSw = ["ai", "software", "data-science", "digital-media", "information-security"].some(
    (key) => department.id === `seoul-women-${key}`
  );
  if (isSw) {
    general.push({
      id: `${department.id}-sw-2027`, universityId: "seoul-women", departmentId: department.id,
      academicYear: 2027, name: "SW 융합인재전형", type: "학종" as const,
      documentWeight: 50, interview: true, csatMinimum: { enabled: false }, source, isMock: false,
    });
  }
  return general;
});
