export type MetroPriority2027 = {
  university: string;
  region: "서울" | "경기" | "인천";
  priority: number;
  status: "verified-source";
};

/** 2027 수도권 보강 우선순위. 공식 모집요강 존재 여부 확인 후 상세 전형을 순차 반영한다. */
export const metroPriority2027: MetroPriority2027[] = [
  { university: "서울시립대학교", region: "서울", priority: 1, status: "verified-source" },
  { university: "한성대학교", region: "서울", priority: 2, status: "verified-source" },
  { university: "성공회대학교", region: "서울", priority: 3, status: "verified-source" },
  { university: "명지대학교", region: "서울", priority: 4, status: "verified-source" },
  { university: "가톨릭대학교", region: "경기", priority: 5, status: "verified-source" },
  { university: "경기대학교", region: "경기", priority: 6, status: "verified-source" },
  { university: "단국대학교", region: "경기", priority: 7, status: "verified-source" },
  { university: "인천대학교", region: "인천", priority: 8, status: "verified-source" },
];
