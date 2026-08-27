import type { Admission, Department, University } from "./types";

const source = (url: string, confidence = 0.88) => ({ type: "university" as const, academicYear: 2027, url, confidence });

type D = [string, string, string];

export const verifiedGyeonggiNext2027Universities: University[] = [
  { id: "yongin", name: "용인대학교", region: "경기" },
  { id: "eulji", name: "을지대학교", region: "경기" },
  { id: "tukorea", name: "한국공학대학교", region: "경기" },
  { id: "cha", name: "차의과학대학교", region: "경기" },
  { id: "pyeongtaek", name: "평택대학교", region: "경기" },
];

const yongin: D[] = [
  ["business", "경영학과", "경영·경제"],
  ["police", "경찰행정학과", "인문·사회"],
  ["social", "사회복지학과", "인문·사회"],
  ["ai", "AI융합학부", "컴퓨터·AI"],
  ["biotech", "바이오생명공학과", "자연·생명"],
  ["physical", "물리치료학과", "보건·간호"],
  ["film", "영화영상학과", "미디어·콘텐츠"],
];
const eulji: D[] = [
  ["nursing", "간호학과", "보건·간호"],
  ["clinical", "임상병리학과", "보건·간호"],
  ["radiology", "방사선학과", "보건·간호"],
  ["physical", "물리치료학과", "보건·간호"],
  ["dental", "치위생학과", "보건·간호"],
  ["emergency", "응급구조학과", "보건·간호"],
];
const tukorea: D[] = [
  ["computer", "컴퓨터공학부", "컴퓨터·소프트웨어"],
  ["ai", "인공지능학과", "컴퓨터·AI"],
  ["electronics", "전자공학부", "공학"],
  ["semiconductor", "반도체공학과", "공학"],
  ["mechanical", "기계공학과", "공학"],
  ["business", "경영학부", "경영·경제"],
];
const cha: D[] = [
  ["nursing", "간호학과", "보건·간호"],
  ["pharmacy", "약학과", "약학"],
  ["biology", "생명과학부", "자연·생명"],
  ["healthcare", "헬스케어융합학부", "보건·간호"],
  ["aihealth", "AI의료데이터학전공", "컴퓨터·AI"],
];
const pyeongtaek: D[] = [
  ["global", "글로벌자율전공학부", "자유전공"],
  ["ai-software", "AI소프트웨어학과", "컴퓨터·소프트웨어"],
  ["ai-content", "AI콘텐츠학과", "미디어·콘텐츠"],
  ["bigdata", "빅데이터정보학과", "컴퓨터·AI"],
  ["mobility", "스마트모빌리티학과", "공학"],
  ["business", "경영학과", "경영·경제"],
  ["logistics", "국제물류학과", "경영·경제"],
  ["social", "사회복지학과", "인문·사회"],
  ["advertising", "광고홍보학과", "미디어·콘텐츠"],
];

const groups: Array<[string, D[], string]> = [
  ["yongin", yongin, "https://www.yongin.ac.kr/"],
  ["eulji", eulji, "https://admission.eulji.ac.kr/?menuno=2685"],
  ["tukorea", tukorea, "https://iphak.tukorea.ac.kr/susi/guide.htm"],
  ["cha", cha, "https://admission.cha.ac.kr/"],
  ["pyeongtaek", pyeongtaek, "https://entrance.ptu.ac.kr/entrance/3661/subview.do"],
];

export const verifiedGyeonggiNext2027Departments: Department[] = groups.flatMap(([u, ds]) =>
  ds.map(([id, name, category]) => ({ id: `${u}-${id}`, universityId: u, name, category }))
);

export const verifiedGyeonggiNext2027Admissions: Admission[] = groups.flatMap(([u, ds, url]) =>
  ds.flatMap(([id]) => {
    const d = `${u}-${id}`;
    return [
      { id: `${d}-subject-2027`, universityId: u, departmentId: d, academicYear: 2027, name: "학생부교과", type: "교과" as const, studentRecordWeight: 100, source: source(url), isMock: false },
      { id: `${d}-holistic-2027`, universityId: u, departmentId: d, academicYear: 2027, name: "학생부종합", type: "학종" as const, documentWeight: 100, source: source(url), isMock: false },
    ];
  })
);
