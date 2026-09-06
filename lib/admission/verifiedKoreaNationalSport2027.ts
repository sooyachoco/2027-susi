import type { Admission, Department, University } from "@/lib/types";

export const verifiedKoreaNationalSport2027Universities: University[] = [
  { id: "knsu", name: "한국체육대학교", region: "서울" },
];

const departmentNames = [
  "체육학과", "경기지도학과", "공연예술학과", "태권도학과", "사회체육학과",
  "스포츠청소년지도학과", "노인체육복지학과", "특수체육교육과", "스포츠산업학과", "운동건강관리학과",
];

export const verifiedKoreaNationalSport2027Departments: Department[] = departmentNames.map((name, index) => ({
  id: `knsu-${index + 1}`,
  universityId: "knsu",
  name,
  category: "체육",
}));

const admissions: Admission[] = [];
const add = (departmentId: string, name: string, type: Admission["type"], count: number, extra: Partial<Admission> = {}) => {
  admissions.push({
    id: `knsu-2027-${admissions.length + 1}`,
    universityId: "knsu",
    departmentId,
    academicYear: 2027,
    name,
    type,
    recruitmentCount: count,
    source: "한국체육대학교 2027 수시모집요강",
    ...extra,
  } as Admission);
};

// 최종 수시 모집요강에서 수시 모집인원이 명확히 확인되는 대학독자전형.
add("knsu-3", "실기우수자전형", "기타", 35, { studentRecordWeight: 30 });
add("knsu-5", "교과성적우수자전형", "교과", 50, { studentRecordWeight: 100 });

// 경기입상실적우수자 수시: 경기지도학과 16명 + 태권도학과 15명.
add("knsu-2", "경기입상실적우수자전형(경기지도학과)", "기타", 16, { documentWeight: 60, studentRecordWeight: 40 });
add("knsu-4", "경기입상실적우수자전형(태권도학과)", "기타", 15, { documentWeight: 65, studentRecordWeight: 35, interview: true });

export const verifiedKoreaNationalSport2027Admissions = admissions;

export const verifiedKoreaNationalSport2027Summary = {
  academicYear: 2027,
  university: "한국체육대학교",
  region: "서울",
  verified: true,
  source: "https://www.knsu.ac.kr/ipsi/rolling/application.do",
  notes: [
    "2027 수시모집요강 공지: 2026-05-29.",
    "2026-06-02 기본계획 변경: 체육특기자 체육학과 단체종목 실기고사 배점 현행화.",
    "2026-06-16 수시모집요강 변경, 2026-07-02 근대5종 체육특기자 변경 공지 확인.",
    "체육특기자전형의 전체 235명과 경기입상실적우수자 전체 45명은 수시·정시 합산 수치이므로 수시 모집인원으로 직접 사용하지 않음.",
    "수시에서 확인된 경기입상실적우수자는 경기지도학과 16명, 태권도학과 15명.",
  ],
};
