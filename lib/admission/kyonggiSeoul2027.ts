import type { Admission, Department, University } from "./types";

const source = {
  type: "university" as const,
  academicYear: 2027,
  url: "https://enter.kyonggi.ac.kr/cms/FR_BBS_CON/BoardView.do?BBS_SEQ=4366&BOARD_SEQ=1&CONTENTS_NO=3&MENU_ID=210&SITE_NO=2",
  confidence: 0.99,
};

export const kyonggiSeoul2027Universities: University[] = [
  { id: "kyonggi-seoul", name: "경기대학교(서울)", region: "서울" },
];

const departments = [
  ["free-major", "자유전공학부(서울)", "자유전공"],
  ["media-video", "미디어영상학과", "인문·사회"],
  ["tourism-development", "관광개발경영학과", "관광·경영"],
  ["tourism-culture", "관광문화콘텐츠학과", "관광·문화"],
  ["hotel-restaurant", "호텔외식경영학부", "관광·경영"],
  ["acting", "연기학과", "예술"],
  ["animation-imagination", "애니메이션학과(상상과표현)", "예술"],
  ["animation-webtoon", "애니메이션학과(웹툰)", "예술"],
  ["practical-music", "실용음악학과", "예술"],
] as const;

export const kyonggiSeoul2027Departments: Department[] = departments.map(([id, name, category]) => ({
  id: `kyonggi-seoul-${id}`,
  universityId: "kyonggi-seoul",
  name,
  category,
}));

const aggregate: Department = {
  id: "kyonggi-seoul-overall",
  universityId: "kyonggi-seoul",
  name: "2027 수시 전체(서울캠퍼스)",
  category: "전체",
};

export const kyonggiSeoul2027DepartmentsWithAggregate: Department[] = [
  ...kyonggiSeoul2027Departments,
  aggregate,
];

type AdmissionSpec = {
  departmentId: string;
  name: string;
  type: Admission["type"];
  count: number;
  studentRecordWeight?: number;
  documentWeight?: number;
  interview?: boolean;
};

const specs: AdmissionSpec[] = [];

const add = (
  departmentId: string,
  name: string,
  type: Admission["type"],
  count: number,
  options: Omit<AdmissionSpec, "departmentId" | "name" | "type" | "count"> = {},
) => {
  if (count > 0) specs.push({ departmentId, name, type, count, ...options });
};

// 2027 서울캠퍼스 모집단위별 시행계획 표 기준.
// 교과성적우수자 / 학교장추천 / 농어촌 / 기초생활수급자등 / KGU학생부종합 / 기회균형 / 사회배려 순.
const rows = [
  ["free-major", 41, 0, 0, 0, 0, 0, 0],
  ["media-video", 3, 6, 2, 0, 12, 4, 0],
  ["tourism-development", 5, 10, 3, 2, 20, 7, 2],
  ["tourism-culture", 3, 5, 2, 0, 10, 3, 0],
  ["hotel-restaurant", 4, 9, 2, 2, 14, 6, 2],
] as const;

for (const [departmentId, 교과성적우수자, 학교장추천, 농어촌, 기초생활, KGU학생부종합, 기회균형, 사회배려] of rows) {
  const id = `kyonggi-seoul-${departmentId}`;
  add(id, "교과성적우수자", "교과", 교과성적우수자, { studentRecordWeight: 100 });
  add(id, "학교장추천", "교과", 학교장추천, { studentRecordWeight: 100 });
  add(id, "농어촌학생", "교과", 농어촌, { studentRecordWeight: 100 });
  add(id, "기초생활수급자등선발", "교과", 기초생활, { studentRecordWeight: 100 });
  add(id, "KGU학생부종합", "학종", KGU학생부종합, { documentWeight: 70, interview: true });
  add(id, "기회균형선발", "학종", 기회균형, { documentWeight: 100 });
  add(id, "사회배려대상자", "학종", 사회배려, { documentWeight: 100 });
}

// 자유전공학부(서울): 교과성적우수자 41명 + 논술 13명.
add("kyonggi-seoul-free-major", "논술우수자", "논술", 13);

// 예능실기우수자: 연기 17, 애니메이션 상상과표현 11, 웹툰 5, 실용음악 22.
add("kyonggi-seoul-acting", "예능실기우수자", "기타", 17);
add("kyonggi-seoul-animation-imagination", "예능실기우수자", "기타", 11);
add("kyonggi-seoul-animation-webtoon", "예능실기우수자", "기타", 5);
add("kyonggi-seoul-practical-music", "예능실기우수자", "기타", 22);

export const kyonggiSeoul2027Admissions: Admission[] = specs.map(({ departmentId, name, type, count, studentRecordWeight, documentWeight, interview }) => ({
  id: `kyonggi-seoul-2027-${departmentId}-${name}`,
  universityId: "kyonggi-seoul",
  departmentId,
  academicYear: 2027,
  name,
  type,
  recruitmentCount: count,
  ...(studentRecordWeight !== undefined ? { studentRecordWeight } : {}),
  ...(documentWeight !== undefined ? { documentWeight } : {}),
  ...(interview ? { interview: true } : {}),
  csatMinimum: { enabled: false },
  source,
  isMock: false,
}));

export const kyonggiSeoul2027AggregateDepartment = aggregate;
