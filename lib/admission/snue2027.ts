import type { Admission, Department, University } from "./types";

export const snue2027Universities: University[] = [{ id: "snue", name: "서울교육대학교", region: "서울" }];
const departmentId = "snue-elementary-education";
export const snue2027Departments: Department[] = [{ id: departmentId, universityId: "snue", name: "초등교육과", category: "교육" }];
const source = { type: "university" as const, academicYear: 2027, url: "https://www.snue.ac.kr/admission/na/ntt/selectNttList.do?bbsId=3068&mi=3366", confidence: 0.99 };
const methods = [
  ["학교장추천전형", "교과", 100, true, 40, { enabled: true, requiredSubjects: 2, gradeSum: 6 }],
  ["교직인성우수자전형", "학종", 0, true, 150, { enabled: true, requiredSubjects: 2, gradeSum: 6 }],
] as const;
export const snue2027Admissions: Admission[] = methods.map(([name, type, weight, interview, recruitmentCount, csatMinimum]) => ({
  id: `${departmentId}-${name}-2027`, universityId: "snue", departmentId, academicYear: 2027, name,
  type, recruitmentCount, studentRecordWeight: weight, interview, csatMinimum, source, isMock: false,
}));
