import type { Admission, Department, University } from "./types";

const source = {
  type: "university" as const,
  url: "https://iphak.kw.ac.kr/mojib/mojib.php?m_type=SUSI",
  document: "2027학년도 신입학 수시 모집요강",
  academicYear: 2027,
  verifiedAt: "2026-09-04",
  confidence: 0.99,
};

export const verifiedKwangwoon2027Universities: University[] = [
  { id: "kwangwoon", name: "광운대학교", region: "서울" },
];

const departmentSeed = [
  ["kwangwoon-autonomous", "자율전공학부", "자율전공"],
  ["kwangwoon-electronics", "전자공학과", "공학·전자"],
  ["kwangwoon-electronic-communication", "전자통신공학과", "공학·전자"],
  ["kwangwoon-electronic-convergence", "전자융합공학과", "공학·전자"],
  ["kwangwoon-electrical", "전기공학과", "공학·전기"],
  ["kwangwoon-electronic-materials", "전자재료공학과", "공학·전자"],
  ["kwangwoon-semiconductor", "반도체시스템공학부 반도체시스템공학전공", "공학·반도체"],
  ["kwangwoon-computer", "컴퓨터정보공학부", "컴퓨터·소프트웨어"],
  ["kwangwoon-software", "소프트웨어학부", "컴퓨터·소프트웨어"],
  ["kwangwoon-information-convergence", "정보융합학부", "컴퓨터·데이터"],
  ["kwangwoon-robot", "로봇학부 AI로봇전공", "컴퓨터·로봇"],
  ["kwangwoon-architecture", "건축학과(5년제)", "건축"],
  ["kwangwoon-architecture-engineering", "건축공학과", "건축"],
  ["kwangwoon-chemical", "화학공학과", "공학·화학"],
  ["kwangwoon-environment", "환경공학과", "공학·환경"],
  ["kwangwoon-math", "수학과", "자연과학"],
  ["kwangwoon-electronic-biophysics", "전자바이오물리학과", "자연과학·바이오"],
  ["kwangwoon-chemistry", "화학과", "자연과학"],
  ["kwangwoon-sports", "스포츠융합과학과", "체육"],
  ["kwangwoon-korean", "국어국문학과", "인문·어문"],
  ["kwangwoon-english", "영어영문학과", "인문·어문"],
  ["kwangwoon-media", "미디어커뮤니케이션학부", "사회과학·미디어"],
  ["kwangwoon-psychology", "산업심리학과", "사회과학"],
  ["kwangwoon-northeast-culture", "동북아문화산업학부", "인문·문화"],
  ["kwangwoon-admin", "행정학과", "사회과학"],
  ["kwangwoon-law", "법학부", "법·행정"],
  ["kwangwoon-international", "국제학부", "인문·국제"],
  ["kwangwoon-business", "경영학부 경영학전공", "경영·경제"],
  ["kwangwoon-business-bigdata", "경영학부 빅데이터경영전공", "경영·데이터"],
  ["kwangwoon-international-trade", "국제통상학부", "경영·국제"],
  ["kwangwoon-finance", "금융부동산법무학과", "재직자"],
  ["kwangwoon-game", "게임콘텐츠학과", "재직자"],
  ["kwangwoon-smart-electrical", "스마트전기전자학과", "재직자"],
  ["kwangwoon-sports-rehab", "스포츠상담재활학과", "재직자"],
] as const;

export const verifiedKwangwoon2027Departments: Department[] = departmentSeed.map(
  ([id, name, category]) => ({ id, universityId: "kwangwoon", name, category })
);

const recruitmentMaps: Record<string, Record<string, number>> = {
  "광운참빛인재전형Ⅰ-면접형": {
    "kwangwoon-electronics": 18, "kwangwoon-electronic-communication": 14, "kwangwoon-electronic-convergence": 10,
    "kwangwoon-electrical": 10, "kwangwoon-electronic-materials": 12, "kwangwoon-semiconductor": 14,
    "kwangwoon-architecture": 6, "kwangwoon-architecture-engineering": 6, "kwangwoon-chemical": 12, "kwangwoon-environment": 6,
    "kwangwoon-math": 8, "kwangwoon-electronic-biophysics": 8, "kwangwoon-chemistry": 10,
    "kwangwoon-korean": 6, "kwangwoon-english": 6, "kwangwoon-media": 12, "kwangwoon-psychology": 8,
    "kwangwoon-northeast-culture": 10, "kwangwoon-admin": 8, "kwangwoon-law": 16, "kwangwoon-international": 6,
    "kwangwoon-business": 24, "kwangwoon-business-bigdata": 10, "kwangwoon-international-trade": 10,
  },
  "광운참빛인재전형Ⅱ-서류형": {
    "kwangwoon-electronics": 13, "kwangwoon-electronic-communication": 8, "kwangwoon-electronic-convergence": 8,
    "kwangwoon-electrical": 8, "kwangwoon-electronic-materials": 8, "kwangwoon-semiconductor": 8,
    "kwangwoon-computer": 12, "kwangwoon-software": 12, "kwangwoon-information-convergence": 12, "kwangwoon-robot": 12,
    "kwangwoon-architecture": 3, "kwangwoon-architecture-engineering": 4, "kwangwoon-chemical": 10, "kwangwoon-environment": 3,
    "kwangwoon-math": 5, "kwangwoon-electronic-biophysics": 7, "kwangwoon-chemistry": 6,
    "kwangwoon-korean": 4, "kwangwoon-english": 4, "kwangwoon-media": 9, "kwangwoon-psychology": 4,
    "kwangwoon-northeast-culture": 6, "kwangwoon-admin": 6, "kwangwoon-law": 14, "kwangwoon-international": 3,
    "kwangwoon-business": 20, "kwangwoon-business-bigdata": 6, "kwangwoon-international-trade": 6,
  },
  "소프트웨어우수인재전형": {
    "kwangwoon-computer": 20, "kwangwoon-software": 18, "kwangwoon-information-convergence": 18, "kwangwoon-robot": 16,
  },
  "지역균형전형": {
    "kwangwoon-electronics": 16, "kwangwoon-electronic-communication": 9, "kwangwoon-electronic-convergence": 8,
    "kwangwoon-electrical": 9, "kwangwoon-electronic-materials": 8, "kwangwoon-semiconductor": 6,
    "kwangwoon-computer": 8, "kwangwoon-software": 9, "kwangwoon-information-convergence": 9, "kwangwoon-robot": 8,
    "kwangwoon-architecture": 4, "kwangwoon-architecture-engineering": 4, "kwangwoon-chemical": 9, "kwangwoon-environment": 4,
    "kwangwoon-math": 5, "kwangwoon-electronic-biophysics": 6, "kwangwoon-chemistry": 6,
    "kwangwoon-korean": 3, "kwangwoon-english": 4, "kwangwoon-media": 8, "kwangwoon-psychology": 5,
    "kwangwoon-northeast-culture": 7, "kwangwoon-admin": 5, "kwangwoon-law": 12, "kwangwoon-international": 4,
    "kwangwoon-business": 12, "kwangwoon-business-bigdata": 4, "kwangwoon-international-trade": 6,
  },
  "논술우수자전형": {
    "kwangwoon-electronics": 13, "kwangwoon-electronic-communication": 9, "kwangwoon-electronic-convergence": 8,
    "kwangwoon-electrical": 8, "kwangwoon-electronic-materials": 8, "kwangwoon-semiconductor": 6,
    "kwangwoon-computer": 8, "kwangwoon-software": 9, "kwangwoon-information-convergence": 8, "kwangwoon-robot": 8,
    "kwangwoon-architecture": 4, "kwangwoon-architecture-engineering": 4, "kwangwoon-chemical": 7, "kwangwoon-environment": 4,
    "kwangwoon-math": 5, "kwangwoon-electronic-biophysics": 5, "kwangwoon-chemistry": 6,
    "kwangwoon-korean": 4, "kwangwoon-english": 4, "kwangwoon-media": 8, "kwangwoon-psychology": 4,
    "kwangwoon-northeast-culture": 6, "kwangwoon-admin": 5, "kwangwoon-law": 10, "kwangwoon-international": 4,
    "kwangwoon-business": 12, "kwangwoon-business-bigdata": 4, "kwangwoon-international-trade": 6,
  },
  "체육특기자전형": { "kwangwoon-sports": 15 },
};

const typeMap: Record<string, Admission["type"]> = {
  "광운참빛인재전형Ⅰ-면접형": "학종", "광운참빛인재전형Ⅱ-서류형": "학종", "소프트웨어우수인재전형": "학종",
  "지역균형전형": "교과", "논술우수자전형": "논술", "체육특기자전형": "기타",
};

const admissions: Admission[] = Object.entries(recruitmentMaps).flatMap(([name, counts]) =>
  Object.entries(counts).map(([departmentId, recruitmentCount]) => ({
    id: `${departmentId}-${name.replaceAll(" ", "-")}-2027`,
    universityId: "kwangwoon", departmentId, academicYear: 2027, name, type: typeMap[name], recruitmentCount,
    studentRecordWeight: name === "논술우수자전형" ? 20 : name === "체육특기자전형" ? 10 : name === "지역균형전형" ? 100 : undefined,
    documentWeight: name === "광운참빛인재전형Ⅰ-면접형" || name === "소프트웨어우수인재전형" ? 60 : name === "광운참빛인재전형Ⅱ-서류형" ? 100 : undefined,
    interview: name === "광운참빛인재전형Ⅰ-면접형" || name === "소프트웨어우수인재전형",
    csatMinimum: { enabled: false }, source, isMock: false,
  }))
);

const employeeCounts: Record<string, number> = {
  "kwangwoon-finance": 1, "kwangwoon-game": 1, "kwangwoon-smart-electrical": 0, "kwangwoon-sports-rehab": 0,
};

const employeeAdmissions: Admission[] = Object.entries(employeeCounts).map(([departmentId, recruitmentCount]) => ({
  id: `${departmentId}-employee-2027`, universityId: "kwangwoon", departmentId, academicYear: 2027,
  name: "특성화고등을졸업한재직자전형", type: "학종", recruitmentCount, documentWeight: 100,
  interview: false, csatMinimum: { enabled: false }, source, isMock: false,
}));

export const verifiedKwangwoon2027Admissions: Admission[] = [...admissions, ...employeeAdmissions];
