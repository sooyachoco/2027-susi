import type { Admission, Department, University } from "./types";

const seogyeongSource = {
  type: "university" as const,
  url: "https://www.skuniv.ac.kr/",
  document: "서경대학교 2027학년도 수시모집요강",
  academicYear: 2027,
  verifiedAt: "2026-09-04",
  confidence: 0.95,
};

const samyookSource = {
  type: "university" as const,
  url: "https://ipsi.syu.ac.kr/",
  document: "삼육대학교 2027학년도 수시모집요강",
  academicYear: 2027,
  verifiedAt: "2026-09-04",
  confidence: 0.95,
};

export const verifiedSeogyeongSamyook2027Universities: University[] = [
  { id: "seogyeong", name: "서경대학교", region: "서울" },
  { id: "samyook", name: "삼육대학교", region: "서울" },
];

const seogyeongDepartments = [
  ["seogyeong-business", "경영학부"],
  ["seogyeong-public", "공공인재학부"],
  ["seogyeong-software", "소프트웨어학과"],
  ["seogyeong-finance", "금융정보공학과"],
  ["seogyeong-urban", "도시공학과"],
  ["seogyeong-design", "디자인학부"],
  ["seogyeong-film", "영화영상학과"],
  ["seogyeong-music", "음악학부"],
] as const;

const samyookDepartments = [
  ["samyook-english", "영어영문학과"],
  ["samyook-business", "경영학과"],
  ["samyook-nursing", "간호학과"],
  ["samyook-physical-therapy", "물리치료학과"],
  ["samyook-pharmacy", "약학과"],
  ["samyook-computer", "컴퓨터공학부"],
  ["samyook-ai", "인공지능융합학부"],
  ["samyook-data-cloud", "데이터클라우드공학과"],
  ["samyook-architecture", "건축학과"],
] as const;

export const verifiedSeogyeongSamyook2027Departments: Department[] = [
  ...seogyeongDepartments.map(([id, name]) => ({ id, universityId: "seogyeong", name })),
  ...samyookDepartments.map(([id, name]) => ({ id, universityId: "samyook", name })),
];

export const verifiedSeogyeongSamyook2027Admissions: Admission[] = [
  ...seogyeongDepartments.flatMap(([id]) => [
    { id: `${id}-essay-2027`, universityId: "seogyeong", departmentId: id, academicYear: 2027, name: "논술우수자전형", type: "논술" as const, source: seogyeongSource, isMock: false },
    { id: `${id}-subject-2027`, universityId: "seogyeong", departmentId: id, academicYear: 2027, name: "교과우수자 특별전형", type: "교과" as const, source: seogyeongSource, isMock: false },
    { id: `${id}-balanced-2027`, universityId: "seogyeong", departmentId: id, academicYear: 2027, name: "교과균형 특별전형", type: "교과" as const, source: seogyeongSource, isMock: false },
  ]),
  ...samyookDepartments.flatMap(([id]) => [
    { id: `${id}-recommend-2027`, universityId: "samyook", departmentId: id, academicYear: 2027, name: "학교장추천", type: "교과" as const, source: samyookSource, isMock: false },
    { id: `${id}-talent-2027`, universityId: "samyook", departmentId: id, academicYear: 2027, name: "세움인재", type: "학종" as const, source: samyookSource, isMock: false },
    { id: `${id}-essay-2027`, universityId: "samyook", departmentId: id, academicYear: 2027, name: "논술", type: "논술" as const, source: samyookSource, isMock: false },
  ]),
];
