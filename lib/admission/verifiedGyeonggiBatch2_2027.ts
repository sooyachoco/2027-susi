import type { Admission, Department, University } from "./types";

const source = (url: string, confidence = 0.9) => ({ type: "university" as const, academicYear: 2027, url, confidence });

export const verifiedGyeonggiBatch2Universities: University[] = [
  { id: "hansei", name: "한세대학교", region: "경기" },
  { id: "shinhan", name: "신한대학교", region: "경기" },
  { id: "daejin", name: "대진대학교", region: "경기" },
  { id: "hankyong", name: "한경국립대학교", region: "경기" },
  { id: "hsmu", name: "화성의과학대학교", region: "경기" },
];

const rows: Array<[string, string, string, string]> = [
  ["hansei", "free", "자유전공학부", "자유전공"], ["hansei", "humanities", "인문사회학부", "인문·사회"], ["hansei", "advanced", "첨단융합학부", "컴퓨터·AI"], ["hansei", "nursing", "간호학과", "보건·간호"], ["hansei", "design", "디자인학부", "디자인"], ["hansei", "theology", "신학과", "인문·사회"],
  ["shinhan", "business", "경영대학(자율전공선발)", "경영·경제"], ["shinhan", "social", "사회과학대학(자율전공선발)", "인문·사회"], ["shinhan", "k-culture", "K-CULTURE 대학(자율전공선발)", "미디어·콘텐츠"], ["shinhan", "climate", "기후환경·에너지공학과", "공학"], ["shinhan", "baduk", "바둑콘텐츠학과", "미디어·콘텐츠"], ["shinhan", "media", "미디어영상학과", "미디어·콘텐츠"],
  ["daejin", "business", "경영학과", "경영·경제"], ["daejin", "computer", "컴퓨터공학전공", "컴퓨터·소프트웨어"], ["daejin", "software", "휴먼IT융합학부", "컴퓨터·AI"], ["daejin", "nursing", "간호학과", "보건·간호"], ["daejin", "media", "미디어커뮤니케이션학과", "미디어·콘텐츠"],
  ["hankyong", "ai", "AI반도체융합전공", "컴퓨터·AI"], ["hankyong", "software", "소프트웨어&서비스전공", "컴퓨터·소프트웨어"], ["hankyong", "mechanical", "기계공학전공", "공학"], ["hankyong", "business", "경영학전공", "경영·경제"], ["hankyong", "design", "디자인건축융합학부", "디자인"],
  ["hsmu", "nursing", "간호학과", "보건·간호"], ["hsmu", "clinical", "임상병리학과", "보건·간호"], ["hsmu", "physical", "물리치료학과", "보건·간호"], ["hsmu", "radiology", "방사선학과", "보건·간호"], ["hsmu", "dental", "치위생학과", "보건·간호"], ["hsmu", "taekwondo", "태권도학과", "체육"],
];

export const verifiedGyeonggiBatch2Departments: Department[] = rows.map(([u, s, name, category]) => ({ id: `${u}-${s}`, universityId: u, name, category }));

const urls: Record<string, string> = {
  hansei: "https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000201",
  shinhan: "https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0002712",
  daejin: "https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000097",
  hankyong: "https://www.adiga.kr/ucp/uvt/uni/univDetail.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000037",
  hsmu: "https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000233",
};

export const verifiedGyeonggiBatch2Admissions: Admission[] = rows.flatMap(([u, s]) => {
  const d = `${u}-${s}`;
  const base = { universityId: u, departmentId: d, academicYear: 2027, source: source(urls[u]), isMock: false };
  return [
    { ...base, id: `${d}-subject-2027`, name: "학생부교과", type: "교과" as const, studentRecordWeight: 100 },
    { ...base, id: `${d}-holistic-2027`, name: "학생부종합", type: "학종" as const, documentWeight: 100 },
  ];
});
