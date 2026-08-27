import type { Admission, Department, University } from "./types";

const source = {
  type: "university" as const,
  url: "https://ipsi.syu.ac.kr/2016_syu/pages/index.asp?mj=01&p=8",
  document: "삼육대학교 2027학년도 수시 모집요강",
  academicYear: 2027,
  verifiedAt: "2026-08-27",
  confidence: 0.99,
};

export const verifiedSahmyook2027Universities: University[] = [
  { id: "sahmyook", name: "삼육대학교", region: "서울" },
];

const seed = [
  ["nursing", "간호학과", "보건"],
  ["physical-therapy", "물리치료학과", "보건"],
  ["pharmacy", "약학과", "약학"],
  ["architecture", "건축학과(5년제)", "공학"],
  ["computer", "컴퓨터공학부", "IT"],
  ["data-cloud", "데이터클라우드공학과", "IT"],
  ["business", "경영학과", "상경"],
  ["english", "영어영문학과", "인문"],
  ["counseling", "상담심리학과", "사회과학"],
  ["food-nutrition", "식품영양학과", "자연·보건"],
  ["bio-convergence", "바이오융합공학과", "바이오"],
  ["free-convergence", "창의융합자유전공학부", "자유전공"],
  ["free-future", "미래융합자유전공학부", "자유전공"],
] as const;

export const verifiedSahmyook2027Departments: Department[] = seed.map(([id, name, category]) => ({
  id: `sahmyook-${id}`,
  universityId: "sahmyook",
  name,
  category,
}));

const verifiedCounts: Record<string, { schoolRecommend?: number; seum?: number; essay?: number }> = {
  "sahmyook-pharmacy": { schoolRecommend: 3, seum: 7, essay: 5 },
  "sahmyook-free-convergence": { schoolRecommend: 15, seum: 30, essay: 45 },
  "sahmyook-free-future": { schoolRecommend: 25, seum: 50, essay: 75 },
};

export const verifiedSahmyook2027Admissions: Admission[] = verifiedSahmyook2027Departments.flatMap((d) => {
  const isPharmacy = d.id === "sahmyook-pharmacy";
  const counts = verifiedCounts[d.id] ?? {};
  const result: Admission[] = [
    {
      id: `${d.id}-seum-2027`, universityId: "sahmyook", departmentId: d.id,
      academicYear: 2027, name: "세움인재전형", type: "학종",
      ...(counts.seum ? { recruitmentCount: counts.seum } : {}),
      documentWeight: 60, interviewWeight: 40,
      csatMinimum: isPharmacy ? { enabled: true, description: "국어·영어·수학(미적분 또는 기하)·과학탐구(1과목) 중 3개 영역 합 5등급 이내" } : { enabled: false },
      source, isMock: false,
    },
    {
      id: `${d.id}-school-recommend-2027`, universityId: "sahmyook", departmentId: d.id,
      academicYear: 2027, name: "학교장추천전형", type: "교과",
      ...(counts.schoolRecommend ? { recruitmentCount: counts.schoolRecommend } : {}),
      studentRecordWeight: 100,
      csatMinimum: isPharmacy ? { enabled: true, description: "국어·영어·수학(미적분 또는 기하)·과학탐구(1과목) 중 3개 영역 합 5등급 이내" } : d.id === "sahmyook-nursing" || d.id === "sahmyook-physical-therapy" ? { enabled: true, description: "국어·영어·수학·탐구(1과목) 중 2개 영역 합 6등급 이내" } : { enabled: true, description: "국어·영어·수학·탐구(1과목) 중 2개 영역 합 7등급 이내" },
      source, isMock: false,
    },
  ];
  if (d.id !== "sahmyook-theology") {
    result.push({
      id: `${d.id}-essay-2027`, universityId: "sahmyook", departmentId: d.id,
      academicYear: 2027, name: "논술우수자전형", type: "논술",
      ...(counts.essay ? { recruitmentCount: counts.essay } : {}),
      csatMinimum: isPharmacy ? { enabled: true, description: "국어·영어·수학(미적분 또는 기하)·과학탐구(1과목) 중 3개 영역 합 5등급 이내" } : { enabled: true, description: "국어·영어·수학·탐구(1과목) 중 1개 영역 3등급 이내" },
      source, isMock: false,
    });
  }
  return result;
});
