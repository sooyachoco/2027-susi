import type { Admission, Department, University } from "./types";

const source = {
  type: "university" as const,
  url: "https://iphak.khu.ac.kr/detail.do?board_seq=17324&categoryid=1",
  document: "2027학년도 경희대학교 수시 모집요강-최종_20260811",
  academicYear: 2027,
  confidence: 0.99,
};

export const verifiedKyungHee2027Universities: University[] = [
  { id: "kyunghee", name: "경희대학교", region: "서울" },
];

type Row = [string, string, number, number, number, number];

// 2027 수시 최종 모집요강 기준 서울캠퍼스 모집단위별 정원내 주요 전형 인원.
// 국제캠퍼스(경기)는 프로젝트 범위에서 제외한다.
const rows: Row[] = [
  ["자율전공학부", "자유전공", 54, 32, 3, 2],
  ["자유전공학부", "자유전공", 158, 12, 0, 0],
  ["국어국문학과", "인문", 6, 20, 2, 2],
  ["영어영문학과", "인문", 4, 11, 2, 1],
  ["응용영어통번역학과", "인문", 4, 12, 2, 1],
  ["사학과", "인문", 5, 14, 2, 2],
  ["철학과", "인문", 3, 10, 2, 0],
  ["프랑스어학과", "인문", 3, 14, 2, 3],
  ["스페인어학과", "인문", 3, 14, 2, 3],
  ["러시아어학과", "인문", 3, 13, 2, 4],
  ["중국어학과", "인문", 3, 18, 2, 4],
  ["일본어학과", "인문", 3, 16, 2, 3],
  ["한국어학과", "인문", 3, 8, 2, 2],
  ["글로벌커뮤니케이션학부", "인문", 4, 23, 2, 3],
  ["정치외교학과", "사회", 5, 14, 2, 2],
  ["행정학과", "사회", 12, 14, 3, 2],
  ["사회학과", "사회", 6, 8, 2, 2],
  ["경제학과", "경영·경제", 12, 20, 3, 2],
  ["무역학과", "경영·경제", 10, 16, 3, 2],
  ["미디어학과", "미디어·콘텐츠", 10, 25, 3, 2],
  ["국제학과", "국제", 10, 55, 3, 4],
  ["경영회계계열", "경영·경제", 30, 61, 9, 27],
  ["빅데이터응용학과", "컴퓨터·데이터", 2, 6, 0, 4],
  ["Hospitality경영학과", "경영·관광", 13, 28, 2, 6],
  ["조리&푸드디자인학과", "경영·관광", 3, 22, 2, 2],
  ["관광·엔터테인먼트학부", "경영·관광", 8, 21, 2, 6],
  ["아동가족학과", "생활과학", 6, 6, 2, 2],
  ["주거환경학과", "생활과학", 4, 3, 2, 0],
  ["의상학과", "생활과학", 4, 10, 2, 0],
  ["지리학과(인문)", "사회", 4, 5, 2, 2],
  ["한의예과(인문)", "의약학", 3, 9, 0, 5],
  ["식품영양학과", "자연", 4, 9, 3, 5],
  ["수학과", "자연", 6, 8, 3, 7],
  ["물리학과", "자연", 7, 13, 2, 7],
  ["화학과", "자연", 8, 13, 3, 6],
  ["생물학과", "자연", 10, 16, 3, 7],
  ["지리학과(자연)", "자연", 3, 4, 2, 4],
  ["미래정보디스플레이학부", "첨단·자연", 5, 29, 3, 6],
  ["의예과", "의약학", 11, 25, 19, 55],
  ["한의예과(자연)", "의약학", 5, 19, 15, 39],
  ["치의예과", "의약학", 8, 19, 13, 40],
  ["약학과", "의약학", 4, 9, 7, 20],
  ["한약학과", "의약학", 3, 9, 2, 6],
  ["약과학과", "의약학", 6, 9, 3, 2],
  ["간호학과", "간호", 14, 18, 4, 4],
];

export const verifiedKyungHee2027Departments: Department[] = rows.map(([name, category], index) => ({
  id: `kyunghee-${index + 1}`,
  universityId: "kyunghee",
  name,
  category,
}));

const admissionFor = (
  department: Department,
  name: string,
  type: Admission["type"],
  extra: Partial<Admission> = {},
): Admission => ({
  id: `${department.id}-${type}-${name.replace(/[^가-힣A-Za-z0-9]+/g, "-")}`,
  universityId: "kyunghee",
  departmentId: department.id,
  academicYear: 2027,
  name,
  type,
  source,
  isMock: false,
  ...extra,
});

export const verifiedKyungHee2027Admissions: Admission[] = rows.flatMap((row, index) => {
  const department = verifiedKyungHee2027Departments[index];
  const [, , regional, neo, opportunityI, essay] = row;
  const admissions: Admission[] = [];

  if (regional > 0) admissions.push(admissionFor(department, "학생부교과(지역균형전형)", "교과", {
    recruitmentCount: regional,
    studentRecordWeight: 70,
  }));

  if (neo > 0) admissions.push(admissionFor(department, "학생부종합(네오르네상스전형)", "학종", {
    recruitmentCount: neo,
    documentWeight: 100,
    interview: true,
  }));

  if (opportunityI > 0) admissions.push(admissionFor(department, "기회균형전형Ⅰ", "기타", {
    recruitmentCount: opportunityI,
    documentWeight: 70,
  }));

  if (essay > 0) admissions.push(admissionFor(department, "논술(논술우수자전형)", "논술", {
    recruitmentCount: essay,
  }));

  return admissions;
});

// 모집단위별로 직접 배정되지 않는 전형은 서울캠퍼스 기준 집계 전형으로 보존한다.
verifiedKyungHee2027Admissions.push(
  admissionFor({ id: "kyunghee-aggregate", universityId: "kyunghee", name: "경희대학교", category: "전체" }, "기회균형전형Ⅱ(통합)", "기타", {
    recruitmentCount: 90,
    isAggregate: true,
  }),
  admissionFor({ id: "kyunghee-disability", universityId: "kyunghee", name: "경희대학교", category: "전체" }, "장애인 등 대상자(서울)", "기타", {
    recruitmentCount: 10,
    isAggregate: true,
  }),
  admissionFor({ id: "kyunghee-employee", universityId: "kyunghee", name: "경희대학교", category: "전체" }, "특성화고 등을 졸업한 재직자(서울)", "기타", {
    recruitmentCount: 223,
    isAggregate: true,
    studentRecordWeight: 30,
    documentWeight: 70,
  }),
);

export const verifiedKyungHee2027Summary = {
  source,
  campusScope: "서울캠퍼스",
  excludedCampus: "국제캠퍼스(경기)",
  officialMainTotals: {
    regional: 604,
    employee: 223,
    neoRenaissance: 1076,
    opportunityI: 150,
    disability: 15,
    opportunityII: 90,
    essay: 471,
    practical: 337,
  },
  notes: [
    "서울캠퍼스 모집단위별 지역균형·네오르네상스·기회균형Ⅰ·논술 인원을 공식 최종 모집요강 표 기준 반영",
    "국제캠퍼스(경기) 모집단위는 프로젝트 범위에서 제외",
    "지역균형: 학생부 교과·비교과 70% + 교과종합평가 30%",
    "재직자: 학생부 30% + 서류평가 70%",
    "네오르네상스: 1단계 서류평가 100%, 2단계 1단계 성적 70% + 면접 30%",
    "기회균형Ⅰ·Ⅱ: 서류평가 70% + 학생부 교과 30%",
    "논술우수자: 논술고사 100%",
    "지역균형 및 인문·자연 논술은 수능최저 2개 영역 합 5 및 한국사 5등급 이내, 의약학 계열은 별도 기준 적용",
  ],
};
