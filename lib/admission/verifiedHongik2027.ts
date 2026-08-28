import type { Admission, Department, University } from "./types";

const source = {
  type: "university" as const,
  url: "https://www.hongik.ac.kr/kr/admission/recruitment.do?articleNo=152315&mode=view",
  document: "홍익대학교 2027학년도 수시모집 모집요강",
  academicYear: 2027,
  confidence: 0.99,
};

export const verifiedHongik2027Universities: University[] = [
  { id: "hongik", name: "홍익대학교", region: "서울" },
];

const departmentSpecs = [
  ["hongik-self-natural", "서울캠퍼스자율전공(자연·예능)", "자유전공"],
  ["hongik-self-humanities", "서울캠퍼스자율전공(인문·예능)", "자유전공"],
  ["hongik-electrical", "전자·전기공학부", "전기·전자"],
  ["hongik-materials", "신소재·화공시스템공학부", "화학·소재"],
  ["hongik-cs", "컴퓨터공학과", "컴퓨터·소프트웨어"],
  ["hongik-data", "산업·데이터공학과", "AI·데이터"],
  ["hongik-mechanical", "기계·시스템디자인공학과", "기계·자동차"],
  ["hongik-civil", "건설환경공학과", "건설·환경"],
  ["hongik-architecture", "건축학부 건축학전공(5년제)", "건축"],
  ["hongik-interior", "건축학부 실내건축학전공", "건축"],
  ["hongik-urban", "도시공학과", "도시·교통"],
  ["hongik-math-education", "수학교육과", "교육"],
  ["hongik-korean-education", "국어교육과", "교육"],
  ["hongik-english-education", "영어교육과", "교육"],
  ["hongik-history-education", "역사교육과", "교육"],
  ["hongik-education", "교육학과", "교육"],
  ["hongik-business", "경영학부", "경영·경제"],
  ["hongik-english", "영어영문학과", "인문"],
  ["hongik-german", "독어독문학과", "인문"],
  ["hongik-french", "불어불문학과", "인문"],
  ["hongik-korean", "국어국문학과", "인문"],
  ["hongik-law", "법학부", "법·행정"],
  ["hongik-economics", "경제학부", "경영·경제"],
  ["hongik-art-studies", "예술학과", "예술"],
] as const;

export const verifiedHongik2027Departments: Department[] = departmentSpecs.map(([id, name, category]) => ({
  id,
  universityId: "hongik",
  name,
  category,
}));

// 2027학년도 서울캠퍼스 모집인원: 학교장추천자 307명, 학교생활우수자 467명, 논술 384명.
const schoolRecommendationCounts = [41, 29, 30, 19, 22, 11, 22, 8, 7, 3, 8, 5, 5, 4, 5, 37, 5, 4, 4, 3, 19, 7, 4];
const schoolLifeCounts = [67, 49, 48, 30, 34, 16, 34, 11, 11, 5, 6, 6, 4, 6, 58, 6, 6, 5, 5, 28, 9, 5, 0];
const essayCounts = [53, 38, 39, 25, 29, 14, 29, 9, 9, 4, 5, 5, 4, 5, 48, 6, 4, 4, 4, 24, 8, 4, 4];

const generalMinimum = {
  enabled: true,
  description: "국어·수학·영어·탐구(사회/과학) 중 2개 영역 등급 합 5 이내, 한국사 4등급 이내",
  requiredSubjects: 2,
  gradeSum: 5,
};

export const verifiedHongik2027Admissions: Admission[] = verifiedHongik2027Departments.flatMap((department, index) => {
  const admissions: Admission[] = [];

  // 학교장추천자: 학생부교과 100%, 수능최저 2개 영역 합 5 이내 + 한국사 4등급 이내
  if (schoolRecommendationCounts[index] > 0) {
    admissions.push({
      id: `${department.id}-school-recommendation-2027`,
      universityId: "hongik",
      departmentId: department.id,
      academicYear: 2027,
      name: "학교장추천자",
      type: "교과",
      recruitmentCount: schoolRecommendationCounts[index],
      studentRecordWeight: 100,
      csatMinimum: generalMinimum,
      source,
      isMock: false,
    });
  }

  // 학교생활우수자: 서류 100%, 수능최저 2개 영역 합 5 이내 + 한국사 4등급 이내
  if (schoolLifeCounts[index] > 0) {
    admissions.push({
      id: `${department.id}-school-life-2027`,
      universityId: "hongik",
      departmentId: department.id,
      academicYear: 2027,
      name: "학교생활우수자",
      type: "학종",
      recruitmentCount: schoolLifeCounts[index],
      documentWeight: 100,
      csatMinimum: generalMinimum,
      source,
      isMock: false,
    });
  }

  // 논술: 논술 90% + 학생부교과 10%, 수능최저 2개 영역 합 5 이내 + 한국사 4등급 이내
  if (essayCounts[index] > 0) {
    admissions.push({
      id: `${department.id}-essay-2027`,
      universityId: "hongik",
      departmentId: department.id,
      academicYear: 2027,
      name: "논술",
      type: "논술",
      recruitmentCount: essayCounts[index],
      studentRecordWeight: 10,
      documentWeight: 90,
      csatMinimum: generalMinimum,
      source,
      isMock: false,
    });
  }

  return admissions;
});
