import type { Admission, Department, University } from "./types";

const source = {
  type: "university" as const,
  academicYear: 2027,
  url: "https://iphak.uhs.ac.kr/ipsi/board/notice/detail.do?bbsNo=32484",
  document: "2027학년도 협성대학교 수시모집요강(최종)",
  confidence: 0.99,
  verifiedAt: "2026-09-05",
};

export const hyupsung2027Universities: University[] = [
  { id: "hyupsung", name: "협성대학교", region: "경기" },
];

// 2027 최종 모집요강 및 대입정보포털 기준 모집단위.
const catalog: Array<[string, string, string]> = [
  ["humanities-open-major", "인문사회 자율전공학부", "자유전공"],
  ["business-open-major", "경영 자율전공학부", "자유전공"],
  ["engineering-open-major", "이공 자율전공학부", "자유전공"],
  ["design-open-major", "디자인 자율전공학부", "자유전공"],
  ["theology", "신학과", "인문·사회"],
  ["creative-writing", "문예창작학과", "인문·사회"],
  ["social-welfare", "사회복지학과", "인문·사회"],
  ["child-care", "아동보육학과", "인문·사회"],
  ["chinese-culture", "중국어문화학과", "인문·사회"],
  ["urban-administration", "도시행정학과", "인문·사회"],
  ["media-advertising", "미디어영상광고학과", "인문·사회"],
  ["business", "경영학과", "경영"],
  ["finance-insurance", "금융보험학과", "경영"],
  ["tax-accounting", "세무회계학과", "경영"],
  ["hotel-tourism", "호텔관광경영학과", "경영"],
  ["distribution-business", "유통경영학과", "경영"],
  ["global-trade-culture", "글로벌통상·문화학과", "경영"],
  ["computer-engineering", "컴퓨터공학과", "공학"],
  ["software-engineering", "소프트웨어공학과", "공학"],
  ["architecture-engineering", "건축공학과", "공학"],
  ["urban-engineering", "도시공학과", "공학"],
  ["health-management", "보건관리학과", "보건"],
  ["biomedical-chemistry", "의생명화학과", "자연·공학"],
  ["music-piano", "음악학부 피아노전공", "예체능"],
  ["music-orchestral", "음악학부 관현악전공", "예체능"],
  ["music-vocal", "음악학부 성악전공", "예체능"],
  ["music-practical", "음악학부 실용음악전공", "예체능"],
  ["interior-design", "실내디자인학과", "예체능"],
  ["furniture-design", "가구디자인학과", "예체능"],
  ["industrial-design", "산업디자인학과", "예체능"],
  ["visual-design", "시각디자인학과", "예체능"],
  ["able-sports", "에이블아트·스포츠학과", "예체능"],
];

export const hyupsung2027Departments: Department[] = catalog.map(([id, name, category]) => ({
  id: `hyupsung-${id}`,
  universityId: "hyupsung",
  name,
  category,
}));

// 공식 최종 모집요강/대입정보포털에서 확인한 전형별 모집인원.
// 전체 전형 합계는 특정 학과에 임의 복제하지 않고 aggregate 행으로 보존한다.
const aggregateDefs: Array<[string, string, "교과" | "학종" | "기타", number, number, boolean, number]> = [
  ["subject", "교과성적우수자", "교과", 188, 100, false, 0],
  ["future", "미래창의인재", "교과", 81, 50, true, 50],
  ["wesley", "웨슬리", "교과", 25, 50, true, 50],
  ["opportunity", "기회균형", "교과", 38, 100, false, 0],
  ["social-care", "사회배려자", "교과", 38, 100, false, 0],
  ["convergence-1", "융합인재Ⅰ", "학종", 88, 0, false, 0],
  ["convergence-2", "융합인재Ⅱ", "학종", 102, 50, true, 50],
  ["rural", "농어촌학생", "교과", 20, 100, false, 0],
  ["specialized-highschool", "특성화고교 졸업자", "교과", 15, 100, false, 0],
  ["basic-living", "기초생활수급자·차상위계층·한부모가족", "교과", 20, 100, false, 0],
  ["disabled", "장애인", "기타", 20, 0, true, 40],
  ["music", "실기우수자(음악)", "기타", 17, 10, false, 0],
  ["design", "실기우수자(디자인)", "기타", 113, 30, false, 0],
  ["able-sports", "에이블아트·스포츠", "기타", 5, 0, true, 40],
];

export const hyupsung2027Admissions: Admission[] = aggregateDefs.map(
  ([id, name, type, recruitmentCount, studentRecordWeight, interview, interviewWeight]) => ({
    id: `hyupsung-${id}-2027`,
    universityId: "hyupsung",
    departmentId: "hyupsung-aggregate",
    academicYear: 2027,
    name,
    type,
    recruitmentCount,
    ...(studentRecordWeight > 0 ? { studentRecordWeight } : {}),
    ...(type === "학종" ? { documentWeight: name === "융합인재Ⅱ" ? 50 : 100 } : {}),
    interview,
    csatMinimum: { enabled: false },
    source,
    isMock: false,
    isAggregate: true,
    ...(interviewWeight > 0 ? { majorGroup: `면접 ${interviewWeight}%` } : {}),
  }),
);
