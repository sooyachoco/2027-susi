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

export const verifiedDongguk2027Admissions: Admission[] = verifiedDongguk2027Departments.flatMap((department) => {
  const admissions: Admission[] = [
    {
      id: `${department.id}-dodream`, universityId: "dongguk-2027", departmentId: department.id, academicYear: 2027,
      name: "Do Dream", type: "학종", documentWeight: 100, interview: true,
      csatMinimum: { enabled: false }, source, isMock: false,
    },
    {
      id: `${department.id}-recommend`, universityId: "dongguk-2027", departmentId: department.id, academicYear: 2027,
      name: "학교장추천인재", type: "교과", studentRecordWeight: 70,
      csatMinimum: { enabled: false }, source, isMock: false,
    },
    {
      id: `${department.id}-essay`, universityId: "dongguk-2027", departmentId: department.id, academicYear: 2027,
      name: "논술", type: "논술", studentRecordWeight: 20,
      csatMinimum: { enabled: true, description: "인문·자연 2개 영역 등급 합 5 이내(계열별 반영영역 기준 상이), 경찰행정 2개 영역 합 4, 약학 3개 영역 합 4" },
      source, isMock: false,
    },
  ];

  if (/교육|체육|영화|스포츠|약학/.test(department.name)) {
    admissions.push({
      id: `${department.id}-special`, universityId: "dongguk-2027", departmentId: department.id, academicYear: 2027,
      name: "실기/실적", type: "기타", source, isMock: false,
    });
  }
  return admissions;
});
