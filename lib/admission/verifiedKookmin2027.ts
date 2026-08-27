import type { Admission, Department, University } from "./types";

export const verifiedKookmin2027Universities: University[] = [
  { id: "kookmin-2027", name: "국민대학교", region: "서울" },
];

const source = {
  type: "university" as const,
  url: "https://admission.kookmin.ac.kr/onschedule/notice.php?ctype=view&no=1081",
  document: "2027학년도 수시 주요사항 안내(08.11.)",
  academicYear: 2027,
  verifiedAt: "2026-08-27",
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

// 2027 공식 모집시기별 모집인원표의 교과우수자·국민프런티어 열을 반영한다.
// 현재 데이터에 2027 명칭과 정확히 일치하지 않는 구 모집단위는 0으로 두어
// 잘못된 전형 추천을 막고, 후속 패스에서 학과명 자체를 최신 모집단위로 교체한다.
const verifiedCounts: Record<string, { school: number; frontier: number }> = {
  "한국어문학부": { school: 12, frontier: 14 },
  "영어영문학부": { school: 18, frontier: 23 },
  "중어중문학과": { school: 5, frontier: 19 },
  "한국역사학과": { school: 10, frontier: 23 },
  "행정학과": { school: 14, frontier: 15 },
  "정치외교학과": { school: 5, frontier: 13 },
  "사회학과": { school: 8, frontier: 10 },
  "미디어·광고학부": { school: 8, frontier: 18 },
  "교육학과": { school: 10, frontier: 10 },
  "러시아·유라시아학과": { school: 4, frontier: 7 },
  "동아시아국제학부": { school: 4, frontier: 25 },
  "법학부": { school: 8, frontier: 33 },
  "기업융합법학과": { school: 2, frontier: 0 },
  "경제학과": { school: 16, frontier: 10 },
  "국제통상금융학과": { school: 13, frontier: 10 },
  "경영학부": { school: 26, frontier: 48 },
  "경영정보학부": { school: 18, frontier: 0 },
  "AI빅데이터융합경영학과": { school: 14, frontier: 15 },
  "기업경영학부": { school: 10, frontier: 1 },
  "회계세무학과": { school: 8, frontier: 0 },
  "KMU International Business School": { school: 15, frontier: 15 },
  "신소재공학부": { school: 16, frontier: 30 },
  "기계공학부": { school: 40, frontier: 47 },
  "건설시스템공학부": { school: 34, frontier: 0 },
  "전자공학부": { school: 55, frontier: 65 },
  "산림기후환경학과": { school: 0, frontier: 0 },
  "바이오소재융합공학과": { school: 0, frontier: 0 },
  "바이오의과학과": { school: 0, frontier: 0 },
  "식품영양학과": { school: 3, frontier: 14 },
  "융합바이오공학과": { school: 5, frontier: 10 },
  "제약공학과": { school: 0, frontier: 0 },
  "양자융합공학과": { school: 0, frontier: 0 },
  "정보보안암호수학과": { school: 6, frontier: 8 },
  "에너지반도체화학공학과": { school: 0, frontier: 0 },
  "소프트웨어학부": { school: 10, frontier: 19 },
  "인공지능학부": { school: 7, frontier: 11 },
  "건축학부": { school: 17, frontier: 18 },
  "자동차공학과": { school: 0, frontier: 0 },
  "자동차IT융합학과": { school: 0, frontier: 0 },
  "미래모빌리티학과": { school: 14, frontier: 9 },
  "조형대학": { school: 0, frontier: 0 },
  "예술대학": { school: 0, frontier: 0 },
  "체육대학": { school: 0, frontier: 0 },
  "스포츠교육학과": { school: 0, frontier: 0 },
  "스포츠산업경영학과": { school: 0, frontier: 0 },
  "스포츠건강재활학과": { school: 0, frontier: 0 },
  "인문기술융합학부": { school: 200, frontier: 0 },
  "미래융합전공": { school: 210, frontier: 0 },
};

export const verifiedKookmin2027Admissions: Admission[] = verifiedKookmin2027Departments.flatMap((department) => {
  const counts = verifiedCounts[department.name] ?? { school: 0, frontier: 0 };
  const result: Admission[] = [];
  if (counts.school > 0) result.push({
    id: `${department.id}-school-recommendation`,
    universityId: "kookmin-2027",
    departmentId: department.id,
    academicYear: 2027,
    type: "교과",
    name: "교과우수자(학교장추천)전형",
    recruitmentCount: counts.school,
    source,
    isMock: false,
  });
  if (counts.frontier > 0) result.push({
    id: `${department.id}-frontier`,
    universityId: "kookmin-2027",
    departmentId: department.id,
    academicYear: 2027,
    type: "학종",
    name: "국민프런티어전형",
    recruitmentCount: counts.frontier,
    source,
    isMock: false,
  });
  return result;
});
