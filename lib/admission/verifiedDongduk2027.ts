import type { Admission, Department, University } from "./types";

const source = {
  type: "university" as const,
  url: "https://ipsi.dongduk.ac.kr/ipsi/contents/admhelper-notice.do?id=91867&schM=view",
  document: "2027학년도 동덕여자대학교 신입학 수시모집요강(260713 변경사항 반영)",
  academicYear: 2027,
  verifiedAt: "2026-09-04",
  confidence: 0.99,
};

export const verifiedDongduk2027Universities: University[] = [
  { id: "dongduk", name: "동덕여자대학교", region: "서울" },
];

type Row = [string, string, number];

const departments: Row[] = [
  ["korean", "국어국문학전공", 26],
  ["history", "국사학전공", 20],
  ["creative-writing", "문예창작전공", 20],
  ["english", "영어전공", 38],
  ["japanese", "일어일본학전공", 29],
  ["european", "유러피언스터디즈전공", 32],
  ["chinese", "중어중국학전공", 35],
  ["library", "문헌정보학전공", 22],
  ["social-welfare", "사회복지학전공", 21],
  ["child", "아동학전공", 31],
  ["business", "경영융합학부", 100],
  ["nutrition", "식품영양학전공", 27],
  ["health", "보건관리학전공", 25],
  ["chemistry", "응용화학전공", 21],
  ["cosmetic", "화장품학전공", 20],
  ["computer", "컴퓨터학전공", 49],
  ["statistics", "정보통계학전공", 30],
  ["pharmacy", "약학과", 40],
  ["curator", "큐레이터학전공", 23],
  ["communication", "커뮤니케이션콘텐츠전공", 28],
  ["hci", "HCI사이언스전공", 28],
  ["data-science", "데이터사이언스전공", 50],
  ["culture-management", "문화예술경영전공", 28],
  ["mice", "글로벌MICE융합전공", 28],
  ["entrepreneurship", "앙트러프러너십전공", 25],
  ["physical-education", "체육학전공", 31],
  ["painting", "회화전공", 41],
  ["digital-craft", "디지털공예전공", 35],
  ["piano", "피아노전공", 21],
  ["orchestra", "관현악전공", 23],
  ["vocal", "성악전공", 21],
  ["fashion", "패션디자인전공", 42],
  ["visual-interior", "시각&실내디자인전공", 63],
  ["media-design", "미디어디자인전공", 36],
  ["fashion-night", "패션디자인전공(야)", 38],
  ["broadcast", "방송연예전공", 35],
  ["music", "실용음악전공", 34],
  ["dance", "무용전공", 36],
  ["model", "모델전공", 23],
  ["broadcast-night", "방송연예전공(야)", 38],
  ["finance-accounting", "금융회계학부", 6],
];

export const verifiedDongduk2027Departments: Department[] = departments.map(([id, name]) => ({
  id: `dongduk-${id}`,
  universityId: "dongduk",
  name,
}));

const admission = (
  departmentId: string,
  suffix: string,
  name: string,
  type: Admission["type"],
  recruitmentCount: number,
  extra: Partial<Admission> = {},
): Admission => ({
  id: `dongduk-${departmentId}-${suffix}-2027`,
  universityId: "dongduk",
  departmentId: `dongduk-${departmentId}`,
  academicYear: 2027,
  name,
  type,
  recruitmentCount,
  source,
  isMock: false,
  ...extra,
});

const essayMinimum: Admission["csatMinimum"] = {
  enabled: true,
  description: "국어·영어·수학·탐구(상위 1과목) 중 2개 영역의 합 6등급 이내",
  requiredSubjects: 2,
  gradeSum: 6,
};

const pharmacyMinimum: Admission["csatMinimum"] = {
  enabled: true,
  description: "국어·수학·탐구(과학 2과목 중 상위 1과목) 3개 영역의 합 6등급 이내. 수학은 미적분 또는 기하 필수",
  requiredSubjects: 3,
  gradeSum: 6,
};

const regularMinimum: Admission["csatMinimum"] = {
  enabled: true,
  description: "국어·영어·수학·탐구(상위 1과목) 중 2개 영역의 합 6등급 이내",
  requiredSubjects: 2,
  gradeSum: 6,
};

const creativeCounts: Record<string, number> = {
  korean: 9, history: 7, "creative-writing": 7, english: 16, japanese: 11,
  european: 12, chinese: 12, library: 8, "social-welfare": 7, child: 10,
  business: 33, nutrition: 9, health: 8, chemistry: 8, cosmetic: 7,
  computer: 16, statistics: 9, pharmacy: 8, curator: 4, communication: 9,
  hci: 9, "data-science": 6, "culture-management": 9, mice: 9, entrepreneurship: 12,
};

const balanceCounts: Record<string, number> = {
  korean: 1, english: 1, japanese: 1, chinese: 1, "social-welfare": 1,
  child: 1, business: 2, nutrition: 1, health: 1, computer: 1, statistics: 1,
};

const subjectCounts: Record<string, number> = {
  korean: 6, history: 5, "creative-writing": 5, english: 9, japanese: 8,
  european: 9, chinese: 11, library: 6, "social-welfare": 5, child: 9,
  business: 25, nutrition: 7, health: 6, chemistry: 5, cosmetic: 5,
  computer: 14, statistics: 9, pharmacy: 12, curator: 3, communication: 8,
  hci: 8, "data-science": 5, "culture-management": 8, mice: 8,
};

const essayCounts: Record<string, number> = {
  korean: 10, history: 8, "creative-writing": 8, english: 12, japanese: 9,
  european: 11, chinese: 11, library: 8, "social-welfare": 8, child: 11,
  business: 39, nutrition: 10, health: 9, chemistry: 8, cosmetic: 8,
  computer: 18, statistics: 11, curator: 4, communication: 11, hci: 11,
  "data-science": 9, "culture-management": 11, mice: 11, entrepreneurship: 8,
};

const practicalCounts: Record<string, number> = {
  "physical-education": 18, painting: 31, "digital-craft": 24, piano: 16,
  orchestra: 18, vocal: 16, fashion: 26, "visual-interior": 40,
  "media-design": 24, "fashion-night": 23, broadcast: 22, music: 17,
  dance: 36, model: 19, "broadcast-night": 29,
};

const specialCounts: Record<string, number> = {
  broadcast: 5, music: 5, model: 2,
};

export const verifiedDongduk2027Admissions: Admission[] = [];

for (const [departmentId] of departments) {
  if (creativeCounts[departmentId]) {
    verifiedDongduk2027Admissions.push(
      admission(departmentId, "creative-leader", "동덕창의리더전형", "학종", creativeCounts[departmentId], {
        documentWeight: 40,
        interview: true,
        csatMinimum: departmentId === "pharmacy" ? pharmacyMinimum : { enabled: false },
      }),
    );
  }

  if (balanceCounts[departmentId]) {
    verifiedDongduk2027Admissions.push(
      admission(departmentId, "balance", "기회균형 특별전형", "학종", balanceCounts[departmentId], {
        documentWeight: 100,
        csatMinimum: { enabled: false },
      }),
    );
  }

  if (subjectCounts[departmentId]) {
    verifiedDongduk2027Admissions.push(
      admission(departmentId, "subject", "학생부교과우수자 특별전형", "교과", subjectCounts[departmentId], {
        studentRecordWeight: 100,
        csatMinimum: departmentId === "pharmacy" ? pharmacyMinimum : regularMinimum,
      }),
    );
  }

  if (essayCounts[departmentId]) {
    verifiedDongduk2027Admissions.push(
      admission(departmentId, "essay", "논술우수자전형", "논술", essayCounts[departmentId], {
        studentRecordWeight: 0,
        csatMinimum: essayMinimum,
      }),
    );
  }

  if (practicalCounts[departmentId]) {
    verifiedDongduk2027Admissions.push(
      admission(departmentId, "practical", "실기우수자전형", "기타", practicalCounts[departmentId]),
    );
  }

  if (specialCounts[departmentId]) {
    verifiedDongduk2027Admissions.push(
      admission(departmentId, "special", "특기자 특별전형", "기타", specialCounts[departmentId]),
    );
  }
}

verifiedDongduk2027Admissions.push(
  admission("finance-accounting", "employee-in-quota", "특성화고 등 고졸재직자 특별전형", "학종", 6, {
    documentWeight: 100,
    csatMinimum: { enabled: false },
  }),
  admission("finance-accounting", "employee-out-of-quota", "특성화고 등 고졸재직자 특별전형", "학종", 85, {
    documentWeight: 100,
    csatMinimum: { enabled: false },
  }),
);
