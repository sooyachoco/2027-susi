import type { Admission, Department, University } from "./types";

export const myeongji2027Universities: University[] = [{ id: "myeongji", name: "명지대학교", region: "서울" }];
const departmentId = "myeongji-susi-overall";
export const myeongji2027Departments: Department[] = [{ id: departmentId, universityId: "myeongji", name: "2027 수시 전체(모집단위 합계)", category: "전체" }];
const source = { type: "university" as const, academicYear: 2027, url: "https://iphak.mju.ac.kr/pages/?b=B_1_1&bn=30136&cate=%EC%88%98%EC%8B%9C&f=TITLE&m=read&p=30", confidence: 0.99 };
const methods = [
  ["학교장추천전형", "교과", 100, false, 299],
  ["교과면접전형", "교과", 70, true, 269],
  ["기회균형전형", "교과", 100, false, 60],
  ["특성화고교전형", "교과", 100, false, 37],
  ["만학도전형", "교과", 100, false, 25],
  ["특성화고등졸재직자전형", "교과", 100, false, 147],
  ["특수교육대상자전형", "교과", 100, false, 50],
  ["명지인재면접전형", "학종", 70, true, 379],
  ["명지인재서류전형", "학종", 100, false, 361],
  ["크리스천리더전형", "학종", 100, true, 52],
  ["사회적배려대상자전형", "학종", 100, false, 35],
  ["농어촌학생전형", "학종", 100, false, 93],
  ["실기우수자전형", "기타", 0, false, 170],
  ["재외국민전형", "기타", 0, false, 50],
] as const;
export const myeongji2027Admissions: Admission[] = methods.map(([name, type, weight, interview, recruitmentCount]) => ({
  id: `${departmentId}-${name}-2027`, universityId: "myeongji", departmentId, academicYear: 2027, name,
  type, recruitmentCount, studentRecordWeight: weight, interview,
  csatMinimum: { enabled: false }, source, isMock: false,
}));
