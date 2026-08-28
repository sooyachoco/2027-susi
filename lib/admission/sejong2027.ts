import type { Admission, Department, University } from "./types";

export const sejong2027Universities: University[] = [{ id: "sejong", name: "세종대학교", region: "서울" }];

const units: Array<[string, string, string]> = [
  ["korean", "국어국문학과", "인문·사회"], ["english", "영어영문학과", "인문·사회"], ["history", "역사학과", "인문·사회"],
  ["education", "교육학과", "인문·사회"], ["publicadmin", "행정학과", "인문·사회"], ["economics", "경제학과", "경영·경제"],
  ["business", "경영학부", "경영·경제"], ["hospitality", "호텔관광경영학과", "경영·경제"], ["media", "미디어커뮤니케이션학과", "인문·사회"],
  ["math", "수학통계학과", "자연과학"], ["physics", "물리천문학과", "자연과학"], ["chemistry", "화학과", "자연과학"],
  ["life", "생명과학대학", "자연과학"], ["food", "식품생명공학전공", "자연과학"], ["architecture", "건축공학과", "공학"],
  ["civil", "건설환경공학과", "공학"], ["environment", "환경에너지공간융합학과", "공학"], ["mechanical", "기계공학과", "공학"],
  ["aerospace", "우주항공시스템공학부", "공학"], ["electrical", "전자정보통신공학과", "공학"], ["computer", "컴퓨터공학과", "컴퓨터·소프트웨어"],
  ["software", "소프트웨어학과", "컴퓨터·소프트웨어"], ["ai", "인공지능데이터사이언스학과", "컴퓨터·소프트웨어"], ["creative", "창의소프트학부", "컴퓨터·소프트웨어"],
  ["design", "디자인이노베이션전공", "예체능"], ["animation", "만화애니메이션텍전공", "예체능"], ["film", "영화예술학과", "예체능"],
  ["sports", "체육학과", "예체능"], ["music", "음악과", "예체능"], ["free", "자유전공학부", "융합"]
];

export const sejong2027Departments: Department[] = units.map(([id, name, category]) => ({ id: `sejong-${id}`, universityId: "sejong", name, category }));

const src = "https://ipsi.sejong.ac.kr/sub_page/sub1/0106_view.asp?B_CATEGORY=1&B_CODE=BOARD_1455878015&IDX=1128";
const admission = (id: string, dept: string, name: string, type: "교과" | "학종" | "논술", extra: Partial<Admission> = {}): Admission => ({
  id: `sejong-${dept}-${id}-2027`, universityId: "sejong", departmentId: `sejong-${dept}`, academicYear: 2027, name, type,
  source: { type: "university", academicYear: 2027, url: src, confidence: 0.95 }, isMock: false, ...extra
});

export const sejong2027Admissions: Admission[] = units.flatMap(([id]) => [
  admission("regional", id, "지역균형전형", "교과", { studentRecordWeight: 100 }),
  admission("student", id, "세종인재전형", "학종", { documentWeight: 100 }),
  admission("essay", id, "논술우수자전형", "논술")
]);
