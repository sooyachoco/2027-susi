import type { Admission, Department, University } from "./types";

const source = { type: "university" as const, academicYear: 2027, url: "https://medicine.catholic.ac.kr/medicine/admission/early.do", confidence: 0.99 };
const nursingSource = { type: "university" as const, academicYear: 2027, url: "https://songeui.catholic.ac.kr/nursing/admission/early.do", confidence: 0.99 };

export const catholicSeongui2027Universities: University[] = [
  { id: "catholic-seongui", name: "가톨릭대학교(성의교정)", region: "서울" },
];

export const catholicSeongui2027Departments: Department[] = [
  { id: "catholic-seongui-medicine", universityId: "catholic-seongui", name: "의예과", category: "의학" },
  { id: "catholic-seongui-nursing", universityId: "catholic-seongui", name: "간호학과", category: "보건·약학" },
];

const admissions: Admission[] = [
  { id: "catholic-seongui-2027-medicine-regional", universityId: "catholic-seongui", departmentId: "catholic-seongui-medicine", academicYear: 2027, name: "지역균형전형", type: "교과", recruitmentCount: 10, studentRecordWeight: 100, csatMinimum: { enabled: true }, source, isMock: false },
  { id: "catholic-seongui-2027-medicine-leader", universityId: "catholic-seongui", departmentId: "catholic-seongui-medicine", academicYear: 2027, name: "가톨릭지도자추천전형", type: "학종", recruitmentCount: 2, documentWeight: 70, interview: true, csatMinimum: { enabled: false }, source, isMock: false },
  { id: "catholic-seongui-2027-medicine-school", universityId: "catholic-seongui", departmentId: "catholic-seongui-medicine", academicYear: 2027, name: "학교장추천전형", type: "학종", recruitmentCount: 25, documentWeight: 70, interview: true, csatMinimum: { enabled: true }, source, isMock: false },
  { id: "catholic-seongui-2027-medicine-essay", universityId: "catholic-seongui", departmentId: "catholic-seongui-medicine", academicYear: 2027, name: "논술전형", type: "논술", recruitmentCount: 19, csatMinimum: { enabled: true }, source, isMock: false },
  { id: "catholic-seongui-2027-nursing-regional", universityId: "catholic-seongui", departmentId: "catholic-seongui-nursing", academicYear: 2027, name: "지역균형전형", type: "교과", recruitmentCount: 14, studentRecordWeight: 100, csatMinimum: { enabled: true }, source: nursingSource, isMock: false },
  { id: "catholic-seongui-2027-nursing-school", universityId: "catholic-seongui", departmentId: "catholic-seongui-nursing", academicYear: 2027, name: "학교장추천전형", type: "학종", recruitmentCount: 16, documentWeight: 70, interview: true, csatMinimum: { enabled: false }, source: nursingSource, isMock: false },
  { id: "catholic-seongui-2027-nursing-essay", universityId: "catholic-seongui", departmentId: "catholic-seongui-nursing", academicYear: 2027, name: "논술전형", type: "논술", recruitmentCount: 18, csatMinimum: { enabled: true }, source: nursingSource, isMock: false },
];

export const catholicSeongui2027Admissions = admissions;
