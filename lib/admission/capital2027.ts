import type { Admission, Department, University } from "@/lib/types";

const sourceKyunghee = {
  type: "university" as const,
  url: "https://iphak.khu.ac.kr/detail.do?board_seq=17324&categoryid=1&menuurl=RnNfVbLHUGrJz9kJgEyRDQ%3D%3D&pageNo=1",
  academicYear: 2027,
  confidence: 0.99,
  verifiedAt: "2026-09-05",
};

const sourceIncheon = {
  type: "university" as const,
  url: "https://admission.inu.ac.kr/main.do",
  academicYear: 2027,
  confidence: 0.99,
  verifiedAt: "2026-09-05",
};

export const capital2027Universities: University[] = [
  { id: "kyunghee", name: "경희대학교", region: "서울" },
  { id: "inu", name: "인천대학교", region: "인천" },
];

export const capital2027Departments: Department[] = [
  { id: "kyunghee-business", universityId: "kyunghee", name: "경영학과", category: "경영·경제" },
  { id: "kyunghee-computer", universityId: "kyunghee", name: "컴퓨터공학과", category: "컴퓨터·소프트웨어" },
  { id: "kyunghee-economics", universityId: "kyunghee", name: "경제학과", category: "경영·경제" },
  { id: "inu-business", universityId: "inu", name: "경영학부", category: "경영·경제" },
  { id: "inu-computer", universityId: "inu", name: "컴퓨터공학부", category: "컴퓨터·소프트웨어" },
  { id: "inu-ai", universityId: "inu", name: "인공지능정보통신공학부", category: "컴퓨터·소프트웨어" },
];

export const capital2027Admissions: Admission[] = [
  ...["kyunghee-business", "kyunghee-computer", "kyunghee-economics"].flatMap((departmentId) => {
    const recruitment = {
      "kyunghee-business": { regional: 23, neo: 43, essay: 21 },
      "kyunghee-computer": { regional: 2, neo: 7, essay: 9 },
      "kyunghee-economics": { regional: 12, neo: 20, essay: 7 },
    }[departmentId];

    return [
      { id: `kyunghee-regional-${departmentId}`, universityId: "kyunghee", departmentId, academicYear: 2027, name: "학생부교과(지역균형전형)", type: "교과" as const, recruitmentCount: recruitment.regional, source: sourceKyunghee, isMock: false },
      { id: `kyunghee-neo-${departmentId}`, universityId: "kyunghee", departmentId, academicYear: 2027, name: "학생부종합(네오르네상스전형)", type: "학종" as const, recruitmentCount: recruitment.neo, source: sourceKyunghee, isMock: false },
      { id: `kyunghee-essay-${departmentId}`, universityId: "kyunghee", departmentId, academicYear: 2027, name: "논술우수자전형", type: "논술" as const, recruitmentCount: recruitment.essay, source: sourceKyunghee, isMock: false },
    ];
  }),
  ...["inu-business", "inu-computer", "inu-ai"].flatMap((departmentId) => {
    const recruitment = {
      "inu-business": { grade: 19, regional: 9, self: 24, opportunity: 5 },
      "inu-computer": { grade: 18, regional: 11, self: 29, opportunity: 5 },
      "inu-ai": { grade: 15, regional: 9, self: 21, opportunity: 3 },
    }[departmentId];

    return [
      { id: `inu-grade-${departmentId}`, universityId: "inu", departmentId, academicYear: 2027, name: "학생부교과(교과성적우수자전형)", type: "교과" as const, recruitmentCount: recruitment.grade, studentRecordWeight: 100, csatMinimum: { enabled: true }, source: sourceIncheon, isMock: false },
      { id: `inu-regional-${departmentId}`, universityId: "inu", departmentId, academicYear: 2027, name: "학생부교과(지역균형전형)", type: "교과" as const, recruitmentCount: recruitment.regional, studentRecordWeight: 100, source: sourceIncheon, isMock: false },
      { id: `inu-self-${departmentId}`, universityId: "inu", departmentId, academicYear: 2027, name: "학생부종합(자기추천전형)", type: "학종" as const, recruitmentCount: recruitment.self, interview: true, source: sourceIncheon, isMock: false },
      { id: `inu-opportunity-${departmentId}`, universityId: "inu", departmentId, academicYear: 2027, name: "학생부종합(기회균형전형)", type: "학종" as const, recruitmentCount: recruitment.opportunity, source: sourceIncheon, isMock: false },
    ];
  }),
];
