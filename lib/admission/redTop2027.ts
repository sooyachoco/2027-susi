import type { Admission, Department, University } from "./types";

const source = { type: "university" as const, academicYear: 2027, collectedAt: "2026-09-04", verifiedAt: "2026-09-04", confidence: 0.98 };

type Row = [string, string, string, string, number, string, string];

const rows: Row[] = [
  ["snu", "서울대학교", "지역균형전형", "교과", 511, "https://admission.snu.ac.kr/undergraduate/early/guide", "학생부종합 1단계 서류평가 3배수, 2단계 70+면접30; 수능최저 적용"],
  ["snu", "서울대학교", "일반전형", "학종", 1509, "https://admission.snu.ac.kr/undergraduate/early/guide", "학생부종합 일반전형"],
  ["snu", "서울대학교", "기회균형특별전형(사회통합)", "학종", 96, "https://admission.snu.ac.kr/undergraduate/early/guide", "사회통합 특별전형"],
  ["yonsei", "연세대학교", "학생부교과전형[추천형]", "교과", 483, "https://admission.yonsei.ac.kr/seoul/admission/html/rolling/guide.asp", "교과 중심 추천형"],
  ["yonsei", "연세대학교", "학생부종합전형[활동우수형]", "학종", 708, "https://admission.yonsei.ac.kr/seoul/admission/html/rolling/guide.asp", "학생부종합 활동우수형"],
  ["yonsei", "연세대학교", "학생부종합전형[국제형]", "학종", 254, "https://admission.yonsei.ac.kr/seoul/admission/html/rolling/guide.asp", "국제형"],
  ["yonsei", "연세대학교", "학생부종합전형[국제인재]", "학종", 120, "https://admission.yonsei.ac.kr/seoul/admission/html/rolling/guide.asp", "국제인재"],
  ["yonsei", "연세대학교", "학생부종합전형[기회균형]", "학종", 190, "https://admission.yonsei.ac.kr/seoul/admission/html/rolling/guide.asp", "기회균형"],
  ["yonsei", "연세대학교", "논술전형", "논술", 272, "https://admission.yonsei.ac.kr/seoul/admission/html/rolling/guide.asp", "논술"],
  ["sogang", "서강대학교", "지역균형", "교과", 178, "https://admission.sogang.ac.kr/", "교과90+출결10, 수능최저 적용"],
  ["sogang", "서강대학교", "학생부종합 일반Ⅰ", "학종", 494, "https://admission.sogang.ac.kr/", "서류평가 100%"],
  ["sogang", "서강대학교", "학생부종합 일반Ⅱ", "학종", 74, "https://admission.sogang.ac.kr/", "서류평가 100%, 계열 단위 모집"],
  ["sogang", "서강대학교", "기회균형", "학종", 85, "https://admission.sogang.ac.kr/", "학생부종합"],
  ["sogang", "서강대학교", "서강가치", "학종", 34, "https://admission.sogang.ac.kr/", "학생부종합"],
  ["sogang", "서강대학교", "논술", "논술", 171, "https://admission.sogang.ac.kr/", "논술80+교과10+출결10, 수능최저 적용"],
  ["korea", "고려대학교", "학교추천전형", "교과", 648, "https://oku.korea.ac.kr/", "학생부교과"],
  ["korea", "고려대학교", "학업우수전형", "학종", 901, "https://oku.korea.ac.kr/", "학생부종합, 수능최저 적용"],
  ["korea", "고려대학교", "계열적합전형", "학종", 521, "https://oku.korea.ac.kr/", "학생부종합"],
  ["korea", "고려대학교", "고른기회전형", "학종", 199, "https://oku.korea.ac.kr/", "학생부종합"],
  ["korea", "고려대학교", "다문화전형", "학종", 20, "https://oku.korea.ac.kr/", "학생부종합"],
  ["korea", "고려대학교", "사이버국방전형", "기타", 10, "https://oku.korea.ac.kr/", "특수전형"],
  ["korea", "고려대학교", "논술전형", "논술", 349, "https://oku.korea.ac.kr/", "논술"],
  ["cau", "중앙대학교", "지역균형", "교과", 498, "https://admission.cau.ac.kr/", "교과90+출결10, 서울캠 수능최저 적용"],
  ["cau", "중앙대학교", "학생부종합(융합형인재)", "학종", 350, "https://admission.cau.ac.kr/", "서류100, 의학부 면접"],
  ["cau", "중앙대학교", "학생부종합(탐구형인재)", "학종", 485, "https://admission.cau.ac.kr/", "1단계 서류100 → 2단계 70+면접30"],
  ["cau", "중앙대학교", "학생부종합(성장형인재)", "학종", 108, "https://admission.cau.ac.kr/", "1단계 서류100 → 2단계 70+면접30, 수능최저 적용"],
  ["cau", "중앙대학교", "학생부종합(어울림)", "학종", 20, "https://admission.cau.ac.kr/", "학생부종합"],
  ["cau", "중앙대학교", "논술(일반형)", "논술", 390, "https://admission.cau.ac.kr/", "논술70+교과20+출결10, 서울캠 수능최저 적용"],
  ["cau", "중앙대학교", "논술(창의형)", "논술", 86, "https://admission.cau.ac.kr/", "논술70+교과20+출결10, 수능최저 미적용"],
];

export const redTop2027Universities: University[] = [
  ["snu", "서울대학교"], ["yonsei", "연세대학교"], ["sogang", "서강대학교"], ["korea", "고려대학교"], ["cau", "중앙대학교"],
].map(([id, name]) => ({ id, name, region: "서울" }));

export const redTop2027Departments: Department[] = redTop2027Universities.map((u) => ({
  id: `${u.id}-2027-aggregate`, universityId: u.id, name: `2027 수시 ${u.name} 전형 합계`, category: "수시전체",
}));

export const redTop2027Admissions: Admission[] = rows.map(([universityId, , name, type, recruitmentCount, url, description]) => ({
  id: `${universityId}-redtop-${name.replace(/[^가-힣A-Za-z0-9]/g, "-")}-2027`,
  universityId, departmentId: `${universityId}-2027-aggregate`, academicYear: 2027, name, type, recruitmentCount,
  source: { ...source, url }, isMock: false,
  ...(type === "교과" ? { studentRecordWeight: 100 } : {}),
  ...(name.includes("면접") || name.includes("탐구형") || name.includes("성장형") ? { interview: true } : {}),
  csatMinimum: name.includes("창의형") || name.includes("일반Ⅰ") || name.includes("일반Ⅱ") ? { enabled: false } : undefined,
}));
