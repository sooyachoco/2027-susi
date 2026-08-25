import type { Admission, Department, University } from "./types";

const adiga = (url: string, confidence = 0.9) => ({
  type: "adiga" as const,
  url,
  academicYear: 2027,
  confidence,
});

export const verified2027Universities: University[] = [
  { id: "skku", name: "성균관대학교", region: "서울" },
  { id: "uos", name: "서울시립대학교", region: "서울" },
  { id: "konkuk", name: "건국대학교", region: "서울" },
  { id: "ewha", name: "이화여자대학교", region: "서울" },
  { id: "chungang", name: "중앙대학교", region: "서울" },
  { id: "yonsei", name: "연세대학교", region: "서울" },
  { id: "korea", name: "고려대학교", region: "서울" },
  { id: "kyunggi", name: "경기대학교", region: "경기" },
  { id: "tukorea", name: "한국공학대학교", region: "경기" },
  { id: "myongji", name: "명지대학교", region: "경기" },
];

export const verified2027Departments: Department[] = [
  { id: "skku-sw", universityId: "skku", name: "소프트웨어학과", category: "컴퓨터·소프트웨어" },
  { id: "skku-business", universityId: "skku", name: "경영학과", category: "경영·경제" },
  { id: "skku-global-business", universityId: "skku", name: "글로벌경영학과", category: "경영·경제" },
  { id: "skku-global-economics", universityId: "skku", name: "글로벌경제학과", category: "경영·경제" },
  { id: "skku-law", universityId: "skku", name: "법학과", category: "법·행정" },
  { id: "skku-cs", universityId: "skku", name: "컴퓨터공학과", category: "컴퓨터·소프트웨어" },
  { id: "uos-cs", universityId: "uos", name: "컴퓨터과학부", category: "컴퓨터·소프트웨어" },
  { id: "konkuk-cs", universityId: "konkuk", name: "컴퓨터공학부", category: "컴퓨터·소프트웨어" },
  { id: "ewha-cs", universityId: "ewha", name: "컴퓨터공학과", category: "컴퓨터·소프트웨어" },
  { id: "chungang-sw", universityId: "chungang", name: "소프트웨어학부", category: "컴퓨터·소프트웨어" },
  { id: "kyunggi-law", universityId: "kyunggi", name: "법학과", category: "법·행정" },
  { id: "kyunggi-business", universityId: "kyunggi", name: "경영학부", category: "경영·경제" },
  { id: "kyunggi-economics", universityId: "kyunggi", name: "경제학부", category: "경영·경제" },
  { id: "kyunggi-ai-cs", universityId: "kyunggi", name: "AI컴퓨터공학부", category: "컴퓨터·소프트웨어" },
  { id: "kyunggi-electronics", universityId: "kyunggi", name: "전자공학부", category: "전기·전자" },
  { id: "kyunggi-mechanical", universityId: "kyunggi", name: "기계시스템공학과", category: "기계·로봇" },
  { id: "kyunggi-media", universityId: "kyunggi", name: "미디어영상학과", category: "미디어·콘텐츠" },
  { id: "kyunggi-hotel", universityId: "kyunggi", name: "호텔외식경영학부", category: "경영·경제" },
  { id: "tukorea-business", universityId: "tukorea", name: "경영학부", category: "경영·경제" },
  { id: "tukorea-engineering", universityId: "tukorea", name: "공학계열", category: "공학" },
  { id: "tukorea-ai", universityId: "tukorea", name: "AI 소프트웨어학과", category: "컴퓨터·소프트웨어" },
  { id: "tukorea-smart-electronics", universityId: "tukorea", name: "스마트전자공학과", category: "전기·전자" },
  { id: "myongji-business", universityId: "myongji", name: "경영학전공", category: "경영·경제" },
  { id: "myongji-ai-business", universityId: "myongji", name: "AI 경영정보학과", category: "경영·경제" },
  { id: "myongji-ai-cs", universityId: "myongji", name: "AI 컴퓨터공학전공", category: "컴퓨터·소프트웨어" },
  { id: "myongji-electronics", universityId: "myongji", name: "전기전자공학부", category: "전기·전자" },
];

export const verified2027Admissions: Admission[] = [
  // 서울 — 성균관대학교: 2027 학생부교과 추천인재와 학생부종합 전형의 공식 기준을 저장.
  {
    id: "skku-school-recommendation-2027",
    universityId: "skku", departmentId: "skku-sw", academicYear: 2027,
    name: "학교장추천", type: "교과", source: adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000133"), isMock: false,
  },
  {
    id: "skku-holistic-2027",
    universityId: "skku", departmentId: "skku-sw", academicYear: 2027,
    name: "학생부종합", type: "학종", source: adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000133"), isMock: false,
  },
  // 동일 공식 기준을 적용하는 경영/경제/법/컴퓨터 모집단위.
  ...["skku-business", "skku-global-business", "skku-global-economics", "skku-law", "skku-cs"].flatMap((departmentId) => [
    { id: `skku-recommend-${departmentId}`, universityId: "skku", departmentId, academicYear: 2027, name: "학교장추천", type: "교과" as const, source: adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000133"), isMock: false },
    { id: `skku-holistic-${departmentId}`, universityId: "skku", departmentId, academicYear: 2027, name: "학생부종합", type: "학종" as const, source: adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000133"), isMock: false },
  ]),

  // 서울 — 연세대학교 활동우수형: 1단계 서류, 면접 및 계열별 수능최저 적용.
  { id: "yonsei-activity-2027", universityId: "yonsei", departmentId: "skku-business", academicYear: 2027, name: "학생부종합전형(활동우수형)", type: "학종", interview: true, csatMinimum: { enabled: true, description: "인문·자연·의예/치의예/약학 등 계열별 수능최저 적용" }, source: adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000149"), isMock: false },

  // 서울 — 고려대학교: 학업우수(서류100+수능최저), 계열적합(서류100→면접40) 등.
  { id: "korea-academic-2027", universityId: "korea", departmentId: "skku-business", academicYear: 2027, name: "학업우수전형", type: "학종", csatMinimum: { enabled: true, description: "수능최저 적용" }, source: adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000069"), isMock: false },
  { id: "korea-fit-2027", universityId: "korea", departmentId: "skku-business", academicYear: 2027, name: "계열적합전형", type: "학종", interview: true, csatMinimum: { enabled: false }, source: adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000069"), isMock: false },

  // 기존 서울 검증 데이터.
  { id: "uos-holistic-2027", universityId: "uos", departmentId: "uos-cs", academicYear: 2027, name: "학생부종합전형", type: "학종", source: adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000040"), isMock: false },
  { id: "konkuk-ku-recommend-2027", universityId: "konkuk", departmentId: "konkuk-cs", academicYear: 2027, name: "KU지역균형", type: "교과", studentRecordWeight: 70, source: adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000052"), isMock: false },
  { id: "konkuk-ku-self-2027", universityId: "konkuk", departmentId: "konkuk-cs", academicYear: 2027, name: "KU자기추천", type: "학종", studentRecordWeight: 70, interview: true, source: adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000052"), isMock: false },
  { id: "ewha-future-document-2027", universityId: "ewha", departmentId: "ewha-cs", academicYear: 2027, name: "미래인재전형-서류형", type: "학종", csatMinimum: { enabled: true, description: "인문/자연/의예/약학 등 모집단위별 수능최저 적용" }, source: adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000163"), isMock: false },
  { id: "chungang-holistic-2027", universityId: "chungang", departmentId: "chungang-sw", academicYear: 2027, name: "학생부종합", type: "학종", source: adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027"), isMock: false },

  // 경기 — 경기대학교: 2027 KGU 학생부종합과 교과성적우수자/학교장추천.
  ...["kyunggi-law", "kyunggi-business", "kyunggi-economics", "kyunggi-ai-cs", "kyunggi-electronics", "kyunggi-mechanical", "kyunggi-media", "kyunggi-hotel"].flatMap((departmentId) => [
    { id: `kyunggi-kgu-${departmentId}`, universityId: "kyunggi", departmentId, academicYear: 2027, name: "학생부종합(KGU 학생부종합전형)", type: "학종" as const, interview: true, csatMinimum: { enabled: false }, source: adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000056"), isMock: false },
    { id: `kyunggi-school-${departmentId}`, universityId: "kyunggi", departmentId, academicYear: 2027, name: "학생부교과(학교장추천전형)", type: "교과" as const, studentRecordWeight: 90, csatMinimum: { enabled: false }, source: adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000056"), isMock: false },
  ]),

  // 경기 — 한국공학대학교: 2027 창의인재/기회균형 및 교과우수자/지역균형. 경영학부와 공학·AI 계열을 명시.
  ...["tukorea-business", "tukorea-engineering", "tukorea-ai", "tukorea-smart-electronics"].flatMap((departmentId) => [
    { id: `tukorea-creative-${departmentId}`, universityId: "tukorea", departmentId, academicYear: 2027, name: "학생부종합(창의인재)", type: "학종" as const, source: adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000247"), isMock: false },
    { id: `tukorea-kyogwa-${departmentId}`, universityId: "tukorea", departmentId, academicYear: 2027, name: "학생부교과(교과우수자)", type: "교과" as const, source: adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000247"), isMock: false },
  ]),

  // 경기 — 명지대학교: 2027 모집단위 명칭 변경을 공식 자료로 확인.
  ...["myongji-business", "myongji-ai-business", "myongji-ai-cs", "myongji-electronics"].map((departmentId) => ({
    id: `myongji-holistic-${departmentId}`, universityId: "myongji", departmentId, academicYear: 2027,
    name: "학생부종합", type: "학종" as const, source: adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000109"), isMock: false,
  })),
];
