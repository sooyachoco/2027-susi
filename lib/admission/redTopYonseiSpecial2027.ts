import type { Admission, Department } from "./types";

const source = {
  type: "university" as const,
  academicYear: 2027,
  collectedAt: "2026-09-04",
  verifiedAt: "2026-09-04",
  confidence: 0.99,
};

type Row = [string, string, string, number];

// 연세대 서울캠퍼스 2027 수시 2차 전형 데이터.
// 국제형·국제인재·논술·체육인재는 전형별 공식 모집단위 표를 기준으로 분리 관리한다.
// 신학과는 프로젝트 범위에서 제외한다.
// 논술은 계약학과(시스템반도체 12, 디스플레이융합 4)를 제외한 정원 내 일반 모집 272명만 수록한다.
const rows: Row[] = [
  ["yonsei-ud-humanities-social", "언더우드학부(인문·사회)", "국제형(해외고/검정고시)", 29],
  ["yonsei-ud-life-science", "언더우드학부(생명과학공학)", "국제형(해외고/검정고시)", 5],
  ["yonsei-asia", "아시아학전공", "국제형(국내고)", 20],
  ["yonsei-hass", "융합인문사회과학부(HASS)", "국제형(국내고)", 110],
  ["yonsei-hass", "융합인문사회과학부(HASS)", "국제형(해외고/검정고시)", 20],
  ["yonsei-ise", "융합과학공학부(ISE)", "국제형(국내고)", 45],
  ["yonsei-ise", "융합과학공학부(ISE)", "국제형(해외고/검정고시)", 15],
  ["yonsei-ud-humanities-social", "언더우드학부(인문·사회)", "국제인재", 110],
  ["yonsei-ud-life-science", "언더우드학부(생명과학공학)", "국제인재", 10],
  ["yonsei-global-talent", "글로벌인재학부", "국제형(해외고/검정고시)", 10],
  ["yonsei-korean", "국어국문학과", "논술", 4],
  ["yonsei-chinese", "중어중문학과", "논술", 4],
  ["yonsei-english", "영어영문학과", "논술", 5],
  ["yonsei-german", "독어독문학과", "논술", 4],
  ["yonsei-french", "불어불문학과", "논술", 4],
  ["yonsei-russian", "노어노문학과", "논술", 4],
  ["yonsei-history", "사학과", "논술", 4],
  ["yonsei-philosophy", "철학과", "논술", 4],
  ["yonsei-library", "문헌정보학과", "논술", 4],
  ["yonsei-psychology", "심리학과", "논술", 4],
  ["yonsei-economics", "경제학부", "논술", 5],
  ["yonsei-applied-statistics", "응용통계학과", "논술", 2],
  ["yonsei-business", "경영학과", "논술", 15],
  ["yonsei-math", "수학과", "논술", 7],
  ["yonsei-physics", "물리학과", "논술", 7],
  ["yonsei-chemistry", "화학과", "논술", 4],
  ["yonsei-earth-system", "지구시스템과학과", "논술", 4],
  ["yonsei-astronomy", "천문우주학과", "논술", 4],
  ["yonsei-atmospheric", "대기과학과", "논술", 3],
  ["yonsei-chemical-bio", "화공생명공학부", "논술", 12],
  ["yonsei-electrical", "전기전자공학부", "논술", 20],
  ["yonsei-architecture", "건축공학과", "논술", 7],
  ["yonsei-urban", "도시공학과", "논술", 3],
  ["yonsei-civil", "사회환경시스템공학부", "논술", 10],
  ["yonsei-mechanical", "기계공학부", "논술", 18],
  ["yonsei-materials", "신소재공학부", "논술", 13],
  ["yonsei-industrial", "산업공학과", "논술", 4],
  ["yonsei-life-science", "생명과학부", "논술", 0],
  ["yonsei-system-biology", "시스템생물학과", "논술", 3],
  ["yonsei-biochemistry", "생화학과", "논술", 2],
  ["yonsei-biotechnology", "생명공학과", "논술", 8],
  ["yonsei-computer-science", "컴퓨터과학과", "논술", 6],
  ["yonsei-ai", "인공지능학과", "논술", 5],
  ["yonsei-ai-system", "인공지능시스템학과", "논술", 4],
  ["yonsei-it-convergence", "IT융합공학전공", "논술", 4],
  ["yonsei-intelligent-semiconductor", "지능형반도체전공", "논술", 3],
  ["yonsei-mobility", "모빌리티시스템전공", "논술", 3],
  ["yonsei-politics", "정치외교학과", "논술", 6],
  ["yonsei-public-admin", "행정학과", "논술", 6],
  ["yonsei-sociology", "사회학과", "논술", 5],
  ["yonsei-communication", "언론홍보영상학부", "논술", 5],
  ["yonsei-education", "교육학부", "논술", 4],
  ["yonsei-pharmacy", "약학과", "논술", 5],
  ["yonsei-free-humanities", "진리자유학부(인문)", "논술", 12],
  ["yonsei-free-natural", "진리자유학부(자연)", "논술", 12],
  ["yonsei-sports-education", "체육교육학과", "체육인재", 19],
  ["yonsei-sports-industry", "스포츠응용산업학과", "체육인재", 19],
];

export const redTopYonsei2027SpecialDepartments: Department[] = rows.map(([id, name, category]) => ({
  id: `${id}-${category}`,
  universityId: "yonsei",
  name,
  category: `수시모집-${category}`,
}));

export const redTopYonsei2027SpecialAdmissions: Admission[] = rows.flatMap(([departmentId, name, category, count]) => {
  if (count <= 0) return [];
  const type = category === "논술" ? "논술" as const : category === "국제형(국내고)" || category === "국제형(해외고/검정고시)" || category === "국제인재" ? "학종" as const : "기타" as const;
  const interview = category !== "논술";
  return [{
    id: `yonsei-special-${category}-${departmentId}-2027`,
    universityId: "yonsei",
    departmentId,
    academicYear: 2027,
    name: category === "논술" ? "논술전형" : category === "체육인재" ? "특기자전형[체육인재]" : `학생부종합전형[${category}]`,
    type,
    recruitmentCount: count,
    source: { ...source, url: "https://admission.yonsei.ac.kr/seoul/admission/html/rolling/guide.asp" },
    isMock: false,
    ...(interview ? { interview: true } : {}),
    ...(category === "국제형(국내고)" ? { csatMinimum: { enabled: true } } : {}),
  } as Admission];
});
