import type { Admission, Department, University } from "./types";

const sources = {
  sogang: {
    type: "adiga" as const,
    url: "https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000120",
    academicYear: 2027,
    verifiedAt: "2026-08-27",
    confidence: 0.98,
  },
  dongguk: {
    type: "university" as const,
    url: "https://ipsi.dongguk.edu/admission/html/rolling/guide.asp",
    academicYear: 2027,
    verifiedAt: "2026-08-27",
    confidence: 0.98,
  },
  soongsil: {
    type: "adiga" as const,
    url: "https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000143",
    academicYear: 2027,
    verifiedAt: "2026-08-27",
    confidence: 0.98,
  },
};

export const verifiedMetroTop2027Universities: University[] = [
  { id: "sogang", name: "서강대학교", region: "서울" },
  { id: "dongguk", name: "동국대학교", region: "서울" },
  { id: "soongsil", name: "숭실대학교", region: "서울" },
];

export const verifiedMetroTop2027Departments: Department[] = [
  { id: "sogang-business", universityId: "sogang", name: "경영학부", category: "경영·경제" },
  { id: "sogang-economics", universityId: "sogang", name: "경제학과", category: "경영·경제" },
  { id: "sogang-computer", universityId: "sogang", name: "컴퓨터공학과", category: "컴퓨터·소프트웨어" },
  { id: "dongguk-business", universityId: "dongguk", name: "경영학과", category: "경영·경제" },
  { id: "dongguk-economics", universityId: "dongguk", name: "경제학과", category: "경영·경제" },
  { id: "dongguk-computer-ai", universityId: "dongguk", name: "컴퓨터·AI학부", category: "컴퓨터·소프트웨어" },
  { id: "soongsil-business", universityId: "soongsil", name: "경영학부", category: "경영·경제" },
  { id: "soongsil-economics", universityId: "soongsil", name: "경제학과", category: "경영·경제" },
  { id: "soongsil-computer", universityId: "soongsil", name: "컴퓨터학부", category: "컴퓨터·소프트웨어" },
];

const base = (universityId: string, departmentId: string, id: string, name: string, type: Admission["type"], source: Admission["source"], extra: Partial<Admission> = {}): Admission => ({
  id,
  universityId,
  departmentId,
  academicYear: 2027,
  name,
  type,
  source,
  isMock: false,
  ...extra,
});

export const verifiedMetroTop2027Admissions: Admission[] = [
  // 서강대학교: 2027 지역균형은 교과 100% 정량평가, 최저 적용. 학종 일반 I/II는 서류 100%, 최저 미적용.
  ...verifiedMetroTop2027Departments.filter((d) => d.universityId === "sogang").flatMap((d) => [
    base("sogang", d.id, `${d.id}-sogang-regional-2027`, "학생부교과(지역균형)", "교과", sources.sogang, {
      studentRecordWeight: 100,
      interview: false,
      csatMinimum: { enabled: true, description: "국어·수학·영어·탐구(1과목) 4개 영역 중 3개 영역 각 3등급 이내, 한국사 4등급 이내" },
    }),
    base("sogang", d.id, `${d.id}-sogang-holistic-general1-2027`, "학생부종합(일반 I)", "학종", sources.sogang, {
      documentWeight: 100,
      interview: false,
      csatMinimum: { enabled: false },
    }),
    base("sogang", d.id, `${d.id}-sogang-holistic-general2-2027`, "학생부종합(일반 II)", "학종", sources.sogang, {
      documentWeight: 100,
      interview: false,
      csatMinimum: { enabled: false },
    }),
  ]),

  // 동국대학교: 학교장추천인재는 교과 70% + 서류종합평가 30%, Do Dream은 단계형 학종, 논술은 논술 70% + 학생부 30%이며 논술만 최저 적용.
  ...verifiedMetroTop2027Departments.filter((d) => d.universityId === "dongguk").flatMap((d) => [
    base("dongguk", d.id, `${d.id}-dongguk-recommend-2027`, "학생부교과(학교장추천인재)", "교과", sources.dongguk, {
      studentRecordWeight: 70,
      interview: false,
      csatMinimum: { enabled: false },
    }),
    base("dongguk", d.id, `${d.id}-dongguk-do-dream-2027`, "학생부종합(Do Dream)", "학종", sources.dongguk, {
      documentWeight: 100,
      interview: true,
      csatMinimum: { enabled: false },
    }),
    base("dongguk", d.id, `${d.id}-dongguk-essay-2027`, "논술", "논술", sources.dongguk, {
      studentRecordWeight: 30,
      interview: false,
      csatMinimum: { enabled: true, description: "논술전형에 수능최저학력기준 적용" },
    }),
  ]),

  // 숭실대학교: 교과우수자·논술우수자는 최저 적용, SSU 미래인재는 면접형/서류형으로 분리되고 최저 없음.
  ...verifiedMetroTop2027Departments.filter((d) => d.universityId === "soongsil").flatMap((d) => [
    base("soongsil", d.id, `${d.id}-soongsil-curriculum-2027`, "학생부교과(교과우수자)", "교과", sources.soongsil, {
      studentRecordWeight: 100,
      interview: false,
      csatMinimum: { enabled: true, description: "국어·수학·영어·사회/과학탐구(1과목) 중 2개 영역 등급 합 6 이내" },
    }),
    base("soongsil", d.id, `${d.id}-soongsil-future-interview-2027`, "학생부종합(SSU미래인재전형(면접형))", "학종", sources.soongsil, {
      documentWeight: 50,
      interview: true,
      csatMinimum: { enabled: false },
    }),
    base("soongsil", d.id, `${d.id}-soongsil-future-document-2027`, "학생부종합(SSU미래인재전형(서류형))", "학종", sources.soongsil, {
      documentWeight: 100,
      interview: false,
      csatMinimum: { enabled: false },
    }),
    base("soongsil", d.id, `${d.id}-soongsil-essay-2027`, "논술우수자", "논술", sources.soongsil, {
      studentRecordWeight: 10,
      interview: false,
      csatMinimum: { enabled: true, description: "국어·수학·영어·사회/과학탐구(1과목) 중 2개 영역 등급 합 6 이내" },
    }),
  ]),
];
