import type { Admission, Department, University } from "@/lib/types";

const sourceKyunghee = {
  type: "university" as const,
  url: "https://iphak.khu.ac.kr/detail.do?board_seq=17324&categoryid=1&menuurl=RnNfVbLHUGrJz9kJgEyRDQ%3D%3D&pageNo=1",
  academicYear: 2027,
  confidence: 0.98,
  verifiedAt: "2026-08-27",
};

const sourceIncheon = {
  type: "university" as const,
  url: "https://admission.inu.ac.kr/main.do",
  academicYear: 2027,
  confidence: 0.98,
  verifiedAt: "2026-08-27",
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
  { id: "inu-ai", universityId: "inu", name: "인공지능정보통신공학과", category: "컴퓨터·소프트웨어" },
];

export const capital2027Admissions: Admission[] = [
  ...["kyunghee-business", "kyunghee-computer", "kyunghee-economics"].flatMap((departmentId) => [
    { id: `kyunghee-regional-${departmentId}`, universityId: "kyunghee", departmentId, academicYear: 2027, name: "학생부교과(지역균형전형)", type: "교과" as const, source: sourceKyunghee, isMock: false },
    { id: `kyunghee-neo-${departmentId}`, universityId: "kyunghee", departmentId, academicYear: 2027, name: "학생부종합(네오르네상스전형)", type: "학종" as const, source: sourceKyunghee, isMock: false },
    { id: `kyunghee-essay-${departmentId}`, universityId: "kyunghee", departmentId, academicYear: 2027, name: "논술우수자전형", type: "논술" as const, source: sourceKyunghee, isMock: false },
  ]),
  ...["inu-business", "inu-computer", "inu-ai"].flatMap((departmentId) => [
    { id: `inu-grade-${departmentId}`, universityId: "inu", departmentId, academicYear: 2027, name: "학생부교과(교과성적우수자전형)", type: "교과" as const, studentRecordWeight: 100, csatMinimum: { enabled: true }, source: sourceIncheon, isMock: false },
    { id: `inu-regional-${departmentId}`, universityId: "inu", departmentId, academicYear: 2027, name: "학생부교과(지역균형전형)", type: "교과" as const, studentRecordWeight: 100, source: sourceIncheon, isMock: false },
    { id: `inu-self-${departmentId}`, universityId: "inu", departmentId, academicYear: 2027, name: "학생부종합(자기추천전형)", type: "학종" as const, interview: true, source: sourceIncheon, isMock: false },
    { id: `inu-opportunity-${departmentId}`, universityId: "inu", departmentId, academicYear: 2027, name: "학생부종합(기회균형전형)", type: "학종" as const, source: sourceIncheon, isMock: false },
  ]),
];
