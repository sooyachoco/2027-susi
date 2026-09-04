import type { Admission, Department, University } from "./types";

export const myeongji2027Universities: University[] = [{ id: "myeongji", name: "명지대학교", region: "서울" }];

const departmentId = "myeongji-susi-overall";

export const myeongji2027Departments: Department[] = [{
  id: departmentId,
  universityId: "myeongji",
  name: "2027 수시 전체(모집단위 합계)",
  category: "전체",
}];

const source = {
  type: "university" as const,
  academicYear: 2027,
  url: "https://iphak.mju.ac.kr/pages/?b=B_1_1&bn=30136&m=read&p=9",
  document: "2027학년도 신입학 수시 모집요강(명지대학교)_수정(v2)",
  collectedAt: "2026-09-04",
  verifiedAt: "2026-09-04",
  confidence: 0.99,
};

const methods = [
  { name: "학교장추천전형", type: "교과", studentRecordWeight: 100, interview: false, recruitmentCount: 299 },
  { name: "교과면접전형", type: "교과", studentRecordWeight: 70, interview: true, recruitmentCount: 269 },
  { name: "기회균형전형", type: "교과", studentRecordWeight: 100, interview: false, recruitmentCount: 60 },
  { name: "특성화고교전형", type: "교과", studentRecordWeight: 100, interview: false, recruitmentCount: 37 },
  { name: "만학도전형", type: "교과", studentRecordWeight: 100, interview: false, recruitmentCount: 25 },
  { name: "특성화고등졸재직자전형", type: "교과", studentRecordWeight: 100, interview: false, recruitmentCount: 147 },
  { name: "특수교육대상자전형", type: "교과", studentRecordWeight: 100, interview: false, recruitmentCount: 50 },
  { name: "명지인재면접전형", type: "학종", studentRecordWeight: 70, interview: true, recruitmentCount: 379 },
  { name: "명지인재서류전형", type: "학종", studentRecordWeight: 100, interview: false, recruitmentCount: 361 },
  { name: "크리스천리더전형", type: "학종", studentRecordWeight: 70, interview: true, recruitmentCount: 52 },
  { name: "사회적배려대상자전형", type: "학종", studentRecordWeight: 100, interview: false, recruitmentCount: 35 },
  { name: "농어촌학생전형", type: "학종", studentRecordWeight: 100, interview: false, recruitmentCount: 93 },
  { name: "실기우수자전형", type: "기타", studentRecordWeight: 30, interview: false, recruitmentCount: 170 },
  { name: "재외국민전형", type: "기타", studentRecordWeight: 0, interview: false, recruitmentCount: 50 },
] as const;

export const myeongji2027Admissions: Admission[] = methods.map(({ name, type, studentRecordWeight, interview, recruitmentCount }) => ({
  id: `${departmentId}-${name}-2027`,
  universityId: "myeongji",
  departmentId,
  academicYear: 2027,
  name,
  type,
  recruitmentCount,
  studentRecordWeight,
  interview,
  csatMinimum: { enabled: false, description: "2027학년도 명지대학교 수시 전 전형 수능최저학력기준 미적용" },
  source,
  isMock: false,
}));
