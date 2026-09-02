import type { Admission, Department, University } from "./types";

export const hanshin2027Universities: University[] = [
  { id: "hanshin", name: "한신대학교", region: "경기" },
];

const source = {
  type: "university" as const,
  academicYear: 2027,
  url: "https://ent.hs.ac.kr/ipsi/pages/?b=B_1_1&bn=22867&m=read&p=17",
  confidence: 0.98,
};

const units: Array<[string, string, string]> = [
  ["free", "자유전공학부", "자유전공"],
  ["theology-humanities", "신학·인문융합계열", "인문·사회"],
  ["culture", "문화콘텐츠계열", "문화·콘텐츠"],
  ["global", "글로벌융합계열", "인문·사회"],
  ["business", "경영계열", "경영·경제"],
  ["media", "미디어계열", "미디어·콘텐츠"],
  ["human-services", "휴먼서비스계열", "인문·사회"],
  ["special-physical", "특수체육학계열", "체육"],
  ["advanced", "첨단융합계열", "공학"],
  ["ai-sw", "AI·SW계열", "컴퓨터·AI"],
  ["ai-semiconductor", "AI시스템반도체학", "공학"],
];

export const hanshin2027Departments: Department[] = units.map(([id, name, category]) => ({
  id: `hanshin-${id}`,
  universityId: "hanshin",
  name,
  category,
}));

type CountMap = Partial<Record<"논술" | "참인재" | "학생부우수자" | "학교장추천" | "사회배려자" | "고른기회" | "체육실기" | "기회균형선발" | "농어촌학생" | "특성화고교졸업자", number>>;

const counts: Record<string, CountMap> = {
  free: { 논술: 30, 참인재: 35, 학생부우수자: 35, 학교장추천: 20 },
  "theology-humanities": { 논술: 40, 참인재: 10, 학생부우수자: 10, 학교장추천: 12, 사회배려자: 15 },
  culture: { 논술: 39, 참인재: 8, 학생부우수자: 10, 학교장추천: 8, 사회배려자: 10 },
  global: { 논술: 38, 참인재: 8, 학생부우수자: 8, 학교장추천: 12, 사회배려자: 14 },
  business: { 논술: 10, 참인재: 18, 학생부우수자: 27, 학교장추천: 4, 사회배려자: 5, 고른기회: 3, 기회균형선발: 3, 농어촌학생: 4, 특성화고교졸업자: 5 },
  media: { 논술: 8, 참인재: 14, 학생부우수자: 21, 학교장추천: 4, 사회배려자: 5, 고른기회: 3, 기회균형선발: 4, 농어촌학생: 4, 특성화고교졸업자: 5 },
  "human-services": { 논술: 42, 참인재: 6, 학생부우수자: 7, 학교장추천: 5, 사회배려자: 10 },
  "special-physical": { 체육실기: 22 },
  advanced: { 논술: 22, 참인재: 5, 학생부우수자: 8, 학교장추천: 5, 사회배려자: 6 },
  "ai-sw": { 논술: 50, 참인재: 60, 학생부우수자: 50, 학교장추천: 10, 사회배려자: 10, 고른기회: 15, 기회균형선발: 7, 농어촌학생: 6, 특성화고교졸업자: 7 },
  "ai-semiconductor": { 논술: 10, 참인재: 7, 학생부우수자: 10, 학교장추천: 5 },
};

const method: Record<string, Pick<Admission, "type" | "studentRecordWeight" | "interview" | "csatMinimum"> & Partial<Pick<Admission, "documentWeight">>> = {
  논술: { type: "논술", studentRecordWeight: 20, csatMinimum: { enabled: false } },
  참인재: { type: "교과", studentRecordWeight: 60, interview: true, csatMinimum: { enabled: false } },
  학생부우수자: { type: "교과", studentRecordWeight: 100, csatMinimum: { enabled: false } },
  학교장추천: { type: "교과", studentRecordWeight: 100, csatMinimum: { enabled: false } },
  사회배려자: { type: "교과", studentRecordWeight: 100, csatMinimum: { enabled: false } },
  고른기회: { type: "교과", studentRecordWeight: 100, csatMinimum: { enabled: false } },
  체육실기: { type: "기타", studentRecordWeight: 45, csatMinimum: { enabled: false } },
  기회균형선발: { type: "교과", studentRecordWeight: 100, csatMinimum: { enabled: false } },
  농어촌학생: { type: "교과", studentRecordWeight: 100, csatMinimum: { enabled: false } },
  특성화고교졸업자: { type: "교과", studentRecordWeight: 100, csatMinimum: { enabled: false } },
};

const names = {
  논술: "논술전형",
  참인재: "참인재전형",
  학생부우수자: "학생부우수자전형",
  학교장추천: "학교장추천전형",
  사회배려자: "사회배려자전형",
  고른기회: "고른기회전형",
  체육실기: "체육실기전형",
  기회균형선발: "기회균형선발전형",
  농어촌학생: "농어촌학생전형",
  특성화고교졸업자: "특성화고교졸업자전형",
} as const;

export const hanshin2027Admissions: Admission[] = units.flatMap(([id]) => {
  const departmentId = `hanshin-${id}`;
  return Object.entries(counts[id]).map(([key, recruitmentCount]) => {
    const k = key as keyof typeof names;
    const m = method[k];
    return {
      id: `${departmentId}-${k}-2027`,
      universityId: "hanshin",
      departmentId,
      academicYear: 2027,
      name: names[k],
      type: m.type,
      recruitmentCount,
      studentRecordWeight: m.studentRecordWeight,
      interview: m.interview,
      csatMinimum: m.csatMinimum,
      source,
      isMock: false,
    };
  });
});
