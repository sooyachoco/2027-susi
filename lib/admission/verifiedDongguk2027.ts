import type { Admission, Department, University } from "./types";

export const verifiedDongguk2027Universities: University[] = [
  { id: "dongguk-2027", name: "동국대학교", region: "서울" },
];

const source = {
  type: "university" as const,
  url: "https://ipsi.dongguk.edu/admission/html/rolling/guide.asp",
  document: "동국대학교 2027학년도 수시모집요강",
  academicYear: 2027,
  verifiedAt: "2026-09-06",
  confidence: 1,
};

// 2027 최종 모집요강 p.6의 전형별 '계'를 우선 보존한다.
// 세부 모집단위 매핑이 불명확한 항목은 임의 배분하지 않고 '전체' 모집단위로 집계한다.
const tracks = [
  ["Do Dream(전체)", "Do Dream", 655],
  ["불교추천인재(전체)", "불교추천인재", 108],
  ["기회균형통합(전체)", "기회균형통합", 132],
  ["특수교육대상자(전체)", "특수교육대상자", 8],
  ["재직자 면접형(전체)", "특성화고등을졸업한재직자(면접형)", 58],
  ["재직자 서류형(전체)", "특성화고등을졸업한재직자(서류형)", 90],
  ["학교장추천인재(전체)", "학교장추천인재", 409],
  ["논술(전체)", "논술", 282],
  ["실기/실적(전체)", "실기/실적", 173],
] as const;

export const verifiedDongguk2027Departments: Department[] = tracks.map(([name], i) => ({
  id: `dongguk-2027-${i + 1}`,
  universityId: "dongguk-2027",
  name,
}));

const departmentByName = new Map(verifiedDongguk2027Departments.map(d => [d.name, d]));

const admissionsByTrack = (name: string, admissionName: string, type: Admission["type"], count: number): Admission => {
  const department = departmentByName.get(name)!;
  const isInterview = ["Do Dream", "불교추천인재", "기회균형통합", "특수교육대상자", "특성화고등을졸업한재직자(면접형)"].includes(admissionName);
  const isEmployeeDocument = admissionName === "특성화고등을졸업한재직자(서류형)";
  const isSchoolRecommendation = admissionName === "학교장추천인재";
  const isEssay = admissionName === "논술";

  return {
    id: `${department.id}-${admissionName}-2027`,
    universityId: "dongguk-2027",
    departmentId: department.id,
    academicYear: 2027,
    name: admissionName,
    type,
    recruitmentCount: count,
    ...(isInterview ? { documentWeight: 70, interview: true } : {}),
    ...(isEmployeeDocument ? { documentWeight: 100 } : {}),
    ...(isSchoolRecommendation ? { studentRecordWeight: 70, documentWeight: 30 } : {}),
    ...(isEssay ? { studentRecordWeight: 30 } : {}),
    csatMinimum: isEssay
      ? {
          enabled: true,
          description:
            "국어/수학/영어/탐구 2개 영역 등급 합 5 이내(한국사 4등급). 자연계열은 수학 또는 과학탐구 1개 이상 포함. 컴퓨터·AI학부 인문은 수학 포함, 자연은 수학 또는 과학탐구 포함. 경찰행정학부는 2개 영역 합 4, 약학과는 3개 영역 합 4이며 수학 또는 과학탐구 1개 이상 포함.",
        }
      : { enabled: false },
    source,
    isMock: false,
  };
};

export const verifiedDongguk2027Admissions: Admission[] = tracks.map(([name, admissionName, count]) => {
  const type: Admission["type"] =
    admissionName === "학교장추천인재" ? "교과" : admissionName === "논술" ? "논술" : admissionName === "실기/실적" ? "기타" : "학종";
  return admissionsByTrack(name, admissionName, type, count);
});
