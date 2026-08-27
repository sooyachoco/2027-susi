import type { Admission, Department, University } from "../types";

export const seoulTailBatch2027Universities: University[] = [
  { id: "chongshin", name: "총신대학교", region: "서울" },
  { id: "hanyoung", name: "한영대학교", region: "서울" },
  { id: "korea_bible", name: "한국성서대학교", region: "서울" },
  { id: "seoul_women_edu", name: "서울여자간호대학교", region: "서울" },
  { id: "sungshin", name: "성신여자대학교", region: "서울" },
  { id: "dongguk", name: "동국대학교", region: "서울" },
];

export const seoulTailBatch2027Departments: Department[] = [
  { id: "chongshin-social", universityId: "chongshin", name: "사회복지학과" },
  { id: "hanyoung-business", universityId: "hanyoung", name: "경영학과" },
  { id: "korea_bible-social", universityId: "korea_bible", name: "사회복지학과" },
  { id: "seoul_women_edu-nursing", universityId: "seoul_women_edu", name: "간호학과" },
  { id: "sungshin-business", universityId: "sungshin", name: "경영학과" },
  { id: "sungshin-computer", universityId: "sungshin", name: "컴퓨터공학과" },
  { id: "dongguk-business", universityId: "dongguk", name: "경영학과" },
  { id: "dongguk-computer", universityId: "dongguk", name: "컴퓨터공학전공" },
];

export const seoulTailBatch2027Admissions: Admission[] = [];
