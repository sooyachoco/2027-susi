import type { Admission, Department, University } from "./types";

const adiga = (url: string, confidence = 0.9) => ({ type: "adiga" as const, url, academicYear: 2027, confidence });

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
  { id: "gachon", name: "가천대학교", region: "경기" },
  { id: "sungshin", name: "성신여자대학교", region: "서울" },
  { id: "kookmin", name: "국민대학교", region: "서울" },
  { id: "kwangwoon", name: "광운대학교", region: "서울" },
];

export const verified2027Departments: Department[] = [
  { id: "skku-sw", universityId: "skku", name: "소프트웨어학과", category: "컴퓨터·소프트웨어" },
  { id: "skku-business", universityId: "skku", name: "경영학과", category: "경영·경제" },
  { id: "skku-global-business", universityId: "skku", name: "글로벌경영학과", category: "경영·경제" },
  { id: "skku-global-economics", universityId: "skku", name: "글로벌경제학과", category: "경영·경제" },
  { id: "skku-cs", universityId: "skku", name: "컴퓨터공학과", category: "컴퓨터·소프트웨어" },
  { id: "yonsei-business", universityId: "yonsei", name: "경영계열", category: "경영·경제" },
  { id: "korea-business", universityId: "korea", name: "경영학과", category: "경영·경제" },
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
  { id: "gachon-law", universityId: "gachon", name: "법학과", category: "법·행정" },
  { id: "sungshin-law", universityId: "sungshin", name: "법학부", category: "법·행정" },
  { id: "kookmin-law", universityId: "kookmin", name: "법학부", category: "법·행정" },
  { id: "kwangwoon-law", universityId: "kwangwoon", name: "법학부", category: "법·행정" },
];

const sourceSkku = adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000133");
const sourceYonsei = adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000149");
const sourceKorea = adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000069");
const sourceUos = adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000040");
const sourceKonkuk = adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000052");
const sourceEwha = adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000163");
const sourceChungang = adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000175");
const sourceKyunggi = adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000056");
const sourceTukorea = adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000247");
const sourceMyongji = adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000109");
const sourceGachon = adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000063");
const sourceSungshin = adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000136");
const sourceKookmin = adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000078");
const sourceKwangwoon = adiga("https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027&unvCd=0000054");

export const verified2027Admissions: Admission[] = [
  ...["skku-sw", "skku-business", "skku-global-business", "skku-global-economics", "skku-cs"].flatMap((departmentId) => [
    { id: `skku-recommend-${departmentId}`, universityId: "skku", departmentId, academicYear: 2027, name: "학교장추천", type: "교과" as const, source: sourceSkku, isMock: false },
    { id: `skku-holistic-${departmentId}`, universityId: "skku", departmentId, academicYear: 2027, name: "학생부종합", type: "학종" as const, source: sourceSkku, isMock: false },
  ]),
  { id: "yonsei-activity-2027", universityId: "yonsei", departmentId: "yonsei-business", academicYear: 2027, name: "학생부종합전형(활동우수형)", type: "학종", interview: true, csatMinimum: { enabled: true, description: "계열별 수능최저 적용" }, source: sourceYonsei, isMock: false },
  { id: "korea-academic-2027", universityId: "korea", departmentId: "korea-business", academicYear: 2027, name: "학업우수전형", type: "학종", csatMinimum: { enabled: true, description: "수능최저 적용" }, source: sourceKorea, isMock: false },
  { id: "korea-fit-2027", universityId: "korea", departmentId: "korea-business", academicYear: 2027, name: "계열적합전형", type: "학종", interview: true, csatMinimum: { enabled: false }, source: sourceKorea, isMock: false },
  { id: "uos-holistic-2027", universityId: "uos", departmentId: "uos-cs", academicYear: 2027, name: "학생부종합전형", type: "학종", source: sourceUos, isMock: false },
  { id: "konkuk-ku-recommend-2027", universityId: "konkuk", departmentId: "konkuk-cs", academicYear: 2027, name: "KU지역균형", type: "교과", studentRecordWeight: 70, source: sourceKonkuk, isMock: false },
  { id: "konkuk-ku-self-2027", universityId: "konkuk", departmentId: "konkuk-cs", academicYear: 2027, name: "KU자기추천", type: "학종", studentRecordWeight: 70, interview: true, source: sourceKonkuk, isMock: false },
  { id: "ewha-future-document-2027", universityId: "ewha", departmentId: "ewha-cs", academicYear: 2027, name: "미래인재전형-서류형", type: "학종", csatMinimum: { enabled: true, description: "모집단위별 수능최저 적용" }, source: sourceEwha, isMock: false },
  { id: "chungang-holistic-2027", universityId: "chungang", departmentId: "chungang-sw", academicYear: 2027, name: "학생부종합", type: "학종", source: sourceChungang, isMock: false },
  ...["kyunggi-law", "kyunggi-business", "kyunggi-economics", "kyunggi-ai-cs", "kyunggi-electronics", "kyunggi-mechanical", "kyunggi-media", "kyunggi-hotel"].flatMap((departmentId) => [
    { id: `kyunggi-kgu-${departmentId}`, universityId: "kyunggi", departmentId, academicYear: 2027, name: "학생부종합(KGU 학생부종합전형)", type: "학종" as const, interview: true, csatMinimum: { enabled: false }, source: sourceKyunggi, isMock: false },
    { id: `kyunggi-school-${departmentId}`, universityId: "kyunggi", departmentId, academicYear: 2027, name: "학생부교과(학교장추천전형)", type: "교과" as const, studentRecordWeight: 90, csatMinimum: { enabled: false }, source: sourceKyunggi, isMock: false },
  ]),
  ...["tukorea-business", "tukorea-engineering", "tukorea-ai", "tukorea-smart-electronics"].flatMap((departmentId) => [
    { id: `tukorea-creative-${departmentId}`, universityId: "tukorea", departmentId, academicYear: 2027, name: "학생부종합(창의인재)", type: "학종" as const, source: sourceTukorea, isMock: false },
    { id: `tukorea-kyogwa-${departmentId}`, universityId: "tukorea", departmentId, academicYear: 2027, name: "학생부교과(교과우수자)", type: "교과" as const, source: sourceTukorea, isMock: false },
  ]),
  ...["myongji-business", "myongji-ai-business", "myongji-ai-cs", "myongji-electronics"].map((departmentId) => ({ id: `myongji-holistic-${departmentId}`, universityId: "myongji", departmentId, academicYear: 2027, name: "학생부종합", type: "학종" as const, source: sourceMyongji, isMock: false })),
  { id: "gachon-law-kyogwa-2027", universityId: "gachon", departmentId: "gachon-law", academicYear: 2027, name: "학생부교과", type: "교과", source: sourceGachon, isMock: false },
  { id: "gachon-law-holistic-2027", universityId: "gachon", departmentId: "gachon-law", academicYear: 2027, name: "학생부종합", type: "학종", source: sourceGachon, isMock: false },
  { id: "gachon-law-essay-2027", universityId: "gachon", departmentId: "gachon-law", academicYear: 2027, name: "논술", type: "논술", source: sourceGachon, isMock: false },
  { id: "sungshin-law-holistic-2027", universityId: "sungshin", departmentId: "sungshin-law", academicYear: 2027, name: "학생부종합(자기주도인재)", type: "학종", source: sourceSungshin, isMock: false },
  { id: "sungshin-law-opportunity-2027", universityId: "sungshin", departmentId: "sungshin-law", academicYear: 2027, name: "기회균형Ⅰ", type: "학종", source: sourceSungshin, isMock: false },
  { id: "sungshin-law-kyogwa-2027", universityId: "sungshin", departmentId: "sungshin-law", academicYear: 2027, name: "학생부교과(지역균형)", type: "교과", source: sourceSungshin, isMock: false },
  { id: "kwangwoon-law-essay-2027", universityId: "kwangwoon", departmentId: "kwangwoon-law", academicYear: 2027, name: "논술우수자전형", type: "교과", source: sourceKwangwoon, isMock: false },
];
