import type { Admission, Department, University } from "./types";

const source = {
  type: "university" as const,
  academicYear: 2027,
  url: "https://admission.smu.ac.kr/bbs/fileview.php?bbsid=seoul_mojib&file_seq=8564",
  document: "상명대학교 2027학년도 수시모집요강",
  verifiedAt: "2026-09-06",
  confidence: 1,
};

export const verifiedSangmyung2027Universities: University[] = [
  { id: "sangmyung", name: "상명대학교", region: "서울" },
];

// 공식 최종 모집요강의 전형별 '계'를 그대로 보존한다.
// 학과별 세부 배분을 임의 생성하지 않고, 공식 합계가 확실한 전형은 '전체' 모집단위로 집계한다.
const tracks = [
  ["고교추천(전체)", "고교추천", "교과", 349],
  ["상명인재(전체)", "상명인재", "학종", 155],
  ["기회균형(전체)", "기회균형", "학종", 70],
  ["특성화고졸재직자(정원내)", "특성화고졸재직자", "학종", 1],
  ["논술(전체)", "논술", "논술", 98],
  ["실기(전체)", "실기", "기타", 138],
  ["서해5도학생(정원외)", "서해5도학생", "교과", 6],
  ["특수교육대상자(정원외)", "특수교육대상자", "학종", 7],
  ["특성화고졸재직자(정원외)", "특성화고졸재직자(정원외)", "학종", 123],
] as const;

export const verifiedSangmyung2027Departments: Department[] = tracks.map(([name], i) => ({
  id: `sangmyung-2027-${i + 1}`,
  universityId: "sangmyung",
  name,
}));

const departmentByName = new Map(verifiedSangmyung2027Departments.map(d => [d.name, d]));

const makeAdmission = (
  departmentName: string,
  admissionName: string,
  type: Admission["type"],
  count: number,
): Admission => {
  const department = departmentByName.get(departmentName)!;
  const isCurriculum = type === "교과";
  const isEssay = type === "논술";
  const isPractical = admissionName === "실기";

  return {
    id: `${department.id}-${admissionName}-2027`,
    universityId: "sangmyung",
    departmentId: department.id,
    academicYear: 2027,
    name: admissionName,
    type,
    recruitmentCount: count,
    ...(isCurriculum ? { studentRecordWeight: 100 } : {}),
    ...(admissionName === "상명인재" || admissionName === "기회균형" || admissionName.includes("특성화고졸재직자") || admissionName === "특수교육대상자"
      ? { documentWeight: 100 }
      : {}),
    ...(isEssay ? { studentRecordWeight: 10, documentWeight: 90 } : {}),
    ...(isPractical ? { studentRecordWeight: 0 } : {}),
    csatMinimum: { enabled: false },
    source,
    isMock: false,
    isAggregate: true,
  };
};

export const verifiedSangmyung2027Admissions: Admission[] = tracks.map(([departmentName, admissionName, type, count]) =>
  makeAdmission(departmentName, admissionName, type, count),
);
