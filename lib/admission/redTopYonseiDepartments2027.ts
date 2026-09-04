import type { Admission, Department } from "./types";

const source = {
  type: "university" as const,
  academicYear: 2027,
  collectedAt: "2026-09-04",
  verifiedAt: "2026-09-04",
  confidence: 0.99,
};

type Row = [string, string, string, number, number, number];

// 연세대 서울캠퍼스 2027 수시 모집단위별 인원.
// 공식 2027 최종 수시모집요강의 모집단위 표를 기준으로 하며,
// 신과대학(신학과)은 프로젝트 범위에서 제외한다.
// 계약학과는 정원 외 별도 모집이므로 일반 정원 내 감사에서 별도로 관리한다.
const rows: Row[] = [
  ["yonsei-korean", "국어국문학과", "인문", 7, 10, 3],
  ["yonsei-chinese", "중어중문학과", "인문", 5, 7, 2],
  ["yonsei-english", "영어영문학과", "인문", 12, 15, 5],
  ["yonsei-german", "독어독문학과", "인문", 4, 7, 2],
  ["yonsei-french", "불어불문학과", "인문", 5, 8, 2],
  ["yonsei-russian", "노어노문학과", "인문", 4, 7, 2],
  ["yonsei-history", "사학과", "인문", 7, 9, 3],
  ["yonsei-philosophy", "철학과", "인문", 5, 8, 2],
  ["yonsei-library", "문헌정보학과", "인문", 4, 7, 2],
  ["yonsei-psychology", "심리학과", "인문", 5, 8, 3],
  ["yonsei-economics", "경제학부", "인문", 25, 32, 11],
  ["yonsei-applied-statistics", "응용통계학과", "통합", 6, 11, 4],
  ["yonsei-business", "경영학과", "인문", 32, 40, 15],
  ["yonsei-math", "수학과", "자연", 5, 7, 3],
  ["yonsei-physics", "물리학과", "자연", 4, 7, 2],
  ["yonsei-chemistry", "화학과", "자연", 8, 10, 3],
  ["yonsei-earth-system", "지구시스템과학과", "자연", 4, 7, 2],
  ["yonsei-astronomy", "천문우주학과", "자연", 4, 6, 2],
  ["yonsei-atmospheric", "대기과학과", "자연", 4, 6, 2],
  ["yonsei-chemical-bio", "화공생명공학부", "자연", 13, 17, 6],
  ["yonsei-electrical", "전기전자공학부", "자연", 27, 34, 12],
  ["yonsei-architecture", "건축공학과", "자연", 13, 16, 6],
  ["yonsei-urban", "도시공학과", "자연", 4, 7, 3],
  ["yonsei-civil", "사회환경시스템공학부", "자연", 12, 15, 5],
  ["yonsei-mechanical", "기계공학부", "자연", 18, 23, 8],
  ["yonsei-materials", "신소재공학부", "자연", 16, 19, 8],
  ["yonsei-industrial", "산업공학과", "자연", 5, 7, 2],
  ["yonsei-system-semiconductor", "시스템반도체공학과", "자연", 20, 38, 5],
  ["yonsei-display", "디스플레이융합공학과", "자연", 5, 14, 0],
  ["yonsei-life-science", "생명과학부", "자연", 0, 6, 0],
  ["yonsei-system-biology", "시스템생물학과", "자연", 4, 5, 2],
  ["yonsei-biochemistry", "생화학과", "자연", 3, 4, 2],
  ["yonsei-biotechnology", "생명공학과", "자연", 9, 11, 4],
  ["yonsei-computer-science", "컴퓨터과학과", "자연", 8, 10, 4],
  ["yonsei-ai", "인공지능학과", "자연", 10, 15, 5],
  ["yonsei-ai-system", "인공지능시스템학과", "자연", 7, 10, 4],
  ["yonsei-it-convergence", "IT융합공학전공", "자연", 4, 6, 0],
  ["yonsei-intelligent-semiconductor", "지능형반도체전공", "자연", 6, 8, 1],
  ["yonsei-politics", "정치외교학과", "인문", 13, 16, 6],
  ["yonsei-public-admin", "행정학과", "인문", 12, 16, 6],
  ["yonsei-social-welfare", "사회복지학과", "인문", 5, 7, 2],
  ["yonsei-sociology", "사회학과", "인문", 6, 8, 3],
  ["yonsei-cultural-anthropology", "문화인류학과", "인문", 4, 4, 1],
  ["yonsei-communication", "언론홍보영상학부", "인문", 6, 8, 3],
  ["yonsei-clothing", "의류환경학과", "통합", 5, 10, 2],
  ["yonsei-food-nutrition", "식품영양학과", "통합", 5, 9, 2],
  ["yonsei-interior", "실내건축학과", "통합", 5, 9, 2],
  ["yonsei-child-family", "아동·가족학과", "통합", 5, 10, 2],
  ["yonsei-integrated-design", "통합디자인학과", "통합", 5, 9, 2],
  ["yonsei-education", "교육학부", "인문", 9, 12, 4],
  ["yonsei-ud-humanities-social", "언더우드학부(인문·사회)", "국제", 0, 0, 0],
  ["yonsei-ud-life-science", "언더우드학부(생명과학공학)", "국제", 0, 0, 0],
  ["yonsei-asia", "아시아학전공", "국제", 0, 0, 0],
  ["yonsei-hass", "융합인문사회과학부(HASS)", "국제", 0, 0, 0],
  ["yonsei-ise", "융합과학공학부(ISE)", "국제", 0, 0, 0],
  ["yonsei-global-talent", "글로벌인재학부", "국제", 0, 0, 0],
  ["yonsei-medicine", "의예과", "자연", 15, 45, 3],
  ["yonsei-dentistry", "치의예과", "자연", 10, 21, 2],
  ["yonsei-nursing", "간호학과", "통합", 11, 24, 3],
  ["yonsei-pharmacy", "약학과", "자연", 5, 7, 1],
  ["yonsei-free-humanities", "진리자유학부(인문)", "인문", 19, 24, 0],
  ["yonsei-free-natural", "진리자유학부(자연)", "자연", 20, 25, 0],
  ["yonsei-mobility", "모빌리티시스템전공", "자연", 4, 7, 1],
  ["yonsei-advanced-pharma", "첨단약과학과", "자연", 4, 6, 0],
];

export const redTopYonsei2027Departments: Department[] = rows.map(([id, name, category]) => ({
  id,
  universityId: "yonsei",
  name,
  category: `수시모집단위-${category}`,
}));

export const redTopYonsei2027Admissions: Admission[] = rows.flatMap(([departmentId, , , recommendation, activity, opportunity]) => {
  const admissions: Admission[] = [];
  if (recommendation > 0) admissions.push({
    id: `yonsei-dept-recommend-${departmentId}-2027`, universityId: "yonsei", departmentId,
    academicYear: 2027, name: "학생부교과전형[추천형]", type: "교과", recruitmentCount: recommendation,
    source: { ...source, url: "https://admission.yonsei.ac.kr/seoul/admission/html/rolling/guide.asp" },
    isMock: false, studentRecordWeight: 100, csatMinimum: { enabled: true },
  });
  if (activity > 0) admissions.push({
    id: `yonsei-dept-activity-${departmentId}-2027`, universityId: "yonsei", departmentId,
    academicYear: 2027, name: "학생부종합전형[활동우수형]", type: "학종", recruitmentCount: activity,
    source: { ...source, url: "https://admission.yonsei.ac.kr/seoul/admission/html/rolling/guide.asp" },
    isMock: false, interview: true, csatMinimum: { enabled: true },
  });
  if (opportunity > 0) admissions.push({
    id: `yonsei-dept-opportunity-${departmentId}-2027`, universityId: "yonsei", departmentId,
    academicYear: 2027, name: "학생부종합전형[기회균형]", type: "학종", recruitmentCount: opportunity,
    source: { ...source, url: "https://admission.yonsei.ac.kr/seoul/admission/html/rolling/guide.asp" },
    isMock: false,
  });
  return admissions;
});
