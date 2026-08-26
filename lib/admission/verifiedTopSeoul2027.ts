import type { Admission, Department, University } from "./types";

const source = {
  type: "university" as const,
  url: "https://admission.skku.edu/admission/html/rolling/noticeView.html?idx=59468",
  document: "2027학년도 성균관대학교·한양대학교 수시 모집요강",
  academicYear: 2027,
  confidence: 0.98,
};

export const verifiedSkku2027Universities: University[] = [
  { id: "skku-2027", name: "성균관대학교", region: "서울" },
];

const skkuNames = [
  "유학·동양학과", "국어국문학과", "영어영문학과", "프랑스어문학과", "러시아어문학과", "중어중문학과", "독어독문학과", "한문학과", "사학과", "철학과", "문헌정보학과",
  "행정학과", "정치외교학과", "미디어커뮤니케이션학과", "사회학과", "사회복지학과", "심리학과", "경제학과", "통계학과", "글로벌경제학과", "경영학과", "글로벌경영학과",
  "글로벌리더학부", "아동·청소년학과", "교육학과", "한문교육과", "수학교육과", "컴퓨터교육과",
  "수학과", "물리학과", "화학과", "생명과학과", "바이오신약·규제과학과", "약학과", "의예과", "전자전기공학부", "반도체시스템공학과", "소프트웨어학과", "컴퓨터공학과", "인공지능융합학과", "신소재공학부", "화학공학/고분자공학부", "기계공학부", "건설환경공학부", "건축학과", "시스템경영공학과", "글로벌바이오메디컬공학과", "스포츠과학과", "영상학과", "의상학과", "소비자학과", "식품생명공학과", "바이오메카트로닉스학과", "조경학과",
];

export const verifiedSkku2027Departments: Department[] = skkuNames.map((name, i) => ({ id: `skku-2027-${i + 1}`, universityId: "skku-2027", name }));

export const verifiedSkku2027Admissions: Admission[] = verifiedSkku2027Departments.flatMap((department) => [
  { id: `${department.id}-sungkyunkwan`, universityId: "skku-2027", departmentId: department.id, academicYear: 2027, name: "학생부종합(성균인재)", type: "학종", documentWeight: 100, source, isMock: false },
  { id: `${department.id}-recommend`, universityId: "skku-2027", departmentId: department.id, academicYear: 2027, name: "학생부교과(추천인재)", type: "교과", studentRecordWeight: 100, source, isMock: false },
  { id: `${department.id}-essay`, universityId: "skku-2027", departmentId: department.id, academicYear: 2027, name: "논술우수", type: "논술", source, isMock: false },
]);

export const verifiedHanyang2027Universities: University[] = [
  { id: "hanyang-2027", name: "한양대학교", region: "서울" },
];

const hanyangNames = [
  "국어국문학과", "중어중문학과", "영어영문학과", "독어독문학과", "사학과", "철학과", "정치외교학과", "사회학과", "미디어커뮤니케이션학과", "관광학부", "정책학과", "경제금융학부", "경영학부", "파이낸스경영학과", "국제학부", "행정학과",
  "교육학과", "교육공학과", "국어교육과", "영어교육과", "수학교육과",
  "수학과", "물리학과", "화학과", "생명과학과", "융합전자공학부", "컴퓨터소프트웨어학부", "전기공학전공", "바이오메디컬공학전공", "신소재공학부", "화학공학과", "생명공학과", "유기나노공학과", "에너지공학과", "기계공학부", "원자력공학과", "산업공학과", "미래자동차공학과", "데이터사이언스학부", "반도체공학과", "의예과", "건축학부", "건축공학부", "건설환경공학과", "도시공학과", "자원환경공학과", "정보시스템학과(상경)", "한양인터칼리지학부(인문)", "한양인터칼리지학부(자연)", "연극영화학과(영화전공)", "스포츠산업과학부",
];

export const verifiedHanyang2027Departments: Department[] = hanyangNames.map((name, i) => ({ id: `hanyang-2027-${i + 1}`, universityId: "hanyang-2027", name }));

export const verifiedHanyang2027Admissions: Admission[] = verifiedHanyang2027Departments.flatMap((department) => [
  { id: `${department.id}-recommend`, universityId: "hanyang-2027", departmentId: department.id, academicYear: 2027, name: "학생부교과(추천형)", type: "교과", studentRecordWeight: 100, source: { ...source, url: "https://go.hanyang.ac.kr/web/mojib/mojib.do?m_type=SUSI&m_year=2027" }, isMock: false },
  { id: `${department.id}-holistic`, universityId: "hanyang-2027", departmentId: department.id, academicYear: 2027, name: "학생부종합(추천형)", type: "학종", documentWeight: 100, source: { ...source, url: "https://go.hanyang.ac.kr/web/mojib/mojib.do?m_type=SUSI&m_year=2027" }, isMock: false },
  { id: `${department.id}-essay`, universityId: "hanyang-2027", departmentId: department.id, academicYear: 2027, name: "논술", type: "논술", source: { ...source, url: "https://go.hanyang.ac.kr/web/mojib/mojib.do?m_type=SUSI&m_year=2027" }, isMock: false },
]);
