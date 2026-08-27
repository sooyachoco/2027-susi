import type { Admission, Department, University } from "../types";

export const seoulLowerBatch2027Universities: University[] = [
  { id: "koreauniv_guro", name: "한국성서대학교", region: "서울" },
  { id: "baeseok_seoul", name: "백석대학교(서울캠퍼스)", region: "서울" },
  { id: "sahmyook_health", name: "삼육대학교", region: "서울" },
  { id: "chongshin", name: "총신대학교", region: "서울" },
  { id: "hanyoung", name: "한영대학교", region: "서울" },
  { id: "seoul_theological", name: "서울신학대학교", region: "서울" },
];

export const seoulLowerBatch2027Departments: Department[] = [
  { id: "koreauniv_guro-business", universityId: "koreauniv_guro", name: "경영학과" },
  { id: "koreauniv_guro-social", universityId: "koreauniv_guro", name: "사회복지학과" },
  { id: "chongshin-business", universityId: "chongshin", name: "경영학과" },
  { id: "chongshin-social", universityId: "chongshin", name: "사회복지학과" },
  { id: "hanyoung-business", universityId: "hanyoung", name: "경영학과" },
  { id: "hanyoung-social", universityId: "hanyoung", name: "사회복지학과" },
];

export const seoulLowerBatch2027Admissions: Admission[] = [];
