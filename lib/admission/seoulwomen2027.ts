import type { Admission, Department, University } from "./types";

const source = { type: "university" as const, academicYear: 2027, url: "https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000126", confidence: 0.99, verifiedAt: "2026-09-04" };

export const seoulwomen2027Universities: University[] = [
  { id: "swu", name: "서울여자대학교", region: "서울" },
];

const departmentsData = [
  ["business", "경영학과", "경영·경제"], ["economics", "경제학과", "경영·경제"], ["english", "영어영문학과", "인문"], ["korean", "국어국문학과", "인문"], ["psychology", "교육심리학과", "인문·교육"], ["child", "아동학과", "인문·교육"], ["social", "사회복지학과", "사회"], ["journalism", "언론영상학부", "미디어·콘텐츠"], ["science", "수학과", "자연과학"], ["chemistry", "화학과", "자연과학"], ["bio", "생명환경공학과", "자연과학"], ["food", "식품영양학과", "자연과학"], ["software", "소프트웨어학과", "컴퓨터·소프트웨어"], ["datascience", "데이터사이언스학과", "컴퓨터·소프트웨어"], ["security", "지능정보보호학부", "컴퓨터·소프트웨어"], ["design", "산업디자인학과", "예체능"], ["visual", "시각디자인전공", "예체능"], ["media-design", "첨단미디어디자인전공", "예체능"], ["craft", "공예_컬렉터블디자인전공", "예체능"], ["free", "자유전공학부", "자유전공"], ["ai", "AI융합학부", "컴퓨터·AI"],
];

export const seoulwomen2027Departments: Department[] = departmentsData.map(([id, name, field]) => ({ id: `swu-${id}`, universityId: "swu", name, category: field }));

const aggregate = (id: string, name: string, type: Admission["type"], count: number, extra: Partial<Admission> = {}): Admission => ({ id: `swu-2027-${id}`, universityId: "swu", departmentId: `swu-${id}`, academicYear: 2027, name, type, recruitmentCount: count, source, isMock: false, ...extra });

export const seoulwomen2027Admissions: Admission[] = [
  aggregate("ba-rom-seo-ryu", "바롬인재서류전형", "학종", 183, { documentWeight: 100, csatMinimum: { enabled: false } }),
  aggregate("ba-rom-myeon-jeop", "바롬인재면접전형", "학종", 202, { documentWeight: 50, interview: true, csatMinimum: { enabled: false } }),
  aggregate("sw-convergence", "SW융합인재전형", "학종", 33, { documentWeight: 50, interview: true, csatMinimum: { enabled: false } }),
  aggregate("christian-leader", "기독교지도자전형", "학종", 23, { documentWeight: 50, interview: true, csatMinimum: { enabled: false } }),
  aggregate("opportunity-balance", "기회균형전형", "학종", 236, { documentWeight: 100, csatMinimum: { enabled: false } }),
  aggregate("subject", "교과우수자전형", "교과", 185, { studentRecordWeight: 100, csatMinimum: { enabled: true } }),
  aggregate("subject-sports", "교과우수자전형(체육)", "교과", 10, { studentRecordWeight: 60, csatMinimum: { enabled: false } }),
  aggregate("essay", "논술우수자전형", "논술", 120, { studentRecordWeight: 20, csatMinimum: { enabled: true } }),
  aggregate("practical-sports", "실기우수자(체육)", "기타", 8),
  aggregate("practical-art", "실기우수자(미술)", "기타", 65),
];

export const seoulwomen2027DepartmentsWithAggregate: Department[] = [...seoulwomen2027Departments, ...seoulwomen2027Admissions.map((a) => ({ id: a.departmentId, universityId: a.universityId, name: a.name, category: "전형별 모집단위" }))];
