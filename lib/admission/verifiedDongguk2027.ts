import type { Admission, Department, University } from "./types";

export const verifiedDongguk2027Universities: University[] = [
  { id: "dongguk-2027", name: "동국대학교", region: "서울" },
];

const names = [
  "불교학부", "문화유산학과", "국어국문·문예창작학부", "영어영문학부", "일본학과", "중어중문학과", "철학과", "사학과",
  "수학과", "화학과", "통계학과", "물리학과", "법학과", "정치외교학과", "행정학과", "북한학과", "경제학과", "국제통상학과",
  "사회학과", "미디어커뮤니케이션학과", "식품산업관리학과", "광고홍보학과", "사회복지학과", "경찰행정학부", "경영대학",
  "융합환경과학과", "생명과학과", "식품바이오융합공학과", "의생명공학과", "전자전기공학부", "정보통신공학과", "건설환경공학과",
  "화공생물공학과", "기계로봇에너지공학과", "건축공학부", "산업시스템공학과", "에너지신소재공학과", "컴퓨터·AI학부",
  "시스템반도체학부", "의료인공지능공학과", "지능형네트워크융합학과", "교육학과", "국어교육과", "역사교육과", "지리교육과",
  "수학교육과", "가정교육과", "체육교육과", "영화영상학과", "스포츠문화학과", "약학과", "범죄학과", "사회복지상담학과", "글로벌무역학과", "열린전공학부",
];

export const verifiedDongguk2027Departments: Department[] = names.map((name, i) => ({
  id: `dongguk-2027-${i + 1}`,
  universityId: "dongguk-2027",
  name,
}));

const source = {
  type: "university" as const,
  url: "https://ipsi.dongguk.edu/admission/html/rolling/guide.asp",
  document: "동국대학교 2027학년도 수시모집요강",
  academicYear: 2027,
  confidence: 0.98,
};

// 2027 공식 모집단위·모집인원 표에서 전형별 배정이 서로 다르므로,
// 논술을 모든 모집단위에 일괄 부여하던 기존 로직은 제거한다.
// Do Dream / 학교장추천인재도 세부 모집단위 표를 추가 대조하면서 단계적으로 보강한다.
export const verifiedDongguk2027Admissions: Admission[] = [];

void source;
