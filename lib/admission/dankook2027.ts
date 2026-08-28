import type { Admission, Department, University } from "./types";

export const dankook2027Universities: University[] = [
  { id: "dankook-jukjeon", name: "단국대학교(죽전)", region: "경기" },
];

const units: Array<[string, string, string]> = [
  ["korean", "국어국문학과", "인문·사회"],
  ["english", "영어영문학과", "인문·사회"],
  ["history", "사학과", "인문·사회"],
  ["law", "법학과", "인문·사회"],
  ["politics", "정치외교학과", "인문·사회"],
  ["publicadmin", "행정학과", "인문·사회"],
  ["economics", "경제학과", "경영·경제"],
  ["business", "경영학부", "경영·경제"],
  ["international", "무역학과", "경영·경제"],
  ["architecture", "건축학부", "공학"],
  ["civil", "토목환경공학과", "공학"],
  ["mechanical", "기계공학과", "공학"],
  ["chemical", "화학공학과", "공학"],
  ["electrical", "전자전기공학부", "공학"],
  ["computer", "컴퓨터공학과", "컴퓨터·소프트웨어"],
  ["software", "소프트웨어학과", "컴퓨터·소프트웨어"],
  ["math", "수학과", "자연과학"],
  ["physics", "물리학과", "자연과학"],
  ["chemistry", "화학과", "자연과학"],
  ["food", "식품영양학과", "자연과학"],
  ["design", "커뮤니케이션디자인과", "예체능"],
  ["sports", "스포츠과학과", "예체능"],
];

export const dankook2027Departments: Department[] = units.map(([id, name, category]) => ({
  id: `dankook-jukjeon-${id}`,
  universityId: "dankook-jukjeon",
  name,
  category,
}));

const src = "https://ipsi.dankook.ac.kr/jukjeon/dataroom/list.html?bbsid=juk_info&bltn_seq=50954&mode=view&page=1";

const admission = (
  id: string,
  dept: string,
  name: string,
  type: "교과" | "학종" | "논술",
  extra: Partial<Admission> = {},
): Admission => ({
  id: `dankook-jukjeon-${dept}-${id}-2027`,
  universityId: "dankook-jukjeon",
  departmentId: `dankook-jukjeon-${dept}`,
  academicYear: 2027,
  name,
  type,
  source: { type: "university", academicYear: 2027, url: src, confidence: 0.95 },
  isMock: false,
  ...extra,
});

export const dankook2027Admissions: Admission[] = units.flatMap(([id]) => [
  admission("school-recommend", id, "학생부교과우수자전형", "교과", { studentRecordWeight: 100 }),
  admission("school-record", id, "학생부종합전형", "학종", { documentWeight: 100 }),
  admission("essay", id, "논술우수자전형", "논술"),
]);
