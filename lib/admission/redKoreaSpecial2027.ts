import type { Admission, Department } from "./types";

const source = { type: "university" as const, academicYear: 2027, collectedAt: "2026-09-04", verifiedAt: "2026-09-04", confidence: 0.99 };

export const redKoreaSpecial2027Departments: Department[] = [
  { id: "korea-2027-cyber-defense", universityId: "korea", name: "사이버국방학과", category: "수시모집단위" },
  { id: "korea-2027-physical-education", universityId: "korea", name: "체육교육과", category: "수시모집단위" },
  { id: "korea-2027-design-form", universityId: "korea", name: "디자인조형학부", category: "수시모집단위" },
];

export const redKoreaSpecial2027Admissions: Admission[] = [
  {
    id: "korea-red-special-cyber-defense-2027",
    universityId: "korea",
    departmentId: "korea-2027-cyber-defense",
    academicYear: 2027,
    name: "사이버국방전형",
    type: "기타",
    recruitmentCount: 10,
    source: { ...source, url: "https://oku.korea.ac.kr/attach/202605/1780023076409_0.pdf" },
    isMock: false,
    interview: true,
  },
  {
    id: "korea-red-special-physical-education-2027",
    universityId: "korea",
    departmentId: "korea-2027-physical-education",
    academicYear: 2027,
    name: "특기자전형(체육인재)",
    type: "기타",
    recruitmentCount: 40,
    source: { ...source, url: "https://oku.korea.ac.kr/attach/202605/1780023076409_0.pdf" },
    isMock: false,
  },
  {
    id: "korea-red-special-design-form-2027",
    universityId: "korea",
    departmentId: "korea-2027-design-form",
    academicYear: 2027,
    name: "특기자전형(디자인조형)",
    type: "기타",
    recruitmentCount: 15,
    source: { ...source, url: "https://oku.korea.ac.kr/attach/202605/1780023076409_0.pdf" },
    isMock: false,
  },
];
