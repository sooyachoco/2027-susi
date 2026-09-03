import type { Admission, Department, University } from "./types";

export const sungshin2027Universities: University[] = [{ id: "sungshin", name: "성신여자대학교", region: "서울" }];
const departmentId = "sungshin-susi-overall";
export const sungshin2027Departments: Department[] = [{ id: departmentId, universityId: "sungshin", name: "2027 수시 전체(모집단위 합계)", category: "전체" }];
const source = { type: "university" as const, academicYear: 2027, url: "https://ipsi.sungshin.ac.kr/guide/dataroom.htm?bbsid=dataroom&bltn_seq=36049&ctg_cd=susi&mode=view", confidence: 0.99 };
const methods = [
  ["자기주도인재전형", "학종", 0, true, 533],
  ["기회균형Ⅰ전형", "학종", 100, false, 112],
  ["지역균형전형", "교과", 100, false, 312],
  ["논술우수자전형", "논술", 0, false, 159],
  ["일반학생전형", "기타", 0, false, 226],
] as const;
export const sungshin2027Admissions: Admission[] = methods.map(([name, type, weight, interview, recruitmentCount]) => ({
  id: `${departmentId}-${name}-2027`, universityId: "sungshin", departmentId, academicYear: 2027, name,
  type, recruitmentCount, studentRecordWeight: weight, interview,
  csatMinimum: { enabled: type === "교과" || type === "논술" }, source, isMock: false,
}));
