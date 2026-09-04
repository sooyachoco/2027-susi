import type { Admission, AdmissionType, Department, University } from "./types";

const source = {
  type: "university" as const,
  academicYear: 2027,
  collectedAt: "2026-09-04",
  verifiedAt: "2026-09-04",
  confidence: 0.97,
};

type Row = [string, string, AdmissionType, number, string, string, boolean, boolean?];

const rows: Row[] = [
  ["khu", "지역균형전형", "교과", 604, "https://iphak.khu.ac.kr/", "교과70+출결·봉사7+서류30, 수능최저 적용", false],
  ["khu", "네오르네상스전형", "학종", 1076, "https://iphak.khu.ac.kr/", "1단계 서류100, 2단계 1단계70+면접30, 의·한·치·약 면접형 별도", true],
  ["khu", "기회균형전형Ⅰ", "학종", 150, "https://iphak.khu.ac.kr/", "서류100, 국가보훈·농어촌·기초수급자 등 지원자격 전형", false],
  ["khu", "기회균형전형Ⅱ", "학종", 90, "https://iphak.khu.ac.kr/", "서류100, 다자녀·다문화·조손가정 등 지원자격 전형", false],
  ["khu", "장애인전형", "학종", 15, "https://iphak.khu.ac.kr/", "서류100", false],
  ["khu", "논술우수자전형", "논술", 471, "https://iphak.khu.ac.kr/", "논술100, 수능최저 적용", false],
  ["khu", "실기우수자전형", "기타", 337, "https://iphak.khu.ac.kr/", "실기·실적 중심, 모집단위별 반영비율 상이", false],
  ["khu", "특성화고 등을 졸업한 재직자전형", "기타", 263, "https://iphak.khu.ac.kr/", "정원외 재직자 특별전형", false],

  ["hufs", "학교장추천전형", "교과", 370, "https://adms.hufs.ac.kr/", "학생부교과100, 수능최저 적용", false],
  ["hufs", "학생부종합전형(면접형)", "학종", 478, "https://adms.hufs.ac.kr/", "1단계 서류100 3배수, 2단계 서류50+면접50", true],
  ["hufs", "학생부종합전형(SW인재)", "학종", 34, "https://adms.hufs.ac.kr/", "서류100, 진로역량50 중심", false],
  ["hufs", "학생부종합전형(서류형)", "학종", 585, "https://adms.hufs.ac.kr/", "서류100, 학업역량50·진로역량30·공동체역량20", false],
  ["hufs", "기회균형전형", "학종", 183, "https://adms.hufs.ac.kr/", "서류100, 별도 지원자격", false],
  ["hufs", "논술전형", "논술", 452, "https://adms.hufs.ac.kr/", "논술100, 서울캠퍼스 수능최저 적용", false],

  ["ewha", "학생부교과(고교추천전형)", "교과", 377, "https://admission.ewha.ac.kr/admission/html/rolling/guide.asp", "교과100, 수능최저 적용", false],
  ["ewha", "학생부종합(미래인재전형-서류형)", "학종", 909, "https://admission.ewha.ac.kr/admission/html/rolling/guide.asp", "서류100, 수능최저 적용", false],
  ["ewha", "학생부종합(미래인재전형-면접형)", "학종", 209, "https://admission.ewha.ac.kr/admission/html/rolling/guide.asp", "1단계 서류100 후 면접, 수능최저 적용", true],
  ["ewha", "학생부종합(고른기회전형)", "학종", 164, "https://admission.ewha.ac.kr/admission/html/rolling/guide.asp", "서류평가 중심 특별전형", false],
  ["ewha", "학생부종합(사회기여자전형)", "학종", 16, "https://admission.ewha.ac.kr/admission/html/rolling/guide.asp", "서류평가 중심 특별전형", false],
  ["ewha", "논술전형", "논술", 297, "https://admission.ewha.ac.kr/admission/html/rolling/guide.asp", "논술 중심, 수능최저 적용", false],
  ["ewha", "예체능실기전형", "기타", 81, "https://admission.ewha.ac.kr/admission/html/rolling/guide.asp", "예체능 실기", false],
  ["ewha", "예체능서류전형", "기타", 39, "https://admission.ewha.ac.kr/admission/html/rolling/guide.asp", "예체능 서류", false],
];

const universities: [string, string][] = [
  ["khu", "경희대학교"],
  ["hufs", "한국외국어대학교"],
  ["ewha", "이화여자대학교"],
];

export const redSecond2027Universities: University[] = universities.map(([id, name]) => ({ id, name, region: "서울" }));

export const redSecond2027Departments: Department[] = redSecond2027Universities.map((u) => ({
  id: `${u.id}-2027-aggregate`,
  universityId: u.id,
  name: `2027 수시 ${u.name} 전형 합계`,
  category: "수시전체",
}));

export const redSecond2027Admissions: Admission[] = rows.map(([universityId, name, type, recruitmentCount, url, description, interview]) => ({
  id: `${universityId}-redsecond-${name.replace(/[^가-힣A-Za-z0-9]/g, "-")}-2027`,
  universityId,
  departmentId: `${universityId}-2027-aggregate`,
  academicYear: 2027,
  name,
  type,
  recruitmentCount,
  source: { ...source, url },
  isMock: false,
  ...(type === "교과" ? { studentRecordWeight: 100 } : {}),
  ...(interview ? { interview: true } : {}),
  ...((name.includes("지역균형") || name.includes("학교장추천") || name.includes("논술")) ? { csatMinimum: { enabled: true } } : {}),
}));
