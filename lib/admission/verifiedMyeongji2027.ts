import type { Admission, Department, University } from "./types";

export const verifiedMyeongji2027Universities: University[] = [
  { id: "myeongji-2027", name: "명지대학교", region: "서울" },
];

const names = [
  "국어국문학과", "영어영문학과", "중어중문학과", "일어일문학과", "아랍지역학과",
  "문헌정보학과", "미술사학과", "철학과", "사학과", "행정학과", "법학과",
  "정치외교학과", "디지털미디어학과", "청소년지도학과", "아동학과", "경제학과",
  "국제통상학과", "경영학과", "경영정보학과", "융합소프트웨어학부", "디지털콘텐츠디자인학과",
  "데이터테크놀로지학과", "컴퓨터공학과", "전자공학과", "반도체공학과", "전기공학과",
  "화학공학과", "신소재공학과", "환경에너지공학과", "기계공학과", "산업경영공학과",
  "건축학부", "건축공학과", "교통공학과", "수학과", "물리학과", "화학과", "식품영양학과",
  "생명과학정보학과", "스포츠학부", "디자인학부", "전공자유학부",
];

export const verifiedMyeongji2027Departments: Department[] = names.map((name, i) => ({
  id: `myeongji-2027-${i + 1}`,
  universityId: "myeongji-2027",
  name,
}));

export const verifiedMyeongji2027Admissions: Admission[] = verifiedMyeongji2027Departments.flatMap((department) => [
  { id: `${department.id}-student`, universityId: "myeongji-2027", departmentId: department.id, academicYear: 2027, type: "학종", name: "명지인재서류전형", isMock: false },
  { id: `${department.id}-regional`, universityId: "myeongji-2027", departmentId: department.id, academicYear: 2027, type: "교과", name: "학교장추천전형", isMock: false },
  { id: `${department.id}-essay`, universityId: "myeongji-2027", departmentId: department.id, academicYear: 2027, type: "논술", name: "논술전형", isMock: false },
]);
