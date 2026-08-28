import type { Admission, Department, University } from "./types";

const source = {
  type: "university" as const,
  url: "https://enter.anyang.ac.kr/files/enter/content/202606/170c155e05043d1c9d17832988948e1b.pdf",
  document: "안양대학교 2027학년도 수시 모집요강 최종본(2026-06-19)",
  page: 4,
  academicYear: 2027,
  confidence: 0.99,
};

export const verifiedAnyang2027Universities: University[] = [
  { id: "anyang", name: "안양대학교", region: "경기" },
];

const departmentRows = [
  ["free", "자유전공", "자유전공", 40, 17, 13, 0],
  ["theology", "신학과", "인문", 16, 4, 0, 0],
  ["christian-edu", "기독교교육과", "교육", 20, 4, 0, 0],
  ["early-childhood", "유아교육과", "교육", 9, 8, 10, 1],
  ["korean", "국어국문학과", "인문", 11, 4, 4, 1],
  ["english", "영미언어문화학과", "인문", 9, 5, 5, 1],
  ["russian", "러시아언어문화학과", "인문", 9, 4, 4, 1],
  ["chinese", "중국언어문화학과", "인문", 9, 4, 6, 1],
  ["humanities-free", "인문계열자유전공", "자유전공", 11, 5, 5, 0],
  ["global-business", "글로벌경영학과", "경영·경제", 15, 8, 8, 2],
  ["global-business-night", "글로벌경영학과(야간)", "경영·경제", 25, 8, 0, 0],
  ["tourism", "관광경영학과(교직)", "관광", 12, 6, 7, 1],
  ["public-admin", "행정학과", "법·행정", 10, 5, 7, 1],
  ["public-admin-night", "행정학과(야간)", "법·행정", 13, 4, 0, 0],
  ["social-free", "사회계열자유전공", "자유전공", 14, 5, 4, 0],
  ["performance", "예술학부 공연예술전공", "예술", 0, 0, 0, 0],
  ["music", "예술학부 음악융합예술전공", "예술", 0, 0, 0, 0],
  ["beauty", "뷰티메디컬디자인학과", "디자인·예술", 13, 6, 0, 0],
  ["food", "식품영양학과(교직)", "자연", 11, 9, 10, 2],
  ["data", "데이터사이언스학과", "AI·데이터", 8, 5, 9, 1],
  ["data-night", "데이터사이언스학과(야간)", "AI·데이터", 12, 4, 0, 0],
  ["ai", "AI학부", "컴퓨터·소프트웨어", 38, 20, 25, 4],
  ["digital-design", "디지털미디어디자인학과", "디자인·예술", 13, 8, 8, 1],
  ["cosmetic", "화장품발명디자인학과", "디자인·예술", 8, 5, 5, 1],
  ["info-ee", "정보전기전자공학과", "전기·전자", 29, 10, 19, 2],
  ["info-ee-night", "정보전기전자공학과(야간)", "전기·전자", 13, 6, 0, 0],
  ["urban", "도시정보공학과", "공학", 15, 5, 10, 1],
  ["urban-night", "도시정보공학과(야간)", "공학", 12, 5, 0, 0],
  ["environment", "환경에너지공학과", "공학", 14, 9, 12, 1],
  ["engineering-free", "이공계열자유전공", "자유전공", 10, 5, 5, 0],
  ["game", "게임콘텐츠학과", "게임·콘텐츠", 14, 7, 0, 0],
  ["sports", "스포츠과학과", "체육·스포츠", 22, 0, 0, 0],
  ["sports-industry", "스포츠응용산업학과", "체육·스포츠", 13, 15, 0, 0],
  ["smart-city", "스마트시티공학과", "공학", 26, 5, 0, 0],
  ["marine-bio", "해양바이오공학과", "바이오", 13, 5, 0, 0],
] as const;

export const verifiedAnyang2027Departments: Department[] = departmentRows.map(
  ([id, name, category]) => ({ id: `anyang-${id}`, universityId: "anyang", name, category }),
);

export const verifiedAnyang2027Admissions: Admission[] = departmentRows.flatMap(
  ([id, , , subject, interview, holistic, opportunity]) => {
    const departmentId = `anyang-${id}`;
    const admissions: Admission[] = [];
    if (subject > 0) admissions.push({
      id: `anyang-subject-${id}`, universityId: "anyang", departmentId, academicYear: 2027,
      name: "아리학생부교과전형", type: "교과", recruitmentCount: subject,
      studentRecordWeight: 100, source, isMock: false,
    });
    if (interview > 0) admissions.push({
      id: `anyang-interview-${id}`, universityId: "anyang", departmentId, academicYear: 2027,
      name: "아리학생부면접전형", type: "교과", recruitmentCount: interview,
      studentRecordWeight: 60, interview: true, source, isMock: false,
    });
    if (holistic > 0) admissions.push({
      id: `anyang-holistic-${id}`, universityId: "anyang", departmentId, academicYear: 2027,
      name: "아리학생부종합전형", type: "학종", recruitmentCount: holistic,
      documentWeight: 100, interview: false, csatMinimum: { enabled: false }, source, isMock: false,
    });
    if (opportunity > 0) admissions.push({
      id: `anyang-opportunity-${id}`, universityId: "anyang", departmentId, academicYear: 2027,
      name: "고른기회전형", type: "학종", recruitmentCount: opportunity,
      documentWeight: 100, interview: false, csatMinimum: { enabled: false }, source, isMock: false,
    });
    return admissions;
  },
);
