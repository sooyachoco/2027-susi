import type { Admission, Department, University } from "./types";

export const verifiedDongguk2027Universities: University[] = [
  { id: "dongguk-2027", name: "동국대학교", region: "서울" },
];

const names = [
  "불교학부", "문화유산학과", "국어국문·문예창작학부", "영어영문학부", "일본학과", "중어중문학과", "철학과", "사학과",
  "수학과", "화학과", "통계학과", "물리학과", "법학과", "정치외교학과", "행정학과", "북한학과", "경제학과", "국제통상학과",
  "사회학과", "미디어커뮤니케이션학과", "식품산업관리학과", "광고홍보학과", "사회복지학과", "경찰행정학부", "경영대학",
  "바이오시스템대학", "융합환경과학과", "생명과학과", "식품바이오융합공학과", "의생명공학과", "전자전기공학부", "정보통신공학과", "건설환경공학과",
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
  confidence: 0.99,
};

// 2027 공식 모집단위·모집인원 표의 Do Dream 전형을 우선 반영한다.
const doDreamCounts: Record<string, number> = {
  "불교학부": 20, "문화유산학과": 3, "국어국문·문예창작학부": 8, "영어영문학부": 16,
  "일본학과": 7, "중어중문학과": 7, "철학과": 5, "사학과": 7,
  "수학과": 9, "화학과": 9, "통계학과": 9, "물리학과": 9, "법학과": 20,
  "정치외교학과": 8, "행정학과": 6, "북한학과": 7, "경제학과": 17, "국제통상학과": 12,
  "사회학과": 8, "미디어커뮤니케이션학과": 10, "식품산업관리학과": 8, "광고홍보학과": 10,
  "사회복지학과": 5, "경찰행정학부": 10, "경영대학": 65, "융합환경과학과": 20,
  "생명과학과": 11, "식품바이오융합공학과": 13, "의생명공학과": 10, "전자전기공학부": 29,
  "정보통신공학과": 20, "건설환경공학과": 12, "화공생물공학과": 14, "기계로봇에너지공학과": 27,
  "건축공학부": 16, "산업시스템공학과": 12, "에너지신소재공학과": 18, "컴퓨터·AI학부": 64,
  "시스템반도체학부": 16, "의료인공지능공학과": 11, "지능형네트워크융합학과": 9,
  "교육학과": 6, "국어교육과": 8, "역사교육과": 8, "지리교육과": 8, "수학교육과": 6,
  "가정교육과": 9, "체육교육과": 0, "영화영상학과": 11, "스포츠문화학과": 0, "약학과": 12,
  "범죄학과": 19, "사회복지상담학과": 19, "글로벌무역학과": 20,
};

const doDreamAdmissions: Admission[] = verifiedDongguk2027Departments
  .filter((department) => (doDreamCounts[department.name] ?? 0) > 0)
  .map((department) => ({
    id: `${department.id}-do-dream-2027`,
    universityId: "dongguk-2027",
    departmentId: department.id,
    academicYear: 2027,
    name: "Do Dream",
    type: "학종",
    recruitmentCount: doDreamCounts[department.name],
    documentWeight: 70,
    interview: true,
    csatMinimum: { enabled: false },
    source,
    isMock: false,
  }));

// 2027 최종 모집요강 기준 학교장추천인재 모집인원 합계 409명.
const schoolRecommendationCounts: Record<string, number> = {
  "불교학부": 3, "문화유산학과": 3, "국어국문·문예창작학부": 5, "영어영문학부": 8,
  "일본학과": 3, "중어중문학과": 5, "철학과": 2, "사학과": 4,
  "수학과": 4, "화학과": 4, "통계학과": 4, "물리학과": 4, "법학과": 11,
  "정치외교학과": 5, "행정학과": 5, "북한학과": 3, "경제학과": 10, "국제통상학과": 6,
  "사회학과": 4, "미디어커뮤니케이션학과": 6, "식품산업관리학과": 3, "광고홍보학과": 6,
  "사회복지학과": 3, "경찰행정학부": 6, "경영대학": 23,
  "융합환경과학과": 10, "생명과학과": 9, "식품바이오융합공학과": 10, "의생명공학과": 8,
  "전자전기공학부": 12, "정보통신공학과": 7, "건설환경공학과": 8, "화공생물공학과": 8,
  "기계로봇에너지공학과": 10, "건축공학부": 8, "산업시스템공학과": 8, "에너지신소재공학과": 9,
  "컴퓨터·AI학부": 10, "시스템반도체학부": 6, "의료인공지능공학과": 5, "지능형네트워크융합학과": 4,
  "교육학과": 4, "국어교육과": 5, "역사교육과": 6, "지리교육과": 6, "수학교육과": 4,
  "가정교육과": 5, "영화영상학과": 3, "약학과": 4, "열린전공학부": 100,
};

const schoolRecommendationAdmissions: Admission[] = verifiedDongguk2027Departments
  .filter((department) => (schoolRecommendationCounts[department.name] ?? 0) > 0)
  .map((department) => ({
    id: `${department.id}-school-recommendation-2027`,
    universityId: "dongguk-2027",
    departmentId: department.id,
    academicYear: 2027,
    name: "학교장추천인재",
    type: "교과",
    recruitmentCount: schoolRecommendationCounts[department.name],
    studentRecordWeight: 70,
    documentWeight: 30,
    csatMinimum: { enabled: false },
    source,
    isMock: false,
  }));

// 2027 최종 모집요강 기준 논술 모집인원 합계 282명.
// 컴퓨터·AI학부는 인문 4명 + 자연 20명, 경찰행정학부는 인문 13명 + 자연 5명으로 합산한다.
const essayCounts: Record<string, number> = {
  "국어국문·문예창작학부": 6, "영어영문학부": 9, "일본학과": 5, "중어중문학과": 5,
  "철학과": 5, "사학과": 4, "수학과": 4, "화학과": 4, "통계학과": 4,
  "법학과": 12, "정치외교학과": 6, "행정학과": 6, "국제통상학과": 12,
  "미디어커뮤니케이션학과": 5, "광고홍보학과": 6, "경찰행정학부": 18, "경영대학": 37,
  "바이오시스템대학": 10, "전자전기공학부": 21, "정보통신공학과": 12, "건설환경공학과": 7,
  "화공생물공학과": 7, "기계로봇에너지공학과": 12, "건축공학부": 5, "산업시스템공학과": 6,
  "에너지신소재공학과": 8, "컴퓨터·AI학부": 24, "시스템반도체학부": 5, "의료인공지능공학과": 4,
  "교육학과": 4, "수학교육과": 4, "약학과": 5,
};

const essayCsatMinimum = {
  enabled: true,
  description: "국어·수학·영어·탐구 중 2개 영역 등급 합 5 이내(한국사 4등급 이내). 자연계열은 수학 또는 과학탐구 1개 이상 포함. 경찰행정학부는 2개 영역 합 4 이내, 약학과는 3개 영역 합 4 이내.",
};

const essayAdmissions: Admission[] = verifiedDongguk2027Departments
  .filter((department) => (essayCounts[department.name] ?? 0) > 0)
  .map((department) => ({
    id: `${department.id}-essay-2027`,
    universityId: "dongguk-2027",
    departmentId: department.id,
    academicYear: 2027,
    name: "논술",
    type: "논술",
    recruitmentCount: essayCounts[department.name],
    studentRecordWeight: 30,
    csatMinimum: essayCsatMinimum,
    source,
    isMock: false,
  }));

export const verifiedDongguk2027Admissions: Admission[] = [
  ...doDreamAdmissions,
  ...schoolRecommendationAdmissions,
  ...essayAdmissions,
];
