import type { Admission, Department, University } from "./../types";

const source = {
  type: "adiga" as const,
  url: "https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2027",
  academicYear: 2027,
  confidence: 0.85,
};

/**
 * 2027학년도 수시 탐색 확장 데이터.
 * 개별 대학의 최종 모집요강과 세부 모집인원 재검증 전까지 실제 추천에서 사용하지 않는다.
 */
export const expanded2027Universities: University[] = [
  { id: "gachon", name: "가천대학교", region: "경기" },
  { id: "sungshin", name: "성신여자대학교", region: "서울" },
  { id: "kookmin", name: "국민대학교", region: "서울" },
  { id: "kwangwoon", name: "광운대학교", region: "서울" },
  { id: "dongguk", name: "동국대학교", region: "서울" },
  { id: "hongik", name: "홍익대학교", region: "서울" },
  { id: "soongsil", name: "숭실대학교", region: "서울" },
  { id: "sejong", name: "세종대학교", region: "서울" },
  { id: "hanyang", name: "한양대학교", region: "서울" },
  { id: "sogang", name: "서강대학교", region: "서울" },
  { id: "inha", name: "인하대학교", region: "인천" },
  { id: "ajou", name: "아주대학교", region: "경기" },
  { id: "dankook", name: "단국대학교", region: "경기" },
  { id: "chungbuk", name: "충북대학교", region: "충북" },
  { id: "chonnam", name: "전남대학교", region: "광주" },
  { id: "pusan", name: "부산대학교", region: "부산" },
  { id: "snu", name: "서울대학교", region: "서울" },
  { id: "yonsei", name: "연세대학교", region: "서울" },
];

const defs: Array<[string, string, string, string, string]> = [
  ["dongguk", "dongguk-law", "법학과", "법·행정", "동국대"],
  ["dongguk", "dongguk-business", "경영학과", "경영·경제", "동국대"],
  ["dongguk", "dongguk-cs", "컴퓨터공학전공", "컴퓨터·소프트웨어", "동국대"],
  ["hongik", "hongik-business", "경영학부", "경영·경제", "홍익대"],
  ["hongik", "hongik-cs", "컴퓨터공학과", "컴퓨터·소프트웨어", "홍익대"],
  ["soongsil", "soongsil-law", "법학과", "법·행정", "숭실대"],
  ["soongsil", "soongsil-business", "경영학부", "경영·경제", "숭실대"],
  ["soongsil", "soongsil-cs", "컴퓨터학부", "컴퓨터·소프트웨어", "숭실대"],
  ["sejong", "sejong-law", "법학부", "법·행정", "세종대"],
  ["sejong", "sejong-business", "경영학부", "경영·경제", "세종대"],
  ["sejong", "sejong-cs", "컴퓨터공학과", "컴퓨터·소프트웨어", "세종대"],
  ["hanyang", "hanyang-business", "경영학부", "경영·경제", "한양대"],
  ["hanyang", "hanyang-cs", "컴퓨터소프트웨어학부", "컴퓨터·소프트웨어", "한양대"],
  ["sogang", "sogang-business", "경영학부", "경영·경제", "서강대"],
  ["sogang", "sogang-cs", "컴퓨터공학과", "컴퓨터·소프트웨어", "서강대"],
  ["inha", "inha-law", "법학부", "법·행정", "인하대"],
  ["inha", "inha-business", "경영학과", "경영·경제", "인하대"],
  ["inha", "inha-cs", "컴퓨터공학과", "컴퓨터·소프트웨어", "인하대"],
  ["ajou", "ajou-business", "경영학과", "경영·경제", "아주대"],
  ["ajou", "ajou-cs", "소프트웨어학과", "컴퓨터·소프트웨어", "아주대"],
  ["ajou", "ajou-ai-computer", "AI컴퓨터공학부", "컴퓨터·소프트웨어", "아주대"],
  ["dankook", "dankook-law", "법학과", "법·행정", "단국대"],
  ["dankook", "dankook-business", "경영학부", "경영·경제", "단국대"],
  ["dankook", "dankook-cs", "컴퓨터공학과", "컴퓨터·소프트웨어", "단국대"],
  ["chungbuk", "chungbuk-law", "법학부", "법·행정", "충북대"],
  ["chungbuk", "chungbuk-business", "경영학부", "경영·경제", "충북대"],
  ["chungbuk", "chungbuk-cs", "컴퓨터공학과", "컴퓨터·소프트웨어", "충북대"],
  ["chonnam", "chonnam-law", "법학과", "법·행정", "전남대"],
  ["chonnam", "chonnam-business", "경영학부", "경영·경제", "전남대"],
  ["chonnam", "chonnam-cs", "소프트웨어공학과", "컴퓨터·소프트웨어", "전남대"],
  ["pusan", "pusan-law", "법학과", "법·행정", "부산대"],
  ["pusan", "pusan-business", "경영학과", "경영·경제", "부산대"],
  ["pusan", "pusan-cs", "컴퓨터공학과", "컴퓨터·소프트웨어", "부산대"],
  ["snu", "snu-free", "자유전공학부", "자율전공", "서울대"],
  ["snu", "snu-business", "경영대학", "경영·경제", "서울대"],
  ["yonsei", "yonsei-business", "상경계열", "경영·경제", "연세대"],
  ["yonsei", "yonsei-free", "인문·사회계열 모집단위", "인문·사회", "연세대"],
];

export const expanded2027Departments: Department[] = defs.map(([universityId, id, name, category]) => ({
  universityId,
  id,
  name,
  category,
}));

export const expanded2027Admissions: Admission[] = defs.flatMap(([universityId, departmentId]) => [
  {
    id: `${departmentId}-holistic-2027`,
    universityId,
    departmentId,
    academicYear: 2027,
    name: "학생부종합",
    type: "학종" as const,
    interview: false,
    csatMinimum: { enabled: false },
    source,
    isMock: true,
  },
  {
    id: `${departmentId}-subject-2027`,
    universityId,
    departmentId,
    academicYear: 2027,
    name: "학생부교과",
    type: "교과" as const,
    studentRecordWeight: 100,
    csatMinimum: { enabled: false },
    source,
    isMock: true,
  },
  {
    id: `${departmentId}-essay-2027`,
    universityId,
    departmentId,
    academicYear: 2027,
    name: "논술전형",
    type: "논술" as const,
    csatMinimum: { enabled: false },
    source,
    isMock: true,
  },
]);
