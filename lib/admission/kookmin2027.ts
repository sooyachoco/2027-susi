import type { Admission, Department, University } from "./types";

export const kookmin2027Universities: University[] = [{ id: "kookmin", name: "국민대학교", region: "서울" }];

const units: Array<[string, string, string]> = [
  ["korean", "한국어문학부", "인문·사회"], ["english", "영어영문학부", "인문·사회"], ["history", "한국역사학과", "인문·사회"], ["publicadmin", "행정학과", "인문·사회"], ["politics", "정치외교학과", "인문·사회"], ["economics", "경제학과", "경영·경제"], ["business", "경영학부", "경영·경제"], ["accounting", "회계학전공", "경영·경제"], ["international", "국제통상학과", "경영·경제"], ["law", "법학부", "인문·사회"],
  ["architecture", "건축학부", "공학"], ["civil", "건설시스템공학부", "공학"], ["mechanical", "기계공학부", "공학"], ["automotive", "자동차공학과", "공학"], ["electrical", "전자공학부", "공학"], ["software", "소프트웨어학부", "컴퓨터·소프트웨어"], ["ai", "인공지능학부", "컴퓨터·소프트웨어"], ["data", "데이터사이언스학부", "컴퓨터·소프트웨어"], ["chemistry", "나노소재전공", "자연과학"], ["math", "수학과", "자연과학"], ["physics", "물리학과", "자연과학"], ["food", "식품영양학과", "자연과학"], ["biomedical", "바이오발효융합학과", "자연과학"], ["bio", "바이오의약학과", "자연과학"],
  ["design", "시각디자인학과", "예체능"], ["media", "미디어전공", "예체능"], ["sports", "스포츠교육학과", "예체능"], ["film", "공연예술학부", "예체능"], ["free", "자유전공", "융합"], ["future", "미래융합전공", "융합"]
];

export const kookmin2027Departments: Department[] = units.map(([id, name, category]) => ({ id: `kookmin-${id}`, universityId: "kookmin", name, category }));
const aggregate: Department = { id: "kookmin-2027-overall", universityId: "kookmin", name: "2027 수시 전체(전형 합계)", category: "전체" };
export const kookmin2027DepartmentsWithAggregate: Department[] = [...kookmin2027Departments, aggregate];

const src = "https://admission.kookmin.ac.kr/nonschedule/notice.php?ctype=view&no=1003";
const source = { type: "university" as const, academicYear: 2027, url: src, confidence: .99 };
const admission = (id: string, dept: string, name: string, type: "교과" | "학종" | "논술" | "기타", extra: Partial<Admission> = {}): Admission => ({ id: `kookmin-${dept}-${id}-2027`, universityId: "kookmin", departmentId: `kookmin-${dept}`, academicYear: 2027, name, type, source, isMock: false, ...extra });

export const kookmin2027Admissions: Admission[] = units.flatMap(([id]) => [
  admission("kyogwa", id, "교과우수자(학교장추천)전형", "교과", { studentRecordWeight: 100 }),
  admission("frontier", id, "국민프런티어전형", "학종", { documentWeight: 70, interview: true }),
  admission("essay", id, "논술전형", "논술")
]);

export const kookmin2027VerifiedTotals = {
  kyogwa: 586,
  frontier: 724,
  international: 15,
  algorithm: 10,
  opportunity1: 122,
  rural: 100,
  opportunity2: 57,
  adultLearner: 20,
  employee: 156,
  essay: 205,
  specialTalent: 44,
  practical: 70,
  total: 2109
};

export const kookmin2027AggregateAdmissions: Admission[] = [
  admission("overall-kyogwa", aggregate.id, "교과우수자(학교장추천)전형", "교과", { recruitmentCount: 586, studentRecordWeight: 100 }),
  admission("overall-frontier", aggregate.id, "국민프런티어전형", "학종", { recruitmentCount: 724, documentWeight: 70, interview: true }),
  admission("overall-international", aggregate.id, "국제인재전형", "학종", { recruitmentCount: 15, documentWeight: 70, interview: true }),
  admission("overall-algorithm", aggregate.id, "알고리즘우수자전형", "학종", { recruitmentCount: 10, documentWeight: 70, interview: true }),
  admission("overall-opportunity1", aggregate.id, "기회균형Ⅰ전형", "학종", { recruitmentCount: 122, documentWeight: 70, interview: true }),
  admission("overall-rural", aggregate.id, "농어촌학생전형", "학종", { recruitmentCount: 100, documentWeight: 70, interview: true }),
  admission("overall-opportunity2", aggregate.id, "기회균형Ⅱ전형", "학종", { recruitmentCount: 57, documentWeight: 70, interview: true }),
  admission("overall-adult", aggregate.id, "성인학습자전형", "학종", { recruitmentCount: 20, documentWeight: 100 }),
  admission("overall-employee", aggregate.id, "특성화고등을졸업한재직자전형", "학종", { recruitmentCount: 156, documentWeight: 100 }),
  admission("overall-essay", aggregate.id, "논술전형", "논술", { recruitmentCount: 205 }),
  admission("overall-special", aggregate.id, "특기자전형", "기타", { recruitmentCount: 44 }),
  admission("overall-practical", aggregate.id, "실기우수자전형", "기타", { recruitmentCount: 70 })
];

export const kookmin2027Summary = {
  source: "국민대학교 2027학년도 수시모집요강 최종본 및 2026-06-22 재게시 안내",
  totals: kookmin2027VerifiedTotals,
  changes: [
    "교과우수자(학교장추천) 585명→586명, 국민프런티어 725명→724명",
    "국제인재전형 15명 및 알고리즘우수자전형 10명 신설",
    "국민프런티어 등 학생부종합 평가요소는 2026-06-01 재게시 가이드북 기준 반영",
    "최종 모집요강 기준 특기자·실기우수자·재직자·기회균형 계열을 집계 데이터에 포함"
  ]
};
