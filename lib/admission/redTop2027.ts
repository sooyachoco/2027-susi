import type { Admission, AdmissionType, Department, University } from "./types";

const source = { type: "university" as const, academicYear: 2027, collectedAt: "2026-09-04", verifiedAt: "2026-09-04", confidence: 0.99 };

type Row = [string, string, string, AdmissionType, number, string, string, boolean?, boolean?];

const rows: Row[] = [
  ["snu", "서울대학교", "지역균형전형", "학종", 523, "https://admission.snu.ac.kr/undergraduate/early/guide", "1단계 서류100 3배수, 2단계 1단계70+면접30; 전 모집단위 수능최저 적용", true, true],
  ["snu", "서울대학교", "일반전형", "학종", 1529, "https://admission.snu.ac.kr/undergraduate/early/guide", "서류평가 후 제시문 활용 면접·구술; 모집단위별 세부방법 상이", true, false],
  ["snu", "서울대학교", "기회균형특별전형(사회통합)", "학종", 181, "https://admission.snu.ac.kr/undergraduate/early/guide", "서류 기반 면접 중심 사회통합 특별전형", true, false],

  ["yonsei", "연세대학교", "학생부교과전형[추천형]", "교과", 487, "https://admission.yonsei.ac.kr/seoul/admission/html/rolling/guide.asp", "학생부교과100; 수능최저 적용", false, true],
  ["yonsei", "연세대학교", "학생부종합전형[활동우수형]", "학종", 714, "https://admission.yonsei.ac.kr/seoul/admission/html/rolling/guide.asp", "1단계 서류100, 2단계 1단계60+면접40; 수능최저 적용", true, true],
  ["yonsei", "연세대학교", "학생부종합전형[국제형]", "학종", 254, "https://admission.yonsei.ac.kr/seoul/admission/html/rolling/guide.asp", "1단계 서류평가 후 면접; 국내고 전형 5배수 선발", true, true],
  ["yonsei", "연세대학교", "학생부종합전형[국제인재]", "학종", 120, "https://admission.yonsei.ac.kr/seoul/admission/html/rolling/guide.asp", "국제인재 학생부종합 전형", true, false],
  ["yonsei", "연세대학교", "학생부종합전형[기회균형]", "학종", 190, "https://admission.yonsei.ac.kr/seoul/admission/html/rolling/guide.asp", "기회균형 학생부종합 전형", true, false],
  ["yonsei", "연세대학교", "논술전형", "논술", 272, "https://admission.yonsei.ac.kr/seoul/admission/html/rolling/guide.asp", "논술 중심; 2027 자연·통합계열 과학 제시문 도입", false, false],
  ["yonsei", "연세대학교", "특기자전형[체육인재]", "기타", 38, "https://admission.yonsei.ac.kr/seoul/admission/html/rolling/guide.asp", "체육인재 특기자전형", false, false],

  ["sogang", "서강대학교", "학생부교과(지역균형)", "교과", 180, "https://admission.sogang.ac.kr/", "학생부교과 중심; 수능최저 적용", false, true],
  ["sogang", "서강대학교", "학생부종합 일반Ⅰ", "학종", 494, "https://admission.sogang.ac.kr/", "서류평가100; 개별 학부·학과 단위 전공예약제", false, false],
  ["sogang", "서강대학교", "학생부종합 일반Ⅱ", "학종", 74, "https://admission.sogang.ac.kr/", "서류평가100; 인문·사회·지식융합미디어·자유전공 계열 단위 모집", false, false],
  ["sogang", "서강대학교", "학생부종합(기회균형)", "학종", 85, "https://admission.sogang.ac.kr/", "학생부종합 특별전형", false, false],
  ["sogang", "서강대학교", "학생부종합(서강가치)", "학종", 34, "https://admission.sogang.ac.kr/", "학생부종합 특별전형", false, false],
  ["sogang", "서강대학교", "학생부종합(특성화고교졸업자)", "학종", 6, "https://admission.sogang.ac.kr/", "특성화고교졸업자 특별전형", false, false],
  ["sogang", "서강대학교", "논술(일반)", "논술", 171, "https://admission.sogang.ac.kr/", "논술 중심 전형; 수능최저 적용", false, true],

  ["korea", "고려대학교", "학교추천전형", "교과", 650, "https://oku.korea.ac.kr/", "학생부교과90+서류10; 최종 모집인원 650명", false, true],
  ["korea", "고려대학교", "학업우수전형", "학종", 903, "https://oku.korea.ac.kr/", "서류100; 인문·자연 4개 영역 합8 및 한국사4, 의과대학 합5", false, true],
  ["korea", "고려대학교", "계열적합전형", "학종", 523, "https://oku.korea.ac.kr/", "1단계 서류100 5배수, 2단계 60+면접40; 수능최저 없음", true, false],
  ["korea", "고려대학교", "고른기회전형", "학종", 201, "https://oku.korea.ac.kr/", "학생부종합 특별전형", false, false],
  ["korea", "고려대학교", "다문화전형", "학종", 20, "https://oku.korea.ac.kr/", "학생부종합 특별전형", false, false],
  ["korea", "고려대학교", "재직자전형", "학종", 18, "https://oku.korea.ac.kr/", "재직자 특별전형", false, false],
  ["korea", "고려대학교", "사이버국방전형", "기타", 10, "https://oku.korea.ac.kr/", "사이버국방 특별전형", true, false],
  ["korea", "고려대학교", "특기자전형", "기타", 55, "https://oku.korea.ac.kr/", "체육인재 40명 + 디자인조형 15명", false, false],
  ["korea", "고려대학교", "논술전형", "논술", 351, "https://oku.korea.ac.kr/", "논술전형", false, true],

  ["cau", "중앙대학교", "학생부교과(지역균형)", "교과", 508, "https://admission.cau.ac.kr/", "학생부100(교과90+출결10); 서울캠퍼스 수능최저 적용", false, true],
  ["cau", "중앙대학교", "학생부종합(융합형인재)", "학종", 378, "https://admission.cau.ac.kr/", "서류100; 의학부는 2단계 면접 실시", false, false],
  ["cau", "중앙대학교", "학생부종합(탐구형인재)", "학종", 512, "https://admission.cau.ac.kr/", "1단계 서류100 5배수 → 2단계 70+면접30; 수능최저 없음", true, false],
  ["cau", "중앙대학교", "학생부종합(성장형인재)", "학종", 108, "https://admission.cau.ac.kr/", "1단계 서류100 5배수 → 2단계 70+면접30; 서울캠 수능최저 적용", true, true],
  ["cau", "중앙대학교", "학생부종합(어울림)", "학종", 20, "https://admission.cau.ac.kr/", "학생부종합 특별전형", false, false],
  ["cau", "중앙대학교", "논술(일반형)", "논술", 403, "https://admission.cau.ac.kr/", "논술70+교과20+출결10; 서울캠퍼스 수능최저 적용", false, true],
  ["cau", "중앙대학교", "논술(창의형)", "논술", 86, "https://admission.cau.ac.kr/", "논술70+교과20+출결10; 수능최저 미적용", false, false],
  ["cau", "중앙대학교", "실기/실적전형", "기타", 387, "https://admission.cau.ac.kr/", "실기·실적 전형 전체 합계", false, false],
];

export const redTop2027Universities: University[] = [
  ["snu", "서울대학교"], ["yonsei", "연세대학교"], ["sogang", "서강대학교"], ["korea", "고려대학교"], ["cau", "중앙대학교"],
].map(([id, name]) => ({ id, name, region: "서울" }));

export const redTop2027Departments: Department[] = redTop2027Universities.map((u) => ({
  id: `${u.id}-2027-aggregate`, universityId: u.id, name: `2027 수시 ${u.name} 전형 합계`, category: "수시전체",
}));

export const redTop2027Admissions: Admission[] = rows.map(([universityId, , name, type, recruitmentCount, url, , interview, csat]) => ({
  id: `${universityId}-redtop-${name.replace(/[^가-힣A-Za-z0-9]/g, "-")}-2027`,
  universityId, departmentId: `${universityId}-2027-aggregate`, academicYear: 2027, name, type, recruitmentCount,
  source: { ...source, url }, isMock: false, isAggregate: true,
  ...(type === "교과" ? { studentRecordWeight: 100 } : {}),
  ...(interview ? { interview: true } : {}),
  ...(csat !== undefined ? { csatMinimum: { enabled: csat } } : {}),
}));