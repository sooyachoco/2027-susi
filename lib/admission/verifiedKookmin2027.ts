import type { Admission, Department, University } from "./types";

export const verifiedKookmin2027Universities: University[] = [
  { id: "kookmin-2027", name: "국민대학교", region: "서울" },
];

const source = {
  type: "university" as const,
  url: "https://admission.kookmin.ac.kr/kmuUniversity/major_info.php",
  document: "2027학년도 모집단위별 입학정원표",
  academicYear: 2027,
  verifiedAt: "2026-08-26",
  confidence: 0.98,
};

const names = [
  "한국어문학부", "영어영문학부", "중어중문학과", "한국역사학과", "행정학과",
  "정치외교학과", "사회학과", "미디어·광고학부", "교육학과", "러시아·유라시아학과",
  "동아시아국제학부", "법학부", "기업융합법학과", "경제학과", "국제통상금융학과",
  "경영학부", "경영정보학부", "AI빅데이터융합경영학과", "기업경영학부", "회계세무학과",
  "KMU International Business School", "신소재공학부", "기계공학부", "건설시스템공학부",
  "전자공학부", "산림기후환경학과", "바이오소재융합공학과", "바이오의과학과", "식품영양학과",
  "융합바이오공학과", "제약공학과", "양자융합공학과", "정보보안암호수학과", "에너지반도체화학공학과",
  "소프트웨어학부", "인공지능학부", "건축학부", "자동차공학과", "자동차IT융합학과",
  "미래모빌리티학과", "조형대학", "예술대학", "체육대학", "스포츠교육학과",
  "스포츠산업경영학과", "스포츠건강재활학과", "인문기술융합학부", "미래융합전공",
];

export const verifiedKookmin2027Departments: Department[] = names.map((name, i) => ({
  id: `kookmin-2027-${i + 1}`,
  universityId: "kookmin-2027",
  name,
}));

export const verifiedKookmin2027Admissions: Admission[] = verifiedKookmin2027Departments.flatMap((department) => [
  {
    id: `${department.id}-school-recommendation`,
    universityId: "kookmin-2027",
    departmentId: department.id,
    academicYear: 2027,
    type: "교과",
    name: "교과우수자(학교장추천)전형",
    source,
    isMock: false,
  },
  {
    id: `${department.id}-frontier`,
    universityId: "kookmin-2027",
    departmentId: department.id,
    academicYear: 2027,
    type: "학종",
    name: "국민프런티어전형",
    source,
    isMock: false,
  },
  {
    id: `${department.id}-essay`,
    universityId: "kookmin-2027",
    departmentId: department.id,
    academicYear: 2027,
    type: "논술",
    name: "논술전형",
    source,
    isMock: false,
  },
]);
