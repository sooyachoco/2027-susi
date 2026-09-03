import type { Admission, Department, University } from "./types";

const source = {
  type: "university" as const,
  academicYear: 2027,
  url: "https://enter.kyonggi.ac.kr/cms/FR_BBS_CON/BoardView.do?BBS_SEQ=4366&BOARD_SEQ=1&CONTENTS_NO=3&MENU_ID=210&SITE_NO=2",
  confidence: 0.98,
};

export const kyonggiSeoul2027Universities: University[] = [
  { id: "kyonggi-seoul", name: "경기대학교(서울)", region: "서울" },
];

const departments = [
  ["free-major", "자유전공학부(서울)", "자유전공"],
  ["media-video", "미디어영상학과", "인문·사회"],
  ["tourism-development", "관광개발경영학과", "관광·경영"],
  ["tourism-culture", "관광문화콘텐츠학과", "관광·문화"],
  ["acting", "연기학과", "예술"],
  ["animation", "애니메이션학과", "예술"],
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

const admissions: Array<[string, Admission["type"], number, number?, boolean?]> = [
  ["논술우수자", "논술", 54, 100, false],
  ["KGU학생부종합", "학종", 0, 100, true],
  ["학교장추천", "교과", 0, 100, false],
  ["교과성적우수자", "교과", 0, 100, false],
  ["실기우수자", "기타", 0],
  ["특기자", "기타", 0],
];

export const kyonggiSeoul2027Admissions: Admission[] = admissions.map(([name, type, count, studentRecordWeight, interview]) => ({
  id: `kyonggi-seoul-2027-${name}`,
  universityId: "kyonggi-seoul",
  departmentId: aggregate.id,
  academicYear: 2027,
  name,
  type,
  recruitmentCount: count,
  ...(studentRecordWeight !== undefined ? { studentRecordWeight } : {}),
  ...(interview ? { interview: true } : {}),
  csatMinimum: { enabled: false },
  source,
  isMock: false,
}));

export const kyonggiSeoul2027AggregateDepartment = aggregate;
