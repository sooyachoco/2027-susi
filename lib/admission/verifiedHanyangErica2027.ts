import type { Admission, Department, University } from "./types";

/** 2027 한양대학교 ERICA 수시 핵심 모집단위. */
export const verifiedHanyangErica2027Universities: University[] = [
  { id: "hanyang-erica-2027", name: "한양대학교(ERICA)", region: "경기" },
];

const names = [
  "LIONS자율전공학부(인문사회계열)", "LIONS자율전공학부(자연계열)", "글로벌문화통상학부",
  "문화인류학과", "미디어학과", "문화콘텐츠학과", "광고홍보학과", "보험계리학과",
  "경제학부", "경영학부", "건축학부(건축공학)", "건축학부(건축학)", "교통·물류공학과",
  "건설환경공학과", "기계공학과", "로봇공학과", "해양융합공학과", "산업경영공학과",
  "컴퓨터학부", "전자공학부", "ICT융합학부", "인공지능학과", "수리데이터사이언스학과",
  "배터리소재화학공학과", "에너지바이오학과", "바이오신약융합학부", "차세대반도체융합공학부", "약학과",
];

export const verifiedHanyangErica2027Departments: Department[] = names.map((name, i) => ({
  id: `hanyang-erica-2027-${i + 1}`,
  universityId: "hanyang-erica-2027",
  name,
}));

const source = {
  type: "university" as const,
  url: "https://goerica.hanyang.ac.kr/admission/html/rolling/guide.asp",
  document: "한양대학교 ERICA 2027학년도 수시 모집요강",
  academicYear: 2027,
  confidence: 0.98,
};

export const verifiedHanyangErica2027Admissions: Admission[] = verifiedHanyangErica2027Departments.flatMap((department) => [
  {
    id: `${department.id}-subject`, universityId: "hanyang-erica-2027", departmentId: department.id,
    academicYear: 2027, type: "교과" as const, name: "학생부교과(지역균형선발)", isMock: false, source,
  },
  {
    id: `${department.id}-holistic-document`, universityId: "hanyang-erica-2027", departmentId: department.id,
    academicYear: 2027, type: "학종" as const, name: "학생부종합(서류형)", isMock: false, source,
  },
  {
    id: `${department.id}-holistic-interview`, universityId: "hanyang-erica-2027", departmentId: department.id,
    academicYear: 2027, type: "학종" as const, name: "학생부종합(면접형)", isMock: false, source,
  },
]);
