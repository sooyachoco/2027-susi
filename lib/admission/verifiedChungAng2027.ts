import type { Admission, Department, University } from "./types";

export const verifiedChungAng2027Universities: University[] = [
  { id: "cau-2027", name: "중앙대학교", region: "서울" },
];

const explorationNames = [
  "국어국문학부", "영어영문학과", "유럽문화학부", "아시아문화학부", "정치국제학과", "심리학과", "사회복지학부", "도시계획·부동산학과", "공공인재학부", "미디어커뮤니케이션학부",
  "경제학부", "광고홍보학부", "국제물류학과", "산업보안학과(인문)", "경영학부", "응용통계학과", "간호학과", "산업보안학과(자연)",
  "물리학과", "화학과", "생명과학과", "수학과", "사회기반시스템공학부", "건축학부", "에너지시스템공학부", "화학공학과", "기계공학부",
  "전자전기공학부", "융합공학부", "지능형반도체공학과", "소프트웨어학부", "AI학과", "약학부", "의학부", "생명자원공학부", "식품공학부", "시스템생명공학과", "첨단소재공학과", "예술공학부",
];

const growthNames = [
  "간호학과", "건축학부", "에너지시스템공학부", "화학공학과", "기계공학부", "전자전기공학부", "융합공학부", "소프트웨어학부", "약학부", "의학부",
  "국어국문학부", "영어영문학과", "정치국제학과", "심리학과", "공공인재학부", "미디어커뮤니케이션학부", "경제학부", "응용통계학과", "산업보안학과(인문)", "경영학부", "산업보안학과(자연)",
];

const source = {
  type: "university" as const,
  url: "https://admission.cau.ac.kr/detail.do?board_seq=3239",
  document: "중앙대학교 2027학년도 수시모집요강",
  academicYear: 2027,
  confidence: 0.98,
};

const unique = (items: string[]) => [...new Set(items)];
const allNames = unique([...explorationNames]);

export const verifiedChungAng2027Departments: Department[] = allNames.map((name, i) => ({
  id: `cau-2027-${i + 1}`,
  universityId: "cau-2027",
  name,
}));

const departmentByName = new Map(verifiedChungAng2027Departments.map((d) => [d.name, d]));

export const verifiedChungAng2027Admissions: Admission[] = verifiedChungAng2027Departments.flatMap((department) => {
  const admissions: Admission[] = [
    {
      id: `${department.id}-regional`, universityId: "cau-2027", departmentId: department.id, academicYear: 2027,
      name: "학생부교과(지역균형)", type: "교과", studentRecordWeight: 90,
      csatMinimum: { enabled: true, description: "서울캠퍼스 기준 수능최저 적용" }, source, isMock: false,
    },
    {
      id: `${department.id}-fusion`, universityId: "cau-2027", departmentId: department.id, academicYear: 2027,
      name: "학생부종합(융합형인재)", type: "학종", documentWeight: 100,
      csatMinimum: { enabled: false }, source, isMock: false,
    },
    {
      id: `${department.id}-exploration`, universityId: "cau-2027", departmentId: department.id, academicYear: 2027,
      name: "학생부종합(탐구형인재)", type: "학종", documentWeight: 70, interview: true,
      csatMinimum: { enabled: false }, source, isMock: false,
    },
    {
      id: `${department.id}-essay-general`, universityId: "cau-2027", departmentId: department.id, academicYear: 2027,
      name: "논술(일반형)", type: "논술", studentRecordWeight: 20,
      csatMinimum: { enabled: true, description: "서울캠퍼스 기준 수능최저 적용" }, source, isMock: false,
    },
    {
      id: `${department.id}-essay-creative`, universityId: "cau-2027", departmentId: department.id, academicYear: 2027,
      name: "논술(창의형)", type: "논술", studentRecordWeight: 20,
      csatMinimum: { enabled: false, description: "2027 신설 · 국내 고교 졸업예정자 지원" }, source, isMock: false,
    },
  ];

  if (growthNames.includes(department.name)) {
    admissions.push({
      id: `${department.id}-growth`, universityId: "cau-2027", departmentId: department.id, academicYear: 2027,
      name: "학생부종합(성장형인재)", type: "학종", documentWeight: 70, interview: true,
      csatMinimum: { enabled: true, description: "서울캠퍼스 인문·자연·간호 3개 영역 등급 합 6 이내, 약학·의학 4개 영역 등급 합 5 이내" }, source, isMock: false,
    });
  }
  return admissions;
});

export const verifiedChungAng2027GrowthDepartments = growthNames
  .map((name) => departmentByName.get(name))
  .filter((department): department is Department => Boolean(department));
