import type { Admission, Department, University } from "./types";

export const snue2027Universities: University[] = [{ id: "snue", name: "서울교육대학교", region: "서울" }];
const departmentId = "snue-elementary-education";
export const snue2027Departments: Department[] = [{ id: departmentId, universityId: "snue", name: "초등교육과", category: "교육" }];
const source = { type: "university" as const, academicYear: 2027, url: "https://www.snue.ac.kr/admission/na/ntt/selectNttList.do?bbsId=3068&mi=3366", confidence: 0.99 };

type Method = {
  name: string;
  type: Admission["type"];
  recruitmentCount: number;
  studentRecordWeight?: number;
  documentWeight?: number;
  interview?: boolean;
  csatMinimum: Admission["csatMinimum"];
};

const methods: Method[] = [
  { name: "학교장추천전형", type: "교과", recruitmentCount: 40, studentRecordWeight: 80, interview: true, csatMinimum: { enabled: true, requiredSubjects: 2, gradeSum: 6 } },
  { name: "교직인성우수자전형", type: "학종", recruitmentCount: 150, documentWeight: 50, interview: true, csatMinimum: { enabled: true, requiredSubjects: 2, gradeSum: 6 } },
  { name: "국가보훈대상자전형", type: "학종", recruitmentCount: 5, documentWeight: 50, interview: true, csatMinimum: { enabled: true, requiredSubjects: 2, gradeSum: 8 } },
  { name: "농어촌학생전형", type: "학종", recruitmentCount: 10, documentWeight: 50, interview: true, csatMinimum: { enabled: true, requiredSubjects: 2, gradeSum: 8 } },
  { name: "기초생활수급자등전형", type: "학종", recruitmentCount: 19, documentWeight: 50, interview: true, csatMinimum: { enabled: true, requiredSubjects: 2, gradeSum: 8 } },
  { name: "장애인등대상자전형", type: "학종", recruitmentCount: 11, documentWeight: 50, interview: true, csatMinimum: { enabled: true, requiredSubjects: 2, gradeSum: 8 } },
];

export const snue2027Admissions: Admission[] = methods.map((method) => ({
  id: `${departmentId}-${method.name}-2027`,
  universityId: "snue",
  departmentId,
  academicYear: 2027,
  name: method.name,
  type: method.type,
  recruitmentCount: method.recruitmentCount,
  studentRecordWeight: method.studentRecordWeight,
  documentWeight: method.documentWeight,
  interview: method.interview,
  csatMinimum: method.csatMinimum,
  source,
  isMock: false,
}));
